// Hub ("/", English by default, scope munnaApps). A broad introduction to
// Munna Apps: a hero with two connected scenes (apps / games, the games side
// links to the separate games website), then the featured app (Bahon Boi). /bahon-boi/ uses its own language scope (Bengali by default).
// Game content stays on games.munna.dev — no catalog here.

import { L, t, SITE } from '../lib.mjs';
import { APP, HUB, GAMES_URL, guidePath } from '../routes.mjs';
import { icon, shot, SHOTS_NOTE } from '../components.mjs';

// Hero art: two original, decorative SVG scenes (aria-hidden; the captions
// carry the meaning as HTML). Final state = no animation, so reduced motion,
// a language swap or a finished intro all show the same readable picture.
// Animation lives in site.css under `.hx-anim` (short intro, no loops).

// Apps: loose notes settle into an organised list, get checked off, and a
// progress bar fills. Purely illustrative — no product data or figures.
const note = (n, y) => `<g class="hx-note hx-n${n}">
      <rect x="112" y="${y}" width="140" height="24" rx="7" class="hx-row"/>
      <circle cx="126" cy="${y + 12}" r="6.5" class="hx-check-bg"/>
      <path d="M122.6 ${y + 12.2}l2.4 2.4 4.4-4.8" class="hx-check hx-c${n}"/>
      <rect x="139" y="${y + 7}" width="${[0, 72, 58, 80][n]}" height="4.5" rx="2.25" class="hx-line"/>
      <rect x="139" y="${y + 14.5}" width="${[0, 44, 52, 36][n]}" height="3.5" rx="1.75" class="hx-line hx-line-2"/>
    </g>`;

export const APPS_SCENE = `<svg class="hx-svg" viewBox="0 12 320 158" aria-hidden="true" focusable="false">
    <g transform="translate(-22 0)">
    <g class="hx-scraps">
      <rect x="18" y="26" width="46" height="30" rx="6" class="hx-scrap hx-s1"/>
      <rect x="30" y="112" width="40" height="28" rx="6" class="hx-scrap hx-s2"/>
      <rect x="58" y="66" width="30" height="22" rx="5" class="hx-scrap hx-s3"/>
    </g>
    <rect x="98" y="18" width="168" height="146" rx="16" class="hx-board"/>
    <rect x="112" y="31" width="58" height="7" rx="3.5" class="hx-title"/>
    <circle cx="242" cy="34.5" r="4" class="hx-dot"/><circle cx="230" cy="34.5" r="4" class="hx-dot"/>
    ${note(1, 48)}
    ${note(2, 79)}
    ${note(3, 110)}
    <rect x="112" y="145" width="140" height="7" rx="3.5" class="hx-track"/>
    <rect x="112" y="145" width="140" height="7" rx="3.5" class="hx-progress"/>
    </g>
  </svg>`;

// Games: a ball bounces off a brick (which pops with a small sparkle), a
// puzzle piece snaps into place, and the paddle slides under the ball.
const bricks = () => {
  const xs = [27, 71, 115, 159, 203, 247];
  const tone = (r, i) => ((r + i) % 3 === 0 ? 'hx-brick-t' : (r + i) % 2 ? 'hx-brick-a' : 'hx-brick-b');
  return [22, 40]
    .map((y, r) => xs.map((x, i) => (r === 1 && i === 3 ? '' : `<rect x="${x}" y="${y}" width="38" height="14" rx="4" class="${tone(r, i)}"/>`)).join(''))
    .join('');
};

export const GAMES_SCENE = `<svg class="hx-svg" viewBox="0 12 320 158" aria-hidden="true" focusable="false">
    <g class="hx-bricks">${bricks()}</g>
    <rect x="159" y="40" width="38" height="14" rx="4" class="hx-brick-a hx-target"/>
    <g class="hx-spark"><path d="M178 34v-6M178 60v6M162 47h-6M194 47h6M167 37l-4-4M189 37l4-4M167 57l-4 4M189 57l4 4"/></g>
    <path d="M34 116h40v13a7 7 0 1 1 0 14v13h-40z" class="hx-piece-a"/>
    <path d="M74 116h40v40h-40v-13a7 7 0 1 0 0-14z" class="hx-piece-b"/>
    <rect x="140" y="152" width="70" height="9" rx="4.5" class="hx-paddle"/>
    <circle cx="175" cy="145" r="6.5" class="hx-ball"/>
  </svg>`;

