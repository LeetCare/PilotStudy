/**
 * @fileoverview Chat Actions Component for Message Interactions
 *
 * This file contains the ChatActions component which provides action buttons
 * for individual chat messages. Currently includes clipboard functionality
 * for copying message content with visual feedback.
 *
 * @author LeetCare Development Team
 */

"use client";

import { type UIMessage } from "@ai-sdk/react";

// Type extension to handle both content formats
type ExtendedUIMessage = UIMessage & { content?: string };

import { Button } from "@/components/ui/button";
import { IconCheck, IconCopy } from "@/components/ui/icons";
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";

interface ChatActionsProps extends React.ComponentProps<"div"> {
  /** The Message object containing content to provide actions for */
  message: ExtendedUIMessage;
}

/**
 * ChatActions Component
 *
 * Provides interactive actions for chat messages including clipboard functionality.
 * Features visual feedback with icon changes and rate limiting for copy operations.
 * Automatically shows/hides based on hover state for clean UI.
 *
 * @example
 * ```tsx
 * <ChatActions
 *   message={message}
 *   className="custom-positioning"
 * />
 * ```
 *
 * @see {@link https://ui.shadcn.com/docs/components/button} For button component documentation
 * @see {@link https://github.com/vercel/ai-chatbot/blob/main/components/chat-message-actions.tsx} Original implementation
 *
 * @notes
 * - This component is taken from the Vercel AI SDK example chat application.
 * - Copy action has a 2-second cooldown to prevent spam operations.
 *
 * @todo
 * - Add more actions for the chat message, such as editing and deleting.
 */
export function ChatActions({
  message,
  className,
  ...props
}: ChatActionsProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const onCopy = () => {
    if (isCopied) return;
    // UIMessage can have content directly or parts array with text content
    const messageText =
      message.content ||
      message.parts?.find((part) => part.type === "text")?.text ||
      "";
    copyToClipboard(String(messageText));
  };

  return (
    <div
      className={cn(
        "flex items-center justify-end transition-opacity group-hover:opacity-100 md:opacity-0",
        className
      )}
      {...props}
    >
      <Button variant="secondary" size="sm" onClick={onCopy}>
        {isCopied ? <IconCheck /> : <IconCopy />}
        <span className="sr-only">Copy message</span>
      </Button>
    </div>
  );
}
