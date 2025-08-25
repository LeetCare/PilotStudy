"use client";

import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import PatientPanel from "../scenario/patientPanel";
import { Button } from "@/components/ui/button";
import { XIcon, MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatSidebarProps {
  patientInfo: string;
  drawerOpen: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ChatSidebar({
  patientInfo,
  drawerOpen,
  setDrawerOpen,
}: ChatSidebarProps) {
  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setDrawerOpen(true)}
        className="fixed top-6 right-2 z-50 flex lg:hidden"
        aria-label="Open sidebar"
      >
        <MenuIcon className="h-6 w-6" />
      </Button>

      <div className="hidden h-full w-1/3 flex-col bg-white shadow-lg lg:flex">
        <PatientPanel patientInfo={patientInfo} />;
      </div>

      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/50 transition-opacity lg:hidden",
          drawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setDrawerOpen(false)}
      />

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
