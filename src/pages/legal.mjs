// Terms, Privacy (DRAFTS — noindex until finalized), Contact, and the bilingual 404.
// Privacy facts verified 2026-11-10 against Bahon Boi pubspec.yaml (no analytics/ads/crash SDKs),
// android manifests + plugin manifests, backup_rules.xml / data_extraction_rules.xml,
// guide_content.dart (_backup, _settings) and PROJECT_REPORT.md §2, §11, §16.

import { L, t, esc, SITE } from '../lib.mjs';
import { APP, HUB, appPath } from '../routes.mjs';
import { breadcrumb, breadcrumbLd, legalLinks, icon } from '../components.mjs';

const P = (en, bn) => ({ p: L(en, bn) });
const UL = (...items) => ({ ul: items });
const TODO = (en, bn) => ({ todo: L(en, bn) });

function renderBlocks(blocks, lang) {
  return blocks
    .map((b) => {
      if (b.p) return `<p>${t(b.p, lang)}</p>`;
      if (b.ul) return `<ul>${b.ul.map((x) => `<li>${t(x, lang)}</li>`).join('')}</ul>`;
      if (b.todo) return `<p><span class="todo">TODO</span> ${t(b.todo, lang)}</p>`;
      return '';
    })
    .join('');
}

const MAIL = (subj) => `<a href="mailto:hello@munna.dev?subject=${encodeURIComponent(subj)}">hello@munna.dev</a>`;

