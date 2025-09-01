import { NextRequest } from "next/server";
import dbConnect from '@/lib/db';
import Messages from '@/lib/models/messages';

export const maxDuration = 30;
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    await dbConnect();

  const body = await req.json();
  const { messages } = body;

}