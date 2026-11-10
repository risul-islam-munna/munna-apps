// Worked accounting examples, computed (not typed) and checked at build time.
// Rules: Bahon Boi PROJECT_REPORT.md §8 and lib/features/guide/guide_content.dart.

import { check } from './lib.mjs';

// Main landing-page example: one week of rent for one vehicle.
const rent = 7000, received = 5000, expense = 1500;
export const MAIN = {
  rent,
  received,
  expense,
  due: check('due', rent - received, 2000), // receivable = income − receipts
  profit: check('profit', rent - expense, 5500), // profit = earned − incurred (receipts never add income)
  expensePaid: expense, // scenario A: owner paid the shop in full
  netCashPaid: check('net cash (paid)', received - expense, 3500), // receipts − payments
  netCashUnpaid: check('net cash (unpaid)', received - 0, 5000), // scenario B: bill not paid yet
  unpaidExpense: expense, // scenario B
};

// Driver paid an owner repair; ৳1,000 adjusted against rent (non-cash settlement).
const sRent = 7000, sRepair = 1000, sCash = 6000, sSettled = 1000;
export const SETTLE = {
  rent: sRent,
  repair: sRepair,
  cash: sCash,
  settled: sSettled,
  profit: check('settle profit', sRent - sRepair, 6000),
  received: sCash, // settlement is never money received
  paid: 0, // nor money paid
  due: check('settle due', sRent - sCash - sSettled, 0),
  owedToDriver: check('owed to driver', sRepair - 0 - sSettled, 0),
};

// Rent reduction / waiver agreed later.
const wRent = 1000, wPaid = 700, wReduced = 300;
export const WAIVE = {
  rent: wRent,
  paid: wPaid,
  dueBefore: check('waive due before', wRent - wPaid, 300),
  reduced: wReduced,
  earned: check('waive earned', wRent - wReduced, 700),
  dueAfter: check('waive due after', wRent - wPaid - wReduced, 0),
};

// Money received: partial payment and advance.
export const PARTIAL = { earned: 10000, received: 7000, due: check('partial due', 10000 - 7000, 3000) };
export const ADVANCE = { received: 12000, applied: 10000, advance: check('advance', 12000 - 10000, 2000) };

// Income form: daily rate × days, with "Money received now".
export const WEEK = {
  rate: 1000,
  days: 7,
  earned: check('week earned', 1000 * 7, 7000),
  receivedNow: 5500,
  due: check('week due', 7000 - 5500, 1500),
};

// Cross-month period: ৳10,000 for 28 Jan – 6 Feb (10 inclusive days), spread evenly.
const days = 10, perDay = 10000 / days;
export const SPREAD = {
  amount: 10000,
  days,
  jan: check('jan share', perDay * 4, 4000),
  feb: check('feb share', perDay * 6, 6000),
};

// Late bill: repair on 10 Jan, entered and paid 5 Mar.
export const LATE = { amount: 5000 };

// Ownership share.
export const SHARE = {
  contribution: 300000,
  base: 1000000,
  pct: check('share %', (300000 / 1000000) * 100, 30),
};

// Profit and cash cards in the money-rules guide.
export const PROFIT = { earned: 20000, expenses: 8000, profit: check('profit card', 20000 - 8000, 12000) };
export const CASH = { received: 15000, paid: 6000, net: check('cash card', 15000 - 6000, 9000) };
export const PREPAID = { rent: 24000, received: 3000, dueFeb1: check('prepaid due', 24000 - 3000, 21000) };
