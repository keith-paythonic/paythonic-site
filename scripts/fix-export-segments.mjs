// Works around a Next.js 16.4 static-export bug on Windows (containment, not a fix of the cause).
//
// The client router prefetches each page's segments as flat files, e.g. /blutuscore/__next.blutuscore.__PAGE__.txt
// (convertSegmentPathToStaticExportFilename joins the segment path with dots). On Windows the exporter reads the
// segment paths with backslashes, its "/" -> "." replace misses them, and it writes nested folders instead:
// out/blutuscore/__next.blutuscore/__PAGE__.txt. Every prefetch then 404s and page-to-page navigation loses its
// transitions. This step renames the nested files to the flat names. On Linux/macOS builds there is nothing to
// rename and it does nothing. Remove it once Next fixes next/dist/export/index.js (segment path separators).
import fs from "node:fs";
import path from "node:path";

const out = path.resolve(process.argv[2] || "out");
let moved = 0;

function filesUnder(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? filesUnder(p) : [p];
  });
}

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const p = path.join(dir, e.name);
    if (e.name.startsWith("__next.")) {
      for (const f of filesUnder(p)) {
        const flat = `${e.name}.${path.relative(p, f).split(path.sep).join(".")}`;
        fs.renameSync(f, path.join(dir, flat));
        moved++;
      }
      fs.rmSync(p, { recursive: true });
    } else if (e.name !== "_next") {
      walk(p);
    }
  }
}

if (!fs.existsSync(out)) {
  console.error(`fix-export-segments: ${out} not found; run next build first`);
  process.exit(1);
}
walk(out);
console.log(`fix-export-segments: ${moved ? `flattened ${moved} prefetch file(s)` : "nothing to fix"}`);
