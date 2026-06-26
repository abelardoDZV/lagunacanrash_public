#!/usr/bin/env node
/**
 * Genera versiones optimizadas de las imágenes raster del sitio.
 *
 * - thumb: 480px máx., WebP ~80 — rejilla de galería
 * - medium: 1280px máx., WebP ~82 — secciones / pantallas medianas
 *
 * Uso:
 *   node scripts/generate-image-variants.mjs
 *   node scripts/generate-image-variants.mjs --force
 */

import {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
} from 'node:fs';
import { dirname, join, relative, resolve, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const IMAGES_DIR = join(ROOT, 'assets', 'images');
const CATALOG_PATH = join(ROOT, 'assets', 'data', 'images.json');
const INDEX_PATH = join(ROOT, 'index.html');
const VARIANTS_PATH = join(ROOT, 'assets', 'data', 'image-variants.json');

const THUMB_DIR = join(IMAGES_DIR, 'derived', 'thumb');
const MEDIUM_DIR = join(IMAGES_DIR, 'derived', 'medium');

const VARIANTS = {
  thumb: { maxWidth: 480, quality: 80 },
  medium: { maxWidth: 1280, quality: 82 },
};

const RASTER_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const SKIP_FILES = new Set([
  'logo-sin-bg.png',
  'logo con fondo blanco.jpg',
  'logo_con_gorro_de_navidad.webp',
  'logo_feliz_anho_2025.png',
  'Logo ruta.png',
]);

const force = process.argv.includes('--force');

function readCatalog() {
  return JSON.parse(readFileSync(CATALOG_PATH, 'utf8'));
}

function collectIndexImages() {
  const html = readFileSync(INDEX_PATH, 'utf8');
  const matches = html.matchAll(/assets\/images\/([^"'?#\s]+)/g);
  const files = new Set();
  for (const match of matches) {
    const file = decodeURIComponent(match[1]);
    if (RASTER_EXT.has(extname(file).toLowerCase())) files.add(file);
  }
  return files;
}

function collectGalleryImages(catalog) {
  const files = new Set();
  const assignments = catalog.gallery?.assignments || {};
  for (const file of Object.keys(assignments)) files.add(file);
  return files;
}

function collectSourceImages(catalog) {
  const files = new Set([
    ...collectIndexImages(),
    ...collectGalleryImages(catalog),
  ]);

  for (const entry of catalog.images || []) {
    if (entry.file && RASTER_EXT.has(extname(entry.file).toLowerCase())) {
      files.add(entry.file);
    }
  }

  return [...files]
    .filter((file) => !SKIP_FILES.has(file))
    .filter((file) => !file.startsWith('derived/'))
    .sort();
}

function variantBasename(file) {
  return basename(file, extname(file)) + '.webp';
}

function isUpToDate(sourcePath, outputs) {
  if (force) return false;
  const sourceMtime = statSync(sourcePath).mtimeMs;
  return outputs.every((path) => existsSync(path) && statSync(path).mtimeMs >= sourceMtime);
}

async function writeVariant(inputPath, outputPath, maxWidth, quality) {
  await sharp(inputPath)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality, effort: 4 })
    .toFile(outputPath);
}

async function main() {
  mkdirSync(THUMB_DIR, { recursive: true });
  mkdirSync(MEDIUM_DIR, { recursive: true });

  const catalog = readCatalog();
  const sources = collectSourceImages(catalog);
  const manifest = {
    meta: {
      version: 1,
      generatedAt: new Date().toISOString(),
      thumb: {
        dir: 'assets/images/derived/thumb/',
        maxWidth: VARIANTS.thumb.maxWidth,
        format: 'webp',
      },
      medium: {
        dir: 'assets/images/derived/medium/',
        maxWidth: VARIANTS.medium.maxWidth,
        format: 'webp',
      },
    },
    files: {},
  };

  let created = 0;
  let skipped = 0;
  let missing = 0;

  for (const file of sources) {
    const sourcePath = join(IMAGES_DIR, file);
    if (!existsSync(sourcePath)) {
      console.warn('⚠️  Falta original:', file);
      missing += 1;
      continue;
    }

    const thumbName = variantBasename(file);
    const thumbPath = join(THUMB_DIR, thumbName);
    const mediumPath = join(MEDIUM_DIR, thumbName);

    if (isUpToDate(sourcePath, [thumbPath, mediumPath])) {
      skipped += 1;
    } else {
      await writeVariant(sourcePath, thumbPath, VARIANTS.thumb.maxWidth, VARIANTS.thumb.quality);
      await writeVariant(sourcePath, mediumPath, VARIANTS.medium.maxWidth, VARIANTS.medium.quality);
      created += 1;
      const thumbKb = Math.round(statSync(thumbPath).size / 1024);
      const mediumKb = Math.round(statSync(mediumPath).size / 1024);
      console.log(`✓ ${file} → thumb ${thumbKb} KB, medium ${mediumKb} KB`);
    }

    manifest.files[file] = {
      thumb: `assets/images/derived/thumb/${thumbName}`,
      medium: `assets/images/derived/medium/${thumbName}`,
      full: `assets/images/${file}`,
    };
  }

  writeFileSync(VARIANTS_PATH, JSON.stringify(manifest, null, 2) + '\n');

  catalog.variants = manifest.meta;
  writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2) + '\n');

  console.log('');
  console.log(`Fuentes: ${sources.length}`);
  console.log(`Generadas: ${created}`);
  console.log(`Sin cambios: ${skipped}`);
  console.log(`Faltantes: ${missing}`);
  console.log(`Manifiesto: ${relative(ROOT, VARIANTS_PATH)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