const PRIVACY = [
  [L('1. Summary', '১. সংক্ষেপে'), [
    UL(
      L('The records you enter are stored on your phone, in the app’s own storage. They are not sent to the developer, and the developer cannot see them.', 'আপনি যে তথ্য লেখেন তা আপনার ফোনে, অ্যাপের নিজস্ব স্টোরেজে থাকে। ডেভেলপারের কাছে পাঠানো হয় না, ডেভেলপার তা দেখতেও পান না।'),
      L('No account or sign-in is needed to use the app.', 'অ্যাপ ব্যবহারে কোনো অ্যাকাউন্ট বা সাইন-ইন লাগে না।'),
      L('The current version includes no advertising, analytics or crash-reporting service.', 'বর্তমান সংস্করণে কোনো বিজ্ঞাপন, অ্যানালিটিক্স বা ক্র্যাশ-রিপোর্টিং সেবা নেই।'),
      L('You choose where backup files are saved.', 'ব্যাকআপ ফাইল কোথায় থাকবে, তা আপনি বাছেন।'),
    ),
  ]],
  [L('2. Information you keep in the app', '২. আপনি অ্যাপে যে তথ্য রাখেন'), [
    P('The app works with information that you enter or add yourself, such as:', 'অ্যাপের কাজের জন্য আপনি নিজে যে তথ্য লেখেন বা যোগ করেন, যেমন:'),
    UL(
      L('Vehicles: number plate, type, manufacturer and model, purchase date, photos and notes.', 'বাহন: নম্বর প্লেট, ধরন, প্রস্তুতকারক ও মডেল, কেনার তারিখ, ছবি ও নোট।'),
      L('Owners: name, phone number, address, contribution and share.', 'মালিক: নাম, ফোন নম্বর, ঠিকানা, অবদান ও ভাগ।'),
      L('Drivers: name, phone number, NID and driving licence numbers and photos, emergency contact, and assignment history.', 'চালক: নাম, ফোন নম্বর, এনআইডি ও ড্রাইভিং লাইসেন্সের নম্বর ও ছবি, জরুরি যোগাযোগ, নিয়োগের ইতিহাস।'),
      L('Accounts: income, money received, expenses, payments, adjustments, reductions and notes.', 'হিসাব: আয়, পাওয়া টাকা, খরচ, পরিশোধ, সমন্বয়, ছাড় ও নোট।'),
      L('Documents: type, number, issue and expiry dates, and photos.', 'কাগজপত্র: ধরন, নম্বর, ইস্যু ও মেয়াদের তারিখ, এবং ছবি।'),
      L('App settings such as language and theme.', 'ভাষা ও থিমের মতো অ্যাপের সেটিং।'),
    ),
    P('If you store information about drivers, owners or other people, it is your responsibility to have their permission and to follow the law that applies to you.', 'চালক, মালিক বা অন্য কারো তথ্য রাখলে তাঁদের অনুমতি নেওয়া ও প্রযোজ্য আইন মেনে চলা আপনার দায়িত্ব।'),
  ]],
  [L('3. Where information is stored', '৩. তথ্য কোথায় থাকে'), [
    P('Records are stored in a database in the app’s private storage on your phone, and photos in the app’s own folder. There is no Bahon Boi server. Use a screen lock to protect your phone.', 'তথ্য থাকে আপনার ফোনে অ্যাপের নিজস্ব (প্রাইভেট) স্টোরেজের একটি ডেটাবেসে, আর ছবি অ্যাপের নিজস্ব ফোল্ডারে। বাহন বইয়ের কোনো সার্ভার নেই। ফোন সুরক্ষিত রাখতে স্ক্রিন লক ব্যবহার করুন।'),
  ]],
  [L('4. Camera and photos', '৪. ক্যামেরা ও ছবি'), [
    P('When you choose to add a photo of a vehicle, driver, document or bill, the app opens the camera or the photo picker. A resized copy of the photo you pick is kept in the app’s storage.', 'বাহন, চালক, কাগজ বা বিলের ছবি যোগ করতে চাইলে অ্যাপ ক্যামেরা বা ছবি বাছাইয়ের পর্দা খোলে — শুধু আপনি বেছে নিলে। বাছাই করা ছবির ছোট করা একটি কপি অ্যাপের স্টোরেজে রাখা হয়।'),
  ]],
  [L('5. Backups', '৫. ব্যাকআপ'), [
    UL(
      L('<b>App backups (Android):</b> after you set up Backup & Restore and choose a folder, the app saves a data backup about once a day, photo backups on the schedule you choose, and a backup whenever you tap “Back up now”. Backups contain your records and photos.', '<b>অ্যাপের ব্যাকআপ (অ্যান্ড্রয়েড):</b> ব্যাকআপ ও রিস্টোর সেটআপ করে ফোল্ডার বাছার পর অ্যাপ মোটামুটি দিনে একবার তথ্যের ব্যাকআপ, আপনার বাছা সময়সূচিতে ছবির ব্যাকআপ, আর “এখনই ব্যাকআপ” চাপলে ব্যাকআপ রাখে। ব্যাকআপে আপনার তথ্য ও ছবি থাকে।'),
      L('<b>Normal backups</b> are not encrypted — anyone who has the files can read or restore them.', '<b>সাধারণ ব্যাকআপ</b> এনক্রিপ্ট করা নয় — ফাইল যার কাছে থাকবে তিনি পড়তে বা রিস্টোর করতে পারবেন।'),
      L('<b>Protected backups</b> (optional) are encrypted with a recovery key. If the recovery key is lost together with the app installation, protected backups cannot be opened; the developer cannot recover the key.', '<b>সুরক্ষিত ব্যাকআপ</b> (ঐচ্ছিক) রিকভারি কী দিয়ে এনক্রিপ্ট করা হয়। অ্যাপ ইনস্টলেশনের সাথে রিকভারি কী-ও হারালে সুরক্ষিত ব্যাকআপ খোলা যাবে না; ডেভেলপার কী উদ্ধার করতে পারেন না।'),
      L('If you choose a folder that syncs with a cloud service, the files will go to that service and its terms apply.', 'আপনি এমন ফোল্ডার বাছলে যা কোনো ক্লাউড সেবার সাথে সিঙ্ক হয়, ফাইলগুলো সেই সেবায় যাবে এবং সেই সেবার নীতি প্রযোজ্য হবে।'),
      L('<b>Android system backup:</b> if Android’s own backup is turned on in your phone settings, Android may back up app data to your Google account. The files that store the backup key are excluded from it. This is controlled by Android and Google, not by the developer.', '<b>অ্যান্ড্রয়েড সিস্টেম ব্যাকআপ:</b> ফোনের সেটিংসে অ্যান্ড্রয়েডের নিজস্ব ব্যাকআপ চালু থাকলে অ্যান্ড্রয়েড অ্যাপের ডেটা আপনার Google অ্যাকাউন্টে ব্যাকআপ রাখতে পারে। ব্যাকআপ কী রাখার ফাইলগুলো এ থেকে বাদ রাখা হয়েছে। এটি অ্যান্ড্রয়েড ও Google নিয়ন্ত্রণ করে, ডেভেলপার নয়।'),
    ),
  ]],
  [L('6. Google Sheets / Drive connection', '৬. Google Sheets / Drive সংযোগ'), [
    P('The app contains a Google Sheets and Drive sync component, but it is inactive in the current version and the app does not sign in to your Google account. If it is ever turned on, this policy will be updated first.', 'অ্যাপে Google Sheets ও Drive সিঙ্কের একটি অংশ আছে, তবে বর্তমান সংস্করণে এটি নিষ্ক্রিয় এবং অ্যাপ আপনার Google অ্যাকাউন্টে সাইন-ইন করে না। কখনো চালু করা হলে তার আগে এই নীতি হালনাগাদ করা হবে।'),
  ]],
  [L('7. Update check, advertising and analytics', '৭. আপডেট পরীক্ষা, বিজ্ঞাপন ও অ্যানালিটিক্স'), [
    P('<b>Update check (Android):</b> to tell you when a new version is available, the app downloads one small public file, <code>https://apps.munna.dev/app-config/config.json</code>. This happens in the background at most once a day when the phone is online, and whenever you tap “Check for updates” (or “Rate app” before a store listing is known). The request contains no records, names, account or device identifiers — only what every web request carries, such as your IP address and a generic app user agent, which the website host (GitHub Pages) may log. Nothing is uploaded. If the phone is offline or the file cannot be read, the app works exactly as before.', '<b>আপডেট পরীক্ষা (অ্যান্ড্রয়েড):</b> নতুন সংস্করণ এলে জানাতে অ্যাপ একটি ছোট পাবলিক ফাইল নামায়: <code lang="en">https://apps.munna.dev/app-config/config.json</code>। ফোন অনলাইনে থাকলে এটি ব্যাকগ্রাউন্ডে দিনে সর্বোচ্চ একবার হয়, আর আপনি “আপডেট পরীক্ষা করুন” চাপলে (বা স্টোরের তথ্য জানা না থাকলে “অ্যাপ রেট করুন” চাপলে)। এই অনুরোধে আপনার কোনো হিসাব, নাম, অ্যাকাউন্ট বা ডিভাইসের পরিচয় থাকে না — শুধু যা প্রতিটি ওয়েব অনুরোধে থাকে, যেমন আইপি ঠিকানা ও সাধারণ একটি অ্যাপ ইউজার-এজেন্ট, যা ওয়েবসাইটের হোস্ট (<span lang="en">GitHub Pages</span>) লগ রাখতে পারে। কিছুই আপলোড হয় না। ফোন অফলাইন থাকলে বা ফাইল পড়া না গেলে অ্যাপ আগের মতোই চলে।'),
    P('“Rate app” and “Update” open the app’s own Google Play page; anything you do there is covered by Google’s terms.', '“অ্যাপ রেট করুন” ও “আপডেট করুন” অ্যাপের নিজস্ব Google Play পাতা খোলে; সেখানে যা করবেন তা Google-এর নীতির অধীন।'),
    P('The current version includes no advertising network, analytics or crash-reporting service, and does not send usage information to the developer.', 'বর্তমান সংস্করণে কোনো বিজ্ঞাপন নেটওয়ার্ক, অ্যানালিটিক্স বা ক্র্যাশ-রিপোর্টিং সেবা নেই, এবং অ্যাপ ব্যবহারের তথ্য ডেভেলপারকে পাঠায় না।'),
  ]],
  [L('8. Device permissions', '৮. ডিভাইসের অনুমতি'), [
    UL(
      L('<b>Camera / photos</b> — only when you choose to take or pick a photo.', '<b>ক্যামেরা / ছবি</b> — শুধু আপনি ছবি তুলতে বা বাছতে চাইলে।'),
      L('<b>Backup folder access</b> — only to the folder you choose for backups.', '<b>ব্যাকআপ ফোল্ডারে প্রবেশ</b> — শুধু ব্যাকআপের জন্য আপনার বাছা ফোল্ডারে।'),
      L('<b>Background work</b> — used to run the scheduled backup. The app does not send document-reminder notifications.', '<b>ব্যাকগ্রাউন্ডের কাজ</b> — নির্ধারিত ব্যাকআপ চালাতে। অ্যাপ কাগজের মেয়াদের জন্য নোটিফিকেশন পাঠায় না।'),
      L('<b>Internet</b> — used only to download the public update file described in section 7 (it is also declared by the inactive Google sign-in component). Your records are not uploaded by the current version.', '<b>ইন্টারনেট</b> — শুধু ৭ নম্বর অংশে বলা পাবলিক আপডেট ফাইল নামাতে ব্যবহৃত (নিষ্ক্রিয় Google সাইন-ইন অংশের কারণেও এটি ঘোষিত)। বর্তমান সংস্করণ আপনার তথ্য আপলোড করে না।'),
    ),
    TODO('Confirm the final permission list from the release build’s merged Android manifest and update this section.', 'রিলিজ বিল্ডের merged Android manifest থেকে চূড়ান্ত permission তালিকা নিশ্চিত করে এই অংশ হালনাগাদ করুন।'),
  ]],
  [L('9. Deleting information', '৯. তথ্য মুছে ফেলা'), [
    UL(
      L('Entries you delete in the app are removed from lists and totals.', 'অ্যাপে যে এন্ট্রি মোছেন, তা তালিকা ও হিসাব থেকে সরে যায়।'),
      L('To remove all of the app’s data from your phone, clear the app’s data in phone settings or uninstall the app.', 'ফোন থেকে অ্যাপের সব তথ্য মুছতে ফোনের সেটিংস থেকে অ্যাপের ডেটা মুছুন বা অ্যাপ আনইনস্টল করুন।'),
      L('Backup files stay in the folder you chose until you delete them yourself.', 'ব্যাকআপ ফাইল আপনার বাছা ফোল্ডারে থেকে যায়, যতক্ষণ না নিজে মোছেন।'),
      L('The developer holds none of your records, so there is nothing to request deletion of. If you email for help, only what you send is received.', 'ডেভেলপারের কাছে আপনার কোনো হিসাব নেই, তাই মোছার অনুরোধের কিছু নেই। সাহায্যের জন্য ইমেইল করলে শুধু আপনি যা পাঠান, তা-ই পৌঁছায়।'),
    ),
  ]],
  [L('10. Children', '১০. শিশু'), [
    P('The app is made for vehicle owners and transport businesses, not for children.', 'অ্যাপটি বাহন মালিক ও পরিবহন ব্যবসার জন্য তৈরি, শিশুদের জন্য নয়।'),
    TODO('Align with the Play Console “Target audience and content” answers.', 'Play Console-এর “Target audience and content” উত্তরের সাথে মিলিয়ে নিন।'),
  ]],
  [L('11. Changes to this policy', '১১. এই নীতির পরিবর্তন'), [
    P('This policy may be updated when the app changes. The updated policy will be published on this page with a new effective date.', 'অ্যাপ বদলালে এই নীতি হালনাগাদ হতে পারে। হালনাগাদ নীতি নতুন কার্যকর তারিখসহ এই পেজে প্রকাশ করা হবে।'),
  ]],
];

