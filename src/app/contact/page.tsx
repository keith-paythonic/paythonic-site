import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Page, PageHeader } from "@/components/Page";
import { CONTACT, SITE } from "@/content/site";

export const metadata: Metadata = { title: "Contact", description: CONTACT.lead };

export default function ContactPage() {
  return (
    <Page>
      <PageHeader className="page-head">
        <div className="wrap">
          <p className="eyebrow">{CONTACT.eyebrow}</p>
          <h1>{CONTACT.title}</h1>
          <p className="lead">{CONTACT.lead}</p>
        </div>
      </PageHeader>

      <section className="band">
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

      <section className="band alt">
        <div className="wrap faq">
          <p className="eyebrow">Frequently asked questions</p>
          {CONTACT.faq.map(([q, a], i) => (
            <details key={q} open={i === 0}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
    </Page>
  );
}
