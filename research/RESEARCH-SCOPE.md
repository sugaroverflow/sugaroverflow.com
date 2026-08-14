# Portfolio research scope — sugaroverflow.com

**Goal**: gather all publicly-verifiable portfolio data from Fatima's 15 years of work (2011–2026) before building the portfolio site.

**Standing rule**: **honest gaps > invented content**. If a claim can't be verified against a primary source, we do not add it. If a current content-db entry can't be verified, it moves to `research/quarantine/`.

## Team

- **Lotus 🪷** (coordinator) — plans phases, writes scope docs, reviews Glyphie's output, opens PRs, coordinates with Fatima
- **Glyphie 🌀** (gatherer) — primary-source research across the open web. Same skill as her lobbycat research pass: patient, primary-source, honest verification. Unpaused from lobbycat-sunset for this
- **Soren 🦉** (verifier) — audits Glyphie's gathered candidates before they land in `content-db/`. Security-auditor personality translates well to "would Fatima be embarrassed if this URL 404'd or was misattributed?" Currently idle, ready to activate per-batch
- **Fatima** (human, source of truth) — provides seeds (LinkedIn + CV), reviews & merges PRs, resolves ambiguity

## The universe (categories)

Currently in `content-db/`:
1. **projects** — code, apps, hackathon builds, prototypes
2. **speaking** — talks, keynotes, panels, workshops, livestreams
3. **posts** — blog posts under Fatima's byline
4. **press** — articles / podcasts / interviews mentioning or featuring Fatima
5. **awards** — honours, scholarships, prizes, recognition
6. **community** — fellowships, working-group leadership, mentor roles, cooperatives
7. **love** — public appreciation (tweets, LinkedIn posts, testimonials, quotes)

Categories under consideration (decide with Fatima before building):
- **certifications** — Deep Atlas, AnitaB.org, Acquia (currently uncategorized)
- **education** — could be its own file, or absorbed into community

## Sources to hit (ordered by expected yield)

### Tier 1 — primary bylined content
- **GitLab blog** (Dec 2021 – present) — https://about.gitlab.com/blog/ — search for `sugaroverflow` or `fatima-khalid`
- **Pantheon blog** (Nov 2019 – Nov 2021) — https://pantheon.io/blog — author archive
- **Digital Echidna blog** (Sep 2016 – Aug 2018) — https://echidna.ca/ + Wayback Machine
- **Code for Canada Medium** (Sep 2018 – Aug 2019) — https://medium.com/code-for-canada
- **City of Boston Digital Team blog** (2015–2016) — Wayback Machine (they may be dead links)
- **Microsoft New York + New England blogs** (2014–2015) — Wayback Machine (probably dead now)
- **Personal blogs** — ask Fatima if she has an older WordPress / Medium / dev.to / personal site
- **GitLab.com Handbook / Team page** — https://about.gitlab.com/company/team/ (public profile with bio + affiliations)

### Tier 2 — event archives
- **DrupalCon session catalogs** — https://events.drupal.org/ — Baltimore 2017, Vienna 2017, Nashville 2018, Seattle 2019 (session pages should still exist)
- **MidCamp 2019** — midcamp.org archive
- **DrupalCamp Colorado 2020** — archive
- **All Things Open** — allthingsopen.org (2022, 2023 speaker pages)
- **DevOpsDays Chicago 2023** — devopsdays.org
- **Open Source Summit NA 2023** — Linux Foundation session catalog
- **DevRel Summit** — devrelsummit.com or similar
- **WordFest Live 2021** — YouTube + WordPress-adjacent archives
- **Code for America Summit 2019 ("Connect")** — codeforamerica.org
- **DrupalCon Vienna 2017 "Imposter Monologues Vol. 3"** — YouTube + drupal.org session page
- **DrupalCon Baltimore 2017 "Imposter Monologues Part II"** — YouTube + drupal.org session page

### Tier 3 — media coverage archives
- **CBC News** — search "Fatima Khalid" + "London Ontario" + "Digital Echidna"
- **The London Free Press / Business London / other Ontario outlets** — 2017–2018 WCT/D&I coverage
- **Chatelaine / other Canadian women-in-tech media** — Rising Star era
- **DrupalEasy Podcast** — episode 205 (already in content-db, verify URL)
- **Talking Drupal Podcast** — episode 297 (already in content-db, verify URL)
- **Techstrong / DevOps.com** — DevOps Dozen 2023 coverage
- **Google Open Source Blog** — Peer Bonus 2020 announcement post

