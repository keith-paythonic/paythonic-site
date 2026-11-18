// Circuit trace (design pick A3): chips on a PCB grid, joined by orthogonal traces. Each trace lights from start to
// end and stays lit, chips switch on as the signal reaches them, then the whole circuit pulses and resets.
// Layouts come from circuit-layouts.json, which scripts/gen-circuit-css.mjs also reads to write the keyframes in
// globals.css, so the drawing and its timings cannot drift apart.
import LAYOUTS from "@/components/circuit-layouts.json";

type Pt = [number, number];
/** Chip centres in the 900 x 450 viewBox, per chip count. */
const CIRCUIT_LAYOUTS: Record<string, Pt[]> = Object.fromEntries(
  Object.entries(LAYOUTS).filter(([n]) => n !== "_").map(([n, l]) => [n, (l as { points: number[][] }).points as Pt[]]),
);
const HALF_H = 22;
/** Label size in viewBox units. "lg" is for narrow columns (Compliance), where the diagram is drawn smaller. */
const FONT = { md: 14, lg: 18 } as const;
/** Plex Mono SemiBold advances about 0.62em per character; chips grow to fit their label with 16px padding a side,
 *  capped so neighbours on the same row (360 apart) never touch. */
function halfWidth(label: string, size: keyof typeof FONT): number {
  return Math.min(100, Math.max(64, (label.length * FONT[size] * 0.62 + 32) / 2));
}

function trace([x1, y1]: Pt, w1: number, [x2, y2]: Pt, w2: number): string {
  if (Math.abs(x2 - x1) < 10) return `M${x1} ${y1 + HALF_H} V${y2 - HALF_H}`;
  const a = x1 + w1, b = x2 - w2, m = (a + b) / 2;
  return `M${a} ${y1} H${m} V${y2} H${b}`;
}

/** `chain`: on phones the 900-wide diagram is unreadable, so it is hidden (globals.css). Pages with a step list under the
 *  diagram rely on that list; pages without one pass `chain` to get a vertical chain of the same chips instead. */
export function Circuit({ chips, label, size = "md", chain = false }: { chips: string[]; label: string; size?: keyof typeof FONT; chain?: boolean }) {
  const pts = CIRCUIT_LAYOUTS[chips.length];
  if (!pts) throw new Error(`Circuit has layouts for ${Object.keys(CIRCUIT_LAYOUTS).join(" or ")} chips, got ${chips.length}`);
  const hw = chips.map((c) => halfWidth(c, size));
  const traces = pts.slice(1).map((p, i) => trace(pts[i], hw[i], p, hw[i + 1]));
  return (
    <div className="circuit-box">
      <svg className="cir" data-n={chips.length} viewBox="0 0 900 450" role="img" aria-label={label}>
        <defs>
          <pattern id={`pcb-${chips.length}`} width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" className="pcbd" /></pattern>
        </defs>
        <rect width="900" height="450" fill={`url(#pcb-${chips.length})`} />
        {traces.map((d, i) => (
          <g key={d}>
            <path className="tb" d={d} />
            <path className={`tl t${i}`} pathLength={1} d={d} />
            <path className={`th t${i}`} pathLength={1} d={d} />
          </g>
        ))}
        {chips.map((t, i) => {
          const [x, y] = pts[i];
          const w = hw[i];
          const pins = Math.floor(w / 20);
          return (
            <g key={t} className={`chip c${i}`}>
              <rect x={x - w} y={y - HALF_H} width={w * 2} height={HALF_H * 2} rx="4" />
              <text x={x} y={y + FONT[size] * 0.36} style={{ fontSize: FONT[size] }}>{t}</text>
              {Array.from({ length: pins * 2 + 1 }, (_, k) => (k - pins) * 20).map((dx) => <path key={dx} className="pin" d={`M${x + dx} ${y - HALF_H} v-6 M${x + dx} ${y + HALF_H} v6`} />)}
            </g>
          );
        })}
      </svg>
      {chain && <ol className="cir-chain" aria-hidden="true">{chips.map((t) => <li key={t}>{t}</li>)}</ol>}
    </div>
  );
}
