/**
 * @fileoverview Prompt Form Component for Chat Input
 *
 * This file contains the PromptForm component responsible for handling user input
 * in the chat interface. It supports both scenario and default modes with different
 * UI layouts and includes voice toggle functionality.
 *
 * @author LeetCare Development Team
 */

import * as React from "react";
import Textarea from "react-textarea-autosize";
import { UseChatHelpers } from "ai/react";
import { useEnterSubmit } from "@/lib/hooks/use-enter-submit";
import { Button } from "@/components/ui/button";
import {
  ArrowUpIcon,
  BookOpen,
  LucideMic,
  TextCursor,
  Plus,
  X,
  Edit3,
} from "lucide-react";
import { IconArrowElbow } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import EvaluationButton from "@/components/chat/buttonEvaluation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export interface PromptProps
  extends Pick<UseChatHelpers, "status" | "messages" | "input" | "setInput"> {
  /** Whether the form should be disabled */
  disabled?: boolean;

  /** The function to call when the form is submitted */
  onSubmit: (value: string) => void;

  /** Placeholder text for the input field */
  placeholder?: string;

  /** Callback for attachment button clicks */
  onAttachmentClick?: () => void;

  /** Callback for microphone button clicks */
  onMicrophoneClick?: () => void;

  /** Type identifier for form styling (scenario vs default vs scenario-edit) */
  type?: string;

  /** State setter for voice mode toggle */
  setIsVoice: React.Dispatch<React.SetStateAction<boolean>>;

  /** Current voice mode state */
  isVoice?: boolean;

  /** Tasks data for rubric display */
  tasks?: string[];

  /** Callback for when tasks are edited (only for scenario-edit mode) */
  onTasksEdit?: (newTasks: string[]) => void;

  /** Callback for evaluation button click */
  onEvaluate?: () => void;

  /** Whether evaluation mode is enabled */
  isEvaluate?: boolean;

  /** Whether this is a scenario-based chat */
  isScenario?: boolean;

  /** Whether the scenario has been completed */
  isScenarioCompleted?: boolean;
}

/**
 * Editable Tasks Component for scenario-edit mode
 */
function EditableTasks({
  tasks = [],
  onTasksEdit,
}: {
  tasks: string[];
  onTasksEdit?: (newTasks: string[]) => void;
}) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTaskValue, setNewTaskValue] = useState("");

  const handleEditTask = (index: number) => {
    setEditingIndex(index);
    setEditValue(tasks[index]);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null && onTasksEdit) {
      const newTasks = [...tasks];
      newTasks[editingIndex] = editValue;
      onTasksEdit(newTasks);
    }
    setEditingIndex(null);
    setEditValue("");
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditValue("");
  };

  const handleDeleteTask = (index: number) => {
    if (onTasksEdit) {
      const newTasks = tasks.filter((_, i) => i !== index);
      onTasksEdit(newTasks);
    }
  };

  const handleAddNew = () => {
    if (newTaskValue.trim() && onTasksEdit) {
      onTasksEdit([...tasks, newTaskValue.trim()]);
      setNewTaskValue("");
      setIsAddingNew(false);
    }
  };

  const handleCancelAdd = () => {
    setNewTaskValue("");
    setIsAddingNew(false);
  };

  return (
    <div className="space-y-2">
      {tasks.map((task, index) => (
        <div key={index} className="group relative">
          {editingIndex === index ? (
            <div className="space-y-2">
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                placeholder="Edit task..."
                autoFocus
              />
              <div className="flex gap-1">
                <Button size="sm" onClick={handleSaveEdit}>
                  Save
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="group flex items-center justify-between rounded-md border border-neutral-300 bg-neutral-100 p-2 text-sm transition-colors hover:bg-neutral-200">
              <span className="flex-1">{task}</span>
              <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleEditTask(index)}
                  className="h-6 w-6 p-0"
                >
                  <Edit3 className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDeleteTask(index)}
                  className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}

      {isAddingNew ? (
        <div className="space-y-2">
          <Input
            value={newTaskValue}
            onChange={(e) => setNewTaskValue(e.target.value)}
            placeholder="Add new task..."
            autoFocus
          />
          <div className="flex gap-1">
            <Button size="sm" onClick={handleAddNew}>
              Add
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancelAdd}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsAddingNew(true)}
          className="w-full"
        >
          <Plus className="mr-1 h-4 w-4" />
          Add Task
        </Button>
      )}
    </div>
  );
}

/**
 * PromptForm Component
 *
 * Chat input form with auto-resizing textarea and contextual controls.
 * Supports both scenario and default modes with voice toggle functionality.
 * Includes specialized features like rubric popover for training scenarios.
 *
 * @example
 * ```tsx
 * // Scenario form with voice toggle
 * <PromptForm
 *   onSubmit={sendMessage}
 *   input={message}
 *   setInput={setMessage}
 *   status="streaming"
 *   type="scenario"
 *   placeholder="Describe your symptoms..."
 *   disabled={false}
 *   setIsVoice={setVoiceMode}
 *   isVoice={false}
 *   tasks={rubricData}
 * />
 * ```
 *
 * @see {@link https://www.npmjs.com/package/react-textarea-autosize} For textarea component documentation
 * @see {@link https://ui.shadcn.com/docs/components/button} For button component documentation
 * @see {@link https://github.com/vercel/ai-chatbot/blob/main/components/prompt-form.tsx} Original implementation
 *
 * @notes
 * - This component is taken from the Vercel AI SDK example chat application.
 * - Uses `react-textarea-autosize` library which automatically adjusts the textarea height as the user types.
 * - The `useEnterSubmit` hook allows the form to be submitted by pressing Enter while preventing submission on Shift+Enter.
 * - Renders completely different layouts based on the `type` prop with scenario type including additional features.
 *
 * @todo
 * - Add a loading state to the button to indicate when the form is being submitted.
 */
