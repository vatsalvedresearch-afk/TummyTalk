"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { PARENT_QUESTIONS } from "@/lib/questions/parent";
import { SUPPLEMENTARY_QUESTIONS } from "@/lib/questions/supplementary";
import { PictureChoice } from "@/components/child/PictureChoice";
import { getOptionsForQuestion } from "@/lib/questions/options";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Session } from "@/lib/schemas/session";
import type { QuestionDef } from "@/lib/questions/types";

interface ParentSessionFlowProps {
  session: Session;
  locale: string;
}

export function ParentSessionFlow({ session, locale }: ParentSessionFlowProps) {
  const t = useTranslations("session");
  const tQuestions = useTranslations("questions");
  const router = useRouter();

  const supplementary = SUPPLEMENTARY_QUESTIONS.filter((q) =>
    session.supplementaryQuestionIds.includes(q.id),
  );
  const allQuestions: QuestionDef[] = [...PARENT_QUESTIONS, ...supplementary];

  const [index, setIndex] = useState(0);
  const [values, setValues] = useState<Record<string, unknown>>({});
  const current = allQuestions[index];

  async function saveResponse(questionId: string, value: unknown) {
    await fetch(`/api/sessions/${session.id}/responses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        questionId,
        value,
        source: "parent",
        answeredAt: new Date().toISOString(),
      }),
    });
  }

  async function handleNext() {
    if (!current) return;
    const value = values[current.id];

    if (current.modality !== "free_text" && (value === undefined || value === "")) {
      return;
    }

    if (current.modality === "free_text") {
      await saveResponse(current.id, (value as string)?.trim() ?? "");
    } else {
      await saveResponse(current.id, value);
    }

    if (index >= allQuestions.length - 1) {
      await fetch(`/api/sessions/${session.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "complete", completedAt: new Date().toISOString() }),
      });
      router.push(`/${locale}/clinician/review/${session.id}`);
      return;
    }

    setIndex((i) => i + 1);
  }

  const key = current?.i18nKey.replace("questions.", "") ?? "";

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-xl space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">{t("parentTitle")}</h1>
          <p className="text-slate-600">{t("parentSubtitle")}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{tQuestions(key as never)}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {current?.modality === "picture_choice" && (
              <PictureChoice
                options={(getOptionsForQuestion(current.id) ?? []) as import("@/lib/questions/types").PictureOption[]}
                value={(values[current.id] as string) ?? null}
                onChange={(v) => setValues((prev) => ({ ...prev, [current.id]: v }))}
                accent="#0f766e"
                shuffle={false}
              />
            )}

            {current?.modality === "yes_no" && (
              <div className="flex gap-3">
                {[true, false].map((v) => (
                  <Button
                    key={String(v)}
                    variant={values[current.id] === v ? "default" : "outline"}
                    onClick={() => setValues((prev) => ({ ...prev, [current.id]: v }))}
                  >
                    {v ? "Yes" : "No"}
                  </Button>
                ))}
              </div>
            )}

            {current?.modality === "free_text" && (
              <textarea
                className="min-h-[120px] w-full rounded-xl border border-slate-200 p-4 text-base"
                placeholder={t("parentNotesPlaceholder")}
                value={(values[current.id] as string) ?? ""}
                onChange={(e) => setValues((prev) => ({ ...prev, [current.id]: e.target.value }))}
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
            )}
          </CardContent>
        </Card>

        <Button
          size="lg"
          className="w-full"
          disabled={
            !current ||
            (current.modality !== "free_text" &&
              (values[current.id] === undefined || values[current.id] === ""))
          }
          onClick={handleNext}
        >
          {index >= allQuestions.length - 1 ? t("finish") : t("next")}
        </Button>
      </div>
    </div>
  );
}
