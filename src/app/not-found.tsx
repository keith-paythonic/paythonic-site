import Link from "next/link";
import { LivingLogo } from "@/components/LivingLogo";

export default function NotFound() {
  return (
    <section className="state-page">
      <div>
        <LivingLogo state="idle" />
        <p className="eyebrow">404</p>
        <h1>This page doesn&apos;t exist</h1>
        <p className="lead">The link may be old, or the address mistyped.</p>
        <div className="ctas">
          <Link className="btn" href="/">Back to home</Link>
          <Link className="btn secondary" href="/contact/">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
