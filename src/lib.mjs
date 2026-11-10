// Shared helpers for the static site generator. No dependencies.

export const LANGS = ['en', 'bn'];
export const SITE = 'https://apps.munna.dev';

/** A bilingual string. Every piece of copy goes through L() so the build can
 *  verify that both languages exist. */
export function L(en, bn) {
  if (typeof en !== 'string' || typeof bn !== 'string' || !en.trim() || !bn.trim()) {
    throw new Error(`Missing translation: en=${JSON.stringify(en)} bn=${JSON.stringify(bn)}`);
  }
  return { __l: true, en, bn };
}

/** Resolve a bilingual value (or plain string) to one language. */
export function t(v, lang) {
  if (v == null) return '';
  if (typeof v === 'string') return v;
  if (v.__l) return v[lang];
  throw new Error('Not a bilingual value: ' + JSON.stringify(v));
}

const BN_DIGITS = '০১২৩৪৫৬৭৮৯';
export const bnDigits = (s) => String(s).replace(/[0-9]/g, (d) => BN_DIGITS[d]);
export const num = (s, lang) => (lang === 'bn' ? bnDigits(s) : String(s));

/** South Asian grouping (12,34,567), like the app. */
export function group(n) {
  const neg = n < 0;
  const s = String(Math.abs(Math.round(n)));
  const last3 = s.slice(-3);
  let rest = s.slice(0, -3);
  const parts = [];
  while (rest.length > 2) {
    parts.unshift(rest.slice(-2));
    rest = rest.slice(0, -2);
  }
  if (rest) parts.unshift(rest);
  return (neg ? '−' : '') + [...parts, last3].join(',');
}

/** Money as the app shows it: ৳ joined to the number with a no-break space. */
export const money = (n, lang) => '৳ ' + num(group(n), lang);

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Throw if a computed example value is wrong. */
export function check(label, actual, expected) {
  if (actual !== expected) throw new Error(`Example check failed: ${label}: ${actual} !== ${expected}`);
  return actual;
}
