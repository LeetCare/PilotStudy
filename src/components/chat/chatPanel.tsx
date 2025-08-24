/**
 * @fileoverview Chat Panel Component for Input Controls and Actions
 *
 * This file contains the ChatPanel component responsible for managing chat input
 * controls, action buttons, and evaluation functionality. It provides the bottom
 * panel interface with form input, scroll controls, and regeneration options.
 *
 * @author LeetCare Development Team
 */

import * as React from "react";
import { type UseChatHelpers } from "ai/react";
import { Button } from "@/components/ui/button";
import { PromptForm } from "@/components/chat/promptForm";
import { ButtonScrollToBottom } from "@/components/chat/buttonScrollToBottom";
import { IconRefresh, IconStop } from "@/components/ui/icons";

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    "append" | "status" | "reload" | "messages" | "stop" | "input" | "setInput"
  > {
  /** Whether the panel should be disabled */
  disabled?: boolean;

  /** Whether this scenario has already been completed to disable evaluate button */
  isScenarioCompleted?: boolean;

  /** Optional unique identifier for the chat panel */
  id?: string;

  /** Optional title for the chat panel */
  title?: string;

  /** Whether the user is at the bottom of the chat */
  isAtBottom: boolean;

  /** Function to scroll to bottom of chat */
  scrollToBottom: () => void;

  /** Placeholder text for the input field */
  placeholder?: string;

  /** Type identifier for panel styling and behavior */
  type?: string;

  /** State setter for voice mode toggle */
  setIsVoice: React.Dispatch<React.SetStateAction<boolean>>;

  /** Current voice mode state */
  isVoice: boolean;

  /** Whether evaluation mode is enabled */
  isEvaluate?: boolean;

  /** Callback for evaluation button click */
  onEvaluate?: () => void;

  /** Whether this is a scenario-based chat */
  isScenario?: boolean;

  /** Tasks data for rubric display */
  tasks?: string[];

  /** Callback for when tasks are edited (only for scenario-edit mode) */
  onTasksEdit?: (newTasks: string[]) => void;
}

/**
 * ChatPanel Component
 *
 * Bottom panel interface for chat input controls and contextual actions.
 * Provides adaptive controls including stop/reload buttons, scroll management, and evaluation functionality.
 * Seamlessly integrates voice mode switching and scenario-specific features.
 *
 * @example
 * ```tsx
 * // Scenario panel with evaluation
 * <ChatPanel
 *   status="streaming"
 *   stop={stop}
 *   reload={reload}
 *   append={append}
 *   input={input}
 *   setInput={setInput}
 *   disabled={false}
 *   messages={messages}
 *   isAtBottom={isAtBottom}
 *   scrollToBottom={scrollToBottom}
 *   placeholder="Describe your symptoms..."
 *   type="scenario"
 *   setIsVoice={setVoiceMode}
 *   isVoice={false}
 *   isEvaluate={false}
 *   onEvaluate={handleEvaluation}
 *   isScenario={true}
 * />
 * ```
 *
 * @see {@link https://ui.shadcn.com/docs/components/button} For button component documentation
 * @see {@link https://github.com/vercel/ai-chatbot/blob/main/components/chat-panel.tsx} Original implementation
 *
 * @notes
 * - This component is taken from the Vercel AI SDK example chat application.
 * - Disables text input when voice mode is active, allowing seamless mode switching.
 * - For scenario-based training, includes an evaluation button that can be disabled during active evaluation.
 *
 * @todo
 * - Add a loading state to the buttons to indicate when the request is being sent.
 */
export function ChatPanel({
  status,
  stop,
  reload,
  append,
  input,
  setInput,
  disabled,
  messages,
  isAtBottom,
  scrollToBottom,
  placeholder,
  type,
  setIsVoice,
  isVoice,
  isEvaluate,
  onEvaluate,
  isScenario,
  tasks,
  isScenarioCompleted,
  onTasksEdit,
}: ChatPanelProps) {
  return (
    <div className="bg-background/80 sticky bottom-0 backdrop-blur-2xl">
      <div className="absolute bottom-0 z-[-10] size-full" />
      <div className="relative bottom-12 flex h-0 w-full justify-between px-6">
        <div className="w-10 opacity-0" />
        {status === "streaming" ? (
          <Button
            variant="outline"
            size="sm"
            className="bg-white"
            onClick={() => stop()}
          >
            <IconStop className="mr-2" />
            Stop generating
          </Button>
        ) : messages?.length >= 2 ? (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="bg-white"
              onClick={() => reload()}
            >
              <IconRefresh />
            </Button>
          </div>
        ) : null}
        <ButtonScrollToBottom
          isAtBottom={isAtBottom}
          scrollToBottom={scrollToBottom}
        />
      </div>
      <div className="mx-0 w-full max-w-screen">
        <div className="flex w-full items-center justify-between gap-2 sm:gap-4 mb-4">
          <PromptForm
            type={type}
            disabled={disabled || isVoice}
            onSubmit={async (value) => {
              try {
                await append({
                  content: value,
                  role: "user",
                });
              } catch (error) {
                console.log(error);
              }
            }}
            input={input}
            setInput={setInput}
            status={status}
            placeholder={placeholder}
            setIsVoice={setIsVoice}
            isVoice={isVoice}
            messages={messages} // ADDED: Pass messages to PromptForm
            onEvaluate={onEvaluate}
            isEvaluate={isEvaluate}
            isScenario={isScenario}
            isScenarioCompleted={isScenarioCompleted}
            tasks={tasks}
            onTasksEdit={onTasksEdit}
          />
        </div>
      </div>
    </div>
  );
}
