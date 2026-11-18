# paythonic.ai

The Paythonic AI Lab marketing site: Next.js 16 static export. Design locked in four design-options rounds (2026-11-17).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in out/
npm run lint && npm run typecheck
```

## Deploying `out/`

- Any static host works (S3 + CloudFront, Nginx, Vercel). Pages live at `/<page>/index.html` (`trailingSlash: true`); make the host serve `index.html` for directory paths and `404.html` for misses.
- Security headers (CSP, HSTS, X-Frame-Options, Referrer-Policy) must be set by the host. A CSP needs the SHA-256 hash of the inline logo script in `src/app/layout.tsx`; don't use `'unsafe-inline'`.
- `npm run build` also runs `scripts/fix-export-segments.mjs`, a workaround for a Next 16.4 export bug on Windows (see the script's header). It does nothing on Linux/macOS builds.

## Where things are

- Copy: `src/content/site.ts` (from the live site; keep claims factual, sample data labelled).
- Design system: `src/app/globals.css`.
- Hero globe: `src/lib/corridor-globe.ts` (canvas globe with the example corridors).
- Contact form: opens the visitor's email app (mailto). A server endpoint comes later, with any keys kept server-side.
