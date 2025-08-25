/**
 * @fileoverview Main Chat Component for LeetCare Medical Training Application
 *
 * This file contains the primary chat interface component that handles text
 * conversations in medical scenarios or the other AI chat functions like the case editor.
 *
 * @author LeetCare Development Team
 */

"use client";

import { ChatList } from "./chatList";
import { ChatPanel } from "./chatPanel";
import { RefObject } from "react";
import { useAtBottom } from "@/lib/hooks/use-at-bottom";
import { ChatScrollAnchor } from "./chatScrollAnchor";
import { UIMessage } from "@ai-sdk/react";
import { ChatStatus } from "ai";

export interface ChatProps extends React.ComponentProps<"div"> {
  /** Messages array from useChat hook */
  messages: UIMessage[];
  /** Function to send a message */
  append: (message: { content: string; role: string }) => Promise<void>;
  /** Function to reload/regenerate the last message */
  reload: () => void;
  /** Current input value */
  input: string;
  /** Function to set input value */
  setInput: (value: string) => void;
  /** Chat status */
  status: ChatStatus;
  /** Function to stop streaming */
  stop: () => void;
  /** Visual style variant for the chat interface */
  chatStyle?: "default" | "scenario" | "scenario-edit";

  /** Reference to the scrollable container element */
  scrollRef: RefObject<HTMLDivElement>;

  /** Whether to show clipboard functionality for messages */
  enableClipboard?: boolean;

  /** Whether the chat input should be disabled */
  disabled?: boolean;

  /** Type identifier for the chat session */
  type?: string;

  /** Persona prompt for AI character behavior */
  personaPrompt?: string;

  /** Initial message to start the conversation */
  startingMessage?: string;

  /** Whether evaluation mode is enabled */
  isEvaluate?: boolean;

  /** Callback function triggered when evaluation is requested */
  onEvaluate?: () => void;
  /** Whether this is a scenario-based chat session */
  isScenario?: boolean;

  /** Tasks data for rubric display */
  tasks?: string[];

  /** Scenario ID for determining user completion */
  scenarioId?: string;
}

/**
 * Chat Component
 *
 * This component uses the vercel AI SDK for chat.
 * Manages message display, scroll behavior, and evaluation capabilities.
 * Integrates ChatList for message display and ChatPanel for input controls.
 *
 * @example
 * ```tsx
 * // Basic chat setup
 * <Chat
 *   scrollRef={scrollRef}
 *   messages={messages}
 *   input={input}
 *   setInput={setInput}
 *   append={append}
 *   status={status}
 *   addToolResult={addToolResult}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Scenario-based chat
 * <Chat
 *   chatStyle="scenario"
 *   scrollRef={scrollRef}
 *   messages={messages}
 *   input={input}
 *   setInput={setInput}
 *   append={append}
 *   status={status}
 *   addToolResult={addToolResult}

 *   personaPrompt="You are a patient with chest pain symptoms"
 *   startingMessage="Doctor, I've been having chest pain for the past hour"
 *   isScenario={true}
 *   isEvaluate={true}
 *   onEvaluate={handleEvaluation}
 * />
 * ```
 *
 * @see ChatHeader
 * @see ChatList
 * @see ChatPanel

 * @see https://chat.vercel.ai/
 * @see https://github.com/vercel/ai-chatbot/blob/main/components/chat.tsx original implementation of the chat component
 *
 * @notes
 * - This component is taken from the Vercel AI SDK example chat application.
 * - Uses the `useChat` hook from vercel's AI SDK package for chat state management.

 * - The `inputRef` ref automatically focuses the textarea when the component is mounted.
 * - Uses `useAtBottom` hook for intelligent scroll behavior.
 *
 * @todo
 * - Add a loading state to the button to indicate when the form is being submitted.
 */
export default function Chat({
  chatStyle = "default",
  scrollRef,
  messages,
  input,
  stop,
  setInput,
  disabled = false,
  status,
  append,
  reload,
  enableClipboard = true,
  type,
  isEvaluate,
  onEvaluate,
  isScenario,
  tasks,
}: ChatProps) {
  // Used for the autoscroller and the scroll-to-bottom button
  const { isAtBottom, scrollToBottom } = useAtBottom(scrollRef);

  return (
    <div
      ref={scrollRef}
      id="chat-body"
      className="relative flex size-full items-center justify-center overflow-y-auto [scrollbar-gutter:stable]"
    >
      <div className="relative flex size-full max-w-4xl flex-col px-4">
        <div className="flex flex-1 flex-col justify-between space-y-4 px-4 md:space-y-8">
          <>
            <ChatList
              status={status}
              chatStyle={chatStyle}
              messages={messages}
              enableClipboard={enableClipboard}
            />
            <ChatScrollAnchor
              scrollRef={scrollRef}
              isAtBottom={isAtBottom}
              trackVisibility={status === "streaming"}
            />
          </>
        </div>
        <ChatPanel
          disabled={disabled}
          status={status}
          stop={stop}
          append={append}
          reload={reload}
          messages={messages}
          input={input}
          setInput={setInput}
          isAtBottom={isAtBottom}
          scrollToBottom={scrollToBottom}
          placeholder={"Write a message..."}
          type={type}
          isEvaluate={isEvaluate}
          onEvaluate={onEvaluate}
          isScenario={isScenario}
          tasks={tasks}
        />
      </div>
    </div>
  );
}
