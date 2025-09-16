"use client";

import { Message } from "ai/react";
import { Button, ButtonProps } from "../ui/button";
import { useState } from "react";

interface CompleteButtonProps extends ButtonProps {
  messages: Message[];
  onComplete?: () => void;
  disabled?: boolean;
  timer: number;
}

export default function CompleteButton({
  messages,
  onComplete: onComplete,
  disabled,
  timer,
  ...props
}: CompleteButtonProps) {
  const [saved, setSaved] = useState(false);
  async function onClick() {
    try {
      const userConfirmed = window.confirm(
        "Are you sure you want to complete the scenario? This cannot be undone."
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
      setSaved(true);

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
      disabled={saved || disabled}
      className="text-lg transition-color"
    >
      {saved ? "Completed" : "Complete"}
    </Button>
  );
}
