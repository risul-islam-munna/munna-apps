// Small reusable HTML pieces.

import { L, t, money, num, esc } from './lib.mjs';

const ICONS = {
  flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
  car: '<path d="M5 17h14M6 17l1.5-6h9L18 17M8 11l1-3h6l1 3"/><circle cx="8" cy="18" r="1.5"/><circle cx="16" cy="18" r="1.5"/>',
  driver: '<circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 11l2 2 3-3"/>',
  income: '<path d="M3 17l6-6 4 4 8-8M15 7h6v6"/>',
  cash: '<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 9v.01M18 15v.01"/>',
  expense: '<path d="M3 7l6 6 4-4 8 8M15 17h6v-6"/>',
  adjust: '<path d="M4 7h11M4 17h7M15 4l3 3-3 3M11 14l3 3-3 3"/>',
  calc: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h2M12 12h2M16 12h0M8 16h2M12 16h2"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  doc: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h5"/><circle cx="16" cy="16" r="2.5"/>',
  backup: '<path d="M12 3v12M7 10l5 5 5-5"/><path d="M4 17v3h16v-3"/>',
  offline: '<path d="M2 8.5a15 15 0 0 1 20 0M5 12a10 10 0 0 1 14 0M8.5 15.5a5 5 0 0 1 7 0"/><circle cx="12" cy="19" r="1"/><path d="M3 3l18 18"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/><path d="M3 3l18 18"/>',
  lang: '<path d="M4 5h9M8.5 3v2M6 5c0 4 3 7 6 8M11 5c0 4-3 7-7 9"/><path d="M13 21l4-9 4 9M14.5 18h5"/>',
  shield: '<path d="M12 3l8 4v5c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V7z"/><path d="M9 12l2 2 4-4"/>',
  phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
  folder: '<path d="M3 6h7l2 2h9v11H3z"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
  gamepad: '<path d="M6 9h12a4 4 0 0 1 3.9 4.9l-1 4.3a2.4 2.4 0 0 1-4.2 1L15 17H9l-1.7 2.2a2.4 2.4 0 0 1-4.2-1l-1-4.3A4 4 0 0 1 6 9z"/><path d="M7.5 12v3M6 13.5h3"/><circle cx="15.5" cy="12.5" r=".6"/><circle cx="17.5" cy="14.5" r=".6"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  link: '<path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>',
};

export const icon = (name, cls = 'ico-svg') =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.flag}</svg>`;

/** Value of an example line → string in lang. */
function lineValue(v, lang) {
  if (typeof v === 'number') return money(v, lang);
  return t(v, lang);
}

/** Worked example rendered as a formula card (HTML, selectable). */
export function exampleCard(ex, lang) {
  const label = t(L('Example', 'উদাহরণ'), lang);
  const rows = ex.lines
    .map((l) => {
      const op = l.op ? `<span class="op" aria-hidden="true">${l.op}</span>` : '<span class="op" aria-hidden="true"></span>';
      const v = lineValue(l.value, lang);
      return `<div class="fx-row${l.result ? ' is-result' : ''}${l.tone ? ' tone-' + l.tone : ''}">${op}<dt>${esc(t(l.label, lang))}</dt><dd>${esc(l.digits ? num(v, lang) : v)}</dd></div>`;
    })
    .join('');
  return `<figure class="fx">
  <figcaption class="fx-head"><span class="fx-tag">${label}</span> ${esc(t(ex.title, lang))}</figcaption>
  <dl>${rows}</dl>
  ${ex.caption ? `<p class="fx-note">${esc(t(ex.caption, lang))}</p>` : ''}
