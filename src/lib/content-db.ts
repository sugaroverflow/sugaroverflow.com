import fs from 'node:fs';
import path from 'node:path';
import type {
  Project,
  Post,
  Talk,
  Award,
  PressItem,
  LoveItem,
  Affiliation,
  Idea,
  ContentType,
  SpeakerInfo,
} from './types';

const ROOT = path.resolve(process.cwd(), 'content-db');

function readJSON<T>(file: string): T {
  const content = fs.readFileSync(path.join(ROOT, file), 'utf-8');
  return JSON.parse(content) as T;
}

const sortByDateDesc = <T extends { date: string }>(a: T, b: T) => b.date.localeCompare(a.date);

export function getAllProjects(): Project[] {
  return readJSON<{ projects: Project[] }>('projects.json').projects.slice().sort(sortByDateDesc);
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((project) => project.featured);
}

export function getAllPosts(): Post[] {
  return readJSON<{ posts: Post[] }>('posts.json').posts.slice().sort(sortByDateDesc);
}

export function getPostsByContentType(contentType: ContentType): Post[] {
  return getAllPosts().filter((post) => post.contentType === contentType);
}

export function getPostsByAffiliation(affiliation: Affiliation): Post[] {
  return getAllPosts().filter((post) => post.affiliation.includes(affiliation));
}

export function getFeaturedPosts(): Post[] {
  return getAllPosts().filter((post) => post.featured);
}

export function getAllTalks(): Talk[] {
  return readJSON<{ talks: Talk[] }>('speaking.json').talks.slice().sort(sortByDateDesc);
}

export function getKeynotes(): Talk[] {
  return getAllTalks().filter((talk) => talk.type === 'keynote');
}

export function getSpeakerInfo(): SpeakerInfo {
  return readJSON<{ speakerInfo: SpeakerInfo }>('speaking.json').speakerInfo;
}

export function getAllAwards(): Award[] {
  return readJSON<{ awards: Award[] }>('press.json').awards
    .slice()
    .sort((a, b) => b.year - a.year);
}

export function getAllPress(): PressItem[] {
  return readJSON<{ press: PressItem[] }>('press.json').press
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getAllLove(): LoveItem[] {
  return readJSON<{ love: LoveItem[] }>('love.json').love;
}

export function getAllIdeas(): Idea[] {
  return [...getAllPosts(), ...getAllProjects(), ...getAllTalks()].sort(sortByDateDesc);
}

export function getIdeasByType(type: ContentType): Idea[] {
  return getAllIdeas().filter((idea) => idea.contentType === type);
}

export function getIdeasByAffiliation(affiliation: Affiliation): Idea[] {
  return getAllIdeas().filter((idea) => idea.affiliation?.includes(affiliation));
}

export function getIdeasByTopic(topic: string): Idea[] {
  return getAllIdeas().filter((idea) => idea.topics?.includes(topic));
}

export function getAllTopics(): string[] {
  const topics = new Set<string>();
  getAllIdeas().forEach((idea) => {
    idea.topics?.forEach((topic) => topics.add(topic));
  });
  return Array.from(topics).sort();
}

export function getFeaturedContent(): Idea[] {
  return getAllIdeas().filter((idea) => idea.featured);
}

