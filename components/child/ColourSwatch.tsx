"use client";

import { useTranslations } from "next-intl";
import type { ColourOption } from "@/lib/questions/types";
import { cn } from "@/lib/utils";

interface ColourSwatchProps {
  options: ColourOption[];
  value: string | "unknown" | "none" | null;
  onChange: (value: string | "unknown" | "none") => void;
  accent: string;
}

export function ColourSwatch({ options, value, onChange, accent }: ColourSwatchProps) {
  const t = useTranslations();
  const tSession = useTranslations("session");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "flex min-h-[88px] flex-col items-center justify-center gap-2 rounded-2xl p-3 transition-transform hover:scale-105",
              value === option.value && "scale-105 shadow-lg",
            )}
            style={{
              border: value === option.value ? `3px solid ${accent}` : "3px solid transparent",
              background: "rgba(255,255,255,0.92)",
            }}
            aria-pressed={value === option.value}
          >
            <span
              className="h-10 w-10 rounded-full border-2 border-slate-300 shadow-inner"
              style={{ background: option.colour }}
              aria-hidden
            />
            <span className="text-xs font-bold">{t(option.i18nKey)}</span>
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => onChange("none")}
          className="rounded-xl px-4 py-3 text-sm font-bold shadow-md"
          style={{ background: "rgba(255,255,255,0.92)", border: value === "none" ? `3px solid ${accent}` : undefined }}
        >
          {tSession("none")}
        </button>
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
