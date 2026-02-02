# Technical Implementation Plan — `sugaroverflow.com`

This document outlines the technical implementation plan for building the personal portfolio site using Astro, Tailwind CSS, and a JSON content database.

---

## Tech Stack

* **Astro** (content-heavy, fast, partial hydration)
* **Tailwind CSS**
* **MDX** for blog posts
* **Local JSON content DB** for portfolio data
* Comments: non-GitHub options only (e.g., **Commento**, **Hyvor**, or custom)

---

## Brand System

### Colors

Use these as Tailwind custom colors.

```ts
// tailwind.config.mjs (excerpt)
theme: {
  extend: {
    colors: {
      sage: {
        100: '#F3F6F4',
        300: '#C9D8D0',
        500: '#9DB9A7',
        700: '#6F8F7B',
        900: '#3E5246',
      },
      lilac: {
        100: '#F8F1FA',
        300: '#E7D3EE',
        500: '#C49FD3',
        700: '#9A6BAC',
      },
      mist: {
        100: '#F0F5FF',
        300: '#C9D6F0',
        500: '#8BA4D9',
        700: '#5A6FAF',
      },
      neutral: {
        50: '#FAFAF7',
        100: '#EDEBE7',
        300: '#E2E2E2',
        900: '#2A2A2A',
      },
    },
  },
}
```

**Usage:**

* Backgrounds: `sage-100`, `neutral-50`
* Text: `neutral-900`
* Headings: `sage-900`, `mist-700`
* Primary accents/buttons: `lilac-500`
* Secondary accents: `mist-500`

### Typography

Pick web fonts to match:

* Headings: soft serif
  * Example: `Playfair Display` or `DM Serif Display`
* Body: clean sans
  * Example: `Inter` or `Nunito`

Tailwind utilities:

* `text-3xl/4xl` for hero headings
* `text-lg` for body
* `tracking-tight` for headings

---

## Repo Structure

```bash
.
├── package.json
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── public
│   ├── images
│   │   ├── headshots
│   │   ├── thumbnails
│   │   ├── awards         # Award ceremony photos
│   │   ├── press          # Press screenshots
│   │   └── social         # Wall of love screenshots
│   └── favicon.ico
├── src
│   ├── components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Layout.astro
│   │   ├── ProjectCard.astro      # Self-contained project cards
│   │   ├── BlogPostCard.astro     # Blog post preview cards
│   │   ├── TagChip.astro
│   │   ├── ContentTypeLabel.astro # field-notes/tutorial/deep-dive/research-update
│   │   └── FiltersBar.astro
│   ├── layouts
│   │   └── BlogPostLayout.astro
│   ├── pages
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── work.astro
│   │   ├── research.astro         # Renamed from fellowship
│   │   ├── speaking.astro         # NEW
│   │   ├── press.astro
│   │   ├── blog.astro             # Not in main nav, discoverable
│   │   ├── love.astro             # NEW - Wall of love
│   │   ├── blog
│   │   │   └── [slug].astro
│   │   └── rss.xml.ts
│   ├── content
│   │   └── posts          # MDX/Markdown posts
│   └── lib
│       ├── content-db.ts
│       └── types.ts
└── content-db
    ├── projects.json
    ├── posts.json         # Metadata only, content in MDX
    ├── speaking.json
    ├── press.json
    └── love.json          # Wall of love entries
```

---

## Content DB Schema

### TypeScript Types (`src/lib/types.ts`)

```ts
// Content type labels for blog posts
export type PostContentType =
  | 'field-notes'      // Observations, links, diary-style
  | 'tutorial'         // How-to, practical guides
  | 'deep-dive'        // Long-form analytical pieces
  | 'research-update'; // Progress posts for Newspeak work

// Affiliation tags
export type Affiliation = 'gitlab' | 'newspeak' | 'personal';

// Project-specific types
export interface ProjectLinks {
  demo?: string;
  repo?: string;
  slides?: string;
  video?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string; // 2-3 sentences
  year: number;
  image?: string; // Thumbnail
  tech: string[]; // ["JavaScript", "HTML5 Canvas", "GCP"]
  links: ProjectLinks;
  topics: string[]; // ["devrel", "open-source"]
  featured?: boolean;
  deepDiveSlug?: string; // Optional link to full blog post
}

// Blog post metadata
export interface Post {
  id: string;
  slug: string;
  title: string;
  description: string;
  contentType: PostContentType;
  date: string; // ISO format
  affiliation: Affiliation[];
  topics: string[]; // ["AI", "DevRel", "Governance"]
  featured?: boolean;
  file: string; // Path to MDX file
}

// Speaking engagement
export interface Talk {
  id: string;
  title: string;
  event: string;
  location: string;
  date: string;
  year: number;
  type: 'keynote' | 'talk' | 'workshop' | 'panel';
  description: string;
  topics: string[];
  links: {
    slides?: string;
    video?: string;
    event?: string;
  };
  image?: string; // Photo from talk
  featured?: boolean;
}

// Press/Awards
export interface Award {
  id: string;
  title: string;
  organization: string;
  year: number;
  date: string;
  citation?: string; // Quote from award
  ceremonyPhoto?: string;
  context?: string; // Brief context
}

export interface PressItem {
  id: string;
  publication: string;
  title: string;
  date: string;
  year: number;
  screenshot: string; // Full page screenshot
  pullQuote?: string; // Extract from article
  url?: string; // Original URL for reference
}

// Wall of love
export interface LoveItem {
  id: string;
  screenshot: string; // Screenshot of tweet/LinkedIn post
  platform: 'twitter' | 'linkedin' | 'other';
  author?: string; // Blur if private message
  date?: string;
  context?: string; // Which talk/project this relates to
}
```

