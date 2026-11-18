"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Brand } from "@/components/PaythonicMark";
import { DemoButton } from "@/components/CtaBand";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NAV_LINKS, SITE } from "@/content/site";
import { LOGO_PLAYED_KEY } from "@/lib/logo-play";

export function Nav() {
  const pathname = usePathname();
  // The menu remembers the page it was opened on, so navigating closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const close = () => setOpenOn(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try { sessionStorage.setItem(LOGO_PLAYED_KEY, "1"); } catch { /* storage blocked: the logo just replays */ }
  }, []);

  // MN2 drop-down menu (phones and tablets): focus moves to the first link, Escape closes and returns focus to the
  // button, and the page behind stops scrolling while it is open. Tapping the dimmed page closes it (m-scrim).
  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector("a")?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpenOn(null); btnRef.current?.focus(); } };
    document.addEventListener("keydown", onKey);
    const root = document.documentElement, prev = root.style.overflow;
    root.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); root.style.overflow = prev; };
  }, [open]);

  return (
    <header className="nav" data-open={open || undefined}>
      <div className="wrap">
        <Link href="/" aria-label="Paythonic AI Lab, home"><Brand /></Link>
        <nav className="nav-links" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} aria-current={pathname === l.href ? "page" : undefined}>{l.label}</Link>
          ))}
        </nav>
        <div className="nav-cta">
          <Link className="talk" href="/contact/">Talk to us</Link>
          <DemoButton small />
          <ThemeToggle />
        </div>
        <button ref={btnRef} className="menu-btn" type="button" aria-expanded={open} aria-controls="m-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpenOn(open ? null : pathname)}>
          <i /><i /><i />
        </button>
      </div>
      {open && (
        <>
          <div className="m-scrim" onClick={close} aria-hidden="true" />
          <div className="m-menu" id="m-menu" ref={menuRef}>
            <nav aria-label="Main menu">
              <ol>
                {NAV_LINKS.map((l, i) => (
                  // A link to the page you're on doesn't change the path, so close explicitly.
                  <li key={l.href}><Link href={l.href} onClick={close} aria-current={pathname === l.href ? "page" : undefined}><small>0{i + 1}</small>{l.label}<span className="arrow" aria-hidden="true">→</span></Link></li>
                ))}
              </ol>
            </nav>
            <div className="m-cta">
              <Link className="btn" href="/contact/" onClick={close}>Talk to us</Link>
              <DemoButton />
            </div>
            <p className="m-foot">{SITE.email}</p>
          </div>
        </>
      )}
    </header>
  );
}
