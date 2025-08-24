/**
 * @fileoverview Scenario Chat Component for Medical Training
 *
 * This file contains the main Scenario component that provides an interactive
 * chat interface for medical training scenarios on the scenario page.
 *
 * @author LeetCare Development Team
 */

"use client";

import { Message } from "ai";
import { experimental_useObject as useObject, useChat } from "@ai-sdk/react";
import { Scenario } from "@prisma/client";
import { useRef, useState } from "react";
import ChatHeader from "./scenarioHeader";
import Chat from "@/components/chat/chat";
import ChatSidebar from "@/components/chat/chatSidebar";
import { evaluationSchema } from "@/lib/validation/evaluation";
import ChatInstructions from "../chat/chatInstructions";

interface ScenarioProps {
  /** Scenario configuration including persona prompt, evaluation prompt, patientInfo, starting Message and more */
  scenario: Scenario;
}

/**
 * Scenario Chat Component
 *
 * Interactive medical training scenario with AI-powered patient conversation,
 * real-time evaluation, and patient information sidebar. Supports voice
 * interaction and provides comprehensive feedback through evaluation system.
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

  const { startingMessage, evaluationPrompt, tasks, patientInfo, id } = scenario;

  // set the initial messages for the chat
  const initialMessages: Message[] = [
    {
      id: "1",
      role: "assistant",
      content: startingMessage ?? "Hello! How can I help you today?",
    },
  ];

  // fix bad new line escapes
  initialMessages[0].content = initialMessages[0].content.replace(/\\n/g, "\n");

  // Initialize the custom chat hook from vercel's AI SDK
  const {
    messages,
    input,
    stop,
    setInput,
    status,
    append,
    reload,
    addToolResult,
    setMessages,
  } = useChat({
    id: scenario.id,
    initialMessages,
    body: {
      patientInfo,
      personaPrompt: scenario.personaPrompt,
      description: scenario.description,
    },
    streamProtocol: "text",
  });

  // Use Completion hook is for the evaluation
  const {
    object: evaluation,
    submit: evaluate,
    isLoading: isEvaluating,
  } = useObject({
    api: "/api/evaluation",
    schema: evaluationSchema,
  });

  /*
   * Triggers evaluation process and opens evaluation drawer.
   */
  const onEvaluate = () => {
    setIsEvaluate(true);
    setDrawerOpen(true);
  
    // Call the evaluate function and return its result
    evaluate({
      messages,
      patientInfo,
      scenario,
      evaluationPrompt,
    });

  };

  /*
   * Determines appropriate voice type based on patient age and sex.
   */
  let voiceType: "youngMale" | "youngFemale" | "oldMale" | "oldFemale" | null =
    scenario.voiceType;

  // The ref to the scrollable div that contains the chat messages
  const scrollRef = useRef<HTMLDivElement>(null);

  console.log(`scenario being passed to chat: ${scenario.id}`)
  return (
    <div className="flex h-[calc(100dvh-5rem)] w-full md:h-dvh">
      <div className="flex w-full flex-col items-center overflow-hidden lg:w-2/3">
        <ChatHeader begun={begun} title={scenario.title} />
        {begun ? (
          <Chat
            setMessages={setMessages}
            personaPrompt={scenario.personaPrompt}
            chatStyle="scenario"
            messages={messages}
            input={input}
            stop={stop}
            scrollRef={scrollRef}
            setInput={setInput}
            status={status}
            append={append}
            reload={reload}
            addToolResult={addToolResult}
            enableClipboard={false}
            type="scenario"
            startingMessage={startingMessage}
            voiceType={voiceType ?? undefined}
            isEvaluate={isEvaluate}
            onEvaluate={onEvaluate}
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
        evaluation={evaluation}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
    </div>
  );
}
