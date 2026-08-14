# SCOUT: programming category (DevRel shows/series)

**Status**: scout only — NOT a gather batch. Holding full batch for Lotus's ping per HEARTBEAT rotation rule.
**Date**: 2026-08-14 ~16:40 UTC
**Why now**: POSTS batch 2 fully shipped + resolved (wayback-pending + drupal.org enumeration done in commit 93578f7, pushed). `programming.json` in content-db is EMPTY (`{"programming": []}`) → pure greenfield, high additive value, zero merge conflict risk.

## Seed evidence (resume--fatimasarahkhalid.md)
- L13: "Hosted developer-facing programs including *The Developer Show* and *Monday Merge*..."
- L14: "Hosted *Monday Merge*, GitLab's developer update series, reaching a 235K+ newsletter audience and generating ~26K views across 12 editions."
- L51: "Hosted *The Developer Show*, a developer-focused video series featuring technical conversations with industry leaders and practitioners."
- L52: "Hosted *Monday Merge*, a recurring GitLab developer update series covering product releases, DevSecOps trends, open source, and AI developments."
- linkedin L220: "Pantheon Office Hours 2024" (separate Pantheon-era program — verify separately)
- linkedin L206: "Contributors Garden — real? Fatima gave it as verified:true but no external evidence." → NOTE: cross-ref with projects batch finding that contributors.garden GitLab project is DEAD (404). If it belongs anywhere it's programming, but evidence is thin. Do NOT self-attest.

## LIVE evidence found this scout (web_search, 2026-08-14)

### Monday Merge — STRONG
- **Shorty Awards (17th) case study**: https://shortyawards.com/17th/gitlab-monday-merge
  - Snippet: "Develop a monthly, social-first content series hosted by GitLab's Developer Advocate, Fatima, ensuring credibility and authenticity." → third-party names Fatima as host. Award-adjacent recognition (may also feed AWARDS category — flag to Soren/Lotus for cross-category placement).
- **Live GitLab blog editions** (signed "Fatima Sarah Khalid | Senior Developer Advocate, GitLab"):
  - https://about.gitlab.com/blog/monday-merge-2026-aug-10/ (found via /ja-jp/ mirror; get canonical en URL)
  - https://about.gitlab.com/blog/monday-merge-2026-march-9/
  - → recurring series with dated slugs; enumerate the full run (resume claims 12 editions) via about.gitlab.com/blog tag/author page next batch.

### The Developer Show — STRONG (but DISAMBIGUATION REQUIRED)
Real YouTube episodes. Attribute ONLY episodes crediting Fatima:
- ✅ https://www.youtube.com/watch?v=9AzNcmrl_FU "Specialized Agents & Skills" (GitLab 18.11) — "Hosts Fatima Sarah Khali[d]..." (Apr 24 2026)
- ✅ https://www.youtube.com/watch?v=ybbt2Qnx7fE "Multi-Agent Episode, No Filter" — "cohosts Fatima Sarah Khalid and Colleen Lake" (Mar 25 2026)
- ⚠️ https://www.youtube.com/watch?v=FYvLwhKV11U "Live in London" — hosted by **Colleen Lake**, NOT Fatima → EXCLUDE (co-host disambiguation, mirrors the CFC-Medium/Boston third-person exclusions pattern)
- ? https://www.youtube.com/watch?v=luj-Xhy8sCo "GitLab 18 Event Recap" — host not in snippet; verify before attributing

## UPDATE 2026-08-14 ~17:10 UTC — Monday Merge edition enumeration + 🚨 URL integrity finding

Deepened the Monday Merge scout (still NOT a batch — holding for Lotus ping). Enumerated dated editions via search; then verified live status with curl.

**🚨 CRITICAL URL FINDING — English canonical Monday Merge slugs are all HTTP 404 right now.** The ONLY publicly-resolving edition URLs are the `/ja-jp/` localized mirrors (HTTP 200). Verified with curl (User-Agent Mozilla, -L follow):

| Edition | en canonical (`/blog/monday-merge-...`) | `/ja-jp/blog/monday-merge-...` |
|---|---|---|
| 2025-april-7 | 404 | (search-surfaced, live) |
| 2025-july-14 | 404 | **200 ✅** |
| 2025-december-08 | 404 | (search-surfaced) |
| 2026-march-9 | 404 | (search-surfaced) |
| 2026-june-22 | 404 | (search-surfaced) |
| 2026-aug-10 | 404 | (search-surfaced) |

Also tried dated-path forms (`/blog/2025/07/14/...`, `/blog/2025/07/14/monday-merge/`) → all 404. web_fetch on en URLs returns only the SPA shell string 'GitLab The One DevOps Platform' (JS-walled), consistent with POSTS batch 2's GitLab blog migration warning — but here the en article genuinely does not resolve at the slug path.

**Authorship disambiguation on the ja-jp mirror**: meta `author` tag = 'GitLab Japan Team' (translators), BUT body text explicitly signs off as Fatima — verified on 2025-july-14: 'Fatimaです。今月のMonday Mergeも...' and signoff 'Fatima Sarah Khalid'. So Fatima IS the credited series author; ja-jp page is a localized reprint carrying her byline in-body only.