---

## Example JSON Files

### Project — `content-db/projects.json`

```json
{
  "projects": [
    {
      "id": "contributors-garden",
      "title": "Contributors Garden",
      "description": "Collaborative 2D pixel art garden built live during The Developer Show. Community shapes features through real-time participation.",
      "year": 2024,
      "image": "/images/thumbnails/contributors-garden.png",
      "tech": ["JavaScript", "HTML5 Canvas", "GCP Cloud Run", "GitLab CI/CD"],
      "links": {
        "demo": "https://contributors.garden",
        "repo": "https://gitlab.com/sugaroverflow/contributors-garden"
      },
      "topics": ["devrel", "community", "live-coding"],
      "featured": true,
      "deepDiveSlug": "building-contributors-garden"
    },
    {
      "id": "tanuki-airlines",
      "title": "Tanuki Airlines Demo",
      "description": "Full-stack demo showing GitLab-powered CI/CD and AI-assisted workflows for enterprise DevSecOps.",
      "year": 2023,
      "image": "/images/thumbnails/tanuki-airlines.png",
      "tech": ["React", "GitLab", "Kubernetes", "Terraform"],
      "links": {
        "demo": "https://tanuki-airlines.example.com",
        "repo": "https://gitlab.com/sugaroverflow/tanuki-airlines"
      },
      "topics": ["devrel", "demo", "ci-cd"],
      "featured": true
    }
  ]
}
```

### Post metadata — `content-db/posts.json`

```json
{
  "posts": [
    {
      "id": "building-contributors-garden",
      "slug": "building-contributors-garden",
      "title": "Building Contributors Garden: Community-Driven Development",
      "description": "How we built a collaborative pixel art garden live on stream, and what I learned about community engagement.",
      "contentType": "deep-dive",
      "date": "2024-11-15",
      "affiliation": ["gitlab", "personal"],
      "topics": ["devrel", "community", "live-coding"],
      "featured": true,
      "file": "2024-11-15-building-contributors-garden.mdx"
    },
    {
      "id": "devrel-summit-notes",
      "slug": "devrel-summit-2024-notes",
      "title": "DevRel Summit 2024: Field Notes",
      "description": "Quick observations from three days of talks, hallway conversations, and emerging patterns in developer advocacy.",
      "contentType": "field-notes",
      "date": "2024-10-20",
      "affiliation": ["personal"],
      "topics": ["devrel", "conferences"],
      "featured": false,
      "file": "2024-10-20-devrel-summit-notes.mdx"
    },
    {
      "id": "ai-governance-layers",
      "slug": "ai-governance-layers",
      "title": "Mapping AI Governance: Three Layers",
      "description": "Progress update on research into how compute access, infrastructure, and policy create governance layers.",
      "contentType": "research-update",
      "date": "2025-01-10",
      "affiliation": ["newspeak"],
      "topics": ["ai-policy", "governance", "political-tech"],
      "featured": false,
      "file": "2025-01-10-ai-governance-layers.mdx"
    }
  ]
}
```

### Speaking — `content-db/speaking.json`

```json
{
  "talks": [
    {
      "id": "gitlab-commit-keynote-2024",
      "title": "Humans, AI, and the New Dev Workflow",
      "event": "GitLab Commit",
      "location": "San Francisco, CA",
      "date": "2024-06-12",
      "year": 2024,
      "type": "keynote",
      "description": "Keynote on human–AI collaboration in modern DevSecOps workflows and what it means for developer experience.",
      "topics": ["ai", "devrel", "developer-experience"],
      "links": {
        "slides": "https://example.com/slides",
        "video": "https://example.com/video"
      },
      "image": "/images/speaking/gitlab-commit-2024.jpg",
      "featured": true
    }
  ],
  "speakerInfo": {
    "bio": "Fatima Sarah Khalid is a Developer Advocate at GitLab and Research Fellow at Newspeak House. She focuses on AI and developer experience, open source communities, and the intersection of technology and governance.",
    "topics": [
      "AI and Developer Experience",
      "Developer Advocacy Best Practices",
      "Open Source Communities",
      "Political Technology and Governance"
    ],
    "rider": {
      "travel": "Will travel internationally. Prefer direct flights when possible.",
      "accommodation": "Hotel room for night before and night of event.",
      "av": "HDMI connection, lapel mic preferred, confidence monitor helpful.",
      "accessibility": "Please provide accessibility info for venue in advance.",
      "other": "Happy to do meet-and-greets or workshops. Need 24hr notice for slides review."
    }
  }
}
```

### Press — `content-db/press.json`

```json
{
  "awards": [
    {
      "id": "award-devrel-excellence-2024",
      "title": "DevRel Excellence Award",
      "organization": "DevRel Con",
      "year": 2024,
      "date": "2024-09-15",
      "citation": "For outstanding contribution to developer community building and innovative approaches to technical advocacy.",
      "ceremonyPhoto": "/images/awards/devrel-excellence-2024.jpg",
      "context": "Awarded at DevRel Con for community programs and Developer Show series."
    }
  ],
  "press": [
    {
      "id": "press-techcrunch-ai-governance",
      "publication": "TechCrunch",
      "title": "How Developer Advocates Are Shaping AI Policy",
      "date": "2024-08-20",
      "year": 2024,
      "screenshot": "/images/press/techcrunch-ai-governance.png",
      "pullQuote": "Khalid argues that developers are on the front lines of AI governance, whether they realize it or not.",
      "url": "https://techcrunch.com/example"
    }
  ]
}
```

