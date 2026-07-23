import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getSessionSummary } from "@/lib/session/store";
import { SummaryView } from "@/components/clinician/SummaryView";

interface PageProps {
  params: Promise<{ locale: string; sessionId: string }>;
}

export default async function ReviewPage({ params }: PageProps) {
  const { locale, sessionId } = await params;
  setRequestLocale(locale);

  const summary = getSessionSummary(sessionId);
  if (!summary) notFound();

  return <SummaryView summary={summary} locale={locale} />;
}
