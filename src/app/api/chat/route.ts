/**
 * @fileoverview AI SDK v5 Chat API Route
 *
 * This route handles streaming chat requests using the Vercel AI SDK v5
 * architecture with proper message formatting and streaming support.
 */

import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
  try {
    const { messages, data, personaPrompt } = await req.json();

    // Validate messages format
    if (!Array.isArray(messages)) {
      return new Response("Invalid messages format", { status: 400 });
    }

    // Convert messages to standard format for the API
    const formattedMessages = messages.map((msg) => ({
      role: msg.role,
      content: msg.content || "",
    }));

    // Add system message for persona if provided (from either data or direct personaPrompt)
    let systemMessages = [];
    const prompt = personaPrompt || data?.personaPrompt;
    if (prompt) {
      systemMessages.push({
        role: "system" as const,
        content: prompt,
      });
    }

    const result = streamText({
      model: openai("gpt-3.5-turbo"),
      messages: [...systemMessages, ...formattedMessages],
      temperature: 0.7,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
