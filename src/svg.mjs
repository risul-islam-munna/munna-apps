// Original inline SVG illustrations. Colours come from CSS classes (s-*) so they
// follow light/dark themes. Every figure uses example values only.

import { L, t, money, num, esc, check } from './lib.mjs';

const svgOpen = (lang, vb, title, desc, cls = '') =>
  `<svg class="ill ${cls}" viewBox="${vb}" role="img" aria-labelledby="${title.id} ${desc.id}" xmlns="http://www.w3.org/2000/svg">` +
  `<title id="${title.id}">${esc(t(title.text, lang))}</title><desc id="${desc.id}">${esc(t(desc.text, lang))}</desc>`;

// ---------------------------------------------------------------- vehicle icons
const VPATH = {
  bus: '<rect x="7" y="9" width="34" height="25" rx="4"/><path d="M7 21h34M13 13h8v6h-8zM27 13h8v6h-8z"/><circle cx="15" cy="37" r="3"/><circle cx="33" cy="37" r="3"/>',
  car: '<path d="M6 30v-5l4-8c1-2 2-3 5-3h18c3 0 4 1 5 3l4 8v5z"/><path d="M11 23h26"/><circle cx="14" cy="32" r="3.5"/><circle cx="34" cy="32" r="3.5"/>',
  cng: '<path d="M10 33V18c0-5 4-9 9-9h6c6 0 11 5 11 11v13z"/><path d="M10 20h26M22 9v24"/><circle cx="14" cy="36" r="3.5"/><circle cx="34" cy="36" r="3.5"/>',
  auto: '<path d="M8 13h28M10 13v16M34 13v16"/><path d="M8 29h32l2-6h-8"/><path d="M14 22h12"/><circle cx="13" cy="34" r="3.5"/><circle cx="35" cy="34" r="3.5"/>',
  truck: '<rect x="5" y="11" width="24" height="20" rx="2"/><path d="M29 17h7l6 7v7H29z"/><circle cx="12" cy="34" r="3.5"/><circle cx="36" cy="34" r="3.5"/>',
  pickup: '<path d="M5 30v-7h18V14h10l6 9h4v7z"/><path d="M27 17v6"/><circle cx="12" cy="32" r="3.5"/><circle cx="35" cy="32" r="3.5"/>',
  motorcycle: '<circle cx="11" cy="31" r="6"/><circle cx="37" cy="31" r="6"/><path d="M11 31l8-12h9l9 12M24 19l-3-6h-5M28 19h6"/>',
  other: '<rect x="8" y="8" width="13" height="13" rx="3"/><rect x="27" y="8" width="13" height="13" rx="3"/><rect x="8" y="27" width="13" height="13" rx="3"/><path d="M33.5 28v11M28 33.5h11"/>',
};

export const VEHICLES = [
  ['bus', L('Bus', 'বাস')],
  ['car', L('Private car', 'প্রাইভেট কার')],
  ['cng', L('CNG', 'সিএনজি')],
  ['auto', L('Auto-rickshaw', 'অটোরিকশা')],
  ['truck', L('Truck', 'ট্রাক')],
  ['pickup', L('Pickup', 'পিকআপ')],
  ['motorcycle', L('Motorcycle', 'মোটরসাইকেল')],
  ['other', L('Other (your own type)', 'অন্যান্য (নিজের দেওয়া নাম)')],
];

export const vehicleIcon = (k) =>
  `<svg class="vicon" viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${VPATH[k]}</svg>`;

