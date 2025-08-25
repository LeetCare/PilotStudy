import type { Metadata } from "next";
import "./globals.css";
import React from "react";

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
      <body className="font-pjs tracking-wide">{children}</body>
    </html>
  );
}