const TERMS = [
  [L('1. What the app is', '১. অ্যাপটি কী'), [
    P('Bahon Boi is a tool for vehicle owners and small transport businesses to keep their own records: income, money received, expenses, payments, drivers and documents, with summaries. It is not a bank, payment or money-transfer service; no money is sent or received through it.', 'বাহন বই বাহন মালিক ও ছোট পরিবহন ব্যবসার নিজের হিসাব রাখার একটি টুল: আয়, পাওয়া টাকা, খরচ, পরিশোধ, চালক ও কাগজপত্র, সারাংশসহ। এটি কোনো ব্যাংক, পেমেন্ট বা টাকা পাঠানোর সেবা নয়; এর মাধ্যমে কোনো টাকা পাঠানো বা নেওয়া হয় না।'),
  ]],
  [L('2. Permission to use', '২. ব্যবহারের অনুমতি'), [
    P('You may use the app to keep your own personal or business records under these terms. The app’s code, design, name and logo belong to the developer. You may not modify, reverse-engineer, resell or redistribute the app under another name, except where the law allows it.', 'এই শর্ত মেনে আপনি নিজের ব্যক্তিগত বা ব্যবসায়িক হিসাব রাখতে অ্যাপটি ব্যবহার করতে পারেন। অ্যাপের কোড, নকশা, নাম ও লোগোর স্বত্ব ডেভেলপারের। আইনে অনুমতি না থাকলে অ্যাপ পরিবর্তন, রিভার্স-ইঞ্জিনিয়ারিং, পুনর্বিক্রয় বা অন্য নামে বিতরণ করা যাবে না।'),
  ]],
  [L('3. Your information and responsibilities', '৩. আপনার তথ্য ও দায়িত্ব'), [
    UL(
      L('You are responsible for the accuracy of what you enter. Reports are calculated from your entries.', 'যা লেখেন তার সঠিকতার দায়িত্ব আপনার। রিপোর্ট আপনার এন্ট্রি থেকেই হিসাব হয়।'),
      L('If you store personal information or photos of drivers, owners or others, you are responsible for having their permission and following the applicable law.', 'চালক, মালিক বা অন্য কারো ব্যক্তিগত তথ্য বা ছবি রাখলে তাঁদের অনুমতি নেওয়া ও প্রযোজ্য আইন মানা আপনার দায়িত্ব।'),
      L('Do not use the app for anything unlawful.', 'অ্যাপটি কোনো বেআইনি কাজে ব্যবহার করবেন না।'),
    ),
  ]],
  [L('4. Data, backups and the recovery key', '৪. তথ্য, ব্যাকআপ ও রিকভারি কী'), [
    P('Your records are on your phone; the developer cannot store or recover them for you. Keeping regular backups, copying them off the phone and keeping any recovery key safe are your responsibility. A protected backup cannot be opened without its recovery key.', 'আপনার তথ্য আপনার ফোনে; ডেভেলপার তা রাখতে বা উদ্ধার করে দিতে পারেন না। নিয়মিত ব্যাকআপ রাখা, ফোনের বাইরে কপি করা ও রিকভারি কী নিরাপদে রাখা আপনার দায়িত্ব। রিকভারি কী ছাড়া সুরক্ষিত ব্যাকআপ খোলা যায় না।'),
  ]],
  [L('5. Limits of the calculations', '৫. হিসাবের সীমাবদ্ধতা'), [
    P('Totals, summaries and reports are for information only. They are not professional accounting, tax, legal or financial advice. Seek a qualified professional where needed.', 'মোট, সারাংশ ও রিপোর্ট শুধু তথ্যের জন্য। এগুলো পেশাদার হিসাবরক্ষণ, কর, আইনি বা আর্থিক পরামর্শ নয়। প্রয়োজনে যোগ্য পেশাদারের পরামর্শ নিন।'),
    P('Document expiry alerts appear inside the app only; the app does not send phone notifications. Renewing documents on time is your responsibility.', 'কাগজের মেয়াদের সতর্কতা শুধু অ্যাপের ভেতরে দেখায়; অ্যাপ ফোনে নোটিফিকেশন পাঠায় না। সময়মতো কাগজ নবায়ন করা আপনার দায়িত্ব।'),
  ]],
  [L('6. Provided “as is”', '৬. “যেমন আছে” ভিত্তিতে'), [
    P('The app is provided “as is” and “as available”, without a guarantee that it will always work without errors or interruption. To the extent the law allows, the developer is not liable for lost data, incorrect totals or business losses arising from use of the app.', 'অ্যাপটি “যেমন আছে” ও “যেমন পাওয়া যায়” ভিত্তিতে দেওয়া হয়; সবসময় ত্রুটিমুক্ত বা নিরবচ্ছিন্নভাবে চলবে — এমন নিশ্চয়তা নেই। আইনে যতটা অনুমোদিত, অ্যাপ ব্যবহারের ফলে তথ্য হারানো, ভুল হিসাব বা ব্যবসায়িক ক্ষতির জন্য ডেভেলপার দায়ী নন।'),
  ]],
  [L('7. Updates and changes', '৭. হালনাগাদ ও পরিবর্তন'), [
    P('The developer may add, change or remove features and may update these terms. Updated terms will be published on this page.', 'ডেভেলপার ফিচার যোগ, বদল বা বন্ধ করতে পারেন এবং এই শর্ত হালনাগাদ করতে পারেন। হালনাগাদ শর্ত এই পেজে প্রকাশ করা হবে।'),
  ]],
  [L('8. Governing law', '৮. প্রযোজ্য আইন'), [
    P('These terms are governed by the laws of Bangladesh.', 'এই শর্তাবলি বাংলাদেশের আইন অনুযায়ী পরিচালিত হবে।'),
    TODO('Confirm with a legal review if needed.', 'প্রয়োজনে আইনগত পর্যালোচনা করে নিশ্চিত করুন।'),
  ]],
];

