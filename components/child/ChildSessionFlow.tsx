"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ThemeBackground } from "@/components/child/ThemeBackground";
import { ThemePicker } from "@/components/child/ThemePicker";
import { ProgressPath } from "@/components/child/ProgressPath";
import { CompanionCharacter } from "@/components/child/CompanionCharacter";
import { QuestionRenderer } from "@/components/child/QuestionRenderer";
import { HandoffCard } from "@/components/child/HandoffCard";
import { Button } from "@/components/ui/button";
import { getThemeById } from "@/lib/themes/child-themes";
import { getActiveChildQuestions } from "@/lib/questions/standard";
import type { Session } from "@/lib/schemas/session";
import type { ResponseSource } from "@/lib/schemas/response";

interface ChildSessionFlowProps {
  session: Session;
}

export function ChildSessionFlow({ session: initialSession }: ChildSessionFlowProps) {
  const t = useTranslations("session");
  const router = useRouter();

  const [session, setSession] = useState(initialSession);
  const [theme, setTheme] = useState(session.childTheme);
  const [currentIndex, setCurrentIndex] = useState(session.currentQuestionIndex);
  const [currentValue, setCurrentValue] = useState<unknown>(null);
  const [companionMood, setCompanionMood] = useState<"idle" | "acknowledge">("idle");
  const [paused, setPaused] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [showHandoff, setShowHandoff] = useState(session.status === "handoff");

  const themeDef = getThemeById(theme);
  const questions = getActiveChildQuestions(
    session.enabledQuestionIds,
    session.responses,
  );
  const currentQuestion = questions[currentIndex];

  async function saveResponse(questionId: string, value: unknown, source: ResponseSource) {
    const response = {
      questionId,
      value,
      source,
      answeredAt: new Date().toISOString(),
    };

    const res = await fetch(`/api/sessions/${session.id}/responses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(response),
    });

    if (res.ok) {
      const updated = await res.json();
      setSession(updated);
    }
  }

  async function updateTheme(newTheme: typeof theme) {
    setTheme(newTheme);
    setShowThemePicker(false);
    await fetch(`/api/sessions/${session.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ childTheme: newTheme }),
    });
  }

  async function handleAnswer() {
    if (!currentQuestion || currentValue === null) return;

    const source: ResponseSource = session.proxyMode ? "proxy" : "child";
    await saveResponse(currentQuestion.id, currentValue, source);

    setCompanionMood("acknowledge");
    setTimeout(() => setCompanionMood("idle"), 600);

    if (currentIndex >= questions.length - 1) {
      await fetch(`/api/sessions/${session.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "handoff" }),
      });
      setShowHandoff(true);
      return;
    }

    setCurrentIndex((i) => i + 1);
    setCurrentValue(null);
  }

  function handleHandoffContinue() {
    router.push(`/${session.parentLocale}/session/${session.id}/parent`);
  }

  if (showHandoff) {
    return (
      <ThemeBackground themeId={theme}>
        <HandoffCard onContinue={handleHandoffContinue} />
      </ThemeBackground>
    );
  }

  if (paused) {
    return (
      <ThemeBackground themeId={theme}>
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
          <h1 className="text-3xl font-bold">{t("paused")}</h1>
          <p className="text-lg">{t("pausedHint")}</p>
          <Button size="lg" variant="child" onClick={() => setPaused(false)}>
            {t("resume")}
          </Button>
        </div>
      </ThemeBackground>
    );
  }

  if (showThemePicker) {
    return (
      <ThemeBackground themeId={theme}>
        <div className="mx-auto max-w-lg px-4 py-8">
          <h1 className="mb-6 text-center text-2xl font-bold">{t("changeTheme")}</h1>
          <ThemePicker value={theme} onChange={updateTheme} />
          <Button className="mt-6 w-full" variant="child" onClick={() => setShowThemePicker(false)}>
            {t("resume")}
          </Button>
        </div>
      </ThemeBackground>
    );
  }

  return (
    <ThemeBackground themeId={theme}>
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-4 py-4">
        <div className="mb-2 flex items-center justify-between">
          <Button variant="child" size="icon" onClick={() => setPaused(true)} aria-label={t("pause")}>
            ⏸
          </Button>
          {session.proxyMode && (
            <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-bold">
              {t("proxyBadge")}
            </span>
          )}
          <Button variant="child" size="icon" onClick={() => setShowThemePicker(true)} aria-label={t("changeTheme")}>
            🎨
          </Button>
        </div>

        <ProgressPath total={questions.length} current={currentIndex} accent={themeDef.accent} />

        <div className="flex justify-center py-4">
          <CompanionCharacter mood={companionMood} />
        </div>

        {currentQuestion && (
          <div
            className="flex-1 rounded-3xl p-6 shadow-xl"
            style={{ background: themeDef.cardBg }}
          >
            <QuestionRenderer
              question={currentQuestion}
              value={currentValue}
              onChange={setCurrentValue}
              accent={themeDef.accent}
            />
          </div>
        )}

        <div className="py-6">
          <Button
            size="lg"
            className="w-full"
            variant="child"
            disabled={currentValue === null}
            onClick={handleAnswer}
            style={{ background: themeDef.accent, color: "white" }}
          >
            {t("next")}
          </Button>
        </div>
      </div>
    </ThemeBackground>
  );
}
