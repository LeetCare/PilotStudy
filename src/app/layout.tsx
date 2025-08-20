/**
 * @fileoverview Root Layout for RxPert Application
 *
 * This file contains the top-level Next.js layout component that wraps
 * the entire app. This layout provides global providers, analytics,
 * and base HTML structure and styling that applies to every page.
 *
 * @author LeetCare Development Team
 */
import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from "@/app/Providers";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "RxPert",
  description: "An Interactive and Personalized Patient Simulator.",
};

/**
 * Root Layout Component
 *
 * Top-level layout component for base HTML structure and
 * global providers. This component wraps all pages with providers
 * and analytics tracking (vercel and mixpanel) that need to be
 * available throughout the application.
 *
 * @see {@link https://nextjs.org/docs/app/getting-started/layouts-and-pages#creating-a-layout} For Next.js root layout
 * @see {@link https://vercel.com/analytics} For Vercel Analytics integration
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-pjs tracking-wide">
        <Providers>
          {children}
          <Toaster />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
