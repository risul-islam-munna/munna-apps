// Bahon Boi landing page (Bengali default at /bahon-boi/, English at /bahon-boi/en/).

import { L, t, money, num, esc, SITE } from '../lib.mjs';
import { APP, HUB, appPath, guidePath } from '../routes.mjs';
import { icon, shot, SCREENS, SHOTS_NOTE } from '../components.mjs';
import { VEHICLES, vehicleIcon, assignmentTimeline, reportChart, docTimeline, backupFlow } from '../svg.mjs';
import { MAIN, SETTLE, WAIVE } from '../examples.mjs';

export const FAQ = [
  [
    L('Where can I get the app?', 'অ্যাপটি কোথায় পাওয়া যাবে?'),
    L('Bahon Boi has not been published in any app store yet. When it is, the download link will appear on this page.', 'বাহন বই এখনো কোনো অ্যাপ স্টোরে প্রকাশিত হয়নি। প্রকাশ হলে এই পেজে ডাউনলোড লিংক দেওয়া হবে।'),
  ],
  [
    L('Is money from a driver added as new income?', 'চালকের দেওয়া টাকা কি নতুন আয় হিসেবে যোগ হয়?'),
    L('No. Income is recorded once, as its own entry. When the driver pays, you record money received and link it to that income, so the due goes down. Money received never adds income, and you cannot apply more than an entry’s due — extra money must be kept as an advance.', 'না। আয় একবারই, আলাদা এন্ট্রি হিসেবে লেখা হয়। চালক টাকা দিলে টাকা পাওয়া লিখে ওই আয়ের সাথে মেলান, তাতে বাকি কমে। পাওয়া টাকা কখনো আয় বাড়ায় না, আর কোনো এন্ট্রির বাকির চেয়ে বেশি মেলানো যায় না — বাড়তি টাকা অগ্রিম হিসেবে রাখতে হয়।'),
  ],
  [
    L('Are daily rent and trip income recorded the same way?', 'দৈনিক ভাড়া আর ট্রিপের আয় কি একইভাবে লেখা হয়?'),
    L('No. For daily rent you enter a daily rate and the amount fills in as rate × days. For trip-based income you enter the actual amount earned and, optionally, the number of trips. Fixed contracts and other income are separate types too.', 'না। দৈনিক ভাড়ায় দৈনিক হার দিলে অঙ্ক নিজে থেকে হার × দিন হয়। ট্রিপভিত্তিক আয়ে আসল আয়ের অঙ্ক লেখেন, চাইলে ট্রিপের সংখ্যাও। নির্দিষ্ট চুক্তি ও অন্যান্য আয়ও আলাদা ধরন।'),
  ],
  [
    L('Which month does a late bill count in?', 'দেরিতে আসা বিল কোন মাসে ধরা হয়?'),
    L('An expense counts in profit on the day the work happened; the payment counts in cash on the day you paid. If you enter something with an old date, reports recalculate.', 'খরচ যেদিন কাজ হয়েছে সেই দিনের লাভে ধরা হয়; পরিশোধ যেদিন টাকা দিয়েছেন সেই দিনের নগদে। পুরনো তারিখে কিছু লিখলে রিপোর্ট নতুন করে হিসাব হয়।'),
  ],
  [
    L('Where are my records kept? Do I need an account?', 'আমার হিসাব কোথায় থাকে? অ্যাকাউন্ট লাগে?'),
    L('No account is needed. Records are kept on your phone in the app’s own storage, and the app works without internet. Records are not sent to the developer.', 'অ্যাকাউন্ট লাগে না। তথ্য থাকে আপনার ফোনে, অ্যাপের নিজস্ব স্টোরেজে, আর অ্যাপ ইন্টারনেট ছাড়াই চলে। তথ্য ডেভেলপারের কাছে পাঠানো হয় না।'),
  ],
  [
    L('What happens if I lose my phone?', 'ফোন হারালে কী হবে?'),
    L('Only what you backed up and copied off the phone can be restored. Set up Backup & Restore on day one, copy the “BahonBoi Backups” folder to a computer or USB drive regularly, and keep any recovery key somewhere else. Without a backup copy, records on a lost phone cannot be recovered.', 'শুধু যা ব্যাকআপ করে ফোনের বাইরে কপি করেছেন, সেটিই ফেরত আনা যাবে। প্রথম দিনেই ব্যাকআপ ও রিস্টোর সেটআপ করুন, “BahonBoi Backups” ফোল্ডার নিয়মিত কম্পিউটার বা পেনড্রাইভে কপি করুন, আর রিকভারি কী অন্য জায়গায় রাখুন। ব্যাকআপ কপি না থাকলে হারানো ফোনের তথ্য উদ্ধার করা যায় না।'),
  ],
  [
    L('Do I get a phone notification before a document expires?', 'কাগজের মেয়াদ শেষের আগে কি ফোনে নোটিফিকেশন আসে?'),
    L('Not yet. Expired and expiring documents appear inside the app — on the Home screen’s bell and alert strip and on the vehicle screen.', 'এখনো না। মেয়াদ শেষ বা শিগগির শেষ হওয়া কাগজ অ্যাপের ভেতরে দেখায় — ড্যাশবোর্ডের ঘণ্টা ও সতর্কতা অংশে এবং বাহনের পর্দায়।'),
  ],
  [
    L('Can several owners share one vehicle?', 'একটি বাহনের কি একাধিক মালিক থাকতে পারেন?'),
    L('Yes, as records: each owner’s contribution and share are kept. Owners do not get separate logins, and the app does not split profit between them.', 'হ্যাঁ, তথ্য হিসেবে: প্রতিটি মালিকের অবদান ও ভাগ রাখা হয়। মালিকদের আলাদা লগইন নেই, আর অ্যাপ তাঁদের মধ্যে লাভ ভাগ করে না।'),
  ],
  [
    L('Can I use Bahon Boi on a computer or online?', 'কম্পিউটারে বা অনলাইনে কি বাহন বই ব্যবহার করা যায়?'),
    L('No. Bahon Boi is a mobile app. This website only explains it; you cannot keep accounts here.', 'না। বাহন বই একটি মোবাইল অ্যাপ। এই ওয়েবসাইট শুধু অ্যাপটি বোঝায়; এখানে হিসাব রাখা যায় না।'),
  ],
];

