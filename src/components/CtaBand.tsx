import Link from "next/link";

/** Request Demo is not live yet: shown disabled with a "Coming soon" tag (Keith, round 4). */
export function DemoButton({ small = false }: { small?: boolean }) {
  return (
    <span className="soon">
      <button className={`btn${small ? " sm" : ""}`} type="button" disabled>Request Demo</button>
      <em>Coming soon</em>
    </span>
  );
}

/** Closing band on every page: centred (round 4), framed by a glowing arc of light (redesign pick E4). */
export function CtaBand({ title, lead }: { title: string; lead: string }) {
  return (
    <section className="cta-band s dk">
      <div className="arc" aria-hidden="true" />
      <div className="wrap reveal">
        <h2>{title}</h2>
        <p className="lead">{lead}</p>
        <div className="ctas">
          <DemoButton />
          <Link className="btn secondary" href="/contact/">Contact</Link>
        </div>
      </div>
    </section>
  );
}