function legalPage(lang, kind) {
  const T = (en, bn) => t(L(en, bn), lang);
  const isPrivacy = kind === 'privacy';
  const title = isPrivacy ? L('Privacy Policy', 'গোপনীয়তা নীতি') : L('Terms and Conditions', 'শর্তাবলি');
  const items = [[HUB, L('Apps', 'অ্যাপস')], [APP, L('Bahon Boi', 'বাহন বই')], [appPath(kind), title]];
  const sections = (isPrivacy ? PRIVACY : TERMS)
    .map(([h, blocks]) => `<h2>${t(h, lang)}</h2>${renderBlocks(blocks, lang)}`)
    .join('');
  const n = (isPrivacy ? PRIVACY : TERMS).length + 1;
  const body = `<section class="section-tight">
  <div class="wrap prose">
    ${breadcrumb(lang, items)}
    <h1>${t(title, lang)}</h1>
    <p class="muted">${T('Bahon Boi app', 'বাহন বই অ্যাপ')} · ${T('Effective date', 'কার্যকর তারিখ')}: <span class="todo">TODO</span> ${T('publication date', 'প্রকাশের তারিখ')}</p>
    <div class="draft-banner" role="note"><b>${T('Draft:', 'খসড়া:')}</b> ${T('this document is under review and not final. It will be finalized before the app is published.', 'এটি পর্যালোচনাধীন, চূড়ান্ত নয়। অ্যাপ প্রকাশের আগে চূড়ান্ত করা হবে।')}</div>
    <p>${isPrivacy
      ? T('This policy explains what information the Bahon Boi app (“the app”) works with, where it is kept and how you control it. The app is made and published by Md. Risul Islam Munna (“the developer”). It applies to the Bahon Boi app only.', 'এই নীতিতে বলা হয়েছে বাহন বই অ্যাপ (“অ্যাপ”) কোন তথ্য নিয়ে কাজ করে, তা কোথায় থাকে এবং আপনি কীভাবে নিয়ন্ত্রণ করেন। অ্যাপটি তৈরি ও প্রকাশ করেছেন Md. Risul Islam Munna (“ডেভেলপার”)। নীতিটি শুধু বাহন বই অ্যাপের জন্য।')
      : T('The Bahon Boi app (“the app”) is made and published by Md. Risul Islam Munna (“the developer”). By installing or using the app you accept these terms. If you do not agree, please do not use the app.', 'বাহন বই অ্যাপ (“অ্যাপ”) তৈরি ও প্রকাশ করেছেন Md. Risul Islam Munna (“ডেভেলপার”)। অ্যাপ ইনস্টল বা ব্যবহার করলে আপনি এই শর্তাবলি মেনে নিচ্ছেন। রাজি না হলে অনুগ্রহ করে অ্যাপটি ব্যবহার করবেন না।')}</p>
    ${sections}
    <h2>${lang === 'bn' ? `${['','১','২','৩','৪','৫','৬','৭','৮','৯','১০','১১','১২','১৩'][n]}. যোগাযোগ` : `${n}. Contact`}</h2>
    <p>${T('Questions about this document? Email', 'এ বিষয়ে প্রশ্ন থাকলে ইমেইল করুন:')} ${MAIL(isPrivacy ? 'Bahon Boi privacy' : 'Bahon Boi terms')}</p>
    ${legalLinks(lang, appPath, kind)}
  </div>
</section>`;
  return {
    title: `${t(title, lang)} — ${T('Bahon Boi', 'বাহন বই')}`,
    description: isPrivacy
      ? T('What the Bahon Boi app stores, where, how backups work, and how to delete data.', 'বাহন বই অ্যাপ কী তথ্য রাখে, কোথায় রাখে, ব্যাকআপ কীভাবে কাজ করে এবং তথ্য কীভাবে মুছবেন।')
      : T('Terms for using the Bahon Boi app: permitted use, your responsibilities, backups and the limits of its calculations.', 'বাহন বই অ্যাপ ব্যবহারের শর্ত: ব্যবহারের নিয়ম, আপনার দায়িত্ব, ব্যাকআপ ও হিসাবের সীমাবদ্ধতা।'),
    body,
    robots: 'noindex,follow',
    jsonld: { '@context': 'https://schema.org', ...breadcrumbLd(SITE, items, lang) },
  };
}

