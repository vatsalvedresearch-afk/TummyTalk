import { z } from "zod";
import type { QuestionDef } from "./types";

export const PARENT_QUESTIONS: QuestionDef[] = [
  {
    id: "parent_duration",
    modality: "picture_choice",
    instrument: null,
    tier: ["5-8", "9-12"],
    i18nKey: "questions.parentDuration",
    respondent: "parent",
    schema: z.string(),
  },
  {
    id: "parent_medications",
    modality: "picture_choice",
    instrument: null,
    tier: ["5-8", "9-12"],
    i18nKey: "questions.parentMedications",
    respondent: "parent",
    schema: z.string(),
  },
  {
    id: "parent_diet",
    modality: "picture_choice",
    instrument: null,
    tier: ["5-8", "9-12"],
    i18nKey: "questions.parentDiet",
    respondent: "parent",
    schema: z.string(),
  },
  {
    id: "parent_school",
    modality: "picture_choice",
    instrument: null,
    tier: ["5-8", "9-12"],
    i18nKey: "questions.parentSchool",
    respondent: "parent",
    schema: z.string(),
  },
  {
    id: "parent_notes",
    modality: "free_text",
    instrument: null,
    tier: ["5-8", "9-12"],
    i18nKey: "questions.parentNotes",
    respondent: "parent",
    schema: z.string(),
  },
];
