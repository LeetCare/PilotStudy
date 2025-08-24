/**
 * @fileoverview Clipboard operations with temporary feedback state
 *
 * This file provides a custom hook for copying text to the clipboard for the
 * chat component.
 *
 * @author LeetCare Development Team
 */
"use client";

import * as React from "react";

/**
 * Configuration options for the useCopyToClipboard hook.
 */
export interface useCopyToClipboardProps {
  /** Time in milliseconds before resetting the copied state */
  timeout?: number;
}

/**
 * Custom hook for copying text to clipboard with feedback state.
 *
 * Provides clipboard functionality with automatic state management for UI feedback.
 * The copied state automatically resets after the specified timeout.
 *
 * @param props - Configuration options for the hook
 * @returns Object containing copy state and copy function
 *
 * @example
 * ```tsx
 * function CopyButton({ text }: { text: string }) {
 *   const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 3000 });
 *
 *   const handleCopy = () => {
 *     copyToClipboard(text);
 *   };
 *
 *   return (
 *     <button onClick={handleCopy}>
 *       {isCopied ? 'Copied!' : 'Copy'}
 *     </button>
 *   );
 * }
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API} For Clipboard API documentation
 */
export function useCopyToClipboard({
  timeout = 2000,
}: useCopyToClipboardProps) {
  const [isCopied, setIsCopied] = React.useState<Boolean>(false);

  /**
   * Copies the provided text to the clipboard and updates state.
   * Includes browser compatibility checks and error handling.
   *
   * @param value - Text string to copy to clipboard
   */
  const copyToClipboard = (value: string) => {
    if (typeof window === "undefined" || !navigator.clipboard?.writeText) {
      return;
    }

    if (!value) {
      return;
    }

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, timeout);
    });
  };

  return { isCopied, copyToClipboard };
}