export function hubPage(lang) {
  const T = (en, bn) => t(L(en, bn), lang);
  const ext = icon('external');

  const hero = `<section class="hub-hero" aria-labelledby="hub-title">
  <div class="wrap">
    <div class="hx-intro">
      <div class="hx-head">
        <p class="eyebrow">${T('Munna Apps · Apps and games by Risul Islam Munna', 'Munna Apps · রিসুল ইসলাম মুন্নার তৈরি অ্যাপ ও গেম')}</p>
        <h1 id="hub-title">${T(
          '<span><em class="hx-a">Simpler</em> everyday tasks.</span> <span><em class="hx-g">More enjoyable</em> downtime.</span>',
          '<span>দৈনন্দিন কাজ হোক <em class="hx-a">সহজ।</em></span> <span>অবসর হোক <em class="hx-g">আনন্দের।</em></span>',
        )}</h1>
      </div>
      <div class="hx-copy">
        <p class="lede">${T(
          'I build apps that turn complicated routines and scattered information into clear, manageable steps — and games made for a quick break, a satisfying challenge or, where a game supports it, time with friends.',
          'জটিল প্রক্রিয়া সহজ করতে, ছড়িয়ে থাকা তথ্য গুছিয়ে রাখতে আর প্রয়োজনের কাজ কম ঝামেলায় সেরে নিতে অ্যাপ তৈরি করি। আর কাজের ফাঁকে নিজের মতো খেলতে কিংবা কিছু গেমে বন্ধুদের সঙ্গে সময় কাটাতে তৈরি করি উপভোগ্য গেম।',
        )}</p>
        <div class="btn-row">
          <a class="btn btn-primary" href="#apps">${icon('phone')} ${T('Explore apps', 'অ্যাপগুলো দেখুন')}</a>
          <a class="btn btn-games" href="${GAMES_URL}" rel="noopener">${icon('gamepad')} ${T('Explore games', 'গেমসের জগতে যান')}</a>
        </div>
      </div>
    </div>
    <div class="hx-stage hx-anim" data-hero-stage>
      <figure class="hx-scene hx-apps">
        ${APPS_SCENE}
        <figcaption>
          <b>${T('Less complexity. More clarity.', 'জটিলতা কমিয়ে, কাজে স্বস্তি')}</b>
          <span>${T(
            'Practical tools that bring useful information together and make everyday tasks easier to manage.',
            'হিসাব রাখা থেকে প্রয়োজনীয় তথ্য এক জায়গায় পাওয়া — সহজ ব্যবহার আর পরিষ্কার তথ্যে দৈনন্দিন কাজে আরও নিয়ন্ত্রণ।',
          )}</span>
        </figcaption>
      </figure>
      <figure class="hx-scene hx-games">
        ${GAMES_SCENE}
        <figcaption>
          <b>${T('Take a break. Enjoy the moment.', 'একটু বিরতি, নিজের মতো আনন্দ')}</b>
          <span>${T(
            'A quick game, a challenge to beat or, in some games, a little friendly competition.',
            'ছোট বিরতিতে হালকা বিনোদন, নিজের দক্ষতার চ্যালেঞ্জ, কিংবা কিছু গেমে বন্ধুদের সঙ্গে খেলার আনন্দ।',
          )}</span>
          <a class="hx-link" href="${GAMES_URL}" rel="noopener"><span lang="en">games.munna.dev</span> ${ext}</a>
        </figcaption>
      </figure>
      <button class="hx-replay" type="button" data-hero-replay aria-label="${T('Replay the animation', 'অ্যানিমেশন আবার দেখুন')}" title="${T('Replay the animation', 'অ্যানিমেশন আবার দেখুন')}"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg></button>
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
          <a class="btn btn-primary" href="${APP}">${icon('arrow')} ${T('Learn about Bahon Boi', 'বাহন বই সম্পর্কে জানুন')}</a>
          <a class="btn btn-ghost" href="${guidePath()}">${T('User guide', 'ব্যবহার নির্দেশিকা')}</a>
        </div>
        ${lang === 'en' ? `<p class="muted small">The Bahon Boi page opens in Bengali unless you have chosen English there.<span class="js-only"> <a href="${APP}" data-prefer="bahonBoi:en">Open it in English</a>.</span></p>` : ''}
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
      <p>${T('Questions, feedback or a problem with an app or a game? Email me. For Bahon Boi help, see its', 'কোনো অ্যাপ বা গেম নিয়ে প্রশ্ন, মতামত বা সমস্যা? ইমেইল করুন। বাহন বইয়ের সাহায্যের জন্য দেখুন')} <a href="${APP}contact/">${T('support page', 'যোগাযোগ পেজ')}</a>${T('; each game has its own support page on', '; প্রতিটি গেমের যোগাযোগ পেজ আছে')} <a href="${GAMES_URL}" rel="noopener" lang="en">games.munna.dev</a>${T('.', '-এ।')}</p>
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
    body: [hero, featured, dev, contact].join('\n'),
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
          url: SITE + HUB,
          inLanguage: lang,
          relatedLink: GAMES_URL,
          mainEntity: { '@type': 'ItemList', itemListElement: [{ '@type': 'ListItem', position: 1, url: SITE + APP, name: 'Bahon Boi (বাহন বই)' }] },
        },
      ],
    },
  };
}
