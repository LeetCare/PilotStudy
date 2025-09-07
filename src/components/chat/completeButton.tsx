"use client";

import { Message } from "ai/react";
import { Button, ButtonProps } from "../ui/button";

interface CompleteButtonProps extends ButtonProps {
  messages: Message[];
  onComplete?: () => void;
  isComplete?: boolean;
  disabled?: boolean;
  timer: number;
}

export default function CompleteButton({
  messages,
  onComplete: onComplete,
  isComplete: isComplete,
  disabled,
  timer,
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

      // Call the save API to log the messages
      const response = await fetch("/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages, timer }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save messages");
      }

      const result = await response.json();
      console.log("Messages saved successfully:", result);

      onComplete?.();


    } catch (error) {
      console.error("Error saving messages:", error);
      // Show error to user but still proceed with completion
      alert(
        "There was an error saving the session data, but the scenario will still be completed."
      );
      onComplete?.();
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
