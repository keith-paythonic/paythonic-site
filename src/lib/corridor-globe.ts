/**
 * The hero globe's drawing engine (Paythonic design 4.26, 6.4), on a 2D
 * canvas. Ported from the approved design files (paythonic design
 * r4/globe.js, the "Open" globe in the "Horizon" view).
 *
 * Intro, once per mount: the whole Earth turns, then the view flies in over
 * South-East Asia, tilting as it comes down so the Earth's curved edge shows
 * near the top, and the corridors draw out from the hub. Each corridor rises
 * off the ground and lands again (the longer, the higher) over a faint dotted
 * ground track, so it curves with the Earth. Afterwards a pulse runs along each
 * corridor and the pointer pans the view a little. Reduced motion: the final
 * frame, still. Drawing stops while the globe is off screen or the tab hidden.
 */
import { LAND, LAND_SEA } from '@/lib/globe-land';
import { GLOBE_CITIES, GLOBE_HUB, GLOBE_ROUTES } from '@/lib/globe-corridors';

export interface GlobeColours {
  /** Corridors and city markers (the brand tone). */
  tone: string;
  /** Lines and labels, as "r,g,b". */
  fg: string;
  /** Land dots, as "r,g,b", and their strength. */
  dot: string;
  dotAlpha: number;
  /** The pulse that runs along each corridor. */
  pulse: string;
  /** The ground colour, filled as a box behind each label so no dot or line shows through it. */
  halo: string;
}

export interface GlobeOptions {
  colours: GlobeColours;
  /** Phone layout: a shorter strip, tighter view, city names without codes. */
  compact: boolean;
  reduced: boolean;
}

type Vec3 = [number, number, number];
type Pt = [number, number, number];

const D2R = Math.PI / 180;
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const easeOut = (t: number) => 1 - Math.pow(1 - clamp01(t), 3);
const easeInOut = (t: number) => {
  t = clamp01(t);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};
const unit = (lon: number, lat: number): Vec3 => [
  Math.cos(lat * D2R) * Math.cos(lon * D2R),
  Math.cos(lat * D2R) * Math.sin(lon * D2R),
  Math.sin(lat * D2R),
];
const toLL = (v: Vec3): [number, number] => [
  Math.atan2(v[1], v[0]) / D2R,
  Math.asin(Math.max(-1, Math.min(1, v[2]))) / D2R,
];
function slerp(a: Vec3, b: Vec3, t: number): Vec3 {
  const d = Math.acos(Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2])));
  const s = Math.sin(d);
  if (s < 1e-6) return a;
  const p = Math.sin((1 - t) * d) / s;
  const q = Math.sin(t * d) / s;
  return [a[0] * p + b[0] * q, a[1] * p + b[1] * q, a[2] * p + b[2] * q];
}

/** Each corridor as 81 points [lon, lat, lift]: a great circle raised at its middle. */
export function corridorPaths(): Record<string, Pt[]> {
  const hub = GLOBE_CITIES[GLOBE_HUB];
  const out: Record<string, Pt[]> = {};
  for (const k of GLOBE_ROUTES) {
    const A = unit(hub.lon, hub.lat);
    const B = unit(GLOBE_CITIES[k].lon, GLOBE_CITIES[k].lat);
    const span = Math.acos(A[0] * B[0] + A[1] * B[1] + A[2] * B[2]) / D2R;
    // Peak height as a share of the Earth's radius: longer corridors rise higher.
    const lift = 0.0075 * Math.sqrt(span);
    out[k] = Array.from({ length: 81 }, (_, i) => {
      const t = i / 80;
      const ll = toLL(slerp(A, B, t));
      return [ll[0], ll[1], Math.sin(Math.PI * t) * lift] as Pt;
    });
  }
  return out;
}

/** City label tracking (px), and the box's room round the text (px). */
const LABEL_TRACKING = 1.4;
const LABEL_PAD_X = 4;
const LABEL_PAD_Y = 2;

