"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface BristolChartProps {
  value: number | "unknown" | null;
  onChange: (value: number | "unknown") => void;
  accent: string;
}

const TYPES = [1, 2, 3, 4, 5, 6, 7] as const;

function StoolIcon({ type }: { type: number }) {
  const heights = [8, 12, 14, 16, 12, 10, 6];
  const h = heights[type - 1];
  return (
    <svg width="48" height="40" viewBox="0 0 48 40" aria-hidden>
      <ellipse cx="24" cy={40 - h / 2} rx={10 + type} ry={h / 2} fill="#8B4513" />
      {type <= 2 && (
        <>
          <circle cx="18" cy={38 - h} r="4" fill="#8B4513" />
          <circle cx="30" cy={38 - h} r="3" fill="#8B4513" />
        </>
      )}
    </svg>
  );
}

export function BristolChart({ value, onChange, accent }: BristolChartProps) {
  const t = useTranslations("bristol");
  const tSession = useTranslations("session");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {TYPES.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => onChange(type)}
            className={cn(
              "flex min-h-[88px] flex-col items-center justify-center gap-1 rounded-2xl p-3 transition-transform hover:scale-105",
              value === type && "scale-105 shadow-lg",
            )}
            style={{
              border: value === type ? `3px solid ${accent}` : "3px solid transparent",
              background: "rgba(255,255,255,0.92)",
            }}
            aria-pressed={value === type}
            aria-label={t(`type${type}`)}
          >
            <StoolIcon type={type} />
            <span className="text-xs font-bold">{t(`type${type}`)}</span>
          </button>
        ))}
      </div>
      <div className="flex justify-center">
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
