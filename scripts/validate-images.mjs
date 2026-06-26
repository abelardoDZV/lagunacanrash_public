#!/usr/bin/env node
/**
 * Valida que las imágenes del catálogo (assets/data/images.json)
 * existan en assets/images/ con la ruta plana esperada.
 *
 * Uso:
 *   node scripts/validate-images.mjs
 *   node scripts/validate-images.mjs --json
 *   node scripts/validate-images.mjs --strict   (exit 1 si falta algo usado en index.html)
 */

import {
  readFileSync,
  existsSync,
  lstatSync,
  realpathSync,
  readdirSync,
  readlinkSync,
} from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const IMAGES_DIR = join(ROOT, 'assets', 'images');
const CATALOG_PATH = join(ROOT, 'assets', 'data', 'images.json');
const INDEX_PATH = join(ROOT, 'index.html');

const args = new Set(process.argv.slice(2));
const asJson = args.has('--json');
const strict = args.has('--strict');

function readCatalog() {
  return JSON.parse(readFileSync(CATALOG_PATH, 'utf8'));
}

function inspectFile(filename) {
  const fullPath = join(IMAGES_DIR, filename);

  if (!existsSync(fullPath)) {
    try {
      const stat = lstatSync(fullPath);
      if (stat.isSymbolicLink()) {
        return {
          filename,
          state: 'broken-symlink',
          path: relative(ROOT, fullPath),
          linkTarget: readlinkSync(fullPath),
        };
      }
    } catch {
      // archivo no existe
    }
    return { filename, state: 'missing', path: relative(ROOT, fullPath) };
  }

  const stat = lstatSync(fullPath);

  if (stat.isSymbolicLink()) {
    let resolvesTo;
    try {
      resolvesTo = relative(IMAGES_DIR, realpathSync(fullPath));
    } catch {
      return {
        filename,
        state: 'broken-symlink',
        path: relative(ROOT, fullPath),
        linkTarget: readlinkSync(fullPath),
      };
    }
    return {
      filename,
      state: 'symlink',
      path: relative(ROOT, fullPath),
      resolvesTo,
    };
  }

  return {
    filename,
    state: 'file',
    path: relative(ROOT, fullPath),
    sizeKb: Math.round(stat.size / 1024),
  };
}

