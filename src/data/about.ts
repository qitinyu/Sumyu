// =========================================================
// 陋室 · 关于页面数据
// =========================================================

export const aboutData = {
  name: 'Sumyu',
  subtitle: '轩窗听雨 · 岁月生香',
  avatar: '/assets/avatar.webp',
  desc: '星海幽暗，孤寂无垠。\n直到有人点燃了自我,宇宙才拥有最初的光.',
  motto: '斯是陋室，惟吾德馨',

  hobbies: [
    { label: '代码', icon: 'mdi:code-tags' },
    { label: '拍照', icon: 'mdi:server' },
    { label: '游戏', icon: 'mdi:book-open-variant' },
    { label: '运动', icon: 'mdi:palette' },
    { label: '音乐', icon: 'mdi:music' },
  ],

  techStack: [
    'Astro 7', 'TypeScript', 'Markdown / MDX',
    'Content Collections', 'Shiki 代码高亮',
    'Iconify Icons', 'LXGW WenKai 字体',
  ],

  siteFeatures: [
    '粉色樱花主题配色与暗黑模式切换',
    '顶部毛玻璃导航栏 + 移动端侧边栏抽屉',
    '首页 Hero 大图轮播 + 一言（Hitokoto）打字机效果',
    '公告栏 + 精选文章自动切换展示',
    '文章卡片左右交替布局',
    '文章详情页含目录、上下篇、版权声明',
    '分类、标签云、时间线归档',
    '实时搜索（Ctrl+K 唤起）',
    '樱花花瓣飘落装饰动画',
    '特别鸣谢:AIOVTUE- 雪,对原创作者表达感谢',
  ],
} as const;