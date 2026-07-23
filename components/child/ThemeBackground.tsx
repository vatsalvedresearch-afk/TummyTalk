"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ChildTheme } from "@/lib/schemas/session";
import { getThemeById } from "@/lib/themes/child-themes";

interface ThemeBackgroundProps {
  themeId: ChildTheme;
  children: React.ReactNode;
}

function SunnyDecor() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
      <circle cx="85%" cy="12%" r="48" fill="#FFD93D" opacity="0.9" />
      {[20, 35, 50, 65, 80].map((x) => (
        <ellipse key={x} cx={`${x}%`} cy="18%" rx="36" ry="14" fill="white" opacity="0.7" />
      ))}
    </svg>
  );
}

function OceanDecor() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
      <path d="M0,70 Q25,60 50,70 T100,70 L100,100 L0,100 Z" fill="rgba(255,255,255,0.25)" />
      <path d="M0,80 Q30,72 60,80 T100,80 L100,100 L0,100 Z" fill="rgba(255,255,255,0.15)" />
      <circle cx="15%" cy="25%" r="8" fill="white" opacity="0.6" />
      <circle cx="18%" cy="22%" r="5" fill="white" opacity="0.5" />
    </svg>
  );
}

function MeadowDecor() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
      {["10%", "30%", "55%", "75%", "90%"].map((x, i) => (
        <g key={x} transform={`translate(${x}, 85%)`}>
          <ellipse cx="0" cy="0" rx="8" ry="14" fill={["#f472b6", "#a78bfa", "#fbbf24", "#34d399", "#fb7185"][i]} />
          <rect x="-2" y="0" width="4" height="20" fill="#166534" />
        </g>
      ))}
    </svg>
  );
}

function SunsetDecor() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
      <circle cx="50%" cy="75%" r="60" fill="#fb923c" opacity="0.5" />
      <rect x="0" y="78%" width="100%" height="22%" fill="#7c2d12" opacity="0.15" />
    </svg>
  );
}

function StarryDecor() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
      {Array.from({ length: 24 }).map((_, i) => (
        <circle
          key={i}
          cx={`${(i * 17 + 7) % 100}%`}
          cy={`${(i * 13 + 5) % 60}%`}
          r={i % 3 === 0 ? 2.5 : 1.5}
          fill="#fef08a"
          opacity={0.5 + (i % 5) * 0.1}
        />
      ))}
      <circle cx="80%" cy="15%" r="20" fill="#fde68a" opacity="0.8" />
    </svg>
  );
}

function CandyDecor() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
      {[
        { cx: "12%", cy: "20%", fill: "#f9a8d4" },
        { cx: "88%", cy: "30%", fill: "#c4b5fd" },
        { cx: "25%", cy: "75%", fill: "#93c5fd" },
        { cx: "70%", cy: "65%", fill: "#86efac" },
      ].map((dot) => (
        <circle key={dot.cx} cx={dot.cx} cy={dot.cy} r="18" fill={dot.fill} opacity="0.55" />
      ))}
    </svg>
  );
}

const DECOR: Record<ChildTheme, React.FC> = {
  "sunny-sky": SunnyDecor,
  ocean: OceanDecor,
  meadow: MeadowDecor,
  sunset: SunsetDecor,
  starry: StarryDecor,
  candy: CandyDecor,
};

export function ThemeBackground({ themeId, children }: ThemeBackgroundProps) {
  const theme = getThemeById(themeId);
  const Decor = DECOR[themeId];
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ background: theme.gradient, color: theme.text }}
    >
      <Decor />
      <motion.div
        className="relative z-10 min-h-screen"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
