/**
 * @fileoverview Main Chat Component for LeetCare Medical Training Application
 *
 * This file contains the primary chat interface component that handles both text and voice
 * conversations in medical scenarios or the other AI chat functions like the case editor.
 *
 * @author LeetCare Development Team
 */

"use client";

import { ChatList } from "./chatList";
import { ChatPanel } from "./chatPanel";
import { RefObject, useState } from "react";
import { useAtBottom } from "@/lib/hooks/use-at-bottom";
import { ChatScrollAnchor } from "./chatScrollAnchor";
import { UseChatHelpers } from "ai/react";
import VoiceChat from "@/components/voice/voiceComponent";
import { Role } from "@11labs/react";
import {useEffect} from "react";

export interface ChatProps
  extends React.ComponentProps<"div">,
    Pick<
      UseChatHelpers,
      | "append"
      | "status"
      | "reload"
      | "messages"
      | "stop"
      | "input"
      | "setInput"
      | "setMessages"
    > {
  /** Visual style variant for the chat interface */
  chatStyle?: "default" | "scenario" | "scenario-edit";

  /** Reference to the scrollable container element */
  scrollRef: RefObject<HTMLDivElement>;

  /** Function to add tool execution results from LLM tool calls to the chat */
  addToolResult: ({
    toolCallId,
    result,
  }: {
    toolCallId: string;
    result: any;
  }) => void;

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

  /** Voice type for text-to-speech functionality */
  voiceType?: "youngMale" | "youngFemale" | "oldMale" | "oldFemale";

  /** Whether evaluation mode is enabled */
  isEvaluate?: boolean;

  /** Callback function triggered when evaluation is requested */
  onEvaluate?: () => void;
  /** Whether this is a scenario-based chat session */
  isScenario?: boolean;

  /** Tasks data for rubric display */
  tasks?: string[];

  /** Callback for when message content is edited (only for scenario-edit mode) */
  onStartingMessageEdit?: (newMessage: string) => void;

  /** Callback for when tasks are edited (only for scenario-edit mode) */
  onTasksEdit?: (newTasks: string[]) => void;

  /** Callback for when persona prompt is edited */
  onPersonaEdit?: (newPersona: string) => void;

  /** Scenario ID for determining user completion */
  scenarioId?: string;
}

/**
 * Chat Component
 *
 * This component uses the vercel AI SDK for chat, and the elevenlabs API for voice.
 * Manages message display, scroll behavior, and voice mode switching with evaluation capabilities.
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
 * // Scenario-based chat with voice support
 * <Chat
 *   chatStyle="scenario"
 *   scrollRef={scrollRef}
 *   messages={messages}
 *   input={input}
 *   setInput={setInput}
 *   append={append}
 *   status={status}
 *   addToolResult={addToolResult}
 *   voiceType="youngFemale"
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
 * @see VoiceChat
 * @see https://chat.vercel.ai/
 * @see https://github.com/vercel/ai-chatbot/blob/main/components/chat.tsx original implementation of the chat component
 *
 * @notes
 * - This component is taken from the Vercel AI SDK example chat application.
 * - Uses the `useChat` hook from vercel's AI SDK package for chat state management.
 * - Uses ElevenLabs (@11labs/react) for voice chat functionality when voice mode is enabled.
 * - The `inputRef` ref automatically focuses the textarea when the component is mounted.
 * - Uses `useAtBottom` hook for intelligent scroll behavior.
 *
 * @todo
 * - Add a loading state to the button to indicate when the form is being submitted.
 */
export default function Chat({
  setMessages,
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
  addToolResult,
  enableClipboard = true,
  type,
  personaPrompt,
  startingMessage,
  voiceType,
  isEvaluate,
  onEvaluate,
  isScenario,
  tasks,
  onStartingMessageEdit,
  onTasksEdit,
  onPersonaEdit,
  scenarioId,
}: ChatProps) {
  // Used for the autoscroller and the scroll-to-bottom button
  const { isAtBottom, scrollToBottom } = useAtBottom(scrollRef);
  const [isVoice, setIsVoice] = useState(false);
  const [isScenarioCompleted, setIsScenarioCompleted] = useState(false);

  useEffect(() => {
    const checkScenarioCompletion = async () => {
      if (!scenarioId) return;
  
      try {
        const res = await fetch(`/api/profile?scenarioId=${scenarioId}`);
  
        if (!res.ok) {
          throw new Error("Failed to check scenario completion");
        }
  
        const data = await res.json();
        setIsScenarioCompleted(data.isCompleted);
      } catch (error) {
        console.error("Error checking scenario completion:", error);
      }
    };
  
    checkScenarioCompletion();
  }, [scenarioId]);

  /*
   * Converts voice messages to standard Message format and adds them to chat history.
   */
  const handleVoiceMessage = (message: { message: string; source: Role }) => {
    if (message.source === "user") {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "user",
          content: message.message,
          id: Date.now().toString(),
          createdAt: new Date(),
          parts: [
            {
              type: "text",
              text: message.message,
            },
          ],
        },
      ]);
    } else if (message.source === "ai") {
      console.log("Received AI message:", message);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: message.message,
          id: Date.now().toString(),
          createdAt: new Date(),
        },
      ]);
    }
  };

  return (
    <div
      ref={scrollRef}
      id="chat-body"
      className="relative flex size-full items-center justify-center overflow-y-auto [scrollbar-gutter:stable]"
    >
      <div className="relative flex size-full max-w-4xl flex-col px-4">
        <div className="flex flex-1 flex-col justify-between space-y-4 px-4 md:space-y-8">
          {isVoice ? (
            <VoiceChat
              voiceType={voiceType ?? "youngMale"}
              firstMessage={startingMessage ?? ""}
              personaPrompt={personaPrompt ?? ""}
              handleVoiceMessage={handleVoiceMessage}
            />
          ) : (
            <>
              <ChatList
                chatStyle={chatStyle}
                messages={messages}
                status={status}
                addToolResult={addToolResult}
                enableClipboard={enableClipboard}
              />
              <ChatScrollAnchor
                scrollRef={scrollRef}
                isAtBottom={isAtBottom}
                trackVisibility={status === "streaming"}
              />
            </>
          )}
        </div>
        <ChatPanel
          isScenarioCompleted={isScenarioCompleted}
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
          setIsVoice={setIsVoice}
          isVoice={isVoice}
          isEvaluate={isEvaluate}
          onEvaluate={onEvaluate}
          isScenario={isScenario}
          tasks={tasks}
        />
      </div>
    </div>
  );
}
