import * as React from "react";
import { Button } from "@/components/ui/button";
import { PromptForm } from "@/components/chat/promptForm";
import { ButtonScrollToBottom } from "@/components/chat/buttonScrollToBottom";
import { IconStop } from "@/components/ui/icons";
import { UseChatHelpers } from "@ai-sdk/react";

export interface ChatPanelProps
  extends React.ComponentProps<"div">,
    Pick<
      UseChatHelpers,
      | "append"
      | "status"
      | "messages"
      | "stop"
      | "input"
      | "setInput"
      | "setMessages"
    > {
  disabled?: boolean;
  isScenarioCompleted?: boolean;
  id?: string;
  title?: string;
  isAtBottom: boolean;
  scrollToBottom: () => void;
  placeholder?: string;
  onComplete?: () => void;
  timer: number;
}

export function ChatPanel({
  status,
  stop,
  append,
  input,
  setInput,
  disabled,
  messages,
  isAtBottom,
  scrollToBottom,
  placeholder,
  onComplete,
  timer
}: ChatPanelProps) {
  return (
    <div className="bg-background/80 sticky bottom-0 backdrop-blur-2xl">
      <div className="absolute bottom-0 z-[-10] size-full" />
      <div className="relative bottom-12 flex h-0 w-full justify-between px-6">
        <div className="w-10 opacity-0" />
        {status === "streaming" && (
          <Button
            variant="outline"
            size="sm"
            className="bg-white"
            onClick={() => stop()}
          >
            <IconStop className="mr-2" />
            Stop generating
          </Button>
        )}
        <ButtonScrollToBottom
          isAtBottom={isAtBottom}
          scrollToBottom={scrollToBottom}
        />
      </div>
      <div className="mx-0 w-full max-w-screen">
        <div className="flex w-full items-center justi  y-between gap-2 sm:gap-4 mb-4">
          <PromptForm
            disabled={disabled}
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
            messages={messages}
            onComplete={onComplete}
            timer={timer}
          />
        </div>
      </div>
    </div>
  );
}
