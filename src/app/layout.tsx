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
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Pilot Study Simulator",
  description: "An Interactive and Personalized Patient Simulator.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-pjs tracking-wide">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
