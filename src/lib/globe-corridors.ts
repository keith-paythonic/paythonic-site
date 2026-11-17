/**
 * The cities and corridors the sign-in globe draws (Paythonic design 4.26).
 *
 * An illustration of the BlutusCore network, not data: the sign-in page is
 * public, so it cannot read the corridor list (GET /v1/ptn/corridors needs a
 * session), and it shows no live figures by design. This module is the one
 * place the drawing's cities live; change them here.
 *
 * Labels: `side` puts a label left ('l'), right ('r') or above ('u') its
 * marker; `dy` nudges it down. Yangon sits above its marker so its label never
 * stacks into Bangkok's at short window heights.
 */
export interface GlobeCity {
  lon: number;
  lat: number;
  name: string;
  /** ISO 3166-1 alpha-2 country code, shown under the name on wide screens. */
  cc: string;
  side: 'l' | 'r' | 'u';
  dy: number;
}

/** The hub every corridor starts from. */
export const GLOBE_HUB = 'th';

export const GLOBE_CITIES: Readonly<Record<string, GlobeCity>> = {
  th: { lon: 100.50, lat: 13.75, name: 'BANGKOK', cc: 'TH', side: 'l', dy: 0 },
  mm: { lon: 96.17, lat: 16.87, name: 'YANGON', cc: 'MM', side: 'u', dy: 0 },
  kh: { lon: 104.92, lat: 11.56, name: 'PHNOM PENH', cc: 'KH', side: 'l', dy: 16 },
  vn: { lon: 106.70, lat: 10.80, name: 'HO CHI MINH CITY', cc: 'VN', side: 'r', dy: 16 },
  ph: { lon: 120.98, lat: 14.60, name: 'MANILA', cc: 'PH', side: 'r', dy: -8 },
};

/** Drawn out from the hub in this order (west to east). */
export const GLOBE_ROUTES: readonly string[] = ['mm', 'kh', 'vn', 'ph'];
