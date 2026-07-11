// =========================================================
// 铺陈 · 个人项目展示数据
// =========================================================

export interface ProjectItem {
  name: string;
  tag: string;
  desc: string;
  url: string;
  cover: string;
  // GitHub 仓库链接 (可选, 留空则不显示 GitHub 图标)
  github: string;
}

export const projects: ProjectItem[] = [
  {
    name: 'Sumyu Blog',
    tag: 'Astro',
    desc: '基于 Astro 仿制的樱花主题博客，支持加密文章、5 套主题色、Live2D 看板娘。',
    cover: '/hero/sumyu.webp',
    url: 'https://yqamm.top/',
    github: 'https://github.com/qitinyu/Sumyu',
  },

  { name: '雨祁小窝',
    tag: 'Astro',
    desc: '基于Astro-Yuami的现代化个人博客',
    cover: '/hero/yuami.webp',
    url: 'https://8872388.xyz/',
    github: 'https://github.com/qitinyu/Yuami/' 
  },

  { name: '雨祁云盘',
    tag: 'Astro',
    desc: '基于openlist搭载cloudflared tunnle实现的网盘合集',
    cover: '/hero/openlist.webp',
    url: 'https://open.yqamma.eu.cc/',
    github: '#' 
  },

  { name: '胡桃-手风琴',
    tag: 'HTML+CSS+JS',
    desc: 'HTML+CSS+JS 制作的简易网页',
    cover: '/hero/htsfq.webp',
    url: 'https://qitinyu.github.io/hutao-sfq/',
    github: 'https://github.com/qitinyu/hutao-sfq' },

  { name: '雨祁导航',
    tag: 'HTML+CSS+JS',
    desc: 'HTML+CSS+JS 制作的网页导航',
    cover: '/hero/yqnav.webp',
    url: 'https://qitinyu.github.io/YQ-nav/',
    github: 'https://github.com/qitinyu/YQ-nav' },

  { name: '雨祁-网页练习',
    tag: 'HTML+CSS+JS',
    desc: 'HTML+CSS+JS 制作的较完整网页练习',
    cover: '/hero/yqlx.webp',
    url: 'https://yq-wz.pages.dev/',
    github: 'https://github.com/qitinyu/yq-wz' },

  { name: '雨祁-自学练习',
    tag: 'HTML+CSS+JS',
    desc: 'HTML+CSS+JS 制作的自学练习',
    cover: '/hero/yqlx2.webp',
    url: 'https://qitinyu.github.io/hutao-J/',
    github: 'https://github.com/qitinyu/hutao-J' },
];
