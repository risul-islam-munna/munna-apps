// User guide: index and one page per topic.

import { L, t, esc, SITE } from '../lib.mjs';
import { APP, HUB, appPath, guidePath, GUIDE_TOPICS } from '../routes.mjs';
import { icon, exampleCard, breadcrumb, breadcrumbLd, legalLinks } from '../components.mjs';
import { GROUPS, TOPICS, NOT_AVAILABLE } from '../content/guide.mjs';
import { assignmentTimeline, reportChart, docTimeline, backupFlow } from '../svg.mjs';

const FIGURES = { assignment: assignmentTimeline, chart: reportChart, docs: docTimeline, backup: backupFlow };

const crumbs = (lang, extra = []) => [
  [HUB, L('Apps', 'অ্যাপস')],
  [APP, L('Bahon Boi', 'বাহন বই')],
  [guidePath(), L('User guide', 'ব্যবহার নির্দেশিকা')],
  ...extra,
];

export function guideIndex(lang) {
  const T = (en, bn) => t(L(en, bn), lang);
  const items = crumbs(lang);
  const groups = GROUPS.map(
    (gr) => `<section class="g-group" aria-labelledby="g-${gr.topics[0]}">
      <h2 id="g-${gr.topics[0]}">${t(gr.title, lang)}</h2>
      <ul class="topic-list">${gr.topics
        .map((slug) => {
          const tp = TOPICS[slug];
          return `<li><a href="${guidePath(slug)}"><span class="ico">${icon(tp.icon)}</span><span><b>${t(tp.title, lang)}</b><span>${t(tp.summary, lang)}</span></span></a></li>`;
        })
        .join('')}</ul>
    </section>`,
  ).join('');
  const body = `<section class="section-tight page-head">
  <div class="wrap">
    ${breadcrumb(lang, items)}
    <h1>${T('Bahon Boi user guide', 'বাহন বই ব্যবহার নির্দেশিকা')}</h1>
    <p class="lede">${T(
      'Step-by-step help for every feature in the current version, using the app’s own screen and button names. Example figures are for illustration only.',
      'বর্তমান সংস্করণের প্রতিটি ফিচারের ধাপে ধাপে সাহায্য, অ্যাপের নিজের পর্দা ও বোতামের নাম দিয়ে। উদাহরণের অঙ্কগুলো শুধু বোঝানোর জন্য।',
    )}</p>
    <p class="muted">${T('The same guide is built into the app: Menu (☰) → App guide. It works offline.', 'একই নির্দেশিকা অ্যাপের ভেতরেও আছে: মেনু (☰) → অ্যাপ ব্যবহারের নির্দেশিকা। ইন্টারনেট ছাড়াই চলে।')}</p>
  </div>
</section>
<section class="section-tight">
  <div class="wrap guide-index">
    ${groups}
    <section class="g-group not-available" aria-labelledby="g-na">
      <h2 id="g-na">${T('Not available in this version', 'এই সংস্করণে যা নেই')}</h2>
      <p class="muted">${T('So you know what not to look for:', 'কী খুঁজবেন না, তা জানাতে:')}</p>
      <ul class="cross">${NOT_AVAILABLE.map((x) => `<li>${t(x, lang)}</li>`).join('')}</ul>
    </section>
    ${legalLinks(lang, appPath, 'guide')}
  </div>
</section>`;
  return {
    title: T('User guide — Bahon Boi', 'ব্যবহার নির্দেশিকা — বাহন বই'),
    description: T(
      'Step-by-step Bahon Boi guide: vehicles, owners, drivers, income, money received, expenses, rent adjustments, profit and cash, reports, documents, and backup and restore.',
      'বাহন বইয়ের ধাপে ধাপে নির্দেশিকা: বাহন, মালিক, চালক, আয়, টাকা পাওয়া, খরচ, ভাড়া সমন্বয়, লাভ ও নগদ, রিপোর্ট, কাগজপত্র এবং ব্যাকআপ ও রিস্টোর।',
    ),
    body,
    current: 'guide',
    jsonld: { '@context': 'https://schema.org', ...breadcrumbLd(SITE, items, lang) },
  };
}

