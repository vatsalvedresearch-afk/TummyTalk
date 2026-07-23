import type { ChildTheme } from "@/lib/schemas/session";

export interface ChildThemeDef {
  id: ChildTheme;
  nameKey: string;
  gradient: string;
  accent: string;
  text: string;
  cardBg: string;
}

export const CHILD_THEMES: ChildThemeDef[] = [
  {
    id: "sunny-sky",
    nameKey: "themes.sunnySky",
    gradient: "linear-gradient(160deg, #87CEEB 0%, #B8E6FF 40%, #FFF4C2 100%)",
    accent: "#FFB347",
    text: "#1e3a5f",
    cardBg: "rgba(255,255,255,0.85)",
  },
  {
    id: "ocean",
    nameKey: "themes.ocean",
    gradient: "linear-gradient(160deg, #0ea5e9 0%, #38bdf8 50%, #7dd3fc 100%)",
    accent: "#f97316",
    text: "#0c4a6e",
    cardBg: "rgba(255,255,255,0.88)",
  },
  {
    id: "meadow",
    nameKey: "themes.meadow",
    gradient: "linear-gradient(160deg, #86efac 0%, #bbf7d0 50%, #fef9c3 100%)",
    accent: "#ec4899",
    text: "#14532d",
    cardBg: "rgba(255,255,255,0.88)",
  },
  {
    id: "sunset",
    nameKey: "themes.sunset",
    gradient: "linear-gradient(160deg, #fda4af 0%, #fdba74 50%, #fde68a 100%)",
    accent: "#7c3aed",
    text: "#7c2d12",
    cardBg: "rgba(255,255,255,0.9)",
  },
  {
    id: "starry",
    nameKey: "themes.starry",
    gradient: "linear-gradient(160deg, #312e81 0%, #6366f1 50%, #a5b4fc 100%)",
    accent: "#fbbf24",
    text: "#eef2ff",
    cardBg: "rgba(255,255,255,0.92)",
  },
  {
    id: "candy",
    nameKey: "themes.candy",
    gradient: "linear-gradient(160deg, #f9a8d4 0%, #c4b5fd 50%, #93c5fd 100%)",
    accent: "#10b981",
    text: "#581c87",
    cardBg: "rgba(255,255,255,0.9)",
  },
];

export function getThemeById(id: ChildTheme): ChildThemeDef {
  return CHILD_THEMES.find((theme) => theme.id === id) ?? CHILD_THEMES[0];
}

export function getThemeNameKey(id: ChildTheme): string {
  return getThemeById(id).nameKey.replace("themes.", "");
}