// ---------------------------------------------------------------- app hero
/** Phone + ledger + vehicle + driver. Uses the landing page's main example. */
export function assignmentTimeline(lang) {
  const T = (en, bn) => esc(t(L(en, bn), lang));
  const hours = ['6:00', '12:00', '18:00', '24:00', '6:00'];
  const x0 = 150, w = 380;
  return (
    svgOpen(
      lang,
      '0 0 560 250',
      { id: `as-t-${lang}`, text: L('Two drivers on one vehicle', 'একটি বাহনে দুইজন চালক') },
      {
        id: `as-d-${lang}`,
        text: L(
          'Example: Driver A works the day shift from 6:00 to 18:00 and Driver B the night shift from 18:00 to 6:00 the next morning. An earlier driver whose assignment ended stays in the history.',
          'উদাহরণ: চালক ক দিনের শিফটে ৬:০০ থেকে ১৮:০০, চালক খ রাতের শিফটে ১৮:০০ থেকে পরদিন সকাল ৬:০০। আগের যে চালকের নিয়োগ শেষ হয়েছে, তিনি ইতিহাসে থেকে যান।',
        ),
      },
    ) +
    hours.map((h, i) => `<text class="s-muted" x="${x0 + (i * w) / 4}" y="30" font-size="12" text-anchor="middle">${num(h, lang)}</text><path class="s-grid-line" d="M${x0 + (i * w) / 4} 40v170"/>`).join('') +
    `<text class="s-ink" x="16" y="78" font-size="14" font-weight="600">${T('Driver A', 'চালক ক')}</text><text class="s-muted" x="16" y="96" font-size="12">${T('Day shift', 'দিনের শিফট')}</text>` +
    `<rect class="s-accent-f" x="${x0}" y="64" width="${w / 2}" height="34" rx="10"/>` +
    `<text class="s-ink" x="16" y="138" font-size="14" font-weight="600">${T('Driver B', 'চালক খ')}</text><text class="s-muted" x="16" y="156" font-size="12">${T('Night shift', 'রাতের শিফট')}</text>` +
    `<rect class="s-ink-f" x="${x0 + w / 2}" y="124" width="${w / 2}" height="34" rx="10"/>` +
    `<text class="s-on-ink" x="${x0 + (3 * w) / 4}" y="146" font-size="12" text-anchor="middle">${T('crosses midnight', 'মাঝরাত পেরিয়ে')}</text>` +
    `<text class="s-muted" x="16" y="196" font-size="13">${T('Earlier driver', 'আগের চালক')}</text>` +
    `<rect class="s-ended" x="${x0}" y="182" width="${w}" height="24" rx="8"/>` +
    `<text class="s-muted" x="${x0 + w / 2}" y="199" font-size="12" text-anchor="middle">${T('Assignment ended — kept in history', 'নিয়োগ শেষ — ইতিহাসে থাকে')}</text>` +
    `</svg>`
  );
}

// ---------------------------------------------------------------- report chart
export function reportChart(lang) {
  const months = [L('Jan', 'জানু'), L('Feb', 'ফেব্রু'), L('Mar', 'মার্চ'), L('Apr', 'এপ্রিল')];
  const earned = [28000, 30000, 26000, 31000];
  const spent = [9000, 12500, 7000, 15000];
  const max = 32000, H = 170, base = 210, bw = 34;
  const bars = months
    .map((mo, i) => {
      const x = 80 + i * 112;
      const he = (earned[i] / max) * H, hs = (spent[i] / max) * H;
      return (
        `<rect class="s-pos-f" x="${x}" y="${base - he}" width="${bw}" height="${he}" rx="5"/>` +
        `<rect class="s-neg-f" x="${x + bw + 6}" y="${base - hs}" width="${bw}" height="${hs}" rx="5"/>` +
        `<text class="s-muted" x="${x + bw + 3}" y="${base + 22}" font-size="13" text-anchor="middle">${esc(t(mo, lang))}</text>`
      );
    })
    .join('');
  const T = (en, bn) => esc(t(L(en, bn), lang));
  return (
    svgOpen(
      lang,
      '0 0 540 270',
      { id: `rc-t-${lang}`, text: L('Income and expense chart (example)', 'আয়–খরচের গ্রাফ (উদাহরণ)') },
      {
        id: `rc-d-${lang}`,
        text: L(
          `Example bar chart for four months. Earned income: ${earned.map((v) => money(v, 'en')).join(', ')}; expenses: ${spent.map((v) => money(v, 'en')).join(', ')}.`,
          `চার মাসের উদাহরণ গ্রাফ। অর্জিত আয়: ${earned.map((v) => money(v, 'bn')).join(', ')}; খরচ: ${spent.map((v) => money(v, 'bn')).join(', ')}।`,
        ),
      },
    ) +
    `<path class="s-grid-line" d="M60 ${base}h460M60 ${base - H / 2}h460M60 ${base - H}h460"/>` +
    bars +
    `<g transform="translate(70 20)"><rect class="s-pos-f" width="14" height="14" rx="3"/><text class="s-ink" x="22" y="12" font-size="13">${T('Earned income', 'অর্জিত আয়')}</text>` +
    `<rect class="s-neg-f" x="170" width="14" height="14" rx="3"/><text class="s-ink" x="192" y="12" font-size="13">${T('Expenses', 'খরচ')}</text>` +
    `<text class="s-muted" x="440" y="12" font-size="12" text-anchor="end">${T('Example', 'উদাহরণ')}</text></g>` +
    `</svg>`
  );
}

