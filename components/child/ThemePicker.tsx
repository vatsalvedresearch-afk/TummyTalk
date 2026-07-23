"use client";

import { useTranslations } from "next-intl";
import { CHILD_THEMES } from "@/lib/themes/child-themes";
import type { ChildTheme } from "@/lib/schemas/session";
import { cn } from "@/lib/utils";

interface ThemePickerProps {
  value: ChildTheme;
  onChange: (theme: ChildTheme) => void;
  compact?: boolean;
}

export function ThemePicker({ value, onChange, compact = false }: ThemePickerProps) {
  const t = useTranslations();

  return (
    <div className={cn("grid gap-3", compact ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-3")}>
      {CHILD_THEMES.map((theme) => (
        <button
          key={theme.id}
          type="button"
          onClick={() => onChange(theme.id)}
          className={cn(
            "relative overflow-hidden rounded-2xl border-4 p-1 transition-transform hover:scale-[1.02]",
            value === theme.id ? "border-slate-900 shadow-lg" : "border-transparent",
          )}
          aria-pressed={value === theme.id}
          aria-label={t(theme.nameKey)}
        >
          <div
            className="flex h-16 items-end justify-center rounded-xl px-2 pb-2 text-xs font-bold"
            style={{ background: theme.gradient, color: theme.text }}
          >
            {t(theme.nameKey)}
          </div>
        </button>
      ))}
    </div>
  );
}
