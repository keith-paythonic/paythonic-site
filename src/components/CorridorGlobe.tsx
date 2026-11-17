"use client";

import { useEffect, useRef } from "react";
import { mountCorridorGlobe, type GlobeColours } from "@/lib/corridor-globe";

const COMPACT_QUERY = "(max-width: 1023px)";

/** The portal sign-in globe's colours, recast for the dark brushed hero (C4 deep tokens). */
const HERO_COLOURS: GlobeColours = {
  tone: "#83beff",
  fg: "238,240,243",
  dot: "181,190,206",
  dotAlpha: 0.75,
  pulse: "#ffffff",
  halo: "#0f2758",
};

/** The same globe and corridors as the portal logins (Bangkok hub to Yangon, Phnom Penh, Ho Chi Minh City,
 *  Manila). Decorative: an illustration of the network, not live data. */
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
      globe = mountCorridorGlobe(el, { colours: HERO_COLOURS, compact: compact.matches, reduced: reduced.matches });
    };
    mount();
    compact.addEventListener("change", mount);
    return () => { compact.removeEventListener("change", mount); globe?.stop(); };
  }, []);

  return <div ref={host} className="globe" aria-hidden="true" />;
}
