import fs from 'node:fs';
import path from 'node:path';

export interface PostCard {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  cover: string;
}

export type Post = PostCard & { body: string };

const ROOT = path.join(process.cwd(), 'content/blog');

function parseFrontmatter(raw: string) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!match) throw new Error('blog: missing frontmatter');
  const data: Record<string, string> = {};

  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    const i = line.indexOf(':');
    if (i === -1) continue;
    data[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }

  return { data, body: match[2].trim() };
}

const check = parseFrontmatter(
  '---\ntitle: Hi\ndate: 2026-01-01\nexcerpt: X\ncover: /blog/sample.png\n---\n\nBody',
);

if (check.data.title !== 'Hi' || check.body !== 'Body') {
  throw new Error('blog: frontmatter parser broke');
}

function markdownFiles(dir: string) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => file.endsWith('.md'));
}

export function getPosts(locale: string): Post[] {
  const enDir = path.join(ROOT, 'en');
  const localeDir = path.join(ROOT, locale);
  const files = new Set([...markdownFiles(enDir), ...markdownFiles(localeDir)]);
  const posts = [...files].map((file) => {
    const slug = file.slice(0, -3);
    const localPath = path.join(localeDir, file);
    const filePath = fs.existsSync(localPath)
      ? localPath
      : path.join(enDir, file);
    const { data, body } = parseFrontmatter(fs.readFileSync(filePath, 'utf8'));
    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? '',
      excerpt: data.excerpt ?? '',
      cover: data.cover ?? '/blog/sample.png',
      body,
    };
  });
  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return posts;
}

export function getPost(locale: string, slug: string) {
  return getPosts(locale).find((post) => post.slug === slug) ?? null;
}
