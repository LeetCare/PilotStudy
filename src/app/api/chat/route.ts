import { NextRequest } from "next/server";
import { streamText } from "ai";
import { togetherai } from "@ai-sdk/togetherai";

export const maxDuration = 30;
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { personaPrompt } = body;

  const messages = body.messages ?? [];

  const result = await streamText({
    model: togetherai("moonshotai/Kimi-K2-Instruct"),
    temperature: 0.9,
    system: personaPrompt,
    messages,
  });

  return result.toDataStreamResponse();
}
