// Bahon Boi user-guide topics. Source of truth: the app's own bundled guide
// (lib/features/guide/guide_content.dart), app translations (lib/app/localization/*.dart)
// and PROJECT_REPORT.md §2/§3/§8. Button and screen names are copied from the app.
// Each topic: what/when, where, what you need, steps, examples, result,
// mistakes & exceptions, how to correct or undo.

import { L } from '../lib.mjs';
import { MAIN, SETTLE, WAIVE, PARTIAL, ADVANCE, WEEK, SPREAD, LATE, SHARE, PROFIT, CASH, PREPAID } from '../examples.mjs';

// Example-line helpers: value is a number (money) or a bilingual string.
const ln = (label, value, extra = {}) => ({ label, value, ...extra });

export const GROUPS = [
  { title: L('Getting started', 'শুরু করা'), topics: ['getting-started'] },
  { title: L('Vehicles and people', 'বাহন ও মানুষ'), topics: ['vehicles-owners', 'drivers'] },
  { title: L('Money', 'টাকার হিসাব'), topics: ['income', 'money-received', 'expenses', 'rent-adjustments', 'profit-and-cash'] },
  { title: L('Reports and documents', 'রিপোর্ট ও কাগজপত্র'), topics: ['reports', 'documents'] },
  { title: L('Keeping your data safe', 'তথ্য নিরাপদ রাখা'), topics: ['backup-restore'] },
];

export const NOT_AVAILABLE = [
  L('Phone notifications for document expiry (alerts are shown inside the app only).', 'কাগজের মেয়াদের জন্য ফোনে নোটিফিকেশন (সতর্কতা শুধু অ্যাপের ভেতরে দেখায়)।'),
  L('Cloud sync or online backup. Google Sheets & Drive sync is inactive; backups stay in a folder you choose.', 'ক্লাউড সিঙ্ক বা অনলাইন ব্যাকআপ। Google Sheets ও Drive সিঙ্ক নিষ্ক্রিয়; ব্যাকআপ থাকে আপনার বাছাই করা ফোল্ডারে।'),
  L('Reading text from ID card photos (scanning).', 'পরিচয়পত্রের ছবি থেকে লেখা পড়া (স্ক্যান)।'),
  L('Checking NID or licence numbers against government records.', 'সরকারি তথ্যের সাথে এনআইডি বা লাইসেন্স নম্বর যাচাই।'),
  L('PDF attachments (photos only).', 'পিডিএফ সংযুক্তি (শুধু ছবি)।'),
  L('Splitting profit between owners by their shares.', 'মালিকদের ভাগ অনুযায়ী লাভ ভাগ করা।'),
  L('An opening cash balance, so “cash in hand” is not shown.', 'শুরুর নগদ জমা, তাই “হাতে নগদ” দেখানো হয় না।'),
  L('More than one income entry for the same vehicle on the same day.', 'একই দিনে একটি বাহনের একাধিক আয়ের এন্ট্রি।'),
  L('Exporting or sharing reports, and folder backups on iPhone.', 'রিপোর্ট এক্সপোর্ট বা শেয়ার করা, এবং আইফোনে ফোল্ডার ব্যাকআপ।'),
];

