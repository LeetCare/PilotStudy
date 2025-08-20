/**
 * @fileoverview 404 Not Found Error Page
 *
 * This file contains the Next.js not-found page component that displays
 * when users navigate to non-existent routes or when the notFound()
 * function is called.
 *
 * @author LeetCare Development Team
 */

/**
 * Not Found Page Component
 *
 * Error page component that displays a 404 message when users navigate
 * to invalid routes or when resources are not found.
 *
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/not-found} For Next.js not-found pages
 */
export default async function NotFoundPage() {
  return (
    <div className="h-screen flex-col! bg-neutral-300">
      <div className="flex size-full flex-1 items-center justify-center">
        <p className="text-xl">404 - Page Not Found</p>
      </div>
    </div>
  );
}
