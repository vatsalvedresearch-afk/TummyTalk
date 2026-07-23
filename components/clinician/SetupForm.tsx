"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { STANDARD_QUESTIONS } from "@/lib/questions/standard";
import { SUPPLEMENTARY_QUESTIONS } from "@/lib/questions/supplementary";
import { ThemePicker } from "@/components/child/ThemePicker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LOCALES } from "@/i18n/routing";
import type { AgeTier, ChildTheme } from "@/lib/schemas/session";

const DEMO_PATIENTS = [
  { name: "Test Patient A", dob: "2015-01-01" },
  { name: "Test Patient B", dob: "2017-06-15" },
];

export function SetupForm({ locale }: { locale: string }) {
  const t = useTranslations("setup");
  const tApp = useTranslations("app");
  const router = useRouter();

  const [patientIndex, setPatientIndex] = useState(0);
  const [ageTier, setAgeTier] = useState<AgeTier>("5-8");
  const [childLocale, setChildLocale] = useState(locale);
  const [parentLocale, setParentLocale] = useState(locale);
  const [childTheme, setChildTheme] = useState<ChildTheme>("sunny-sky");
  const [proxyMode, setProxyMode] = useState(false);
  const [enabledIds, setEnabledIds] = useState<string[]>(
    STANDARD_QUESTIONS.map((q) => q.id),
  );
  const [supplementaryIds, setSupplementaryIds] = useState<string[]>([]);
  const [clinicianNote, setClinicianNote] = useState("");
  const [loading, setLoading] = useState(false);

  function toggleQuestion(id: string) {
    setEnabledIds((prev) =>
      prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id],
    );
  }

  function toggleSupplementary(id: string) {
    setSupplementaryIds((prev) => {
      if (prev.includes(id)) return prev.filter((q) => q !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  }

  async function startSession() {
    setLoading(true);
    const patient = DEMO_PATIENTS[patientIndex];

    const res = await fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patientName: patient.name,
        patientDob: patient.dob,
        ageTier,
        childLocale,
        parentLocale,
        childTheme,
        enabledQuestionIds: enabledIds,
        supplementaryQuestionIds: supplementaryIds,
        clinicianNote,
        proxyMode,
        initiatedBy: "Dr. Demo Clinician",
      }),
    });

    if (res.ok) {
      const session = await res.json();
      router.push(`/${childLocale}/session/${session.id}`);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">{tApp("title")}</h1>
          <p className="text-slate-600">{t("title")}</p>
          <p className="mt-1 text-xs text-amber-700">{tApp("prototypeNotice")}</p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>{t("patient")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <select
              className="w-full rounded-xl border border-slate-200 p-3"
              value={patientIndex}
              onChange={(e) => setPatientIndex(Number(e.target.value))}
            >
              {DEMO_PATIENTS.map((p, i) => (
                <option key={p.name} value={i}>
                  {p.name} (DOB {p.dob})
                </option>
              ))}
            </select>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-1">
                <span className="text-sm font-medium">{t("ageTier")}</span>
                <select
                  className="w-full rounded-xl border border-slate-200 p-3"
                  value={ageTier}
                  onChange={(e) => setAgeTier(e.target.value as AgeTier)}
                >
                  <option value="5-8">5–8</option>
                  <option value="9-12">9–12</option>
                </select>
              </label>
              <label className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  checked={proxyMode}
                  onChange={(e) => setProxyMode(e.target.checked)}
                  className="h-5 w-5"
                />
                <span className="text-sm">{t("proxyMode")}</span>
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-1">
                <span className="text-sm font-medium">{t("childLanguage")}</span>
                <select
                  className="w-full rounded-xl border border-slate-200 p-3"
                  value={childLocale}
                  onChange={(e) => setChildLocale(e.target.value)}
                >
                  {LOCALES.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </label>
              <label className="space-y-1">
                <span className="text-sm font-medium">{t("parentLanguage")}</span>
                <select
                  className="w-full rounded-xl border border-slate-200 p-3"
                  value={parentLocale}
                  onChange={(e) => setParentLocale(e.target.value)}
                >
                  {LOCALES.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("childTheme")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ThemePicker value={childTheme} onChange={setChildTheme} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("questions")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {STANDARD_QUESTIONS.map((q) => (
              <label key={q.id} className="flex items-center gap-3 rounded-lg p-2 hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={enabledIds.includes(q.id)}
                  onChange={() => toggleQuestion(q.id)}
                  className="h-5 w-5"
                />
                <span className="text-sm">{q.id.replace(/_/g, " ")}</span>
              </label>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("supplementary")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {SUPPLEMENTARY_QUESTIONS.map((q) => (
              <label key={q.id} className="flex items-center gap-3 rounded-lg p-2 hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={supplementaryIds.includes(q.id)}
                  onChange={() => toggleSupplementary(q.id)}
                  className="h-5 w-5"
                />
                <span className="text-sm">{q.id.replace(/_/g, " ")}</span>
              </label>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("clinicianNote")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2 text-xs text-slate-500">{t("clinicianNoteHint")}</p>
            <textarea
              className="min-h-[80px] w-full rounded-xl border border-slate-200 p-3 text-sm"
              value={clinicianNote}
              onChange={(e) => setClinicianNote(e.target.value)}
              autoComplete="off"
            />
          </CardContent>
        </Card>

        <Button size="lg" className="w-full" onClick={startSession} disabled={loading}>
          {t("startSession")}
        </Button>
      </div>
    </div>
  );
}
