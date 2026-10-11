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
const PAPER = [0xff, 0xfc, 0xf8];
const NAVY = [0x11, 0x1c, 0x2d];

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

function svgPng(file, width) {
  return PNG.sync.read(
    new Resvg(readFileSync(join(root, file)), {
      fitTo: { mode: 'width', value: width },
    })
      .render()
      .asPng(),
  );
}

function paint(png, x, y, rgb, a = 255) {
  if (x < 0 || y < 0 || x >= png.width || y >= png.height || a === 0) return;
  const o = (y * png.width + x) * 4;
  const t = a / 255;
  png.data[o] = rgb[0] * t + png.data[o] * (1 - t);
  png.data[o + 1] = rgb[1] * t + png.data[o + 1] * (1 - t);
  png.data[o + 2] = rgb[2] * t + png.data[o + 2] * (1 - t);
  png.data[o + 3] = 255;
}

function fill(png, x, y, rw, rh, rgb, a = 255) {
  const x0 = Math.max(0, x);
  const y0 = Math.max(0, y);
  const x1 = Math.min(png.width, x + rw);
  const y1 = Math.min(png.height, y + rh);
  for (let yy = y0; yy < y1; yy++) {
    for (let xx = x0; xx < x1; xx++) paint(png, xx, yy, rgb, a);
  }
}

function blit(dst, src, ox, oy) {
  for (let y = 0; y < src.height; y++) {
    for (let x = 0; x < src.width; x++) {
      const si = (y * src.width + x) * 4;
      paint(
        dst,
        ox + x,
        oy + y,
        [src.data[si], src.data[si + 1], src.data[si + 2]],
        src.data[si + 3],
      );
    }
  }
}

function frame(w, h, qrW, wordH) {
  const platePad = Math.round(qrW * 0.1);
  const plate = qrW + platePad * 2;
  const wordY = h - Math.round(Math.max(h * 0.09, 56)) - wordH;
  const top = Math.round(h * 0.15);
  const gap = Math.round(h * 0.04);
  const room = wordY - gap - top;
  if (plate > room) return null;
  return {
    plate,
    plateY: top + Math.round((room - plate) * 0.42),
    wordY,
  };
}

mkdirSync(join(root, 'public/cards'), { recursive: true });

for (const username of people) {
  const url = `${site}/en/${username}`;
  for (const [w, h] of sizes) {
    const wordW = Math.round(w * 0.36);
    const word = svgPng('src/assets/brand/wordmark.svg', wordW);
    let qrPx = Math.round(Math.min(w * 0.32, h * 0.18));
    let box = frame(w, h, qrPx, word.height);
    while (!box) {
      qrPx = Math.round(qrPx * 0.92);
      if (qrPx < 96) throw new Error(`wallpaper overlap ${w}x${h}`);
      box = frame(w, h, qrPx, word.height);
    }
    const qr = PNG.sync.read(
      await QRCode.toBuffer(url, {
        width: qrPx,
        margin: 2,
        errorCorrectionLevel: 'H',
        color: { dark: '#111C2D', light: '#FFFCF8' },
      }),
    );
    const platePad = Math.round((box.plate - qr.width) / 2);
    const plate = qr.width + platePad * 2;
    const plateX = (w - plate) >> 1;
    const plateY = box.plateY + Math.round((box.plate - plate) / 2);
    if (plateY < 0 || plateY + plate > box.wordY) {
      throw new Error(`wallpaper overlap ${w}x${h}`);
    }

    const out = new PNG({ width: w, height: h });
    for (let i = 0; i < out.data.length; i += 4) {
      out.data[i] = CREAM[0];
      out.data[i + 1] = CREAM[1];
      out.data[i + 2] = CREAM[2];
      out.data[i + 3] = 255;
    }

    const edge = Math.round(Math.min(w, h) * 0.075);
    const stroke = Math.max(2, Math.round(w / 420));
    const arm = Math.round(Math.min(w, h) * 0.055);
    const ink = 110;
    fill(out, edge, edge, arm, stroke, NAVY, ink);
    fill(out, edge, edge + stroke, stroke, arm - stroke, NAVY, ink);
    fill(out, w - edge - arm, edge, arm, stroke, NAVY, ink);
    fill(
      out,
      w - edge - stroke,
      edge + stroke,
      stroke,
      arm - stroke,
      NAVY,
      ink,
    );
    fill(out, edge, h - edge - stroke, arm, stroke, NAVY, ink);
    fill(out, edge, h - edge - arm, stroke, arm - stroke, NAVY, ink);
    fill(out, w - edge - arm, h - edge - stroke, arm, stroke, NAVY, ink);
    fill(
      out,
      w - edge - stroke,
      h - edge - arm,
      stroke,
      arm - stroke,
      NAVY,
      ink,
    );

    fill(out, plateX, plateY, plate, plate, PAPER);
    const qrX = plateX + platePad;
    const qrY = plateY + platePad;
    blit(out, qr, qrX, qrY);

    const pad = Math.round(qr.width * 0.2);
    const mark = svgPng('src/assets/brand/symbol.svg', Math.round(pad * 0.72));
    const mx = qrX + ((qr.width - pad) >> 1);
    const my = qrY + ((qr.height - pad) >> 1);
    fill(out, mx, my, pad, pad, PAPER);
    blit(
      out,
      mark,
      mx + ((pad - mark.width) >> 1),
      my + ((pad - mark.height) >> 1),
    );

    blit(out, word, (w - word.width) >> 1, box.wordY);

    const file = join(root, `public/cards/${username}-wallpaper-${w}x${h}.png`);
    writeFileSync(file, PNG.sync.write(out));
    console.log(file);
  }
}
