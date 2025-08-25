/**
 * @fileoverview Chat Message Component for Individual Message Display
 *
 * This file contains the ChatMessage component responsible for rendering individual
 * messages in the chat interface. It handles message styling, markdown rendering,
 * and displays appropriate icons based on message sender role.
 *
 * @author LeetCare Development Team
 */

import { UIMessage } from "@ai-sdk/react";

// Type extension to handle both content formats
type ExtendedUIMessage = UIMessage & { content?: string };
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import { MemoizedReactMarkdown } from "@/components/markdown/markdown";
import { IconUser } from "@/components/ui/icons";
import { ChatActions } from "@/components/chat/chatActions";

export interface ChatMessageProps {
  /** Visual style variant for the chat message */
  chatStyle?: "default" | "scenario" | "scenario-edit";

  /** The Message object to display with role and content properties */
  message: ExtendedUIMessage;

  /** Function to add tool execution results from LLM tool calls to the chat */
  addToolResult?: ({
    toolCallId,
    result,
  }: {
    toolCallId: string;
    result: any;
  }) => void;

  /** Whether to show clipboard functionality for this message */
  enableClipboard?: boolean;

  /** Whether to display the message in vertical layout */
  vertical?: boolean;

  /** Index of the message in the message list */
  messageIndex?: number;
}

/**
 * ChatMessage Component
 *
 * Renders individual chat messages with role-based styling and markdown support.
 * Automatically differentiates between user and assistant messages with appropriate icons and layouts.
 * Supports GitHub Flavored Markdown for rich text formatting.
 *
 * @example
 * ```tsx
 * // Assistant message with markdown content
 * <ChatMessage
 *   message={{
 *     id: "msg-2",
 *     role: "assistant",
 *     content: "The main symptoms include:\n\n- **Cough** with phlegm\n- *Fever* and chills\n- Difficulty breathing",
 *     createdAt: new Date()
 *   }}
 *   addToolResult={handleToolResult}
 *   enableClipboard={true}
 *   chatStyle="scenario"
 * />
 * ```
 *
 * @see {@link https://github.com/remarkjs/remark-gfm} GitHub Flavored Markdown plugin
 * @see {@link https://sdk.vercel.ai/docs} Vercel AI SDK Message type
 * @see {@link https://github.com/vercel/ai-chatbot/blob/main/components/chat-message.tsx} Original implementation
 *
 * @notes
 * - This component is taken from the Vercel AI SDK example chat application.
 * - The `MemoizedReactMarkdown` component converts markdown text into React components and supports GitHub Flavored Markdown extensions like tables, task lists, and strikethrough text.
 * - The `remarkGfm` plugin enables advanced markdown features like tables, footnotes, task lists, and autolinks.
 *
 * @todo
 * - Add a loading state to indicate when the message is being processed.
 */
export function ChatMessage({
  chatStyle = "scenario",
  enableClipboard = true,
  message,
  vertical = false,
  messageIndex,
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
          {message.content ||
            message.parts?.find((part) => part.type === "text")?.text ||
            ""}
        </MemoizedReactMarkdown>
      </div>
      {enableClipboard && <ChatActions message={message} />}
    </div>
  );
}
