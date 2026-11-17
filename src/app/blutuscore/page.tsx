import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { ArchitectureFlow, CodeSync } from "@/components/Diagrams";
import { SceneCard } from "@/components/LiveScene";
import { Page, PageHeader } from "@/components/Page";
import { BLUTUSCORE } from "@/content/site";

export const metadata: Metadata = { title: "BlutusCore", description: BLUTUSCORE.lead };

export default function BlutusCorePage() {
  return (
    <Page>
      <PageHeader className="page-head">
        <div className="wrap">
          <p className="eyebrow">{BLUTUSCORE.eyebrow}</p>
          <h1>{BLUTUSCORE.title}</h1>
          <p className="subtitle">{BLUTUSCORE.subtitle}</p>
          <p className="lead">{BLUTUSCORE.lead}</p>
        </div>
      </PageHeader>

      <section className="band">
        <div className="wrap">
          <div className="reveal">
            <p className="eyebrow">Platform modules</p>
            <h2>Six modules, one platform</h2>
          </div>
          <div className="grid3 reveal">
            {BLUTUSCORE.modules.map((m) => <SceneCard key={m.title} {...m} />)}
          </div>
          <p className="caption">Product scenes show sample data.</p>
        </div>
      </section>

      <section className="band dark">
        <div className="wrap">
          <div className="reveal">
            <p className="eyebrow">Architecture</p>
            <h2>Modular by design</h2>
            <p className="lead">A transfer enters through the partner APIs, passes routing, compliance, the ledger and AI ops, and leaves through the payout partner best suited to it.</p>
          </div>
          <ArchitectureFlow />
        </div>
      </section>

      <section className="band dark">
        <div className="wrap">
          <div className="reveal">
            <p className="eyebrow">{BLUTUSCORE.integration.eyebrow}</p>
            <h2>{BLUTUSCORE.integration.title}</h2>
            <p className="lead">{BLUTUSCORE.integration.lead}</p>
          </div>
          <CodeSync />
          <p className="caption">Endpoint and payloads are illustrative.</p>
          <div className="integ3 reveal">
            {BLUTUSCORE.integration.items.map(([t, d]) => <div key={t}><h3>{t}</h3><p>{d}</p></div>)}
          </div>
        </div>
      </section>

      <CtaBand {...BLUTUSCORE.cta} />
    </Page>
  );
}
