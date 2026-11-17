// Sections for the redesign. Home: problem (Q2), before/after flip cards (BA4), scroll story (S1), trust shield (TR1),
// corridor line (GF2). BlutusCore page: showcase (U1), developers (V1), partner orbit (OB1). Copy from content/site.ts.
import { GlassObject } from "@/components/Glass";
import { LiveScene } from "@/components/LiveScene";
import { LivingMark } from "@/components/PaythonicMark";
import { BEFORE_AFTER, DEVELOPERS, ORBIT, PROBLEM, SHOWCASE, STORY, TRUST_PILLARS } from "@/content/site";

const THREAD_D = "M97 0 C 97 160 99 240 96 330 S 98 520 97 620 S 95 820 97 990";
const TANGLE = "M0 40 C 120 160 200 -40 320 120 S 520 20 640 140 S 820 0 900 90";
const css = (v: Record<string, string | number>) => v as React.CSSProperties;

/** Q2: the section pins in place; the lines stay tangled when it arrives and only straighten as you keep scrolling
 *  (globals.css, "problem"). Without scroll-driven animation support it shows the tangle, unpinned. */
export function Problem() {
  return (
    <section className="s dk problem">
      <div className="problem-pin">
        <div className="wrap problem-stage">
          <p className="eyebrow">{PROBLEM.eyebrow}</p>
          <h2>{PROBLEM.title}</h2>
          <svg className="untangle" viewBox="0 -40 900 240" preserveAspectRatio="none" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => <path key={i} d={TANGLE} transform={`translate(0 ${i * 6})`} />)}
          </svg>
          <p className="lead">{PROBLEM.lead}</p>
        </div>
      </div>
    </section>
  );
}

