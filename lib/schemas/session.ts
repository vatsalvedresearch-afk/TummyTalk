import { z } from "zod";
import { ResponseSchema } from "./response";

export const AgeTierSchema = z.enum(["5-8", "9-12"]);
export const ChildThemeSchema = z.enum([
  "sunny-sky",
  "ocean",
  "meadow",
  "sunset",
  "starry",
  "candy",
]);
export const SessionStatusSchema = z.enum([
  "setup",
  "child",
  "handoff",
  "parent",
  "complete",
]);

export const SessionSchema = z.object({
  id: z.string(),
  patientName: z.string(),
  patientDob: z.string(),
  ageTier: AgeTierSchema,
  childLocale: z.string(),
  parentLocale: z.string(),
  childTheme: ChildThemeSchema,
  enabledQuestionIds: z.array(z.string()),
  supplementaryQuestionIds: z.array(z.string()).max(3),
  clinicianNote: z.string(),
  proxyMode: z.boolean(),
  status: SessionStatusSchema,
  responses: z.array(ResponseSchema),
  currentQuestionIndex: z.number(),
  startedAt: z.string().datetime(),
  pausedAt: z.string().datetime().nullable(),
  completedAt: z.string().datetime().nullable(),
  initiatedBy: z.string(),
});

export type Session = z.infer<typeof SessionSchema>;
export type AgeTier = z.infer<typeof AgeTierSchema>;
export type ChildTheme = z.infer<typeof ChildThemeSchema>;
export type SessionStatus = z.infer<typeof SessionStatusSchema>;
