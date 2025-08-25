/**
 * @fileoverview Scenario Chat Component for Medical Training
 *
 * This file contains the main Scenario component that provides an interactive
 * chat interface for medical training scenarios on the scenario page.
 *
 * @author LeetCare Development Team
 */

"use client";

import { useChat } from "@ai-sdk/react";
import { Scenario } from "@/types/database";
import { RefObject, useRef, useState } from "react";
import * as React from "react";
import ChatHeader from "./scenarioHeader";
import Chat from "@/components/chat/chat";
import ChatSidebar from "@/components/chat/chatSidebar";
import ChatInstructions from "../chat/chatInstructions";
import { ChatStatus } from "ai";

interface ScenarioProps {
  /** Scenario configuration including persona prompt, evaluation prompt, patientInfo, starting Message and more */
  scenario: Scenario;
}

/**
 * Scenario Chat Component
 *
 * Interactive medical training scenario with AI-powered patient conversation,
 * real-time evaluation, and patient information sidebar. Provides comprehensive
 * feedback through evaluation system.
 *
 * @example
 * ```tsx
 * <ScenarioComponent
 *   patientCase={caseData}
 *   startingMessage="Hello, how can I help you today?"
 *   scenario={scenarioConfig}
 * />
 * ```
 *
 * @see {@link https://sdk.vercel.ai/docs/ai-sdk-ui/chatbot} For AI SDK chat integration
 * @see {@link https://sdk.vercel.ai/docs/ai-sdk-core/generating-structured-data} For structured object generation
 */
export default function ScenarioComponent({ scenario }: ScenarioProps) {
  const [isEvaluate, setIsEvaluate] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [begun, setBegun] = useState(false);

  const {
    startingMessage,
    evaluationPrompt,
    tasks,
    patientInfo,
    id,
    personaPrompt,
  } = scenario;

  // Use state for messages and implement custom streaming
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Set initial messages on component mount
  React.useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "1",
          role: "assistant",
          content: (
            startingMessage ?? "Hello! How can I help you today?"
          ).replace(/\\n/g, "\n"),
        },
      ]);
    }
  }, [startingMessage, messages.length]);

  // Create append function with streaming support
  const appendMessage = async (message: { content: string; role: string }) => {
    if (message.role === "user") {
      // Add user message immediately
      const userMessage = {
        id: Date.now().toString(),
        role: "user" as const,
        content: message.content,
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        // Call the API with streaming
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [...messages, userMessage],
            personaPrompt: personaPrompt,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to get response");
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error("No response body");
        }

        // Create assistant message placeholder with streaming content
        const assistantMessageId = (Date.now() + 1).toString();
        let streamingContent = "";

        setMessages((prev) => [
          ...prev,
          {
            id: assistantMessageId,
            role: "assistant" as const,
            content: streamingContent,
          },
        ]);

        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          streamingContent += chunk;

          // Update the assistant message with new content in real-time
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, content: streamingContent }
                : msg
            )
          );
        }
      } catch (error) {
        console.error("Error in appendMessage:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Create reload function
  const reload = () => {
    console.log("Reload function called");
    // Implement reload logic if needed
  };

  // Create stop function
  const stop = () => {
    console.log("Stop function called");
    setIsLoading(false);
  };

  // Convert status
  const status: ChatStatus = isLoading ? "streaming" : "submitted";

  /*
   * Triggers evaluation process and opens evaluation drawer.
   */
  const onComplete = () => {};

  // The ref to the scrollable div that contains the chat messages
  const scrollRef = useRef<HTMLDivElement>(null);

  console.log(`scenario being passed to chat: ${scenario.id}`);
  return (
    <div className="flex h-[calc(100dvh-5rem)] w-full md:h-dvh">
      <div className="flex w-full flex-col items-center overflow-hidden lg:w-2/3">
        <ChatHeader begun={begun} title={scenario.title} />
        {begun ? (
          <Chat
            chatStyle="scenario"
            messages={messages}
            input={input}
            stop={stop}
            scrollRef={scrollRef as RefObject<HTMLDivElement>}
            setInput={setInput}
            status={status}
            append={appendMessage}
            reload={reload}
            enableClipboard={false}
            type="scenario"
            isEvaluate={isEvaluate}
            onEvaluate={onComplete}
            isScenario={true}
            tasks={tasks}
            scenarioId={scenario.id}
          />
        ) : (
          <ChatInstructions
            description={scenario.description}
            setBegun={setBegun}
            onEvaluate={undefined as any} // Placeholder for evaluation callback
          />
        )}
      </div>
      <ChatSidebar
        isEvaluate={isEvaluate}
        patientInfo={patientInfo}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
    </div>
  );
}
