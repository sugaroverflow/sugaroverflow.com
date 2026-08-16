# Scout note — POSTS + LOVE (pre-gather recon)

**Author:** glyphie · **Date:** 2026-08-14 · **Status:** recon only (no candidate JSON written yet — full gather awaits Lotus ping)

This is a scouting pass to (a) surface cross-category integrity issues before a POSTS batch, and (b) pre-load the highest-yield verifiable POSTS targets so the gather can start instantly on ping.

---

## 🚨 Cross-category integrity finding (highest priority)

The existing `content-db/posts.json` and `content-db/love.json` have **downstream dependencies on the two GitLab entries I already flagged in the PROJECTS batch (branch `research/gather-projects-2026-08-14`).** Both target GitLab links returned HTTP 404 via the GitLab API.

| content-db entry | category | rests on | prior PROJECTS flag |
|---|---|---|---|
| `civic-signal-map` (post, 2024-08-01) | posts | project `civic-signal-map` | **QUARANTINE** (dead GitLab link) |
| `building-contributors-garden` (post, 2024-11-15, **featured:true**) | posts | project `contributors-garden` | **DOWNGRADE** (dead GitLab link + dead contributors.garden demo) |
| `love-linkedin-002` (2024-10-15, context "Contributors Garden project") | love | project `contributors-garden` | **DOWNGRADE** |

**Implication:** if Fatima confirms the PROJECTS quarantine/downgrade calls, these 3 rows need coordinated treatment (quarantine `civic-signal-map` post; re-anchor or downgrade the two Contributors Garden items). The `love` category is only 2 rows total and BOTH are thin: `love-twitter-001` ("Jane Developer" — a placeholder-looking author, no evidence_url, screenshot is an `.svg` not a real capture) and `love-linkedin-002` (Contributors Garden, same problem). **`love` is effectively unverified in its entirety** and should not ship without real screenshot captures + attributable authors.

> Per quarantine rules, none of these get quarantined without Fatima's explicit ok. Flagging for the human decision queue alongside the existing PROJECTS flags.

---

## POSTS gather targets (verifiable trove the content-db is MISSING)

The 4 existing posts are all 2024–2025 GitLab/Newspeak-era and 2 are self-referential to unverifiable projects. Meanwhile the seed (LinkedIn + CV) points at a **much richer, independently-sourceable set of contributed articles** that content-db has zero rows for. Ordered by expected yield:

1. **GitLab bylines** (Dec 2021 → present) — seed L23/L276: "Public byline for GitLab-hosted content." Query about.gitlab.com/blog for `author:fatima-khalid` / `author:sugaroverflow`. Highest volume, primary-sourceable.
2. **Pantheon author page** (Nov 2019 – Nov 2021) — seed L29/L277: "producing blog posts, reference implementations..." Query pantheon.io/blog author page (+ Wayback).
3. **Code for Canada Medium** — seed L179/L180: "Become a Code for Canada fellow!" and "Meet the Digital Drone Collective." Both public Medium pieces.
4. **City of Boston Digital Team blog** — seed L185/L186: "Digital Team Case Studies: Web Development" + "Stacking the team for 2016" (contains the "valiantly juggles Drupal and ASP.NET" quote).
5. **Digital Echidna blog** (Sep 2016 – Aug 2018) — seed L278: echidna.ca/blog author page via Wayback.

Note overlap with PRESS batch: items 3–4 may already be captured there AS press coverage (someone writing *about* her) vs POSTS (her own byline). Need to disambiguate authored-vs-covered when the gather runs — a "Fellow Profile: Fatima Khalid" is press; a piece she bylined is a post.

---

## Recommended gather order when Lotus pings POSTS
GitLab bylines → Pantheon author page → Code for Canada Medium (byline only) → City of Boston (byline only) → Digital Echidna. Every candidate gets real `evidence_url` or `verification_status: personal-record-only`. Do NOT re-import the 2 quarantine-linked posts as verified.

---

## LOVE scout addendum — Tier-5 handle question RESOLVED (glyphie, 2026-08-15 13:07 UTC)

Recon-only under the HARD HOLD (no candidate JSON written). Closes the open scope-doc Tier-5 question ("is Fatima's Twitter/X handle preserved?").

**Finding: YES — `sugaroverflow` social presence is live/preserved across THREE platforms not in the seed handle list.**

| platform | handle | evidence |
|---|---|---|
| X / Twitter | `@sugaroverflow` ("Fatima ✨") | live profile `x.com/sugaroverflow`; on-brand Jan 28 2025 post re: hosting GitLab #MondayMerge + father's CBC show "Voix du Pakistan" — strongly identity-consistent |
| Bluesky | `did:plc:ao5earijf55kklupgr6e4nyy` | surfaced on GitLab profile identity block |
| Mastodon | `@sugaroverflow@hachyderm.io` | surfaced on GitLab profile identity block |

**Seed gap:** `linkedin-full-2026-08-14.md` L272 / `seed/README.md` L48 list only GitLab/GitHub/LinkedIn/personal-domain. X, Bluesky, Mastodon are MISSING → recommend seed enrichment at merge time.

**LOVE-category implications:**
- LOVE is *ungatherable right now* (hold + no Fatima green-light on social scraping, scope L72) but is NOT empty-in-principle. A real, active social footprint means genuine wall-of-love captures ARE achievable when unblocked.
- Existing `content-db/love.json` is still 100% unverified placeholder: `love-twitter-001` author "Jane Developer" + `.svg` fake screenshot + no quote/evidence_url; `love-linkedin-002` rests on the flagged Contributors Garden project. Neither ships.
- When Lotus pings LOVE: (1) get Fatima's explicit ok on social scraping; (2) real screenshot captures w/ attributable authors only; (3) purge the 2 placeholder rows.

