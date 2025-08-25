/**
 * @fileoverview Chat Sidebar Component for Scenario Information Display
 *
 * This file contains the sidebar component that displays patient information and evaluation
 * results for medical training scenarios. It provides a responsive drawer interface for
 * mobile devices and a fixed sidebar for desktop views.
 *
 * @author LeetCare Development Team
 */

"use client";

import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import PatientPanel from "../scenario/patientPanel";
import { Button } from "@/components/ui/button";
import { XIcon, MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatSidebarProps {
  /** Whether evaluation mode is active to show evaluation results */
  isEvaluate: boolean;

  /** Patient case data containing symptoms, vitals, and medical history */
  patientInfo: string;

  /** Whether the mobile drawer is currently open */
  drawerOpen: boolean;

  /** State setter for controlling mobile drawer visibility */
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

/**
 * Chat Sidebar Component
 *
 * Displays contextual information for medical training scenarios including patient details
 * and evaluation results. Adapts between a fixed desktop sidebar and a mobile drawer interface
 * based on screen size, switching content between patient information and evaluation feedback.
 *
 * @example
 * ```tsx
 * <ChatSidebar
 *   isEvaluate={false}
 *   patientCase={currentCase}
 *   drawerOpen={isMobileDrawerOpen}
 *   setDrawerOpen={setMobileDrawerOpen}
 * />
 * ```
 *
 * @see {@link https://ui.shadcn.com/docs/components/button} For button component documentation
 * @see {@link https://tailwindcss.com/docs/responsive-design} For responsive design patterns
 *
 * @todo Add handler for when timer is finished
 */
export default function ChatSidebar({
  patientInfo,
  isEvaluate = false,
  drawerOpen,
  setDrawerOpen,
}: ChatSidebarProps) {
  return (
    <>
      {/* Mobile drawer toggle button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setDrawerOpen(true)}
        className="fixed top-6 right-2 z-50 flex lg:hidden"
        aria-label="Open sidebar"
      >
        <MenuIcon className="h-6 w-6" />
      </Button>

      {/* Desktop sidebar */}
      <div className="hidden h-full w-1/3 flex-col bg-white shadow-lg lg:flex">
        <PatientPanel patientInfo={patientInfo} />;
      </div>

      {/* Mobile drawer overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/50 transition-opacity lg:hidden",
          drawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-4/5 max-w-sm flex-col bg-white shadow-lg transition-transform duration-300 ease-in-out lg:hidden",
          drawerOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setDrawerOpen(false)}
          className="absolute top-4 right-4"
          aria-label="Close sidebar"
        >
          <XIcon className="h-6 w-6" />
        </Button>
        <div className="h-full overflow-y-auto pt-14">
          <PatientPanel patientInfo={patientInfo} />
        </div>
      </div>
    </>
  );
}
