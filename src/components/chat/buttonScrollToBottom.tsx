/**
 * @fileoverview Scroll to Bottom Button Component
 *
 * This file contains the ButtonScrollToBottom component which provides a floating
 * button that appears when the user is not at the bottom of the chat. It smoothly
 * fades in and out based on scroll position with opacity transitions.
 *
 * @author LeetCare Development Team
 */

"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";
import { IconArrowDown } from "@/components/ui/icons";

export interface ButtonScrollToBottom extends ButtonProps {
  /** Whether the user is at the bottom of the chat */
  isAtBottom: boolean;

  /** Function that scrolls to the bottom of the chat when called */
  scrollToBottom: () => void;
}

/**
 * ButtonScrollToBottom Component
 *
 * Scroll-to-bottom button that appears when user is not at the latest messages.
 * Automatically fades in/out based on scroll position with smooth opacity transitions.
 *
 * @example
 * ```tsx
 * <ButtonScrollToBottom
 *   isAtBottom={isAtBottom}
 *   scrollToBottom={scrollToBottom}
 *   className="custom-position"
 * />
 * ```
 *
 * @see {@link https://ui.shadcn.com/docs/components/button} Button component documentation
 * @see {@link https://github.com/vercel/ai-chatbot/blob/main/components/button-scroll-to-bottom.tsx} Original implementation
 *
 * @notes
 * - This component is taken from the Vercel AI SDK example chat application.
 * - Uses opacity transitions for smooth show/hide animations.
 *
 * @todo
 * - Fix button visibility when messages don't fill the screen.
 */
export function ButtonScrollToBottom({
  className,
  isAtBottom,
  scrollToBottom,
  ...props
}: ButtonScrollToBottom) {
  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        isAtBottom ? "opacity-0" : "bg-white opacity-100",
        className,
      )}
      onClick={scrollToBottom}
      {...props}
    >
      <IconArrowDown />
      <span className="sr-only">Scroll to bottom</span>
    </Button>
  );
}
