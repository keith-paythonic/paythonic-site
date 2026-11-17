import type { SceneKey } from "@/content/site";

// Small looping pieces of the product (style Y2). All figures are sample data.

function Route() {
  const rows: [string, number][] = [["Bank PH-1", 72], ["Wallet PH-2", 94], ["Cash PH-3", 61]];
  return (
    <>
      <div className="lvh">Route selection · AE → PH</div>
      {rows.map(([n, s], i) => (
        <div key={n} className={`lvr${i === 1 ? " pick" : ""}`}>
          <span>{n}</span><span className="bar"><i style={{ width: `${s}%` }} /></span><b className="mono">{s}</b>
        </div>
      ))}
      <span className="chip ok">Selected Wallet PH-2 · 412 ms</span>
    </>
  );
}

function Plug() {
  const rows = [["Bank PH", "connected", "182 ms"], ["Wallet IN", "connected", "240 ms"], ["Cash VN", "onboarding", "…"]];
  return (
    <>
      <div className="lvh">Partner connections</div>
      {rows.map(([n, s, l], i) => (
        <div key={n} className="lvr">
          <span><i className={`pulse ${i < 2 ? "ok" : "warn"}`} />{n}</span><span className="mut">{s}</span><b className="mono">{l}</b>
        </div>
      ))}
    </>
  );
}

function Radar() {
  return (
    <>
      <div className="lvh">Risk signals · last 60 min</div>
      <svg viewBox="0 0 240 70" className="spark">
        <path d="M0 55 L30 50 L60 53 L90 46 L120 49 L140 12 L160 51 L190 44 L240 47" /><circle cx="140" cy="12" r="5" />
      </svg>
      <span className="chip warn">Anomaly · auto-held for review</span>
    </>
  );
}

function Chain() {
  return (
    <>
      <div className="lvh">Settlement · stablecoin rail</div>
      <div className="lvr two"><span className="mono">USDC 50,000.00</span><span className="bar grow"><i /></span></div>
      <span className="chip ok">Settled · reconciled</span>
    </>
  );
}

function Ledger() {
  const rows = [["Dr prefund", "1,850.00"], ["Cr clearing", "1,850.00"], ["Dr fee", "12.00"], ["Cr revenue", "12.00"]];
  return (
    <>
      <div className="lvh">Journal · TX-9F21</div>
      {rows.map(([a, b], i) => (
        <div key={a} className="lvr two seq" style={{ "--d": `${i * 0.5}s` } as React.CSSProperties}>
          <span className="mono">{a}</span><b className="mono">{b}</b>
        </div>
      ))}
      <span className="chip ok mono">Σ = 0.00</span>
    </>
  );
}

function Shield() {
  const checks = ["KYC / AML", "Sanctions", "Corridor rules", "Human review"];
  return (
    <>
      <div className="lvh">Screening · TX-9F23</div>
      {checks.map((t, i) => (
        <div key={t} className="lvr two seq" style={{ "--d": `${i * 0.6}s` } as React.CSSProperties}>
          <span>{t}</span><b className={i < 3 ? "okc" : undefined}>{i < 3 ? "✓" : "…"}</b>
        </div>
      ))}
      <span className="chip ok">Approved</span>
    </>
  );
}

const SCENES: Record<SceneKey, () => React.JSX.Element> = { route: Route, plug: Plug, radar: Radar, chain: Chain, ledger: Ledger, shield: Shield };

/** Decorative: the card's heading and text carry the meaning, so the scene is hidden from screen readers. */
export function LiveScene({ kind }: { kind: SceneKey }) {
  const Scene = SCENES[kind];
  return (
    <div className="scene" aria-hidden="true">
      <div className="lv"><Scene /></div>
    </div>
  );
}

export function SceneCard({ scene, title, text }: { scene: SceneKey; title: string; text: string }) {
  return (
    <article className="card">
      <LiveScene kind={scene} />
      <div className="body"><h3>{title}</h3><p>{text}</p></div>
    </article>
  );
}
