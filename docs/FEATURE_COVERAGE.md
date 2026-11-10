# Bahon Boi — feature documentation coverage

Internal checklist: every user-facing feature confirmed in the app, where the website explains it,
and the source it was verified against. Re-check this list against the app before each release.

Verified: 2026-11-10, against `/Users/munna/Development/FlutterProjects/BahonBoi` (version 1.1.0+2).

Sources (paths in the app repo):
- **G** = `lib/features/guide/guide_content.dart` (bundled bilingual guide, topic id in brackets)
- **T** = `lib/app/localization/en.dart` / `bn.dart` (button and screen labels)
- **R** = `PROJECT_REPORT.md` (§2 feature status, §3 screens, §8 accounting rules, §11 Google, §16 limitations)
- **P** = `pubspec.yaml`, `android/app/src/main/AndroidManifest.xml`, `res/xml/backup_rules.xml`, `res/xml/data_extraction_rules.xml`, plugin manifests

Website pages (one URL each, both languages): `L` = landing `/bahon-boi/`, `guide/<slug>` = `/bahon-boi/guide/<slug>/`.

## Implemented features

| Feature | Website coverage | Source |
|---|---|---|
| Welcome screen, add first vehicle, try with sample data | guide/getting-started | G[start], T `add_first_vehicle`, `try_demo` |
| Home screen: month selector, 4 cards, cash strip, More figures, drill-down, bell, recent transactions | guide/getting-started, guide/profit-and-cash, L#f-reports | G[dashboard], R§3 |
| Bottom bar + quick actions, menu, in-app guide | guide/getting-started | G[dashboard], R§2 Shell |
| Language (bn/en), appearance (system/light/dark) | guide/getting-started, L benefits | G[settings] |
| Demo mode (separate data, banner, Exit demo) | guide/getting-started | G[settings], T `demo_*`, `exit_demo` |
| Vehicles: add/edit, types incl. Other, plate, Not registered yet, photos/cover, active filter, search, tabs | guide/vehicles-owners, L#f-people, L vehicle types | G[vehicles], G[photos], T `not_registered`, `vehicle_active` |
| Duplicate-plate check; vehicles with entries cannot be deleted (deactivate) | guide/vehicles-owners | G[vehicles], T `delete_vehicle_message` |
| Owners: add/choose existing, primary contact, base amount + contributions → share, unallocated share, history, convert to contribution-based | guide/vehicles-owners, L#f-people | G[owners], T `accept_partial_ownership` |
| Drivers: required name/mobile/NID/licence, optional fields, emergency contact, ID photos (one per slot), Other images, search, Information incomplete, delete | guide/drivers, L#f-people | G[drivers], G[photos], T `delete_driver*` |
| Assignments: shifts (none/day/night/custom, overnight), several drivers, duplicate rule, expected deposit (reference only), end assignment | guide/drivers, L#f-people (SVG) | G[assignments], R§2 |
| Income: types, period presets, rate × days, trips, driver, Money received now, overlap dialog, even daily spread, due from start, edit/delete limits | guide/income, L#f-income, L FAQ | G[income], R§8 |
| Money received: methods, Apply to income, Fill oldest first, advance, edit, delete | guide/money-received, L#f-income, L#money | G[receipts], T `allocate_to_income`, `auto_allocate`, `delete_receipt*` |
| Expenses: categories, expense date, Who bears this cost?, who paid, paid status, vendor, related driver, invoice photo, Add payment, Recorded later, unpaid list, delete | guide/expenses, L#f-expense | G[expenses], T `delete_expense*`, `delete_payment*`, `recorded_later` |
| Adjust against rent (non-cash settlement), Pay driver, Owed to drivers, delete adjustment | guide/rent-adjustments, L#money | G[expenses], G[money_rules], R§8, T `adjust_against_rent`, `settlement_*`, `pay_driver`, `delete_settlement*` |
| Reduce / waive rent, delete reduction | guide/rent-adjustments, L#money | G[income], R§8, T `reduce_rent`, `reduction_*`, `delete_reduction*` |
| Profit vs net cash movement vs "as of" balances; advances for future periods | guide/profit-and-cash, L#money | G[money_rules], R§8 |
| Reports: Daily/Monthly/Custom, vehicle filter, cards, chart, breakdown, drill-down; Transactions list | guide/reports, L#f-reports (SVG) | G[reports], R§2 |
| Documents: types, dates, no-expiry, warning days, photos, states, menu Documents, bell alerts (in-app only), delete | guide/documents, L#f-docs (SVG) | G[documents], T `has_expiry`, `delete_document*` |
| Backup setup (folder, normal/protected), daily auto data backup, photo schedule, Back up now, status/last backup, 30 kept, recovery key, copy off phone | guide/backup-restore, L#backup (SVG) | G[backup], T `backup_*`, `start_plain_backups`, `auto_backup` |
| Restore (same/new phone, folder or file, key, replace not merge, recovery copy, rejects wrong key/newer version) | guide/backup-restore, L#backup, L FAQ | G[backup], R§2 |
| Device loss / reinstall scenarios | guide/backup-restore, L FAQ "lose my phone" | G[backup] notes |

## Privacy and data facts used on the site

| Claim | Where | Source |
|---|---|---|
| No account; works offline; records in app storage; not sent to developer | L#privacy, privacy §1/§3, FAQ | G[start], R§1, P (no backend) |
| No ads / analytics / crash reporting in current version | L#privacy, privacy §7 | P (`pubspec.yaml` dependencies) |
| Google Sheets/Drive sync present but inactive; no sign-in | privacy §6, guide index "Not available" | G[settings], R§2/§11 |
| INTERNET permission declared by google_sign_in; scheduled backup via workmanager | privacy §8 (**TODO: confirm merged manifest**) | P (plugin manifests) |
| Android system backup excludes key-storage files | privacy §5 | P (`backup_rules.xml`, `data_extraction_rules.xml`) |
| Normal backups unencrypted; protected = encrypted with recovery key; key unrecoverable | L#backup, guide/backup-restore, privacy §5, terms §4 | G[backup], R v2 notes |

## Not available (documented as such, never advertised)

Phone notifications · cloud sync/online backup · ID scanning (OCR) · government ID checks · PDF attachments ·
profit split by owner share · opening cash balance · multiple income entries per vehicle per day ·
report export/sharing · folder backup on iPhone. Shown on the guide index ("Not available in this version").
Source: G[not_available], R§16, CLAUDE.md (OCR deferred).

## Open items

- Merged Android manifest permission list (privacy §8).
- Effective dates and legal review for Terms and Privacy.
- Store availability (all pages say "coming soon").
- Genuine screenshots (none published; hero and diagrams are labelled illustrations with example figures).
