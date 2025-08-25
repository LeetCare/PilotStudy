"use client";

import { Pause, Play, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";

export default function ScenarioTimer({ begun }: { begun: boolean }) {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    setIsRunning(begun);
  }, [begun]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning && !isPaused) {
      intervalId = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, isPaused]);

  const handleStartTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePauseTimer = () => {
    setIsPaused(true);
  };

  const handleResumeTimer = () => {
    setIsPaused(false);
  };

  const refreshTimer = () => {
    setSeconds(0);
    setIsRunning(false);
    setIsPaused(false);
  };

  if (!begun) {
    return (
      <Button disabled onClick={handleStartTimer}>
        <p>{formatTime(0)}</p>
      </Button>
    );
  }

  return (
    <div>
      {isRunning ? (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={refreshTimer}>
            <RotateCcw className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="flex w-32 items-center justify-between"
            onClick={isPaused ? handleResumeTimer : handlePauseTimer}
          >
            <p>{formatTime(seconds)}</p>
            {isPaused ? (
              <Play className="size-4 fill-current" />
            ) : (
              <Pause className="size-4 fill-current" />
            )}
          </Button>
        </div>
      ) : (
        <Button
          onClick={handleStartTimer}
          variant="outline"
          className="flex items-center justify-between"
        >
          <p>Start timer</p>
          <Play className="size-4 fill-current" />
        </Button>
      )}
    </div>
  );
}
