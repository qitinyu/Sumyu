import { getCollection, render } from 'astro:content';

export async function getPublishedPosts() {
  const posts = await getCollection('posts', ({ data }) => {
    return import.meta.env.PROD ? data.draft === false : true;
  });
  return posts.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}

export async function getPublishedDiary() {
  const items = await getCollection('diary', ({ data }) => {
    return import.meta.env.PROD ? data.draft === false : true;
  });
  return items.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}

export async function getPostSlugs() {
  const posts = await getPublishedPosts();
  return posts.map((p) => p.id);
}

export async function getPostNeighbors(slug: string) {
  const posts = await getPublishedPosts();
  const idx = posts.findIndex((p) => p.id === slug);
  return {
    prev: idx > 0 ? posts[idx - 1] : null,
    next: idx < posts.length - 1 ? posts[idx + 1] : null,
  };
}

export async function getCategories() {
  const posts = await getPublishedPosts();
  const map = new Map<string, number>();
  for (const p of posts) {
    map.set(p.data.category, (map.get(p.data.category) ?? 0) + 1);
  }
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export async function getTags() {
  const posts = await getPublishedPosts();
  const map = new Map<string, number>();
  for (const p of posts) {
    for (const t of p.data.tags) {
      map.set(t, (map.get(t) ?? 0) + 1);
    }
  }
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export async function getArchiveGroups() {
  const posts = await getPublishedPosts();
  const map = new Map<string, typeof posts>();
  for (const p of posts) {
    const key = p.data.pubDate.getFullYear().toString();
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(p);
  }
  return [...map.entries()]
    .map(([year, items]) => ({ year, items }))
    .sort((a, b) => Number(b.year) - Number(a.year));
}

export function formatDate(date: Date, withTime = false) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  if (!withTime) return `${y}-${m}-${d}`;
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  return `${y}-${m}-${d} ${hh}:${mm}`;
}

export function readingTime(minutes: number) {
  if (minutes < 1) return '不到 1 分钟';
  return `${Math.ceil(minutes)} 分钟`;
}
