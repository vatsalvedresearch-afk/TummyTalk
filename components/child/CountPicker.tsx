"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface CountPickerProps {
  value: number | "unknown" | null;
  onChange: (value: number | "unknown") => void;
  accent: string;
  max?: number;
}

export function CountPicker({ value, onChange, accent, max = 10 }: CountPickerProps) {
  const tSession = useTranslations("session");
  const counts = Array.from({ length: max + 1 }, (_, i) => i);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-center gap-3">
        {counts.map((count) => (
          <button
            key={count}
            type="button"
            onClick={() => onChange(count)}
            className={cn(
              "flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold transition-transform hover:scale-105",
              value === count && "scale-105 shadow-lg",
            )}
            style={{
              border: value === count ? `3px solid ${accent}` : "3px solid transparent",
              background: "rgba(255,255,255,0.92)",
            }}
            aria-pressed={value === count}
          >
            {count}
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
