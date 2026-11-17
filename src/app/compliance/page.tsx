import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { CheckIcon } from "@/components/Diagrams";
import { SceneCard } from "@/components/LiveScene";
import { Page, PageHeader } from "@/components/Page";
import { COMPLIANCE } from "@/content/site";

export const metadata: Metadata = { title: "Compliance & Trust", description: COMPLIANCE.lead };

export default function CompliancePage() {
  const { principles, integrations, security } = COMPLIANCE;
  return (
    <Page>
      <PageHeader className="page-head">
        <div className="wrap">
          <p className="eyebrow">{COMPLIANCE.eyebrow}</p>
          <h1>{COMPLIANCE.title}</h1>
          <p className="lead">{COMPLIANCE.lead}</p>
        </div>
      </PageHeader>

      <section className="band">
        <div className="wrap">
          <div className="reveal">
            <p className="eyebrow">{principles.eyebrow}</p>
            <h2>{principles.title}</h2>
            <p className="lead">{principles.lead}</p>
          </div>
          <div className="grid5 reveal">
            {principles.items.map((p) => <SceneCard key={p.title} {...p} />)}
          </div>
          <p className="caption">Product scenes show sample data. These are platform capabilities, not third-party certifications.</p>
        </div>
      </section>

      <section className="band alt">
        <div className="wrap">
          <div className="reveal">
            <p className="eyebrow">{integrations.eyebrow}</p>
            <h2>{integrations.title}</h2>
            <p className="lead">{integrations.lead}</p>
          </div>
          <div className="icards reveal">
            {integrations.items.map(([t, d], i) => (
              <div key={t}><span className="mono">0{i + 1}</span><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="reveal">
            <p className="eyebrow">{security.eyebrow}</p>
            <h2>{security.title}</h2>
            <p className="lead">{security.lead}</p>
          </div>
          <div className="chips2 reveal">
            {security.items.map((s) => <span key={s}><CheckIcon />{s}</span>)}
          </div>
        </div>
      </section>

      <section className="band alt">
        <div className="wrap">
          <aside className="notice reveal" aria-label="Important notice">
            <p className="spec">Important notice</p>
            <p>{COMPLIANCE.notice}</p>
          </aside>
        </div>
      </section>

      <CtaBand {...COMPLIANCE.cta} />
    </Page>
  );
}
