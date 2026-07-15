export interface FriendArticle {
  name: string;
  url: string;
  avatar: string;
  title: string;
  articleUrl: string;
  date: string;
  excerpt: string;
}

interface FeedItem {
  title?: string;
  link?: string;
  pubDate?: string;
  description?: string;
  content?: string;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseRssXml(xml: string): FeedItem[] {
  const items: FeedItem[] = [];
  const itemRegex = /<item[\s\S]*?<\/item>/gi;
  const matches = xml.match(itemRegex);
  if (!matches) return items;

  for (const item of matches) {
    const titleMatch = item.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const linkMatch = item.match(/<link[^>]*>([\s\S]*?)<\/link>/i);
    const pubDateMatch = item.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i)
      || item.match(/<dc:date[^>]*>([\s\S]*?)<\/dc:date>/i);
    const descMatch = item.match(/<description[^>]*>([\s\S]*?)<\/description>/i);
    const contentMatch = item.match(/<content:encoded[^>]*>([\s\S]*?)<\/content:encoded>/i);

    items.push({
      title: titleMatch ? stripHtml(titleMatch[1]) : undefined,
      link: linkMatch ? linkMatch[1].trim() : undefined,
      pubDate: pubDateMatch ? pubDateMatch[1].trim() : undefined,
      description: descMatch ? stripHtml(descMatch[1]).substring(0, 200) : undefined,
      content: contentMatch ? stripHtml(contentMatch[1]).substring(0, 200) : undefined,
    });
  }

  return items;
}

function parseAtomXml(xml: string): FeedItem[] {
  const items: FeedItem[] = [];
  const entryRegex = /<entry[\s\S]*?<\/entry>/gi;
  const matches = xml.match(entryRegex);
  if (!matches) return items;

  for (const entry of matches) {
    const titleMatch = entry.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const linkMatch = entry.match(/<link[^>]*href="([^"]*)"[^>]*\/?>/i)
      || entry.match(/<link[^>]*>([\s\S]*?)<\/link>/i);
    const updatedMatch = entry.match(/<updated[^>]*>([\s\S]*?)<\/updated>/i)
      || entry.match(/<published[^>]*>([\s\S]*?)<\/published>/i);
    const summaryMatch = entry.match(/<summary[^>]*>([\s\S]*?)<\/summary>/i);
    const contentMatch = entry.match(/<content[^>]*>([\s\S]*?)<\/content>/i);

    items.push({
      title: titleMatch ? stripHtml(titleMatch[1]) : undefined,
      link: linkMatch ? (linkMatch[1] || linkMatch[0]).trim() : undefined,
      pubDate: updatedMatch ? updatedMatch[1].trim() : undefined,
      description: summaryMatch ? stripHtml(summaryMatch[1]).substring(0, 200) : undefined,
      content: contentMatch ? stripHtml(contentMatch[1]).substring(0, 200) : undefined,
    });
  }

  return items;
}

function parseFeed(xml: string): FeedItem[] {
  const lowerXml = xml.trimStart().substring(0, 200).toLowerCase();
  if (lowerXml.includes('<feed') && lowerXml.includes('xmlns')) {
    return parseAtomXml(xml);
  }
  return parseRssXml(xml);
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr.substring(0, 10);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  } catch {
    return dateStr.substring(0, 10);
  }
}

async function fetchFriendArticles(
  rssUrl: string,
  name: string,
  url: string,
  avatar: string,
  maxArticles: number = 3,
  timeout: number = 8000,
): Promise<FriendArticle[]> {
  try {
    const response = await fetch(rssUrl, {
      signal: AbortSignal.timeout(timeout),
      headers: {
        'User-Agent': 'Sumyu-Blog-RSS-Bot/1.0',
        'Accept': 'application/xml, application/rss+xml, application/atom+xml, text/xml, */*',
      },
    });

    if (!response.ok) {
      console.warn(`[RSS] 获取 ${name} RSS 失败: HTTP ${response.status}`);
      return [];
    }

    const xml = await response.text();
    const feedItems = parseFeed(xml);

    return feedItems
      .filter(item => item.title && item.link)
      .slice(0, maxArticles)
      .map(item => ({
        name,
        url,
        avatar,
        title: item.title || '',
        articleUrl: item.link || '',
        date: formatDate(item.pubDate),
        excerpt: item.description || item.content || '',
      }));
  } catch (err: any) {
    console.warn(`[RSS] 获取 ${name} RSS 异常: ${err.message}`);
    return [];
  }
}

export async function fetchAllFriendArticles(
  friends: { name: string; url: string; avatar: string; feed: string }[],
  maxPerFriend: number = 3,
): Promise<FriendArticle[]> {
  const fetchPromises = friends
    .filter(f => f.feed && f.feed.trim())
    .map(f => fetchFriendArticles(f.feed, f.name, f.url, f.avatar, maxPerFriend));

  const results = await Promise.allSettled(fetchPromises);

  const allArticles: FriendArticle[] = [];
  for (const result of results) {
    if (result.status === 'fulfilled') {
      allArticles.push(...result.value);
    }
  }

  allArticles.sort((a, b) => b.date.localeCompare(a.date));

  return allArticles;
}
