import { getPublishedPosts, formatDate } from '@/utils/posts';
import { galleryAlbums } from '@/data/files';
import { animeList } from '@/data/anime';
import { lesList } from '@/data/les';

export async function GET() {
  const posts = await getPublishedPosts();
  
  // 文章
  const postsData = posts.map(p => ({
    type: '文章',
    title: p.data.title,
    description: p.data.description,
    url: `/posts/${p.id}/`,
    date: formatDate(p.data.pubDate),
    category: p.data.category,
    tags: p.data.tags,
  }));

  // 相册
  const galleryData = galleryAlbums.map(g => ({
    type: '相册',
    title: g.name,
    description: `共 ${g.images.length} 张照片`,
    url: '/gallery/',
    date: '',
    category: '相册',
    tags: ['相册', g.name],
  }));

  // 番剧
  const animeData = animeList.map(a => ({
    type: '番剧',
    title: a.title,
    description: a.description,
    url: a.link,
    date: a.year,
    category: '番剧',
    tags: a.genre,
  }));

  // 清言 (LES)
  const lesData = lesList.map(l => ({
    type: '清言',
    title: l.title,
    description: `${l.type} · ${l.cv}`,
    url: l.url,
    date: '',
    category: '清言',
    tags: ['LES', l.title],
  }));

  const data = [...postsData, ...galleryData, ...animeData, ...lesData];
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}