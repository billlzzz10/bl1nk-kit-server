import { AnalyzeReport } from "@/types/rules";
export function toJson(report: AnalyzeReport): string {
  return JSON.stringify(report, null, 2);
}