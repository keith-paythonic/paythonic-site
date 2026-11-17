"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Brand } from "@/components/PaythonicMark";
import { DemoButton } from "@/components/CtaBand";
import { NAV_LINKS } from "@/content/site";
import { LOGO_PLAYED_KEY } from "@/lib/logo-play";


export function Nav() {
  const pathname = usePathname();
  // The menu remembers the page it was opened on, so navigating closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  useEffect(() => {
    try { sessionStorage.setItem(LOGO_PLAYED_KEY, "1"); } catch { /* storage blocked: the logo just replays */ }
  }, []);

  return (
    <header className="nav" data-open={open || undefined}>
      <div className="wrap">
        <Link href="/" aria-label="Paythonic AI Lab, home"><Brand animated /></Link>
        <nav className="nav-links" id="nav-links" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} aria-current={pathname === l.href ? "page" : undefined}>{l.label}</Link>
          ))}
        </nav>
        <div className="nav-cta">
          <Link className="talk" href="/contact/">Talk to us</Link>
          <DemoButton small />
        </div>
        <button className="menu-btn" type="button" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpenOn(open ? null : pathname)}>
          {open ? "Close" : "Menu"}
        </button>
      </div>
    </header>
  );
}
