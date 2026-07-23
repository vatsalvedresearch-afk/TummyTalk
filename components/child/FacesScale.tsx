"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const FACE_VALUES = [0, 2, 4, 6, 8, 10] as const;

const FACE_PATHS = [
  "M 20 55 Q 35 70 50 55 Q 65 70 80 55",
  "M 25 58 Q 35 65 45 58 Q 55 65 65 58 Q 75 65 75 58",
  "M 30 58 L 70 58",
  "M 30 62 Q 50 52 70 62",
  "M 28 60 Q 50 48 72 60",
  "M 25 55 Q 50 40 75 55",
];

interface FacesScaleProps {
  value: number | "unknown" | null;
  onChange: (value: number | "unknown") => void;
  accent: string;
}

export function FacesScale({ value, onChange, accent }: FacesScaleProps) {
  const t = useTranslations("faces");
  const tSession = useTranslations("session");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-center gap-3">
        {FACE_VALUES.map((faceValue, index) => (
          <button
            key={faceValue}
            type="button"
            onClick={() => onChange(faceValue)}
            className={cn(
              "flex min-h-[88px] min-w-[72px] flex-col items-center gap-1 rounded-2xl p-2 transition-transform hover:scale-105",
              value === faceValue && "scale-105 shadow-lg",
            )}
            style={{
              border: value === faceValue ? `3px solid ${accent}` : "3px solid transparent",
              background: "rgba(255,255,255,0.92)",
            }}
            aria-label={t(String(faceValue))}
            aria-pressed={value === faceValue}
          >
            <svg width="56" height="56" viewBox="0 0 100 100" aria-hidden>
              <circle cx="50" cy="50" r="45" fill="#FFD93D" />
              <circle cx="35" cy="40" r="5" fill="#1e293b" />
              <circle cx="65" cy="40" r="5" fill="#1e293b" />
              <path d={FACE_PATHS[index]} stroke="#1e293b" strokeWidth="3" fill="none" strokeLinecap="round" />
            </svg>
            <span className="text-xs font-bold">{t(String(faceValue))}</span>
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
