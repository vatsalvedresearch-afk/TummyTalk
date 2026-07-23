import { NextResponse } from "next/server";
import { createSession } from "@/lib/session/store";
import { SessionSchema } from "@/lib/schemas/session";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = SessionSchema.omit({
    id: true,
    responses: true,
    currentQuestionIndex: true,
    status: true,
    startedAt: true,
    pausedAt: true,
    completedAt: true,
  }).safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const session = createSession(parsed.data);
  return NextResponse.json(session);
}
