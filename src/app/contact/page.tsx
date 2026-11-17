import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { InnerHead } from "@/components/InnerHead";
import { Page } from "@/components/Page";
import { CONTACT, SITE } from "@/content/site";

export const metadata: Metadata = { title: "Contact", description: CONTACT.lead };

export default function ContactPage() {
  return (
    <Page>
      <InnerHead eyebrow={CONTACT.eyebrow} title={CONTACT.title} lead={CONTACT.lead} glass="plug" />

      {/* CT1: form on the left, contact details on the right, FAQ below. */}
      <section className="s">
        <div className="wrap contact">
          <div className="panel">
            <h2>Send us a message</h2>
            <ContactForm />
          </div>
          <div className="info">
            <div><p className="spec">Email</p><b><a className="mail" href={`mailto:${SITE.email}`}>{SITE.email}</a></b></div>
            <div><p className="spec">Location</p><b>{CONTACT.location}</b></div>
            <div><p className="spec">Response time</p><b>{CONTACT.response}</b></div>
          </div>
        </div>
      </section>

      <section className="s dk">
        <div className="wrap">
          <p className="eyebrow">Frequently asked questions</p>
          <div className="faq">
            {CONTACT.faq.map(([q, a], i) => <details key={q} open={i === 0}><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>
    </Page>
  );
}
