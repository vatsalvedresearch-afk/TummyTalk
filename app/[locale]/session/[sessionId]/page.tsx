import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ locale: string; sessionId: string }>;
}

export default async function SessionRedirectPage({ params }: PageProps) {
  const { locale, sessionId } = await params;
  redirect(`/${locale}/example/child?sessionId=${sessionId}`);
}
