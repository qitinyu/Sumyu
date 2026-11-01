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
    cover: 'https://img.yqamm.top/Website/sumyu.webp',
    url: 'https://yqamm.top/',
    github: 'https://github.com/qitinyu/Sumyu',
  },

  { name: '雨祁导航',
    tag: '导航',
    desc: '个人导航页',
    cover: 'https://img.yqamm.top/Website/zy.webp',
    url: 'https://yuqi.yqamm.top/',
    github: 'https://github.com/qitinyu/yuqi' 
  },

  { name: 'Yuamli',
    tag: '留言系统',
    desc: '基于NEXTJS 16的轻量级留言系统 ，支持第三方 OAuth 登录、邮箱游客登录、嵌套回复、Markdown 渲染、后台管理与数据备份',
    cover: 'https://img.yqamm.top/Website/yuamli.webp',
    url: 'https://yuamli.yqamm.top/',
    github: 'https://github.com/qitinyu/Yuami/' 
  },

  { name: 'YQIMG',
    tag: '图床',
    desc: '基于Cloundflared R2的轻量化个人图床，支持自定义域名、图片压缩、图片格式转换',
    cover: 'https://img.yqamm.top/Website/img.webp',
    url: 'https://yqimg.yqamm.top/',
    github: '#' 
  },

  { name: 'MuWan-沐挽',
    tag: 'Music',
    desc: '基于Arkts+ArkUI的鸿蒙原生轻量化音乐播放器，支持JSON+JS音源导入，全平台免费畅听',
    cover: 'https://img.yqamm.top/Website/muwan1.webp',
    url: '#',
    github: 'https://github.com/qitinyu/MuWan' },

  { name: 'MuYan-沐言',
    tag: 'TXT+MARKDOWN',
    desc: '鸿蒙原生应用，每日一言+想法日记+MARKDOWN轻量编辑+待办标记',
    cover: 'https://img.yqamm.top/Website/muyan1.webp',
    url: '#',
    github: 'https://github.com/qitinyu/yq-wz' },

  { name: 'MuLi-沐哩',
    tag: 'Mulimuli',
    desc: '参考Piliplus+bilibili的鸿蒙原生第三方B站播放器',
    cover: 'https://img.yqamm.top/Website/muli1.webp',
    url: '#',
    github: 'https://github.com/qitinyu/MuLi' },
    
  { name: '胡桃-手风琴',
    tag: 'HTML+CSS+JS',
    desc: 'HTML+CSS+JS 制作的简易网页',
    cover: '/hero/htsfq.webp',
    url: 'https://qitinyu.github.io/hutao-sfq/',
    github: 'https://github.com/qitinyu/hutao-sfq' },
];
