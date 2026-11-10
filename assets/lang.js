// In-place language switching for apps.munna.dev. Loaded (not deferred) at the
// end of <body>, so a saved non-default language is applied before first paint.
//
// Each page holds its default language as normal HTML (#lang-root) and the
// other language in an inert <template id="lang-alt">. Switching swaps the two;
// the URL (path, ?query, #hash) is never touched. Each language scope keeps its
// own preference in localStorage (keys in #lang-data); when storage is blocked
// the choice still works for the current page, and defaults apply elsewhere.
(function () {
  'use strict';
  var d = document;
  var html = d.documentElement;
  var root = d.getElementById('lang-root');
  var tpl = d.getElementById('lang-alt');
  var dataEl = d.getElementById('lang-data');
  var done = function () { html.classList.remove('lang-pending'); };
  if (!root || !tpl || !dataEl) return done();

  var cfg;
  try { cfg = JSON.parse(dataEl.textContent); } catch (e) { return done(); }
  var LANGS = ['en', 'bn'];
  var memory = {}; // fallback when localStorage is unavailable

  function read(key) {
    var v = null;
    try { v = window.localStorage.getItem(key); } catch (e) { /* blocked */ }
    if (LANGS.indexOf(v) < 0) v = memory[key] || null;
    return v;
  }
  function save(key, v) {
    if (!key || LANGS.indexOf(v) < 0) return;
    memory[key] = v;
    try { window.localStorage.setItem(key, v); } catch (e) { /* blocked: this page only */ }
  }

  var current = cfg.def;
  var parked = {}; // language → DocumentFragment not on screen
  parked[tpl.getAttribute('data-lang')] = tpl.content;

  function setMeta(sel, attr, value) {
    var el = d.querySelector(sel);
    if (el && value) el.setAttribute(attr, value);
  }
  function applyMeta(lang) {
    var m = cfg.meta && cfg.meta[lang];
    if (!m) return;
    d.title = m.title;
    setMeta('meta[name="description"]', 'content', m.description);
    setMeta('meta[property="og:title"]', 'content', m.title);
    setMeta('meta[property="og:description"]', 'content', m.description);
    setMeta('meta[name="twitter:title"]', 'content', m.title);
    setMeta('meta[name="twitter:description"]', 'content', m.description);
    setMeta('meta[property="og:image"]', 'content', m.image);
    setMeta('meta[name="twitter:image"]', 'content', m.image);
    var other = cfg.meta[lang === 'en' ? 'bn' : 'en'];
    setMeta('meta[property="og:locale"]', 'content', m.locale);
    if (other) setMeta('meta[property="og:locale:alternate"]', 'content', other.locale);
  }

  // The element with an id nearest the top of the viewport, so the reader
  // stays at the same section after the text changes length.
  function anchorPoint() {
    if ((window.scrollY || window.pageYOffset) < 4) return null;
    var header = root.querySelector('[data-header]');
    var line = header ? header.getBoundingClientRect().bottom : 0;
    var els = root.querySelectorAll('main [id]');
    // Deepest element crossing the header line; else the first one below it.
    var best = null;
    for (var i = 0; i < els.length; i++) {
      if (els[i].closest('svg')) continue;
      var r = els[i].getBoundingClientRect();
      if (!r.height) continue;
      if (r.top <= line && r.bottom > line) best = { id: els[i].id, top: r.top };
      else if (r.top > line) { if (!best) best = { id: els[i].id, top: r.top }; break; }
    }
    return best;
  }

  function apply(lang) {
    if (lang === current || !parked[lang]) return false;
    var anchor = anchorPoint();
    var out = d.createDocumentFragment();
    while (root.firstChild) out.appendChild(root.firstChild);
    root.appendChild(parked[lang]);
    parked[current] = out;
    parked[lang] = null;
    current = lang;
    html.lang = lang;
    root.setAttribute('data-lang', lang);
    applyMeta(lang);
    if (anchor) {
      var el = d.getElementById(anchor.id);
      if (el) window.scrollTo(0, (window.scrollY || window.pageYOffset) + el.getBoundingClientRect().top - anchor.top);
    }
    var ev;
    try { ev = new CustomEvent('langchange', { detail: { lang: lang } }); }
    catch (e) { ev = d.createEvent('CustomEvent'); ev.initCustomEvent('langchange', false, false, { lang: lang }); }
    d.dispatchEvent(ev);
    return true;
  }

  d.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;
    var b = t.closest('[data-set-lang]');
    if (b) {
      e.preventDefault();
      var lang = b.getAttribute('data-set-lang');
      save(cfg.key, lang);
      if (apply(lang)) {
        var nb = root.querySelector('[data-set-lang="' + lang + '"]');
        if (nb) nb.focus({ preventScroll: true });
      }
      return;
    }
    // A link that opens another area in a chosen language, e.g. the hub's
    // "Open it in English" for Bahon Boi (data-prefer="bahonBoi:en").
    var p = t.closest('[data-prefer]');
    if (p) {
      var parts = p.getAttribute('data-prefer').split(':');
      save(cfg.keys && cfg.keys[parts[0]], parts[1]);
    }
  });

  var wanted = read(cfg.key);
  if (wanted && wanted !== cfg.def) apply(wanted);
  done();
})();
