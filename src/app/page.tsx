import Link from "next/link";
import { Circuit } from "@/components/Circuit";
import { CorridorGlobe } from "@/components/CorridorGlobe";
import { CtaBand } from "@/components/CtaBand";
import { CheckIcon } from "@/components/Icons";
import { GlassObject } from "@/components/Glass";
import { BeforeAfter, Problem, Story, Thread, TrustShield } from "@/components/Sections";
import { Page, PageHeader } from "@/components/Page";
import { CIRCUIT_STEPS, HOME, SITE } from "@/content/site";

// Focused Home (HL2, 8 sections): the product showcase and developer section live on BlutusCore, use cases on
// Solutions and the FAQ on Contact.
export default function Home() {
  return (
    <Page>
      <div className="page-home">
        <PageHeader className="hero">
          <CorridorGlobe />
          <div className="wrap">
            <div className="hero-copy">
              <span className="pill">{SITE.status}</span>
              <h1 className="metal"><span className="h-a">AI-Native Infrastructure</span> <span className="h-b">for Global Remittance</span></h1>
              <p className="lead"><b>{SITE.name}</b> {HOME.lead}</p>
              <div className="ctas">
                <Link className="btn" href="/blutuscore/">Explore BlutusCore</Link>
                <Link className="btn secondary" href="/contact/">Talk to us</Link>
              </div>
              <div className="chips">{HOME.chips.map((c) => <span key={c}><CheckIcon />{c}</span>)}</div>
            </div>
          </div>
          <p className="globe-note">Example corridors, for illustration</p>
        </PageHeader>

        {/* The corridor line starts at the first section after the hero and runs to the end of the page. */}
        <div className="page-flow">
          <Thread />
          <Problem />

        <section className="s">
          <div className="wrap">
            <div className="reveal">
              <p className="eyebrow">{HOME.what.eyebrow}</p>
              <h2>{HOME.what.title}</h2>
              <p className="lead">{HOME.what.lead}</p>
            </div>
            <div className="grid3">
              {HOME.capabilities.map((c) => (
                <article key={c.title} className="card">
                  <div className="vis"><GlassObject kind={c.scene} /></div>
                  <div className="body"><h3>{c.title}</h3><p>{c.text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <BeforeAfter />
        <Story />

        <section className="s dk">
          <div className="wrap">
            <p className="eyebrow">How it works</p>
            <h2>From first integration to settled payouts</h2>
            <Circuit chips={CIRCUIT_STEPS} label="The five steps: integrate, configure, enable, orchestrate and monitor, lighting up in turn." />
            <div className="cir-steps">{HOME.steps.map(([t, d]) => <div key={t}><b>{t}</b><span>{d}</span></div>)}</div>
          </div>
        </section>

        <TrustShield eyebrow={HOME.trust.eyebrow} title={HOME.trust.title} lead={HOME.trust.lead} />

        <CtaBand {...HOME.cta} />
        </div>
      </div>
    </Page>
  );
}