</figure>`;
}

export const legalLinks = (lang, appPath, current) => {
  const items = [
    ['', L('Bahon Boi', 'বাহন বই')],
    ['guide', L('User guide', 'ব্যবহার নির্দেশিকা')],
    ['terms', L('Terms', 'শর্তাবলি')],
    ['privacy', L('Privacy Policy', 'গোপনীয়তা নীতি')],
    ['contact', L('Contact', 'যোগাযোগ')],
  ];
  return `<ul class="pill-links">${items
    .map(([k, lab]) => `<li><a href="${appPath(k)}"${k === current ? ' aria-current="page"' : ''}>${t(lab, lang)}</a></li>`)
    .join('')}</ul>`;
};

export const breadcrumb = (lang, items) =>
  `<nav class="breadcrumb" aria-label="${t(L('Breadcrumb', 'অবস্থান'), lang)}"><ol>${items
    .map(([href, label], i) =>
      i === items.length - 1
        ? `<li aria-current="page">${esc(t(label, lang))}</li>`
        : `<li><a href="${href}">${esc(t(label, lang))}</a></li>`,
    )
    .join('')}</ol></nav>`;

export const breadcrumbLd = (site, items, lang) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([href, label], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: t(label, lang),
    item: site + href,
  })),
});

// ---------------------------------------------------------------- screenshots
// Genuine captures from the current app (normal mode, demo mode off, fictional
// records), exported per language to /bahon-boi/assets/screens/<lang>-<key>.webp.
export const SCREENS = {
  dashboard: {
    title: L('Dashboard', 'ড্যাশবোর্ড'),
    text: L('The month at a glance: earned income, expenses, profit and what is still to collect.', 'এক নজরে মাস: অর্জিত আয়, খরচ, লাভ আর কত আদায় বাকি।'),
    alt: L('Bahon Boi dashboard showing earned income, expenses, profit, money to collect and a document alert for November.', 'বাহন বইয়ের ড্যাশবোর্ড: নভেম্বরের অর্জিত আয়, খরচ, লাভ, আদায় বাকি ও কাগজের সতর্কতা।'),
  },
  report: {
    title: L('Monthly report', 'মাসিক রিপোর্ট'),
    text: L('Income and expenses by month, with profit and loss for any period.', 'মাস অনুযায়ী আয় ও খরচ, যেকোনো সময়ের লাভ-ক্ষতিসহ।'),
    alt: L('Reports screen with a monthly income and expense chart and a profit and loss summary for the year.', 'রিপোর্টের পর্দা: মাসভিত্তিক আয়–খরচের গ্রাফ ও বছরের লাভ-ক্ষতির হিসাব।'),
  },
  vehicle: {
    title: L('Vehicle details', 'বাহনের বিস্তারিত'),
    text: L('Each vehicle’s own book: earned, received, settled against rent and still due.', 'প্রতিটি বাহনের আলাদা খাতা: অর্জিত, পাওয়া, ভাড়া থেকে সমন্বয় ও বাকি।'),
    alt: L('Vehicle screen for a CNG with an all-time summary, amounts still due today and the assigned night-shift driver.', 'একটি সিএনজির পর্দা: শুরু থেকে এ পর্যন্ত হিসাব, আজ পর্যন্ত বাকি ও রাতের শিফটের চালক।'),
  },
  drivers: {
    title: L('Drivers', 'চালক'),
    text: L('Every driver with phone, vehicle and masked ID numbers.', 'প্রত্যেক চালক — ফোন, বাহন ও আংশিক লুকানো আইডি নম্বরসহ।'),
    alt: L('Driver list with five drivers, the vehicle each one drives and masked NID and licence numbers.', 'পাঁচজন চালকের তালিকা, কে কোন বাহন চালান, আর আংশিক লুকানো এনআইডি ও লাইসেন্স নম্বর।'),
  },
};

export const shot = (lang, key, cls = '', eager = false) =>
  `<img class="shot${cls ? ' ' + cls : ''}" src="/bahon-boi/assets/screens/${lang}-${key}.webp" width="640" height="1314" alt="${esc(t(SCREENS[key].alt, lang))}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">`;

export const SHOTS_NOTE = L(
  'Real screenshots from the current app in normal use, filled with fictional example records.',
  'বর্তমান অ্যাপের আসল স্ক্রিনশট, স্বাভাবিক ব্যবহারে — কাল্পনিক উদাহরণের তথ্য দিয়ে।',
);