export function guideTopic(lang, slug) {
  const T = (en, bn) => t(L(en, bn), lang);
  const tp = TOPICS[slug];
  const i = GUIDE_TOPICS.indexOf(slug);
  const prev = GUIDE_TOPICS[i - 1], next = GUIDE_TOPICS[i + 1];
  const items = crumbs(lang, [[guidePath(slug), tp.title]]);
  const list = (arr, cls = '') => `<ul class="${cls}">${arr.map((x) => `<li>${esc(t(x, lang))}</li>`).join('')}</ul>`;
  const sec = (id, title, html) => `<section class="gt-sec" aria-labelledby="${id}"><h2 id="${id}">${title}</h2>${html}</section>`;
  const fig = tp.figure ? `<figure class="art-fig">${FIGURES[tp.figure](lang)}</figure>` : '';

  const body = `<section class="section-tight page-head">
  <div class="wrap">
    ${breadcrumb(lang, items)}
    <div class="topic-title"><span class="ico big">${icon(tp.icon)}</span><h1>${esc(t(tp.title, lang))}</h1></div>
    <p class="lede">${esc(t(tp.summary, lang))}</p>
  </div>
</section>
<section class="section-tight">
  <div class="wrap guide-layout">
    <nav class="toc" aria-label="${T('On this page', 'এই পেজে')}">
      <b>${T('On this page', 'এই পেজে')}</b>
      <ol>
        <li><a href="#when">${T('When to use it', 'কখন ব্যবহার করবেন')}</a></li>
        <li><a href="#where">${T('Where to find it', 'কোথায় পাবেন')}</a></li>
        <li><a href="#need">${T('What you need', 'যা লাগবে')}</a></li>
        <li><a href="#steps">${T('Steps', 'ধাপ')}</a></li>
        ${tp.examples ? `<li><a href="#examples">${T('Examples', 'উদাহরণ')}</a></li>` : ''}
        <li><a href="#result">${T('Result', 'ফলাফল')}</a></li>
        <li><a href="#mistakes">${T('Mistakes and exceptions', 'ভুল ও ব্যতিক্রম')}</a></li>
        <li><a href="#fix">${T('Correct or undo', 'ঠিক করা বা বাতিল')}</a></li>
      </ol>
    </nav>
    <article class="guide-body">
      ${sec('when', T('When to use it', 'কখন ব্যবহার করবেন'), `<p>${esc(t(tp.when, lang))}</p>`)}
      ${sec('where', T('Where to find it', 'কোথায় পাবেন'), `<ul class="path-list">${tp.where.map((x) => `<li>${icon('arrow', 'arr')}<span>${esc(t(x, lang))}</span></li>`).join('')}</ul>`)}
      ${sec('need', T('What you need', 'যা লাগবে'), list(tp.need, 'checks'))}
      ${sec('steps', T('Steps', 'ধাপ'), `<ol class="num-steps">${tp.steps.map((s) => `<li>${esc(t(s, lang))}</li>`).join('')}</ol>${fig}`)}
      ${tp.examples ? sec('examples', T('Examples', 'উদাহরণ'), `<div class="fx-grid">${tp.examples.map((e) => exampleCard(e, lang)).join('')}</div><p class="muted small">${T('All amounts are examples.', 'সব অঙ্ক উদাহরণ।')}</p>`) : ''}
      ${sec('result', T('Result', 'ফলাফল'), `<p class="result-box">${esc(t(tp.result, lang))}</p>`)}
      ${sec('mistakes', T('Mistakes and exceptions', 'ভুল ও ব্যতিক্রম'), list(tp.mistakes, 'warn-list'))}
      ${sec('fix', T('Correct or undo', 'ঠিক করা বা বাতিল'), list(tp.fix, 'checks'))}
      <section class="gt-sec related" aria-labelledby="rel">
        <h2 id="rel">${T('Related topics', 'সম্পর্কিত বিষয়')}</h2>
        <ul class="pill-links">${tp.related.map((r) => `<li><a href="${guidePath(r)}">${esc(t(TOPICS[r].title, lang))}</a></li>`).join('')}</ul>
      </section>
      <nav class="prev-next" aria-label="${T('Guide pages', 'নির্দেশিকার পেজ')}">
        ${prev ? `<a class="pn prev" href="${guidePath(prev)}"><small>${T('Previous', 'আগের')}</small>${esc(t(TOPICS[prev].title, lang))}</a>` : `<a class="pn prev" href="${guidePath()}"><small>${T('Back to', 'ফিরে যান')}</small>${T('All topics', 'সব বিষয়')}</a>`}
        ${next ? `<a class="pn next" href="${guidePath(next)}"><small>${T('Next', 'পরের')}</small>${esc(t(TOPICS[next].title, lang))}</a>` : `<a class="pn next" href="${APP}"><small>${T('Back to', 'ফিরে যান')}</small>${T('Bahon Boi', 'বাহন বই')}</a>`}
      </nav>
    </article>
  </div>
</section>`;
  return {
    title: `${t(tp.title, lang)} — ${T('Bahon Boi guide', 'বাহন বই নির্দেশিকা')}`,
    description: t(tp.summary, lang),
    body,
    current: 'guide',
    ogType: 'article',
    jsonld: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'HowTo',
          name: t(tp.title, lang),
          description: t(tp.summary, lang),
          inLanguage: lang,
          step: tp.steps.map((s, k) => ({ '@type': 'HowToStep', position: k + 1, text: t(s, lang) })),
        },
        breadcrumbLd(SITE, items, lang),
      ],
    },
  };
}
