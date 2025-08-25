"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";
import { IconArrowDown } from "@/components/ui/icons";

export interface ButtonScrollToBottom extends ButtonProps {
  isAtBottom: boolean;
  scrollToBottom: () => void;
}

export function ButtonScrollToBottom({
  className,
  isAtBottom,
  scrollToBottom,
  ...props
}: ButtonScrollToBottom) {
  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        isAtBottom ? "opacity-0" : "bg-white opacity-100",
        className
      )}
      onClick={scrollToBottom}
      {...props}
    >
      <IconArrowDown />
      <span className="sr-only">Scroll to bottom</span>
    </Button>
  );
}