export const TOPICS = {
  // ------------------------------------------------------------------ 1
  'getting-started': {
    icon: 'flag',
    title: L('First steps, Home screen and settings', 'প্রথম ধাপ, ড্যাশবোর্ড ও সেটিংস'),
    summary: L(
      'Bahon Boi keeps each vehicle’s income, money received, expenses, drivers and documents on your phone. It works without internet and needs no account.',
      'বাহন বই প্রতিটি বাহনের আয়, পাওয়া টাকা, খরচ, চালক ও কাগজপত্রের হিসাব আপনার ফোনেই রাখে। ইন্টারনেট বা অ্যাকাউন্ট ছাড়াই চলে।',
    ),
    when: L(
      'Read this first, right after installing the app, or when you want to try it safely with sample data.',
      'অ্যাপ ইনস্টল করার পরপরই এটি পড়ুন, অথবা যখন নমুনা তথ্য দিয়ে নিরাপদে চালিয়ে দেখতে চান।',
    ),
    where: [
      L('Welcome screen → “Add your first vehicle” or “Try with sample data”', 'স্বাগত পর্দা → “প্রথম বাহন যোগ করুন” বা “নমুনা তথ্য দিয়ে দেখুন”'),
      L('Bottom bar: Home · Vehicles · + · Reports · Settings', 'নিচের বার: ড্যাশবোর্ড · বাহন · + · রিপোর্ট · সেটিংস'),
      L('Menu (☰, top left) → App guide at the bottom', 'মেনু (☰, বাঁ দিকে ওপরে) → একেবারে নিচে অ্যাপ ব্যবহারের নির্দেশিকা'),
    ],
    need: [L('Nothing — you can start with sample data.', 'কিছুই না — নমুনা তথ্য দিয়েও শুরু করা যায়।')],
    steps: [
      L('Open the app. On the welcome screen tap “Add your first vehicle”, or open Vehicles and tap “Add vehicle”.', 'অ্যাপ খুলুন। স্বাগত পর্দায় “প্রথম বাহন যোগ করুন” চাপুন, অথবা বাহন খুলে “বাহন যোগ করুন” চাপুন।'),
      L('Want to look around first? Tap “Try with sample data”, or turn on Demo mode in Settings. A banner shows while demo mode is on; tap “Exit demo” to go back to your own records.', 'আগে ঘুরে দেখতে চান? “নমুনা তথ্য দিয়ে দেখুন” চাপুন, অথবা সেটিংসে ডেমো মোড চালু করুন। ডেমো চালু থাকলে ওপরে একটি বার্তা দেখায়; নিজের তথ্যে ফিরতে “ডেমো বন্ধ” চাপুন।'),
      L('On the Home screen, choose a month with the month selector. Four cards show earned income, expenses, profit or loss, and money still to collect as of today.', 'ড্যাশবোর্ডে ওপরের মাস বাছাই থেকে মাস বেছে নিন। চারটি কার্ডে দেখায় অর্জিত আয়, খরচ, লাভ বা ক্ষতি, আর আজ পর্যন্ত কত আদায় বাকি।'),
      L('Below the cards you see money received and money paid in that month. Open “More figures” for net cash movement, unpaid expenses and advances. Tap any amount to see the entries behind it.', 'কার্ডের নিচে ওই মাসে পাওয়া ও দেওয়া টাকা দেখায়। নগদ লেনদেনের ফল, অপরিশোধিত খরচ ও অগ্রিম দেখতে “আরও হিসাব” খুলুন। যেকোনো অঙ্কে চাপলে তার পেছনের এন্ট্রিগুলো দেখা যায়।'),
      L('Tap + in the bottom bar for quick actions: add income, add expense, money received, transactions, drivers and add driver.', 'নিচের বারের + চাপলে দ্রুত কাজ খোলে: আয় যোগ, খরচ যোগ, টাকা পেলাম, লেনদেন, চালকগণ ও চালক যোগ।'),
      L('In Settings choose the language (বাংলা or English) and appearance (System, Light or Dark). The whole app, including its guide, switches language.', 'সেটিংসে ভাষা (বাংলা বা English) ও চেহারা (ফোন অনুযায়ী, হালকা বা গাঢ়) বাছুন। পুরো অ্যাপ, তার নির্দেশিকাসহ, ভাষা বদলায়।'),
    ],
    result: L(
      'Your first vehicle appears under Vehicles, and the Home screen starts filling in as you add entries. Demo data is kept in a separate place and never mixes with your own records.',
      'প্রথম বাহনটি “বাহন” তালিকায় আসে, আর এন্ট্রি যোগ করার সাথে সাথে ড্যাশবোর্ড ভরতে থাকে। ডেমো তথ্য আলাদা জায়গায় থাকে, কখনো আপনার নিজের তথ্যের সাথে মেশে না।',
    ),
    mistakes: [
      L('Every income and expense belongs to a vehicle, so add a vehicle before anything else.', 'প্রতিটি আয় ও খরচ কোনো একটি বাহনের, তাই সবার আগে বাহন যোগ করুন।'),
      L('Future months cannot be chosen on the Home screen.', 'ড্যাশবোর্ডে ভবিষ্যতের মাস বাছা যায় না।'),
      L('Entries made in demo mode are sample data. Exit demo before recording real accounts.', 'ডেমো মোডে লেখা এন্ট্রি নমুনা তথ্য। আসল হিসাব লেখার আগে ডেমো বন্ধ করুন।'),
    ],
    fix: [L('Turn off demo mode any time with “Exit demo”. Your own records were never changed.', '“ডেমো বন্ধ” দিয়ে যেকোনো সময় ডেমো মোড বন্ধ করুন। আপনার নিজের তথ্য কখনো বদলায়নি।')],
    related: ['vehicles-owners', 'income', 'backup-restore'],
  },

  // ------------------------------------------------------------------ 2
  'vehicles-owners': {
    icon: 'car',
    title: L('Vehicles, owners and photos', 'বাহন, মালিক ও ছবি'),
    summary: L(
      'Each vehicle has its own book: income, expenses, documents, drivers and owners. Owners are records only — they do not get their own login.',
      'প্রতিটি বাহনের নিজের আলাদা খাতা: আয়, খরচ, কাগজপত্র, চালক ও মালিক। মালিকেরা শুধু তথ্য হিসেবে থাকেন — তাঁদের আলাদা লগইন নেই।',
    ),
    when: L('When you start using the app, buy a new vehicle, or need to record who owns a vehicle and how much each owner put in.', 'অ্যাপ ব্যবহার শুরু করলে, নতুন বাহন কিনলে, অথবা কে কে বাহনের মালিক ও কে কত টাকা দিয়েছেন তা লিখে রাখতে।'),
    where: [
      L('Vehicles → Add vehicle', 'বাহন → বাহন যোগ করুন'),
      L('Open a vehicle → Edit (the button then says Update)', 'বাহন খুলুন → সম্পাদনা (তখন বোতামে লেখা থাকে আপডেট করুন)'),
      L('Vehicle form → Owners → Add owner / Choose existing owner', 'বাহনের ফর্ম → মালিক → মালিক যোগ করুন / আগের মালিক বাছুন'),
    ],
    need: [
      L('A nickname you will recognise, for example “Green CNG”.', 'চেনার মতো একটি নাম, যেমন “সবুজ সিএনজি”।'),
      L('Vehicle type, and the registration (number plate) if it has one.', 'বাহনের ধরন, আর নিবন্ধন নম্বর (নম্বর প্লেট) থাকলে সেটি।'),
      L('Optional: subtype, manufacturer, model, purchase date, photos, notes.', 'ঐচ্ছিক: উপধরন, প্রস্তুতকারক, মডেল, কেনার তারিখ, ছবি, নোট।'),
      L('For owners: name and phone; for shares, the ownership base amount and each owner’s capital contribution.', 'মালিকের জন্য: নাম ও ফোন; ভাগের জন্য মালিকানার মূল অঙ্ক ও প্রতিটি মালিকের মূলধন অবদান।'),
    ],
    steps: [
      L('Open Vehicles and tap “Add vehicle”.', 'বাহন খুলে “বাহন যোগ করুন” চাপুন।'),
      L('Enter the nickname and choose the type: CNG, private car, auto-rickshaw, bus, truck, pickup, motorcycle, or Other with your own type name.', 'নাম দিন ও ধরন বাছুন: সিএনজি, প্রাইভেট কার, অটোরিকশা, বাস, ট্রাক, পিকআপ, মোটরসাইকেল, অথবা “অন্যান্য” বেছে নিজের দেওয়া নাম।'),
      L('Enter the number plate. If there is no plate yet, turn on “Not registered yet” — the nickname then identifies the vehicle.', 'নম্বর প্লেট লিখুন। প্লেট এখনো না থাকলে “এখনো নিবন্ধিত নয়” চালু করুন — তখন নাম দিয়েই বাহন চেনা যাবে।'),
      L('Add photos: tap Add, then Take photo or Choose photo. Use “Set as cover” for the main photo.', 'ছবি দিন: “যোগ করুন” চেপে “ছবি তুলুন” বা “ছবি বাছুন”। প্রধান ছবির জন্য “প্রধান ছবি করুন” চাপুন।'),
      L('Under Owners, tap “Add owner” or “Choose existing owner”, and mark one owner as “Primary contact”.', 'মালিক অংশে “মালিক যোগ করুন” বা “আগের মালিক বাছুন” চাপুন, আর একজনকে “প্রধান যোগাযোগ” করুন।'),
      L('For shares, enter the ownership base amount (the agreed value of the vehicle) and each owner’s capital contribution. Each share is calculated for you.', 'ভাগের জন্য মালিকানার মূল অঙ্ক (বাহনের সম্মত মূল্য) ও প্রতিটি মালিকের মূলধন অবদান লিখুন। ভাগ নিজে থেকেই হিসাব হয়।'),
      L('Tap Save. The vehicle screen has Overview, Income, Expenses and Documents tabs, plus buttons to add entries for that vehicle.', '“সংরক্ষণ করুন” চাপুন। বাহনের পর্দায় সারসংক্ষেপ, আয়, খরচ ও কাগজপত্র ট্যাব আছে, সাথে ওই বাহনের এন্ট্রি যোগ করার বোতাম।'),
    ],
    examples: [
      {
        title: L('Calculating an ownership share', 'মালিকানার ভাগ হিসাব'),
        lines: [
          ln(L('Owner’s contribution', 'মালিকের অবদান'), SHARE.contribution),
          ln(L('Ownership base', 'মালিকানার মূল অঙ্ক'), SHARE.base, { op: '÷' }),
          ln(L('Share', 'ভাগ'), L(`${SHARE.pct}%`, `${SHARE.pct}%`), { op: '=', result: true, tone: 'accent', digits: true }),
        ],
        caption: L('The share is a record only. The app does not split profit between owners.', 'ভাগ শুধু তথ্য হিসেবে থাকে। অ্যাপ মালিকদের মধ্যে লাভ ভাগ করে না।'),
      },
    ],
    result: L(
      'The vehicle gets its own book. Search vehicles by name or plate and filter All / Active / Inactive. Ownership changes ask you to confirm, and earlier values stay in “Ownership history” on the vehicle’s Overview.',
      'বাহনটির নিজের খাতা তৈরি হয়। নাম বা প্লেট দিয়ে বাহন খুঁজুন, সব / চালু / বন্ধ দিয়ে ছাঁকুন। মালিকানা বদলালে নিশ্চিত করতে বলা হয়, আর আগের হিসাব বাহনের সারসংক্ষেপে “মালিকানার ইতিহাস”-এ থেকে যায়।',
    ),
    mistakes: [
      L('A number plate can belong to only one vehicle, even if typed with different spaces or letter case.', 'একটি নম্বর প্লেট শুধু একটি বাহনেই ব্যবহার করা যায়, ফাঁকা জায়গা বা বড়-ছোট অক্ষর আলাদা হলেও।'),
      L('Contributions cannot add up to more than the ownership base. If they add up to less, tick “Keep the remaining share unallocated” to save.', 'অবদানের যোগফল মূল অঙ্কের বেশি হতে পারে না। কম হলে সংরক্ষণের জন্য “বাকি ভাগ অবণ্টিত রাখুন” টিক দিন।'),
      L('Fuel or repairs paid by an owner do not change ownership, and contributions are not income.', 'কোনো মালিক জ্বালানি বা মেরামতের টাকা দিলে মালিকানা বদলায় না, আর অবদান আয় নয়।'),
      L('Vehicles saved earlier with percentages keep them until you tap “Convert to contribution-based”.', 'আগে শতাংশ দিয়ে রাখা বাহনে সেই শতাংশই থাকে, যতক্ষণ না “অবদানভিত্তিকে রূপান্তর” চাপেন।'),
    ],
    fix: [
      L('Open the vehicle and tap Edit, change the details, then Update.', 'বাহনটি খুলে “সম্পাদনা” চাপুন, তথ্য বদলে “আপডেট করুন” চাপুন।'),
      L('A vehicle with income or expenses cannot be deleted. Turn off “Vehicle is active” instead: its history stays, and it is hidden from new entries.', 'আয় বা খরচ আছে এমন বাহন মোছা যায় না। তার বদলে “বাহনটি চালু আছে” বন্ধ করুন: ইতিহাস থেকে যায়, নতুন এন্ট্রিতে আর দেখায় না।'),
      L('To remove a photo, open it and choose Remove; it is removed when you save the form.', 'ছবি সরাতে ছবিটি খুলে “সরান” বাছুন; ফর্ম সংরক্ষণ করলে তবেই সরে।'),
    ],
    related: ['drivers', 'documents', 'income'],
  },

  // ------------------------------------------------------------------ 3
  drivers: {
    icon: 'driver',
    figure: 'assignment',
    title: L('Drivers and assignments', 'চালক ও নিয়োগ'),
    summary: L(
      'Keep each driver’s details, ID numbers, emergency contact and photos in one place, and record which vehicle they drive, on which shift and from when.',
      'প্রতিটি চালকের তথ্য, পরিচয়পত্রের নম্বর, জরুরি যোগাযোগ ও ছবি এক জায়গায় রাখুন, আর কে কোন বাহন কোন শিফটে কবে থেকে চালান তা লিখে রাখুন।',
    ),
    when: L('When you hire a driver, change shifts, or a driver stops driving a vehicle.', 'চালক নিয়োগ দিলে, শিফট বদলালে, বা কোনো চালক বাহন চালানো বন্ধ করলে।'),
    where: [
      L('+ or menu → Drivers → Add driver', '+ বা মেনু → চালকগণ → চালক যোগ করুন'),
      L('Open a vehicle → Assign driver', 'বাহন খুলুন → চালক নিযুক্ত করুন'),
      L('Vehicle form → Drivers (choose saved drivers or add a new one)', 'বাহনের ফর্ম → চালক (সংরক্ষিত চালক বাছুন বা নতুন যোগ করুন)'),
    ],
    need: [
      L('Required: name, mobile number, NID number and driving licence number. Bengali digits work too.', 'আবশ্যক: নাম, মোবাইল নম্বর, এনআইডি নম্বর ও ড্রাইভিং লাইসেন্স নম্বর। বাংলা অঙ্কেও লেখা যায়।'),
      L('Optional: address, licence expiry date, notes, an emergency contact (name, relationship, phone), and photos.', 'ঐচ্ছিক: ঠিকানা, লাইসেন্সের মেয়াদ, নোট, জরুরি যোগাযোগ (নাম, সম্পর্ক, ফোন) ও ছবি।'),
      L('For an assignment: vehicle, start date and shift. Optional: end date, expected daily deposit, notes.', 'নিয়োগের জন্য: বাহন, শুরুর তারিখ ও শিফট। ঐচ্ছিক: শেষের তারিখ, প্রত্যাশিত দৈনিক জমা, নোট।'),
    ],
    steps: [
      L('Open Drivers from the menu or the + button, then tap “Add driver”.', 'মেনু বা + থেকে “চালকগণ” খুলে “চালক যোগ করুন” চাপুন।'),
      L('Enter the name, mobile number, NID number and licence number exactly as printed.', 'নাম, মোবাইল নম্বর, এনআইডি ও লাইসেন্স নম্বর কার্ডে যেমন ছাপা তেমনই লিখুন।'),
      L('Add a profile photo and photos of the NID and licence, front and back (one image each). Anything else goes under Other images.', 'প্রোফাইল ছবি এবং এনআইডি ও লাইসেন্সের সামনে-পেছনের ছবি দিন (প্রতিটিতে একটি)। বাকি সব “অন্যান্য ছবি”-তে।'),
      L('Save. Then open the vehicle and tap “Assign driver”: set the start date and shift — Not specified, Day, Night, or Custom with start and end times.', 'সংরক্ষণ করুন। তারপর বাহনটি খুলে “চালক নিযুক্ত করুন” চাপুন: শুরুর তারিখ ও শিফট দিন — নির্দিষ্ট নয়, দিনের, রাতের, অথবা শুরু-শেষের সময়সহ নিজস্ব।'),
      L('If a custom end time is earlier than the start time, the shift runs past midnight.', 'নিজস্ব শিফটে শেষের সময় শুরুর আগে হলে শিফট মাঝরাত পেরিয়ে পরদিন পর্যন্ত চলে।'),
      L('When a driver stops, use “End assignment”: it ends today and stays in the history.', 'চালক বাদ দিলে “নিয়োগ শেষ করুন” চাপুন: আজকের তারিখে শেষ হয় আর ইতিহাসে থেকে যায়।'),
    ],
    result: L(
      'The vehicle’s screen lists every active driver, and income and money-received forms show that vehicle’s drivers first. Search drivers by name, phone, ID number or vehicle.',
      'বাহনের পর্দায় সব চালু চালকের নাম দেখায়, আর আয় ও টাকা পাওয়ার ফর্মে ওই বাহনের চালকেরা আগে আসেন। নাম, ফোন, পরিচয় নম্বর বা বাহন দিয়ে চালক খোঁজা যায়।',
    ),
    mistakes: [
      L('The expected daily deposit is only a reference. It never becomes income by itself — record income yourself.', 'প্রত্যাশিত দৈনিক জমা শুধু একটি সূত্র। এটি কখনো নিজে থেকে আয় হয় না — আয় নিজে লিখুন।'),
      L('The same driver cannot have the same shift on the same vehicle for overlapping dates. Different drivers or different shifts are fine.', 'একই চালককে একই বাহনে একই শিফটে মিলে যাওয়া তারিখে দুবার রাখা যায় না। ভিন্ন চালক বা ভিন্ন শিফট রাখা যায়।'),
      L('ID numbers are saved as typed. The app does not check them against any government record, and cannot read text from card photos.', 'পরিচয় নম্বর যেমন লেখেন তেমনই থাকে। অ্যাপ কোনো সরকারি তথ্যের সাথে যাচাই করে না, ছবি থেকে লেখাও পড়ে না।'),
      L('Drivers added before ID numbers were required show “Information incomplete” until you edit them.', 'পরিচয় নম্বর আবশ্যক হওয়ার আগে যোগ করা চালকের পাশে “তথ্য অসম্পূর্ণ” দেখায়, সম্পাদনা না করা পর্যন্ত।'),
      L('Driver details and ID photos are personal information. Keep your phone locked and your backups safe.', 'চালকের তথ্য ও পরিচয়পত্রের ছবি ব্যক্তিগত তথ্য। ফোন লক রাখুন, ব্যাকআপ নিরাপদে রাখুন।'),
    ],
    fix: [
      L('Tap a driver, then Edit to correct details.', 'চালকে চাপুন, তারপর “সম্পাদনা” চেপে তথ্য ঠিক করুন।'),
      L('Removing a driver in the vehicle form ends the assignment today. An assignment that has not started yet is removed instead.', 'বাহনের ফর্ম থেকে চালক সরালে আজ নিয়োগ শেষ হয়। যে নিয়োগ এখনো শুরু হয়নি, তা মুছে যায়।'),
      L('“Delete driver” removes the driver and their assignments; past income and expenses stay.', '“চালক মুছুন” চালক ও তাঁর নিয়োগ সরায়; আগের আয় ও খরচ থেকে যায়।'),
    ],
    related: ['vehicles-owners', 'income', 'money-received'],
  },

  // ------------------------------------------------------------------ 4
  income: {
    icon: 'income',
    title: L('Adding income', 'আয় যোগ করা'),
    summary: L(
      'Income is what a vehicle earned for a day or a period — whether or not you have been paid yet. Payment is recorded separately as money received.',
      'আয় মানে কোনো দিনে বা সময়ে বাহন যা অর্জন করেছে — টাকা হাতে পেয়েছেন কি না, তা আলাদা কথা। টাকা পাওয়া আলাদাভাবে লেখা হয়।',
    ),
    when: L('Every day, week or month the vehicle works: daily rent, a contract, trips or any other earning.', 'যেদিন, যে সপ্তাহে বা যে মাসে বাহন কাজ করে: দৈনিক ভাড়া, চুক্তি, ট্রিপ বা অন্য যেকোনো আয়।'),
    where: [
      L('+ → Add income', '+ → আয় যোগ'),
      L('Vehicle screen → Add income', 'বাহনের পর্দা → আয় যোগ করুন'),
    ],
    need: [
      L('Vehicle and income type: fixed daily rent / deposit, fixed contract, trip-based, or other income.', 'বাহন ও আয়ের ধরন: নির্দিষ্ট দৈনিক ভাড়া / জমা, নির্দিষ্ট চুক্তি, ট্রিপভিত্তিক, বা অন্যান্য আয়।'),
      L('Period: One day, This week, Last week, This month, Last month, or Custom dates.', 'সময়: এক দিন, এই সপ্তাহ, গত সপ্তাহ, এই মাস, গত মাস, বা নিজে তারিখ বাছুন।'),
      L('Amount — or the daily rate for daily rent. Optional: number of trips, driver, notes.', 'অঙ্ক — দৈনিক ভাড়ায় দৈনিক হার। ঐচ্ছিক: ট্রিপের সংখ্যা, চালক, নোট।'),
    ],
    steps: [
      L('Tap + and choose “Add income”, or tap “Add income” on a vehicle’s screen.', '+ চেপে “আয় যোগ” বাছুন, অথবা বাহনের পর্দায় “আয় যোগ করুন” চাপুন।'),
      L('Choose the vehicle and the income type.', 'বাহন ও আয়ের ধরন বাছুন।'),
      L('Choose the period. The first and last day are both counted.', 'সময় বাছুন। শুরু ও শেষ — দুই দিনই গোনা হয়।'),
      L('For daily rent, enter the daily rate: the amount fills in as rate × days, and you can still change it. For trip-based income, enter the actual amount earned and, if you like, the number of trips.', 'দৈনিক ভাড়ায় দৈনিক হার লিখুন: অঙ্ক নিজে থেকে হার × দিন হয়, তবু বদলাতে পারবেন। ট্রিপভিত্তিক আয়ে আসল আয়ের অঙ্ক লিখুন, চাইলে ট্রিপের সংখ্যাও।'),
      L('Choose the driver if you like. If you were paid at the same time, turn on “Money received now?”, enter what you actually got and the date it reached you.', 'চাইলে চালক বাছুন। একই সময়ে টাকা পেয়ে থাকলে “এখনই টাকা পেয়েছেন?” চালু করে যত পেয়েছেন আর যেদিন হাতে এসেছে তা লিখুন।'),
      L('Tap Save.', '“সংরক্ষণ করুন” চাপুন।'),
    ],
    examples: [
      {
        title: L('A week of rent, part paid', 'এক সপ্তাহের ভাড়া, আংশিক পাওয়া'),
        lines: [
          ln(L('Daily rate × 7 days', 'দৈনিক হার × ৭ দিন'), L(`৳1,000 × 7`, `৳১,০০০ × ৭`)),
          ln(L('Earned income', 'অর্জিত আয়'), WEEK.earned, { op: '=', result: true, tone: 'pos' }),
          ln(L('Money received now', 'এখনই পাওয়া টাকা'), WEEK.receivedNow, { op: '−' }),
          ln(L('Still to collect', 'আদায় বাকি'), WEEK.due, { op: '=', result: true, tone: 'warn' }),
        ],
        caption: L('One save stores the income and a separate receipt linked to it. Nothing is counted twice.', 'একবার সংরক্ষণে আয় আর তার সাথে যুক্ত আলাদা একটি প্রাপ্তি রাখা হয়। কিছুই দুবার গোনা হয় না।'),
      },
      {
        title: L('A period across two months', 'দুই মাস জুড়ে একটি সময়'),
        lines: [
          ln(L('28 Jan – 6 Feb (10 days)', '২৮ জানু – ৬ ফেব্রু (১০ দিন)'), SPREAD.amount),
          ln(L('January (4 days)', 'জানুয়ারি (৪ দিন)'), SPREAD.jan, { op: '=', result: true }),
          ln(L('February (6 days)', 'ফেব্রুয়ারি (৬ দিন)'), SPREAD.feb, { op: '=', result: true }),
        ],
        caption: L('Income is spread evenly over its days for monthly reports. Paisa left over by rounding go to the earliest days.', 'মাসিক রিপোর্টের জন্য আয় দিনগুলোর মধ্যে সমানভাবে ভাগ হয়। ভাগের পর বাড়তি পয়সা প্রথম দিকের দিনে যায়।'),
      },
    ],
    result: L(
      'The income entry shows its full amount, how much has been collected and how much is still due. Open it to see linked receipts and “Record money received”.',
      'আয়ের এন্ট্রিতে পুরো অঙ্ক, কত আদায় হয়েছে আর কত বাকি তা দেখায়। খুললে যুক্ত প্রাপ্তিগুলো ও “টাকা পাওয়া লিখুন” পাওয়া যায়।',
    ),
    mistakes: [
      L('A vehicle can have only one income entry for any day. If a new period overlaps an existing entry, the app shows it so you can view it, edit it or cancel. Nothing is overwritten; back-to-back periods are fine.', 'একটি বাহনের একই দিনের জন্য একটিই আয়ের এন্ট্রি থাকে। নতুন সময় আগের এন্ট্রির সাথে মিলে গেলে অ্যাপ সেটি দেখায় — দেখতে, সম্পাদনা করতে বা বাতিল করতে পারেন। কিছুই মুছে বদলায় না; পরপর লাগোয়া সময় রাখা যায়।'),
      L('Rent is never created automatically, not even from a driver’s expected deposit.', 'ভাড়া কখনো নিজে থেকে তৈরি হয় না, চালকের প্রত্যাশিত জমা থেকেও না।'),
      L('A partial payment does not lower the rent. If the rent was agreed lower from the start, enter the lower amount. If you waive part later, use “Reduce / waive rent”.', 'আংশিক টাকা পেলে ভাড়া কমে না। শুরু থেকেই কম ভাড়া ঠিক হলে কম অঙ্কটিই লিখুন। পরে কিছু মাফ করলে “ভাড়া কমান / মাফ করুন” ব্যবহার করুন।'),
      L('A weekly or monthly entry is due in full from its first day (current rule).', 'সাপ্তাহিক বা মাসিক এন্ট্রির পুরো অঙ্ক তার প্রথম দিন থেকেই পাওনা ধরা হয় (বর্তমান নিয়ম)।'),
    ],
    fix: [
      L('Open the entry and edit it. The amount cannot go below what has already been collected, adjusted or reduced.', 'এন্ট্রি খুলে সম্পাদনা করুন। যা আদায়, সমন্বয় বা ছাড় হয়েছে তার নিচে অঙ্ক নামানো যায় না।'),
      L('An entry with money received, adjustments or reductions cannot be deleted until those are removed.', 'টাকা পাওয়া, সমন্বয় বা ছাড় যুক্ত থাকলে সেগুলো না সরানো পর্যন্ত এন্ট্রি মোছা যায় না।'),
      L('Editing a weekly or monthly entry shows the period chip as “Custom”; the full period is kept.', 'সাপ্তাহিক বা মাসিক এন্ট্রি সম্পাদনা করলে সময়ের চিপে “নিজে বাছুন” দেখায়; পুরো সময় ঠিক থাকে।'),
    ],
    related: ['money-received', 'rent-adjustments', 'profit-and-cash'],
  },

  // ------------------------------------------------------------------ 5
  'money-received': {
    icon: 'cash',
    title: L('Money received, dues and advances', 'টাকা পাওয়া, বাকি ও অগ্রিম'),
    summary: L(
      'Record money on the day it actually reaches you, and link it to the income it pays for. Money received is never added as extra income.',
      'যেদিন টাকা সত্যিই হাতে আসে সেদিনের তারিখে লিখুন, আর যে আয়ের টাকা তার সাথে মিলিয়ে দিন। পাওয়া টাকা কখনো বাড়তি আয় হিসেবে যোগ হয় না।',
    ),
    when: L('Whenever a driver or anyone else pays you for a vehicle — in full, in part, for old dues, or in advance.', 'যখনই চালক বা অন্য কেউ কোনো বাহনের জন্য টাকা দেন — পুরো, আংশিক, পুরনো বাকির, বা অগ্রিম।'),
    where: [
      L('+ → Money received', '+ → টাকা পেলাম'),
      L('Income entry → Record money received', 'আয়ের এন্ট্রি → টাকা পাওয়া লিখুন'),
    ],
    need: [
      L('Vehicle, amount and the date received.', 'বাহন, অঙ্ক ও পাওয়ার তারিখ।'),
      L('Method: cash, bKash, Nagad, Rocket, bank or other. Driver or payer is optional.', 'মাধ্যম: নগদ টাকা (ক্যাশ), বিকাশ, নগদ, রকেট, ব্যাংক বা অন্যান্য। চালক বা প্রদানকারী ঐচ্ছিক।'),
    ],
    steps: [
      L('Tap + and choose “Money received”, or tap “Record money received” on an income entry.', '+ চেপে “টাকা পেলাম” বাছুন, অথবা আয়ের এন্ট্রিতে “টাকা পাওয়া লিখুন” চাপুন।'),
      L('Enter the vehicle, amount, date received and method.', 'বাহন, অঙ্ক, পাওয়ার তারিখ ও মাধ্যম দিন।'),
      L('Under “Apply to income”, enter how much goes to each unpaid income entry, or tap “Fill oldest first”. A running total shows applied and unapplied money.', '“আয়ের সাথে মেলান” অংশে কোন বাকি আয়ে কত যাবে লিখুন, অথবা “পুরনোটা আগে” চাপুন। কত মেলানো হলো আর কত বাকি, তা চলমান যোগফলে দেখায়।'),
      L('Any amount not applied must be kept as an advance: tick “Keep … as an advance”.', 'যে অংশ কোনো আয়ে মেলানো হয়নি, তা অগ্রিম হিসেবে রাখতে হবে: “… অগ্রিম হিসেবে রাখুন” টিক দিন।'),
      L('Save. To use an advance later, edit that receipt and apply the money to income.', 'সংরক্ষণ করুন। পরে অগ্রিম কাজে লাগাতে ওই প্রাপ্তি সম্পাদনা করে টাকাটা আয়ের সাথে মেলান।'),
    ],
    examples: [
      {
        title: L('Part of the money received', 'আংশিক টাকা পাওয়া'),
        lines: [
          ln(L('Earned income', 'অর্জিত আয়'), PARTIAL.earned),
          ln(L('Money received', 'টাকা পাওয়া গেছে'), PARTIAL.received, { op: '−' }),
          ln(L('Still to collect', 'আদায় বাকি'), PARTIAL.due, { op: '=', result: true, tone: 'warn' }),
        ],
        caption: L('Income stays the same. The money received does not create new income.', 'আয় একই থাকে। পাওয়া টাকা নতুন কোনো আয় তৈরি করে না।'),
      },
      {
        title: L('More money than is due', 'বাকির চেয়ে বেশি টাকা'),
        lines: [
          ln(L('Money received', 'টাকা পাওয়া গেছে'), ADVANCE.received),
          ln(L('Applied to income due', 'বাকি আয়ের সাথে মেলানো'), ADVANCE.applied, { op: '−' }),
          ln(L('Advance held', 'অগ্রিম জমা'), ADVANCE.advance, { op: '=', result: true, tone: 'accent' }),
        ],
        caption: L('The extra money is not income. It waits as an advance until you apply it.', 'বাড়তি টাকা আয় নয়। মেলানো পর্যন্ত এটি অগ্রিম হিসেবে থাকে।'),
      },
    ],
    result: L(
      'The linked income shows less due. Dashboard and reports count the money in “money received” on its own date, and income is unchanged. Arrears paid next month raise next month’s money received, not its income.',
      'যুক্ত আয়ে বাকি কমে যায়। ড্যাশবোর্ড ও রিপোর্টে টাকাটা তার নিজের তারিখে “পাওয়া টাকা”-য় গোনা হয়, আয় বদলায় না। পরের মাসে পাওয়া পুরনো বাকি পরের মাসের পাওয়া টাকা বাড়ায়, আয় নয়।',
    ),
    mistakes: [
      L('You cannot apply more than an entry’s remaining due, or more than the money received.', 'কোনো এন্ট্রির বাকির চেয়ে বেশি, বা পাওয়া টাকার চেয়ে বেশি মেলানো যায় না।'),
      L('Money can only be applied to the same vehicle’s income.', 'টাকা শুধু একই বাহনের আয়ের সাথে মেলানো যায়।'),
      L('Do not record a driver’s payment as new income — that would count the same money twice.', 'চালকের দেওয়া টাকা নতুন আয় হিসেবে লিখবেন না — তাতে একই টাকা দুবার গোনা হবে।'),
    ],
    fix: [
      L('Open the receipt and edit the amounts or the income it is applied to.', 'প্রাপ্তিটি খুলে অঙ্ক বা কোন আয়ে মেলানো হয়েছে তা সম্পাদনা করুন।'),
      L('“Delete money received” removes the receipt and its links; those income entries show as due again.', '“প্রাপ্তি মুছুন” প্রাপ্তি ও তার সংযোগ মুছে দেয়; যুক্ত আয়গুলো আবার বাকি দেখায়।'),
    ],
    related: ['income', 'profit-and-cash', 'reports'],
  },

  // ------------------------------------------------------------------ 6
  expenses: {
    icon: 'expense',
    title: L('Expenses, bills and payments', 'খরচ, বিল ও পরিশোধ'),
    summary: L(
      'Record costs such as fuel, repairs, servicing, driver salary and document renewal — even if you pay later. Say who bears the cost and who paid the shop.',
      'জ্বালানি, মেরামত, সার্ভিসিং, চালকের বেতন, কাগজ নবায়নের মতো খরচ লিখুন — পরে পরিশোধ করলেও। খরচ কার আর দোকানকে কে টাকা দিয়েছেন, তা বলে দিন।',
    ),
    when: L('Whenever money is spent on a vehicle, or a bill arrives for work already done.', 'যখনই বাহনে টাকা খরচ হয়, বা আগে হওয়া কাজের বিল আসে।'),
    where: [L('+ → Add expense', '+ → খরচ যোগ'), L('Expense → Add payment / Pay driver / Adjust against rent', 'খরচ → পরিশোধ যোগ করুন / চালককে টাকা দিন / ভাড়া থেকে সমন্বয়')],
    need: [
      L('Vehicle, category (fuel, repairs, servicing, driver salary, documents / renewal, other), description and total amount.', 'বাহন, খাত (জ্বালানি, মেরামত, সার্ভিসিং, চালকের বেতন, কাগজপত্র / নবায়ন, অন্যান্য), বিবরণ ও মোট অঙ্ক।'),
      L('Expense date: the day the work or purchase happened.', 'খরচের তারিখ: যেদিন কাজ বা কেনাকাটা হয়েছে।'),
      L('Who bears the cost (Owner or Driver), who paid, and whether it is paid.', 'খরচ কার (মালিক বা চালক), কে দিয়েছেন, আর পরিশোধ হয়েছে কি না।'),
      L('Optional: shop / vendor, related driver, invoice photo, notes.', 'ঐচ্ছিক: দোকান / বিক্রেতা, সংশ্লিষ্ট চালক, বিলের ছবি, নোট।'),
    ],
    steps: [
      L('Tap + and choose “Add expense”.', '+ চেপে “খরচ যোগ” বাছুন।'),
      L('Choose the vehicle and a category, then enter a description and the total amount.', 'বাহন ও খাত বাছুন, তারপর বিবরণ ও মোট অঙ্ক লিখুন।'),
      L('Set the expense date — the day the work happened, even if the bill came later.', 'খরচের তারিখ দিন — যেদিন কাজ হয়েছে, বিল পরে এলেও।'),
      L('Under “Who bears this cost?” choose Owner or Driver. Only the owner’s costs count in the owner’s accounts; a driver’s cost is kept for reference only.', '“এই খরচ কার?” অংশে “মালিক” বা “চালক” বাছুন। শুধু মালিকের খরচই মালিকের হিসাবে ধরা হয়; চালকের খরচ শুধু তথ্যের জন্য থাকে।'),
      L('For an owner’s cost, choose who paid the shop: Owner, or Driver from own money (then pick the driver).', 'মালিকের খরচে দোকানকে কে টাকা দিয়েছেন বাছুন: “মালিক”, অথবা “চালক, নিজের টাকায়” (তারপর চালক বাছুন)।'),
      L('Choose Paid in full, Partly paid or Not paid yet, and the date the money was actually paid. Save.', '“পুরো পরিশোধ”, “আংশিক পরিশোধ” বা “এখনো দেওয়া হয়নি” বাছুন, আর টাকা আসলে যেদিন দিয়েছেন সেই তারিখ দিন। সংরক্ষণ করুন।'),
      L('To pay the rest later, open the expense and tap “Add payment”.', 'বাকি টাকা পরে দিলে খরচটি খুলে “পরিশোধ যোগ করুন” চাপুন।'),
    ],
    examples: [
      {
        title: L('A January repair paid in March', 'জানুয়ারির মেরামত, মার্চে পরিশোধ'),
        lines: [
          ln(L('Repair done on 10 January', '১০ জানুয়ারি মেরামত'), LATE.amount),
          ln(L('January expenses (lower January profit)', 'জানুয়ারির খরচ (জানুয়ারির লাভ কমে)'), LATE.amount, { op: '=', result: true, tone: 'neg' }),
          ln(L('March money paid (March profit unchanged)', 'মার্চে দেওয়া টাকা (মার্চের লাভ বদলায় না)'), LATE.amount, { op: '=', result: true }),
        ],
        caption: L('Entered and paid on 5 March. Older reports update by themselves.', '৫ মার্চ লেখা ও পরিশোধ। পুরনো রিপোর্ট নিজে থেকেই হালনাগাদ হয়।'),
      },
    ],
    result: L(
      'The cost counts in profit on its expense date. Payments count in money paid on their own dates. Until fully paid, the expense appears under “Unpaid expenses”. Entries recorded more than 7 days after the expense date show “Recorded later”.',
      'খরচ তার খরচের তারিখে লাভে গোনা হয়। পরিশোধ তার নিজের তারিখে দেওয়া টাকায় গোনা হয়। পুরো পরিশোধ না হওয়া পর্যন্ত খরচটি “অপরিশোধিত খরচ”-এ থাকে। খরচের তারিখের ৭ দিনের বেশি পরে লেখা এন্ট্রিতে “পরে লেখা” দেখায়।',
    ),
    mistakes: [
      L('“Related driver” is only a note; it does not mean the driver paid.', '“সংশ্লিষ্ট চালক” শুধু তথ্য; এর মানে চালক টাকা দিয়েছেন তা নয়।'),
      L('A cost the driver must bear (for example their own fuel) never lowers the rent they owe. Either skip it or record it with “Who bears this cost?” = Driver.', 'চালকের নিজের খরচ (যেমন তাঁর জ্বালানি) কখনো তাঁর দেওয়া ভাড়া কমায় না। হয় লিখবেন না, নয়তো “এই খরচ কার?” = “চালক” দিয়ে লিখুন।'),
      L('A payment cannot be more than what remains unpaid.', 'বাকির চেয়ে বেশি পরিশোধ লেখা যায় না।'),
    ],
    fix: [
      L('Open the expense and edit it, or delete a single payment — the expense then shows as due again.', 'খরচ খুলে সম্পাদনা করুন, বা একটি পরিশোধ মুছুন — তখন খরচটি আবার বাকি দেখায়।'),
      L('“Delete expense” removes the expense, its payments and any rent adjustments; adjusted rent shows as due again.', '“খরচ মুছুন” খরচ, তার পরিশোধ ও ভাড়ার সমন্বয় মুছে দেয়; সমন্বয় করা ভাড়া আবার বাকি দেখায়।'),
    ],
    related: ['rent-adjustments', 'profit-and-cash', 'reports'],
  },

  // ------------------------------------------------------------------ 7
  'rent-adjustments': {
    icon: 'adjust',
    title: L('Driver-paid repairs and rent waivers', 'চালকের দেওয়া খরচ ও ভাড়া মাফ'),
    summary: L(
      'Two non-cash tools: “Adjust against rent” deducts an owner’s cost that the driver paid from that driver’s unpaid rent, and “Reduce / waive rent” records a concession agreed later.',
      'দুটি নগদবিহীন ব্যবস্থা: “ভাড়া থেকে সমন্বয়” — চালক নিজের টাকায় মালিকের যে খরচ দিয়েছেন, তা ওই চালকের বাকি ভাড়া থেকে বাদ দেয়; আর “ভাড়া কমান / মাফ করুন” — পরে রাজি হওয়া ছাড় লিখে রাখে।',
    ),
    when: L('When a driver pays for an owner’s repair and you agree to deduct it from rent, or when you agree to waive part of rent that is already recorded.', 'যখন চালক মালিকের মেরামতের টাকা দেন আর আপনি তা ভাড়া থেকে বাদ দিতে রাজি হন, অথবা যখন আগে লেখা ভাড়ার কিছু অংশ মাফ করতে রাজি হন।'),
    where: [
      L('Expense (Owner’s cost, paid by Driver) → Adjust against rent', 'খরচ (মালিকের খরচ, দিয়েছেন চালক) → ভাড়া থেকে সমন্বয়'),
      L('Expense (paid by Driver) → Pay driver', 'খরচ (দিয়েছেন চালক) → চালককে টাকা দিন'),
      L('Income entry → Reduce / waive rent', 'আয়ের এন্ট্রি → ভাড়া কমান / মাফ করুন'),
    ],
    need: [
      L('Adjustment: the driver-paid expense, the income entry (same vehicle, that driver or no driver), the amount and the adjustment date.', 'সমন্বয়: চালকের দেওয়া খরচ, আয়ের এন্ট্রি (একই বাহন, ওই চালক বা চালক ছাড়া), অঙ্ক ও সমন্বয়ের তারিখ।'),
      L('Reduction: “Reduce by” amount, “Date agreed” and a reason.', 'ছাড়: কত কমবে, রাজি হওয়ার তারিখ ও কারণ।'),
    ],
    steps: [
      L('Add the expense with “Who bears this cost?” = Owner and paid by “Driver, from own money”.', '“এই খরচ কার?” = “মালিক” আর দিয়েছেন “চালক, নিজের টাকায়” দিয়ে খরচ যোগ করুন।'),
      L('Record the cash the driver actually hands over as money received.', 'চালক আসলে যত নগদ দিলেন, তা টাকা পাওয়া হিসেবে লিখুন।'),
      L('Open the expense and tap “Adjust against rent”. Choose the income entry, the amount and the adjustment date (the day you and the driver agreed), then save. No cash moves.', 'খরচটি খুলে “ভাড়া থেকে সমন্বয়” চাপুন। আয়ের এন্ট্রি, অঙ্ক ও সমন্বয়ের তারিখ (যেদিন আপনি ও চালক রাজি হয়েছেন) দিয়ে সংরক্ষণ করুন। কোনো নগদ লেনদেন হয় না।'),
      L('If you pay the driver back in cash instead, tap “Pay driver”.', 'চালককে নগদে ফেরত দিলে “চালককে টাকা দিন” চাপুন।'),
      L('To waive rent agreed later: open the income entry, tap “Reduce / waive rent”, enter the amount, the date agreed and the reason.', 'পরে রাজি হওয়া ভাড়া মাফ করতে: আয়ের এন্ট্রি খুলে “ভাড়া কমান / মাফ করুন” চেপে অঙ্ক, রাজি হওয়ার তারিখ ও কারণ লিখুন।'),
    ],
    examples: [
      {
        title: L('Driver paid a repair, deducted from rent', 'চালক মেরামতের টাকা দিলেন, ভাড়া থেকে বাদ'),
        lines: [
          ln(L('Weekly rent earned', 'সপ্তাহের অর্জিত ভাড়া'), SETTLE.rent),
          ln(L('Owner’s repair, paid by the driver', 'মালিকের মেরামত, চালক দিয়েছেন'), SETTLE.repair, { op: '−' }),
          ln(L('Profit', 'লাভ'), SETTLE.profit, { op: '=', result: true, tone: 'pos' }),
          ln(L('Cash the driver hands over (money received)', 'চালক নগদ দিলেন (পাওয়া টাকা)'), SETTLE.cash),
          ln(L('Adjusted against rent (not cash)', 'ভাড়া থেকে সমন্বয় (নগদ নয়)'), SETTLE.settled),
          ln(L('Money paid by owner', 'মালিকের দেওয়া টাকা'), SETTLE.paid),
          ln(L('Rent due, and owed to driver', 'ভাড়া বাকি, ও চালকের পাওনা'), SETTLE.due, { op: '=', result: true }),
        ],
        caption: L('The adjusted amount never passed through your hands, so it is neither money received nor money paid. Do not record a fake receipt and payment instead.', 'সমন্বয়ের টাকা আপনার হাত দিয়ে যায়নি, তাই এটি পাওয়া টাকাও নয়, দেওয়া টাকাও নয়। এর বদলে ভুয়া প্রাপ্তি ও পরিশোধ লিখবেন না।'),
      },
      {
        title: L('Part of the rent waived later', 'পরে ভাড়ার কিছু অংশ মাফ'),
        lines: [
          ln(L('Rent recorded', 'লেখা ভাড়া'), WAIVE.rent),
          ln(L('Paid by the driver', 'চালক দিয়েছেন'), WAIVE.paid, { op: '−' }),
          ln(L('Due before the waiver', 'মাফের আগে বাকি'), WAIVE.dueBefore, { op: '=', result: true, tone: 'warn' }),
          ln(L('Reduce / waive rent', 'ভাড়া কমান / মাফ করুন'), WAIVE.reduced, { op: '−' }),
          ln(L('Due after the waiver', 'মাফের পরে বাকি'), WAIVE.dueAfter, { op: '=', result: true }),
          ln(L('Earned income from the date agreed', 'রাজি হওয়ার তারিখ থেকে অর্জিত আয়'), WAIVE.earned, { result: true, tone: 'pos' }),
        ],
        caption: L('The original rent and the reduction both stay visible. No cash is recorded, and reports before the date agreed do not change.', 'মূল ভাড়া ও ছাড় দুটোই দেখা যায়। কোনো নগদ লেখা হয় না, আর রাজি হওয়ার তারিখের আগের রিপোর্ট বদলায় না।'),
      },
    ],
    result: L(
      'An adjustment lowers both the rent due and the amount “Owed to drivers” from its date, and is shown separately as “Adjusted against rent”. A reduction lowers earned income and the due from the date agreed.',
      'সমন্বয় তার তারিখ থেকে ভাড়ার বাকি ও “চালকের পাওনা” দুটোই সমান কমায়, আর আলাদাভাবে “ভাড়া থেকে সমন্বয়” হিসেবে দেখায়। ছাড় রাজি হওয়ার তারিখ থেকে অর্জিত আয় ও বাকি কমায়।',
    ),
    mistakes: [
      L('If the rent was agreed lower from the start, do not use a reduction — record the lower amount as income.', 'শুরু থেকেই ভাড়া কম ঠিক হলে ছাড় ব্যবহার করবেন না — কম অঙ্কটিই আয় হিসেবে লিখুন।'),
      L('An adjustment cannot be more than the rent due or the amount still owed to the driver, and must be dated on or after both the expense date and the income start.', 'সমন্বয় ভাড়ার বাকি বা চালকের পাওনার চেয়ে বেশি হতে পারে না, আর তারিখ খরচের তারিখ ও আয়ের শুরুর দিনের আগে হতে পারে না।'),
      L('A reduction cannot be more than the remaining due — there are no refunds or negative dues.', 'ছাড় বাকির চেয়ে বেশি হতে পারে না — ফেরত বা ঋণাত্মক বাকি হয় না।'),
      L('While adjustments exist, the expense’s vehicle, payer or responsibility cannot be changed.', 'সমন্বয় থাকা অবস্থায় খরচের বাহন, প্রদানকারী বা দায় বদলানো যায় না।'),
    ],
    fix: [
      L('Adjustments and reductions cannot be edited. Delete and enter them again.', 'সমন্বয় ও ছাড় সম্পাদনা করা যায় না। মুছে আবার লিখুন।'),
      L('“Delete adjustment”: the rent shows as due again and the amount is owed to the driver again.', '“সমন্বয় মুছুন”: ভাড়া আবার বাকি দেখায়, আর অঙ্কটি আবার চালকের পাওনা হয়।'),
      L('“Delete reduction”: the full rent counts again from the reduction date.', '“ছাড় মুছুন”: ছাড়ের তারিখ থেকে আবার পুরো ভাড়া গোনা হয়।'),
    ],
    related: ['expenses', 'income', 'profit-and-cash'],
  },

  // ------------------------------------------------------------------ 8
  'profit-and-cash': {
    icon: 'calc',
    title: L('Profit, cash movement and “as of” balances', 'লাভ, নগদ লেনদেন ও “তারিখ পর্যন্ত” বাকি'),
    summary: L(
      'Profit and cash answer different questions, so the app keeps them apart and nothing is counted twice.',
      'লাভ আর নগদ টাকা আলাদা প্রশ্নের উত্তর, তাই অ্যাপ দুটো আলাদা রাখে, যাতে কিছু দুবার গোনা না হয়।',
    ),
    when: L('When you read the Home screen or a report and want to know what each figure means.', 'যখন ড্যাশবোর্ড বা রিপোর্ট পড়ে প্রতিটি অঙ্কের মানে বুঝতে চান।'),
    where: [L('Home → cards and “More figures”', 'ড্যাশবোর্ড → কার্ড ও “আরও হিসাব”'), L('Reports → profit and cash cards, balances', 'রিপোর্ট → লাভ ও নগদের কার্ড, বাকি')],
    need: [L('Nothing to enter — these figures are calculated from your entries.', 'কিছু লিখতে হয় না — এগুলো আপনার এন্ট্রি থেকে হিসাব হয়।')],
    steps: [
      L('Profit = earned income − expenses, by the days they belong to. If expenses are larger, it shows as a loss.', 'লাভ = অর্জিত আয় − খরচ, যে দিনের আয়-খরচ সেই দিন ধরে। খরচ বেশি হলে “ক্ষতি” দেখায়।'),
      L('Net cash movement = money received − money paid, by the days money actually moved. It is not the cash in your hand: the app does not know how much you had at the start.', 'নগদ লেনদেনের ফল = পাওয়া টাকা − দেওয়া টাকা, যেদিন টাকা সত্যিই হাতবদল হয়েছে সেই দিন ধরে। এটি হাতে থাকা নগদ নয়: শুরুতে কত ছিল অ্যাপ জানে না।'),
      L('“As of” balances show what is still open at the end of a chosen day: still to collect, unpaid expenses, advance held and owed to drivers.', '“তারিখ পর্যন্ত” হিসাব দেখায় কোনো দিনের শেষে কী খোলা আছে: আদায় বাকি, অপরিশোধিত খরচ, অগ্রিম জমা ও চালকের পাওনা।'),
      L('Income is due from the first day of its period; an expense from its expense date. Only receipts, payments, adjustments and reductions dated on or before that day reduce them.', 'আয় তার সময়ের প্রথম দিন থেকে পাওনা; খরচ তার খরচের তারিখ থেকে। ওই দিন বা তার আগের তারিখের প্রাপ্তি, পরিশোধ, সমন্বয় ও ছাড়ই শুধু বাকি কমায়।'),
    ],
    examples: [
      {
        title: L('Profit', 'লাভ'),
        lines: [
          ln(L('Earned income', 'অর্জিত আয়'), PROFIT.earned),
          ln(L('Expenses', 'খরচ'), PROFIT.expenses, { op: '−' }),
          ln(L('Profit', 'লাভ'), PROFIT.profit, { op: '=', result: true, tone: 'pos' }),
        ],
      },
      {
        title: L('Cash movement', 'নগদ লেনদেন'),
        lines: [
          ln(L('Money received', 'টাকা পাওয়া গেছে'), CASH.received),
          ln(L('Money paid', 'টাকা দেওয়া হয়েছে'), CASH.paid, { op: '−' }),
          ln(L('Net cash movement', 'নগদ লেনদেনের ফল'), CASH.net, { op: '=', result: true }),
        ],
        caption: L('Not a cash balance.', 'এটি নগদ জমা নয়।'),
      },
      {
        title: L('Rent paid before the month starts', 'মাস শুরুর আগে পাওয়া ভাড়া'),
        lines: [
          ln(L('February rent (1–28 Feb)', 'ফেব্রুয়ারির ভাড়া (১–২৮ ফেব্রু)'), PREPAID.rent),
          ln(L('Received 25 Jan, applied to it', '২৫ জানু পাওয়া, এর সাথে মেলানো'), PREPAID.received),
          ln(L('As of 31 Jan: advance held', '৩১ জানু পর্যন্ত: অগ্রিম জমা'), PREPAID.received, { op: '=', result: true, tone: 'accent' }),
          ln(L('As of 1 Feb: still to collect', '১ ফেব্রু পর্যন্ত: আদায় বাকি'), PREPAID.dueFeb1, { op: '=', result: true, tone: 'warn' }),
        ],
        caption: L('Money for a period that has not started yet counts as an advance until the period begins.', 'যে সময় এখনো শুরু হয়নি তার জন্য পাওয়া টাকা, সময় শুরু না হওয়া পর্যন্ত অগ্রিম হিসেবে গোনা হয়।'),
      },
    ],
    result: L('You can read profit (how the business did) and cash (how money moved) side by side without mixing them.', 'লাভ (ব্যবসা কেমন চলল) আর নগদ (টাকা কীভাবে হাতবদল হলো) পাশাপাশি দেখা যায়, মিশে যায় না।'),
    mistakes: [
      L('Do not treat net cash movement as profit, or profit as cash in hand.', 'নগদ লেনদেনের ফলকে লাভ, বা লাভকে হাতে থাকা নগদ ভাববেন না।'),
      L('“Adjusted against rent” is never part of money received or money paid.', '“ভাড়া থেকে সমন্বয়” কখনো পাওয়া বা দেওয়া টাকায় ধরা হয় না।'),
      L('A driver’s expected deposit never counts as income.', 'চালকের প্রত্যাশিত জমা কখনো আয় হিসেবে গোনা হয় না।'),
    ],
    fix: [L('Figures are recalculated from your entries every time, so correcting an entry corrects every report that uses it.', 'অঙ্কগুলো প্রতিবার আপনার এন্ট্রি থেকে নতুন করে হিসাব হয়, তাই এন্ট্রি ঠিক করলে সেটি যেসব রিপোর্টে আছে সবই ঠিক হয়ে যায়।')],
    related: ['income', 'money-received', 'reports'],
  },

  // ------------------------------------------------------------------ 9
  reports: {
    icon: 'chart',
    figure: 'chart',
    title: L('Reports, charts and transaction lists', 'রিপোর্ট, গ্রাফ ও লেনদেনের তালিকা'),
    summary: L(
      'See profit, cash and balances for any day, month or date range — for one vehicle or all — and open the entries behind every number.',
      'যেকোনো দিন, মাস বা তারিখের সীমার লাভ, নগদ ও বাকি দেখুন — একটি বা সব বাহনের — আর প্রতিটি অঙ্কের পেছনের এন্ট্রি খুলুন।',
    ),
    when: L('At the end of a day or month, or when you want to compare vehicles or check a driver’s dues.', 'দিন বা মাসের শেষে, অথবা বাহনগুলো তুলনা করতে বা চালকের বাকি দেখতে চাইলে।'),
    where: [L('Bottom bar → Reports', 'নিচের বার → রিপোর্ট'), L('+, menu or “See all” → Transactions', '+, মেনু বা “সব দেখুন” → লেনদেন')],
    need: [L('A period and, if you like, one vehicle.', 'একটি সময়, আর চাইলে একটি বাহন।')],
    steps: [
      L('Open Reports and choose Daily, Monthly or Custom. Move with Previous / Next, or pick From and To dates.', 'রিপোর্ট খুলে দৈনিক, মাসিক বা নিজে বাছুন। আগের / পরের দিয়ে সরুন, অথবা শুরু ও শেষের তারিখ বাছুন।'),
      L('Choose All vehicles or one vehicle.', '“সব বাহন” বা একটি বাহন বাছুন।'),
      L('Profit and cash movement appear in separate cards, with balances as of the end of the period (or today, if that is earlier).', 'লাভ-ক্ষতি ও নগদ লেনদেন আলাদা কার্ডে দেখায়, সাথে সময়ের শেষ দিন (বা আজ, যদি আগে হয়) পর্যন্ত বাকি।'),
      L('Open the income & expense chart to compare earned income and expenses as bars — by day, or by month for long periods. Tap a bar for its amounts; scroll sideways for long periods.', 'আয়–খরচের গ্রাফ খুলে অর্জিত আয় ও খরচ বার দিয়ে মেলান — দিন ধরে, বা লম্বা সময়ে মাস ধরে। বারে চাপলে অঙ্ক দেখায়; লম্বা সময়ে পাশে সরান।'),
      L('Tap any total or row to see the entries behind it, then tap an entry to open it.', 'যেকোনো মোট বা সারিতে চাপলে পেছনের এন্ট্রিগুলো দেখায়; এন্ট্রিতে চাপলে সেটি খোলে।'),
      L('Transactions lists Income, Received and Expenses separately, with a vehicle filter.', 'লেনদেন অংশে আয়, প্রাপ্তি ও খরচ আলাদা করে দেখায়, বাহন দিয়ে ছাঁকা যায়।'),
    ],
    result: L('You get a period summary you can trust, because every figure can be traced back to its entries.', 'সময়ের এমন সারাংশ পান যার প্রতিটি অঙ্ক তার এন্ট্রি পর্যন্ত খুঁজে দেখা যায়।'),
    mistakes: [
      L('A backdated entry also changes older months — this is expected.', 'পেছনের তারিখের এন্ট্রি দিলে পুরনো মাসও বদলায় — এটাই স্বাভাবিক।'),
      L('Reports cannot be exported or shared from the app in this version.', 'এই সংস্করণে রিপোর্ট এক্সপোর্ট বা শেয়ার করা যায় না।'),
    ],
    fix: [L('If a figure looks wrong, tap it, open the entry behind it and correct that entry.', 'কোনো অঙ্ক ভুল মনে হলে তাতে চাপুন, পেছনের এন্ট্রি খুলে সেটি ঠিক করুন।')],
    related: ['profit-and-cash', 'income', 'expenses'],
  },

  // ------------------------------------------------------------------ 10
  documents: {
    icon: 'doc',
    figure: 'docs',
    title: L('Vehicle documents and expiry alerts', 'বাহনের কাগজপত্র ও মেয়াদের সতর্কতা'),
    summary: L(
      'Keep registration, fitness, tax token, route permit, insurance, driving licence and other papers with their dates and photos, and see in the app when they are about to expire.',
      'নিবন্ধন, ফিটনেস, ট্যাক্স টোকেন, রুট পারমিট, বীমা, ড্রাইভিং লাইসেন্স ও অন্যান্য কাগজ তারিখ ও ছবিসহ রাখুন, আর মেয়াদ শেষ হওয়ার আগে অ্যাপে দেখে নিন।',
    ),
    when: L('When you receive or renew a paper, or want to check which papers are expiring.', 'কাগজ পেলে বা নবায়ন করলে, অথবা কোন কাগজের মেয়াদ শেষ হচ্ছে দেখতে চাইলে।'),
    where: [
      L('Vehicle → Documents tab → Add document', 'বাহন → কাগজপত্র ট্যাব → কাগজ যোগ করুন'),
      L('Menu → Documents (all vehicles)', 'মেনু → কাগজপত্র (সব বাহন)'),
      L('Home → bell icon', 'ড্যাশবোর্ড → ঘণ্টা আইকন'),
    ],
    need: [
      L('Type, title, optional document number and the issue date.', 'ধরন, শিরোনাম, ঐচ্ছিক কাগজের নম্বর ও ইস্যুর তারিখ।'),
      L('Expiry date (or none) and when to be warned.', 'মেয়াদ শেষের তারিখ (বা নেই) আর কখন সতর্ক করবে।'),
      L('Photos of each page or side.', 'প্রতিটি পাতা বা দিকের ছবি।'),
    ],
    steps: [
      L('Open a vehicle, go to its Documents tab and tap “Add document”.', 'বাহন খুলে কাগজপত্র ট্যাবে গিয়ে “কাগজ যোগ করুন” চাপুন।'),
      L('Choose the type and enter a title, an optional number and the issue date.', 'ধরন বাছুন, শিরোনাম, ঐচ্ছিক নম্বর ও ইস্যুর তারিখ দিন।'),
      L('Turn on “Has an expiry date” and set it, or leave it off for papers that never expire.', '“মেয়াদ শেষের তারিখ আছে” চালু করে তারিখ দিন, মেয়াদ না থাকলে বন্ধ রাখুন।'),
      L('Choose when to be warned: no warning, or a number of days before expiry.', 'কখন সতর্ক করবে বাছুন: সতর্ক করবেন না, বা মেয়াদ শেষের কত দিন আগে।'),
      L('Add a photo of each page or side, then save.', 'প্রতিটি পাতা বা দিকের ছবি দিয়ে সংরক্ষণ করুন।'),
    ],
    result: L(
      'Each document shows Valid, Expiring soon, Expired or No expiry. Expired and expiring papers show on the Home screen’s bell and alert strip, and on the vehicle screen.',
      'প্রতিটি কাগজে বৈধ, শিগগিরই শেষ, মেয়াদ শেষ বা মেয়াদ নেই দেখায়। মেয়াদ শেষ ও শিগগির শেষ হওয়া কাগজ ড্যাশবোর্ডের ঘণ্টা ও সতর্কতা অংশে, আর বাহনের পর্দায় দেখায়।',
    ),
    mistakes: [
      L('Alerts appear only inside the app. The app does not send phone notifications — open it regularly.', 'সতর্কতা শুধু অ্যাপের ভেতরে দেখায়। অ্যাপ ফোনে নোটিফিকেশন পাঠায় না — নিয়মিত অ্যাপ খুলুন।'),
      L('“Expiring soon” starts at the warning days you chose, or 30 days before expiry if you chose none.', '“শিগগিরই শেষ” শুরু হয় আপনার বাছা সতর্কতার দিন থেকে; কিছু না বাছলে মেয়াদ শেষের ৩০ দিন আগে থেকে।'),
      L('Only photos can be attached — PDF files are not supported yet.', 'শুধু ছবি যুক্ত করা যায় — পিডিএফ এখনো নয়।'),
    ],
    fix: [L('Open the document to edit its dates after renewal, or use “Delete document”.', 'নবায়নের পর কাগজটি খুলে তারিখ বদলান, বা “কাগজ মুছুন” ব্যবহার করুন।')],
    related: ['vehicles-owners', 'getting-started', 'backup-restore'],
  },

  // ------------------------------------------------------------------ 11
  'backup-restore': {
    icon: 'backup',
    figure: 'backup',
    title: L('Backup, recovery key and restore', 'ব্যাকআপ, রিকভারি কী ও রিস্টোর'),
    summary: L(
      'Your records live on your phone. Backup keeps copies in a folder you choose on the phone — normal, or locked with a recovery key. Nothing is uploaded to Google Drive or the internet, so copying that folder off the phone is up to you.',
      'আপনার তথ্য থাকে ফোনে। ব্যাকআপ আপনার বাছাই করা ফোল্ডারে, ফোনেই, কপি রাখে — সাধারণ, অথবা রিকভারি কী দিয়ে তালাবদ্ধ। গুগল ড্রাইভ বা ইন্টারনেটে কিছু পাঠানো হয় না, তাই ফোল্ডারটি ফোনের বাইরে কপি করে রাখা আপনার দায়িত্ব।',
    ),
    when: L('Set it up on the first day. Restore when you change phones, reinstall the app, or need to go back to an earlier copy.', 'প্রথম দিনেই সেটআপ করুন। ফোন বদলালে, অ্যাপ আবার ইনস্টল করলে, বা আগের কোনো কপিতে ফিরতে চাইলে রিস্টোর করুন।'),
    where: [
      L('Settings → Backup & Restore → Back up this phone', 'সেটিংস → ব্যাকআপ ও রিস্টোর → এই ফোনের ব্যাকআপ'),
      L('Settings → Backup & Restore → Restore existing data', 'সেটিংস → ব্যাকআপ ও রিস্টোর → আগের তথ্য রিস্টোর'),
    ],
    need: [
      L('An Android phone (folder backup is not available on iPhone).', 'একটি অ্যান্ড্রয়েড ফোন (আইফোনে ফোল্ডার ব্যাকআপ নেই)।'),
      L('A folder you choose, with free space. The app asks for access to that folder only.', 'আপনার বাছাই করা একটি ফোল্ডার, তাতে খালি জায়গা। অ্যাপ শুধু ওই ফোল্ডারে প্রবেশের অনুমতি চায়।'),
      L('For protected backups: a safe place, away from the phone, to write down the recovery key.', 'সুরক্ষিত ব্যাকআপে: রিকভারি কী লিখে রাখার জন্য ফোনের বাইরে একটি নিরাপদ জায়গা।'),
    ],
    steps: [
      L('Open Settings → Backup & Restore → “Back up this phone”. Step 1: choose a backup folder.', 'সেটিংস → ব্যাকআপ ও রিস্টোর → “এই ফোনের ব্যাকআপ” খুলুন। ধাপ ১: ব্যাকআপ ফোল্ডার বাছুন।'),
      L('Step 2: choose protection. Normal (default) needs no key: read the warning and tap “Start normal backups”. Protected: turn on “Protect backups with a recovery key”, create the key once, write it down away from the phone, tick the box and type its last 4 characters.', 'ধাপ ২: সুরক্ষা বাছুন। সাধারণ (ডিফল্ট) — কোনো কী লাগে না: সতর্কবার্তা পড়ে “সাধারণ ব্যাকআপ শুরু করুন” চাপুন। সুরক্ষিত — “রিকভারি কী দিয়ে ব্যাকআপ সুরক্ষিত করুন” চালু করুন, একবার কী তৈরি করুন, ফোনের বাইরে লিখে রাখুন, টিক দিন এবং শেষ ৪টি অক্ষর লিখুন।'),
      L('When you finish, the first backup is saved and “Automatic daily data backup” turns on. Use “Back up now” any time.', 'শেষ করলে প্রথম ব্যাকআপ রাখা হয় এবং “প্রতিদিন স্বয়ংক্রিয় তথ্য ব্যাকআপ” চালু হয়। যেকোনো সময় “এখনই ব্যাকআপ” চাপুন।'),
      L('Check the status: it shows the folder, the last data backup and the last photo backup. Problems show in red with a fix.', 'স্ট্যাটাস দেখুন: ফোল্ডার, শেষ তথ্য ব্যাকআপ ও শেষ ছবি ব্যাকআপ দেখায়। সমস্যা হলে লাল বার্তায় সমাধান দেখায়।'),
      L('Regularly copy the whole “BahonBoi Backups” folder with the Files app to a computer, USB drive or other storage you trust.', 'নিয়মিত ফাইলস অ্যাপ দিয়ে পুরো “BahonBoi Backups” ফোল্ডারটি কম্পিউটার, পেনড্রাইভ বা বিশ্বস্ত জায়গায় কপি করুন।'),
      L('New phone: install Bahon Boi, copy the backup folder to the phone, then open Backup & Restore → “Restore existing data”. No new setup or key is needed to start.', 'নতুন ফোন: বাহন বই ইনস্টল করুন, ব্যাকআপ ফোল্ডারটি ফোনে কপি করুন, তারপর ব্যাকআপ ও রিস্টোর → “আগের তথ্য রিস্টোর” খুলুন। শুরু করতে নতুন সেটআপ বা কী লাগে না।'),
      L('Choose the folder (or a single file) and pick a backup. A protected backup asks for its matching recovery key. Check the date, counts and photos, then confirm.', 'ফোল্ডার (বা একটি ফাইল) বেছে একটি ব্যাকআপ বাছুন। সুরক্ষিত ব্যাকআপ তার মিলে যাওয়া রিকভারি কী চায়। তারিখ, সংখ্যা ও ছবি মিলিয়ে নিশ্চিত করুন।'),
      L('After restoring, set up backups again on the new phone so “Automatic daily data backup” is on.', 'রিস্টোরের পর নতুন ফোনে আবার ব্যাকআপ সেটআপ করুন, যাতে “প্রতিদিন স্বয়ংক্রিয় তথ্য ব্যাকআপ” চালু থাকে।'),
    ],
    result: L(
      'Data backups contain all records (vehicles, owners, drivers, income, money received, expenses, documents) plus language and theme. Photos are backed up on their own schedule — weekly (default), monthly, or only when you tap “Back up now with photos” — into the folder’s “attachments” folder. The newest 30 backups are kept.',
      'তথ্যের ব্যাকআপে সব তথ্য (বাহন, মালিক, চালক, আয়, টাকা পাওয়া, খরচ, কাগজপত্র) এবং ভাষা ও থিম থাকে। ছবির ব্যাকআপ আলাদা সময়সূচিতে — সাপ্তাহিক (ডিফল্ট), মাসিক, বা শুধু “ছবিসহ এখনই ব্যাকআপ” চাপলে — ফোল্ডারের “attachments” ফোল্ডারে হয়। সবচেয়ে নতুন ৩০টি ব্যাকআপ রাখা হয়।',
    ),
    mistakes: [
      L('Local backup is not cloud backup: if the phone is lost or damaged, a folder on it is lost too. Copy the folder off the phone regularly.', 'লোকাল ব্যাকআপ ক্লাউড ব্যাকআপ নয়: ফোন হারালে বা নষ্ট হলে তার ভেতরের ফোল্ডারও হারায়। নিয়মিত ফোল্ডারটি ফোনের বাইরে কপি করুন।'),
      L('Normal backups are not encrypted: anyone who gets the files can read or restore them, including personal information.', 'সাধারণ ব্যাকআপ এনক্রিপ্ট করা নয়: ফাইল যে কেউ পেলে ভেতরের তথ্য, ব্যক্তিগত তথ্যসহ, পড়তে বা রিস্টোর করতে পারবে।'),
      L('If you lose both the app installation and the recovery key, protected backups cannot be opened. Nobody can recover the key for you. Never store the key in the same place as the backups.', 'অ্যাপ ইনস্টলেশন ও রিকভারি কী — দুটোই হারালে সুরক্ষিত ব্যাকআপ আর খোলা যাবে না। কেউ কী উদ্ধার করে দিতে পারবে না। কী কখনো ব্যাকআপের জায়গায় রাখবেন না।'),
      L('Automatic timing is approximate: about once a day when Android allows; battery saver can delay it. A missed backup runs the next time you open the app.', 'স্বয়ংক্রিয় সময় আনুমানিক: অ্যান্ড্রয়েড যখন অনুমতি দেয়, মোটামুটি দিনে একবার; ব্যাটারি সেভারে দেরি হতে পারে। বাদ পড়লে পরের বার অ্যাপ খুললে হয়।'),
      L('Restoring a single file brings back records only; restore from the folder with “attachments” to get photos back.', 'একটি ফাইল রিস্টোর করলে শুধু তথ্য ফেরে; ছবিও পেতে “attachments”-সহ ফোল্ডার থেকে রিস্টোর করুন।'),
      L('Restore replaces all records on the phone — it does not merge. Exit demo mode before restoring.', 'রিস্টোর ফোনের সব তথ্য বদলে দেয় — মেশায় না। রিস্টোরের আগে ডেমো মোড বন্ধ করুন।'),
    ],
    fix: [
      L('Before restoring, the app keeps a recovery copy of the current data. A wrong key, a damaged file or a backup from a newer app version is rejected without changing your data.', 'রিস্টোরের আগে অ্যাপ বর্তমান তথ্যের একটি কপি রাখে। ভুল কী, নষ্ট ফাইল বা নতুন সংস্করণের ব্যাকআপ বাতিল হয়, আপনার তথ্য বদলায় না।'),
      L('A failed backup never deletes earlier backups. Follow the red message: choose the folder again, free up space, or enter the recovery key.', 'ব্যর্থ ব্যাকআপ আগের ব্যাকআপ মুছে না। লাল বার্তা অনুযায়ী কাজ করুন: ফোল্ডার আবার বাছুন, জায়গা খালি করুন, বা রিকভারি কী দিন।'),
      L('“Protect backups with a recovery key” changes future backups only; earlier backups and your saved key are never changed or deleted.', '“রিকভারি কী দিয়ে ব্যাকআপ সুরক্ষিত করুন” শুধু পরের ব্যাকআপ বদলায়; আগের ব্যাকআপ ও রাখা কী কখনো বদলায় বা মুছে না।'),
    ],
    related: ['getting-started', 'documents'],
  },
};
