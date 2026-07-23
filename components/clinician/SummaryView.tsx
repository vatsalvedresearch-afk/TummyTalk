"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { SessionSummary } from "@/lib/schemas/summary";

interface SummaryViewProps {
  summary: SessionSummary;
  locale: string;
}

export function SummaryView({ summary, locale }: SummaryViewProps) {
  const t = useTranslations("review");
  const tQuestions = useTranslations("questions");
  const tFlags = useTranslations("flags");

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-slate-900">{t("title")}</h1>
          <p className="text-slate-600">
            {t("patient")}: {summary.patientName} · {t("duration")}: {summary.durationMinutes} {t("minutes")}
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>{t("clinicalValue")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-2 pr-4">Item</th>
                    <th className="py-2 pr-4">{t("clinicalValue")}</th>
                    <th className="py-2">{t("provenance")}</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.items.map((item) => {
                    const key = item.label.replace("questions.", "");
                    return (
                      <tr key={item.questionId} className="border-b border-slate-100">
                        <td className="py-3 pr-4 font-medium">
                          {tQuestions(key as never) || item.questionId}
                        </td>
                        <td className="py-3 pr-4">{item.clinicalValue}</td>
                        <td className="py-3 capitalize">{t(item.source as "child" | "parent" | "proxy")}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {summary.parentNotes && (
          <Card>
            <CardHeader>
              <CardTitle>{t("parentNotes")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap rounded-lg bg-slate-50 p-4 text-sm">
                {summary.parentNotes}
              </p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>{t("confidenceFlags")}</CardTitle>
          </CardHeader>
          <CardContent>
            {summary.confidenceFlags.length === 0 ? (
              <p className="text-sm text-slate-500">{t("noFlags")}</p>
            ) : (
              <ul className="list-inside list-disc text-sm">
                {summary.confidenceFlags.map((flag) => (
                  <li key={flag}>{tFlags(flag)}</li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Button asChild className="w-full" size="lg">
          <Link href={`/${locale}/clinician/setup`}>{t("backToSetup")}</Link>
        </Button>
      </div>
    </div>
  );
}
