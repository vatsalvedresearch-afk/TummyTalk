import { setRequestLocale } from "next-intl/server";
import { SetupForm } from "@/components/clinician/SetupForm";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function SetupPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SetupForm locale={locale} />;
}