### Tier 4 — code / repo evidence
- **github.com/sugaroverflow** — full repo list, contribution history
- **gitlab.com/sugaroverflow** — full repo list, contribution history
- **drupal.org/u/sugaroverflow** — Drupal contributor profile (issues, patches, sprints)
- **github.com search: `is:pr author:sugaroverflow`** — cross-org contributions
- **npm / packagist / composer** — published packages
- **Google Open Source Blog Q1 2020 post** for Drupal-specific citation

### Tier 5 — social / testimonial
- **Twitter/X archive** — need Fatima's direction on whether to scrape / whether her old handle account is preserved. Wall-of-love candidates
- **LinkedIn public posts** — from Fatima's timeline (public engagement)
- **Newspeak House** — https://newspeak.house — fellow directory + cohort page

## Verification bar (Soren's audit rubric)

For each candidate row before it lands in `content-db/`:

1. **Attribution**: Does the evidence URL mention "Fatima Sarah Khalid" (or clearly her — full name, handle `sugaroverflow`, or unambiguous context)?
2. **Freshness**: Is the URL live? If Wayback, does the archive show real content, not a 404?
3. **Date consistency**: Does the event/publication date match what's on the page?
4. **Editorial honesty**: Is the description Fatima gave (or Glyphie inferred) supported by the source, or is it embellished?
5. **Duplication**: Does this overlap with an existing content-db row? If yes, merge/update instead of adding.

Each candidate gets `verification_status`:
- `"verified"` — passes all 5 above with a live URL
- `"verified-wayback"` — passes but source is Wayback-only (still fine, note it)
- `"personal-record-only"` — Fatima knows it happened, no public source found (allowed for personal-record entries like private mentorship, keep sparingly)
- `"delete"` — cannot be verified, moves to quarantine

## Workflow

For each category:

1. **Glyphie's gather pass** — writes candidates to `research/gathered/<category>-<YYYY-MM-DD>.json`
   - Uses the LinkedIn seed + CV seed as the required frame
   - Adds evidence URLs, pull quotes, editorial context
   - Marks each candidate with `verification_status`
   - Commits with prefix `🌀 glyphie: gather <category>`

2. **Soren's verification pass** — reads Glyphie's `research/gathered/<file>.json`, produces `research/audits/<category>-<YYYY-MM-DD>.md`
   - Walks each candidate through the 5-point rubric
   - Marks pass/fail per row
   - Flags dupes vs existing content-db

3. **Lotus's merge pass** — takes Soren-approved candidates, merges into `content-db/<category>.json`, opens one PR per category
   - PR body summarizes: added, updated, quarantined, deleted
   - Fatima reviews & merges

4. **Fatima's review** — final human eye. Anything that feels wrong → back to research.

## Ground rules

- **Never fake screenshots.** `love.json` and `press.json` currently have placeholder .svg screenshots — those get removed until real screenshots exist.
- **Never invent authors.** No "Jane Developer" tweets.
- **Never invent URLs.** `example.com/slides` and `example.com/video` are quarantine-worthy.
- **Delete rather than fake.** Empty is honest, placeholders are worse than nothing.
- **Preserve provenance.** Every row has `verification_status` + `evidence_url` (or explicit null with `curator_note` explaining why).
- **One PR per category** so Fatima can review focused chunks.
- **Don't touch `src/`** during the research phase. Site build comes after portfolio-data is complete.

## Phase gates

- ✅ **Phase 0** (done) — LinkedIn ingested to `research/seed/linkedin-full-2026-08-14.md`, CV ingested to `research/seed/resume--fatimasarahkhalid.md`, seed README written
- 🟡 **Phase 1** (in flight) — quarantine known hallucinations, unpause Glyphie, dispatch first gather
- ⏸️ **Phase 2** — Glyphie's gather pass, category by category
- ⏸️ **Phase 3** — Soren's verification per batch
- ⏸️ **Phase 4** — Lotus merges into content-db, one PR per category
- ⏸️ **Phase 5** — Fatima reviews the state, we call the portfolio-data goal done
- ⏸️ **Phase 6** — Build the site (separate goal, not this project)

## Newly-visible items from CV (post-linkedIn ingest)

CV revealed items not on public LinkedIn:

### GitLab-era programming (Dec 2021–present, hosted by Fatima)
- **The Developer Show** — GitLab video series
- **Monday Merge** — GitLab developer update series (235K+ newsletter reach, 12 editions, ~26K views)
- GitLab **Discord scaling** from 400 → 6,294 members
- **Community Newsletter** — 2,000 subscribers

