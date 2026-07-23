import { z } from "zod";
import { ResponseSourceSchema } from "./response";

export const ConfidenceFlagSchema = z.enum([
  "uniform_pattern",
  "rapid_completion",
  "high_unknown_rate",
]);

export const SummaryItemSchema = z.object({
  questionId: z.string(),
  label: z.string(),
  clinicalValue: z.string(),
  source: ResponseSourceSchema,
  instrument: z.string().nullable(),
});

export const SessionSummarySchema = z.object({
  sessionId: z.string(),
  patientName: z.string(),
  ageTier: z.string(),
  childLocale: z.string(),
  parentLocale: z.string(),
  durationMinutes: z.number(),
  items: z.array(SummaryItemSchema),
  parentNotes: z.string().nullable(),
  confidenceFlags: z.array(ConfidenceFlagSchema),
  completedAt: z.string().datetime(),
});

export type SessionSummary = z.infer<typeof SessionSummarySchema>;
export type ConfidenceFlag = z.infer<typeof ConfidenceFlagSchema>;
