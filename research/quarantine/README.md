# Quarantine

Content-db entries the previous portfolio-researcher pass flagged as
`inferred` / no evidence. Kept here for reference — do NOT re-verify or
resurrect without Fatima's explicit confirmation.

Rule: **honest gaps > invented content**. Anything here is a candidate
for deletion, not a candidate for rescue.

## What's quarantined

### From `speaking.json`

- **`gitlab-commit-keynote-2024`** — "Humans, AI, and the New Dev Workflow" at GitLab Commit SF 2024. Placeholder URLs (`example.com/slides`, `example.com/video`). No evidence GitLab Commit ran in 2024. Placeholder image `/images/speaking/gitlab-commit-2024.svg`.
- **`devrel-summit-field-notes-2024`** — "Designing Programs for the Agentic Era" at DevRel Summit London 2024. Placeholder URL. No public evidence this talk happened.
- **`all-things-open-2022`** — "Speaker at All Things Open 2022" — title TBC, no evidence Fatima spoke that year.
- **`all-things-open-2023`** — same shape as 2022 entry, title TBC.

### From `projects.json`

- **`tanuki-airlines`** — GitLab Tanuki Airlines Demo. Demo URL is `tanuki-airlines.example.com` (placeholder). Repo unverified. May be real work but the row is entirely placeholder.
- **`civic-signal-map`** — placeholder Newspeak-branded project. Demo URL is `civic-signal-map.example.com`. No external evidence.
- **`contributors-garden`** — marked `verified: true` but only evidence_url is a GitLab repo link Fatima's own row asserts — needs an independent verification that the project + livestream + `contributors.garden` domain exist.

### From `posts.json`

- **`ai-governance-layers`** — "Mapping AI Governance: Three Layers" — a placeholder Newspeak-branded post. File doesn't exist in `src/content/posts/`.
- **`civic-signal-map`** (post) — companion post to the placeholder project.
- **`building-contributors-garden`** — deep-dive on the placeholder project (see above).
- **`devrel-summit-notes`** — field notes from the DevRel Summit 2024 talk that itself has no evidence.

All four posts have `file:` values pointing to `.mdx` files that don't exist in the repo. If we're being strict, this whole file is suspect — but Fatima may have real drafts to bring back.

### From `love.json`

- Both entries — placeholder screenshots (`.svg`, not real) + one entry attributes to "Jane Developer" which is clearly synthetic.

## Restore path

If Fatima says "wait, X is real, here's the evidence" for any quarantined row:
1. Move the row back to `research/gathered/<category>-restore-<date>.json`
2. Run it through Soren's normal verification pass with the new evidence
3. Merge only if it passes

Do NOT restore anything from this folder without explicit Fatima confirmation + a real evidence URL.
