import { SessionSchema, type Session } from "@/lib/schemas/session";
import type { Response } from "@/lib/schemas/response";
import { buildSummary } from "@/lib/summary/buildSummary";

const sessions = new Map<string, Session>();

export function createSession(input: Omit<Session, "id" | "responses" | "currentQuestionIndex" | "status" | "startedAt" | "pausedAt" | "completedAt">): Session {
  const session: Session = SessionSchema.parse({
    ...input,
    id: crypto.randomUUID(),
    responses: [],
    currentQuestionIndex: 0,
    status: "child",
    startedAt: new Date().toISOString(),
    pausedAt: null,
    completedAt: null,
  });
  sessions.set(session.id, session);
  return session;
}

export function getSession(id: string): Session | undefined {
  return sessions.get(id);
}

export function updateSession(id: string, patch: Partial<Session>): Session | undefined {
  const existing = sessions.get(id);
  if (!existing) return undefined;
  const updated = SessionSchema.parse({ ...existing, ...patch });
  sessions.set(id, updated);
  return updated;
}

export function addResponse(id: string, response: Response): Session | undefined {
  const session = sessions.get(id);
  if (!session) return undefined;

  const filtered = session.responses.filter((r) => r.questionId !== response.questionId);
  return updateSession(id, { responses: [...filtered, response] });
}

export function completeSession(id: string): Session | undefined {
  return updateSession(id, {
    status: "complete",
    completedAt: new Date().toISOString(),
  });
}

export function getSessionSummary(id: string) {
  const session = sessions.get(id);
  if (!session) return undefined;
  return buildSummary(session.responses, session);
}