**Implication for the batch (when Lotus pings):**
- Do NOT bank en canonical slug URLs as evidence_url — they 404 today. That would violate the no-fake-URL rule.
- Options for honest evidence_url per edition, in preference order: (a) recover the en canonical via Wayback (spaced CDX calls, respect 429); (b) if Wayback empty, use the live `/ja-jp/` mirror URL with `verification_status: 'byline-in-body-non-canonical-mirror'` + curator_note explaining the en 404 + Japan-Team meta author; (c) Shorty Awards case study as third-party host attribution (already captured).
- Resume claims ~12 editions / 235K+ newsletter / ~26K views. Enumerated so far: 6 distinct dated editions (Apr/Jul/Dec 2025; Mar/Jun/Aug 2026). Need Wayback/tag-page enumeration to reach 12 and to test the stats claims (do NOT self-attest the 235K/26K numbers — resume-only unless a public source shows them).

**No Wayback hammering done this step** — only 8 curl HEAD-equivalent status checks (spaced 1s) + 1 body fetch of the confirmed-live ja-jp page.

## UPDATE 2026-08-14 ~17:40 UTC — Wayback CDX resolves the evidence-URL question (Monday Merge)

Ran Wayback CDX + live curl to settle how to source Monday Merge editions honestly. **Verdict reached — the ja-jp live mirror is the honest evidence_url.**

**Wayback CDX enumeration** (`about.gitlab.com/blog/monday-merge*`, collapsed, spaced calls, no hammering):
- Wayback has ONLY 3 distinct editions indexed: `2025-april-7`, `2025-may-9`, `2025-june-9` — **all captured as HTTP 301** (redirect stubs, not article bodies).
- The 301 target is just the trailing-slash form (`.../april-7` → `.../april-7/`) — NOT a content-bearing capture. Grep of the followed snapshot returned zero Fatima/Monday-Merge strings → the archived body is a redirect stub, not the article.
- A `filter=statuscode:200` CDX query timed out (exit 28) with no 200 rows → **no clean article-body capture exists in Wayback** for any edition.

**Live en canonical re-test (trailing-slash form, the earlier scout's suspected fix):** still 404.
- `https://about.gitlab.com/blog/monday-merge-2025-april-7/` → 404
- `.../monday-merge-2025-july-14/` → 404
- `.../monday-merge-2025-may-9/` → 404
- `.../monday-merge-2025-june-9/` → 404
→ So the trailing slash was NOT the issue; the en article genuinely does not resolve at any slug form, live or archived-as-200.

**ja-jp mirror re-confirmed LIVE (HTTP 200) with in-body byline:**
- `https://about.gitlab.com/ja-jp/blog/monday-merge-2025-july-14/` → 200, body: 「Fatimaです。今月のMonday Mergeも…」 + signoff 'Fatima Sarah Khalid'
- `https://about.gitlab.com/ja-jp/blog/monday-merge-2025-april-7/` → 200

**DECISION for the batch (honest, no fake URLs):**
- `evidence_url` = the live `/ja-jp/blog/monday-merge-<date>/` mirror (HTTP 200 today).
- `verification_status: "byline-in-body-non-canonical-mirror"`
- `curator_note`: en canonical 404s live + Wayback only holds 3 editions as 301 redirect stubs (no 200 body capture); ja-jp meta author = 'GitLab Japan Team' (translators) but in-body byline + signoff is Fatima → she IS the credited series author.
- Cross-third-party host attribution still available: Shorty Awards 17th case study (names Fatima as host) — feeds AWARDS too.
- **Editions we can currently evidence live:** july-14 + april-7 (ja-jp 200 confirmed). Others (may-9, june-9, dec-08 2025; mar-9, jun-22, aug-10 2026) are search-surfaced only → next step: test each ja-jp mirror live before banking. Do NOT bank the resume's '~12 editions / 235K newsletter / ~26K views' stats — resume-only unless a public source shows them.

Calls this step: 1 CDX collapse, 1 CDX 200-filter (timed out), 1 Wayback snapshot HEAD, 1 Wayback body grep, ~6 live curls — all spaced ≥1s. No 429s hit.

## Next-batch plan (on Lotus ping)
1. Enumerate Monday Merge full run via about.gitlab.com author/tag page → count editions, capture canonical en URLs, confirm ~12 + stats claim.
2. Enumerate The Developer Show via GitLab YouTube channel → list Fatima-hosted episodes only; capture view counts where public (supports the ~26K claim, but that stat is Monday Merge per resume L14 — keep separated).
3. Pantheon Office Hours 2024 → Pantheon YouTube / Wayback (Pantheon forum sunset noted in POSTS batch 2 — may be Wayback-only).
4. Contributors Garden → leave as personal-record-only unless a live stream archive surfaces; already flagged dead in projects batch.
5. Each entry: title, program, role (host/co-host), era, dates, evidence_url (live), verification_status, curator_note for co-host disambiguation.
