"use client";

import { ChatList } from "./chatList";
import { ChatPanel } from "./chatPanel";
import { RefObject } from "react";
import { useAtBottom } from "@/lib/hooks/use-at-bottom";
import { ChatScrollAnchor } from "./chatScrollAnchor";
import { UseChatHelpers } from "ai/react";

export interface ChatProps
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
  scrollRef: RefObject<HTMLDivElement>;
  enableClipboard?: boolean;
  disabled?: boolean;
  onComplete?: () => void;
}

export default function Chat({
  setMessages,
  scrollRef,
  messages,
  input,
  stop,
  setInput,
  disabled = false,
  status,
  append,
  onComplete,
}: ChatProps) {
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
            <ChatList messages={messages} />
            <ChatScrollAnchor
              scrollRef={scrollRef}
              isAtBottom={isAtBottom}
              trackVisibility={status === "streaming"}
            />
          </>
        </div>
        <ChatPanel
          setMessages={setMessages}
          disabled={disabled}
          status={status}
          stop={stop}
          append={append}
          messages={messages}
          input={input}
          setInput={setInput}
          isAtBottom={isAtBottom}
          scrollToBottom={scrollToBottom}
          placeholder={"Write a message..."}
          onComplete={onComplete}
        />
      </div>
    </div>
  );
}