### Wall of Love — `content-db/love.json`

```json
{
  "love": [
    {
      "id": "love-twitter-001",
      "screenshot": "/images/social/twitter-001.png",
      "platform": "twitter",
      "author": "Jane Developer",
      "date": "2024-09-20",
      "context": "GitLab Commit keynote"
    },
    {
      "id": "love-linkedin-002",
      "screenshot": "/images/social/linkedin-002.png",
      "platform": "linkedin",
      "date": "2024-10-15",
      "context": "Contributors Garden project"
    }
  ]
}
```

---

## Content Loader (`src/lib/content-db.ts`)

```ts
import fs from 'node:fs';
import path from 'node:path';
import type { Project, Post, Talk, Award, PressItem, LoveItem, Affiliation, PostContentType } from './types';

const ROOT = path.resolve(process.cwd(), 'content-db');

function readJSON<T>(file: string): T {
  const content = fs.readFileSync(path.join(ROOT, file), 'utf-8');
  return JSON.parse(content);
}

// Projects
export function getAllProjects(): Project[] {
  return readJSON<{ projects: Project[] }>('projects.json').projects
    .sort((a, b) => b.year - a.year);
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter(p => p.featured);
}

// Posts
export function getAllPosts(): Post[] {
  return readJSON<{ posts: Post[] }>('posts.json').posts
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostsByContentType(contentType: PostContentType): Post[] {
  return getAllPosts().filter(p => p.contentType === contentType);
}

export function getPostsByAffiliation(affiliation: Affiliation): Post[] {
  return getAllPosts().filter(p => p.affiliation.includes(affiliation));
}

export function getFeaturedPosts(): Post[] {
  return getAllPosts().filter(p => p.featured);
}

// Speaking
export function getAllTalks(): Talk[] {
  return readJSON<{ talks: Talk[] }>('speaking.json').talks
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getKeynotes(): Talk[] {
  return getAllTalks().filter(t => t.type === 'keynote');
}

export function getSpeakerInfo() {
  return readJSON<{ speakerInfo: any }>('speaking.json').speakerInfo;
}

// Press
export function getAllAwards(): Award[] {
  return readJSON<{ awards: Award[] }>('press.json').awards
    .sort((a, b) => b.year - a.year);
}

export function getAllPress(): PressItem[] {
  return readJSON<{ press: PressItem[] }>('press.json').press
    .sort((a, b) => b.date.localeCompare(a.date));
}

// Love
export function getAllLove(): LoveItem[] {
  return readJSON<{ love: LoveItem[] }>('love.json').love;
}

// Featured content (across all types)
export function getFeaturedContent(): Array<Project | Post | Talk> {
  return [
    ...getFeaturedProjects(),
    ...getFeaturedPosts(),
    ...getAllTalks().filter(t => t.featured)
  ].sort((a, b) => {
    const dateA = 'date' in a ? a.date : String(a.year);
    const dateB = 'date' in b ? b.date : String(b.year);
    return dateB.localeCompare(dateA);
  });
}
```

---

## Astro Setup

### `package.json` (core bits)

```json
{
  "name": "sugaroverflow-portfolio",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "lint": "eslint ."
  },
  "dependencies": {
    "astro": "^5.0.0",
    "@astrojs/tailwind": "^5.0.0",
    "@astrojs/mdx": "^3.0.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "typescript": "^5.0.0"
  }
}
```

### `astro.config.mjs`

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [
    tailwind({
      config: { applyBaseStyles: true },
    }),
    mdx(),
  ],
  site: 'https://sugaroverflow.com',
});
```

---

## Layout & Components

### Base Layout (`src/components/Layout.astro`)

Wraps every page with navigation, handles typography and max-width container.

```astro
---
const { title = 'sugaroverflow', description } = Astro.props;
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    {description && <meta name="description" content={description} />}
  </head>
  <body class="bg-sage-100 text-neutral-900 font-sans">
    <div class="flex min-h-screen">
      <Header />
      <main class="flex-1 ml-64">
        <div class="max-w-4xl mx-auto px-4 py-10">
          <slot />
        </div>
      </main>
    </div>
    <Footer />
  </body>
</html>
```

### Header with Side Navigation (`src/components/Header.astro`)

```astro
<nav class="fixed left-0 top-0 h-screen w-64 bg-neutral-50 border-r border-neutral-300 p-8">
  <a href="/" class="text-2xl font-serif text-sage-900">sugaroverflow</a>

  <ul class="mt-12 space-y-4">
    <li><a href="/" class="text-neutral-900 hover:text-lilac-700 transition-colors">Home</a></li>
    <li><a href="/work" class="text-neutral-900 hover:text-lilac-700 transition-colors">Work</a></li>
    <li><a href="/research" class="text-neutral-900 hover:text-lilac-700 transition-colors">Research</a></li>
    <li><a href="/speaking" class="text-neutral-900 hover:text-lilac-700 transition-colors">Speaking</a></li>
    <li><a href="/press" class="text-neutral-900 hover:text-lilac-700 transition-colors">Press</a></li>
    <li><a href="/about" class="text-neutral-900 hover:text-lilac-700 transition-colors">About</a></li>
  </ul>

  <div class="absolute bottom-8 left-8">
    <p class="text-sm text-neutral-900/60">Fatima Sarah Khalid</p>
    <div class="mt-2 flex gap-3">
      <!-- Social links -->
    </div>
  </div>