export function appPage(lang) {
  const T = (en, bn) => t(L(en, bn), lang);
  const m = (n) => money(n, lang);
  const g = (slug) => guidePath(lang, slug);
  const more = (slug, en = 'Read the guide', bn = 'নির্দেশিকা পড়ুন') =>
    `<a class="more-link" href="${g(slug)}">${T(en, bn)} ${icon('arrow', 'arr')}</a>`;
  const pct = (n) => ((n / MAIN.rent) * 100).toFixed(2) + '%';

  // ---------------------------------------------------------------- hero
  const hero = `<section class="app-hero" aria-labelledby="hero-title">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <div class="app-id">
        <img src="/bahon-boi/assets/logo-320.webp" width="72" height="72" alt="${T('Bahon Boi app icon: a car above an open book', 'বাহন বই অ্যাপের আইকন: খোলা বইয়ের ওপর একটি গাড়ি')}">
        <div><b>${T('Bahon Boi', 'বাহন বই')}</b><small>${T('Vehicle accounts app · Android', 'বাহনের হিসাবের অ্যাপ · অ্যান্ড্রয়েড')}</small></div>
      </div>
      <h1 id="hero-title">${T('Every vehicle’s accounts, <em>in one book.</em>', 'সব বাহনের হিসাব, <em>এক বইয়ে।</em>')}</h1>
      <p class="lede">${T(
        'See what each vehicle really earned, what drivers still owe, what you spent and what profit is left — on your phone, in Bengali or English, without internet.',
        'কোন গাড়ি আসলে কত আয় করল, চালকের কাছে কত বাকি, খরচ কত গেল আর লাভ কত থাকল — ফোনেই, বাংলায় বা ইংরেজিতে, ইন্টারনেট ছাড়াই।',
      )}</p>
      <p class="hero-aud">${T(
        'For owners of buses, private cars, CNGs, auto-rickshaws, trucks, pickups and other vehicles, and for small transport businesses in Bangladesh.',
        'বাস, প্রাইভেট কার, সিএনজি, অটোরিকশা, ট্রাক, পিকআপসহ যেকোনো বাহনের মালিক ও বাংলাদেশের ছোট পরিবহন ব্যবসার জন্য।',
      )}</p>
      <div class="btn-row">
        <span class="btn btn-store" aria-disabled="true">${icon('phone')} ${T('Google Play — coming soon', 'Google Play — শীঘ্রই')}</span>
        <a class="btn btn-ghost" href="${g()}">${icon('book')} ${T('How to use it', 'কীভাবে ব্যবহার করবেন')}</a>
      </div>
      <p class="status"><span class="badge">${T('Coming soon', 'শীঘ্রই আসছে')}</span> ${T(
        'Not yet published in any store. The download link will be added here.',
        'এখনো কোনো স্টোরে প্রকাশিত হয়নি। ডাউনলোড লিংক এখানে যোগ করা হবে।',
      )}</p>
    </div>
    <figure class="hero-shots">
      <div class="shots-fan">${shot(lang, 'report', 's-left')}${shot(lang, 'dashboard', 's-center', true)}${shot(lang, 'vehicle', 's-right')}</div>
      <figcaption>${t(SHOTS_NOTE, lang)}</figcaption>
    </figure>
  </div>
</section>`;

  // ---------------------------------------------------------------- benefits
  const benefits = [
    ['offline', L('Works offline', 'ইন্টারনেট ছাড়াই চলে'), L('Record and check accounts anywhere. No internet is needed for daily use.', 'যেকোনো জায়গায় হিসাব লিখুন ও দেখুন। প্রতিদিনের কাজে ইন্টারনেট লাগে না।')],
    ['user', L('No account needed', 'অ্যাকাউন্ট লাগে না'), L('No sign-up or login. Records stay in the app’s storage on your phone.', 'সাইন-আপ বা লগইন নেই। তথ্য থাকে আপনার ফোনে, অ্যাপের স্টোরেজে।')],
    ['calc', L('Earned vs collected, kept apart', 'আয় আর আদায় আলাদা'), L('Rent you earned and money you actually received are never mixed up.', 'অর্জিত ভাড়া আর সত্যিই হাতে পাওয়া টাকা কখনো মিশে যায় না।')],
    ['lang', L('Bengali and English', 'বাংলা ও ইংরেজি'), L('Bengali by default, with Bengali digits. Switch to English any time.', 'ডিফল্ট বাংলা, বাংলা অঙ্কসহ। যেকোনো সময় ইংরেজিতে বদলান।')],
  ];
  const benefitsHtml = `<section class="section-tight benefits" aria-labelledby="ben-title">
  <div class="wrap">
    <h2 id="ben-title" class="sr-only">${T('Main benefits', 'প্রধান সুবিধা')}</h2>
    <ul class="benefit-list">${benefits
      .map(([ic, h, p]) => `<li><span class="ico">${icon(ic)}</span><div><h3>${t(h, lang)}</h3><p>${t(p, lang)}</p></div></li>`)
      .join('')}</ul>
  </div>
</section>`;

  // ---------------------------------------------------------------- screenshots
  const showcase = `<section class="section-tight showcase" id="screens" aria-labelledby="screens-title">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">${T('Inside the app', 'অ্যাপের ভেতরে')}</p>
      <h2 id="screens-title">${T('What you see on your phone', 'ফোনে যা দেখবেন')}</h2>
    </div>
    <ul class="showcase-grid">${['dashboard', 'report', 'vehicle', 'drivers']
      .map((k) => `<li><figure>${shot(lang, k)}<figcaption><b>${t(SCREENS[k].title, lang)}</b>${t(SCREENS[k].text, lang)}</figcaption></figure></li>`)
      .join('')}</ul>
    <p class="showcase-note muted small">${t(SHOTS_NOTE, lang)}</p>
  </div>
</section>`;

  // ---------------------------------------------------------------- vehicles
  const vehiclesHtml = `<section class="section-tight vehicles" aria-labelledby="veh-title">
  <div class="wrap">
    <div class="split-head">
      <h2 id="veh-title">${T('For every kind of vehicle', 'যেকোনো ধরনের বাহনের জন্য')}</h2>
      <p class="muted">${T('One owner with one CNG or a small fleet — each vehicle keeps its own book, and you can see them all together.', 'একটি সিএনজি হোক বা কয়েকটি গাড়ির বহর — প্রতিটি বাহনের আলাদা খাতা, আবার সব মিলিয়েও দেখা যায়।')}</p>
    </div>
    <ul class="vehicle-grid">${VEHICLES.map(([k, lab]) => `<li>${vehicleIcon(k)}<span>${t(lab, lang)}</span></li>`).join('')}</ul>
  </div>
</section>`;

  // ---------------------------------------------------------------- workflow
  const flow = [
    ['car', L('Add a vehicle', 'বাহন যোগ করুন'), L('Nickname, type, plate and owners.', 'নাম, ধরন, প্লেট ও মালিক।'), 'vehicles-owners'],
    ['driver', L('Assign a driver', 'চালক নিযুক্ত করুন'), L('Shift and start date.', 'শিফট ও শুরুর তারিখ।'), 'drivers'],
    ['income', L('Record income', 'আয় লিখুন'), L('Daily rent, contract or trips.', 'দৈনিক ভাড়া, চুক্তি বা ট্রিপ।'), 'income'],
    ['cash', L('Record money received', 'টাকা পাওয়া লিখুন'), L('Link it to the income it pays.', 'যে আয়ের টাকা, তার সাথে মেলান।'), 'money-received'],
    ['expense', L('Add expenses', 'খরচ লিখুন'), L('Who bears it, who paid.', 'খরচ কার, কে দিলেন।'), 'expenses'],
    ['chart', L('Check reports', 'রিপোর্ট দেখুন'), L('Profit, cash and dues.', 'লাভ, নগদ ও বাকি।'), 'reports'],
  ];
  const flowHtml = `<section class="section workflow" id="how" aria-labelledby="how-title">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">${T('How it works', 'কীভাবে কাজ করে')}</p>
      <h2 id="how-title">${T('A simple daily routine', 'প্রতিদিনের সহজ নিয়ম')}</h2>
      <p class="lede">${T('Six steps cover most days. Each step links to a detailed guide.', 'ছয়টি ধাপে বেশিরভাগ দিনের কাজ হয়ে যায়। প্রতিটি ধাপের বিস্তারিত নির্দেশিকা আছে।')}</p>
    </div>
    <ol class="flow">${flow
      .map(([ic, h, p, slug]) => `<li><a href="${g(slug)}"><span class="flow-ico">${icon(ic)}</span><b>${t(h, lang)}</b><span>${t(p, lang)}</span></a></li>`)
      .join('')}</ol>
  </div>
</section>`;

  // ---------------------------------------------------------------- feature rows (alternating)
  const row = (id, eyebrow, title, text, bullets, art, slug, flip) => `<div class="feature-row${flip ? ' flip' : ''}" id="${id}">
    <div class="feature-copy">
      <p class="eyebrow">${t(eyebrow, lang)}</p>
      <h3>${t(title, lang)}</h3>
      <p>${t(text, lang)}</p>
      <ul class="checks">${bullets.map((b) => `<li>${t(b, lang)}</li>`).join('')}</ul>
      ${more(slug)}
    </div>
    <div class="feature-art">${art}</div>
  </div>`;

  const peopleCard = `<div class="mini-cards">
    <div class="mini"><span class="ico">${icon('car')}</span><b>${T('Vehicle', 'বাহন')}</b><span>${T('Plate, type, photos, documents', 'প্লেট, ধরন, ছবি, কাগজ')}</span></div>
    <div class="mini"><span class="ico">${icon('user')}</span><b>${T('Owners', 'মালিক')}</b><span>${T('Contribution → share (record only)', 'অবদান → ভাগ (শুধু তথ্য)')}</span></div>
  </div>${assignmentTimeline(lang)}`;

  const moneyArt = `<div class="mini-ledger" role="img" aria-label="${esc(T(
    `Example: income ${money(MAIN.rent, 'en')}, received ${money(MAIN.received, 'en')}, due ${money(MAIN.due, 'en')}.`,
    `উদাহরণ: আয় ${money(MAIN.rent, 'bn')}, পাওয়া ${money(MAIN.received, 'bn')}, বাকি ${money(MAIN.due, 'bn')}।`,
  ))}">
    <div class="ml-entry"><span>${T('Income · weekly rent', 'আয় · সাপ্তাহিক ভাড়া')}</span><b>${m(MAIN.rent)}</b></div>
    <div class="ml-bar" aria-hidden="true"><i class="ml-got" style="width:${pct(MAIN.received)}"></i><i class="ml-due" style="width:${pct(MAIN.due)}"></i></div>
    <div class="ml-legend"><span class="k-got">${T('Received', 'পাওয়া')} ${m(MAIN.received)}</span><span class="k-due">${T('Due', 'বাকি')} ${m(MAIN.due)}</span></div>
    <div class="ml-methods" aria-hidden="true"><span>${T('Cash', 'নগদ')}</span><span>bKash</span><span>Nagad</span><span>Rocket</span><span>${T('Bank', 'ব্যাংক')}</span></div>
  </div>`;

  const expenseArt = `<div class="who-pays">
    <div class="wp-col"><h4>${T('Who bears this cost?', 'এই খরচ কার?')}</h4>
      <p><b>${T('Owner', 'মালিক')}</b> — ${T('counts in your expenses and profit.', 'আপনার খরচ ও লাভে ধরা হয়।')}</p>
      <p><b>${T('Driver', 'চালক')}</b> — ${T('kept for reference only; never lowers rent.', 'শুধু তথ্যের জন্য; ভাড়া কমায় না।')}</p></div>
    <div class="wp-col"><h4>${T('Who paid the shop?', 'দোকানকে কে দিলেন?')}</h4>
      <p><b>${T('Owner', 'মালিক')}</b> — ${T('paid in full, partly, or not yet.', 'পুরো, আংশিক, বা এখনো নয়।')}</p>
      <p><b>${T('Driver, from own money', 'চালক, নিজের টাকায়')}</b> — ${T('pay the driver back, or adjust against rent.', 'চালককে ফেরত দিন, বা ভাড়া থেকে সমন্বয় করুন।')}</p></div>
  </div>`;

  const features = `<section class="section features" id="features" aria-labelledby="feat-title">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">${T('Features', 'ফিচার')}</p>
      <h2 id="feat-title">${T('Everything here works in the current version', 'এখানে যা আছে, সবই বর্তমান সংস্করণে চলে')}</h2>
      <p class="lede">${T('Planned features are listed separately in the guide, under “Not available in this version”.', 'পরিকল্পিত ফিচার নির্দেশিকায় “এই সংস্করণে যা নেই” অংশে আলাদা করে লেখা আছে।')}</p>
    </div>
    ${row(
      'f-people',
      L('Vehicles, owners and drivers', 'বাহন, মালিক ও চালক'),
      L('Know who owns and who drives each vehicle', 'কোন বাহনের মালিক কে, চালায় কে — সব জানা'),
      L('Keep each vehicle’s details and photos, its owners and their shares, and a full history of which driver drove it on which shift.', 'প্রতিটি বাহনের তথ্য ও ছবি, মালিক ও তাঁদের ভাগ, আর কোন চালক কোন শিফটে কবে চালিয়েছেন — তার পুরো ইতিহাস রাখুন।'),
      [
        L('Vehicles without a plate yet can be saved by nickname', 'প্লেট না থাকলেও নাম দিয়ে বাহন রাখা যায়'),
        L('Driver profile, NID and licence numbers, emergency contact and ID photos', 'চালকের প্রোফাইল, এনআইডি ও লাইসেন্স নম্বর, জরুরি যোগাযোগ ও পরিচয়পত্রের ছবি'),
        L('Several drivers per vehicle: day, night or custom shifts', 'এক বাহনে একাধিক চালক: দিন, রাত বা নিজস্ব শিফট'),
        L('Ending an assignment keeps it in the history', 'নিয়োগ শেষ করলেও ইতিহাসে থাকে'),
      ],
      peopleCard,
      'drivers',
      false,
    )}
    ${row(
      'f-income',
      L('Income, money received and dues', 'আয়, টাকা পাওয়া ও বাকি'),
      L('Rent earned and money received, kept separate', 'অর্জিত ভাড়া আর পাওয়া টাকা — আলাদা'),
      L('Record income for a day, week, month or any dates. Record money when it actually reaches you and link it to the income it pays — partial payments and advances included.', 'এক দিন, সপ্তাহ, মাস বা যেকোনো তারিখের আয় লিখুন। টাকা যেদিন সত্যিই হাতে আসে সেদিন লিখে যে আয়ের টাকা তার সাথে মেলান — আংশিক পরিশোধ ও অগ্রিমসহ।'),
      [
        L('Daily rent, fixed contract, trip-based and other income', 'দৈনিক ভাড়া, নির্দিষ্ট চুক্তি, ট্রিপভিত্তিক ও অন্যান্য আয়'),
        L('Warns before two income entries cover the same day', 'একই দিনের জন্য দুটি আয় লেখার আগে সতর্ক করে'),
        L('“Fill oldest first” applies money to the oldest dues', '“পুরনোটা আগে” দিয়ে টাকা আগে পুরনো বাকিতে যায়'),
        L('Extra money waits as an advance, never as income', 'বাড়তি টাকা অগ্রিম হিসেবে থাকে, আয় হিসেবে নয়'),
      ],
      moneyArt,
      'money-received',
      true,
    )}
    ${row(
      'f-expense',
      L('Expenses and payments', 'খরচ ও পরিশোধ'),
      L('Every cost on the right date, paid or not', 'প্রতিটি খরচ সঠিক তারিখে, পরিশোধ হোক বা না হোক'),
      L('Fuel, repairs, servicing, driver salary, documents and other costs. The expense date decides the month’s profit; the payment date decides cash.', 'জ্বালানি, মেরামত, সার্ভিসিং, চালকের বেতন, কাগজপত্র ও অন্যান্য খরচ। খরচের তারিখে মাসের লাভ ঠিক হয়; পরিশোধের তারিখে নগদ।'),
      [
        L('Paid in full, partly paid or not paid yet — add payments later', 'পুরো, আংশিক বা এখনো দেওয়া হয়নি — পরে পরিশোধ যোগ করুন'),
        L('Invoice photo and shop / vendor', 'বিলের ছবি ও দোকান / বিক্রেতা'),
        L('Bills entered more than 7 days late are marked “Recorded later”', '৭ দিনের বেশি পরে লেখা বিলে “পরে লেখা” দেখায়'),
      ],
      expenseArt,
      'expenses',
      false,
    )}
    ${row(
      'f-reports',
      L('Dashboard and reports', 'ড্যাশবোর্ড ও রিপোর্ট'),
      L('Profit and cash, side by side — never mixed', 'লাভ আর নগদ পাশাপাশি — কখনো মিশে না'),
      L('The Home screen shows a month at a glance. Reports cover any day, month or date range, for one vehicle or all, with an income & expense chart.', 'ড্যাশবোর্ডে এক নজরে এক মাস। রিপোর্টে যেকোনো দিন, মাস বা তারিখের সীমা, একটি বা সব বাহনের, আয়–খরচের গ্রাফসহ।'),
      [
        L('Earned income, expenses, profit or loss, and money still to collect', 'অর্জিত আয়, খরচ, লাভ বা ক্ষতি, আর আদায় বাকি'),
        L('Balances “as of” any day: dues, unpaid bills, advances, owed to drivers', 'যেকোনো দিন “পর্যন্ত” বাকি: আদায়, অপরিশোধিত বিল, অগ্রিম, চালকের পাওনা'),
        L('Tap any number to see the entries behind it', 'যেকোনো অঙ্কে চাপলে পেছনের এন্ট্রি দেখা যায়'),
      ],
      `<figure class="art-fig">${reportChart(lang)}<figcaption>${T('Example chart drawn for this website.', 'এই ওয়েবসাইটের জন্য আঁকা উদাহরণ গ্রাফ।')}</figcaption></figure>`,
      'reports',
      true,
    )}
    ${row(
      'f-docs',
      L('Documents and reminders', 'কাগজপত্র ও সতর্কতা'),
      L('Know which papers are about to expire', 'কোন কাগজের মেয়াদ শেষ হচ্ছে, জেনে রাখুন'),
      L('Registration, fitness, tax token, route permit, insurance, driving licence and other papers — with dates and photos of each page.', 'নিবন্ধন, ফিটনেস, ট্যাক্স টোকেন, রুট পারমিট, বীমা, ড্রাইভিং লাইসেন্স ও অন্যান্য কাগজ — তারিখ ও প্রতিটি পাতার ছবিসহ।'),
      [
        L('Valid, Expiring soon, Expired or No expiry', 'বৈধ, শিগগিরই শেষ, মেয়াদ শেষ বা মেয়াদ নেই'),
        L('Choose how many days before expiry to be warned', 'মেয়াদ শেষের কত দিন আগে সতর্ক করবে, বাছুন'),
        L('Alerts appear inside the app (bell on the Home screen) — no phone notifications', 'সতর্কতা অ্যাপের ভেতরে (ড্যাশবোর্ডের ঘণ্টায়) — ফোনে নোটিফিকেশন নয়'),
      ],
      docTimeline(lang),
      'documents',
      false,
    )}
  </div>
</section>`;

  // ---------------------------------------------------------------- accounting
  const concepts = [
    ['c-earn', L('Earned income', 'অর্জিত আয়'), L('What the vehicle earned for its days — paid or not.', 'বাহন তার দিনগুলোর জন্য যা অর্জন করেছে — টাকা পাওয়া যাক বা না যাক।')],
    ['c-got', L('Money received', 'পাওয়া টাকা'), L('Cash or transfers that actually reached you. Settles income; never adds to it.', 'যে টাকা সত্যিই হাতে এসেছে। আয়ের বাকি মেটায়; আয় বাড়ায় না।')],
    ['c-due', L('Still to collect', 'আদায় বাকি'), L('Income − money applied to it.', 'আয় − তার সাথে মেলানো টাকা।')],
    ['c-exp', L('Expenses', 'খরচ'), L('Owner’s costs, on the day the work happened.', 'মালিকের খরচ, যেদিন কাজ হয়েছে সেই দিনে।')],
    ['c-pay', L('Money paid', 'দেওয়া টাকা'), L('Payments for expenses, on the day money left your hands.', 'খরচের পরিশোধ, যেদিন টাকা হাত থেকে গেছে।')],
    ['c-profit', L('Profit', 'লাভ'), L('Earned income − expenses.', 'অর্জিত আয় − খরচ।')],
    ['c-cash', L('Net cash movement', 'নগদ লেনদেনের ফল'), L('Money received − money paid. Not a cash balance.', 'পাওয়া টাকা − দেওয়া টাকা। হাতে থাকা নগদ নয়।')],
    ['c-adj', L('Non-cash adjustments', 'নগদবিহীন সমন্বয়'), L('“Adjust against rent” and rent waivers change dues without moving cash.', '“ভাড়া থেকে সমন্বয়” ও ভাড়া মাফ — নগদ লেনদেন ছাড়াই বাকি বদলায়।')],
  ];
  const w = (n) => ((n / MAIN.rent) * 100).toFixed(2);
  const accounting = `<section class="section section-alt money" id="money" aria-labelledby="money-title">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">${T('Accounting, explained', 'হিসাব, সহজ করে')}</p>
      <h2 id="money-title">${T('Earned, received, due, profit and cash are different numbers', 'আয়, আদায়, বাকি, লাভ আর নগদ — আলাদা আলাদা অঙ্ক')}</h2>
      <p class="lede">${T('Bahon Boi never adds a driver’s payment as new income, and never works out cash from profit. Here is one week of one vehicle, with example figures.', 'বাহন বই চালকের দেওয়া টাকা কখনো নতুন আয় হিসেবে যোগ করে না, আর লাভ থেকে নগদ হিসাব করে না। একটি বাহনের এক সপ্তাহ, উদাহরণের অঙ্কে:')}</p>
    </div>

    <figure class="story" data-animate>
      <figcaption class="story-tag">${T('Example', 'উদাহরণ')} · ${T('one week, one CNG', 'এক সপ্তাহ, একটি সিএনজি')}</figcaption>
      <ol class="story-steps">
        <li><span class="st-n">${num(1, lang)}</span><div class="st-body"><b>${T('Rent earned for the week', 'সপ্তাহের অর্জিত ভাড়া')}</b>
          <div class="bar"><i class="b-earn" style="--w:100%"></i></div><span class="st-v">${m(MAIN.rent)}</span></div></li>
        <li><span class="st-n">${num(2, lang)}</span><div class="st-body"><b>${T('Driver pays part of it', 'চালক তার কিছু অংশ দিলেন')}</b>
          <div class="bar"><i class="b-got" style="--w:${w(MAIN.received)}%"></i><i class="b-due" style="--w:${w(MAIN.due)}%"></i></div>
          <span class="st-v">${T('Received', 'পাওয়া')} ${m(MAIN.received)} · ${T('due', 'বাকি')} ${m(MAIN.due)}</span>
          <p class="st-note">${T('Income is still', 'আয় এখনো')} ${m(MAIN.rent)} — ${T('the payment only lowers the due.', 'টাকা পাওয়ায় শুধু বাকি কমে।')}</p></div></li>
        <li><span class="st-n">${num(3, lang)}</span><div class="st-body"><b>${T('Owner’s repair bill', 'মালিকের মেরামতের বিল')}</b>
          <div class="bar"><i class="b-exp" style="--w:${w(MAIN.expense)}%"></i></div><span class="st-v">${m(MAIN.expense)}</span></div></li>
        <li class="st-result"><span class="st-n">=</span><div class="st-body"><b>${T('Profit', 'লাভ')} = ${m(MAIN.rent)} − ${m(MAIN.expense)}</b>
          <div class="bar"><i class="b-profit" style="--w:${w(MAIN.profit)}%"></i></div><span class="st-v">${m(MAIN.profit)}</span></div></li>
      </ol>
      <div class="cash-box">
        <h3>${T('Cash, shown separately', 'নগদ — আলাদা করে')}</h3>
        <table>
          <caption class="sr-only">${T('Cash movement in two cases', 'দুই অবস্থায় নগদ লেনদেন')}</caption>
          <thead><tr><th scope="col"></th><th scope="col">${T('Repair paid', 'বিল পরিশোধ হলে')}</th><th scope="col">${T('Repair not paid yet', 'বিল এখনো বাকি থাকলে')}</th></tr></thead>
          <tbody>
            <tr><th scope="row">${T('Money received', 'পাওয়া টাকা')}</th><td>${m(MAIN.received)}</td><td>${m(MAIN.received)}</td></tr>
            <tr><th scope="row">${T('Money paid', 'দেওয়া টাকা')}</th><td>${m(MAIN.expensePaid)}</td><td>${m(0)}</td></tr>
            <tr class="tot"><th scope="row">${T('Net cash movement', 'নগদ লেনদেনের ফল')}</th><td>${m(MAIN.netCashPaid)}</td><td>${m(MAIN.netCashUnpaid)}</td></tr>
            <tr><th scope="row">${T('Unpaid expenses', 'অপরিশোধিত খরচ')}</th><td>${m(0)}</td><td>${m(MAIN.unpaidExpense)}</td></tr>
            <tr><th scope="row">${T('Profit', 'লাভ')}</th><td>${m(MAIN.profit)}</td><td>${m(MAIN.profit)}</td></tr>
          </tbody>
        </table>
        <p class="st-note">${T('Profit is the same in both cases; only cash changes.', 'দুই অবস্থাতেই লাভ একই; শুধু নগদ বদলায়।')}</p>
      </div>
    </figure>

    <dl class="concepts">${concepts.map(([c, h, p]) => `<div class="concept ${c}"><dt>${t(h, lang)}</dt><dd>${t(p, lang)}</dd></div>`).join('')}</dl>

    <div class="adj-grid">
      <article class="adj">
        <h3>${T('Driver paid an owner’s repair', 'চালক মালিকের মেরামতের টাকা দিলেন')}</h3>
        <p>${T(`Rent ${money(SETTLE.rent, 'en')}. The driver paid a ${money(SETTLE.repair, 'en')} repair from their own money and hands over ${money(SETTLE.cash, 'en')} cash. You record “Adjust against rent” for ${money(SETTLE.settled, 'en')}.`, `ভাড়া ${money(SETTLE.rent, 'bn')}। চালক নিজের টাকায় ${money(SETTLE.repair, 'bn')}-এর মেরামত করালেন, আর নগদ দিলেন ${money(SETTLE.cash, 'bn')}। আপনি ${money(SETTLE.settled, 'bn')}-এর জন্য “ভাড়া থেকে সমন্বয়” লেখেন।`)}</p>
        <ul class="kv">
          <li><span>${T('Profit', 'লাভ')}</span><b>${m(SETTLE.profit)}</b></li>
          <li><span>${T('Money received', 'পাওয়া টাকা')}</span><b>${m(SETTLE.received)}</b></li>
          <li><span>${T('Money paid', 'দেওয়া টাকা')}</span><b>${m(SETTLE.paid)}</b></li>
          <li><span>${T('Rent due / owed to driver', 'ভাড়া বাকি / চালকের পাওনা')}</span><b>${m(SETTLE.due)}</b></li>
        </ul>
        ${more('rent-adjustments')}
      </article>
      <article class="adj">
        <h3>${T('Part of the rent waived later', 'পরে ভাড়ার কিছু অংশ মাফ')}</h3>
        <p>${T(`Rent ${money(WAIVE.rent, 'en')}, the driver paid ${money(WAIVE.paid, 'en')}, and you later agree to waive ${money(WAIVE.reduced, 'en')} with “Reduce / waive rent”.`, `ভাড়া ${money(WAIVE.rent, 'bn')}, চালক দিলেন ${money(WAIVE.paid, 'bn')}, পরে আপনি “ভাড়া কমান / মাফ করুন” দিয়ে ${money(WAIVE.reduced, 'bn')} মাফ করলেন।`)}</p>
        <ul class="kv">
          <li><span>${T('Earned income from the date agreed', 'রাজি হওয়ার তারিখ থেকে আয়')}</span><b>${m(WAIVE.earned)}</b></li>
          <li><span>${T('Due', 'বাকি')}</span><b>${m(WAIVE.dueAfter)}</b></li>
          <li><span>${T('Cash recorded for the waiver', 'মাফের জন্য নগদ')}</span><b>${m(0)}</b></li>
        </ul>
        ${more('rent-adjustments')}
      </article>
    </div>
    <p class="center">${more('profit-and-cash', 'All money rules, with more examples', 'সব হিসাবের নিয়ম, আরও উদাহরণসহ')}</p>
  </div>
</section>`;

  // ---------------------------------------------------------------- backup
  const backup = `<section class="section backup" id="backup" aria-labelledby="bk-title">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">${T('Backup and restore', 'ব্যাকআপ ও রিস্টোর')}</p>
      <h2 id="bk-title">${T('Protect your records — set it up on day one', 'আপনার হিসাব সুরক্ষিত রাখুন — প্রথম দিনেই সেটআপ করুন')}</h2>
      <p class="lede">${T('Records live on your phone. Backups go to a folder you choose on the phone, so copying that folder somewhere else is what protects you if the phone is lost.', 'তথ্য থাকে আপনার ফোনে। ব্যাকআপ যায় ফোনেই আপনার বাছাই করা ফোল্ডারে — তাই ফোন হারালে রক্ষা পেতে ফোল্ডারটি অন্য কোথাও কপি করে রাখাই আসল কাজ।')}</p>
    </div>
    <figure class="art-fig wide">${backupFlow(lang)}</figure>
    <div class="bk-grid">
      <div class="bk-card"><h3>${T('What the app does', 'অ্যাপ নিজে যা করে')}</h3><ul class="checks">
        <li>${T('After a one-time setup (Android), a data backup about once a day', 'একবার সেটআপের পর (অ্যান্ড্রয়েড), মোটামুটি দিনে একবার তথ্যের ব্যাকআপ')}</li>
        <li>${T('Photos weekly by default, or monthly, or only on demand', 'ছবি ডিফল্টে সাপ্তাহিক, বা মাসিক, বা শুধু চাইলে')}</li>
        <li>${T('“Back up now” any time; the newest 30 backups are kept', 'যেকোনো সময় “এখনই ব্যাকআপ”; সবচেয়ে নতুন ৩০টি রাখা হয়')}</li>
        <li>${T('Optional recovery key to encrypt backups', 'চাইলে রিকভারি কী দিয়ে ব্যাকআপ এনক্রিপ্ট')}</li>
      </ul></div>
      <div class="bk-card"><h3>${T('What you should do', 'আপনার যা করা উচিত')}</h3><ul class="checks">
        <li>${T('Check “last backup” in Backup & Restore now and then', 'মাঝে মাঝে ব্যাকআপ ও রিস্টোরে “শেষ ব্যাকআপ” দেখুন')}</li>
        <li>${T('Recommended routine: copy the “BahonBoi Backups” folder to a computer or USB drive every week', 'পরামর্শ: প্রতি সপ্তাহে “BahonBoi Backups” ফোল্ডার কম্পিউটার বা পেনড্রাইভে কপি করুন')}</li>
        <li>${T('Write the recovery key down and keep it away from the phone and the backups', 'রিকভারি কী লিখে ফোন ও ব্যাকআপ থেকে দূরে রাখুন')}</li>
      </ul></div>
      <div class="bk-card warn"><h3>${T('Good to know', 'জেনে রাখুন')}</h3><ul class="checks">
        <li>${T('Normal backups are not encrypted', 'সাধারণ ব্যাকআপ এনক্রিপ্ট করা নয়')}</li>
        <li>${T('Lose the key and the app installation, and a protected backup cannot be opened', 'কী ও অ্যাপ ইনস্টলেশন দুটোই হারালে সুরক্ষিত ব্যাকআপ খোলা যায় না')}</li>
        <li>${T('Restore replaces the phone’s records; it does not merge', 'রিস্টোর ফোনের তথ্য বদলে দেয়; মেশায় না')}</li>
        <li>${T('Folder backup is not available on iPhone', 'আইফোনে ফোল্ডার ব্যাকআপ নেই')}</li>
      </ul></div>
    </div>
    <p class="center">${more('backup-restore', 'Step-by-step backup and restore guide', 'ধাপে ধাপে ব্যাকআপ ও রিস্টোর নির্দেশিকা')}</p>
  </div>
</section>`;

  // ---------------------------------------------------------------- privacy
  const privacy = `<section class="section section-alt privacy-sec" id="privacy" aria-labelledby="pv-title">
  <div class="wrap pv-grid">
    <div>
      <p class="eyebrow">${T('Offline use and privacy', 'অফলাইন ব্যবহার ও গোপনীয়তা')}</p>
      <h2 id="pv-title">${T('Your accounts stay with you', 'আপনার হিসাব আপনার কাছেই')}</h2>
      <p>${T('Everything you record works without internet. There is no account, no advertising and no analytics or crash-reporting service in the current version, and your records are not sent to the developer. When the phone is online, the app only downloads a small public file to check for a newer version.', 'যা লেখেন সবই ইন্টারনেট ছাড়া চলে। বর্তমান সংস্করণে কোনো অ্যাকাউন্ট, বিজ্ঞাপন, অ্যানালিটিক্স বা ক্র্যাশ-রিপোর্টিং সেবা নেই, আর আপনার তথ্য ডেভেলপারের কাছে পাঠানো হয় না। ফোন অনলাইনে থাকলে অ্যাপ শুধু নতুন সংস্করণ আছে কি না দেখতে একটি ছোট পাবলিক ফাইল নামায়।')}</p>
      <p>${T('Being offline does not make a phone risk-free. Records — including drivers’ ID details — are only as safe as your phone and your backup files.', 'অফলাইন হলেই ফোন পুরোপুরি ঝুঁকিমুক্ত হয় না। চালকের পরিচয়ের তথ্যসহ আপনার হিসাব ততটাই নিরাপদ, যতটা নিরাপদ আপনার ফোন ও ব্যাকআপ ফাইল।')}</p>
      <a class="more-link" href="${appPath(lang, 'privacy')}">${T('Read the Privacy Policy', 'গোপনীয়তা নীতি পড়ুন')} ${icon('arrow', 'arr')}</a>
    </div>
    <ul class="pv-list">
      <li>${icon('offline')}<div><b>${T('Works offline', 'অফলাইনে চলে')}</b><span>${T('Recording, reports, documents, the guide and backups need no internet.', 'হিসাব লেখা, রিপোর্ট, কাগজপত্র, নির্দেশিকা ও ব্যাকআপে ইন্টারনেট লাগে না।')}</span></div></li>
      <li>${icon('phone')}<div><b>${T('Stored on your phone', 'ফোনেই সংরক্ষিত')}</b><span>${T('In the app’s private storage; photos are resized copies.', 'অ্যাপের নিজস্ব স্টোরেজে; ছবির ছোট করা কপি।')}</span></div></li>
      <li>${icon('folder')}<div><b>${T('Backups where you choose', 'ব্যাকআপ আপনার বাছাই করা জায়গায়')}</b><span>${T('If that folder syncs to a cloud service, that service’s terms apply.', 'ফোল্ডারটি কোনো ক্লাউডের সাথে সিঙ্ক হলে সেই সেবার নিয়ম প্রযোজ্য।')}</span></div></li>
      <li>${icon('shield')}<div><b>${T('Your part', 'আপনার দায়িত্ব')}</b><span>${T('Use a screen lock, keep backup copies, and keep any recovery key private.', 'স্ক্রিন লক ব্যবহার করুন, ব্যাকআপ কপি রাখুন, রিকভারি কী গোপন রাখুন।')}</span></div></li>
    </ul>
  </div>
</section>`;

  // ---------------------------------------------------------------- guide teaser
  const guideTeaser = `<section class="section-tight guide-teaser" aria-labelledby="gt-title">
  <div class="wrap gt-box">
    <div><h2 id="gt-title">${T('A complete user guide', 'পূর্ণাঙ্গ ব্যবহার নির্দেশিকা')}</h2>
    <p>${T('Eleven illustrated topics with the app’s real button names, numbered steps, worked examples and how to fix mistakes.', 'এগারোটি বিষয়ে — অ্যাপের আসল বোতামের নাম, ধাপে ধাপে নিয়ম, হিসাবের উদাহরণ আর ভুল ঠিক করার উপায়সহ।')}</p></div>
    <a class="btn btn-primary" href="${g()}">${icon('book')} ${T('Open the guide', 'নির্দেশিকা খুলুন')}</a>
  </div>
</section>`;

  // ---------------------------------------------------------------- faq
  const faq = `<section class="section" id="faq" aria-labelledby="faq-title">
  <div class="wrap faq-wrap">
    <div class="section-head">
      <p class="eyebrow">${T('FAQ', 'প্রশ্নোত্তর')}</p>
      <h2 id="faq-title">${T('Common questions', 'সাধারণ প্রশ্ন')}</h2>
    </div>
    <div class="faq">${FAQ.map(([q, a]) => `<details><summary>${t(q, lang)}</summary><div><p>${t(a, lang)}</p></div></details>`).join('')}</div>
  </div>
</section>`;

  // ---------------------------------------------------------------- cta
  const cta = `<section class="section-tight" id="support" aria-labelledby="cta-title">
  <div class="wrap cta-box">
    <img src="/bahon-boi/assets/logo-320.webp" width="88" height="88" alt="" loading="lazy">
    <div>
      <h2 id="cta-title">${T('Coming soon to Google Play', 'শীঘ্রই Google Play-তে')}</h2>
      <p>${T('Questions or suggestions? Email', 'প্রশ্ন বা পরামর্শ? ইমেইল করুন:')} <a href="mailto:hello@munna.dev?subject=Bahon%20Boi">hello@munna.dev</a></p>
      <ul class="pill-links">
        <li><a href="${appPath(lang, 'contact')}">${T('Contact & support', 'যোগাযোগ ও সাহায্য')}</a></li>
        <li><a href="${appPath(lang, 'terms')}">${T('Terms', 'শর্তাবলি')}</a></li>
        <li><a href="${appPath(lang, 'privacy')}">${T('Privacy Policy', 'গোপনীয়তা নীতি')}</a></li>
        <li><a href="${HUB[lang]}">${T('All apps', 'সব অ্যাপ')}</a></li>
      </ul>
    </div>
  </div>
</section>`;

  const body = [hero, benefitsHtml, showcase, vehiclesHtml, flowHtml, features, accounting, backup, privacy, guideTeaser, faq, cta].join('\n');

  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MobileApplication',
        '@id': SITE + '/bahon-boi/#app',
        name: 'Bahon Boi',
        alternateName: 'বাহন বই',
        url: SITE + APP[lang],
        description: T('Vehicle income, expense, driver and document accounts for vehicle owners in Bangladesh.', 'বাংলাদেশের বাহন মালিকদের জন্য আয়, খরচ, চালক ও কাগজপত্রের হিসাবের অ্যাপ।'),
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Android',
        inLanguage: ['bn', 'en'],
        image: SITE + '/bahon-boi/assets/icon-512.png',
        author: { '@type': 'Person', name: 'Md. Risul Islam Munna', url: 'https://munna.dev' },
      },
      {
        '@type': 'FAQPage',
        inLanguage: lang,
        mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: t(q, lang), acceptedAnswer: { '@type': 'Answer', text: t(a, lang) } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: T('Apps', 'অ্যাপস'), item: SITE + HUB[lang] },
          { '@type': 'ListItem', position: 2, name: T('Bahon Boi', 'বাহন বই'), item: SITE + APP[lang] },
        ],
      },
    ],
  };

  return {
    title: T('Bahon Boi — vehicle income, expense, driver and document accounts', 'বাহন বই — গাড়ির আয়-খরচ, চালক ও কাগজপত্রের হিসাব'),
    description: T(
      'Bahon Boi helps owners of buses, cars, CNGs, auto-rickshaws, trucks and pickups in Bangladesh track earned income, money received, dues, expenses, profit, drivers and document expiry — offline, in Bengali or English.',
      'বাহন বই: বাস, প্রাইভেট কার, সিএনজি, অটোরিকশা, ট্রাক ও পিকআপ মালিকদের জন্য আয়, আদায়, বাকি, খরচ, লাভ, চালক ও কাগজের মেয়াদের হিসাব — অফলাইনে, বাংলায় বা ইংরেজিতে।',
    ),
    body,
    jsonld,
  };
}
