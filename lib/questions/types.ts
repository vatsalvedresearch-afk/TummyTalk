import { z } from "zod";
import type { AgeTier } from "@/lib/schemas/session";

export type QuestionModality =
  | "yes_no"
  | "faces_scale"
  | "body_map"
  | "bristol"
  | "count"
  | "picture_choice"
  | "colour_swatch"
  | "free_text";

export interface QuestionDef {
  id: string;
  modality: QuestionModality;
  instrument: string | null;
  tier: AgeTier[];
  i18nKey: string;
  respondent: "child" | "parent";
  schema: z.ZodTypeAny;
  gateAfter?: string;
  gateWhen?: boolean;
}

export interface PictureOption {
  value: string;
  i18nKey: string;
  icon: string;
}

export interface ColourOption {
  value: string;
  i18nKey: string;
  colour: string;
}
