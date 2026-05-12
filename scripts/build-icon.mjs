/**
 * build-icon.mjs
 * Converts the PNG source icon → build/icon.png (256x256) and build/icon.ico (multi-size)
 */
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC = join(ROOT, 'src', 'assets', 'icon-source.png');
const OUT = join(ROOT, 'build');

mkdirSync(OUT, { recursive: true });

// ── Resize to standard sizes ─────────────────────────────────────────────────
const sizes = [16, 32, 48, 64, 128, 256];
const pngBuffers = await Promise.all(
  sizes.map(s => sharp(SRC).resize(s, s).png().toBuffer())
);

// Write 256px PNG (used by electron-builder for macOS + Linux)
writeFileSync(join(OUT, 'icon.png'), pngBuffers[pngBuffers.length - 1]);
console.log('✓ build/icon.png written (256×256)');

// Write ICO (used by electron-builder for Windows)
const icoBuffer = await pngToIco(pngBuffers);
writeFileSync(join(OUT, 'icon.ico'), icoBuffer);
console.log('✓ build/icon.ico written (16-256px multi-size)');
