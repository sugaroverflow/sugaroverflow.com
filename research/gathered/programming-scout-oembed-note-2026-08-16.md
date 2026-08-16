# PROGRAMMING scout — oEmbed de-risk correction (2026-08-16, recon-only, hold-compliant)

**Status**: recon-only note. NO candidate JSON, NO gather branch, no `content-db/*` touched.
HARD HOLD (Lotus 2026-08-14) still in effect — this is a followup on an already-open scout thread (The Developer Show host-billing de-risk, open since commit `ed53e32`), which the hold explicitly permits.

## What changed this heartbeat

Prior scout conclusion (`ed53e32`, 2026-08-15): *"video ID 9AzNcmrl_FU resolves HTTP 200 but host billing NOT confirmable via plain fetch"* — implying no plain-fetch primary-source path for The Developer Show.

**Correction**: YouTube's **oEmbed endpoint** IS a clean plain-fetch path (no JS shell, no bot-attestation challenge):

- Endpoint: `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=<ID>&format=json`
- For `9AzNcmrl_FU` → HTTP 200 JSON, verbatim:
  - `title`: "The Developer Show: Specialized Agents & Skills"
  - `author_name`: "GitLab"
  - `author_url`: "https://www.youtube.com/@Gitlab"

## What this confirms (plain-fetch-safe)

1. **Channel ownership** = GitLab's OFFICIAL `@Gitlab` YouTube channel (not a fan/mirror upload). This was the exact open concern re: whether The Developer Show is a genuine GitLab program.
2. **Exact episode title** (verbatim, quotable at gather time).

## What this STILL does NOT confirm

- **Host billing** (i.e. that Fatima is named host/cohost) is NOT in the oEmbed payload. The watch-page HTML that carries the description is still JS-shell + bot-attestation-gated (re-confirmed this heartbeat — HTTP 200 but only YT bootstrap script + GetAttestationChallenge, no description text).
- So the prior guidance HOLDS: do NOT write Developer Show candidates as `verified` off search metadata alone. Host billing needs either (a) a JS-capable browser tool to read the video description/credits, or (b) mark `personal-record-only`.

## Net for gather (when hold lifts)

The Developer Show greenfield status upgrades: **channel ownership is now plain-fetch-verifiable** (was thought unverifiable). Use oEmbed `author_name`/`author_url` as the corroborating evidence_url for "GitLab program" at gather time; keep host-billing at `personal-record-only` until a JS browser tool confirms the description names Fatima.

Unchanged pins from prior scout commits:
- Monday Merge: third-party corroboration via Shorty Awards (HTTP 200, "hosted by GitLab Developer Advocate Fatima") — verified-targetable.
- Shorty Awards: only plain-fetch-confirmable programming pin (still true; oEmbed now adds a second plain-fetch signal for Developer Show channel ownership).
- Dated GitLab blog URLs are DEAD 404 (dated→slug migration); use slug-only canonical.

No environment browser tool is available in this session (no first-class browser tool in policy set; `playwright` node module not resolvable though chromium-1228 is cached). Host-billing confirmation remains blocked on a JS tool.

## Addendum (2026-08-16 11:07 UTC, same hold, same recon-only thread)

Extended the oEmbed de-risk to the **second** Developer Show episode ID so both pinned episodes now have plain-fetch channel-ownership evidence (prior note only covered `9AzNcmrl_FU`):

- `ybbt2Qnx7fE` → oEmbed HTTP 200 JSON, verbatim:
  - `title`: "The Developer Show: Multi-Agent Episode, No Filter"
  - `author_name`: "GitLab"
  - `author_url`: "https://www.youtube.com/@Gitlab"

**Net:** BOTH Developer Show episode IDs (`9AzNcmrl_FU`, `ybbt2Qnx7fE`) are now confirmed to live on GitLab's OFFICIAL `@Gitlab` channel via plain-fetch oEmbed — no fan/mirror ambiguity for either. Exact titles quotable at gather time from oEmbed. Host-billing (Fatima named as host/cohost) STILL not in oEmbed payload for either → unchanged blocker: needs a JS browser tool or mark `personal-record-only`. No candidate JSON, no gather branch, `content-db/*` untouched.

---

## Scout addendum — GitLab team-page bio anchor is JS-gated now (glyphie, 2026-08-16 16:37 UTC)

Checked Tier-1 source #8 (`about.gitlab.com/company/team/` — the public handbook team directory, listed in RESEARCH-SCOPE.md as a plain-fetch bio/affiliation anchor). **Result: dead for plain fetch.**

- `about.gitlab.com/company/team/?department=developer-relations` → 302 redirects to `about.gitlab.com/company/?department=developer-relations`, a generic marketing/"About GitLab" page. No per-person team roster in the HTML.
- The old flat YAML-rendered team directory (which used to expose individual member bios + affiliations to plain fetch) is gone; the current team listing is a JS-driven app. Same JS-gate class as the Developer Show watch-page pins.

**Implication:** do NOT re-chase the GitLab team page for a Fatima bio/affiliation anchor via `web_fetch` — it needs a JS browser tool. The GitLab-affiliation claim is already independently corroborated by the plain-fetch-confirmed Shorty Awards entry ("hosted by GitLab Developer Advocate Fatima", commit 680d3a0) + live GitLab blog bylines (POSTS batch 1), so this dead-end costs us nothing.

Hold-compliant recon-only. No candidate JSON, no gather branch.

---

## Scout addendum — GitLab handbook team-YAML permalink was NEVER a viable anchor (glyphie, 2026-08-16 18:37 UTC)

Same open GitLab-affiliation-anchor thread. Chased the last plain-fetch primary-source angle for GitLab tenure: the **git-backed** team data in the `gitlab-com/www-gitlab-com` repo (the flat YAML directory that predates the JS team app). If a `fatima-*.yml` existed there, its git-history permalink would be a hard primary-source tenure anchor — stronger than any live page.

Method (all unauthenticated plain-fetch, GitLab REST v4):
- `repository/tree?path=data/team_members/person` → HTTP 200, dir is alphabetically bucketed (subtrees `0`,`1`,…,`f`,…).
- `…/person/f` subtree → HTTP 200, 45 entries, **zero fatima/khalid match** at current HEAD.
- **History check** via `repository/commits?path=…` for 4 plausible canonical filenames (`fatima-sarah-khalid.yml`, `fatima-khalid.yml`, `fkhalid.yml`, `fsarahkhalid.yml`) → all HTTP 200 with **empty commit list = the path never existed in repo history** under any of those names.
- (Blob code-search `search?scope=blobs&search=sugaroverflow` → HTTP 401: GitLab blob search requires auth, NOT a plain-fetch path — do not re-chase.)

**Verdict:** there is **no** git-backed team-YAML permalink for Fatima in `www-gitlab-com`. Likely because DevRel team data relocated in the handbook migration and/or her tenure sits outside the flat-YAML era. **Do NOT spend future gather budget hunting a GitLab handbook team-YAML affiliation anchor — it isn't there.** GitLab affiliation stays anchored on Shorty Awards (plain-fetch) + live blog bylines (POSTS batch 1), which are sufficient.

This closes the GitLab-affiliation-anchor scout thread on the plain-fetch tier: every remaining upgrade (Developer Show / Monday Merge host-billing, live JS team page) is blocked on a JS browser tool not in this session's policy set. Hold-compliant recon-only. No candidate JSON, no gather branch, `content-db/*` untouched.
