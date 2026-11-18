"use client";

import { useEffect, useRef } from "react";
import { mountCorridorGlobe, type GlobeColours } from "@/lib/corridor-globe";

const COMPACT_QUERY = "(max-width: 1023px)";

/** "#RRGGBB" → "r,g,b" for the engine's rgba() strings. */
function channels(hex: string, fallback: string): string {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return fallback;
  const n = parseInt(m[1], 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

/** The globe's colours from the theme tokens: light lines on the midnight hero, ink and blue on the light one. */
function themeColours(): GlobeColours {
  const css = getComputedStyle(document.documentElement);
  const read = (name: string) => css.getPropertyValue(name).trim();
  const light = document.documentElement.dataset.theme === "light";
  return {
    tone: read("--deep-brand") || "#8db8ff",
    fg: channels(read("--deep-text"), "238,243,255"),
    dot: channels(read("--deep-muted"), "164,179,214"),
    dotAlpha: light ? 0.55 : 0.6,
    pulse: light ? read("--deep-brand") || "#1754cf" : "#ffffff",
    halo: read("--deep") || "#030713",
  };
}

/** The corridor globe (Bangkok hub to Yangon, Phnom Penh, Ho Chi Minh City,
 *  Manila). Decorative: an illustration of the network, not live data. Redraws when the theme or layout changes. */
export function CorridorGlobe() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia(COMPACT_QUERY);
    let globe: { stop: () => void } | null = null;
    const mount = () => {
      globe?.stop();
      globe = mountCorridorGlobe(el, { colours: themeColours(), compact: compact.matches, reduced: reduced.matches });
    };
    mount();
    const themeWatch = new MutationObserver(mount);
    themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    compact.addEventListener("change", mount);
    return () => { themeWatch.disconnect(); compact.removeEventListener("change", mount); globe?.stop(); };
  }, []);

  return <div ref={host} className="globe" aria-hidden="true" />;
}
