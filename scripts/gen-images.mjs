/**
 * Generate raster assets from SVG with sharp:
 *   - public/apple-touch-icon.png (180×180)
 *   - public/og/og-default.jpg    (1200×630)
 * Run: node scripts/gen-images.mjs
 * Replace with designer-provided artwork when available.
 */
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');
mkdirSync(join(pub, 'og'), { recursive: true });

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" rx="40" fill="#47589b"/>
  <text x="90" y="126" text-anchor="middle" font-family="Georgia, serif" font-size="112" font-weight="600" fill="#ffffff">L</text>
</svg>`;

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="g" cx="82%" cy="-10%" r="70%">
      <stop offset="0%" stop-color="#3a4885" stop-opacity="0.55"/>
      <stop offset="60%" stop-color="#47589b" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#47589b"/>
  <rect width="1200" height="630" fill="url(#g)"/>
  <g transform="translate(90,86)">
    <rect width="64" height="64" rx="14" fill="#ffffff"/>
    <text x="32" y="45" text-anchor="middle" font-family="Georgia, serif" font-size="40" font-weight="600" fill="#3a4885">L</text>
    <text x="84" y="30" font-family="Georgia, serif" font-size="30" font-weight="600" fill="#ffffff">Learners Academy</text>
    <text x="84" y="54" font-family="Arial, sans-serif" font-size="15" letter-spacing="3" fill="#c6cfee">ONLINE O &amp; A LEVEL TUITION</text>
  </g>
  <text x="90" y="330" font-family="Georgia, serif" font-size="74" font-weight="500" fill="#ffffff">Top grades in IGCSE &amp; A Level,</text>
  <text x="90" y="410" font-family="Georgia, serif" font-size="74" font-weight="500" fill="#ffffff">taught live online.</text>
  <text x="90" y="486" font-family="Arial, sans-serif" font-size="26" fill="#c6cfee">Cambridge (CAIE) · Edexcel · AQA · SAT — since 2016</text>
</svg>`;

await sharp(Buffer.from(icon)).png().toFile(join(pub, 'apple-touch-icon.png'));
await sharp(Buffer.from(og)).jpeg({ quality: 86 }).toFile(join(pub, 'og', 'og-default.jpg'));

console.log('Generated apple-touch-icon.png and og/og-default.jpg');
