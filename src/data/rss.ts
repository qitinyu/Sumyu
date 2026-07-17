// =========================================================
// rss.ts · 站点信息 + 友链 RSS 朋友圈订阅源
// =========================================================
// 本文件包含:
//   - siteInfo: 站点信息 (关于页面展示)
//   - siteStats: 站点统计数字
//   - pageIndex: 页面索引 (导航/搜索)
//   - rssFriends: 友链 RSS 订阅源 (石径页面展示友邻最新文章)
// =========================================================

export interface SiteInfoRow {
  label: string;
  value: string;
}

export const siteInfo: SiteInfoRow[] = [
  { label: '站点名称', value: 'Sumyu' },
  { label: '站点描述', value: '轩窗听雨 · 岁月生香' },
  { label: '框架', value: 'Astro 7 + TypeScript + MDX' },
  { label: '主题', value: 'Sumyu (基于 Sakura 仿制)' },
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
// 格式: { name: 站点名称, url: 站点URL, feed: RSS 订阅地址, avatar: 头像URL }
// 留空数组则显示「暂无订阅」
export interface RssFriendItem {
  name: string;
  url: string;
  feed: string;
  avatar: string;
}

export const rssFriends: RssFriendItem[] = [
  // 在此添加友链 RSS 订阅源, 例如:
  // { name: 'Sumyu', 
  // url: 'https://8872388.xyz', 
  // feed: 'https://8872388.xyz/rss.xml',
  // avatar: '/hero/avatar.svg' },
  {
  name: 'YUQI 小窝',
  url: 'https://yqamm.cc.cd',
  feed: 'https://yqamm.cc.cd/rss.xml',
  avatar: 'https://yqamm.cc.cd/_astro/avatar.DsloLJ2B_Z2ceESW.webp'
},
{
  name: '雨祁的link',
  url: 'https://link3.cc/qtya',
  feed: '',
  avatar: 'https://tencentcdna.production.link3.cc/profile_images/1716876687233'
},
{
  name: '阿豪博客小站',
  url: 'https://chivehao.ikaros.run/',
  feed: 'https://chivehao.ikaros.run/rss.xml',
  avatar: 'https://chivehao.ikaros.run/assets/images/avatar.webp'
},
{
  name: "Wan's Blog",
  url: 'https://blog.wanfory.top',
  feed: 'https://blog.wanfory.top/rss.xml',
  avatar: 'https://blog.wanfory.top/assets/images/avatar.jpg'
},
{
  name: '拾三月',
  url: 'https://www.nw177.cn',
  feed: '',
  avatar: 'https://img.nw177.cn/blog/100.assets/avatar.webp'
},
{
  name: 'yuyu的博客',
  url: 'https://yuyu09.com/',
  feed: '',
  avatar: 'https://i.postimg.cc/0Q9Z55Qy/yuyu-webp.jpg'
},
{
  name: 'AFOP',
  url: 'https://scarefree.cn/p9/',
  feed: 'https://scarefree.cn/feed/',
  avatar: 'https://scarefree.cn/img/afop.png'
},
{
  name: "XhaniのBlog",
  url: 'https://blog.zako.wf/',
  feed: 'https://blog.zako.wf/rss.xml',
  avatar: 'https://blog.zako.wf/assets/home/home.png'
},
{
  name: "THW's Blog",
  url: 'https://blog.tianhw.top/',
  feed: 'https://blog.tianhw.top/rss.xml',
  avatar: 'https://image.tianhw.top/avatar.webp'
},
{
  name: "1zyq1's Blog",
  url: 'https://www.1zyq1.com/',
  feed: 'https://www.1zyq1.com/rss.xml',
  avatar: 'https://q1.qlogo.cn/g?b=qq&nk=2289308183&s=640'
},
{
  name: '绘夢の小站',
  url: 'https://blog.emumu.xyz/',
  feed: 'https://blog.emumu.xyz/rss.xml',
  avatar: 'https://i.postimg.cc/XYhmW0f4/huimen.webp'
},
{
  name: '北に向かう',
  url: 'https://ignorant.top/',
  feed: 'https://ignorant.top/rss.xml',
  avatar: 'https://i.ibb.co/SwVb53mQ/avatar.webp'
},
{
  name: '灵梦的小站',
  url: 'https://lm520.cc/',
  feed: 'https://lm520.cc/rss.xml',
  avatar: 'https://lm520.cc/_astro/celia-BuSvhKlq_2tu3jR.webp'
},
{
  name: '杪夏山不语',
  url: 'https://blog.mxsby.top/',
  feed: 'https://blog.mxsby.top/rss.xml',
  avatar: 'https://blog.mxsby.top/_astro/Echo.J3vEEqiv_Z20z8hn.webp'
},

{
  name: '柊镜',
  url: 'https://www.kagamistarlight.top/',
  feed: 'https://www.kagamistarlight.top/rss.xml',
  avatar: 'https://www.kagamistarlight.top/_astro/avatar.Blu5ijdD_2wcflA.webp'
},
{
  name: 'mikus',
  url: 'https://mikus.ink/',
  feed: 'https://mikus.ink/rss.xml',
  avatar: 'https://i.postimg.cc/8z5gDHx9/mikus.webp'
},
{
  name: '南wind',
  url: 'https://blog.emumu.xyz/',
  feed: '',
  avatar: 'https://pic1.imgdb.cn/item/69c905abb1655e1da0faef76.jpg'
},
{
  name: "UpXuu's Blog",
  url: 'https://upxuu.com/',
  feed: '',
  avatar: 'https://upxuu.com/images/20260214145619.jpg'
},
{
  name: '𝔖𝔥𝔞𝔴𝔜𝔬𝔲𝔫𝔤',
  url: 'https://yoviz.dpdns.org/',
  feed: '',
  avatar: 'https://yoviz.dpdns.org/_astro/avatar.JHDUpy2g_1YHEgb.webp'
}

];
