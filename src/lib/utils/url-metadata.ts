/**
 * @fileoverview URL metadata extraction with caching
 *
 * This file provides utilities for extracting Open Graph and meta tag data
 * from URLs. Used in the citations component in the case flow visualizer of
 * the case generator page.
 *
 * @author LeetCare Development Team
 */
"use server";

import { load } from "cheerio";
import { cache } from "react";

export interface UrlMetadata {
  /** The original URL */
  url: string;

  /** Page title from meta tags or title element */
  title?: string;

  /** Page description from meta tags */
  description?: string;

  /** Preview image URL from Open Graph tags */
  image?: string;

  /** Site name from Open Graph tags */
  siteName?: string;

  /** Domain name extracted from URL */
  source?: string;

  /** Content type from Open Graph tags */
  type?: string;
}

// In-memory cache for metadata
const metadataCache = new Map<string, UrlMetadata>();

/**
 * Extracts metadata from a URL with caching and performance optimizations.
 *
 * Uses HEAD requests to validate content types and only fetches the first 16KB
 * of HTML content for metadata extraction. Provides robust fallbacks for
 * different content types and error conditions.
 *
 * @param url - The URL to extract metadata from
 * @returns Promise resolving to metadata object
 *
 * @example
 * ```tsx
 * const metadata = await getUrlMetadata('https://example.com/article');
 * console.log(metadata.title); // "Article Title"
 * console.log(metadata.description); // "Article description..."
 * ```
 */
export const getUrlMetadata = cache(
  async (url: string): Promise<UrlMetadata> => {
    // Check in-memory cache first
    if (metadataCache.has(url)) {
      return metadataCache.get(url)!;
    }

    try {
      // Validate URL
      const validUrl = new URL(url);
      const domain = validUrl.hostname.replace("www.", "");

      // Create basic fallback metadata
      const fallbackMetadata: UrlMetadata = {
        url,
        title: domain,
        source: domain,
        siteName: domain,
      };

      // Skip large files and PDFs entirely
      if (url.endsWith(".pdf") || url.includes("/pdf/")) {
        const pdfMetadata = {
          ...fallbackMetadata,
          title: "PDF Document",
          description: "PDF document from " + domain,
        };
        metadataCache.set(url, pdfMetadata);
        return pdfMetadata;
      }

      // First try a HEAD request to check content type and size
      const headResponse = await fetch(validUrl.href, {
        method: "HEAD",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; RxPertBot/1.0; +https://www.rx-pert.com)",
        },
        next: { revalidate: 86400 }, // Cache for 24 hours
      });

      // Check content type - skip if not HTML
      const contentType = headResponse.headers.get("content-type") || "";
      if (!contentType.includes("text/html")) {
        const nonHtmlMetadata = {
          ...fallbackMetadata,
          title: `${domain} Document`,
          description: `Document from ${domain} (${contentType.split(";")[0]})`,
        };
        metadataCache.set(url, nonHtmlMetadata);
        return nonHtmlMetadata;
      }

      // Fetch only the first 16KB of the page - enough for metadata in most cases
      const response = await fetch(validUrl.href, {
        method: "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; RxPertBot/1.0; +https://www.rx-pert.com)",
          Range: "bytes=0-16384", // Only get first 16KB
        },
        next: { revalidate: 86400 }, // Cache for 24 hours
      });

      if (!response.ok) {
        console.error(
          `Failed to fetch URL: ${url}, status: ${response.status}`,
        );
        metadataCache.set(url, fallbackMetadata);
        return fallbackMetadata;
      }

      const partialHtml = await response.text();

      // Parse just the HEAD section if possible
      const headMatch = /<head[^>]*>([\s\S]*?)<\/head>/i.exec(partialHtml);
      const headHtml = headMatch ? headMatch[0] : partialHtml;

      // Parse the HTML
      const $ = load(headHtml);

      // Extract metadata
      const metadata: UrlMetadata = {
        url,
        source: domain,
      };

      // Title (try Open Graph first, then regular title)
      metadata.title =
        $('meta[property="og:title"]').attr("content") ||
        $("title").text().trim() ||
        $('meta[name="twitter:title"]').attr("content") ||
        domain;

      // Description - prioritize meta description over og:description if available
      metadata.description =
        $('meta[name="Description"]').attr("content") ||
        $('meta[property="og:description"]').attr("content") ||
        $('meta[name="description"]').attr("content") ||
        $('meta[name="twitter:description"]').attr("content");

      // Image - ensure we get absolute URLs
      const imageUrl =
        $('meta[property="og:image"]').attr("content") ||
        $('meta[name="twitter:image"]').attr("content");

      if (imageUrl) {
        // Handle relative URLs
        metadata.image = imageUrl.startsWith("http")
          ? imageUrl
          : new URL(imageUrl, validUrl.origin).toString();
      }

      // Site name
      metadata.siteName =
        $('meta[property="og:site_name"]').attr("content") || domain;

      // Type
      metadata.type = $('meta[property="og:type"]').attr("content");

      // Clean up empty values
      Object.keys(metadata).forEach((key) => {
        const typedKey = key as keyof UrlMetadata;
        if (!metadata[typedKey] || metadata[typedKey] === "") {
          delete metadata[typedKey];
        }
      });

      // Ensure we have at least a title
      if (!metadata.title) {
        metadata.title = domain;
      }

      // Store in cache
      metadataCache.set(url, metadata);
      return metadata;
    } catch (error) {
      console.error(`Error extracting metadata from ${url}:`, error);
      // Return basic metadata even on error
      try {
        const domain = new URL(url).hostname.replace("www.", "");
        const errorMetadata = {
          url,
          title: domain,
          source: domain,
          siteName: domain,
        };
        metadataCache.set(url, errorMetadata);
        return errorMetadata;
      } catch {
        const fallback = { url };
        metadataCache.set(url, fallback);
        return fallback;
      }
    }
  },
);

/**
 * Pre-loads metadata for multiple URLs in parallel.
 * Useful for warming the cache before rendering components that need metadata.
 *
 * @param urls - Array of URLs to prefetch metadata for
 *
 * @example
 * ```tsx
 * // In a server component
 * await prefetchUrlMetadata([
 *   'https://example.com/article1',
 *   'https://example.com/article2'
 * ]);
 * ```
 */
export async function prefetchUrlMetadata(urls: string[]): Promise<void> {
  await Promise.all(
    urls.map((url) => {
      if (!metadataCache.has(url)) {
        return getUrlMetadata(url).catch(() => {
          /* Silently handle errors */
        });
      }
      return Promise.resolve();
    }),
  );
}
