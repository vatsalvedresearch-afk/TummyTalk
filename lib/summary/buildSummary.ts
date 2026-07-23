import { STANDARD_QUESTIONS } from "@/lib/questions/standard";
import { PARENT_QUESTIONS } from "@/lib/questions/parent";
import { SUPPLEMENTARY_QUESTIONS } from "@/lib/questions/supplementary";
import type { Response } from "@/lib/schemas/response";
import type { Session } from "@/lib/schemas/session";
import type { ConfidenceFlag, SessionSummary } from "@/lib/schemas/summary";

const ALL_QUESTIONS = [...STANDARD_QUESTIONS, ...PARENT_QUESTIONS, ...SUPPLEMENTARY_QUESTIONS];

function formatClinicalValue(questionId: string, value: unknown): string {
  if (value === "unknown") return "Not reported / declined";
  if (value === "none") return "No unusual colour";

  switch (questionId) {
    case "pain_intensity":
      return typeof value === "number" ? `FPS-R ${value}/10` : String(value);
    case "pain_location":
      return Array.isArray(value) ? value.join(", ") : String(value);
    case "stool_form":
      return typeof value === "number" ? `Bristol type ${value}` : String(value);
    case "stool_frequency":
    case "vomit_count":
      return typeof value === "number" ? `${value} times` : String(value);
    case "pain_present":
    case "nausea_vomiting":
    case "stoma_care":
    case "peg_feeding":
    case "post_op":
      return value === true ? "Yes" : value === false ? "No" : String(value);
    default:
      return String(value);
  }
}

function detectConfidenceFlags(responses: Response[], durationMs: number): ConfidenceFlag[] {
  const flags: ConfidenceFlag[] = [];
  const childResponses = responses.filter((r) => r.source === "child" || r.source === "proxy");

  if (childResponses.length >= 3) {
    const values = childResponses.map((r) => JSON.stringify(r.value));
    const first = values[0];
    if (values.every((v) => v === first)) {
      flags.push("uniform_pattern");
    }
  }

  const unknownCount = childResponses.filter((r) => r.value === "unknown").length;
  if (childResponses.length > 0 && unknownCount / childResponses.length > 0.4) {
    flags.push("high_unknown_rate");
  }

  if (childResponses.length >= 5 && durationMs < 60_000) {
    flags.push("rapid_completion");
  }

  return flags;
}

export function buildSummary(responses: Response[], session: Session): SessionSummary {
  const items = responses
    .filter((r) => r.questionId !== "parent_notes")
    .map((response) => {
      const question = ALL_QUESTIONS.find((q) => q.id === response.questionId);
      return {
        questionId: response.questionId,
        label: question?.i18nKey ?? response.questionId,
        clinicalValue: formatClinicalValue(response.questionId, response.value),
        source: response.source,
        instrument: question?.instrument ?? null,
      };
    });

  const parentNotesResponse = responses.find((r) => r.questionId === "parent_notes");
  const started = new Date(session.startedAt).getTime();
  const completed = session.completedAt
    ? new Date(session.completedAt).getTime()
    : Date.now();
  const durationMinutes = Math.max(1, Math.round((completed - started) / 60_000));

  return {
    sessionId: session.id,
    patientName: session.patientName,
    ageTier: session.ageTier,
    childLocale: session.childLocale,
    parentLocale: session.parentLocale,
    durationMinutes,
    items,
    parentNotes: parentNotesResponse ? String(parentNotesResponse.value) : null,
    confidenceFlags: detectConfidenceFlags(responses, completed - started),
    completedAt: session.completedAt ?? new Date().toISOString(),
  };
}