function extractIndexReferences(html) {
  const pattern = /assets\/images\/([^"'\s?)]+)/g;
  const refs = new Set();
  let match;
  while ((match = pattern.exec(html)) !== null) {
    refs.add(decodeURIComponent(match[1]));
  }
  return [...refs].sort();
}

function filenameToSentence(filename) {
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function listOrphanFlatFiles(catalogEntries) {
  const known = new Set(catalogEntries.map((e) => e.file));
  const orphans = [];

  if (!existsSync(IMAGES_DIR)) return orphans;

  for (const name of readdirSync(IMAGES_DIR)) {
    const full = join(IMAGES_DIR, name);
    const stat = lstatSync(full);
    if (stat.isDirectory()) continue;
    if (known.has(name)) continue;

    let resolvesTo;
    if (stat.isSymbolicLink()) {
      try {
        resolvesTo = relative(IMAGES_DIR, realpathSync(full));
      } catch {
        resolvesTo = '(enlace roto)';
      }
    }

    orphans.push({
      file: name,
      state: stat.isSymbolicLink() ? 'symlink' : 'file',
      resolvesTo,
    });
  }

  return orphans.sort((a, b) => a.file.localeCompare(b.file));
}

function buildReport() {
  const catalog = readCatalog();
  const html = readFileSync(INDEX_PATH, 'utf8');
  const indexRefs = extractIndexReferences(html);

  const entries = catalog.images.map((item) => {
    const inspection = inspectFile(item.file);
    return {
      ...item,
      ...inspection,
      usedInIndex: indexRefs.includes(item.file),
      readableName: filenameToSentence(item.file),
    };
  });

  const missing = entries.filter((e) => e.state === 'missing');
  const brokenSymlinks = entries.filter((e) => e.state === 'broken-symlink');
  const symlinks = entries.filter((e) => e.state === 'symlink');
  const files = entries.filter((e) => e.state === 'file');
  const missingUsedInIndex = missing.filter((e) => e.usedInIndex);
  const brokenUsedInIndex = brokenSymlinks.filter((e) => e.usedInIndex);
  const symlinkUsedInIndex = symlinks.filter((e) => e.usedInIndex);
  const indexOnlyMissing = indexRefs.filter((ref) => {
    const s = inspectFile(ref).state;
    return s === 'missing' || s === 'broken-symlink';
  });
  const orphanFiles = listOrphanFlatFiles(entries);

  return {
    summary: {
      totalCatalog: entries.length,
      realFiles: files.length,
      symlinks: symlinks.length,
      missing: missing.length,
      brokenSymlinks: brokenSymlinks.length,
      usedInIndex: indexRefs.length,
      missingUsedInIndex: missingUsedInIndex.length,
      brokenUsedInIndex: brokenUsedInIndex.length,
      symlinkUsedInIndex: symlinkUsedInIndex.length,
      orphanFlatFiles: orphanFiles.length,
    },
    missing,
    missingUsedInIndex,
    brokenSymlinks,
    brokenUsedInIndex,
    symlinks,
    symlinkUsedInIndex,
    files,
    indexRefs,
    indexOnlyMissing,
    orphanFiles,
  };
}

function printTextReport(report) {
  const { summary } = report;

  console.log('');
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║        Validación de imágenes — Laguna Canrash                 ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`Catálogo (images.json):     ${summary.totalCatalog} archivos`);
  console.log(`Archivos reales en raíz:    ${summary.realFiles}`);
  console.log(`Enlaces simbólicos:         ${summary.symlinks}`);
  console.log(`Faltantes en assets/images: ${summary.missing}`);
  console.log(`Symlinks rotos:             ${summary.brokenSymlinks}`);
  console.log(`Referencias en index.html:  ${summary.usedInIndex}`);
  console.log(`Faltantes usados en HTML:   ${summary.missingUsedInIndex}`);
  console.log(`Rotos usados en HTML:       ${summary.brokenUsedInIndex}`);
  console.log(`Symlinks usados en HTML:    ${summary.symlinkUsedInIndex}`);
  console.log('');

  if (report.brokenUsedInIndex.length) {
    console.log('⛓️‍💥 SYMLINKS ROTOS USADOS EN index.html (corregir enlace o subir archivo):');
    console.log('─'.repeat(62));
    for (const item of report.brokenUsedInIndex) {
      console.log(`  • ${item.file}`);
      console.log(`    → enlace: ${item.linkTarget}`);
      console.log(`    → ${item.description || item.readableName}`);
    }
    console.log('');
  }

  if (report.missingUsedInIndex.length) {
    console.log('⚠️  FALTANTES USADOS EN index.html (subir estos archivos):');
    console.log('─'.repeat(62));
    for (const item of report.missingUsedInIndex) {
      console.log(`  • ${item.file}`);
      console.log(`    → ${item.description || item.readableName}`);
      if (item.suggestedUsage) {
        const usage = Array.isArray(item.suggestedUsage)
          ? item.suggestedUsage.join(', ')
          : item.suggestedUsage;
        console.log(`    Uso: ${usage}`);
      }
    }
    console.log('');
  }

  if (report.symlinkUsedInIndex.length) {
    console.log('🔗 EN index.html VÍA SYMLINK (reemplazar al subir el archivo real):');
    console.log('─'.repeat(62));
    for (const item of report.symlinkUsedInIndex) {
      console.log(`  • ${item.file}`);
      console.log(`    → apunta a: ${item.resolvesTo}`);
      console.log(`    → ${item.description || item.readableName}`);
    }
    console.log('');
  }

  const missingNotInHtml = report.missing.filter((e) => !e.usedInIndex);
  if (missingNotInHtml.length) {
    console.log(`📋 FALTANTES EN CATÁLOGO (${missingNotInHtml.length}, aún no usados en index.html):`);
    console.log('─'.repeat(62));
    for (const item of missingNotInHtml) {
      console.log(`  • ${item.file}`);
      console.log(`    → ${item.description || item.readableName}`);
    }
    console.log('');
  }

  if (report.indexOnlyMissing.length) {
    console.log('❌ EN index.html PERO NO EN DISCO:');
    for (const file of report.indexOnlyMissing) {
      console.log(`  • ${file}`);
    }
    console.log('');
  }

  if (report.orphanFiles.length) {
    console.log(`📁 EN assets/images/ SIN ENTRADA EN CATÁLOGO (${report.orphanFiles.length}):`);
    for (const o of report.orphanFiles) {
      const extra = o.resolvesTo ? ` → ${o.resolvesTo}` : '';
      console.log(`  • ${o.file} [${o.state}]${extra}`);
    }
    console.log('');
  }

  if (!report.missingUsedInIndex.length && !report.indexOnlyMissing.length) {
    console.log('✅ Todas las imágenes referenciadas en index.html están presentes (algunas vía symlink).');
    console.log('');
  }

  console.log('Tip: los nombres son oraciones — reemplaza _ por espacios para leerlos.');
  console.log('Ejecuta de nuevo tras subir archivos a assets/images/ con el nombre exacto.');
  console.log('');
}

const report = buildReport();

if (asJson) {
  console.log(JSON.stringify(report, null, 2));
} else {
  printTextReport(report);
}

const hasBlockingIssues =
  report.missingUsedInIndex.length > 0 ||
  report.brokenUsedInIndex.length > 0 ||
  report.indexOnlyMissing.length > 0;

if (strict && hasBlockingIssues) {
  process.exit(1);
}