export const privacyPage = (lang) => legalPage(lang, 'privacy');
export const termsPage = (lang) => legalPage(lang, 'terms');

export function contactPage(lang) {
  const T = (en, bn) => t(L(en, bn), lang);
  const items = [[HUB, L('Apps', 'অ্যাপস')], [APP, L('Bahon Boi', 'বাহন বই')], [appPath('contact'), L('Contact', 'যোগাযোগ')]];
  const body = `<section class="section-tight">
  <div class="wrap">
    ${breadcrumb(lang, items)}
    <h1>${T('Contact and support', 'যোগাযোগ ও সাহায্য')}</h1>
    <p class="lede">${T('Questions, a problem, or an idea for Bahon Boi? Email in Bengali or English.', 'বাহন বই নিয়ে প্রশ্ন, সমস্যা বা কোনো পরামর্শ? বাংলা বা ইংরেজিতে ইমেইল করুন।')}</p>
    <div class="contact-grid">
      <div class="card">
        <span class="ico">${icon('mail')}</span>
        <h2>${T('Email', 'ইমেইল')}</h2>
        <p><a class="email-link" href="mailto:hello@munna.dev?subject=Bahon%20Boi%20support">hello@munna.dev</a></p>
        <p class="muted">${T('Putting “Bahon Boi” in the subject helps.', 'বিষয়ে “Bahon Boi” লিখলে খুঁজে পেতে সুবিধা হয়।')}</p>
        <a class="btn btn-primary" href="mailto:hello@munna.dev?subject=Bahon%20Boi%20support">${T('Write an email', 'ইমেইল লিখুন')}</a>
      </div>
      <div class="card">
        <h2>${T('When reporting a problem, include', 'সমস্যা জানালে লিখুন')}</h2>
        <ul class="checks">
          <li>${T('The app version (shown at the bottom of Settings and of the menu)', 'অ্যাপের সংস্করণ (সেটিংস ও মেনুর নিচে দেখায়)')}</li>
          <li>${T('Your phone model and Android version', 'ফোনের মডেল ও অ্যান্ড্রয়েড সংস্করণ')}</li>
          <li>${T('What you were doing, step by step', 'কী করতে গিয়ে সমস্যা হলো, ধাপে ধাপে')}</li>
          <li>${T('A screenshot if useful — with personal details covered', 'দরকার হলে স্ক্রিনশট — ব্যক্তিগত তথ্য ঢেকে')}</li>
        </ul>
      </div>
      <div class="card warn">
        <h2>${T('Please do not send', 'যা পাঠাবেন না')}</h2>
        <ul class="warn-list">
          <li>${T('Your recovery key', 'রিকভারি কী')}</li>
          <li>${T('Backup files or the app’s database', 'ব্যাকআপ ফাইল বা অ্যাপের ডেটাবেস')}</li>
          <li>${T('Photos of anyone’s NID, licence or other personal documents', 'কারো এনআইডি, লাইসেন্স বা অন্য ব্যক্তিগত কাগজের ছবি')}</li>
        </ul>
        <p class="muted">${T('They are never needed for support.', 'সাহায্যের জন্য এগুলো কখনো লাগে না।')}</p>
      </div>
    </div>
    <div class="help-band">
      <p>${T('Many answers are already in the', 'অনেক প্রশ্নের উত্তর আছে')} <a href="${appPath('guide')}">${T('user guide', 'ব্যবহার নির্দেশিকায়')}</a> ${T('and the', 'এবং')} <a href="${APP}#faq">${T('FAQ', 'প্রশ্নোত্তরে')}</a>. ${T('The same guide is inside the app: Menu (☰) → App guide.', 'একই নির্দেশিকা অ্যাপেও আছে: মেনু (☰) → অ্যাপ ব্যবহারের নির্দেশিকা।')}</p>
      <p class="muted">${T('Developer', 'ডেভেলপার')}: <span lang="en">Md. Risul Islam Munna</span> · <a href="https://munna.dev" rel="noopener">munna.dev</a> · <a href="https://www.facebook.com/munna.dev.bd/" rel="noopener">Facebook</a> · <a href="https://www.linkedin.com/in/risul-islam-munna/" rel="noopener">LinkedIn</a></p>
    </div>
    ${legalLinks(lang, appPath, 'contact')}
  </div>
</section>`;
  return {
    title: `${T('Contact and support', 'যোগাযোগ ও সাহায্য')} — ${T('Bahon Boi', 'বাহন বই')}`,
    description: T('Email hello@munna.dev for Bahon Boi questions, problems or suggestions — what to include, and what not to send.', 'বাহন বই নিয়ে প্রশ্ন, সমস্যা বা পরামর্শের জন্য hello@munna.dev-এ ইমেইল করুন — কী লিখবেন আর কী পাঠাবেন না।'),
    body,
    current: 'contact',
    jsonld: {
      '@context': 'https://schema.org',
      '@graph': [{ '@type': 'ContactPage', url: SITE + appPath('contact'), inLanguage: lang }, breadcrumbLd(SITE, items, lang)],
    },
  };
}

