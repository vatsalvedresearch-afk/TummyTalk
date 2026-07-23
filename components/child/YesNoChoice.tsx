"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface YesNoChoiceProps {
  value: boolean | "unknown" | null;
  onChange: (value: boolean | "unknown") => void;
  accent: string;
}

function ChoiceButton({
  selected,
  onClick,
  label,
  icon,
  accent,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  icon: string;
  accent: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex min-h-[88px] min-w-[88px] flex-1 flex-col items-center justify-center gap-2 rounded-2xl border-3 p-4 text-center transition-transform hover:scale-[1.03]",
        selected ? "scale-[1.03] shadow-lg" : "shadow-md",
      )}
      style={{
        borderColor: selected ? accent : "transparent",
        background: "rgba(255,255,255,0.92)",
      }}
      aria-pressed={selected}
    >
      <span className="text-4xl" aria-hidden>{icon}</span>
      <span className="text-sm font-bold">{label}</span>
    </button>
  );
}

export function YesNoChoice({ value, onChange, accent }: YesNoChoiceProps) {
  const t = useTranslations("session");

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <ChoiceButton
        selected={value === true}
        onClick={() => onChange(true)}
        label={t("yes")}
        icon="👍"
        accent={accent}
      />
      <ChoiceButton
        selected={value === false}
        onClick={() => onChange(false)}
        label={t("no")}
        icon="👎"
        accent={accent}
      />
      <ChoiceButton
        selected={value === "unknown"}
        onClick={() => onChange("unknown")}
        label={t("unknown")}
        icon="🤷"
        accent={accent}
      />
      <ChoiceButton
        selected={false}
        onClick={() => onChange("unknown")}
        label={t("decline")}
        icon="🙈"
        accent={accent}
      />
    </div>
  );
}
