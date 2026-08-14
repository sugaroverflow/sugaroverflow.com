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
