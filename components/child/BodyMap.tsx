"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const REGIONS = [
  { id: "upperAbdomen", d: "M 35 28 L 65 28 L 62 42 L 38 42 Z" },
  { id: "lowerAbdomen", d: "M 38 42 L 62 42 L 58 58 L 42 58 Z" },
  { id: "leftSide", d: "M 22 32 L 35 28 L 38 42 L 42 58 L 28 55 Z" },
  { id: "rightSide", d: "M 78 32 L 65 28 L 62 42 L 58 58 L 72 55 Z" },
  { id: "allOver", d: "M 30 22 L 70 22 L 75 60 L 25 60 Z" },
  { id: "back", d: "M 32 62 L 68 62 L 65 78 L 35 78 Z" },
] as const;

interface BodyMapProps {
  value: string[] | "unknown" | null;
  onChange: (value: string[] | "unknown") => void;
  accent: string;
}

export function BodyMap({ value, onChange, accent }: BodyMapProps) {
  const t = useTranslations("bodyMap");
  const tSession = useTranslations("session");
  const selected = value === "unknown" ? [] : (value ?? []);

  function toggleRegion(id: string) {
    if (value === "unknown") return;
    const next = selected.includes(id)
      ? selected.filter((r) => r !== id)
      : [...selected, id];
    onChange(next);
  }

  return (
    <div className="space-y-4">
      <svg viewBox="0 0 100 90" className="mx-auto w-full max-w-xs" role="img" aria-label={t("upperAbdomen")}>
        <ellipse cx="50" cy="18" rx="14" ry="16" fill="#FFDAB9" />
        <rect x="38" y="30" width="24" height="8" rx="4" fill="#FFDAB9" />
        <rect x="30" y="36" width="40" height="44" rx="8" fill="#FFE4C4" stroke="#cbd5e1" />
        {REGIONS.map((region) => (
          <path
            key={region.id}
            d={region.d}
            onClick={() => toggleRegion(region.id)}
            role="button"
            aria-label={t(region.id as "upperAbdomen" | "lowerAbdomen" | "leftSide" | "rightSide" | "allOver" | "back")}
            className="cursor-pointer transition-colors"
            fill={selected.includes(region.id) ? accent : "rgba(255,255,255,0.3)"}
            stroke="#64748b"
            strokeWidth="1"
            opacity={selected.includes(region.id) ? 0.85 : 0.5}
          />
        ))}
      </svg>
      <div className="flex flex-wrap justify-center gap-2">
        {REGIONS.map((region) => (
          <button
            key={region.id}
            type="button"
            onClick={() => toggleRegion(region.id)}
            className={cn(
              "rounded-full px-3 py-2 text-xs font-bold shadow",
              selected.includes(region.id) ? "text-white" : "bg-white/90",
            )}
            style={selected.includes(region.id) ? { background: accent } : undefined}
          >
            {t(region.id as "upperAbdomen" | "lowerAbdomen" | "leftSide" | "rightSide" | "allOver" | "back")}
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

// Minimal type helper for question keys
type IntlMessages = {
  questions: Record<string, string>;
};
