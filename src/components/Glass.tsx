import type { SceneKey } from "@/content/site";

// Glassy monochrome 3D objects (design pick I2), drawn in SVG. Colours come from --g-hi/--g-mid/--g-lo, so they follow
// the theme. The gradients are defined once in <GlassDefs/> (layout.tsx) and shared by every object on the page.

const shadow = <ellipse cx="100" cy="182" rx="62" ry="9" fill="url(#gl-shadow)" />;

const SHAPES: Record<SceneKey, React.ReactNode> = {
  route: (<>{shadow}<circle cx="100" cy="96" r="66" fill="url(#gl-sphere)" /><ellipse cx="100" cy="96" rx="92" ry="26" fill="none" stroke="url(#gl-rim)" strokeWidth="5" transform="rotate(-18 100 96)" /><path d="M50 70 Q100 40 150 78" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="2" /><circle cx="20" cy="118" r="7" fill="url(#gl-sphere)" /><circle cx="178" cy="66" r="7" fill="url(#gl-sphere)" /><ellipse cx="78" cy="62" rx="22" ry="12" fill="#fff" opacity=".35" transform="rotate(-30 78 62)" /></>),
  plug: (<>{shadow}<path d="M40 70h50v-16a14 14 0 0 1 28 0v16h42v90H40z" fill="url(#gl-face)" /><path d="M40 70h50v-16a14 14 0 0 1 28 0v16h42" fill="none" stroke="url(#gl-rim)" strokeWidth="3" /><rect x="58" y="96" width="84" height="12" rx="6" fill="#fff" opacity=".25" /><rect x="58" y="120" width="56" height="12" rx="6" fill="#fff" opacity=".18" /></>),
  radar: (<>{shadow}<ellipse cx="100" cy="112" rx="80" ry="44" fill="url(#gl-face)" /><ellipse cx="100" cy="104" rx="80" ry="44" fill="url(#gl-sphere)" /><ellipse cx="100" cy="104" rx="56" ry="30" fill="none" stroke="#fff" strokeOpacity=".45" strokeWidth="2" /><ellipse cx="100" cy="104" rx="30" ry="16" fill="none" stroke="#fff" strokeOpacity=".45" strokeWidth="2" /><path d="M100 104 L176 92 A80 44 0 0 0 150 70 Z" fill="#fff" opacity=".35" /><circle cx="138" cy="92" r="6" fill="#fff" /></>),
  chain: (<>{shadow}{[0, 1, 2].map((i) => { const y = 140 - i * 30; return (<g key={i}><path d={`M42 ${y}v-14a58 18 0 0 0 116 0v14a58 18 0 0 1-116 0z`} fill="url(#gl-side)" /><ellipse cx="100" cy={y - 14} rx="58" ry="18" fill="url(#gl-face)" /><ellipse cx="100" cy={y - 14} rx="58" ry="18" fill="none" stroke="url(#gl-rim)" strokeWidth="2" /></g>); })}<text x="100" y="72" textAnchor="middle" fontSize="18" fontWeight="700" fill="#fff" opacity=".7">$</text></>),
  ledger: (<>{shadow}{[0, 1, 2].map((i) => { const y = 140 - i * 34; return (<g key={i}><path d={`M100 ${y} L170 ${y - 26} L100 ${y - 52} L30 ${y - 26}Z`} fill="url(#gl-face)" /><path d={`M30 ${y - 26}v12l70 26v-12zM100 ${y}v12l70-26v-12z`} fill="url(#gl-side)" /><path d={`M100 ${y} L170 ${y - 26} L100 ${y - 52} L30 ${y - 26}Z`} fill="none" stroke="url(#gl-rim)" strokeWidth="2" /></g>); })}</>),
  shield: (<>{shadow}<path d="M100 18 L164 42 V96 C164 136 136 160 100 174 C64 160 36 136 36 96 V42 Z" fill="url(#gl-face)" /><path d="M100 18 L164 42 V96 C164 136 136 160 100 174" fill="none" stroke="url(#gl-rim)" strokeWidth="4" /><path d="M72 96 l20 20 l38 -40" fill="none" stroke="#fff" strokeOpacity=".8" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" /></>),
};

/** Decorative: the heading beside it carries the meaning. */
export function GlassObject({ kind, className = "" }: { kind: SceneKey; className?: string }) {
  return <svg className={`glass ${className}`} viewBox="0 0 200 200" aria-hidden="true" focusable="false">{SHAPES[kind]}</svg>;
}

/** Shared gradients for every GlassObject. Rendered once, zero-size but not display:none (hidden defs break gradients in some browsers). */
export function GlassDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="gl-sphere" cx="35%" cy="30%" r="75%"><stop offset="0" stopColor="var(--g-hi)" /><stop offset=".45" stopColor="var(--g-mid)" /><stop offset="1" stopColor="var(--g-lo)" /></radialGradient>
        <linearGradient id="gl-face" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="var(--g-hi)" /><stop offset=".55" stopColor="var(--g-mid)" /><stop offset="1" stopColor="var(--g-lo)" /></linearGradient>
        <linearGradient id="gl-side" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--g-mid)" /><stop offset="1" stopColor="var(--g-lo)" /></linearGradient>
        <linearGradient id="gl-rim" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".95" /><stop offset=".5" stopColor="#fff" stopOpacity=".1" /><stop offset="1" stopColor="#fff" stopOpacity=".5" /></linearGradient>
        <radialGradient id="gl-shadow"><stop offset="0" stopColor="#000" stopOpacity=".35" /><stop offset="1" stopColor="#000" stopOpacity="0" /></radialGradient>
      </defs>
    </svg>
  );
}
