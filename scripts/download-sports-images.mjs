import { mkdir, writeFile } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import path from 'node:path';

const ROOT = path.resolve('d:/JS/duan/sports-shop');
const OUTPUT_DIR = path.join(ROOT, 'public', 'assets');
const MANIFEST_PATH = path.join(OUTPUT_DIR, 'sports-images-manifest.json');

const SEARCH_TERMS = [
  'sports shoes',
  'running shoes',
  'sports shirt',
  'sports apparel',
  'sports shorts',
  'sports bag',
  'water bottle',
  'dumbbell',
  'jump rope',
  'tennis racket',
  'sports cap',
  'sports gloves',
  'sports goggles',
  'sports helmet',
  'sports socks',
  'tracksuit',
  'basketball',
  'football gear',
  'yoga mat',
  'resistance band',
];

function sanitizeFilename(name) {
  return name
    .replace(/%[0-9A-F]{2}/gi, '')
    .replace(/[^a-z0-9._-]+/gi, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 120);
}

async function fetchSearchPage(term) {
  const url = `https://commons.wikimedia.org/wiki/Special:MediaSearch?type=image&search=${encodeURIComponent(term)}`;
  const response = await fetch(url, {
    headers: { 'user-agent': 'Mozilla/5.0' },
  });
  if (!response.ok) {
    throw new Error(`Search failed for ${term}: ${response.status}`);
  }
  return response.text();
}

function extractThumbUrls(html) {
  const regex = /https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/thumb\/[^"' ]+\/330px-[^"' ]+/g;
  const results = new Set();
  let match;
  while ((match = regex.exec(html)) !== null) {
    const url = match[0].replace(/\u0026/g, '&').replace(/&amp;/g, '&');
    results.add(url);
  }
  return results;
}

async function downloadFile(url, filePath) {
  const response = await fetch(url, {
    headers: { 'user-agent': 'Mozilla/5.0' },
  });
  if (!response.ok) {
    throw new Error(`Download failed ${response.status} for ${url}`);
  }
  await pipeline(response.body, createWriteStream(filePath));
}

await mkdir(OUTPUT_DIR, { recursive: true });

const urlToTerm = new Map();
for (const term of SEARCH_TERMS) {
  const html = await fetchSearchPage(term);
  const urls = extractThumbUrls(html);
  for (const url of urls) {
    if (!urlToTerm.has(url)) {
      urlToTerm.set(url, term);
    }
  }
}

const collected = [...urlToTerm.entries()];
const targetCount = Math.min(70, collected.length);
const selected = collected.slice(0, targetCount);

const manifest = [];
let index = 1;
for (const [url, term] of selected) {
  const cleanUrl = url.replace(/\?utm_source=.*$/, '');
  const filenamePart = decodeURIComponent(path.basename(cleanUrl));
  const extension = path.extname(filenamePart) || '.jpg';
  const baseName = sanitizeFilename(path.basename(filenamePart, extension));
  const fileName = `${String(index).padStart(3, '0')}-${baseName}${extension}`;
  const filePath = path.join(OUTPUT_DIR, fileName);
  await downloadFile(cleanUrl, filePath);
  manifest.push({
    fileName,
    sourceUrl: cleanUrl,
    searchTerm: term,
  });
  index += 1;
}

await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');
console.log(`Downloaded ${manifest.length} images to ${OUTPUT_DIR}`);