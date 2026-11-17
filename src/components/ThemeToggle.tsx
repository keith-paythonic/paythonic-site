"use client";

import { THEME_KEY } from "@/lib/logo-play";

/** Dark is the default; this switches to light and back, remembered per browser. The icon (sun/moon morph) is driven
 *  by CSS from html[data-theme], so it needs no React state. The switch itself plays the square reveal (globals.css,
 *  "Theme switch") through the View Transitions API; without it, or with reduced motion, the theme just changes. */
export function ThemeToggle() {
  function toggle(e: React.MouseEvent<HTMLButtonElement>) {
    const html = document.documentElement;
    const next = html.dataset.theme === "light" ? "dark" : "light";
    const apply = () => {
      html.dataset.theme = next;
      try { localStorage.setItem(THEME_KEY, next); } catch { /* storage blocked: the choice lasts this visit */ }
    };
    if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) { apply(); return; }
    const r = e.currentTarget.getBoundingClientRect();
    html.style.setProperty("--tx", `${r.left + r.width / 2}px`);
    html.style.setProperty("--ty", `${r.top + r.height / 2}px`);
    // Only while switching: page navigations use their own view transition and must not get the square reveal.
    html.dataset.themeSwitch = "";
    document.startViewTransition(apply).finished.finally(() => delete html.dataset.themeSwitch);
  }

  return (
    <button className="theme-toggle" type="button" onClick={toggle} aria-label="Switch between dark and light theme">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <mask id="moon-mask"><rect width="24" height="24" fill="#fff" /><circle className="mcut" cx="17" cy="7" r="6" fill="#000" /></mask>
        <circle className="core" cx="12" cy="12" r="5.5" mask="url(#moon-mask)" />
        <g className="rays">{[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <line key={a} x1="12" y1="2" x2="12" y2="4.5" transform={`rotate(${a} 12 12)`} />)}</g>
      </svg>
    </button>
  );
}
