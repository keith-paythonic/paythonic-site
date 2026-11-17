import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { CheckIcon } from "@/components/Diagrams";
import { LiveScene } from "@/components/LiveScene";
import { Page, PageHeader } from "@/components/Page";
import { SOLUTIONS } from "@/content/site";

export const metadata: Metadata = { title: "Solutions", description: SOLUTIONS.lead };

export default function SolutionsPage() {
  return (
    <Page>
      <PageHeader className="page-head">
        <div className="wrap">
          <p className="eyebrow">{SOLUTIONS.eyebrow}</p>
          <h1>{SOLUTIONS.title}</h1>
          <p className="lead">{SOLUTIONS.lead}</p>
        </div>
      </PageHeader>

      <section className="band">
        <div className="wrap rows">
          {SOLUTIONS.audiences.map((a, i) => (
            <div key={a.title} className={`row2 reveal${i % 2 ? " rev" : ""}`}>
              <div>
                <p className="spec">For</p>
                <h2>{a.title}</h2>
                <p className="lead">{a.text}</p>
                <ul className="checks">
                  {a.benefits.map((b) => <li key={b}><CheckIcon /><span>{b}</span></li>)}
                </ul>
              </div>
              <LiveScene kind={a.scene} />
            </div>
          ))}
          <p className="caption">Product scenes show sample data.</p>
        </div>
      </section>

      <CtaBand {...SOLUTIONS.cta} />
    </Page>
  );
}
