"use client";

import { Message } from "ai/react";
import { Button, ButtonProps } from "../ui/button";

interface CompleteButtonProps extends ButtonProps {
  messages: Message[];
  onComplete?: () => void;
  isComplete?: boolean;
  disabled?: boolean;
}

export default function CompleteButton({
  onComplete: onComplete,
  isComplete: isComplete,
  disabled,
  ...props
}: CompleteButtonProps) {
  async function onClick() {
    try {
      const userConfirmed = window.confirm(
        "Are you sure you want to complete the scenario?"
      );

      if (!userConfirmed) {
        return;
      }

      onComplete?.();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Button
      {...props}
      onClick={onClick}
      variant="outline"
      disabled={isComplete || disabled}
      className="text-lg transition-color"
    >
      {isComplete ? "Completed" : "Complete"}
    </Button>
  );
}
