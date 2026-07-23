import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getSession } from "@/lib/session/store";
import { ParentSessionFlow } from "@/components/session/ParentSessionFlow";

interface PageProps {
  params: Promise<{ locale: string; sessionId: string }>;
}

export default async function ParentSessionPage({ params }: PageProps) {
  const { locale, sessionId } = await params;
  setRequestLocale(locale);

  const session = getSession(sessionId);
  if (!session) notFound();

  return <ParentSessionFlow session={session} locale={locale} />;
}
