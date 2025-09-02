import * as React from "react";
import Textarea from "react-textarea-autosize";
import { useEnterSubmit } from "@/lib/hooks/use-enter-submit";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import { Message } from "@ai-sdk/react";
import CompleteButton from "./completeButton";

export interface PromptProps {
  status: "loading" | "streaming" | "idle" | string;
  messages: Message[];
  input: string;
  setInput: (value: string) => void;
  disabled?: boolean;
  onSubmit: (value: string) => void;
  placeholder?: string;
}

export function PromptForm({
  messages,
  onSubmit,
  input,
  setInput,
  status,
  placeholder = "Write a message...",
  disabled = false,
}: PromptProps) {
  const { formRef, onKeyDown } = useEnterSubmit();

  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, []);

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
        disabled && "bg-neutral-100"
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
            <CompleteButton
              messages={messages}
              isComplete={false}
              disabled={disabled}
            />
          </div>

          <div className="flex items-center space-x-1 px-1">
            <Button
              variant="outline"
              size="icon"
              className="flex size-8 items-center justify-center rounded-full border p-1.5 transition-colors duration-300 disabled:pointer-events-none"
              type="submit"
              disabled={status === "loading" || input === "" || disabled}
            >
              <ArrowUpIcon className="size-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
