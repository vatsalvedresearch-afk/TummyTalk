"use client";

import { useTranslations } from "next-intl";
import { CompanionCharacter } from "./CompanionCharacter";
import { Button } from "@/components/ui/button";

interface HandoffCardProps {
  onContinue: () => void;
}

export function HandoffCard({ onContinue }: HandoffCardProps) {
  const t = useTranslations("session");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 text-center">
      <CompanionCharacter mood="acknowledge" />
      <div className="max-w-md space-y-3 rounded-3xl bg-white/90 p-8 shadow-xl">
        <h1 className="text-3xl font-bold">{t("handoffTitle")}</h1>
        <p className="text-lg">{t("handoffChildDone")}</p>
        <p className="text-lg font-semibold">{t("handoffParentTurn")}</p>
        <Button size="lg" className="mt-4 w-full" onClick={onContinue}>
          {t("handoffContinue")}
        </Button>
      </div>
    </div>
  );
}
