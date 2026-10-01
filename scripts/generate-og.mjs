// Generates public/og.png (1200×630) and public/apple-touch-icon.png.
// Run with: node scripts/generate-og.mjs  (sharp ships with Next.js)
import sharp from "sharp";
import { readFileSync } from "node:fs";

const lines = Array.from({ length: 16 }, (_, i) => {
  const y = 380 + i * 18;
  return `<path d="M-50 ${y} C 250 ${y - 60 - i * 3}, 500 ${y + 40}, 800 ${y - 30} S 1150 ${y - 70}, 1300 ${y - 20}" fill="none" stroke="#7C7CFF" stroke-opacity="${(0.05 + i * 0.022).toFixed(3)}" stroke-width="1.2"/>`;
}).join("");

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="g" cx="0.85" cy="0.1" r="0.8">
      <stop offset="0" stop-color="#7C7CFF" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#080808" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#080808"/>
  <rect width="1200" height="630" fill="url(#g)"/>
  ${lines}
  <text x="72" y="96" font-family="Helvetica, Arial, sans-serif" font-size="26" font-weight="700" fill="#F5F5F5" letter-spacing="1">SON</text>
  <text x="72" y="178" font-family="Menlo, monospace" font-size="18" fill="#969AA3" letter-spacing="4">SON NGUYEN</text>
  <text x="68" y="290" font-family="Helvetica, Arial, sans-serif" font-size="84" font-weight="700" fill="#F5F5F5" letter-spacing="-3">FULL-STACK ENGINEER</text>
  <text x="68" y="388" font-family="Helvetica, Arial, sans-serif" font-size="84" font-weight="700" fill="#7C7CFF" letter-spacing="-3">· PRODUCT-FOCUSED</text>
  <text x="72" y="470" font-family="Helvetica, Arial, sans-serif" font-size="28" fill="#969AA3">Building digital products from idea to production.</text>
  <text x="72" y="560" font-family="Menlo, monospace" font-size="16" fill="#5D626C" letter-spacing="3">HOSPITALITY · LOYALTY · CRM · BOOKING · E-COMMERCE</text>
</svg>`;

await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile("public/og.png");
await sharp(readFileSync("public/icon.svg")).resize(180, 180).png().toFile("public/apple-touch-icon.png");
await sharp(readFileSync("public/icon.svg")).resize(32, 32).png().toFile("public/favicon-32.png");
console.log("Generated og.png, apple-touch-icon.png, favicon-32.png");
