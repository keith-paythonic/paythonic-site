import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { ViewTransition } from "react";
import { Nav } from "@/components/Nav";
import { LOGO_PLAYED_KEY } from "@/lib/logo-play";
import { Footer } from "@/components/Footer";
import { SITE } from "@/content/site";
import "./globals.css";

// next/font downloads the fonts at build time and serves them from this site: no request to Google at runtime.
const plexSans = IBM_Plex_Sans({ variable: "--font-plex-sans", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "500"] });

const LOGO_SCRIPT = `try{if(!sessionStorage.getItem(${JSON.stringify(LOGO_PLAYED_KEY)}))document.documentElement.setAttribute("data-logo-play","")}catch(e){}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} | BlutusCore AI-Native Remittance Infrastructure`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  openGraph: { title: SITE.name, description: SITE.ogDescription, type: "website", url: SITE.url, siteName: SITE.name },
  twitter: { card: "summary_large_image", site: "@paythonic", title: `${SITE.name} | BlutusCore`, description: SITE.ogDescription },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Plays the nav logo's draw-in once per visit, decided before first paint so the logo never flashes.
            If the host adds a CSP, allow this script by its hash (script-src 'sha256-...'); don't add 'unsafe-inline'. */}
        <script dangerouslySetInnerHTML={{ __html: LOGO_SCRIPT }} />
      </head>
      <body>
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
