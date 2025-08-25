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
    model: togetherai("meta-llama/Llama-3.3-70B-Instruct-Turbo"),
    temperature: 0.9,
    system: personaPrompt,
    messages,
  });

  return result.toTextStreamResponse();
}
