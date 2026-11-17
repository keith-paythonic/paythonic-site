import Link from "next/link";
import { CorridorGlobe } from "@/components/CorridorGlobe";
import { CtaBand } from "@/components/CtaBand";
import { AuditTrail, CheckIcon, Pipeline } from "@/components/Diagrams";
import { SceneCard } from "@/components/LiveScene";
import { Page, PageHeader } from "@/components/Page";
import { HOME, SITE } from "@/content/site";

export default function Home() {
  return (
    <Page>
      <PageHeader className="hero">
        <CorridorGlobe />
        <div className="wrap">
          <div className="hero-copy">
            <span className="pill">{SITE.status}</span>
            <h1>{HOME.title}</h1>
            <p className="lead"><b>{SITE.name}</b> {HOME.lead}</p>
            <div className="ctas">
              <Link className="btn" href="/blutuscore/">Explore BlutusCore</Link>
              <Link className="btn secondary" href="/contact/">Talk to us</Link>
            </div>
            <div className="chips">
              {HOME.chips.map((c) => <span key={c}><CheckIcon />{c}</span>)}
            </div>
          </div>
        </div>
        <p className="globe-note">Example corridors, for illustration</p>
      </PageHeader>

      <section className="band">
        <div className="wrap">
          <div className="reveal">
            <p className="eyebrow">{HOME.what.eyebrow}</p>
            <h2>{HOME.what.title}</h2>
            <p className="lead">{HOME.what.lead}</p>
          </div>
          <div className="grid3 reveal">
            {HOME.capabilities.map((c) => <SceneCard key={c.title} {...c} />)}
          </div>
          <p className="caption">Product scenes show sample data.</p>
        </div>
      </section>

      <section className="band alt">
        <div className="wrap">
          <div className="reveal">
            <p className="eyebrow">How it works</p>
            <h2>From first integration to settled payouts</h2>
          </div>
          <Pipeline steps={HOME.steps} />
        </div>
      </section>

      <section className="band">
        <div className="wrap split">
          <div className="reveal">
            <p className="eyebrow">{HOME.trust.eyebrow}</p>
            <h2>{HOME.trust.title}</h2>
            <p className="lead">{HOME.trust.lead}</p>
            <Link className="link" href="/compliance/">How we approach compliance →</Link>
          </div>
          <div className="reveal"><AuditTrail /></div>
        </div>
      </section>

      <section className="band alt">
        <div className="wrap">
          <div className="reveal">
            <p className="eyebrow">Use cases</p>
            <h2>Built for regulated institutions</h2>
          </div>
          <div className="grid3 reveal">
            {HOME.uses.map(([t, d], i) => (
              <article key={t} className="use"><span className="n mono">0{i + 1}</span><h3>{t}</h3><p>{d}</p></article>
            ))}
          </div>
          <p className="more"><Link className="link" href="/solutions/">See all solutions →</Link></p>
        </div>
      </section>

      <CtaBand {...HOME.cta} />
    </Page>
  );
}
