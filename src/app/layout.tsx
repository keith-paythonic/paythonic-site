import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import { ViewTransition } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { GlassDefs } from "@/components/Glass";
import { LOGO_PLAYED_KEY, THEME_KEY } from "@/lib/logo-play";
import { SITE } from "@/content/site";
import "./globals.css";

// next/font downloads the fonts at build time and serves them from this site: no request to Google at runtime.
const plexSans = IBM_Plex_Sans({ variable: "--font-plex-sans", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "500"] });
// Italic serif for the second half of headlines (design pick F3).
const plexSerif = IBM_Plex_Serif({ variable: "--font-plex-serif", subsets: ["latin"], weight: ["400"], style: ["italic"] });

// Runs before first paint: applies the remembered theme (dark is the default in the markup) and decides whether the
// nav logo draws in (once per visit). Static string, no user input.
const BOOT_SCRIPT = `(function(d){try{var t=localStorage.getItem(${JSON.stringify(THEME_KEY)});if(t==="light"||t==="dark")d.setAttribute("data-theme",t)}catch(e){}try{if(!sessionStorage.getItem(${JSON.stringify(LOGO_PLAYED_KEY)}))d.setAttribute("data-logo-play","")}catch(e){}})(document.documentElement)`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} | BlutusCore AI-Native Remittance Infrastructure`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  // No og:url here: each page would claim to be the homepage when shared (review finding 2).
  openGraph: { title: SITE.name, description: SITE.ogDescription, type: "website", siteName: SITE.name },
  twitter: { card: "summary_large_image", site: "@paythonic", title: `${SITE.name} | BlutusCore`, description: SITE.ogDescription },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="dark" className={`${plexSans.variable} ${plexMono.variable} ${plexSerif.variable}`} suppressHydrationWarning>
      <head>
        {/* If the host adds a CSP, allow this script by its hash (script-src 'sha256-...'); don't add 'unsafe-inline'. */}
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
      <body>
        <GlassDefs />
        <a className="skip" href="#main">Skip to content</a>
        {/* The nav keeps its identity across pages, so the shared-morph transition leaves it in place. */}
        <ViewTransition name="site-nav">
          <Nav />
        </ViewTransition>
        {/* Page enter/exit animations live in each page (components/Page.tsx): layouts persist, so they never "enter". */}
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
