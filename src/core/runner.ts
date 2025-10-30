import { AnalyzeReport, RuleResult } from "@/types/rules";
import { analyzeTs } from "@/analyzers/ts";
import { performance } from "node:perf_hooks";

export async function runAnalyze(rootDir: string): Promise<AnalyzeReport> {
  const t0 = performance.now();
  const tsResults: RuleResult[] = await analyzeTs({
    rootDir, files: [], language: "ts", timeoutMs: 60_000
  });

  const results = [...tsResults];
  const duration_ms = Math.round(performance.now() - t0);

  const byCatMap = new Map<string, { name: string; passed: number; failed: number }>();
  for (const r of results) {
    const rec = byCatMap.get(r.category) ?? { name: r.category, passed: 0, failed: 0 };
    if (r.passed) rec.passed++; else rec.failed++;
    byCatMap.set(r.category, rec);
  }

  const failed = results.filter(r => !r.passed).length;
  const near = results.filter(r => r.near_miss).length;

  const report: AnalyzeReport = {
    version: "1.0",
    meta: { root: rootDir, generated_at: new Date().toISOString(), duration_ms },
    summary: {
      totals: { rules: results.length, passed: results.length - failed, failed, near_miss: near },
      by_category: [...byCatMap.values()]
    },
    results
  };
  return report;
}