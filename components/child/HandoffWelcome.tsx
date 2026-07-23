"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { CompanionCharacter } from "./CompanionCharacter";
import { Button } from "@/components/ui/button";
import { getThemeById, getThemeNameKey } from "@/lib/themes/child-themes";
import { ThemeBackground } from "./ThemeBackground";
import type { Session } from "@/lib/schemas/session";

interface HandoffWelcomeProps {
  session: Session;
  questionCount: number;
  onStart: () => void;
}

export function HandoffWelcome({ session, questionCount, onStart }: HandoffWelcomeProps) {
  const t = useTranslations("session");
  const tSetup = useTranslations("setup");
  const tThemes = useTranslations("themes");
  const theme = getThemeById(session.childTheme);
  const reducedMotion = useReducedMotion();
  const themeNameKey = getThemeNameKey(session.childTheme);

  return (
    <ThemeBackground themeId={session.childTheme}>
      <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center gap-8 px-6 py-10 text-center">
        <motion.div
          initial={reducedMotion ? false : { scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full space-y-6 rounded-3xl p-8 shadow-xl"
          style={{ background: theme.cardBg, color: theme.text }}
        >
          <CompanionCharacter mood="idle" />

          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-wide opacity-70">
              {tSetup("startSession")}
            </p>
            <h1 className="text-3xl font-bold">{t("welcomeTitle")}</h1>
            <p className="text-lg">{t("welcomeSubtitle")}</p>
          </div>

          <div
            className="mx-auto grid max-w-xs gap-3 rounded-2xl p-4 text-left text-sm"
            style={{ background: "rgba(255,255,255,0.55)" }}
          >
            <div className="flex justify-between gap-4">
              <span className="opacity-70">{tSetup("childTheme")}</span>
              <span className="font-bold">{tThemes(themeNameKey as "sunnySky")}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="opacity-70">{tSetup("ageTier")}</span>
              <span className="font-bold">{session.ageTier}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="opacity-70">{t("welcomeStops")}</span>
              <span className="font-bold">{questionCount}</span>
            </div>
            {session.proxyMode && (
              <p className="rounded-lg bg-amber-100 px-3 py-2 text-center text-xs font-bold text-amber-900">
                {t("proxyBadge")}
              </p>
            )}
          </div>

          <Button
            size="lg"
            className="w-full text-lg"
            onClick={onStart}
            style={{ background: theme.accent, color: "white" }}
          >
            {t("welcomeStart")}
          </Button>
        </motion.div>
      </div>
    </ThemeBackground>
  );
}
