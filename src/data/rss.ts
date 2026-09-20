// =========================================================
// rss.ts · 站点信息 + 友链 RSS 朋友圈订阅源
// =========================================================
// 本文件包含:
//   - siteInfo: 站点信息 (关于页面展示)
//   - siteStats: 站点统计数字
//   - pageIndex: 页面索引 (导航/搜索)
//   - rssFriends: 友链 RSS 订阅源 (石径页面展示友邻最新文章)
//     → 数据已迁移至 src/data/rss.config.json，可在 /admin 后台编辑
// =========================================================

import rssConfig from './rss.config.json';

export interface SiteInfoRow {
  label: string;
  value: string;
}

export const siteInfo: SiteInfoRow[] = [
  { label: '站点名称', value: 'Sumyu' },
  { label: '站点描述', value: '轩窗听雨 · 岁月生香' },
  { label: '框架', value: 'Astro 7 + TypeScript + MDX' },
  { label: '主题', value: 'Sumyu ' },
  { label: '主色调', value: '樱花粉 #DF9193 (可切换 5 套)' },
  { label: '字体', value: 'LXGW WenKai Screen' },
  { label: '图标', value: 'Iconify + Font Awesome' },
  { label: '构建产物', value: '纯静态 · 可部署至 Cloudflare Pages / Vercel' },
];

export interface StatItem {
  num: string;
  label: string;
}

export const siteStats: StatItem[] = [
  { num: '8+', label: '文章' },
  { num: '16', label: '页面' },
  { num: '5', label: '主题色' },
  { num: '100%', label: '静态' },
];

export interface PageIndexItem {
  name: string;
  href: string;
  desc: string;
}

export const pageIndex: PageIndexItem[] = [
  { name: '轩窗', href: '/', desc: '首页' },
  { name: '博文', href: '/posts/', desc: '全部文章' },
  { name: '铺陈', href: '/projects/', desc: '个人项目' },
  { name: '踏青', href: '/diary/', desc: '日记' },
  { name: '留芳', href: '/files/', desc: '相册' },
  { name: '闲游', href: '/games/', desc: '游戏' },
  { name: '忆影', href: '/anime/', desc: '番剧' },
  { name: '清言', href: '/les/', desc: 'LES' },
  { name: '拾遗', href: '/shiyi/', desc: '留言板' },
  { name: '幽竹', href: '/links/', desc: '友链' },
  { name: '石径', href: '/friends/', desc: '本页' },
  { name: '陋室', href: '/about/', desc: '关于' },
  { name: '分类', href: '/categories/', desc: '' },
  { name: '标签', href: '/tags/', desc: '' },
  { name: '归档', href: '/archives/', desc: '' },
];

// 友链 RSS 朋友圈订阅源
// 数据来源: src/data/rss.config.json (可在 /admin 后台「RSS朋友圈」中编辑)
// 格式: { name: 站点名称, url: 站点URL, feed: RSS 订阅地址, avatar: 头像URL }
// 留空数组则显示「暂无订阅」
export interface RssFriendItem {
  name: string;
  url: string;
  feed: string;
  avatar: string;
}

export const rssFriends: RssFriendItem[] = rssConfig.rssFriends;
