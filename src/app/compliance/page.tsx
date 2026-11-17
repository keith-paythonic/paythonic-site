import type { Metadata } from "next";
import { Circuit } from "@/components/Circuit";
import { CtaBand } from "@/components/CtaBand";
import { CheckIcon } from "@/components/Icons";
import { InnerHead } from "@/components/InnerHead";
import { Page } from "@/components/Page";
import { COMPLIANCE } from "@/content/site";

export const metadata: Metadata = { title: "Compliance & Trust", description: COMPLIANCE.lead };

/** Chip labels for the control circuit, in the same order as COMPLIANCE.principles.items. */
const CHIPS = ["Audit trail", "Risk controls", "Human review", "Secure access", "Monitoring"];

export default function CompliancePage() {
  const { principles, integrations, security } = COMPLIANCE;
  return (
    <Page>
      <InnerHead eyebrow={COMPLIANCE.eyebrow} title={COMPLIANCE.title} lead={COMPLIANCE.lead} glass="shield" />

      <section className="s">
        <div className="wrap">
          <p className="eyebrow">{principles.eyebrow}</p>
          <h2>{principles.title}</h2>
          <p className="lead">{principles.lead}</p>
          {/* CM2: the principles light up one by one along a control circuit; the list brightens in step. */}
          <div className="cm-2">
            <Circuit chips={CHIPS} size="lg" label="Five controls lighting up in turn: audit trail, risk controls, human review, secure access and monitoring." />
            <ol className="cir-list" data-n={CHIPS.length}>
              {principles.items.map((p) => <li key={p.title}><b>{p.title}</b><span>{p.text}</span></li>)}
            </ol>
          </div>
          <p className="caption">Platform capabilities, not third-party certifications.</p>
        </div>
      </section>

      <section className="s dk">
        <div className="wrap">
          <p className="eyebrow">{integrations.eyebrow}</p>
          <h2>{integrations.title}</h2>
          <p className="lead">{integrations.lead}</p>
          <div className="icards reveal">
            {integrations.items.map(([t, d], i) => <div key={t}><span className="mono">0{i + 1}</span><h3>{t}</h3><p>{d}</p></div>)}
          </div>
        </div>
      </section>

      <section className="s">
        <div className="wrap">
          <p className="eyebrow">{security.eyebrow}</p>
          <h2>{security.title}</h2>
          <p className="lead">{security.lead}</p>
          <div className="chips2 reveal">{security.items.map((s) => <span key={s}><CheckIcon />{s}</span>)}</div>
          <aside className="notice" aria-label="Important notice" style={{ marginTop: 34 }}>
            <p className="spec">Important notice</p>
            <p>{COMPLIANCE.notice}</p>
          </aside>
        </div>
      </section>

      <CtaBand {...COMPLIANCE.cta} />
    </Page>
  );
}
