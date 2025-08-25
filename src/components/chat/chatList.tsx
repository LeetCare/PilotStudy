/**
 * @fileoverview Chat List Component for Message Display Container
 *
 * This file contains the ChatList component responsible for rendering a list of
 * chat messages. It manages the display of multiple ChatMessage components and
 * handles proper spacing and layout for the conversation flow.
 *
 * @author LeetCare Development Team
 */

import { type UIMessage } from "@ai-sdk/react";
import { ChatMessage } from "@/components/chat/chatMessage";
import { ChatStatus } from "ai";

export interface ChatListProps {
  /** Array of messages to display */
  messages: UIMessage[];
  /** Current chat status */
  status: ChatStatus;
  /** Visual style variant for the chat messages */
  chatStyle?: "default" | "scenario" | "scenario-edit";

  /** Whether an action is currently being performed */
  performingAction?: boolean;

  /** Whether to enable clipboard functionality for messages */
  enableClipboard?: boolean;
}

/**
 * ChatList Component
 *
 * A component that displays a list of chat messages with proper spacing and layout.
 * Uses ChatMessage components for individual message rendering and handles empty states.
 * Works in conjunction with scroll management for smooth conversation flow.
 *
 * @example
 * ```tsx
 * // Scenario-styled message list with clipboard disabled
 * <ChatList
 *   chatStyle="scenario"
 *   messages={messages}
 *   status="streaming"
 *   addToolResult={handleToolResult}
 *   enableClipboard={false}
 *   performingAction={true}
 * />
 * ```
 *
 * @see {@link https://github.com/vercel/ai-chatbot} Vercel AI SDK example chat application
 * @see {@link https://github.com/vercel/ai-chatbot/blob/main/components/chat-list.tsx} Original implementation
 *
 * @notes
 * - The `ChatList` component is taken from the Vercel AI SDK example chat application.
 * - Works in conjunction with ChatScrollAnchor and scroll management hooks
 *   to maintain proper scroll behavior during message updates.
 *
 * @todo
 * - figure out how to not render the first message in the message list
 * (maybe adjust the index to be 1 instead of 0?)
 */
export function ChatList({
  chatStyle = "default",
  messages,
  enableClipboard = true,
}: ChatListProps) {
  if (!messages.length) {
    return null;
  }

  return (
    <div className="size-full space-y-4 px-2 md:space-y-8">
      {messages.map((message: UIMessage, index: number) => (
        <div key={index} className="relative inset-x-0">
          <ChatMessage
            chatStyle={chatStyle}
            enableClipboard={enableClipboard}
            message={message}
            messageIndex={index}
          />
        </div>
      ))}
    </div>
  );
}
