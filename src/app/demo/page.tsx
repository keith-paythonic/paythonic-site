import type { Metadata } from "next";
import Link from "next/link";
import { LivingLogo } from "@/components/LivingLogo";
import { Page } from "@/components/Page";

export const metadata: Metadata = { title: "Request a demo", description: "Demo requests open soon. Contact Paythonic AI Lab in the meantime." };

export default function DemoPage() {
  return (
    <Page>
      <section className="state-page">
        <div>
          <LivingLogo state="idle" />
          <p className="eyebrow">Coming soon</p>
          <h1>Demo requests open soon</h1>
          <p className="lead">Until then, tell us about your corridors and partners and we&apos;ll arrange a walkthrough.</p>
          <div className="ctas">
            <Link className="btn" href="/contact/">Contact us</Link>
            <Link className="btn secondary" href="/">Back to home</Link>
          </div>
        </div>
      </section>
    </Page>
  );
}
