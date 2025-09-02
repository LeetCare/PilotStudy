"use client";

import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";
import { Message } from "@ai-sdk/react";

interface TakeBPButtonProps {
  onTakeBP: () => void;
  disabled?: boolean;
  messages: Message[];
}

export function TakeBPButton({
  onTakeBP,
  disabled = false,
  messages,
}: TakeBPButtonProps) {
  const handleTakeBP = () => {
    onTakeBP();
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleTakeBP}
      disabled={disabled}
      className="flex items-center space-x-2 rounded-md border px-3 py-2 transition-colors disabled:opacity-50"
    >
      <Activity className="h-4 w-4" />
      <span>Take Blood Pressure</span>
    </Button>
  );
}
