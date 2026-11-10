// Hub: English at "/", Bengali at "/bn/". A broad introduction to Munna Apps:
// apps (featured: Bahon Boi) and a gateway to the separate games website.
// "Learn about Bahon Boi" always opens the Bengali landing page (/bahon-boi/),
// as agreed. Game content stays on games.munna.dev — no catalog here.

import { L, t, SITE } from '../lib.mjs';
import { APP, HUB, GAMES_URL, guidePath } from '../routes.mjs';
import { icon, shot, SHOTS_NOTE } from '../components.mjs';

// Original decorative art (hidden from assistive tech; the cards carry text).
const APPS_ART = `<svg class="pc-svg" viewBox="0 0 200 140" aria-hidden="true" focusable="false">
  <rect x="62" y="6" width="76" height="128" rx="14" class="s-phone"/>
  <rect x="67" y="14" width="66" height="112" rx="9" class="s-screen"/>
  <rect x="74" y="24" width="52" height="16" rx="5" class="s-accent-soft-f"/>
  <rect x="74" y="46" width="24" height="20" rx="5" class="s-card"/>
  <rect x="102" y="46" width="24" height="20" rx="5" class="s-card"/>
  <path d="M80 100v-10M90 100V80M100 100v-14M110 100V74M120 100v-8" class="pc-bars"/>
  <rect x="74" y="108" width="52" height="8" rx="4" class="s-card"/>
</svg>`;

const GAMES_ART = `<svg class="pc-svg" viewBox="0 0 200 140" aria-hidden="true" focusable="false">
  <g class="pc-bricks">
    <rect x="36" y="10" width="28" height="11" rx="3"/><rect x="68" y="10" width="28" height="11" rx="3"/><rect x="100" y="10" width="28" height="11" rx="3"/><rect x="132" y="10" width="28" height="11" rx="3"/>
    <rect x="52" y="25" width="28" height="11" rx="3"/><rect x="116" y="25" width="28" height="11" rx="3"/>
  </g>
  <circle cx="98" cy="50" r="5" class="pc-ball"/>
  <path d="M60 66h80a26 26 0 0 1 25 33l-6 22a12 12 0 0 1-21 4l-12-15H74l-12 15a12 12 0 0 1-21-4l-6-22a26 26 0 0 1 25-33z" class="pc-pad"/>
  <path d="M66 86v18M57 95h18" class="pc-dpad"/>
  <circle cx="136" cy="88" r="5" class="pc-b1"/><circle cx="148" cy="99" r="5" class="pc-b2"/><circle cx="124" cy="99" r="5" class="pc-b3"/>
</svg>`;

