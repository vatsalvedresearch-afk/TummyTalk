import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getSession } from "@/lib/session/store";
import { ChildSessionFlow } from "@/components/child/ChildSessionFlow";

interface PageProps {
  params: Promise<{ locale: string; sessionId: string }>;
}

export default async function SessionPage({ params }: PageProps) {
  const { locale, sessionId } = await params;
  setRequestLocale(locale);

  const session = getSession(sessionId);
  if (!session) notFound();

  return <ChildSessionFlow session={session} />;
}
