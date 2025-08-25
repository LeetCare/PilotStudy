import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import { MemoizedReactMarkdown } from "@/components/markdown/markdown";
import { IconUser } from "@/components/ui/icons";
import { ChatActions } from "@/components/chat/chatActions";
import { Message } from "@ai-sdk/react";

export interface ChatMessageProps {
  chatStyle?: "default" | "scenario" | "scenario-edit";
  message: Message;
  enableClipboard?: boolean;
}

export function ChatMessage({
  chatStyle = "scenario",
  enableClipboard = true,
  message,
  ...props
}: ChatMessageProps) {
  return (
    <div
      className={cn(
        message.role === "user" && "flex-row-reverse",
        "group flex items-start py-2"
      )}
      {...props}
    >
      <div
        className={cn(
          "mr-4 flex size-9 shrink-0 cursor-default items-center justify-center rounded-full border shadow-[0_0_10px_rgba(72,121,180,0.3)] transition-colors select-none",
          message.role === "user" && "hidden"
        )}
      >
        {message.role === "assistant" && <IconUser />}
      </div>
      <div
        className={cn(
          "relative flex w-full overflow-hidden pr-4",
          message.role === "user" &&
            "border-secondary bg-cobalt-100 ml-4 w-fit max-w-[80%] shrink flex-row-reverse justify-end rounded-3xl px-6 py-2 text-white sm:max-w-[66%]"
        )}
      >
        <MemoizedReactMarkdown
          className="prose dark:prose-invert prose-p:leading-relaxed break-words"
          remarkPlugins={[remarkGfm]}
          components={{
            em({ children }) {
              return (
                <em
                  className={cn(
                    chatStyle === "scenario" &&
                      "text-neutral-600 dark:text-neutral-400"
                  )}
                >
                  {children}
                </em>
              );
            },
            p({ children }) {
              return (
                <p
                  className={cn(
                    chatStyle === "scenario" && "text-cobalt-500",
                    message.role === "user" && "dark:text text-neutral-600",
                    "last:pb-0"
                  )}
                >
                  {children}
                </p>
              );
            },
          }}
        >
          {message.content || ""}
        </MemoizedReactMarkdown>
      </div>
      {enableClipboard && <ChatActions message={message} />}
    </div>
  );
}
