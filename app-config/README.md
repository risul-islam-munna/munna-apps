# `apps.munna.dev/app-config/` — update configuration

Static JSON the apps read to offer updates. Served as-is by GitHub Pages:

| File | URL | Read by |
|---|---|---|
| `config.json` | `https://apps.munna.dev/app-config/config.json` | release builds |
| `dev-config.json` | `https://apps.munna.dev/app-config/dev-config.json` | debug builds (test values only) |

`node build.mjs` validates both files and stops on any mistake. The same rules are enforced again
in the app (`lib/core/update/update_policy.dart` in Bahon Boi), which ignores an invalid file.

## Schema (`schemaVersion: 1`)

```json
{
  "schemaVersion": 1,
  "updatedAt": "2026-11-10T12:00:00Z",
  "apps": {
    "bahonboi": {
      "androidAppId": "dev.munna.apps.bahonboi",
      "published": false,
      "minSupportedBuildNumber": 1,
      "latestBuildNumber": 2,
      "versions": { "2": "1.1.0" },
      "androidUpdateUrl": "https://play.google.com/store/apps/details?id=dev.munna.apps.bahonboi",
      "releaseNotes": { "3": { "en": "…", "bn": "…" } }
    }
  }
}
```

| Field | Meaning |
|---|---|
| `apps.<key>` | Stable app key (`bahonboi`). Add more apps as more keys. |
| `androidAppId` | Must equal the installed package; otherwise the entry is ignored. |
| `published` | `false` until the Play listing is live. While false: no update is offered and "Rate app" says the app is not published yet. |
| `minSupportedBuildNumber` | Installed build (versionCode) **below this** ⇒ *update required*. |
| `latestBuildNumber` | Installed build below this (but ≥ minimum) ⇒ *update available* (optional). |
| `versions` | Build number → display version. The entry for `latestBuildNumber` is required. |
| `androidUpdateUrl` | Must be exactly the Play listing of `androidAppId`. The app opens the listing it derives from its own package name, never an arbitrary URL. |
| `releaseNotes` | Optional, keyed by build number, `en` / `bn`. Notes for `latestBuildNumber` are shown. |

Comparisons use the integer build numbers only, never the version strings. There is **no
`forceUpdate` flag** — requiring an update is done only by raising `minSupportedBuildNumber`.

### What the app does

| Installed build | Result |
|---|---|
| `published` is false | nothing offered |
| below `minSupportedBuildNumber` | "This version needs an update" — shown at every launch, but always closable ("Not now"); records and backups stay usable |
| below `latestBuildNumber` | "A new version is available" — offered once per release; "Later" hides it until a newer build |
| equal or newer (e.g. a dev build) | up to date |
| file missing, offline, timeout (8 s), HTTP error, bad JSON, unknown `schemaVersion`, missing entry, `min > latest`, wrong URL | automatic check: silent; manual check: "Could not check… try again when connected" |

Automatic check: in the background, 5 s after start-up, at most once per 24 h. The app never waits
for it. A cached *required* result is reused at launch only while it is at most 7 days old.

## Releasing a new version

1. Upload the build to Google Play and wait until the release is **live for the intended users**
   (rollout complete or the audience you want). Install it from Play once to confirm.
2. In `config.json`, set `latestBuildNumber` to the new versionCode and add `"versions": { "<build>": "<x.y.z>" }`.
3. Optionally add `releaseNotes["<build>"]` in English and Bengali (keep them short).
4. Change `minSupportedBuildNumber` **only** when older builds must be retired on purpose
   (for example a data-safety fix). Never set it above a build users can actually install.
5. Set `published: true` (first release only) and update `updatedAt`.
6. Run `node build.mjs --check` — it must report the config as valid.
7. Commit and push (separately authorised); GitHub Pages redeploys.

## Caching

GitHub Pages sends `Cache-Control: max-age=600`, so a change can take about 10 minutes to reach
apps (longer if a Cloudflare proxy caches it — purge `/app-config/*` there after a release). The
app asks with `Cache-Control: no-cache` and checks at most once a day automatically, so users see
a new release within a day of it being visible; "Check for updates" fetches immediately.

## Testing locally (development only)

- Debug builds read `dev-config.json`, which advertises a fictional build 3 for testing the dialog.
- To test another file, serve this folder and pass a URL **at build time**, debug only:
  `python3 -m http.server 8766` then
  `fvm flutter run --dart-define=UPDATE_CONFIG_URL=http://10.0.2.2:8766/app-config/config.json`
  (10.0.2.2 is the host machine from the Android emulator).
- Release builds ignore any override that is not `https://apps.munna.dev/app-config/*.json`, so a
  localhost URL can never ship.
- Before this endpoint is deployed, the app simply reports "Could not check" on a manual check and
  stays silent otherwise.
