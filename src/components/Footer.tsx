import Link from "next/link";
import { Brand } from "@/components/PaythonicMark";
import { CONTACT, SITE } from "@/content/site";

export function Footer() {
  return (
    <footer className="footer s dk">
      <div className="wrap">
        <div className="cols">
          <div>
            <Brand />
            <p>{SITE.ogDescription}</p>
          </div>
          <div>
            <h4>PRODUCT</h4>
            <ul><li><Link href="/blutuscore/">BlutusCore</Link></li><li><Link href="/solutions/">Solutions</Link></li><li><Link href="/compliance/">Compliance</Link></li></ul>
          </div>
          <div>
            <h4>COMPANY</h4>
            <ul><li><Link href="/company/">About us</Link></li><li><Link href="/contact/">Contact</Link></li></ul>
          </div>
          <div>
            <h4>CONTACT</h4>
            <ul><li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li><li>{CONTACT.location}</li></ul>
          </div>
        </div>
        <div className="legal">
          <span>{SITE.legal}</span>
          <span>© {SITE.copyrightYear} {SITE.name}</span>
        </div>
      </div>
    </footer>
  );
}
