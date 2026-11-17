// Generates the circuit-trace keyframes in globals.css (between the "@circuit-keyframes" marker and its end marker).
// Run after changing the chip counts or timing: node scripts/gen-circuit-css.mjs
//
// Timeline (one loop): trace i lights from start to end during [W*i %, W*(i+1) %] and stays lit; chip i switches on
// when the signal reaches it; at 84-93% the whole circuit pulses together; at 97% it resets. Per-element keyframes
// (not one shared keyframe with delays) so every part pulses and resets at the same moment.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// One source with Circuit.tsx: chip count = number of points, w = each step's window (%), dur = loop seconds.
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const LAYOUTS = Object.fromEntries(Object.entries(JSON.parse(fs.readFileSync(path.join(root, "src", "components", "circuit-layouts.json"), "utf8"))).filter(([n]) => n !== "_"));

let css = "";
for (const [key, { points, w, dur }] of Object.entries(LAYOUTS)) {
  const n = points.length;
  if (String(n) !== key) throw new Error(`circuit-layouts.json: layout "${key}" has ${n} points`);
  const sel = `.cir[data-n="${n}"]`;
  for (let i = 0; i < n - 1; i++) {
    const s = i * w, e = s + w;
    css += `@keyframes c${n}tl${i} { 0%, ${s}% { stroke-dashoffset: 1; opacity: .95; } ${e}% { stroke-dashoffset: 0; } 84% { opacity: .95; stroke-width: 2.6; } 87% { opacity: 1; stroke-width: 4; } 90% { opacity: .55; } 93% { opacity: 1; stroke-width: 4; } 97%, 100% { stroke-dashoffset: 0; opacity: 0; stroke-width: 2.6; } }\n`;
    css += `@keyframes c${n}th${i} { 0%, ${s}% { stroke-dashoffset: .22; opacity: 0; } ${s + 0.4}% { opacity: 1; } ${e}% { stroke-dashoffset: -1; opacity: 1; } ${e + 0.4}%, 100% { stroke-dashoffset: -1; opacity: 0; } }\n`;
    css += `${sel} .tl.t${i} { animation: c${n}tl${i} ${dur}s linear infinite both; } ${sel} .th.t${i} { animation: c${n}th${i} ${dur}s linear infinite both; }\n`;
  }
  for (let i = 0; i < n; i++) {
    const r = i * w;
    css += `@keyframes c${n}ch${i} { 0%, ${r}% { stroke: var(--sl); filter: none; } ${r + 1.5}% { stroke: var(--deep-brand); filter: drop-shadow(0 0 12px var(--glow)); } ${r + 8}%, 84% { stroke: var(--deep-brand); filter: none; } 87%, 93% { stroke: var(--deep-brand); filter: drop-shadow(0 0 14px var(--glow)); } 90% { filter: none; } 97%, 100% { stroke: var(--sl); filter: none; } }\n`;
    css += `${sel} .chip.c${i} rect { animation: c${n}ch${i} ${dur}s linear infinite both; }\n`;
    // A list beside the circuit (Compliance) brightens each item as its chip switches on.
    css += `@keyframes c${n}li${i} { 0%, ${r}% { opacity: .45; } ${r + 2}%, 84% { opacity: 1; } 97%, 100% { opacity: .45; } }\n`;
    css += `.cir-list[data-n="${n}"] li:nth-child(${i + 1}) { animation: c${n}li${i} ${dur}s linear infinite both; }\n`;
  }
}

const file = path.join(root, "src", "app", "globals.css");
const START = "/* @circuit-keyframes (generated: see Circuit.tsx) */";
const END = "/* @end-circuit-keyframes */";
let src = fs.readFileSync(file, "utf8");
const a = src.indexOf(START);
if (a < 0) throw new Error("marker not found in globals.css");
const b = src.indexOf(END, a);
src = src.slice(0, a + START.length) + "\n" + css + END + (b < 0 ? src.slice(a + START.length) : src.slice(b + END.length));
fs.writeFileSync(file, src);
console.log("circuit keyframes written:", css.split("\n").length - 1, "lines");
