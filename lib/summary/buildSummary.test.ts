import { describe, expect, it } from "vitest";
import { buildSummary } from "./buildSummary";

describe("buildSummary", () => {
  const session = {
    id: "test",
    patientName: "Test Patient A",
    patientDob: "2015-01-01",
    ageTier: "5-8" as const,
    childLocale: "en",
    parentLocale: "en",
    childTheme: "sunny-sky" as const,
    enabledQuestionIds: ["pain_present"],
    supplementaryQuestionIds: [],
    clinicianNote: "",
    proxyMode: false,
    status: "complete" as const,
    responses: [],
    currentQuestionIndex: 0,
    startedAt: new Date(Date.now() - 120_000).toISOString(),
    pausedAt: null,
    completedAt: new Date().toISOString(),
    initiatedBy: "Dr. Demo",
  };

  it("preserves parent free text verbatim", () => {
    const summary = buildSummary(
      [
        {
          questionId: "parent_notes",
          value: "He's been off food since Tuesday.",
          source: "parent",
          answeredAt: new Date().toISOString(),
        },
      ],
      session,
    );
    expect(summary.parentNotes).toBe("He's been off food since Tuesday.");
  });

  it("marks proxy-captured responses as proxy", () => {
    const summary = buildSummary(
      [
        {
          questionId: "pain_present",
          value: true,
          source: "proxy",
          answeredAt: new Date().toISOString(),
        },
      ],
      session,
    );
    expect(summary.items[0]?.source).toBe("proxy");
  });
});
