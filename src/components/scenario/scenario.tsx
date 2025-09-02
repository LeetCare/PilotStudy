"use client";

import { useChat, Message } from "@ai-sdk/react";
import { RefObject, useRef, useState } from "react";
import ChatHeader from "./scenarioHeader";
import Chat from "@/components/chat/chat";
import ChatSidebar from "@/components/chat/chatSidebar";
import ChatInstructions from "../chat/chatInstructions";
import { Scenario } from "@/types/scenario";

interface ScenarioProps {
  scenario: Scenario;
}

export default function ScenarioComponent({ scenario }: ScenarioProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [begun, setBegun] = useState(false);

  const { startingMessage, patientInfo } = scenario;

  const initialMessages: Message[] = [
    {
      id: "1",
      role: "assistant",
      content: startingMessage ?? "Hello! How can I help you today?",
    },
  ];

  initialMessages[0].content = initialMessages[0].content.replace(/\\n/g, "\n");
  const { messages, input, stop, setInput, status, append, setMessages } =
    useChat({
      initialMessages,
      body: {
        patientInfo,
        personaPrompt: scenario.personaPrompt,
        description: scenario.description,
      },
      streamProtocol: "data",
    });

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleTakeBP = async () => {
    // Trigger the getBP tool by sending a message that will cause the AI to use the tool
    await append({
      content: "*Taking Alice Johnson's blood pressure reading...*",
      role: "user",
    });
  };

  return (
    <div className="flex h-[calc(100dvh-5rem)] w-full md:h-dvh">
      <div className="flex w-full flex-col items-center overflow-hidden lg:w-2/3">
        <ChatHeader begun={begun} title={scenario.title} />
        {begun ? (
          <Chat
            setMessages={setMessages}
            messages={messages}
            input={input}
            stop={stop}
            scrollRef={scrollRef as RefObject<HTMLDivElement>}
            setInput={setInput}
            status={status}
            append={append}
            enableClipboard={false}
            onTakeBP={handleTakeBP}
          />
        ) : (
          <ChatInstructions
            description={scenario.description}
            setBegun={setBegun}
          />
        )}
      </div>
      <ChatSidebar
        patientInfo={patientInfo}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
    </div>
  );
}
