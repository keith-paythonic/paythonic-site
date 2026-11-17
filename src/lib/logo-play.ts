// Keys read by the inline boot script in layout.tsx before first paint (so neither the theme nor the logo flashes).
// They live outside the client components because a server component importing a value from a "use client" file
// gets a reference, not the value.

/** sessionStorage: "the nav logo has drawn in this visit". Missing → html[data-logo-play] (draw-in plays). */
export const LOGO_PLAYED_KEY = "paythonic-logo-played";
/** localStorage: the visitor's theme, "dark" (default) or "light". Set by ThemeToggle. */
export const THEME_KEY = "paythonic-theme";
