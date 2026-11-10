// Route table. Language rules:
//  - Hub: English at "/", Bengali at "/bn/".
//  - Bahon Boi: Bengali at "/bahon-boi/…", English at "/bahon-boi/en/…".
// Explicit URLs always render their own language; nothing redirects by browser language.

import { L } from './lib.mjs';

export const HUB = { en: '/', bn: '/bn/' };
export const APP = { bn: '/bahon-boi/', en: '/bahon-boi/en/' };

export const appPath = (lang, sub = '') => APP[lang] + (sub ? sub.replace(/^\/|\/$/g, '') + '/' : '');

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

export const guidePath = (lang, slug) => appPath(lang, slug ? `guide/${slug}` : 'guide');

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

// Dedicated games website (separate project). The hub links to it; game
// content and game pages stay there.
export const GAMES_URL = 'https://games.munna.dev';
