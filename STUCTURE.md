code-audit-ts/
├─ package.json
├─ tsconfig.json
├─ README.md
├─ .github/
│  └─ workflows/
│     └─ audit.yml
├─ bin/
│  └─ code-audit
└─ src/
   ├─ types/
│  │  └─ rules.ts
   ├─ core/
│  │  ├─ runner.ts
│  │  ├─ config.ts
│  │  └─ reporter/
│  │     ├─ md.ts
│  │     ├─ json.ts
│  │     ├─ grade.ts
│  │     └─ graphviz.ts
   ├─ analyzers/
│  │  └─ ts/
│  │     ├─ index.ts
│  │     └─ rules/
│  │        ├─ strict.ts
│  │        ├─ async_await.ts
│  │        ├─ imports.ts
│  │        └─ error_specific.ts
   ├─ arch/
│  │  ├─ import_graph.ts
│  │  └─ clusters.ts
   ├─ dup/
│  │  └─ dup_functions.ts
   ├─ fingerprint/
│  │  ├─ style_ngram.ts
│  │  └─ fuse.ts
   └─ cli/
      └─ main.ts