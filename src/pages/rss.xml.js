import rss from '@astrojs/rss';
import { getPublishedPosts } from '@/utils/posts';
import { SITE_TITLE, SITE_DESCRIPTION } from '@/config';

export async function GET(context) {
  const posts = await getPublishedPosts();
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map(p => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: `/posts/${p.id}/`,
      categories: [p.data.category, ...p.data.tags],
      author: p.data.author,
    })),
    customData: `<language>zh-CN</language>`,
  });
}
