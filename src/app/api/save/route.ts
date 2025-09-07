import { NextRequest } from "next/server";
import dbConnect from "@/lib/db";
import Messages from "@/lib/models/schema";

export const maxDuration = 30;
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // await dbConnect();

    const body = await req.json();
    const { messages, timer } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Messages array is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Create a new document with the messages and timestamp
    const messageDoc = new Messages({
      messages: messages,
      createdAt: new Date(),
      totalTime: timer,
    });

    await messageDoc.save();

    console.log("Messages saved successfully:", {
      id: messageDoc._id,
      messageCount: messages.length,
      createdAt: messageDoc.createdAt,
    });

    console.log("Total time (seconds):", timer);

    return new Response(
      JSON.stringify({
        success: true,
        // id: messageDoc._id,
        messageCount: messages.length,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error saving messages:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to save messages",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