export function PromptForm({
  onSubmit,
  input,
  setInput,
  status,
  placeholder = "Write a message...",
  disabled = false,
  type,
  setIsVoice,
  isVoice = false,
  tasks,
  onTasksEdit,
  messages,
  onEvaluate,
  isEvaluate,
  isScenario,
  isScenarioCompleted,
}: PromptProps) {
  const { formRef, onKeyDown } = useEnterSubmit();

  // Automatically focus the textarea when the component is mounted
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length,
      );
    }
  }, []);

  const isScenarioType = type === "scenario" || type === "scenario-edit";
  const isEditMode = type === "scenario-edit";

  if (isScenarioType) {
    return (
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!input?.trim()) {
            return;
          }
          setInput("");
          onSubmit(input);
        }}
        ref={formRef}
        className={cn(
          "relative flex w-full grow items-center overflow-hidden rounded-lg border border-neutral-200 bg-white p-2 shadow-xs",
          disabled && "bg-neutral-100",
        )}
      >
        <div className="flex size-full flex-col">
          <Textarea
            disabled={disabled}
            ref={inputRef}
            tabIndex={0}
            onKeyDown={onKeyDown}
            rows={1}
            maxRows={
              typeof window !== "undefined" && window.innerWidth < 768 ? 4 : 1
            }
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            placeholder={placeholder}
            spellCheck={true}
            className="my-2 w-full resize-none bg-transparent px-3 pb-2 focus-within:outline-hidden disabled:cursor-not-allowed sm:text-sm md:pb-12"
          />
          <div className="flex justify-between">
            <div className="flex items-center space-x-1 px-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="transition-color flex items-center justify-center rounded-full p-1.5"
                  >
                    <BookOpen className="size-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4" align="start">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="leading-none font-medium">
                        {isEditMode ? "Edit Tasks & Points" : "Tasks & Points"}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {isEditMode
                          ? "Edit, add, or remove tasks for this scenario."
                          : "Complete these tasks to earn points in the scenario."}
                      </p>
                    </div>
                    {isEditMode ? (
                      <EditableTasks
                        tasks={tasks || []}
                        onTasksEdit={onTasksEdit}
                      />
                    ) : (
                      tasks && (
                        <div className="space-y-2">
                          {tasks.map((task, index) => (
                            <div
                              key={index}
                              className="flex items-center rounded-md border border-neutral-300 bg-neutral-100 p-2 text-sm"
                            >
                              {task}
                            </div>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                </PopoverContent>
              </Popover>
              <EvaluationButton
                messages={messages} // Pass messages directly
                onEvaluate={onEvaluate} // Pass onEvaluate as evaluate
                isEvaluated={isEvaluate} // Pass isEvaluate as isEvaluated
                isEvaluating={false} // Set default or pass if needed
                disabled={disabled || isScenarioCompleted} // Disable if scenario is completed or form is disabled
              />
            </div>

            <div className="flex items-center space-x-1 px-1">
              <Button
                variant="outline"
                size="icon"
                type="button"
                disabled={disabled && !isVoice}
                className={cn(
                  "flex size-8 items-center justify-between rounded-full border p-1.5 transition-all duration-500",
                  !(disabled && !isVoice) && "group hover:w-36",
                )}
                onClick={() => setIsVoice(!isVoice)}
              >
                {isVoice ? (
                  <div className="line-clamp-1 flex w-full items-center justify-end gap-2">
                    <span className="hidden w-0 overflow-hidden text-xs whitespace-nowrap opacity-0 transition-all duration-300 group-hover:flex group-hover:w-full group-hover:opacity-100">
                      Switch to Text
                    </span>
                    <TextCursor className="size-4" />
                  </div>
                ) : (
                  <div className="line-clamp-1 flex w-full items-center justify-end gap-2">
                    <span className="hidden w-0 overflow-hidden text-xs whitespace-nowrap opacity-0 transition-all duration-300 group-hover:flex group-hover:w-full group-hover:opacity-100">
                      Switch to Voice
                    </span>
                    <LucideMic className="size-4" />
                  </div>
                )}
                <span className="sr-only">Voice input</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="flex size-8 items-center justify-center rounded-full border p-1.5 transition-colors duration-300 disabled:pointer-events-none"
                type="submit"
                disabled={status === "streaming" || input === "" || disabled}
              >
                <ArrowUpIcon className="size-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </div>
        </div>
      </form>
    );
  } else {
    return (
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!input?.trim()) {
            return;
          }
          setInput("");
          onSubmit(input);
        }}
        ref={formRef}
        className="relative flex w-full grow resize-none items-center overflow-hidden border-neutral-400 bg-white pr-2 sm:rounded-lg sm:border"
      >
        <Textarea
          disabled={disabled}
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          rows={1}
          maxRows={2}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          placeholder={
            disabled
              ? "Confirm your edits before requesting another change!"
              : placeholder
          }
          spellCheck={true}
          className="w-full resize-none bg-transparent px-4 py-4 focus-within:outline-hidden disabled:cursor-not-allowed sm:text-sm"
        />
        <Button
          className="rounded-xl disabled:cursor-not-allowed"
          type="submit"
          size="sm"
          disabled={status === "streaming" || input === "" || disabled}
        >
          <IconArrowElbow />
          <span className="sr-only">{placeholder}</span>
        </Button>
      </form>
    );
  }
}