/** BA4: pinned; the four cards arrive showing the old way, then flip to the BlutusCore way one by one as you scroll. */
export function BeforeAfter() {
  return (
    <section className="s dk">
      <div className="flip-pin">
        <div className="wrap flip-stage">
          <p className="eyebrow">{BEFORE_AFTER.eyebrow}</p>
          <h2>{BEFORE_AFTER.title}</h2>
          <div className="flips">
            {BEFORE_AFTER.before.map((before, i) => (
              <div key={before} className="flip" style={css({ "--i": i })}>
                <div className="face front card"><p className="spec">Today</p><p className="x">✕ {before}</p></div>
                <div className="face back card"><p className="spec">With BlutusCore</p><p>✓ {BEFORE_AFTER.after[i]}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** S1: pinned; the four steps fade and blur in one at a time. Without scroll-driven animation support (or with
 *  reduced motion) it shows as a plain four-column list. */
export function Story() {
  return (
    <section className="s" style={{ paddingBottom: 0 }}>
      <div className="wrap center"><p className="eyebrow">{STORY.eyebrow}</p></div>
      <div className="story-pin">
        <ol className="story-list wrap" style={{ listStyle: "none", padding: 0 }}>
          {STORY.steps.map((s, i) => (
            <li key={s.title} className="story-step" style={css({ "--i": i })}>
              <GlassObject kind={s.kind} />
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
          <li className="story-dots" aria-hidden="true">{STORY.steps.map((s) => <i key={s.title} />)}</li>
        </ol>
      </div>
    </section>
  );
}

/** U1: ruled rows on the left; the matching product screen cycles in a framed device. */
export function Showcase() {
  return (
    <section className="s dk">
      <div className="wrap">
        <p className="eyebrow">{SHOWCASE.eyebrow}</p>
        <h2>{SHOWCASE.title}</h2>
        <div className="show">
          <div>{SHOWCASE.tabs.map((t, i) => <div key={t.title} className="show-row" style={css({ "--i": i })}><span className="mono">0{i + 1}</span><b>{t.title}</b></div>)}</div>
          <div className="show-stage" aria-hidden="true">
            <div className="device">{SHOWCASE.tabs.map((t, i) => <div key={t.title} className="screen" style={css({ "--i": i })}><LiveScene kind={t.scene} /></div>)}</div>
          </div>
        </div>
        <p className="caption">Product scenes show sample data.</p>
      </div>
    </section>
  );
}

const CODE: [string, React.ReactNode][] = [
  ["c", "// Create a transfer (illustrative)"],
  ["", <><b>POST</b> /v1/transfers</>],
  ["", <>{"{ "}<span className="k">&quot;quote_id&quot;</span>: <span className="str">&quot;qt_8Hc2&quot;</span>, <span className="k">&quot;payout&quot;</span>: {"{ "}<span className="k">&quot;country&quot;</span>: <span className="str">&quot;PH&quot;</span>{" } }"}</>],
  ["", <><span className="ok">→ 201</span>{" { "}<span className="k">&quot;status&quot;</span>: <span className="str">&quot;AWAITING_COMMIT&quot;</span>{" }"}</>],
  ["c", "// webhook → transfer.completed"],
];

/** V1: request lines light up while the flow they trigger draws itself. */
export function Developers({ title = DEVELOPERS.title, lead = DEVELOPERS.lead, eyebrow = DEVELOPERS.eyebrow, children }: { title?: string; lead?: string; eyebrow?: string; children?: React.ReactNode }) {
  return (
    <section className="s">
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="lead">{lead}</p>
        <div className="dev">
          <pre className="code" aria-label="Illustrative API request: create a transfer, receive 201, then a transfer.completed webhook.">
            {CODE.map(([c, t], i) => <span key={i} className="cl" style={css({ "--i": i })}>{c ? <span className="c">{t}</span> : t}</span>)}
          </pre>
          <svg viewBox="0 0 360 260" className="vmini" aria-hidden="true">
            {DEVELOPERS.flow.map((t, i) => <g key={t} className="fn" style={css({ "--j": i })}><rect x="100" y={12 + i * 70} width="160" height="36" rx="18" /><text x="180" y={35 + i * 70}>{t}</text></g>)}
            {[0, 1, 2].map((i) => <path key={i} className="fe" pathLength={1} style={css({ "--i": i })} d={`M180 ${48 + i * 70} V${82 + i * 70}`} />)}
          </svg>
        </div>
        <p className="caption">Endpoint and payloads are illustrative.</p>
        {children}
      </div>
    </section>
  );
}

/** TR1: a glass shield at the centre; lines draw out to the four trust pillars and pulse. On narrow screens the
 *  pillars stack under the shield and the lines are hidden. */
const PILLAR_POS: [number, number][] = [[16, 22], [84, 22], [16, 78], [84, 78]];
export function TrustShield({ title, eyebrow, lead }: { title: string; eyebrow: string; lead: string }) {
  return (
    <section className="s">
      <div className="wrap center">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="lead">{lead}</p>
      </div>
      <div className="wrap shield-stage">
        <svg className="shield-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {PILLAR_POS.map(([x, y], i) => <path key={i} pathLength={1} style={css({ "--i": i })} d={`M50 50 L${x < 50 ? x + 14 : x - 14} ${y}`} />)}
        </svg>
        <div className="shield-core" aria-hidden="true"><GlassObject kind="shield" /></div>
        {TRUST_PILLARS.map(([t, d], i) => (
          <div key={t} className="pillar card" style={css({ "--i": i, left: `${PILLAR_POS[i][0]}%`, top: `${PILLAR_POS[i][1]}%` })}><b>{t}</b><span>{d}</span></div>
        ))}
      </div>
      <div className="wrap"><p className="caption center">Platform capabilities, not third-party certifications.</p></div>
    </section>
  );
}

/** Spokes from the hub to each partner on a ring. They sit inside the ring, so they turn with it. */
function Spokes({ angles, r }: { angles: number[]; r: number }) {
  const pt = (a: number, d: number) => [d * Math.sin((a * Math.PI) / 180), -d * Math.cos((a * Math.PI) / 180)].map(Math.round);
  return (
    <svg className="spokes" viewBox={`${-r} ${-r} ${r * 2} ${r * 2}`}>
      {angles.map((a) => { const [x0, y0] = pt(a, 95); const [x, y] = pt(a, r - 30); return <line key={a} x1={x0} y1={y0} x2={x} y2={y} />; })}
    </svg>
  );
}

/** OB1 + OP1 (BlutusCore page): partner types circle a glass-sphere hub carrying the living logo ("integrate once"). */
export function PartnerOrbit({ title, eyebrow, lead }: { title: string; eyebrow: string; lead: string }) {
  return (
    <section className="s dk">
      <div className="wrap center">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="lead">{lead}</p>
        <div className="orbit" aria-hidden="true">
          <div className="ring outer"><Spokes angles={[45, 135, 225, 315]} r={280} />{ORBIT.outer.map((t, i) => <span key={t} style={css({ "--a": `${i * 90 + 45}deg` })}><em>{t}</em></span>)}</div>
          <div className="ring inner"><Spokes angles={[0, 90, 180, 270]} r={180} />{ORBIT.inner.map((t, i) => <span key={t} style={css({ "--a": `${i * 90}deg` })}><em>{t}</em></span>)}</div>
          <div className="hub">
            <svg viewBox="0 0 200 200" className="hub-glass">
              <ellipse cx="100" cy="186" rx="60" ry="8" fill="url(#gl-shadow)" />
              <circle cx="100" cy="95" r="82" fill="url(#gl-sphere)" />
              <ellipse cx="100" cy="95" rx="98" ry="26" fill="none" stroke="url(#gl-rim)" strokeWidth="4" transform="rotate(-16 100 95)" />
              <ellipse cx="74" cy="56" rx="26" ry="13" fill="#fff" opacity=".35" transform="rotate(-30 74 56)" />
            </svg>
            <span className="hub-mark"><LivingMark size={46} /></span>
            <b className="hub-label">BlutusCore</b>
          </div>
        </div>
        <p className="caption">Partner types BlutusCore is designed to connect.</p>
      </div>
    </section>
  );
}

/** GF2: a glowing corridor line draws down the page edge as you scroll, with a bright head and a node at each section
 *  (globals.css ".thread", ".page-home .s::after"). Desktop only. */
export function Thread() {
  return (
    <svg className="thread" viewBox="0 0 100 1000" preserveAspectRatio="none" aria-hidden="true">
      <path className="base" d={THREAD_D} />
      <path className="lit" pathLength={1} d={THREAD_D} />
      <path className="head" pathLength={1} d={THREAD_D} />
    </svg>
  );
}
