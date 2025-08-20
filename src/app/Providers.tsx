"use client";

/**
 * @fileoverview Global Providers for Application Context and State
 *
 * This file contains the client-side providers component that wraps the
 * entire application with essential context providers and global state
 * management.
 *
 * @author LeetCare Development Team
 */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TutorialProvider } from "@/app/context/tutorialContext";
import { useEffect } from "react";
import { initMixpanel } from "@/lib/mixpanelClient";
import { ThemeProvider } from "next-themes";

const queryClient = new QueryClient();
const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

/**
 * Global Providers Component
 *
 * Client-side wrapper component that provides essential context and state
 * management for the entire app. This component initializes Mixpanel
 * analytics and wraps the app with React Query for data fetching, tutorial
 * context for user guidance, and tooltip provider for UI interactions.
 *
 * @param children - All application pages and components
 *
 * @see {@link https://tanstack.com/query/latest/docs/react/overview} For React Query documentation
 * @see {@link https://ui.shadcn.com/docs/components/tooltip} For Tooltip provider usage
 * @see {@link https://docs.mixpanel.com/docs/tracking/how-tos/javascript} For Mixpanel analytics
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (MIXPANEL_TOKEN) {
      initMixpanel();
    }
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <TutorialProvider>
        <TooltipProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
          </ThemeProvider>
        </TooltipProvider>
      </TutorialProvider>
    </QueryClientProvider>
  );
}
