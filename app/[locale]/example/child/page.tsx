import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { ChildExamplePage } from "@/components/child/ChildExamplePage";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ExampleChildPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-600" />
        </div>
      }
    >
      <ChildExamplePage locale={locale} />
    </Suspense>
  );
}
