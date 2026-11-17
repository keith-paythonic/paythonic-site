import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { GlassObject } from "@/components/Glass";
import { CheckIcon } from "@/components/Icons";
import { InnerHead } from "@/components/InnerHead";
import { Page } from "@/components/Page";
import { SOLUTIONS } from "@/content/site";

export const metadata: Metadata = { title: "Solutions", description: SOLUTIONS.lead };

export default function SolutionsPage() {
  return (
    <Page>
      <InnerHead eyebrow={SOLUTIONS.eyebrow} title={SOLUTIONS.title} lead={SOLUTIONS.lead} glass="route" />

      <section className="s">
        <div className="wrap rows">
          {SOLUTIONS.audiences.map((a, i) => (
            <div key={a.title} className={`row2 reveal${i % 2 ? " rev" : ""}`}>
              <div>
                <p className="spec">For</p>
                <h2>{a.title}</h2>
                <p className="lead">{a.text}</p>
                <ul className="checks">{a.benefits.map((b) => <li key={b}><CheckIcon /><span>{b}</span></li>)}</ul>
              </div>
              <div className="rvis"><GlassObject kind={a.scene} /></div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand {...SOLUTIONS.cta} />
    </Page>
  );
}
