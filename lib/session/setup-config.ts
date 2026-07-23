import type { AgeTier, ChildTheme } from "@/lib/schemas/session";

export interface SetupConfig {
  ageTier: AgeTier;
  childLocale: string;
  parentLocale: string;
  childTheme: ChildTheme;
  enabledQuestionIds: string[];
  proxyMode: boolean;
}

export function serializeSetupConfig(config: SetupConfig): string {
  return new URLSearchParams({
    theme: config.childTheme,
    ageTier: config.ageTier,
    enabled: config.enabledQuestionIds.join(","),
    proxy: config.proxyMode ? "1" : "0",
    childLocale: config.childLocale,
    parentLocale: config.parentLocale,
  }).toString();
}

export function parseSetupConfig(searchParams: URLSearchParams): SetupConfig | null {
  const theme = searchParams.get("theme");
  const ageTier = searchParams.get("ageTier");
  const enabled = searchParams.get("enabled");

  if (!theme || !ageTier || !enabled) {
    return null;
  }

  const childThemes = [
    "sunny-sky",
    "ocean",
    "meadow",
    "sunset",
    "starry",
    "candy",
  ] as const;

  if (!childThemes.includes(theme as (typeof childThemes)[number])) {
    return null;
  }

  if (ageTier !== "5-8" && ageTier !== "9-12") {
    return null;
  }

  return {
    childTheme: theme as ChildTheme,
    ageTier: ageTier as AgeTier,
    enabledQuestionIds: enabled.split(",").filter(Boolean),
    proxyMode: searchParams.get("proxy") === "1",
    childLocale: searchParams.get("childLocale") ?? "en",
    parentLocale: searchParams.get("parentLocale") ?? "en",
  };
}
