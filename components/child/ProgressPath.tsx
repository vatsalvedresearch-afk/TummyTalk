"use client";

interface ProgressPathProps {
  total: number;
  current: number;
  accent: string;
}

export function ProgressPath({ total, current, accent }: ProgressPathProps) {
  return (
    <div className="flex items-center justify-center gap-2 px-4 py-3" aria-hidden>
      {Array.from({ length: total }).map((_, index) => {
        const isDone = index < current;
        const isCurrent = index === current;
        return (
          <div key={index} className="flex items-center gap-2">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all"
              style={{
                borderColor: isDone || isCurrent ? accent : "rgba(255,255,255,0.5)",
                background: isDone ? accent : isCurrent ? "white" : "rgba(255,255,255,0.4)",
                color: isDone ? "white" : accent,
                transform: isCurrent ? "scale(1.15)" : undefined,
              }}
            >
              {isDone ? "✓" : index + 1}
            </div>
            {index < total - 1 && (
              <div
                className="h-1 w-4 rounded-full sm:w-6"
                style={{
                  background: isDone ? accent : "rgba(255,255,255,0.4)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
