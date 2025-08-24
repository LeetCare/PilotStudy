/**
 * @fileoverview Chat List Component for Message Display Container
 *
 * This file contains the ChatList component responsible for rendering a list of
 * chat messages. It manages the display of multiple ChatMessage components and
 * handles proper spacing and layout for the conversation flow.
 *
 * @author LeetCare Development Team
 */

import { type Message } from "ai";
import { ChatMessage } from "@/components/chat/chatMessage";
import { UseChatHelpers } from "ai/react";

export interface ChatListProps
  extends Pick<UseChatHelpers, "messages" | "status"> {
  /** Visual style variant for the chat messages */
  chatStyle?: "default" | "scenario" | "scenario-edit";

  /** Whether an action is currently being performed */
  performingAction?: boolean;

  /** Function to add tool execution results from LLM tool calls to the chat */
  addToolResult: ({
    toolCallId,
    result,
  }: {
    toolCallId: string;
    result: any;
  }) => void;

  /** Whether to enable clipboard functionality for messages */
  enableClipboard?: boolean;

  /** Callback for when message content is edited (only for scenario-edit mode) */
  onStartingMessageEdit?: (newContent: string) => void;

  /** Optional persona prompt for the AI patient */
  personaPrompt?: string;

  /** Callback for when persona prompt is edited */
  onPersonaEdit?: (newPersona: string) => void;
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
  addToolResult,
  enableClipboard = true,
  onStartingMessageEdit,
  personaPrompt,
  onPersonaEdit,
}: ChatListProps) {
  if (!messages.length) {
    return null;
  }

  return (
    <div className="size-full space-y-4 px-2 md:space-y-8">
      {messages.map((message: Message, index) => (
        <div key={index} className="relative inset-x-0">
          <ChatMessage
            chatStyle={chatStyle}
            enableClipboard={enableClipboard}
            message={message}
            addToolResult={addToolResult}
            onStartingMessageEdit={onStartingMessageEdit}
            personaPrompt={personaPrompt}
            onPersonaEdit={onPersonaEdit}
            messageIndex={index}
          />
        </div>
      ))}
    </div>
  );
}
