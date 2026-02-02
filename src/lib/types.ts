export type ContentType =
  | 'field-notes'
  | 'tutorial'
  | 'deep-dive'
  | 'research-update'
  | 'talk'
  | 'project';

export type Affiliation = 'gitlab' | 'newspeak' | 'personal';

export interface IdeaLinks {
  demo?: string;
  repo?: string;
  slides?: string;
  video?: string;
  other?: string[];
}

export interface BaseIdea {
  id: string;
  slug: string;
  title: string;
  description: string;
  contentType: ContentType;
  date: string;
  affiliation: Affiliation[];
  topics: string[];
  featured?: boolean;
  image?: string;
  links?: IdeaLinks;
}

export interface Project extends BaseIdea {
  contentType: 'project';
  year: number;
  tech: string[];
  deepDiveSlug?: string;
  links?: IdeaLinks;
}

export interface Post extends BaseIdea {
  file: string;
}

export interface Talk extends BaseIdea {
  contentType: 'talk';
  event: string;
  location: string;
  year: number;
  type: 'keynote' | 'talk' | 'workshop' | 'panel';
}

export type Idea = Post | Project | Talk;

export interface Award {
  id: string;
  title: string;
  organization: string;
  year: number;
  date: string;
  citation?: string;
  ceremonyPhoto?: string;
  context?: string;
}

export interface PressItem {
  id: string;
  publication: string;
  title: string;
  date: string;
  year: number;
  screenshot: string;
  pullQuote?: string;
  url?: string;
}

export interface LoveItem {
  id: string;
  screenshot: string;
  platform: 'twitter' | 'linkedin' | 'other';
  author?: string;
  date?: string;
  context?: string;
}

export interface SpeakerInfo {
  bio: string;
  topics: string[];
  rider: {
    travel: string;
    accommodation: string;
    av: string;
    accessibility?: string;
    other?: string;
  };
}