// ---------------------------------------------------------------- document states
export function docTimeline(lang) {
  const T = (en, bn) => esc(t(L(en, bn), lang));
  return (
    svgOpen(
      lang,
      '0 0 560 200',
      { id: `dt-t-${lang}`, text: L('Document expiry states', 'কাগজের মেয়াদের অবস্থা') },
      {
        id: `dt-d-${lang}`,
        text: L(
          'Timeline: a document is Valid until its warning period starts, Expiring soon during the warning days (30 days if none chosen), and Expired after the expiry date. Alerts appear inside the app only.',
          'টাইমলাইন: সতর্কতার সময় শুরু হওয়া পর্যন্ত কাগজ বৈধ, সতর্কতার দিনগুলোতে (কিছু না বাছলে ৩০ দিন) শিগগিরই শেষ, আর মেয়াদের তারিখের পরে মেয়াদ শেষ। সতর্কতা শুধু অ্যাপের ভেতরে দেখায়।',
        ),
      },
    ) +
    `<rect class="s-pos-f" x="30" y="80" width="280" height="22" rx="11"/>` +
    `<rect class="s-warn-f" x="300" y="80" width="140" height="22"/>` +
    `<rect class="s-neg-f" x="440" y="80" width="90" height="22" rx="11"/><rect class="s-neg-f" x="440" y="80" width="20" height="22"/>` +
    `<text class="s-ink" x="170" y="64" font-size="14" font-weight="600" text-anchor="middle">${T('Valid', 'বৈধ')}</text>` +
    `<text class="s-ink" x="370" y="64" font-size="14" font-weight="600" text-anchor="middle">${T('Expiring soon', 'শিগগিরই শেষ')}</text>` +
    `<text class="s-ink" x="485" y="64" font-size="14" font-weight="600" text-anchor="middle">${T('Expired', 'মেয়াদ শেষ')}</text>` +
    `<path class="s-ink-stroke" d="M300 112v26M440 112v26" stroke-width="2"/>` +
    `<text class="s-muted" x="300" y="158" font-size="12" text-anchor="middle">${T('Warning starts', 'সতর্কতা শুরু')}</text>` +
    `<text class="s-muted" x="300" y="176" font-size="12" text-anchor="middle">${T('(your days, or 30)', '(আপনার বাছা দিন, বা ৩০)')}</text>` +
    `<text class="s-muted" x="440" y="158" font-size="12" text-anchor="middle">${T('Expiry date', 'মেয়াদের তারিখ')}</text>` +
    `</svg>`
  );
}

// ---------------------------------------------------------------- backup flow
export function backupFlow(lang) {
  const T = (en, bn) => esc(t(L(en, bn), lang));
  const step = (x, n, icon, a, b) =>
    `<g transform="translate(${x} 30)"><rect class="s-card" width="118" height="150" rx="16"/>` +
    `<circle class="s-accent-f" cx="22" cy="22" r="13"/><text class="s-on-accent" x="22" y="27" font-size="13" font-weight="700" text-anchor="middle">${num(n, lang)}</text>` +
    `<g transform="translate(35 40)" class="s-icon">${icon}</g>` +
    `<text class="s-ink" x="59" y="116" font-size="12.5" font-weight="600" text-anchor="middle">${a}</text>` +
    `<text class="s-muted" x="59" y="134" font-size="11" text-anchor="middle">${b}</text></g>`;
  const phone = '<rect x="10" y="0" width="28" height="48" rx="6"/><path d="M20 41h8"/>';
  const folder = '<path d="M2 10h18l5 6h21v28H2z"/><path d="M14 30h20"/>';
  const pc = '<rect x="2" y="4" width="44" height="30" rx="3"/><path d="M14 44h20M24 34v10"/>';
  const restore = '<rect x="10" y="0" width="28" height="48" rx="6"/><path d="M18 24a6 6 0 1 0 2-5M17 14v6h6"/>';
  const arrow = (x) => `<path class="s-arrow" d="M${x} 105h18m-6-6 6 6-6 6"/>`;
  return (
    svgOpen(
      lang,
      '0 0 560 210',
      { id: `bf-t-${lang}`, text: L('How backup and restore work', 'ব্যাকআপ ও রিস্টোর যেভাবে কাজ করে') },
      {
        id: `bf-d-${lang}`,
        text: L(
          'Four steps: 1, the app saves backups on the phone; 2, into the BahonBoi Backups folder you chose; 3, you copy that folder off the phone to a computer or USB drive; 4, on a new phone you copy it back and use Restore existing data.',
          'চার ধাপ: ১, অ্যাপ ফোনে ব্যাকআপ রাখে; ২, আপনার বাছাই করা BahonBoi Backups ফোল্ডারে; ৩, আপনি ফোল্ডারটি ফোনের বাইরে কম্পিউটার বা পেনড্রাইভে কপি করেন; ৪, নতুন ফোনে কপি করে "আগের তথ্য রিস্টোর" ব্যবহার করেন।',
        ),
      },
    ) +
    step(4, 1, phone, T('Bahon Boi', 'বাহন বই'), T('backs up daily', 'প্রতিদিন ব্যাকআপ')) +
    arrow(124) +
    step(146, 2, folder, 'BahonBoi Backups', T('folder you chose', 'আপনার বাছা ফোল্ডার')) +
    arrow(266) +
    step(288, 3, pc, T('Copy off the phone', 'ফোনের বাইরে কপি'), T('computer or USB', 'কম্পিউটার বা পেনড্রাইভ')) +
    arrow(408) +
    step(430, 4, restore, T('Restore', 'রিস্টোর'), T('same or new phone', 'একই বা নতুন ফোন')) +
    `</svg>`
  );
}

export { check };
