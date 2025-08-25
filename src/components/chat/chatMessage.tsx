import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import { MemoizedReactMarkdown } from "@/components/markdown/markdown";
import { IconUser } from "@/components/ui/icons";
import { Message } from "@ai-sdk/react";

export interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message, ...props }: ChatMessageProps) {
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
          "mr-4 flex size-9 shrink-0 cursor-default items-center justify-center rounded-full border shadow-[0_0_10px] transition-colors select-none",
          message.role === "user" && "hidden"
        )}
      >
        {message.role === "assistant" && <IconUser />}
      </div>
      <div
        className={cn(
          "relative flex w-full overflow-hidden pr-4",
          message.role === "user" &&
            "border-secondary bg-gray-100 ml-4 w-fit max-w-[80%] shrink flex-row-reverse justify-end rounded-3xl px-6 py-2 text-white sm:max-w-[66%]"
        )}
      >
        <MemoizedReactMarkdown
          className="prose dark:prose-invert prose-p:leading-relaxed break-words"
          remarkPlugins={[remarkGfm]}
          components={{
            em({ children }) {
              return (
                <em className={cn("text-neutral-600 dark:text-neutral-400")}>
                  {children}
                </em>
              );
            },
            p({ children }) {
              return (
                <p
                  className={cn(
                    message.role === "user" && "dark:text-neutral-400",
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
    </div>
  );
}
