// Dev/build only. Writes public/cards/{username}-wallpaper-{w}x{h}.png
// Run: pnpm gen:wallpapers  (after adding a person in src/lib/people.ts)
import { createRequire } from 'node:module';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const { PNG } = require('pngjs');
const QRCode = require('qrcode');
const { Resvg } = require('@resvg/resvg-js');

const CREAM = [0xf7, 0xf4, 0xef];
const { sizes } = JSON.parse(
  readFileSync(join(root, 'src/lib/wallpaper-sizes.json'), 'utf8'),
);
const site = readFileSync(join(root, 'src/lib/company.ts'), 'utf8').match(
  /website:\s*'([^']+)'/,
)[1];
const people = [
  ...readFileSync(join(root, 'src/lib/people.ts'), 'utf8').matchAll(
    /username:\s*'([^']+)'/g,
  ),
].map((m) => m[1]);

if (people.length === 0) throw new Error('no usernames in src/lib/people.ts');

const logo = PNG.sync.read(
  new Resvg(readFileSync(join(root, 'public/brand/symbol.svg')), {
    fitTo: { mode: 'width', value: 512 },
  })
    .render()
    .asPng(),
);

function paint(png, x, y, rgb, a = 255) {
  if (x < 0 || y < 0 || x >= png.width || y >= png.height || a === 0) return;
  const o = (y * png.width + x) * 4;
  const t = a / 255;
  png.data[o] = rgb[0] * t + png.data[o] * (1 - t);
  png.data[o + 1] = rgb[1] * t + png.data[o + 1] * (1 - t);
  png.data[o + 2] = rgb[2] * t + png.data[o + 2] * (1 - t);
  png.data[o + 3] = 255;
}

function blit(dst, src, ox, oy, scale) {
  const dw = Math.round(src.width * scale);
  const dh = Math.round(src.height * scale);
  for (let y = 0; y < dh; y++)
    for (let x = 0; x < dw; x++) {
      const si =
        (Math.min(src.height - 1, (y / scale) | 0) * src.width +
          Math.min(src.width - 1, (x / scale) | 0)) *
        4;
      paint(
        dst,
        ox + x,
        oy + y,
        [src.data[si], src.data[si + 1], src.data[si + 2]],
        src.data[si + 3],
      );
    }
  return { dw, dh };
}

mkdirSync(join(root, 'public/cards'), { recursive: true });

for (const username of people) {
  const url = `${site}/en/${username}`;
  for (const [w, h] of sizes) {
    const qrPx = Math.round(w * 0.28);
    const qr = PNG.sync.read(
      await QRCode.toBuffer(url, {
        width: qrPx,
        margin: 2,
        errorCorrectionLevel: 'H',
        color: { dark: '#111C2D', light: '#F7F4EF' },
      }),
    );
    const out = new PNG({ width: w, height: h });
    for (let i = 0; i < out.data.length; i += 4) {
      out.data[i] = CREAM[0];
      out.data[i + 1] = CREAM[1];
      out.data[i + 2] = CREAM[2];
      out.data[i + 3] = 255;
    }
    blit(out, qr, (w - qr.width) >> 1, (h - qr.height) >> 1, 1);
    const pad = Math.round(qr.width * 0.22);
    const px = (w - pad) >> 1;
    const py = (h - pad) >> 1;
    for (let y = py; y < py + pad; y++)
      for (let x = px; x < px + pad; x++) paint(out, x, y, CREAM);
    const scale = (pad * 0.72) / logo.width;
    const lw = Math.round(logo.width * scale);
    const lh = Math.round(logo.height * scale);
    blit(out, logo, px + ((pad - lw) >> 1), py + ((pad - lh) >> 1), scale);
    const file = join(
      root,
      `public/cards/${username}-wallpaper-${w}x${h}.png`,
    );
    writeFileSync(file, PNG.sync.write(out));
    console.log(file);
  }
}
