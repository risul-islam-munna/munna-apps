// Progressive enhancement only. Every page works fully without this file.
(function () {
  'use strict';
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var raf = window.requestAnimationFrame || function (f) { return setTimeout(f, 16); };

  // 1. Language switch keeps the current section (#hash) when one is open.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-keep-hash]');
    if (a && location.hash && a.href.indexOf('#') === -1) a.href = a.href + location.hash;
  });

  var header = document.querySelector('[data-header]');
  var nav = header && header.querySelector('.main-nav');
  var toggle = header && header.querySelector('.nav-toggle');

  // 2. Header: one row while it fits, otherwise a menu button. The decision is
  //    measured (brand + nav + tools vs. the row), so it holds for both
  //    languages and any font size — the nav never wraps or overlaps.
  if (header && nav && toggle) {
    var row = header.querySelector('.header-row');
    var brand = header.querySelector('.brand');
    var tools = header.querySelector('.header-tools');
    toggle.hidden = false;

    var setOpen = function (open, focusToggle) {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (!open && focusToggle) toggle.focus();
    };

    var fit = function () {
      var wasOpen = nav.classList.contains('open');
      header.classList.remove('is-compact');
      nav.classList.remove('open');
      var cs = getComputedStyle(row);
      var gap = parseFloat(cs.columnGap) || 0;
      var avail = row.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      var toggleW = toggle.offsetWidth; // 0 while hidden by CSS
      var need = brand.offsetWidth + nav.scrollWidth + (tools.offsetWidth - toggleW) + gap * 2 + 8;
      var compact = need > avail;
      header.classList.toggle('is-compact', compact);
      header.classList.add('is-measured');
      if (compact && wasOpen) setOpen(true);
      if (!compact) toggle.setAttribute('aria-expanded', 'false');
      root.style.setProperty('--header-h', header.offsetHeight + 'px');
    };

    toggle.addEventListener('click', function () { setOpen(!nav.classList.contains('open')); });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a') && header.classList.contains('is-compact')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) setOpen(false, true);
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('open') && !header.contains(e.target)) setOpen(false);
    });

    var fitQueued = false;
    var queueFit = function () {
      if (fitQueued) return;
      fitQueued = true;
      raf(function () { fitQueued = false; fit(); });
    };
    fit();
    window.addEventListener('resize', queueFit);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(queueFit);
  }

  // 3. Active in-page section. Only links pointing to a section of *this* page
  //    take part; links to other pages keep their own aria-current="page".
  //    Rule: the active section is the one under a line just below the sticky
  //    header; at the very bottom of the page, the last linked section that is
  //    visible wins. Exactly one link (or none, e.g. in the hero) is active.
  if (nav) {
    var here = location.pathname;
    var items = [];
    Array.prototype.forEach.call(nav.querySelectorAll('a[href*="#"]'), function (a) {
      var u = new URL(a.href, location.href);
      if (u.pathname !== here || !u.hash) return;
      var sec = document.getElementById(decodeURIComponent(u.hash.slice(1)));
      if (sec) items.push({ a: a, sec: sec, id: sec.id });
    });

    if (items.length) {
      var lockId = null, lockTimer = 0, current = undefined;
      var setActive = function (id) {
        if (id === current) return;
        current = id;
        items.forEach(function (it) {
          if (it.id === id) it.a.setAttribute('aria-current', 'location');
          else it.a.removeAttribute('aria-current');
        });
      };
      var compute = function () {
        if (lockId) return setActive(lockId);
        var line = (header ? header.offsetHeight : 0) + Math.min(120, window.innerHeight * 0.2);
        var vh = window.innerHeight;
        var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
        var found = null;
        if (atBottom) {
          for (var i = items.length - 1; i >= 0; i--) {
            var r = items[i].sec.getBoundingClientRect();
            if (r.top < vh && r.bottom > 0) { found = items[i].id; break; }
          }
        }
        if (!found) {
          items.forEach(function (it) {
            var r = it.sec.getBoundingClientRect();
            if (r.top <= line && r.bottom > line) found = it.id;
          });
        }
        setActive(found);
      };
      var queued = false;
      var queue = function () {
        if (queued) return;
        queued = true;
        raf(function () { queued = false; compute(); });
      };
      // A clicked link stays active while the (smooth) scroll travels past
      // other sections; the lock ends once scrolling has settled.
      var release = function () {
        clearTimeout(lockTimer);
        lockTimer = setTimeout(function () { lockId = null; compute(); }, 160);
      };
      items.forEach(function (it) {
        it.a.addEventListener('click', function () { lockId = it.id; setActive(it.id); release(); });
      });
      window.addEventListener('scroll', function () { queue(); if (lockId) release(); }, { passive: true });
      window.addEventListener('resize', queue);
      window.addEventListener('hashchange', queue);
      window.addEventListener('popstate', queue);
      window.addEventListener('load', queue);
      if ('IntersectionObserver' in window) {
        var so = new IntersectionObserver(queue, { threshold: [0, 0.01, 0.5, 1] });
        items.forEach(function (it) { so.observe(it.sec); });
      }
      compute();
    }
  }

  // 4. Accounting bars grow once when scrolled into view. Without JS (or with
  //    reduced motion) the final values are shown straight away.
  if (reduce || !('IntersectionObserver' in window)) return;
  var stories = document.querySelectorAll('[data-animate]');
  if (!stories.length) return;
  root.classList.add('anim');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in-view'); io.unobserve(en.target); }
    });
  }, { threshold: 0.35 });
  stories.forEach(function (s) { io.observe(s); });
})();
