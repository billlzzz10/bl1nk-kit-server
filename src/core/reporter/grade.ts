import { AnalyzeReport } from "@/types/rules";

export type Grade = "A" | "B" | "C" | "D" | "F";

export interface GradeReport {
  version: "1.0";
  score: number;     // 0..100
  grade: Grade;
  breakdown: {
    penalties: { ruleId: string; severity: "warn" | "error"; weight: number }[];
  };
}

const weights = { warn: 2, error: 6 }; // ปรับง่าย

export function grade(report: AnalyzeReport): GradeReport {
  const penalties: { ruleId: string; severity: "warn" | "error"; weight: number }[] = [];
  let totalPenalty = 0;

  for (const r of report.results) {
    if (!r.passed) {
      if (r.severity === "error") {
        totalPenalty += weights.error;
        penalties.push({ ruleId: r.id, severity: "error", weight: weights.error });
      } else if (r.severity === "warn") {
        totalPenalty += weights.warn;
        penalties.push({ ruleId: r.id, severity: "warn", weight: weights.warn });
      }
    }
  }

  const base = 100;
  const score = Math.max(0, base - totalPenalty);
  const grade: Grade =
    score >= 90 ? "A" :
    score >= 80 ? "B" :
    score >= 70 ? "C" :
    score >= 60 ? "D" : "F";

  return { version: "1.0", score, grade, breakdown: { penalties } };
}