/** sessionStorage key for "the nav logo has drawn in this visit". The inline script in layout.tsx reads it before
 *  first paint and sets html[data-logo-play] only when it is missing; Nav.tsx sets it after mount. Lives outside
 *  Nav.tsx because a server component importing a value from a "use client" file gets a reference, not the value. */
export const LOGO_PLAYED_KEY = "paythonic-logo-played";
