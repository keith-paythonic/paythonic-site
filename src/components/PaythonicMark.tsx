/** The Paythonic mark: the open frame (text colour) and the P (brand blue).
 *  Path order matters to the living-logo CSS: frame first, P last; the optional cut sits between them.
 *  `cut` draws the frame's gap (x=1005, y=870..1117) so the success state can close it. */
export function PaythonicMark({ size = 28, cut = false }: { size?: number; cut?: boolean }) {
  return (
    <svg className="mark" width={(size * 1093) / 1428} height={size} viewBox="179 -44 1093 1428" aria-hidden="true" focusable="false">
      <path d="M1005 1117H783V1340H1228V0H223V1117H447V223H1005V870" fill="none" stroke="currentColor" strokeWidth="72" />
      {cut && <path className="cut" d="M1005 870V1117" fill="none" stroke="currentColor" strokeWidth="72" />}
      <path d="M614 1228V893H893A280 280 0 0 0 893 333H540" fill="none" stroke="var(--brand)" strokeWidth="118" />
    </svg>
  );
}

/** The living logo: draws in on the first visit, then the P lifts and settles every ~10 s (globals.css). */
export function LivingMark({ size = 26 }: { size?: number }) {
  return <span className="living-logo"><PaythonicMark size={size} /></span>;
}

export function Brand({ size = 26 }: { size?: number }) {
  return (
    <span className="brand">
      <LivingMark size={size} />
      <span className="wordmark"><b>Paythonic</b> <i>AI Lab</i></span>
    </span>
  );
}
