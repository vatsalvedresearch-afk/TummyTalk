"use client";

import { useTranslations } from "next-intl";
import type { QuestionDef } from "@/lib/questions/types";
import { getOptionsForQuestion } from "@/lib/questions/options";
import { YesNoChoice } from "./YesNoChoice";
import { FacesScale } from "./FacesScale";
import { BodyMap } from "./BodyMap";
import { BristolChart } from "./BristolChart";
import { CountPicker } from "./CountPicker";
import { PictureChoice } from "./PictureChoice";
import { ColourSwatch } from "./ColourSwatch";

interface QuestionRendererProps {
  question: QuestionDef;
  value: unknown;
  onChange: (value: unknown) => void;
  accent: string;
}

export function QuestionRenderer({ question, value, onChange, accent }: QuestionRendererProps) {
  const t = useTranslations("questions");
  const key = question.i18nKey.replace("questions.", "");

  return (
    <div className="space-y-6">
      <h2 className="text-center text-xl font-bold leading-tight sm:text-2xl">
        {t(key)}
      </h2>

      {question.modality === "yes_no" && (
        <YesNoChoice
          value={value as boolean | "unknown" | null}
          onChange={onChange}
          accent={accent}
        />
      )}

      {question.modality === "faces_scale" && (
        <FacesScale
          value={value as number | "unknown" | null}
          onChange={onChange}
          accent={accent}
        />
      )}

      {question.modality === "body_map" && (
        <BodyMap
          value={value as string[] | "unknown" | null}
          onChange={onChange}
          accent={accent}
        />
      )}

      {question.modality === "bristol" && (
        <BristolChart
          value={value as number | "unknown" | null}
          onChange={onChange}
          accent={accent}
        />
      )}

      {question.modality === "count" && (
        <CountPicker
          value={value as number | "unknown" | null}
          onChange={onChange}
          accent={accent}
        />
      )}

      {question.modality === "picture_choice" && (
        <PictureChoice
          options={(getOptionsForQuestion(question.id) ?? []) as import("@/lib/questions/types").PictureOption[]}
          value={value as string | "unknown" | null}
          onChange={onChange}
          accent={accent}
        />
      )}

      {question.modality === "colour_swatch" && (
        <ColourSwatch
          options={(getOptionsForQuestion(question.id) ?? []) as import("@/lib/questions/types").ColourOption[]}
          value={value as string | "unknown" | "none" | null}
          onChange={onChange}
          accent={accent}
        />
      )}
    </div>
  );
}
