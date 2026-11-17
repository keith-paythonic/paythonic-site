import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { Page, PageHeader } from "@/components/Page";
import { LivingMark } from "@/components/PaythonicMark";
import { COMPANY, SITE } from "@/content/site";

export const metadata: Metadata = { title: "Company", description: COMPANY.profile };

/** The statement's second half ("for the future…") is set in the italic serif accent (F3). */
function splitStatement(s: string): [string, string] {
  const i = s.indexOf(" for ");
  return i < 0 ? [s, ""] : [s.slice(0, i), s.slice(i + 1)];
}

export default function CompanyPage() {
  const [a, b] = splitStatement(COMPANY.statement);
  return (
    <Page>
      {/* CO2: the living logo draws itself centre stage above the statement. */}
      <PageHeader className="hero co-hero">
        <div className="wrap">
          <div className="biglogo"><LivingMark size={170} /></div>
          <p className="eyebrow">{COMPANY.eyebrow}</p>
          <h1 className="mega metal"><span className="h-a">{a}</span> {b && <span className="h-b">{b}</span>}</h1>
          <p className="lead">{COMPANY.profile}</p>
          <span className="pill">{SITE.status}</span>
        </div>
      </PageHeader>

      <section className="s">
        <div className="wrap mv reveal">
          <div><p className="spec">Mission</p><p className="big">{COMPANY.mission}</p></div>
          <div><p className="spec">Vision</p><p className="big">{COMPANY.vision}</p></div>
        </div>
      </section>

      <section className="s dk">
        <div className="wrap">
          <p className="eyebrow">Our values</p>
          <h2>What drives us</h2>
          <p className="lead">The principles that guide everything we build and every relationship we form.</p>
          <div className="vals-rail">
            {COMPANY.values.map(([t, d], i) => (
              <div key={t}><i aria-hidden="true" /><span className="n mono">0{i + 1}</span><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand {...COMPANY.cta} />
    </Page>
  );
}
