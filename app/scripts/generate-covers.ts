/**
 * Generates "ledger noir" essay covers and the site's default Open Graph image.
 *
 * Usage: npm run covers            (writes every cover in COVERS plus public/og-default.png)
 *        npm run covers -- <slug>  (writes one cover)
 *
 * Each cover is an SVG rasterised by sharp (librsvg): a near-black navy field, a teal glow,
 * faint ledger rules and a grid, scattered points, a serif title and a monospace slug line.
 * Output is 1200x630 JPEG at quality 78, which keeps each file well under 250 KB.
 * Deterministic for a given slug: the scatter is seeded from the slug, so re-running is a no-op in git.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = path.join(__dirname, "../../public/images");
const PUBLIC_DIR = path.join(__dirname, "../../public");

const WIDTH = 1200;
const HEIGHT = 630;

interface Cover {
  title: string;
  date: string;
  accent?: string;
}

const COVERS: Record<string, Cover> = {
  "from-factory-to-small-tools": { title: "From the factory to small tools", date: "2026-11" },
  "retiring-six-repositories-under-governance": { title: "Retiring six repositories under governance", date: "2026-11" },
  "statecraft-cli-independent-acceptance": { title: "statecraft-cli: acceptance is independent", date: "2026-11" },
  "spec-spine-check-delta-verify": { title: "spec-spine at 0.32: check, delta, verify", date: "2026-11" },
  "from-enrahitu-to-rahi": { title: "From EnRaHiTu to Rahi", date: "2026-11" },
  "aicortex-memory-that-cannot-instruct": { title: "aicortex: memory that cannot instruct", date: "2026-11" },
  "rustev-proposals-never-grants": { title: "rustev: proposals, never grants", date: "2026-11" },
  "wire-witness-testimony-not-authority": { title: "wire-witness: testimony, not authority", date: "2026-11" },
  "three-primitives-action-gate-attest-ledger-canonical-json": {
    title: "Three primitives: gate, ledger, canonical bytes",
    date: "2026-11",
  },
};

const PALETTE = {
  bg0: "#0a1017",
  bg1: "#05080c",
  rule: "#1a2733",
  grid: "#121c26",
  text: "#e3ecf1",
  muted: "#7d93a3",
  accent: "#3fd8c9",
};

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Small deterministic PRNG so the scatter is stable per slug. */
function seeded(seed: string): () => number {
  let h = 2166136261;
  for (const ch of seed) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return ((h >>> 0) % 100000) / 100000;
  };
}

/** Greedy word wrap by character budget; the title font is roughly 0.5em per character. */
function wrap(text: string, maxChars: number): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function fitTitle(title: string): { lines: string[]; size: number } {
  for (const size of [76, 68, 60, 54, 48]) {
    const maxChars = Math.floor((WIDTH - 2 * 96) / (size * 0.5));
    const lines = wrap(title, maxChars);
    if (lines.length <= 3) return { lines, size };
  }
  return { lines: wrap(title, 40), size: 44 };
}

function scatter(rand: () => number, count: number): string {
  let out = "";
  for (let i = 0; i < count; i++) {
    const x = Math.round(rand() * WIDTH);
    const y = Math.round(rand() * HEIGHT);
    const r = (0.6 + rand() * 1.6).toFixed(2);
    const o = (0.15 + rand() * 0.55).toFixed(2);
    out += `<circle cx="${x}" cy="${y}" r="${r}" fill="${PALETTE.text}" opacity="${o}"/>`;
  }
  return out;
}

function ledgerRules(rand: () => number): string {
  // A stack of short horizontal rules on the right, like entries in a ledger; widths vary.
  let out = "";
  const x1 = WIDTH - 96;
  for (let i = 0; i < 9; i++) {
    const y = 110 + i * 26;
    const w = 90 + Math.round(rand() * 220);
    const o = (0.25 + rand() * 0.5).toFixed(2);
    out += `<line x1="${x1 - w}" y1="${y}" x2="${x1}" y2="${y}" stroke="${PALETTE.accent}" stroke-width="3" stroke-linecap="square" opacity="${o}"/>`;
  }
  return out;
}