### Program-committee / track-chair roles (not "speaking," a different category)
- **Open Source Summit Conference Committee** — Diversity & Inclusion Track Chair, 2022–2023
- **DrupalCon Program Team** — DEI Track Chair 2018 + Backend Development Track Chair 2019

### Newspeak-era work (2025–present)
- **Multi-Agent AI Systems Research** — governance, orchestration, evaluation patterns
- **OpenClaw / ClawClub** — AI Agents Community Programming (hack nights, agent orchestration workshops)
- **Political Technology Awards** — AI-assisted evaluation system for civic/political tech projects

### Civic-tech / earlier work
- **CivicGraph.io** — Microsoft Civic Tech Fellowship 2014–2015 (d3.js graph viz)
- **HubHacks Boston 2014 win** — City of Boston Address Search on SAM (d3.js + Sass + Bootstrap + jQuery)
- **BetaNYC Civic Hack Day** — NYC DOE PreSchool search (Google Maps API)
- **NYU Innovation Consultant** (2012–2014) — mentored 20 students on entrepreneurship
- **Terminus Build Tools plugin maintenance** at Pantheon (2019–2021) — supporting 2,000+ enterprise customers
- **Transport Canada Site Search tool** — 40,000+ hits in first month (2018–2019)

### Pre-NYU / high school signals (may not be portfolio-worthy but note anyway)
- **Cardozo High School** activities: Arista Honors Society, Mock Trial, UNICEF Leadership
- **CTY Johns Hopkins** summer programs, 2002–2004
- (Fatima's call whether any of this belongs in the portfolio at all)

## Corrections vs current content-db from seed

1. **`community.json` "drupal-di-working-group"** currently says 2017–2020. CV says 2017–2019 with title **Team Lead** (not "Leader"). Update.
2. **`community.json` "newspeak-house-2025"** description is vague. CV gives specific thesis-project scope: *"data governance, algorithmic accountability, and the ways technology, policy, and communities shape one another."* Update.
3. **Employer name Digital Echidna vs Northern Commerce** — needs Glyphie to check which is canonical. If Digital Echidna was acquired by / became Northern Commerce, both stay in the record but chronology needs cleaning up.
4. **DrupalCon Nashville 2018** — currently in `speaking.json` as "OOP the Pokemon Journey." That may be right, but also Fatima was **DEI Track Chair 2018 at that conference** — that's a separate role, not the same as speaking. Need both entries.

## Category decisions (proposed for Fatima to sign off)

### New file `certifications.json`?
Currently no certifications category. Three entries from LinkedIn:
- AI/ML Intensive for Software Engineers — Deep Atlas (Mar 2025)
- AnitaB.org Mentor Badge (Apr 2022, credential ID 002)
- Acquia Certified Developer - Drupal 8 (May 2016)

**Recommendation**: Yes, add `certifications.json`. Small file, clean separation.

### New file `programming.json`?
Hosted programs/series are neither "speaking" (one-off talks) nor "projects" (code). They're a distinct thing:
- The Developer Show
- Monday Merge
- ClawClub / OpenClaw hack nights

**Recommendation**: Yes, add `programming.json`. This is a meaningful category of Fatima's DevRel work.

### New file `education.json`?
NYU CS + NYU Journalism + Hanyang exchange + Cardozo HS + CTY.

**Recommendation**: Add `education.json` for formal degrees + exchange. Leave fellowships in `community.json`. High school + CTY optional — Fatima's call.

### Program-committee roles — where do they go?
D&I Track Chair, DEI Track Chair, Backend Dev Track Chair — these are conference-governance roles, not speaking, not general community.

**Recommendation**: Add to `community.json` under new `type: "program-committee"`. Same file, existing schema flex.

## Next actions (immediate)

1. ✅ Set up `research/{seed,gathered,quarantine,audits}/`
2. ✅ Write RESEARCH-SCOPE.md + seed README + quarantine README
3. 🟡 Unpause Glyphie with a portfolio-scoped heartbeat pointing at this scope
4. 🟡 Dispatch first gather batch: **Category 1 = SPEAKING** (highest volume of gatherable evidence + Drupal-era items are internally consistent so should be quickest wins)
5. Post 30-min heartbeats to Discord coworking channel (`1519890238967779338`) — Fatima wants prolific updates so she can spot-check JSONs as they come
