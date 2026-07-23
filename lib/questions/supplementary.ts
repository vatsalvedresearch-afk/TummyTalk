import { z } from "zod";
import type { QuestionDef } from "./types";

export const SUPPLEMENTARY_QUESTIONS: QuestionDef[] = [
  {
    id: "stoma_care",
    modality: "yes_no",
    instrument: null,
    tier: ["5-8", "9-12"],
    i18nKey: "questions.stomaCare",
    respondent: "parent",
    schema: z.union([z.boolean(), z.literal("unknown")]),
  },
  {
    id: "peg_feeding",
    modality: "yes_no",
    instrument: null,
    tier: ["5-8", "9-12"],
    i18nKey: "questions.pegFeeding",
    respondent: "parent",
    schema: z.union([z.boolean(), z.literal("unknown")]),
  },
  {
    id: "post_op",
    modality: "yes_no",
    instrument: null,
    tier: ["5-8", "9-12"],
    i18nKey: "questions.postOp",
    respondent: "parent",
    schema: z.union([z.boolean(), z.literal("unknown")]),
  },
];
