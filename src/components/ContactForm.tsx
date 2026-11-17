"use client";

import { useState } from "react";
import { LivingLogo } from "@/components/LivingLogo";
import { SITE } from "@/content/site";

/** For now the form only opens the visitor's email app with the message filled in (Keith, 2026-11-17): no server,
 *  no third-party form service, nothing stored. A server endpoint comes later; it must keep any keys server-side. */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    const subject = `Website enquiry from ${get("company")}`;
    const body = [`Name: ${get("name")}`, `Email: ${get("email")}`, `Company: ${get("company")}`, `Role: ${get("role") || "-"}`, "", get("message")].join("\n");
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="sent" role="status">
        <LivingLogo state="success" size={72} />
        <h3>Your email app should have opened</h3>
        <p className="muted">Send the message from there and we&apos;ll reply within 1-2 business days. Nothing opened? Write to <a className="link" href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
        <button className="btn secondary sm" type="button" onClick={() => setSent(false)}>Write another message</button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="two">
        <label>Name *<input name="name" required autoComplete="name" placeholder="Your name" /></label>
        <label>Work email *<input name="email" type="email" required autoComplete="email" placeholder="you@company.com" /></label>
      </div>
      <div className="two">
        <label>Company *<input name="company" required autoComplete="organization" placeholder="Company" /></label>
        <label>Role<input name="role" autoComplete="organization-title" placeholder="Your role" /></label>
      </div>
      <label>Message *<textarea name="message" required rows={5} placeholder="Tell us about your corridors, partners or timeline" /></label>
      <button className="btn" type="submit">Send message</button>
      <small>Opens your email app with this message to {SITE.email}. Nothing is stored on this site.</small>
    </form>
  );
}
