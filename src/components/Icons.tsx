// Product diagrams for the dark bands and the trust section. Illustrative: sample IDs, hosts and payloads.

/** Arrowhead marker. Each SVG gets its own id, because two SVGs on a page sharing one id is invalid HTML. */
function Arrow({ id }: { id: string }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="var(--deep-accent)" />
      </marker>
    </defs>
  );
}

const FLOW_LINKS = ["M170 150 H250 L280 120", "M440 120 H460", "M540 150 V180", "M460 210 H440", "M360 240 V262 H690 V150 H730"];
const MODULES: [string, number, number][] = [["Routing", 280, 90], ["Compliance", 460, 90], ["Ledger", 280, 180], ["AI Ops", 460, 180]];

/** P1: sender → BlutusCore modules → payout partner, with packets travelling each link. */
export function ArchitectureFlow() {
  // On phones the diagram keeps a readable size and scrolls sideways (globals.css .flow-scroll), focusable for keyboards.
  return (
    <div className="flow-scroll" tabIndex={0} role="region" aria-label="Architecture diagram">
    <svg className="flow" viewBox="0 0 900 300" role="img" aria-label="A transfer flows from the sender partner through BlutusCore's routing, compliance, ledger and AI ops modules to the payout partner.">
      <Arrow id="arw-flow" />
      <rect className="box" x="20" y="110" width="150" height="80" /><text x="40" y="146">Sender partner</text><text x="40" y="168" className="s">API · webhooks</text>
      <rect className="core" x="250" y="40" width="400" height="220" /><text x="270" y="68" className="ttl">BlutusCore</text>
      {MODULES.map(([t, x, y]) => (
        <g key={t}><rect className="box" x={x} y={y} width="160" height="60" /><text x={x + 18} y={y + 36}>{t}</text></g>
      ))}
      <rect className="box" x="730" y="110" width="150" height="80" /><text x="750" y="146">Payout partner</text><text x="750" y="168" className="s">bank · wallet · cash</text>
      {FLOW_LINKS.map((d) => <path key={d} className="lk" d={d} markerEnd="url(#arw-flow)" />)}
      {FLOW_LINKS.map((d, i) => <circle key={`p${i}`} className="pkt" r="5" style={{ offsetPath: `path('${d}')`, animationDelay: `${i * 0.7}s` }} />)}
      <text x="300" y="290" className="s">illustrative · sample flow</text>
    </svg>
    </div>
  );
}

/** I1: the request's lines light up in step with the boxes they reach. */
export function CodeSync() {
  return (
    <div className="sync">
      <pre className="code" aria-label="Illustrative API request: create a transfer, receive 201, then a transfer.completed webhook.">
        <span className="l1"><span className="c">{"// Create a transfer (illustrative)"}</span></span>
        <span className="l2"><b>POST</b> /v1/transfers</span>
        <span className="l3">{"{ "}<span className="k">&quot;quote_id&quot;</span>: <span className="s">&quot;qt_8Hc2&quot;</span>, <span className="k">&quot;payout&quot;</span>: {"{ "}<span className="k">&quot;country&quot;</span>: <span className="s">&quot;PH&quot;</span>{" } }"}</span>
        <span className="l4"><span className="ok">→ 201</span>{" { "}<span className="k">&quot;id&quot;</span>: <span className="s">&quot;tr_9F21&quot;</span>, <span className="k">&quot;status&quot;</span>: <span className="s">&quot;AWAITING_COMMIT&quot;</span>{" }"}</span>
        <span className="l5"><span className="c">{"// webhook"}</span> transfer.completed</span>
      </pre>
      <svg className="mini" viewBox="0 0 360 230" aria-hidden="true">
        <Arrow id="arw-mini" />
        <rect className="box m1" x="20" y="20" width="140" height="44" /><text x="36" y="47">Your app</text>
        <rect className="box m2" x="200" y="20" width="140" height="44" /><text x="216" y="47">BlutusCore</text>
        <rect className="box m3" x="200" y="100" width="140" height="44" /><text x="216" y="127">Compliance</text>
        <rect className="box m4" x="200" y="176" width="140" height="44" /><text x="216" y="203">Payout partner</text>
        <path className="lk" d="M160 42 H200" markerEnd="url(#arw-mini)" /><path className="lk" d="M270 64 V100" markerEnd="url(#arw-mini)" />
        <path className="lk" d="M270 144 V176" markerEnd="url(#arw-mini)" /><path className="lk" d="M200 198 H90 V64" markerEnd="url(#arw-mini)" />
      </svg>
    </div>
  );
}

const TRAIL = [
  ["10:42:07", "transfer.created", "partner-api", "a91f…"],
  ["10:42:08", "screening.passed", "compliance", "7c02…"],
  ["10:42:08", "journal.posted", "ledger", "e5d4…"],
  ["10:42:11", "payout.dispatched", "routing", "3b8e…"],
  ["10:42:19", "transfer.completed", "payout-partner", "c1a7…"],
];

/** T1: an append-only audit trail for one transfer (sample). */
export function AuditTrail() {
  return (
    <div className="ledger" role="table" aria-label="Sample audit trail for one transfer">
      <div className="head" role="row"><span role="columnheader">AUDIT TRAIL · TR_9F21</span><span role="columnheader">SAMPLE</span></div>
      {TRAIL.map(([t, e, a, h], i) => (
        <div key={e} className="row" role="row" style={{ "--d": `${i * 0.35}s` } as React.CSSProperties}>
          <span className="mono" role="cell">{t}</span><span role="cell">{e}</span><span className="muted" role="cell">{a}</span><span className="mono hash" role="cell">{h}</span>
        </div>
      ))}
    </div>
  );
}

/** W1: five steps on a track, with a runner moving along it. */
export function Pipeline({ steps }: { steps: string[][] }) {
  return (
    <div className="pipe">
      <div className="track" aria-hidden="true"><span className="runner" /></div>
      <ol>
        {steps.map(([t, d], i) => (
          <li key={t} className="node"><span className="dot mono" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span><h3>{t}</h3><small>{d}</small></li>
        ))}
      </ol>
    </div>
  );
}

export function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
