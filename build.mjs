#!/usr/bin/env node
// Static site generator for apps.munna.dev. No dependencies (Node 18+).
//   node build.mjs          build every page into the repository root
//   node build.mjs --check  build, then fail on broken links/anchors or language leaks
//
// Output is plain HTML committed at the repo root, so GitHub Pages "deploy from
// branch" keeps working unchanged.

import { mkdirSync, writeFileSync, readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { LANGS, SITE } from './src/lib.mjs';
import { HUB, APP, appPath, guidePath, GUIDE_TOPICS } from './src/routes.mjs';
import { page } from './src/layout.mjs';
import { hubPage } from './src/pages/hub.mjs';
import { appPage } from './src/pages/app.mjs';
import { guideIndex, guideTopic } from './src/pages/guide.mjs';
import { privacyPage, termsPage, contactPage, notFoundHtml } from './src/pages/legal.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const TODAY = new Date().toISOString().slice(0, 10);

// ------------------------------------------------------------------ route table
const pages = [];
const add = (area, paths, make, indexable = true) => pages.push({ area, paths, make, indexable });

add('hub', HUB, hubPage);
add('app', APP, appPage);
add('app', { en: guidePath('en'), bn: guidePath('bn') }, guideIndex);
for (const slug of GUIDE_TOPICS) add('app', { en: guidePath('en', slug), bn: guidePath('bn', slug) }, (l) => guideTopic(l, slug));
add('app', { en: appPath('en', 'contact'), bn: appPath('bn', 'contact') }, contactPage);
add('app', { en: appPath('en', 'terms'), bn: appPath('bn', 'terms') }, termsPage, false);
add('app', { en: appPath('en', 'privacy'), bn: appPath('bn', 'privacy') }, privacyPage, false);

// ------------------------------------------------------------------ write
const written = new Set();
function write(urlPath, html) {
  const file = join(ROOT, urlPath.endsWith('/') ? urlPath + 'index.html' : urlPath);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  written.add(file);
}

for (const p of pages) {
  for (const lang of LANGS) {
    const c = p.make(lang);
    write(p.paths[lang], page({ lang, area: p.area, paths: p.paths, ...c }));
  }
}
write('/404.html', notFoundHtml());

// sitemap with hreflang alternates (indexable pages only)
const urls = pages
  .filter((p) => p.indexable)
  .flatMap((p) =>
    LANGS.map(
      (lang) => `  <url>
    <loc>${SITE + p.paths[lang]}</loc>
    <lastmod>${TODAY}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE + p.paths.en}"/>
    <xhtml:link rel="alternate" hreflang="bn" href="${SITE + p.paths.bn}"/>
  </url>`,
    ),
  );
writeFileSync(
  join(ROOT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
  <!-- Terms and Privacy are drafts (noindex); add them here once final. -->
</urlset>
`,
);
console.log(`Built ${written.size} HTML files + sitemap.xml (${urls.length} URLs).`);

// ------------------------------------------------------------------ app config
// /app-config/*.json are hand-edited static files the apps read for update
// checks. The build refuses to continue when one is inconsistent. The rules
// mirror the app's parser (lib/core/update/update_policy.dart in Bahon Boi).
const APP_IDS = { bahonboi: 'dev.munna.apps.bahonboi' };
function validateAppConfig(file) {
  const errs = [];
  let j;
  try { j = JSON.parse(readFileSync(file, 'utf8')); } catch (e) { return [`not valid JSON (${e.message})`]; }
  const isInt = (v) => Number.isInteger(v) && v >= 1;
  if (j.schemaVersion !== 1) errs.push('schemaVersion must be 1');
  if (typeof j.updatedAt !== 'string' || !/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\dZ$/.test(j.updatedAt) || isNaN(Date.parse(j.updatedAt))) errs.push('updatedAt must be an ISO-8601 UTC time like 2026-11-10T12:00:00Z');
  if (!j.apps || typeof j.apps !== 'object') return [...errs, 'apps must be an object'];
  for (const [key, a] of Object.entries(j.apps)) {
    const e = (m) => errs.push(`apps.${key}: ${m}`);
    if (!APP_IDS[key]) { e('unknown app key (add it to APP_IDS in build.mjs)'); continue; }
    if (a.androidAppId !== APP_IDS[key]) e(`androidAppId must be ${APP_IDS[key]}`);
    if (typeof a.published !== 'boolean') e('published must be true or false');
    if (!isInt(a.minSupportedBuildNumber) || !isInt(a.latestBuildNumber)) e('build numbers must be integers >= 1');
    else if (a.minSupportedBuildNumber > a.latestBuildNumber) e('minSupportedBuildNumber must not exceed latestBuildNumber');
    const v = a.versions && a.versions[String(a.latestBuildNumber)];
    if (typeof v !== 'string' || !v.trim()) e(`versions["${a.latestBuildNumber}"] (display version of the latest build) is missing`);
    for (const k of Object.keys(a.versions || {})) if (!/^[1-9]\d*$/.test(k)) e(`versions key "${k}" is not a build number`);
    const want = `https://play.google.com/store/apps/details?id=${APP_IDS[key]}`;
    if (a.androidUpdateUrl !== undefined && a.androidUpdateUrl !== want) e(`androidUpdateUrl must be exactly ${want}`);
    if (a.published && a.androidUpdateUrl !== want) e('a published app needs androidUpdateUrl');
    if ('forceUpdate' in a) e('forceUpdate is not used — raise minSupportedBuildNumber to require an update');
    if (a.releaseNotes !== undefined) {
      if (typeof a.releaseNotes !== 'object' || Array.isArray(a.releaseNotes)) e('releaseNotes must be an object keyed by build number');
      else for (const [b, n] of Object.entries(a.releaseNotes)) {
        if (!/^[1-9]\d*$/.test(b)) e(`releaseNotes key "${b}" is not a build number`);
        for (const l of Object.keys(n || {})) if (!['en', 'bn'].includes(l) || typeof n[l] !== 'string') e(`releaseNotes["${b}"].${l} must be an en/bn string`);
      }
    }
  }
  return errs;
}
let configErrors = 0;
for (const name of ['config.json', 'dev-config.json']) {
  const file = join(ROOT, 'app-config', name);
  if (!existsSync(file)) { console.error(`ERROR app-config/${name} is missing`); configErrors++; continue; }
  for (const m of validateAppConfig(file)) { console.error(`ERROR app-config/${name}: ${m}`); configErrors++; }
}
if (configErrors) process.exit(1);
console.log('App config: app-config/config.json and dev-config.json are valid.');

// ------------------------------------------------------------------ checks
if (process.argv.includes('--check')) {
  let errors = 0, warnings = 0;
  const err = (m) => { errors++; console.error('ERROR ' + m); };
  const warn = (m) => { warnings++; console.warn('WARN  ' + m); };

  // Stray HTML: anything at the root that the build did not write.
  const walk = (d) =>
    readdirSync(d).flatMap((n) => {
      if (['.git', 'node_modules', 'src', 'docs'].includes(n)) return [];
      const f = join(d, n);
      return statSync(f).isDirectory() ? walk(f) : f.endsWith('.html') ? [f] : [];
    });
  for (const f of walk(ROOT)) if (!written.has(f)) err(`stray HTML not produced by the build: ${f.slice(ROOT.length)}`);

  const fileFor = (u) => join(ROOT, u.endsWith('/') ? u + 'index.html' : u);
  const ids = new Map();
  const idsOf = (file) => {
    if (!ids.has(file)) ids.set(file, new Set([...readFileSync(file, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
    return ids.get(file);
  };

  const ALLOW_LATIN_BN = /^(Bahon|Boi|Google|Play|Android|bKash|Nagad|Rocket|Md|Risul|Islam|Munna|hello|munna|dev|apps|com|English|Bee|Hook|GitHub|LinkedIn|Facebook|SaaS|DevOps|Laravel|PHP|Vue|js|Flutter|Dart|MySQL|Docker|AWS|Actions|Cloudflare|Sheets|Drive|BahonBoi|Backups|attachments|TODO|Play Console|Console|Target|audience|and|content|manifest|merged|Android|permission|NID|PDF|CNG|Files|ID|app|beehook|games|Fable|www|https|http)$/i;

  for (const file of written) {
    const html = readFileSync(file, 'utf8');
    const rel = file.slice(ROOT.length);
    // internal links and assets
    for (const m of html.matchAll(/\s(?:href|src)="(\/[^"]*)"/g)) {
      const [path, hash] = m[1].split('#');
      const clean = path.split('?')[0];
      const target = fileFor(clean);
      if (!existsSync(target)) { err(`${rel}: broken link ${m[1]}`); continue; }
      if (hash && target.endsWith('.html') && !idsOf(target).has(hash)) err(`${rel}: missing anchor ${m[1]}`);
    }
    for (const m of html.matchAll(/\shref="#([^"]+)"/g)) if (!idsOf(file).has(m[1])) err(`${rel}: missing same-page anchor #${m[1]}`);
    // duplicate ids
    const all = [...html.matchAll(/\sid="([^"]+)"/g)].map((x) => x[1]);
    const dup = all.filter((x, i) => all.indexOf(x) !== i);
    if (dup.length) err(`${rel}: duplicate ids ${[...new Set(dup)].join(', ')}`);

    if (rel === '/404.html') continue;
    const lang = html.match(/<html lang="(\w+)"/)[1];
    // visible text only, without elements explicitly marked with another lang
    const text = html
      .replace(/<script[\s\S]*?<\/script>/g, ' ')
      .replace(/<head>[\s\S]*?<\/head>/, ' ')
      .replace(/<html[^>]*>/, ' ')
      .replace(/<(\w+)[^>]*\slang="(?!LANG)[a-z]+"[^>]*>[\s\S]*?<\/\1>/g, (s) => (s.includes(`lang="${lang}"`) ? s : ' '))
      .replace(/<title[\s\S]*?<\/title>/g, ' ')
      .replace(/<desc[\s\S]*?<\/desc>/g, (s) => s) // keep SVG descriptions: they must be translated too
      .replace(/<[^>]+>/g, ' ')
      .replace(/&[a-z#0-9]+;/g, ' ');
    if (lang === 'bn') {
      const latin = [...text.matchAll(/[A-Za-z][A-Za-z'’.-]*/g)]
        .map((x) => x[0].replace(/[.'’-]+$/, ''))
        .filter((w) => w && !w.includes('.') && !ALLOW_LATIN_BN.test(w));
      if (latin.length) warn(`${rel}: Latin words in Bengali page: ${[...new Set(latin)].slice(0, 15).join(', ')}`);
    } else {
      const bn = [...text.replace(/৳/g, ' ').matchAll(/[ঀ-৿][ঀ-৿ ]*/g)]
        .map((x) => x[0].trim())
        .filter((w) => w && !['বাংলা', 'বাহন বই'].includes(w));
      if (bn.length) warn(`${rel}: Bengali text in English page: ${[...new Set(bn)].slice(0, 10).join(' | ')}`);
    }
  }
  console.log(`Checks: ${errors} error(s), ${warnings} warning(s).`);
  if (errors) process.exit(1);
}
