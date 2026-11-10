// Page shell: <head>, header (with language switch), footer.

import { SITE, L, t, esc } from './lib.mjs';
import { HUB, APP, appPath, guidePath, GAMES_URL, NAV_LABELS as N } from './routes.mjs';

const FONTS =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap';

const UI = {
  skip: L('Skip to content', 'মূল অংশে যান'),
  langNav: L('Language', 'ভাষা'),
  mainNav: L('Main', 'প্রধান'),
  footerNav: L('Footer', 'ফুটার'),
  hubHome: L('Munna Apps — home', 'Munna Apps — হোম'),
  menu: L('Menu', 'মেনু'),
  appHome: L('Bahon Boi — app page', 'বাহন বই — অ্যাপের পেজ'),
  appCol: L('Bahon Boi', 'বাহন বই'),
  legalCol: L('Help & legal', 'সাহায্য ও নীতি'),
  moreCol: L('More', 'আরও'),
  email: L('Email', 'ইমেইল'),
  dev: L('Developer website', 'ডেভেলপারের ওয়েবসাইট'),
  footNote: L(
    'Independent apps made in Dhaka, Bangladesh.',
    'ঢাকা, বাংলাদেশে তৈরি স্বাধীন অ্যাপ।',
  ),
};

function langSwitch(lang, paths) {
  // Compact visible labels, full accessible names. The current language is
  // shown as selected and is not a link target for the other language.
  const item = (l, short, full) =>
    l === lang
      ? `<a lang="${l}" hreflang="${l}" href="${paths[l]}" aria-label="${full}" aria-current="true">${short}</a>`
      : `<a lang="${l}" hreflang="${l}" href="${paths[l]}" aria-label="${full}" data-keep-hash>${short}</a>`;
  return `<nav class="lang-switch" aria-label="${t(UI.langNav, lang)}">${item('bn', 'বাং', 'বাংলা')}<span aria-hidden="true">|</span>${item('en', 'EN', 'English')}</nav>`;
}

const MENU_ICON =
  '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path class="m-open" d="M4 7h16M4 12h16M4 17h16"/><path class="m-close" d="M6 6l12 12M18 6L6 18"/></svg>';

// One row: brand · navigation · language + menu button. site.js collapses the
// navigation into the menu button as soon as the row would not fit.
function headerShell(lang, paths, brand, links) {
  return `<header class="site-header" data-header>
  <div class="wrap header-row">
    ${brand}
    <nav class="main-nav" id="site-nav" aria-label="${t(UI.mainNav, lang)}">
      ${links.join('\n      ')}
    </nav>
    <div class="header-tools">
      ${langSwitch(lang, paths)}
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" hidden>${MENU_ICON}<span class="sr-only">${t(UI.menu, lang)}</span></button>
    </div>
  </div>
</header>`;
}

function header(lang, area, paths, current) {
  // aria-current="page" only for links to another page that is the current
  // one (guide, contact). In-page anchors get aria-current="location" from
  // the scroll tracker in site.js.
  const cur = (k) => (k === current ? ' aria-current="page"' : '');
  if (area === 'hub') {
    const h = HUB[lang];
    return headerShell(lang, paths, `<a class="brand" href="${h}" aria-label="${t(UI.hubHome, lang)}">
      <img src="/assets/favicon.svg" width="34" height="34" alt="">
      <b lang="en">Munna Apps</b>
    </a>`, [
      `<a href="${h}#apps">${t(N.apps, lang)}</a>`,
      // External destination: not an in-page section, so the scroll tracker ignores it.
      `<a class="nav-ext" href="${GAMES_URL}" rel="noopener">${t(N.games, lang)}<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg></a>`,
      `<a href="${h}#developer">${t(N.developer, lang)}</a>`,
      `<a href="${h}#contact">${t(N.contact, lang)}</a>`,
    ]);
  }
  const a = APP[lang];
  return headerShell(lang, paths, `<a class="brand" href="${a}" aria-label="${t(UI.appHome, lang)}">
      <img src="/bahon-boi/assets/favicon-48.png" width="34" height="34" alt="">
      <b>${t(L('Bahon Boi', 'বাহন বই'), lang)}</b>
    </a>`, [
    `<a href="${a}#features">${t(N.features, lang)}</a>`,
    `<a href="${guidePath(lang)}"${cur('guide')}>${t(N.guide, lang)}</a>`,
    `<a href="${a}#faq">${t(N.faq, lang)}</a>`,
    `<a href="${appPath(lang, 'contact')}"${cur('contact')}>${t(N.contact, lang)}</a>`,
    `<a href="${HUB[lang]}">${t(N.allApps, lang)}</a>`,
  ]);
}

