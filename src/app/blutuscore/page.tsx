import type { Metadata } from "next";
import { Circuit } from "@/components/Circuit";
import { CtaBand } from "@/components/CtaBand";
import { GlassObject } from "@/components/Glass";
import { Developers, PartnerOrbit, Showcase } from "@/components/Sections";
import { Page, PageHeader } from "@/components/Page";
import { BLUTUSCORE, CIRCUIT_MODULES, PARTNER_NETWORK } from "@/content/site";

export const metadata: Metadata = { title: "BlutusCore", description: BLUTUSCORE.lead };

export default function BlutusCorePage() {
  const { integration } = BLUTUSCORE;
  return (
    <Page>
      <PageHeader className="hero page-head">
        <div className="wrap">
          <p className="eyebrow">{BLUTUSCORE.eyebrow}</p>
          <h1 className="metal">{BLUTUSCORE.title}</h1>
          <p className="subtitle">{BLUTUSCORE.subtitle}</p>
          <p className="lead">{BLUTUSCORE.lead}</p>
        </div>
      </PageHeader>

      <section className="s">
        <div className="wrap">
          <div className="reveal">
            <p className="eyebrow">Platform modules</p>
            <h2>Six modules, one platform</h2>
          </div>
          <div className="grid3">
            {BLUTUSCORE.modules.map((m) => (
              <article key={m.title} className="card">
                <div className="vis"><GlassObject kind={m.scene} /></div>
                <div className="body"><h3>{m.title}</h3><p>{m.text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PartnerOrbit {...PARTNER_NETWORK} />

      <section className="s">
        <div className="wrap">
          <p className="eyebrow">Architecture</p>
          <h2>Modular by design</h2>
          <p className="lead">A transfer enters through the partner APIs, passes quoting, compliance, routing and the ledger, and leaves through the payout partner best suited to it.</p>
          <Circuit chips={CIRCUIT_MODULES} label="A transfer moving from the sender through quote and FX, compliance, routing and the ledger to the payout partner." />
          <p className="caption">Illustrative flow.</p>
        </div>
      </section>

      <Showcase />

      <Developers eyebrow={integration.eyebrow} title={integration.title} lead={integration.lead}>
        <div className="integ3 reveal">
          {integration.items.map(([t, d]) => <div key={t}><h3>{t}</h3><p>{d}</p></div>)}
        </div>
      </Developers>

      <CtaBand {...BLUTUSCORE.cta} />
    </Page>
  );
}
