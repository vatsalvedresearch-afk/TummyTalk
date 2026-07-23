"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ChildSessionFlow } from "@/components/child/ChildSessionFlow";
import { STANDARD_QUESTIONS } from "@/lib/questions/standard";
import { parseSetupConfig } from "@/lib/session/setup-config";
import type { Session } from "@/lib/schemas/session";

interface ChildExamplePageProps {
  locale: string;
}

function buildDemoSession(config: ReturnType<typeof parseSetupConfig>, locale: string): Session {
  return {
    id: "example-demo",
    patientName: "Test Patient A",
    patientDob: "2015-01-01",
    ageTier: config!.ageTier,
    childLocale: config!.childLocale,
    parentLocale: config!.parentLocale,
    childTheme: config!.childTheme,
    enabledQuestionIds: config!.enabledQuestionIds,
    supplementaryQuestionIds: [],
    clinicianNote: "",
    proxyMode: config!.proxyMode,
    status: "child",
    responses: [],
    currentQuestionIndex: 0,
    startedAt: new Date().toISOString(),
    pausedAt: null,
    completedAt: null,
    initiatedBy: "Dr. Demo Clinician",
  };
}

export function ChildExamplePage({ locale }: ChildExamplePageProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function load() {
      const sessionId = searchParams.get("sessionId");

      if (sessionId) {
        const res = await fetch(`/api/sessions/${sessionId}`);
        if (res.ok) {
          setSession(await res.json());
          return;
        }
        setError(true);
        return;
      }

      const config = parseSetupConfig(searchParams);
      if (config) {
        setSession(buildDemoSession(config, locale));
        return;
      }

      setSession({
        id: "example-demo",
        patientName: "Test Patient A",
        patientDob: "2015-01-01",
        ageTier: "5-8",
        childLocale: locale,
        parentLocale: locale,
        childTheme: "sunny-sky",
        enabledQuestionIds: STANDARD_QUESTIONS.map((q) => q.id),
        supplementaryQuestionIds: [],
        clinicianNote: "",
        proxyMode: false,
        status: "child",
        responses: [],
        currentQuestionIndex: 0,
        startedAt: new Date().toISOString(),
        pausedAt: null,
        completedAt: null,
        initiatedBy: "Dr. Demo Clinician",
      });
    }

    load();
  }, [searchParams, locale]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6 text-center">
        <p className="text-lg text-slate-600">Session not found. Start from clinician setup.</p>
        <button
          type="button"
          className="ml-4 underline"
          onClick={() => router.push(`/${locale}/clinician/setup`)}
        >
          Go to setup
        </button>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-600" />
      </div>
    );
  }

  return (
    <ChildSessionFlow
      session={session}
      exampleMode={session.id === "example-demo"}
    />
  );
}