function grid(): string {
  let out = "";
  for (let x = 0; x <= WIDTH; x += 60) out += `<line x1="${x}" y1="0" x2="${x}" y2="${HEIGHT}" stroke="${PALETTE.grid}" stroke-width="1"/>`;
  for (let y = 0; y <= HEIGHT; y += 60) out += `<line x1="0" y1="${y}" x2="${WIDTH}" y2="${y}" stroke="${PALETTE.grid}" stroke-width="1"/>`;
  return out;
}

function coverSvg(slug: string, cover: Cover, opts: { kicker: string; footer: string }): string {
  const rand = seeded(slug);
  const accent = cover.accent ?? PALETTE.accent;
  const { lines, size } = fitTitle(cover.title);
  const lineHeight = Math.round(size * 1.12);
  const blockHeight = lines.length * lineHeight;
  const baseY = Math.round(HEIGHT / 2 - blockHeight / 2 + size * 0.85);
  const titleText = lines
    .map((l, i) => `<tspan x="96" y="${baseY + i * lineHeight}">${escapeXml(l)}</tspan>`)
    .join("");
  const glowX = Math.round(WIDTH * (0.62 + rand() * 0.25));
  const glowY = Math.round(HEIGHT * (0.25 + rand() * 0.5));

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${PALETTE.bg0}"/>
      <stop offset="1" stop-color="${PALETTE.bg1}"/>
    </linearGradient>
    <radialGradient id="glow" cx="${glowX}" cy="${glowY}" r="${Math.round(WIDTH * 0.45)}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.28"/>
      <stop offset="0.45" stop-color="${accent}" stop-opacity="0.08"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="vignette" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#000" stop-opacity="0.25"/>
      <stop offset="0.5" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.45"/>
    </linearGradient>
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" seed="${Math.round(rand() * 1000)}"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.09"/></feComponentTransfer>
    </filter>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  ${grid()}
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>
  ${scatter(rand, 70)}
  ${ledgerRules(rand)}
  <line x1="96" y1="${baseY - size - 26}" x2="236" y2="${baseY - size - 26}" stroke="${accent}" stroke-width="3"/>
  <text x="96" y="${baseY - size - 44}" font-family="Menlo, 'SF Mono', Consolas, monospace" font-size="18" letter-spacing="2" fill="${accent}">${escapeXml(opts.kicker)}</text>
  <text font-family="Georgia, 'Iowan Old Style', 'Times New Roman', serif" font-size="${size}" fill="${PALETTE.text}">${titleText}</text>
  <text x="96" y="${HEIGHT - 72}" font-family="Menlo, 'SF Mono', Consolas, monospace" font-size="19" fill="${PALETTE.muted}">${escapeXml(opts.footer)}</text>
  <text x="${WIDTH - 96}" y="${HEIGHT - 72}" text-anchor="end" font-family="Menlo, 'SF Mono', Consolas, monospace" font-size="19" fill="${PALETTE.muted}">${escapeXml(cover.date)}</text>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#vignette)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" filter="url(#grain)" opacity="0.6"/>
</svg>`;
}

async function writeCover(slug: string, cover: Cover): Promise<void> {
  const svg = coverSvg(slug, cover, { kicker: "BARTEKUS.COM / WRITING", footer: `/writing/${slug}` });
  const out = path.join(IMAGES_DIR, `${slug}.jpg`);
  const info = await sharp(Buffer.from(svg), { density: 144 })
    .resize({ width: WIDTH, height: HEIGHT })
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(out);
  console.log(`${path.relative(process.cwd(), out)} ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)} KB`);
}

async function writeOgDefault(): Promise<void> {
  const svg = coverSvg(
    "og-default",
    { title: "Architecting intent for AI-native software", date: "intent / authority / evidence" },
    { kicker: "BARTEK KUS", footer: "bartekus.com" }
  );
  const out = path.join(PUBLIC_DIR, "og-default.png");
  const info = await sharp(Buffer.from(svg), { density: 144 })
    .resize({ width: WIDTH, height: HEIGHT })
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toFile(out);
  console.log(`${path.relative(process.cwd(), out)} ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)} KB`);
}

async function main() {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
  const only = process.argv[2];
  if (only) {
    const cover = COVERS[only];
    if (!cover) {
      console.error(`Unknown slug: ${only}. Known: ${Object.keys(COVERS).join(", ")}`);
      process.exit(3);
    }
    await writeCover(only, cover);
    return;
  }
  for (const [slug, cover] of Object.entries(COVERS)) await writeCover(slug, cover);
  await writeOgDefault();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
