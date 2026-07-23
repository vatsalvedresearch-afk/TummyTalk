import { NextResponse } from "next/server";
import { getSessionSummary } from "@/lib/session/store";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const summary = getSessionSummary(id);

  if (!summary) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  return NextResponse.json(summary);
}
