// Route table. One canonical URL per page; both languages are served from it.
//  - The language shown is chosen in the browser (assets/lang.js) from the
//    visitor's saved choice for that page's language scope, else the scope's
//    default. Nothing reads the browser language; nothing adds ?lang or #lang.
//  - Old language-specific URLs (/bn/, /bahon-boi/en/…) are kept as tiny
//    redirect stubs (LEGACY below), not as content pages.

import { L } from './lib.mjs';

export const HUB = '/';
export const APP = '/bahon-boi/';

export const appPath = (sub = '') => APP + (sub ? sub.replace(/^\/|\/$/g, '') + '/' : '');

export const GUIDE_TOPICS = [
  'getting-started',
  'vehicles-owners',
  'drivers',
  'income',
  'money-received',
  'expenses',
  'rent-adjustments',
  'profit-and-cash',
  'reports',
  'documents',
  'backup-restore',
];

export const guidePath = (slug) => appPath(slug ? `guide/${slug}` : 'guide');

// Language scopes: each area keeps its own saved preference and default.
export const SCOPES = {
  munnaApps: { storageKey: 'munnaApps.language', defaultLanguage: 'en' },
  bahonBoi: { storageKey: 'bahonBoi.language', defaultLanguage: 'bn' },
};
// Page area → layout configuration (scope + default language).
export const AREAS = {
  hub: { languageScope: 'munnaApps', defaultLanguage: SCOPES.munnaApps.defaultLanguage },
  app: { languageScope: 'bahonBoi', defaultLanguage: SCOPES.bahonBoi.defaultLanguage },
};

// Legacy language URLs → [canonical path, scope, language they stood for].
export const LEGACY = [
  ['/bn/', HUB, 'munnaApps', 'bn'],
  ['/bahon-boi/en/', APP, 'bahonBoi', 'en'],
  ['/bahon-boi/en/guide/', guidePath(), 'bahonBoi', 'en'],
  ...GUIDE_TOPICS.map((s) => [`/bahon-boi/en/guide/${s}/`, guidePath(s), 'bahonBoi', 'en']),
  ...['contact', 'terms', 'privacy'].map((k) => [`/bahon-boi/en/${k}/`, appPath(k), 'bahonBoi', 'en']),
];

// Dedicated games website (separate project). The hub links to it; game
// content and game pages stay there.
export const GAMES_URL = 'https://games.munna.dev';

export const NAV_LABELS = {
  features: L('Features', 'ফিচার'),
  guide: L('User guide', 'ব্যবহার নির্দেশিকা'),
  faq: L('FAQ', 'প্রশ্নোত্তর'),
  contact: L('Contact', 'যোগাযোগ'),
  allApps: L('All apps', 'সব অ্যাপ'),
  terms: L('Terms', 'শর্তাবলি'),
  privacy: L('Privacy', 'গোপনীয়তা'),
  apps: L('Apps', 'অ্যাপস'),
  developer: L('Developer', 'ডেভেলপার'),
  games: L('Games', 'গেমস'),
};