export function mountCorridorGlobe(host: HTMLElement, opts: GlobeOptions): { stop: () => void } {
  const cv = document.createElement('canvas');
  cv.setAttribute('aria-hidden', 'true');
  host.prepend(cv);
  const ctx = cv.getContext('2d');
  if (!ctx) return { stop: () => cv.remove() };

  const { colours: C, compact, reduced } = opts;
  // Where the view settles: centred far south of the region, so the region is
  // seen at an angle with the horizon above it.
  const end = { lon: compact ? 108.4 : 108.8, lat: compact ? -40 : -38.5 };
  const start = { lon: 28, lat: 18 };
  let W = 0, H = 0, dpr = 1, raf = 0, running = false, visible = true;
  const t0 = performance.now();
  const pan = { x: 0, y: 0 };
  let panTo = { x: 0, y: 0 };
  const T_TURN = 900, T_ZOOM = 1500, T_ARCS = T_TURN + T_ZOOM - 200, DONE = T_ARCS + 1500;
  const routes = corridorPaths();

  function size() {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    W = Math.max(1, host.clientWidth);
    H = Math.max(1, host.clientHeight);
    cv.width = Math.round(W * dpr);
    cv.height = Math.round(H * dpr);
    cv.style.width = `${W}px`;
    cv.style.height = `${H}px`;
  }
  function proj(lon: number, lat: number, c: { lon: number; lat: number }, R: number, cx: number, cy: number, lift = 0): Pt {
    const dl = (lon - c.lon) * D2R, la = lat * D2R, l0 = c.lat * D2R;
    const cl = Math.cos(la), cd = Math.cos(dl);
    const x = cl * Math.sin(dl);
    const y = Math.cos(l0) * Math.sin(la) - Math.sin(l0) * cl * cd;
    const z = Math.sin(l0) * Math.sin(la) + Math.cos(l0) * cl * cd;
    const k = R * (1 + lift);
    return [cx + k * x, cy - k * y, z];
  }
  function line(xy: (i: number) => Pt, from: number, to: number) {
    ctx!.beginPath();
    for (let i = from; i <= to; i++) {
      const p = xy(i);
      if (i === from) ctx!.moveTo(p[0], p[1]); else ctx!.lineTo(p[0], p[1]);
    }
    ctx!.stroke();
  }

  function frame(now: number) {
    const g = ctx!;
    const el = reduced ? DONE + 3000 : now - t0;
    const turn = easeOut(el / T_TURN), zoom = easeInOut((el - T_TURN * 0.7) / T_ZOOM);
    pan.x += (panTo.x - pan.x) * 0.05;
    pan.y += (panTo.y - pan.y) * 0.05;
    const R0 = Math.min(W, H) * 0.4, R1 = H * (compact ? 2.0 : 2.1);
    const R = R0 + (R1 - R0) * zoom;
    const mid = { lon: start.lon + (60 - start.lon) * turn, lat: start.lat };
    const c = { lon: mid.lon + (end.lon - mid.lon) * zoom + pan.x * zoom, lat: mid.lat + (end.lat - mid.lat) * zoom + pan.y * zoom };
    const cy0 = H / 2 + (compact ? 6 : 10);
    // Once close, the globe's top edge sits near the top of the panel.
    const cx = W / 2, cy = cy0 + (H * (compact ? 0.17 : 0.13) + R - cy0) * zoom;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, W, H);

    // The ring of tick marks, seen while the whole Earth is in view, then flown past.
    const ringA = 1 - zoom;
    if (ringA > 0.02) {
      const ring = R * 1.14, rp = easeOut(el / 1000), rot = (now / 1000) * 0.03;
      g.lineWidth = 1;
      g.strokeStyle = `rgba(${C.fg},${0.16 * ringA})`;
      g.beginPath(); g.arc(cx, cy, ring, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * rp); g.stroke();
      for (let i = 0; i < 72 * rp; i++) {
        const a = rot + i * 5 * D2R, long = i % 6 === 0, r1 = ring + 3, r2 = ring + (long ? 11 : 6);
        g.strokeStyle = `rgba(${C.fg},${(long ? 0.42 : 0.18) * ringA})`;
        g.beginPath(); g.moveTo(cx + r1 * Math.cos(a), cy + r1 * Math.sin(a)); g.lineTo(cx + r2 * Math.cos(a), cy + r2 * Math.sin(a)); g.stroke();
      }
    }
    g.strokeStyle = `rgba(${C.fg},.2)`; g.lineWidth = 1;
    g.beginPath(); g.arc(cx, cy, R, 0, Math.PI * 2); g.stroke();
    // Graticule: every 20 degrees from afar, every 5 once close.
    const gs = zoom > 0.5 ? 5 : 20;
    g.strokeStyle = `rgba(${C.fg},.065)`;
    for (let lon = -180; lon < 180; lon += gs) {
      g.beginPath(); let pen = false;
      for (let lat = -80; lat <= 80; lat += 2) {
        const p = proj(lon, lat, c, R, cx, cy);
        if (p[2] > 0) { if (pen) g.lineTo(p[0], p[1]); else g.moveTo(p[0], p[1]); pen = true; } else pen = false;
      }
      g.stroke();
    }
    for (let lat = -80; lat <= 80; lat += gs) {
      g.beginPath(); let pen = false;
      for (let lon = -180; lon <= 180; lon += 2) {
        const p = proj(lon, lat, c, R, cx, cy);
        if (p[2] > 0) { if (pen) g.lineTo(p[0], p[1]); else g.moveTo(p[0], p[1]); pen = true; } else pen = false;
      }
      g.stroke();
    }
    // Land: the whole-Earth dots hand over to finer regional dots as the view flies in.
    const la = easeOut((el - 100) / 900);
    const coarseA = la * (1 - clamp01(zoom * 1.6)), fineA = clamp01(zoom * 1.4 - 0.25);
    if (coarseA > 0.01) {
      const ds = Math.max(1.1, R / 160);
      for (let i = 0; i < LAND.length; i += 2) {
        const p = proj(LAND[i] / 10, LAND[i + 1] / 10, c, R, cx, cy);
        if (p[2] <= 0.02 || p[0] < -4 || p[0] > W + 4 || p[1] < -4 || p[1] > H + 4) continue;
        g.fillStyle = `rgba(${C.dot},${((0.18 + 0.62 * p[2]) * coarseA * C.dotAlpha).toFixed(3)})`;
        g.fillRect(p[0] - ds / 2, p[1] - ds / 2, ds, ds);
      }
    }
    if (fineA > 0.01) {
      const ds = compact ? 1.6 : 1.9;
      for (let i = 0; i < LAND_SEA.length; i += 2) {
        const lat = LAND_SEA[i + 1] / 100, p = proj(LAND_SEA[i] / 100, lat, c, R, cx, cy);
        if (p[2] <= 0 || p[0] < -4 || p[0] > W + 4 || p[1] < -4 || p[1] > H + 4) continue;
        // Fade north toward the horizon, so the regional dots never end in a hard edge.
        const f = clamp01((31 - lat) / 10) * clamp01(p[2] * 3);
        if (f <= 0.02) continue;
        g.fillStyle = `rgba(${C.dot},${(0.5 * fineA * C.dotAlpha * f).toFixed(3)})`;
        g.fillRect(p[0] - ds / 2, p[1] - ds / 2, ds, ds);
      }
    }
    // Corridors, drawn out from the hub one after another; then pulses run along them.
    GLOBE_ROUTES.forEach((k, ri) => {
      const pts = routes[k];
      const dp = easeOut((el - T_ARCS - ri * 220) / 700);
      if (dp <= 0) return;
      const raised = (i: number) => proj(pts[i][0], pts[i][1], c, R, cx, cy, pts[i][2]);
      const ground = (i: number) => proj(pts[i][0], pts[i][1], c, R, cx, cy);
      const upto = Math.max(1, Math.round(dp * (pts.length - 1)));
      g.lineJoin = 'round'; g.lineCap = 'round';
      g.save(); g.setLineDash([2, 4]); g.lineCap = 'butt'; g.strokeStyle = `rgba(${C.fg},.32)`; g.lineWidth = 1;
      line(ground, 0, upto); g.restore();
      g.strokeStyle = C.tone; g.lineWidth = compact ? 2 : 2.4;
      line(raised, 0, upto);
      if (!reduced && el > DONE) {
        const ph = ((now / 2400) + ri * 0.37) % 1, i0 = Math.floor(ph * (pts.length - 10));
        g.strokeStyle = C.pulse; g.lineWidth = compact ? 2.4 : 3;
        line(raised, i0, i0 + 9);
      }
    });
    // Cities.
    const fs = compact ? 10.5 : 11.5;
    g.font = `700 ${fs}px "Barlow Semi Condensed", "Barlow", sans-serif`;
    const spaced = 'letterSpacing' in g;
    if (spaced) (g as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${LABEL_TRACKING}px`;
    g.textBaseline = 'middle';
    /**
     * A box in the ground colour behind one label line, like a printed label on
     * the instrument. It replaced a 4px text outline, which cut a letter-shaped
     * hole in the dots around each name (most visible on Yangon, over dense
     * land): the team's review, 14 Oct 2026.
     */
    const labelBox = (text: string, x: number, y: number) => {
      const w = g.measureText(text).width + (spaced ? text.length * LABEL_TRACKING : 0);
      const x0 = g.textAlign === 'center' ? x - w / 2 : g.textAlign === 'right' ? x - w : x;
      g.fillStyle = C.halo;
      g.fillRect(x0 - LABEL_PAD_X, y - fs / 2 - LABEL_PAD_Y, w + LABEL_PAD_X * 2, fs + LABEL_PAD_Y * 2);
    };
    Object.entries(GLOBE_CITIES).forEach(([k, cty], i) => {
      const hub = k === GLOBE_HUB;
      const mp = easeOut((el - (hub ? T_ARCS - 250 : T_ARCS + 250 + i * 160)) / 400);
      if (mp <= 0) return;
      const p = proj(cty.lon, cty.lat, c, R, cx, cy);
      if (p[2] <= 0) return;
      const s = (hub ? 6 : 4) * (0.4 + 0.6 * mp);
      g.fillStyle = C.tone; g.fillRect(p[0] - s, p[1] - s, s * 2, s * 2);
      if (hub) { g.strokeStyle = C.tone; g.lineWidth = 1.2; const o = s + 6; g.strokeRect(p[0] - o, p[1] - o, o * 2, o * 2); }
      g.globalAlpha = mp;
      const up = cty.side === 'u', left = cty.side === 'l', cc = !compact;   // phones show city names only
      const tx = up ? p[0] : p[0] + (left ? -(hub ? 20 : 12) : 12);
      const ty = up ? p[1] - 13 - (cc ? fs + 2 : 0) : p[1] + cty.dy;
      g.textAlign = up ? 'center' : left ? 'right' : 'left';
      labelBox(cty.name, tx, ty); if (cc) labelBox(cty.cc, tx, ty + fs + 2);
      g.fillStyle = `rgba(${C.fg},.92)`; g.fillText(cty.name, tx, ty);
      // .7 keeps the country code at 5:1 on the light ground.
      if (cc) { g.fillStyle = `rgba(${C.fg},.7)`; g.fillText(cty.cc, tx, ty + fs + 2); }
      g.globalAlpha = 1;
    });
    // The scale bar, once close (wide screens only).
    const ha = easeOut((el - T_TURN - T_ZOOM * 0.6) / 600);
    if (ha > 0 && !compact) {
      const px = R * (500 / 6371), x0 = 18, y0 = H - 22;
      g.strokeStyle = `rgba(${C.fg},${0.6 * ha})`; g.lineWidth = 1.5;
      g.beginPath(); g.moveTo(x0, y0 - 5); g.lineTo(x0, y0); g.lineTo(x0 + px, y0); g.lineTo(x0 + px, y0 - 5); g.stroke();
      g.textAlign = 'left'; g.fillStyle = `rgba(${C.fg},${0.6 * ha})`; g.fillText('500 KM', x0 + px + 8, y0 - 2);
    }
    if (!reduced && running) raf = requestAnimationFrame(frame);
  }

  function startLoop() { if (running || reduced) return; running = true; raf = requestAnimationFrame(frame); }
  function stopLoop() { running = false; cancelAnimationFrame(raf); }
  function redraw() { size(); if (reduced || !running) frame(performance.now()); }

  size();
  if (reduced) frame(t0); else startLoop();
  const io = typeof IntersectionObserver === 'function'
    ? new IntersectionObserver((es) => { visible = es[0].isIntersecting; if (visible && !document.hidden) startLoop(); else stopLoop(); })
    : null;
  io?.observe(host);
  const onVis = () => { if (document.hidden || !visible) stopLoop(); else startLoop(); };
  document.addEventListener('visibilitychange', onVis);
  const ro = typeof ResizeObserver === 'function' ? new ResizeObserver(redraw) : null;
  ro?.observe(host);
  const onMove = (e: PointerEvent) => {
    const r = host.getBoundingClientRect();
    panTo = { x: ((e.clientX - r.left) / r.width - 0.5) * -3, y: ((e.clientY - r.top) / r.height - 0.5) * 2 };
  };
  const onLeave = () => { panTo = { x: 0, y: 0 }; };
  if (!reduced) {
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
  }

  return {
    stop() {
      stopLoop();
      io?.disconnect();
      ro?.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      cv.remove();
    },
  };
}