function footer(lang, area) {
  const year = '2026';
  const copy = `<p class="copy">&copy; ${lang === 'bn' ? '২০২৬' : year} <span lang="en">Md. Risul Islam Munna</span> · ${t(UI.footNote, lang)}</p>`;
  const a = APP[lang];
  const appCol = `<div><h2>${t(UI.appCol, lang)}</h2><ul>
      <li><a href="${a}">${t(L('Overview', 'পরিচিতি'), lang)}</a></li>
      <li><a href="${a}#features">${t(N.features, lang)}</a></li>
      <li><a href="${guidePath(lang)}">${t(N.guide, lang)}</a></li>
      <li><a href="${a}#faq">${t(N.faq, lang)}</a></li></ul></div>`;
  const legalCol = `<div><h2>${t(UI.legalCol, lang)}</h2><ul>
      <li><a href="${appPath(lang, 'contact')}">${t(N.contact, lang)}</a></li>
      <li><a href="${appPath(lang, 'terms')}">${t(L('Terms and Conditions', 'শর্তাবলি'), lang)}</a></li>
      <li><a href="${appPath(lang, 'privacy')}">${t(L('Privacy Policy', 'গোপনীয়তা নীতি'), lang)}</a></li></ul></div>`;
  const moreCol = `<div><h2>${t(UI.moreCol, lang)}</h2><ul>
      <li><a href="${HUB[lang]}">${t(N.allApps, lang)}</a></li>${area === 'hub' ? `
      <li><a href="${GAMES_URL}" rel="noopener">${t(N.games, lang)}: games.munna.dev</a></li>` : ''}
      <li><a href="mailto:hello@munna.dev">${t(UI.email, lang)}: hello@munna.dev</a></li>
      <li><a href="https://munna.dev" rel="noopener">${t(UI.dev, lang)}</a></li></ul></div>`;
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="footer-cols">
      <div class="footer-brand">
        <img src="${area === 'hub' ? '/assets/favicon.svg' : '/bahon-boi/assets/favicon-48.png'}" width="40" height="40" alt="">
        <p>${area === 'hub' ? '<span lang="en">Munna Apps</span>' : t(L('Bahon Boi — every vehicle’s accounts, in one book.', 'বাহন বই — সব বাহনের হিসাব, এক বইয়ে।'), lang)}</p>
      </div>
      ${appCol}${legalCol}${moreCol}
    </div>
    ${copy}
  </div>
</footer>`;
}

/**
 * @param {object} o
 *  lang, area ('hub'|'app'), paths {en,bn}, title, description, body,
 *  robots?, ogImage?, ogType?, jsonld?, current?, xDefault?, bodyClass?
 */
export function page(o) {
  const { lang, area, paths } = o;
  const canonical = SITE + paths[lang];
  const ogImage =
    o.ogImage ||
    (area === 'hub'
      ? lang === 'bn' ? '/assets/og-cover-bn.png' : '/assets/og-cover.png'
      : lang === 'en' ? '/bahon-boi/assets/og-cover-en.png' : '/bahon-boi/assets/og-cover.png');
  const xDefault = o.xDefault || (area === 'hub' ? HUB.en : APP.bn);
  const title = esc(o.title);
  const desc = esc(o.description);
  const ld = o.jsonld ? `<script type="application/ld+json">${JSON.stringify(o.jsonld)}</script>\n` : '';
  const icon =
    area === 'hub'
      ? '<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">\n<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">\n<link rel="manifest" href="/site.webmanifest">'
      : '<link rel="icon" href="/bahon-boi/assets/favicon-48.png" type="image/png" sizes="48x48">\n<link rel="apple-touch-icon" href="/bahon-boi/assets/apple-touch-icon.png">\n<link rel="manifest" href="/bahon-boi/site.webmanifest">';
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${canonical}">
<link rel="alternate" hreflang="en" href="${SITE + paths.en}">
<link rel="alternate" hreflang="bn" href="${SITE + paths.bn}">
<link rel="alternate" hreflang="x-default" href="${SITE + xDefault}">
<meta name="robots" content="${o.robots || 'index,follow,max-image-preview:large'}">
<meta name="theme-color" content="${area === 'hub' ? '#f6f4ef' : '#2f6f6b'}">
<meta name="author" content="Md. Risul Islam Munna">
<meta property="og:type" content="${o.ogType || 'website'}">
<meta property="og:site_name" content="Munna Apps">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE + ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="${lang === 'bn' ? 'bn_BD' : 'en_US'}">
<meta property="og:locale:alternate" content="${lang === 'bn' ? 'en_US' : 'bn_BD'}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${SITE + ogImage}">
${icon}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<link rel="stylesheet" href="/assets/site.css">
<script>document.documentElement.classList.add('js')</script>
<script defer src="/assets/site.js"></script>
${ld}</head>
<body class="${area === 'app' ? 'app-bahon-boi' : 'hub'}${o.bodyClass ? ' ' + o.bodyClass : ''}">
<a class="skip-link" href="#main">${t(UI.skip, lang)}</a>
${header(lang, area, paths, o.current)}
<main id="main">
${o.body}
</main>
${footer(lang, area)}
</body>
</html>
`;
}
