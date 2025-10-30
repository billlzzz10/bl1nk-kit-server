import { RuleContext, RuleResult, Evidence } from "@/types/rules";
import { Project } from "ts-morph";
import * as path from "node:path";

export async function ruleTsAsyncAwait(ctx: RuleContext): Promise<RuleResult> {
  const project = new Project({
    tsConfigFilePath: path.join(ctx.rootDir, "tsconfig.json"),
    skipAddingFilesFromTsConfig: false
  });
  const evidence: Evidence[] = [];
  for (const sf of project.getSourceFiles()) {
    const text = sf.getFullText();
    const re = /\.then\s*\(/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text))) {
      const line = sf.getDescendantAtPos(m.index)?.getStartLineNumber() ?? 1;
      evidence.push({
        file: sf.getFilePath(),
        line,
        note: "Promise.then detected, prefer async/await"
      });
    }
  }
  const passed = evidence.length === 0;
  return {
    id: "ts.async.await.preference",
    title: "Prefer async/await over Promise chains",
    category: "TypeScript",
    severity: passed ? "info" : "warn",
    passed,
    evidence,
    fix: "Refactor then/catch to async/await with try/catch"
  };
}