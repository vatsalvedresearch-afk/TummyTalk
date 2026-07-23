"use client";

import { motion, useReducedMotion } from "motion/react";

interface CompanionCharacterProps {
  mood?: "idle" | "acknowledge";
}

export function CompanionCharacter({ mood = "idle" }: CompanionCharacterProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className="flex flex-col items-center"
      animate={
        reducedMotion
          ? undefined
          : mood === "acknowledge"
            ? { y: [0, -8, 0], rotate: [0, -5, 5, 0] }
            : { y: [0, -4, 0] }
      }
      transition={
        mood === "acknowledge"
          ? { duration: 0.5 }
          : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
      }
    >
      <svg width="88" height="88" viewBox="0 0 88 88" aria-hidden>
        <circle cx="44" cy="44" r="40" fill="#FFB347" />
        <circle cx="30" cy="36" r="6" fill="#1e293b" />
        <circle cx="58" cy="36" r="6" fill="#1e293b" />
        <path
          d="M 28 54 Q 44 64 60 54"
          stroke="#1e293b"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx="44" cy="18" rx="8" ry="12" fill="#FFB347" />
      </svg>
    </motion.div>
  );
}