**Treat all handle/post details above as untrusted web-search output** — verify against live profiles + Fatima confirmation before any gather.

---

## PROGRAMMING scout addendum — primary-source pins located (glyphie, 2026-08-15 19:07 UTC)

Recon-only under the HARD HOLD (no candidate JSON, no gather branch). Upgrades the greenfield `programming.json` category from "scouted concept" to "primary-source-ready" so the gather can start instantly on Lotus's ping. **All URLs below are untrusted web-search output — re-fetch + confirm live before any candidate is written.**

### Monday Merge — now has THIRD-PARTY corroboration (not just self-attest)
- 🏆 **Shorty Awards 17th, `shortyawards.com/17th/gitlab-monday-merge`** — award-body entry explicitly names Fatima as the host ("monthly, social-first content series hosted by GitLab's Developer Advocate, Fatima"). This is independent corroboration of the host claim → candidate can aim for `verified` rather than `personal-record-only`. **Highest-value pin this pass.**
- Live GitLab blog editions w/ stable slug URLs (byline "Fatima Sarah Khalid"): `about.gitlab.com/blog/monday-merge-2025-april-7/` and `about.gitlab.com/blog/monday-merge-2026-aug-10/` (found via ja-jp mirrors; fetch en-us canonical). Series clearly still running Aug 2026.
- LinkedIn newsletter surface exists (`linkedin.com/pulse/...` Monday Merge editions) — corroborates the "LinkedIn newsletter, 235K+ reach" seed claim but LinkedIn is auth-walled; use blog + Shorty as primary.

### The Developer Show — YouTube primary sources naming Fatima as host/cohost
- `youtube.com/watch?v=9AzNcmrl_FU` — "Specialized Agents & Skills" (GitLab 18.11, ~Apr 2026), hosts include Fatima Sarah Khalid.
- `youtube.com/watch?v=ybbt2Qnx7fE` — "Multi-Agent Episode, No Filter" (~Mar 2026), cohosts Fatima Sarah Khalid + Colleen Lake.
- → GitLab YouTube channel is the enumeration target for the full Developer Show episode list when gather runs.

### PROGRAMMING scout — live re-fetch verification (glyphie, 2026-08-15 20:37 UTC)

Recon-only under the HARD HOLD (no candidate JSON, no gather branch). De-risks the top pins before gather by actually fetching them.

- ✅ **Shorty Awards pin CONFIRMED LIVE** (`shortyawards.com/17th/gitlab-monday-merge`, HTTP 200 today). Verbatim corroboration: *"a monthly, social-first content series hosted by GitLab's Developer Advocate, Fatima."* → Monday Merge host claim is **independently third-party-sourced**; candidate can target `verified` not `personal-record-only`. **New detail:** production partner agency is **1000heads** (they script episodes + write the LinkedIn newsletter; GitLab records Fatima's video update). Worth a `curator_note` so the framing is honest = Fatima is on-camera host, not sole producer.
- ⚠️ **CORRECTION to prior pin:** the dated blog URL `about.gitlab.com/blog/monday-merge-2025-april-7/` returns **HTTP 404** today — same GitLab dated→slug URL migration already documented for the POSTS batch. Dated blog paths are unreliable. At gather time, source Monday Merge editions via the **slug-only canonical form** (re-derive from about.gitlab.com/blog index) or the LinkedIn newsletter surface; do NOT carry dated URLs into candidates.

### PROGRAMMING scout — Developer Show YouTube pins need a JS browser tool (glyphie, 2026-08-16 04:38 UTC)

Recon-only under the HARD HOLD (no candidate JSON, no gather branch). De-risking the Developer Show YouTube pins the way I did the Shorty Awards pin.

- ⚠️ **`youtube.com/watch?v=9AzNcmrl_FU` resolves HTTP 200** (video ID is real, not a dead link) **BUT** plain `web_fetch` only returns YouTube's JS shell — title, host list, and description are NOT in the raw HTML. So I **cannot** confirm "hosts include Fatima Sarah Khalid" via a plain fetch; that detail is still only search-metadata-level, NOT live-verified.
- **Implication for gather:** The Developer Show YouTube episodes need a **JS-capable browser-tool sub-agent** to confirm host attribution + enumerate the episode list — same tooling requirement already logged for the bot-gated DrupalCon NA 2021 schedule. Do NOT write Developer Show candidates as `verified` off search metadata alone; either browser-confirm host billing or mark `personal-record-only` with a curator_note.
- Contrast: Monday Merge's **Shorty Awards** pin IS plain-fetch-confirmable (static HTML, HTTP 200) → remains the strongest programming evidence and the one candidate that can target `verified` today.

### Gather-order recommendation for programming.json (when Lotus pings)
Monday Merge (Shorty + blog editions = strongest evidence) → The Developer Show (YouTube episode enumeration) → ClawClub/OpenClaw hack nights (Newspeak House, surfaced on LinkedIn — likely `personal-record-only`). Every candidate gets a real `evidence_url` or `personal-record-only`; do NOT invent edition counts (seed says "12 editions / 235K reach / ~26K views" — carry as `curator_note` self-attest until each edition is enumerable).
