import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { Page, PageHeader } from "@/components/Page";
import { PaythonicMark } from "@/components/PaythonicMark";
import { COMPANY, SITE } from "@/content/site";

export const metadata: Metadata = { title: "Company", description: COMPANY.profile };

export default function CompanyPage() {
  return (
    <Page>
      <PageHeader className="page-head">
        <div className="wrap">
          <p className="eyebrow">{COMPANY.eyebrow}</p>
          <h1 className="mega">{COMPANY.statement}</h1>
          <div className="profcard">
            <span className="profmark"><PaythonicMark size={88} /></span>
            <div>
              <p className="spec">Company profile</p>
              <p className="profile">{COMPANY.profile}</p>
              <span className="pill2">{SITE.status}</span>
            </div>
          </div>
        </div>
      </PageHeader>

      <section className="band">
        <div className="wrap mv reveal">
          <div><p className="spec">Mission</p><p className="big">{COMPANY.mission}</p></div>
          <div><p className="spec">Vision</p><p className="big">{COMPANY.vision}</p></div>
        </div>
      </section>

      <section className="band alt">
        <div className="wrap">
          <div className="reveal">
            <p className="eyebrow">Our values</p>
            <h2>What drives us</h2>
            <p className="lead">The principles that guide everything we build and every relationship we form.</p>
          </div>
          <div className="grid4 reveal">
            {COMPANY.values.map(([t, d], i) => (
              <div key={t} className="value"><span className="n mono">0{i + 1}</span><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand {...COMPANY.cta} />
    </Page>
  );
}