</nav>

<!-- Mobile navigation - TBD: bottom nav or hamburger -->
<div class="md:hidden">
  <!-- Mobile nav implementation -->
</div>
```

### Content Type Label Component (`src/components/ContentTypeLabel.astro`)

```astro
---
import type { PostContentType } from '@/lib/types';

interface Props {
  type: PostContentType;
}

const { type } = Astro.props;

const styles = {
  'field-notes': 'bg-lilac-100 text-lilac-700 border-lilac-300',
  'tutorial': 'bg-mist-100 text-mist-700 border-mist-300',
  'deep-dive': 'bg-sage-100 text-sage-700 border-sage-300',
  'research-update': 'bg-sage-300 text-sage-900 border-sage-500',
};
---

<span class={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${styles[type]}`}>
  {type.replace('-', ' ')}
</span>
```

### Project Card Component (`src/components/ProjectCard.astro`)

```astro
---
import type { Project } from '@/lib/types';

interface Props {
  project: Project;
}

const { project } = Astro.props;
---

<article class="bg-neutral-50 rounded-2xl p-6 border border-neutral-300 hover:border-lilac-300 transition-colors">
  {project.image && (
    <img src={project.image} alt={project.title} class="w-full h-48 object-cover rounded-lg mb-4" />
  )}

  <h3 class="text-xl font-serif text-sage-900">{project.title}</h3>
  <p class="mt-2 text-neutral-900/80">{project.description}</p>

  <div class="mt-4 flex flex-wrap gap-2">
    {project.tech.map(tech => (
      <span class="px-2 py-1 bg-mist-100 text-mist-700 text-xs rounded">{tech}</span>
    ))}
  </div>

  <div class="mt-4 flex flex-wrap gap-3">
    {project.links.demo && (
      <a href={project.links.demo} class="text-sm text-lilac-700 hover:text-lilac-900">
        Live Demo →
      </a>
    )}
    {project.links.repo && (
      <a href={project.links.repo} class="text-sm text-lilac-700 hover:text-lilac-900">
        GitHub →
      </a>
    )}
    {project.deepDiveSlug && (
      <a href={`/blog/${project.deepDiveSlug}`} class="text-sm text-sage-700 hover:text-sage-900">
        Read more about this project →
      </a>
    )}
  </div>
</article>
```

---

## Pages: Structure & Implementation

### Home (`src/pages/index.astro`)

**Sections:**

1. **Hero**
   * Portrait + intro
   * Tagline + description
   * 3 primary CTAs (Work, Research, Blog)

2. **Currently exploring**
   * 3 items from featured content
   * Small cards with title + 1-line description

3. **Featured work**
   * Projects and talks marked as featured

4. **Latest writing**
   * 3 most recent blog posts

5. **Speaking CTA**
   * "Looking to book me?" section with link to `/speaking`

```astro
---
import Layout from '@/components/Layout.astro';
import { getFeaturedContent, getAllPosts } from '@/lib/content-db';

const featured = getFeaturedContent().slice(0, 3);
const latestPosts = getAllPosts().slice(0, 3);
---

<Layout title="sugaroverflow — Fatima Sarah Khalid">
  <section class="grid gap-8 md:grid-cols-[2fr,1fr] items-center">
    <div>
      <p class="text-sm uppercase tracking-[0.2em] text-mist-700">Fatima Sarah Khalid · sugaroverflow</p>
      <h1 class="mt-4 text-4xl md:text-5xl font-serif text-sage-900 tracking-tight">
        Developer advocacy, AI, and political technology.
      </h1>
      <p class="mt-4 text-lg text-neutral-900/80">
        I build stories, systems, and communities where humans and AI collaborate—and explore how that shapes civic and political tech.
      </p>
      <div class="mt-6 flex flex-wrap gap-3">
        <a href="/work" class="px-4 py-2 rounded-full bg-lilac-500 text-white text-sm hover:bg-lilac-600 transition-colors">
          View my work
        </a>
        <a href="/research" class="px-4 py-2 rounded-full border border-mist-500 text-mist-700 text-sm hover:bg-mist-50 transition-colors">
          Research & fellowship
        </a>
        <a href="/blog" class="px-4 py-2 rounded-full border border-sage-300 text-sage-700 text-sm hover:bg-sage-50 transition-colors">
          Read my writing
        </a>
      </div>
    </div>
    <div class="justify-self-center">
      <img
        src="/images/headshots/main.jpg"
        alt="Portrait of Fatima"
        class="w-40 h-40 rounded-3xl object-cover border-4 border-lilac-300 shadow-md"
      />
    </div>
  </section>

  <section class="mt-20">
    <h2 class="text-2xl font-serif text-sage-900">Currently exploring</h2>
    <div class="mt-6 grid gap-4 md:grid-cols-3">
      {featured.map(item => (
        <div class="p-4 bg-neutral-50 rounded-lg border border-neutral-300">
          <h3 class="font-medium text-sage-900">{item.title}</h3>
          <p class="mt-2 text-sm text-neutral-900/70">{item.description}</p>
        </div>
      ))}
    </div>
  </section>

  <section class="mt-20">
    <h2 class="text-2xl font-serif text-sage-900">Latest writing</h2>
    <!-- Blog post cards -->
  </section>

  <section class="mt-20 p-6 bg-lilac-100 rounded-2xl">
    <h3 class="text-xl font-serif text-sage-900">Looking to book me for speaking?</h3>
    <p class="mt-2 text-neutral-900/80">
      I speak about AI & developer experience, DevRel best practices, and political technology.
    </p>
    <a href="/speaking" class="mt-4 inline-block text-lilac-700 font-medium hover:text-lilac-900">
      View topics & speaker info →
    </a>
  </section>
</Layout>
```

### Work (`src/pages/work.astro`)

**Structure:**

1. **Overview blurb** - What this page contains
2. **Featured** - 2-3 manually curated highlights
3. **Projects** - Grid of project cards
4. **Writing** - Polished blog posts (deep-dives and tutorials)

```astro
---
import Layout from '@/components/Layout.astro';
import ProjectCard from '@/components/ProjectCard.astro';
import { getAllProjects, getPostsByAffiliation, getFeaturedContent } from '@/lib/content-db';

const projects = getAllProjects();
const writing = getPostsByAffiliation('gitlab').filter(p =>
  p.contentType === 'deep-dive' || p.contentType === 'tutorial'
);
const featured = getFeaturedContent().slice(0, 3);
---

<Layout title="Work — sugaroverflow">
  <h1 class="text-4xl font-serif text-sage-900 tracking-tight">Work</h1>
  <p class="mt-4 text-lg text-neutral-900/80">
    Developer advocacy, technical content, and projects from my work at GitLab and beyond.
  </p>

  <section class="mt-12">
    <h2 class="text-2xl font-serif text-sage-900">Featured</h2>
    <!-- Featured content grid -->
  </section>

  <section class="mt-16">
    <h2 class="text-2xl font-serif text-sage-900">Projects</h2>
    <div class="mt-6 grid gap-6 md:grid-cols-2">
      {projects.map(project => (
        <ProjectCard project={project} />
      ))}
    </div>
  </section>

  <section class="mt-16">
    <h2 class="text-2xl font-serif text-sage-900">Writing</h2>
    <!-- Blog post list -->
  </section>
</Layout>
```

### Research (`src/pages/research.astro`)

Shows all content tagged with `affiliation: newspeak`, including both research updates and field notes.

**Structure:**

1. **Fellowship intro** - What, why, focus
2. **Research questions** - Key areas
3. **Updates & Notes** - All Newspeak-affiliated content
4. **Process note** - "Research is a process—you'll find everything from observations to analysis here"

```astro
---
import Layout from '@/components/Layout.astro';
import ContentTypeLabel from '@/components/ContentTypeLabel.astro';
import { getPostsByAffiliation } from '@/lib/content-db';

const researchPosts = getPostsByAffiliation('newspeak');
---

<Layout title="Research — sugaroverflow">
  <h1 class="text-4xl font-serif text-sage-900 tracking-tight">Research & Fellowship</h1>

  <div class="mt-6 prose prose-lg">
    <p>
      I'm a Research Fellow at Newspeak House, exploring the intersection of AI,
      compute governance, and political technology. My work examines how infrastructure
      decisions shape democratic participation and policy outcomes.
    </p>
  </div>

  <section class="mt-12">
    <h2 class="text-2xl font-serif text-sage-900">Key questions</h2>
    <ul class="mt-4 space-y-2 text-neutral-900/80">
      <li>• How does compute access create new governance layers?</li>
      <li>• What role do developers play in shaping AI policy?</li>
      <li>• How can we make infrastructure decisions more democratic?</li>
    </ul>
  </section>

  <section class="mt-16">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-serif text-sage-900">Updates & Field Notes</h2>
      <p class="text-sm text-neutral-900/60 italic">
        Research is a process—from observations to analysis
      </p>
    </div>

    <div class="mt-6 space-y-6">
      {researchPosts.map(post => (
        <article class="p-6 bg-neutral-50 rounded-lg border border-neutral-300">
          <div class="flex items-center gap-3">
            <ContentTypeLabel type={post.contentType} />
            <time class="text-sm text-neutral-900/60">{post.date}</time>
          </div>
          <h3 class="mt-3 text-xl font-serif text-sage-900">
            <a href={`/blog/${post.slug}`} class="hover:text-lilac-700">
              {post.title}
            </a>
          </h3>
          <p class="mt-2 text-neutral-900/80">{post.description}</p>
        </article>
      ))}
    </div>
  </section>
</Layout>
```

### Speaking (`src/pages/speaking.astro`)

**Structure:**

1. **Intro** - Speaking topics and approach
2. **Topics I cover** - From `speakerInfo.topics`
3. **Past talks** - Grid of talks, keynotes featured
4. **Speaker rider** - Requirements
5. **Wall of love preview** - Link to full page
6. **Contact/booking**

```astro
---
import Layout from '@/components/Layout.astro';
import { getAllTalks, getKeynotes, getSpeakerInfo } from '@/lib/content-db';

const talks = getAllTalks();
const keynotes = getKeynotes();
const speakerInfo = getSpeakerInfo();
---

<Layout title="Speaking — sugaroverflow">
  <h1 class="text-4xl font-serif text-sage-900 tracking-tight">Speaking</h1>
  <p class="mt-4 text-lg text-neutral-900/80">{speakerInfo.bio}</p>

  <section class="mt-12">
    <h2 class="text-2xl font-serif text-sage-900">Topics I cover</h2>
    <ul class="mt-4 grid gap-3 md:grid-cols-2">
      {speakerInfo.topics.map(topic => (
        <li class="p-4 bg-sage-100 rounded-lg text-sage-900">{topic}</li>
      ))}
    </ul>
  </section>

  <section class="mt-16">
    <h2 class="text-2xl font-serif text-sage-900">Keynotes</h2>
    <!-- Keynote cards with prominence -->
  </section>

  <section class="mt-16">
    <h2 class="text-2xl font-serif text-sage-900">Past talks</h2>
    <!-- All talks grid -->
  </section>

  <section class="mt-16">
    <h2 class="text-2xl font-serif text-sage-900">Speaker rider</h2>
    <div class="mt-6 space-y-4 p-6 bg-neutral-50 rounded-lg">
      <div>
        <h3 class="font-medium text-sage-900">Travel</h3>
        <p class="mt-1 text-neutral-900/80">{speakerInfo.rider.travel}</p>
      </div>
      <div>
        <h3 class="font-medium text-sage-900">Accommodation</h3>
        <p class="mt-1 text-neutral-900/80">{speakerInfo.rider.accommodation}</p>
      </div>
      <div>
        <h3 class="font-medium text-sage-900">A/V Requirements</h3>
        <p class="mt-1 text-neutral-900/80">{speakerInfo.rider.av}</p>
      </div>
    </div>
  </section>

  <section class="mt-16">
    <h2 class="text-2xl font-serif text-sage-900">What people say</h2>
    <p class="mt-2 text-neutral-900/70">Feedback from attendees and organizers</p>
    <a href="/love" class="mt-4 inline-block text-lilac-700 hover:text-lilac-900">
      View all testimonials →
    </a>
  </section>
</Layout>
```

### Press (`src/pages/press.astro`)

Fully expanded listings with generous spacing. Not cards, but more like a curated vertical feed.

**Structure:**

1. **Awards** - Full-width panels with photos and citations
2. **Keynotes** - Separate from regular talks, with context
3. **Featured In** - Press screenshots with pull quotes

```astro
---
import Layout from '@/components/Layout.astro';
import { getAllAwards, getKeynotes, getAllPress } from '@/lib/content-db';

const awards = getAllAwards();
const keynotes = getKeynotes();
const press = getAllPress();
---

<Layout title="Press — sugaroverflow">
  <h1 class="text-4xl font-serif text-sage-900 tracking-tight">Press & Recognition</h1>

  <section class="mt-12 space-y-12">
    <h2 class="text-2xl font-serif text-sage-900">Awards</h2>
    {awards.map(award => (
      <article class="grid md:grid-cols-[1fr,2fr] gap-8 items-start">
        {award.ceremonyPhoto && (
          <img
            src={award.ceremonyPhoto}
            alt={award.title}
            class="w-full rounded-lg shadow-md"
          />
        )}
        <div>
          <h3 class="text-xl font-serif text-sage-900">{award.title}</h3>
          <p class="mt-1 text-mist-700">{award.organization} · {award.year}</p>
          {award.citation && (
            <blockquote class="mt-4 pl-4 border-l-4 border-lilac-300 italic text-neutral-900/80">
              {award.citation}
            </blockquote>
          )}
          {award.context && (
            <p class="mt-4 text-neutral-900/80">{award.context}</p>
          )}
        </div>
      </article>
    ))}
  </section>

  <section class="mt-20 space-y-12">
    <h2 class="text-2xl font-serif text-sage-900">Keynotes</h2>
    {keynotes.map(talk => (
      <article class="grid md:grid-cols-[1fr,2fr] gap-8 items-start">
        {talk.image && (
          <img
            src={talk.image}
            alt={talk.title}
            class="w-full rounded-lg shadow-md"
          />
        )}
        <div>
          <h3 class="text-xl font-serif text-sage-900">{talk.title}</h3>
          <p class="mt-1 text-mist-700">{talk.event} · {talk.location} · {talk.year}</p>
          <p class="mt-4 text-neutral-900/80">{talk.description}</p>
          {talk.links.video && (
            <a href={talk.links.video} class="mt-4 inline-block text-lilac-700 hover:text-lilac-900">
              Watch recording →
            </a>
          )}
        </div>
      </article>
    ))}
  </section>

  <section class="mt-20 space-y-12">
    <h2 class="text-2xl font-serif text-sage-900">Featured In</h2>
    {press.map(item => (
      <article class="space-y-4">
        <div class="grid md:grid-cols-[1fr,2fr] gap-8">
          <img
            src={item.screenshot}
            alt={item.title}
            class="w-full rounded-lg shadow-md border border-neutral-300"
          />
          <div>
            <p class="text-sm text-mist-700">{item.publication} · {item.date}</p>
            <h3 class="mt-2 text-xl font-serif text-sage-900">{item.title}</h3>
            {item.pullQuote && (
              <blockquote class="mt-4 pl-4 border-l-4 border-lilac-300 italic text-neutral-900/80">
                {item.pullQuote}
              </blockquote>
            )}
            <button class="mt-4 px-4 py-2 bg-sage-100 text-sage-900 rounded-lg text-sm hover:bg-sage-200 transition-colors">
              View archived version
            </button>
          </div>
        </div>
      </article>
    ))}
  </section>
</Layout>
```

### Blog (`src/pages/blog.astro`)

Not in main navigation, but discoverable through Work/Research pages and direct URL.

**Structure:**
- Filter bar (content type, affiliation, topics)
- All posts with visual labels
- Color-coded by content type

```astro
---
import Layout from '@/components/Layout.astro';
import ContentTypeLabel from '@/components/ContentTypeLabel.astro';
import FiltersBar from '@/components/FiltersBar.astro';
import { getAllPosts } from '@/lib/content-db';

const posts = getAllPosts();
---

<Layout title="Writing — sugaroverflow">
  <h1 class="text-4xl font-serif text-sage-900 tracking-tight">All Writing</h1>
  <p class="mt-4 text-lg text-neutral-900/80">
    From field notes to deep dives—exploring DevRel, AI, and political technology.
  </p>

  <FiltersBar />

  <div class="mt-12 space-y-6">
    {posts.map(post => (
      <article class="p-6 bg-neutral-50 rounded-lg border border-neutral-300">
        <div class="flex items-center gap-3">
          <ContentTypeLabel type={post.contentType} />
          <time class="text-sm text-neutral-900/60">{post.date}</time>
        </div>
        <h2 class="mt-3 text-2xl font-serif text-sage-900">
          <a href={`/blog/${post.slug}`} class="hover:text-lilac-700">
            {post.title}
          </a>
        </h2>
        <p class="mt-2 text-neutral-900/80">{post.description}</p>
        <div class="mt-4 flex flex-wrap gap-2">
          {post.topics.map(topic => (
            <span class="px-2 py-1 bg-neutral-300 text-neutral-900 text-xs rounded">
              {topic}
            </span>
          ))}
        </div>
      </article>
    ))}
  </div>
</Layout>
```

### Love (`src/pages/love.astro`)

Not in main navigation. Simple feed of social media screenshots.

```astro
---
import Layout from '@/components/Layout.astro';
import { getAllLove } from '@/lib/content-db';

const love = getAllLove();
---

<Layout title="Kind Words — sugaroverflow">
  <h1 class="text-4xl font-serif text-sage-900 tracking-tight">Kind Words</h1>
  <p class="mt-4 text-lg text-neutral-900/80">
    Things people have said about my talks and work.
  </p>

  <div class="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    {love.map(item => (
      <img
        src={item.screenshot}
        alt={`Testimonial from ${item.author || 'attendee'}`}
        class="rounded-lg shadow-md border border-neutral-300"
      />
    ))}
  </div>
</Layout>
```

### About (`src/pages/about.astro`)

**Structure:**

1. Who I am
2. DevRel at GitLab (2-column: programs on left, impact on right)
3. Political tech fellowship (2-column: focus on left, approach on right)
4. Philosophy - How I think about AI, developers, governance
5. Personal - Travel, interests, etc.

---

## Blog System

### Content Collections

Use Astro's Content Collections for type-safe blog posts.

**`src/content/config.ts`:**

```ts
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string(),
    contentType: z.enum(['field-notes', 'tutorial', 'deep-dive', 'research-update']),
    affiliation: z.array(z.enum(['gitlab', 'newspeak', 'personal'])),
    topics: z.array(z.string()),
    heroImage: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { posts };
```

### Blog Post Layout (`src/layouts/BlogPostLayout.astro`)

```astro
---
import Layout from '@/components/Layout.astro';
import ContentTypeLabel from '@/components/ContentTypeLabel.astro';

const { frontmatter } = Astro.props;
---

<Layout title={`${frontmatter.title} — sugaroverflow`}>
  <article class="prose prose-lg max-w-none">
    <header class="mb-8">
      <div class="flex items-center gap-3 mb-4">
        <ContentTypeLabel type={frontmatter.contentType} />
        <time class="text-sm text-neutral-900/60">{frontmatter.pubDate}</time>
      </div>

      <h1 class="text-4xl font-serif text-sage-900 tracking-tight mb-4">
        {frontmatter.title}
      </h1>

      <p class="text-xl text-neutral-900/80">{frontmatter.description}</p>

      {frontmatter.heroImage && (
        <img
          src={frontmatter.heroImage}
          alt={frontmatter.title}
          class="w-full rounded-lg mt-6"
        />
      )}
    </header>

    <slot />
  </article>
</Layout>
```

### RSS Feed (`src/pages/rss.xml.ts`)

```ts
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts');
  return rss({
    title: 'sugaroverflow',
    description: 'Writing on DevRel, AI, and political technology',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
    })),
  });
}
```

---

## Visual Treatment Guidelines

### Content Type Styling

**Field Notes:**
- Color: `lilac` palette (pink)
- Card style: Slightly tilted in masonry layout
- Date stamp: Handwriting-style font
- Feel: Casual, journal-like

**Tutorial:**
- Color: `mist` palette (blue)
- Card style: Clean, structured
- Icons: Clear "how-to" indicators
- Feel: Educational, practical

**Deep Dive:**
- Color: `sage` palette (green)
- Card style: More formal, structured
- Additional info: Read time estimate
- Feel: Analytical, comprehensive

**Research Update:**
- Color: Deeper `sage` or `sage-mist` mix
- Card style: Academic-adjacent
- Additional info: Progress indicators
- Feel: Research process documentation

### Hover States & Micro-animations

```css
/* Example hover states */
.project-card {
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.project-card:hover {
  transform: translateY(-2px);
  border-color: theme('colors.lilac.300');
}

/* Smooth color transitions */
.nav-link {
  transition: color 0.2s ease;
}

/* Subtle scale on buttons */
.button {
  transition: transform 0.15s ease, background-color 0.2s ease;
}

.button:hover {
  transform: scale(1.02);
}
```

---

## Comments System

**Options:**

1. **Commento** (self-hosted or SaaS)
   * Privacy-respecting
   * Lightweight embed

2. **Hyvor Talk**
   * Paid service
   * Clean UI

3. **Custom solution**
   * Simple form + backend
   * Full control

**Defer to Phase 2** - Start with "Email me / DM me" CTA at end of posts.

---

## Future AI Hooks (Phase 2)

Design considerations for later AI integration:

* JSON structure supports embeddings generation
* Blog posts accessible via content collections
* Future endpoints:
  * `/api/search` - Semantic search
  * `/api/chat` - "Ask sugaroverflow" widget
  * AI summaries per content item

---

## Implementation Phases

### Phase 0 – Setup
- [ ] `npm create astro@latest`
- [ ] Add Tailwind integration
- [ ] Add MDX integration
- [ ] Configure brand colors in `tailwind.config.mjs`
- [ ] Add fonts (Playfair Display, Inter)

### Phase 1 – Navigation & Layout
- [ ] Implement side navigation (desktop)
- [ ] **DECIDE:** Mobile nav (bottom nav or hamburger)
- [ ] Create `Layout.astro`
- [ ] Create `Header.astro` with side nav
- [ ] Create `Footer.astro`
- [ ] Test responsive behavior

### Phase 2 – Content Structure
- [ ] Create `content-db` folders
- [ ] Create all JSON files with proper schema
- [ ] Add 3-5 sample entries per type (projects, posts, speaking, press, love)
- [ ] Implement all loader functions in `content-db.ts`
- [ ] Create 3-5 sample MDX blog posts
- [ ] Test data loading

### Phase 3 – Components
- [ ] `ProjectCard.astro` - Self-contained project cards
- [ ] `ContentTypeLabel.astro` - Color-coded labels
- [ ] `BlogPostCard.astro` - Blog post previews
- [ ] `TagChip.astro` - Topic tags
- [ ] `FiltersBar.astro` - Filtering UI
- [ ] Test component rendering

### Phase 4 – Core Pages
- [ ] Home page (hero, featured, latest, speaking CTA)
- [ ] Work page (featured, projects grid, writing)
- [ ] Research page (intro, questions, filtered posts)
- [ ] Speaking page (topics, talks, rider, love preview)
- [ ] Press page (awards, keynotes, featured in)
- [ ] About page

### Phase 5 – Blog System
- [ ] Set up Astro Content Collections
- [ ] Create `BlogPostLayout.astro`
- [ ] Blog listing page with filters
- [ ] **DECIDE:** Filter UI pattern (buttons/sidebar/tags)
- [ ] Individual blog post pages (`[slug].astro`)
- [ ] RSS feed generation
- [ ] Test all blog functionality

### Phase 6 – Additional Pages
- [ ] Love page (wall of testimonials)
- [ ] Wire up deep-dive links from project cards
- [ ] Test all internal linking

### Phase 7 – Visual Polish
- [ ] Apply color coding to all content types
- [ ] Implement hover states
- [ ] Add micro-animations
- [ ] Test tilted card effect for field notes
- [ ] Responsive design testing across devices
- [ ] Accessibility audit

### Phase 8 – Performance & Launch Prep
- [ ] Image optimization
- [ ] Performance testing
- [ ] SEO meta tags
- [ ] Social sharing cards
- [ ] Analytics setup (optional)
- [ ] Deploy to production

### Phase 9 – Future Enhancements (Post-launch)
- [ ] Comments system
- [ ] AI search/chat integration
- [ ] LinkedIn newsletter sync
- [ ] Admin interface for featured selection

---

## Open Questions & Decisions Needed

### 1. Mobile Navigation
**Options:**
- **A.** Bottom navigation bar with icons (persistent, always visible)
- **B.** Hamburger menu (cleaner, requires tap to open)

**Recommendation:** Test both, but bottom nav might work better for frequent page switching.

### 2. Blog Page Filters
**Options:**
- **A.** Button/pill filters at top (simple, clear)
- **B.** Sidebar with checkboxes (more options, desktop-focused)
- **C.** Dropdown menus (compact)
- **D.** Clickable tags on each post (organic discovery)

**Recommendation:** Start with button/pill filters + clickable tags (combination of A + D).

### 3. Featured Content Management
**Options:**
- **A.** Manual JSON editing (simple, full control)
- **B.** Build simple admin interface (more work, easier updates)

**Recommendation:** Start with manual JSON, add admin later if needed.

---

## Additional Notes

### Content Type Color Mapping
- **Field Notes:** `lilac` (pink) - casual, exploratory
- **Tutorial:** `mist` (blue) - practical, educational
- **Deep Dive:** `sage` (green) - analytical, comprehensive
- **Research Update:** `sage-700` or deeper green - research process

### Navigation Structure
**Primary Nav (always visible):**
- Home
- Work
- Research
- Speaking
- Press
- About

**Discoverable Pages (not in main nav):**
- Blog (accessible through Work/Research, direct URL)
- Love (linked from Speaking page, direct URL)

### Content Relationships
- Projects can link to deep-dive blog posts via `deepDiveSlug`
- Research page filters posts by `affiliation: newspeak`
- Work page filters posts by `affiliation: gitlab`
- Speaking page previews love testimonials
- All content types can be marked `featured: true` for homepage

---

## Success Criteria

A successful implementation will:

1. **Clearly communicate identity:** DevRel + Research dual focus is evident
2. **Easy navigation:** Users can find relevant work quickly
3. **Support learning in public:** Field notes feel appropriately casual, deep dives feel polished
4. **Showcase credibility:** Press page demonstrates impact and recognition
5. **Enable booking:** Speaking page has all info needed to book talks
6. **Feel cohesive:** Design system applied consistently across all pages
7. **Perform well:** Fast page loads, smooth interactions
8. **Scale easily:** Adding new content is straightforward (JSON + MDX)