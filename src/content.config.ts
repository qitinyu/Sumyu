import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 通用文章 schema —— 文章、日记共用
const postSchema = z.object({
  title: z.string(),
  description: z.string().default(''),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  // 文章配图: 留空字符串则不展示; URL 或本地 /src/content/posts/blog-img/xxx 或 /blog-img/xxx
  image: z.string().default(''),
  // 文章是否在卡片左侧展示图片 (image 非空时生效)
  showImage: z.boolean().default(true),
  category: z.string().default('随笔'),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  pinned: z.boolean().default(false),
  // 文档要求的新字段
  published: z.coerce.date().optional(),      // 兼容文档示例中的 published
  licenseName: z.string().default('CC BY 4.0'),
  author: z.string().default('Sumyu'),
  encrypted: z.boolean().default(false),
  password: z.string().default(''),
  // 留言区页面标识: 传给 yuamli iframe 的 pageId 参数, 用于每篇文章独立留言区
  // 留空时回退到文章 slug (仍可独立, 但建议显式填写便于管理)
  // 格式建议: YYMMDD (如 260715 = 2026-07-15), 同日多篇加后缀 (如 260715-2)
  comment_id: z.string().default(''),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: postSchema,
});

// 日记集合 (踏青)
const diary = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/diary' }),
  schema: postSchema,
});

export const collections = { posts, diary };
