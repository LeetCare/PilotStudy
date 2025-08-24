/**
 * @fileoverview Voice Chat Component for Medical Training
 *
 * This file contains the VoiceChat component that integrates ElevenLabs
 * conversational AI for voice interactions in medical scenarios on the scenario
 * page. Manages microphone permissions, voice agent selection, and audio controls.
 *
 * @author LeetCare Development Team
 */

"use client";

import React, { useEffect, useState, useRef } from "react";
import { Role, useConversation } from "@11labs/react";
import { Mic } from "lucide-react";
import CircularWaveForm from "@/components/voice/circularWaveForm";
import { set } from "zod";

interface VoiceChatProps {
  /** Voice type determining which ElevenLabs agent to use */
  voiceType: "youngMale" | "youngFemale" | "oldMale" | "oldFemale";

  /** Callback function for handling voice messages from the conversation */
  handleVoiceMessage: (message: { message: string; source: Role }) => void;

  /** Persona prompt to configure the AI agent behavior */
  personaPrompt: string;

  /** Initial message for the conversation start */
  firstMessage: string;
}

/**
 * Voice Chat Component
 *
 * Interactive voice chat interface using ElevenLabs conversational AI.
 * Handles microphone permissions, agent selection based on voice type,
 * and provides visual feedback during conversations.
 *
 * @example
 * ```tsx
 * <VoiceChat
 *   voiceType="youngMale"
 *   handleVoiceMessage={handleMessage}
 *   personaPrompt="You are a medical patient..."
 *   firstMessage="Hello, I need help"
 * />
 * ```
 *
 * @see {@link https://github.com/leonvanzyl/elevenlabs-nextjs-conversational-ai} Reference implementation
 * @see {@link https://elevenlabs.io/docs} For ElevenLabs API documentation
 */
export default function VoiceChat({
  firstMessage,
  personaPrompt,
  voiceType,
  handleVoiceMessage,
}: VoiceChatProps) {
  const [hasPermission, setHasPermission] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  /*
   * Removes asterisk-marked text from the input string for cleaner display.
   */
  function removeAsteriskedText(input: string): string {
    return input.replace(/\*[^*]*\*/g, "");
  }

  const startingMessage = removeAsteriskedText(firstMessage);

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to ElevenLabs");
    },
    onDisconnect: () => {
      console.log("Disconnected from ElevenLabs");
    },
    onMessage: (message) => {
      handleVoiceMessage(message);
    },
    onError: (error: string | Error) => {
      setErrorMessage(typeof error === "string" ? error : error.message);
      console.error("Error:", error);
    },
  });

  const { status, isSpeaking } = conversation;

  useEffect(() => {
    /*
     * Requests microphone permission when component mounts.
     */
    const requestMicPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasPermission(true);
      } catch (error) {
        setErrorMessage("Microphone access denied");
        console.error("Error accessing microphone:", error);
      }
    };

    requestMicPermission();
  }, []);

  /*
   * Starts voice conversation with appropriate ElevenLabs agent based on voice type.
   */
  const handleStartConversation = async () => {
    try {
      console.log("Starting conversation with voice type:", voiceType);
      let agentId;
      if (voiceType === "youngMale") {
        agentId = process.env.NEXT_PUBLIC_YOUNG_MALE_VOICE_AGENT_ID!;
      } else if (voiceType === "youngFemale") {
        agentId = process.env.NEXT_PUBLIC_YOUNG_FEMALE_VOICE_AGENT_ID!;
      } else if (voiceType === "oldMale") {
        agentId = process.env.NEXT_PUBLIC_OLD_MALE_VOICE_AGENT_ID!;
      } else if (voiceType === "oldFemale") {
        agentId = process.env.NEXT_PUBLIC_OLD_FEMALE_VOICE_AGENT_ID!;
      }

      console.log("Agent ID:", agentId);
      // Prepare session options
      const sessionOptions: any = {
        agentId,
      };

      sessionOptions.dynamicVariables = {
        personaPrompt,
        startingMessage,
      };

      // Start the session
      const conversationId = await conversation.startSession(sessionOptions);
      console.log("Started conversation:", conversationId);
    } catch (error) {
      setErrorMessage("Failed to start conversation");
      console.error("Error starting conversation:", error);
    }

    setIsAnimating(true);
  };

  /*
   * Ends the current voice conversation session.
   */
  const handleEndConversation = async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      setErrorMessage("Failed to end conversation");
      console.error("Error ending conversation:", error);
    }
    setIsAnimating(false);
  };

  /*
   * Toggles mute state by adjusting conversation volume.
   */
  const toggleMute = async () => {
    try {
      await conversation.setVolume({ volume: isMuted ? 1 : 0 });
      setIsMuted(!isMuted);
    } catch (error) {
      setErrorMessage("Failed to change volume");
      console.error("Error changing volume:", error);
    }
  };

  return (
    <div className="flex size-full flex-col items-center justify-center gap-4">
      <div className="relative m-4">
        <CircularWaveForm isActive={isSpeaking && isAnimating} />
        <button
          onClick={
            status === "connected"
              ? handleEndConversation
              : handleStartConversation
          }
          disabled={!hasPermission}
          className={`border-cobalt-500 relative flex size-24 items-center justify-center rounded-full border transition-colors duration-300 md:size-40 ${
            status === "connected"
              ? "text-cobalt-500 hover:bg-cobalt-500 bg-white hover:text-white"
              : "bg-cobalt-500 hover:text-cobalt-500 text-white hover:bg-white"
          }`}
        >
          <Mic className="size-16 md:size-28" />
        </button>
      </div>
      {status !== "connected" && (
        <p className="text-center text-sm text-neutral-500">
          Click to start interacting
        </p>
      )}
      {status === "connected" && (
        <div className="flex items-center justify-center">
          <div
            className={`mr-2 h-3 w-3 rounded-full ${
              isSpeaking
                ? "animate-pulse bg-green-500"
                : "bg-cobalt-500 animate-pulse"
            }`}
          ></div>
          <span className="text-sm font-medium text-neutral-500">
            {isSpeaking ? "Speaking..." : "Listening..."}
          </span>
        </div>
      )}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {!hasPermission && (
        <p className="text-red-500">
          Please allow microphone access to use voice chat
        </p>
      )}
    </div>
  );
}
