import { z } from "zod";
import type { QuestionDef } from "./types";
import type { AgeTier } from "@/lib/schemas/session";

export const STANDARD_QUESTIONS: QuestionDef[] = [
  {
    id: "pain_present",
    modality: "yes_no",
    instrument: null,
    tier: ["5-8", "9-12"],
    i18nKey: "questions.painPresent",
    respondent: "child",
    schema: z.union([z.boolean(), z.literal("unknown")]),
  },
  {
    id: "pain_intensity",
    modality: "faces_scale",
    instrument: "FPS-R",
    tier: ["5-8", "9-12"],
    i18nKey: "questions.painIntensity",
    respondent: "child",
    schema: z.union([z.number().min(0).max(10), z.literal("unknown")]),
    gateAfter: "pain_present",
    gateWhen: true,
  },
  {
    id: "pain_location",
    modality: "body_map",
    instrument: "Paediatric body map",
    tier: ["5-8", "9-12"],
    i18nKey: "questions.painLocation",
    respondent: "child",
    schema: z.union([z.array(z.string()), z.literal("unknown")]),
    gateAfter: "pain_present",
    gateWhen: true,
  },
  {
    id: "pain_timing",
    modality: "picture_choice",
    instrument: "Rome IV",
    tier: ["5-8", "9-12"],
    i18nKey: "questions.painTiming",
    respondent: "child",
    schema: z.union([z.string(), z.literal("unknown")]),
  },
  {
    id: "stool_form",
    modality: "bristol",
    instrument: "Modified Bristol (Children's)",
    tier: ["5-8", "9-12"],
    i18nKey: "questions.stoolForm",
    respondent: "child",
    schema: z.union([z.number().min(1).max(7), z.literal("unknown")]),
  },
  {
    id: "stool_frequency",
    modality: "count",
    instrument: "Rome IV",
    tier: ["5-8", "9-12"],
    i18nKey: "questions.stoolFrequency",
    respondent: "child",
    schema: z.union([z.number().min(0).max(20), z.literal("unknown")]),
  },
  {
    id: "stool_colour",
    modality: "colour_swatch",
    instrument: null,
    tier: ["5-8", "9-12"],
    i18nKey: "questions.stoolColour",
    respondent: "child",
    schema: z.union([z.string(), z.literal("unknown"), z.literal("none")]),
  },
  {
    id: "nausea_vomiting",
    modality: "yes_no",
    instrument: "PedsQL GI",
    tier: ["5-8", "9-12"],
    i18nKey: "questions.nauseaVomiting",
    respondent: "child",
    schema: z.union([z.boolean(), z.literal("unknown")]),
  },
  {
    id: "vomit_count",
    modality: "count",
    instrument: "PedsQL GI",
    tier: ["5-8", "9-12"],
    i18nKey: "questions.vomitCount",
    respondent: "child",
    schema: z.union([z.number().min(0).max(20), z.literal("unknown")]),
    gateAfter: "nausea_vomiting",
    gateWhen: true,
  },
  {
    id: "appetite",
    modality: "picture_choice",
    instrument: "PedsQL GI",
    tier: ["5-8", "9-12"],
    i18nKey: "questions.appetite",
    respondent: "child",
    schema: z.union([z.string(), z.literal("unknown")]),
  },
];

export function getActiveChildQuestions(
  enabledIds: string[],
  responses: { questionId: string; value: unknown }[],
  ageTier?: AgeTier,
): QuestionDef[] {
  const responseMap = new Map(responses.map((r) => [r.questionId, r.value]));

  return STANDARD_QUESTIONS.filter((question) => {
    if (ageTier && !question.tier.includes(ageTier)) {
      return false;
    }

    if (!enabledIds.includes(question.id)) {
      return false;
    }

    if (!question.gateAfter) {
      return true;
    }

    const gateValue = responseMap.get(question.gateAfter);
    if (gateValue === "unknown") {
      return false;
    }

    return gateValue === question.gateWhen;
  });
}