/** GitHub Pages serves one 404 page, so it carries both languages. */
export function notFoundHtml() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page not found · পেজটি পাওয়া যায়নি — apps.munna.dev</title>
<meta name="description" content="This page does not exist. এই ঠিকানায় কোনো পেজ নেই।">
<meta name="robots" content="noindex,follow">
<meta name="theme-color" content="#f6f4ef">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="/assets/site.css">
</head>
<body class="hub">
<!--email_off-->
<header class="site-header"><div class="wrap header-row">
  <a class="brand" href="/" aria-label="apps.munna.dev"><img src="/assets/favicon.svg" width="36" height="36" alt=""><span><b>apps.munna.dev</b></span></a>
</div></header>
<main id="main">
  <section class="section nf">
    <div class="wrap nf-grid">
      <div>
        <p class="eyebrow">404</p>
        <h1>This page is not in the book</h1>
        <p class="lede">The page you are looking for does not exist or has moved. Web addresses are case-sensitive.</p>
        <div class="btn-row"><a class="btn btn-primary" href="/">All apps</a><a class="btn btn-ghost" href="/bahon-boi/">Bahon Boi</a><a class="btn btn-ghost" href="/bahon-boi/guide/">User guide</a></div>
      </div>
      <div lang="bn">
        <p class="eyebrow">৪০৪</p>
        <h2 class="nf-h">এই পাতাটি বইয়ে নেই</h2>
        <p class="lede">যে পেজ খুঁজছেন সেটি নেই বা সরানো হয়েছে। ঠিকানায় বড়-ছোট হাতের অক্ষর ঠিক আছে কি না দেখে নিন।</p>
        <div class="btn-row"><a class="btn btn-primary" href="/">সব অ্যাপ</a><a class="btn btn-ghost" href="/bahon-boi/">বাহন বই</a><a class="btn btn-ghost" href="/bahon-boi/guide/">ব্যবহার নির্দেশিকা</a></div>
      </div>
    </div>
  </section>
</main>
<footer class="site-footer"><div class="wrap"><p class="copy">&copy; 2026 Md. Risul Islam Munna · <a href="mailto:hello@munna.dev">hello@munna.dev</a></p></div></footer>
<!--/email_off-->
</body>
</html>
`;
}