export function hubPage(lang) {
  const T = (en, bn) => t(L(en, bn), lang);
  const ext = icon('external');

  const hero = `<section class="hub-hero" aria-labelledby="hub-title">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="eyebrow">${T('Munna Apps · by Md. Risul Islam Munna', 'Munna Apps · Md. Risul Islam Munna-এর অ্যাপ ও গেম')}</p>
      <h1 id="hub-title">${T('Useful apps. <em>Enjoyable games.</em>', 'কাজের অ্যাপ, <em>আনন্দের গেম।</em>')}</h1>
      <p class="lede">${T(
        'I build mobile apps that make a specific everyday job easier, and Android games with a classic, pick-up-and-play feel — each one made with care in Dhaka, Bangladesh.',
        'নির্দিষ্ট দৈনন্দিন কাজ সহজ করার মোবাইল অ্যাপ আর ক্লাসিক ধাঁচের, যখন-তখন খেলা যায় এমন অ্যান্ড্রয়েড গেম তৈরি করি — প্রতিটিই যত্ন নিয়ে, ঢাকা, বাংলাদেশে।',
      )}</p>
      <div class="btn-row">
        <a class="btn btn-primary" href="#apps">${icon('phone')} ${T('Explore apps', 'অ্যাপস দেখুন')}</a>
        <a class="btn btn-games" href="${GAMES_URL}" rel="noopener">${icon('gamepad')} ${T('Explore games', 'গেমস দেখুন')}</a>
      </div>
    </div>
    <div class="portal">
      <a class="portal-card pc-apps" href="#apps">
        ${APPS_ART}
        <span class="pc-text"><b>${T('Apps', 'অ্যাপস')}</b><span>${T('Focused tools for real jobs', 'বাস্তব কাজের জন্য নির্দিষ্ট টুল')}</span></span>
        <span class="pc-go">${T('On this page', 'এই পেজে')} ${icon('arrow')}</span>
      </a>
      <a class="portal-card pc-games" href="${GAMES_URL}" rel="noopener">
        ${GAMES_ART}
        <span class="pc-text"><b>${T('Games', 'গেমস')}</b><span>${T('Android games, just for fun', 'শুধু আনন্দের জন্য অ্যান্ড্রয়েড গেম')}</span></span>
        <span class="pc-go" lang="en">games.munna.dev ${ext}</span>
      </a>
    </div>
  </div>
</section>`;

  const games = `<section class="section-tight" aria-labelledby="games-title">
  <div class="wrap">
    <div class="games-band">
      <span class="ico big gb-ico">${icon('gamepad')}</span>
      <div class="gb-text">
        <p class="eyebrow">${T('Games', 'গেমস')}</p>
        <h2 id="games-title">${T('I make games too', 'গেমও বানাই')}</h2>
        <p>${T(
          'Alongside apps, I develop a small, growing collection of Android games. They have their own website, with a page for each game.',
          'অ্যাপের পাশাপাশি অ্যান্ড্রয়েড গেমও তৈরি করি — ছোট কিন্তু বাড়তে থাকা একটি সংগ্রহ। গেমগুলোর জন্য আলাদা ওয়েবসাইট আছে, প্রতিটি গেমের নিজস্ব পেজসহ।',
        )}</p>
      </div>
      <a class="btn btn-games" href="${GAMES_URL}" rel="noopener">${T('Visit the games website', 'গেমসের ওয়েবসাইটে যান')} ${ext}</a>
    </div>
  </div>
</section>`;

  const featured = `<section class="section featured" id="apps" aria-labelledby="apps-title">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">${T('Apps', 'অ্যাপস')}</p>
      <h2 id="apps-title">${T('Featured app', 'প্রধান অ্যাপ')}</h2>
      <p class="muted">${T(
        'Each app focuses on one clear job and has its own page with the full details, a user guide and support.',
        'প্রতিটি অ্যাপ একটি নির্দিষ্ট কাজের জন্য, আর প্রতিটির নিজস্ব পেজে আছে বিস্তারিত তথ্য, ব্যবহার নির্দেশিকা ও সহায়তা।',
      )}</p>
    </div>
    <article class="feature-panel" aria-labelledby="bb-name">
      <div class="fp-main">
        <div class="fp-id">
          <img src="/bahon-boi/assets/logo-320.webp" width="96" height="96" alt="${T('Bahon Boi app icon: a car above an open book', 'বাহন বই অ্যাপের আইকন: খোলা বইয়ের ওপর একটি গাড়ি')}">
          <div>
            <h3 id="bb-name"><span lang="bn">বাহন বই</span> <span class="en" lang="en">Bahon Boi</span></h3>
            <p class="tagline">${T('Every vehicle’s accounts, in one book.', 'সব বাহনের হিসাব, এক বইয়ে।')}</p>
          </div>
        </div>
        <p>${T(
          'A bookkeeping app for vehicle owners and small transport businesses in Bangladesh. It shows what each vehicle earned, what drivers have paid and still owe, what was spent, the profit that is left, and which documents are about to expire.',
          'বাংলাদেশের বাহন মালিক ও ছোট পরিবহন ব্যবসার জন্য হিসাবের অ্যাপ। প্রতিটি বাহন কত আয় করল, চালক কত দিলেন ও কত বাকি, খরচ কত হলো, লাভ কত থাকল, আর কোন কাগজের মেয়াদ শেষ হচ্ছে — সব দেখায়।',
        )}</p>
        <dl class="meta-grid">
          <div><dt>${T('For', 'কাদের জন্য')}</dt><dd>${T('Owners of buses, cars, CNGs, auto-rickshaws, trucks, pickups and more', 'বাস, কার, সিএনজি, অটোরিকশা, ট্রাক, পিকআপসহ সব বাহনের মালিক')}</dd></div>
          <div><dt>${T('Platform', 'প্ল্যাটফর্ম')}</dt><dd>Android</dd></div>
          <div><dt>${T('Status', 'অবস্থা')}</dt><dd><span class="badge">${T('Coming soon', 'শীঘ্রই আসছে')}</span> ${T('not yet in any store', 'এখনো কোনো স্টোরে নেই')}</dd></div>
          <div><dt>${T('Works', 'চলে')}</dt><dd>${T('Offline, no account needed', 'অফলাইনে, অ্যাকাউন্ট ছাড়া')}</dd></div>
        </dl>
        <div class="btn-row">
          <a class="btn btn-primary" href="${APP.bn}">${icon('arrow')} ${T('Learn about Bahon Boi', 'বাহন বই সম্পর্কে জানুন')}</a>
          <a class="btn btn-ghost" href="${guidePath('bn')}">${T('User guide', 'ব্যবহার নির্দেশিকা')}</a>
        </div>
        ${lang === 'en' ? `<p class="muted small">The Bahon Boi page opens in Bengali. <a href="${APP.en}" hreflang="en">Read it in English</a>.</p>` : `<p class="muted small"><a href="${APP.en}" hreflang="en">বাহন বইয়ের পেজ ইংরেজিতে পড়ুন</a></p>`}
      </div>
      <figure class="fp-shots hero-shots">
        <div class="shots-fan">${shot(lang, 'drivers', 's-left')}${shot(lang, 'dashboard', 's-center')}${shot(lang, 'report', 's-right')}</div>
        <figcaption>${t(SHOTS_NOTE, lang)}</figcaption>
      </figure>
    </article>
  </div>
</section>`;

  const skills = ['Laravel', 'PHP', 'Vue.js', 'Flutter', 'Dart', 'MySQL', 'Docker', 'AWS', 'GitHub Actions', 'Cloudflare'];
  const dev = `<section class="section section-alt" id="developer" aria-labelledby="dev-title">
  <div class="wrap dev-grid">
    <div>
      <p class="eyebrow">${T('The developer', 'ডেভেলপার')}</p>
      <h2 id="dev-title" lang="en">Md. Risul Islam Munna</h2>
      <p class="role">${T('Full-stack developer, DevOps engineer and entrepreneur · Dhaka, Bangladesh', 'ফুল-স্ট্যাক ডেভেলপার, DevOps ইঞ্জিনিয়ার ও উদ্যোক্তা · ঢাকা, বাংলাদেশ')}</p>
      <p>${T(
        'More than 7 years of building web and mobile products — Laravel backends, Vue.js frontends and cross-platform Flutter apps, deployed and run on cloud infrastructure. Founder and lead developer of Bee Hook, an e-commerce SaaS platform for online businesses in Bangladesh.',
        '৭ বছরের বেশি সময় ধরে ওয়েব ও মোবাইল প্রোডাক্ট তৈরি — Laravel ব্যাকএন্ড, Vue.js ফ্রন্টএন্ড ও Flutter অ্যাপ, ক্লাউডে ডিপ্লয় ও পরিচালনাসহ। বাংলাদেশের অনলাইন ব্যবসার জন্য ই-কমার্স SaaS প্ল্যাটফর্ম Bee Hook-এর প্রতিষ্ঠাতা ও প্রধান ডেভেলপার।',
      )}</p>
      <p>${T(
        'The apps and games here are personal projects, made with the same care as client work.',
        'এখানকার অ্যাপ ও গেমগুলো ব্যক্তিগত উদ্যোগ — ক্লায়েন্টের কাজের মতোই যত্ন নিয়ে তৈরি।',
      )}</p>
      <ul class="chips" aria-label="${T('Technologies', 'প্রযুক্তি')}">${skills.map((s) => `<li lang="en">${s}</li>`).join('')}</ul>
    </div>
    <div class="dev-card">
      <ul class="facts">
        <li><b>${T('Experience', 'অভিজ্ঞতা')}</b>${T('7+ years', '৭+ বছর')}</li>
        <li><b>${T('Founder of', 'প্রতিষ্ঠাতা')}</b><a href="https://beehook.app" rel="noopener">Bee Hook</a></li>
        <li><b>${T('Based in', 'অবস্থান')}</b>${T('Dhaka, Bangladesh', 'ঢাকা, বাংলাদেশ')}</li>
      </ul>
      <ul class="link-list">
        <li><a href="https://munna.dev" rel="noopener">${icon('link')} munna.dev</a></li>
        <li><a href="${GAMES_URL}" rel="noopener">${icon('gamepad')} games.munna.dev</a></li>
        <li><a href="https://github.com/risul-islam-munna" rel="noopener">${icon('link')} GitHub</a></li>
        <li><a href="https://www.linkedin.com/in/risul-islam-munna/" rel="noopener">${icon('link')} LinkedIn</a></li>
        <li><a href="https://www.facebook.com/munna.dev.bd/" rel="noopener">${icon('link')} Facebook</a></li>
      </ul>
    </div>
  </div>
</section>`;

  const contact = `<section class="section-tight" id="contact" aria-labelledby="contact-title">
  <div class="wrap contact-band">
    <span class="ico big">${icon('mail')}</span>
    <div>
      <h2 id="contact-title">${T('Get in touch', 'যোগাযোগ')}</h2>
      <p>${T('Questions, feedback or a problem with an app or a game? Email me. For Bahon Boi help, see its', 'কোনো অ্যাপ বা গেম নিয়ে প্রশ্ন, মতামত বা সমস্যা? ইমেইল করুন। বাহন বইয়ের সাহায্যের জন্য দেখুন')} <a href="${APP[lang]}contact/">${T('support page', 'যোগাযোগ পেজ')}</a>${T('; each game has its own support page on', '; প্রতিটি গেমের যোগাযোগ পেজ আছে')} <a href="${GAMES_URL}" rel="noopener" lang="en">games.munna.dev</a>${T('.', '-এ।')}</p>
    </div>
    <a class="btn btn-primary" href="mailto:hello@munna.dev">hello@munna.dev</a>
  </div>
</section>`;

  return {
    title: T('Munna Apps — useful apps and enjoyable games by Md. Risul Islam Munna', 'Munna Apps — কাজের অ্যাপ ও আনন্দের গেম | Md. Risul Islam Munna'),
    description: T(
      'Mobile apps and Android games by Dhaka developer Md. Risul Islam Munna. Featured app: Bahon Boi, vehicle accounts for owners in Bangladesh. Games are on games.munna.dev.',
      'ঢাকার ডেভেলপার Md. Risul Islam Munna-এর মোবাইল অ্যাপ ও অ্যান্ড্রয়েড গেম। প্রধান অ্যাপ: বাহন বই — বাহন মালিকদের হিসাবের অ্যাপ। গেমগুলো games.munna.dev-এ।',
    ),
    body: [hero, games, featured, dev, contact].join('\n'),
    jsonld: {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebSite', '@id': SITE + '/#website', url: SITE + '/', name: 'Munna Apps', inLanguage: ['en', 'bn'] },
        {
          '@type': 'Person',
          '@id': SITE + '/#person',
          name: 'Md. Risul Islam Munna',
          url: 'https://munna.dev',
          jobTitle: 'Full Stack Developer & DevOps Engineer',
          address: { '@type': 'PostalAddress', addressLocality: 'Dhaka', addressCountry: 'BD' },
          sameAs: ['https://github.com/risul-islam-munna', 'https://www.linkedin.com/in/risul-islam-munna/', 'https://www.facebook.com/munna.dev.bd/'],
        },
        {
          '@type': 'CollectionPage',
          url: SITE + HUB[lang],
          inLanguage: lang,
          relatedLink: GAMES_URL,
          mainEntity: { '@type': 'ItemList', itemListElement: [{ '@type': 'ListItem', position: 1, url: SITE + APP.bn, name: 'Bahon Boi (বাহন বই)' }] },
        },
      ],
    },
  };
}
