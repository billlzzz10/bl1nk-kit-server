export interface DotGraph { nodes: string[]; edges: Array<{ from: string; to: string }>; }

/** สร้าง Graphviz DOT text */
export function toDot(g: DotGraph): string {
  const lines = ["digraph G {", '  graph [rankdir="LR"];', '  node [shape=box];'];
  for (const n of g.nodes) lines.push(`  "${n}";`);
  for (const e of g.edges) lines.push(`  "${e.from}" -> "${e.to}";`);
  lines.push("}");
  return lines.join("\n");
}