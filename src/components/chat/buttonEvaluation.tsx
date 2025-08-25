"use client";

import { Message } from "ai/react";
import { Button, ButtonProps } from "../ui/button";
import { Loader2 } from "lucide-react";

interface EvaluationButtonProps extends ButtonProps {
  messages: Message[];
  onEvaluate?: () => void;
  isEvaluated?: boolean;
  isEvaluating: boolean;
  disabled?: boolean;
}

export default function EvaluationButton({
  onEvaluate,
  isEvaluated,
  isEvaluating,
  disabled,
  ...props
}: EvaluationButtonProps) {
  async function onClick() {
    try {
      const userConfirmed = window.confirm(
        "Are you sure you want to evaluate? This action can only be done once."
      );

      if (!userConfirmed) {
        return;
      }

      onEvaluate?.();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Button
      {...props}
      onClick={onClick}
      variant="outline"
      disabled={isEvaluated || isEvaluating || disabled}
      className="text-lg transition-color"
    >
      {isEvaluated ? (
        "Evaluated"
      ) : isEvaluating ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        "Evaluate"
      )}
    </Button>
  );
}
