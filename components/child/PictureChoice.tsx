"use client";

import { useTranslations } from "next-intl";
import type { PictureOption } from "@/lib/questions/types";
import { shuffleArray } from "@/lib/utils";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface PictureChoiceProps {
  options: PictureOption[];
  value: string | "unknown" | null;
  onChange: (value: string | "unknown") => void;
  accent: string;
  shuffle?: boolean;
}

export function PictureChoice({
  options,
  value,
  onChange,
  accent,
  shuffle = true,
}: PictureChoiceProps) {
  const t = useTranslations();
  const tSession = useTranslations("session");

  const ordered = useMemo(
    () => (shuffle ? shuffleArray(options) : options),
    [options, shuffle],
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-center gap-4">
        {ordered.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "flex min-h-[96px] min-w-[120px] flex-col items-center justify-center gap-2 rounded-2xl p-4 transition-transform hover:scale-[1.03]",
              value === option.value && "scale-[1.03] shadow-lg",
            )}
            style={{
              border: value === option.value ? `3px solid ${accent}` : "3px solid transparent",
              background: "rgba(255,255,255,0.92)",
            }}
            aria-pressed={value === option.value}
          >
            <span className="text-4xl" aria-hidden>{option.icon}</span>
            <span className="text-sm font-bold">{t(option.i18nKey)}</span>
          </button>
        ))}
      </div>
      <div className="flex justify-center gap-3">
        <button
          type="button"
          onClick={() => onChange("unknown")}
          className="rounded-xl px-4 py-3 text-sm font-bold shadow-md"
          style={{ background: "rgba(255,255,255,0.92)", border: value === "unknown" ? `3px solid ${accent}` : undefined }}
        >
          {tSession("unknown")} / {tSession("decline")}
        </button>
      </div>
    </div>
  );
}
