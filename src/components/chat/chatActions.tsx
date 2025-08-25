"use client";

import { Message } from "@ai-sdk/react";

import { Button } from "@/components/ui/button";
import { IconCheck, IconCopy } from "@/components/ui/icons";
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";

interface ChatActionsProps extends React.ComponentProps<"div"> {
  message: Message;
}

export function ChatActions({
  message,
  className,
  ...props
}: ChatActionsProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const onCopy = () => {
    if (isCopied) return;
    const messageText = message.content || "";
    copyToClipboard(String(messageText));
  };

  return (
    <div
      className={cn(
        "flex items-center justify-end transition-opacity group-hover:opacity-100 md:opacity-0",
        className
      )}
      {...props}
    >
      <Button variant="secondary" size="sm" onClick={onCopy}>
        {isCopied ? <IconCheck /> : <IconCopy />}
        <span className="sr-only">Copy message</span>
      </Button>
    </div>
  );
}
