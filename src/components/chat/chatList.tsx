import { Message } from "@ai-sdk/react";
import { ChatMessage } from "@/components/chat/chatMessage";

export interface ChatListProps {
  messages: Message[];
}

export function ChatList({ messages }: ChatListProps) {
  if (!messages.length) {
    return null;
  }

  return (
    <div className="size-full space-y-4 px-2 md:space-y-8">
      {messages.map((message: Message, index: number) => (
        <div key={index} className="relative inset-x-0">
          <ChatMessage message={message} />
        </div>
      ))}
    </div>
  );
}
