// =========================================================
// Sumyu Blog · 中央配置
// 所有站点设置集中在此文件，直接编辑此文件即可控制
// 导航、Hero、社交链接、主题色、Live2D、樱花等
// =========================================================

// ========== 站点身份 ==========
export const SITE_TITLE = 'SUMYU';
export const SITE_SUBTITLE = '轩窗听雨 · 岁月生香';
export const SITE_DESCRIPTION = 'SUMYU 的个人博客 · 轩窗 / 尺素 / 墨竹 / 拾遗 / 萍踪';
export const SITE_AUTHOR = 'SUMYU';
export const SITE_URL = 'https://yqamm.top';

// ========== 头像/Logo/图标配置 ==========
export const AVATAR = '/assets/avatar.webp';
export const ICON = 'https://img.yqamm.top/MIHOYO/950cb3bf.webp';
export const LOGO = {
  image: 'https://img.yqamm.top/MIHOYO/950cb3bf.webp',
  text: 'SUMYU',
} as { image?: string; text?: string };

// ========== 用户信息 (Hero 区域展示) ==========
export const USER_PROFILE = {
  name: 'Sumyu',
  signature: '生命绚烂,别被黑暗压垮',
  avatar: '/assets/avatar.webp',
};

// ========== 随机语录 (Hero 区域展示，无打字机背景) ==========
export const RANDOM_QUOTES = [
  '雨是神的烟花，文字是岁月的回声。',
  '愿你被这个世界温柔以待。',
  '心若向阳，无谓悲伤。',
  '所有的相遇都是久别重逢。',
  '生活明朗，万物可爱。',
  '听一场雨，读一卷书，等一个春。',
  '于轩窗之下，写一寸光阴。',
];

export const HERO_SETTINGS = {
  enableQuotes: true,
  typewriter: true,
  typewriterSpeed: 80,
};

// ========== Hero 背景图 (本地路径) ==========
export const HERO_IMAGES = [
  '/home/ht.webp',
];

// ========== 随机图片 (轩窗板块公告栏随机图片轮播) ==========
export const RANDOM_IMAGES = {
  enable: true,
  images: [
    '/hero/suiji/kjys1.webp',
    '/hero/suiji/kjys5.webp',
    '/hero/suiji/kjys6.webp',
    '/hero/suiji/kjys7.webp',
    '/hero/suiji/kjys8.webp',
  ],
};

// ========== 顶部导航: 五大版块 ==========
export const NAV_SECTIONS = [
  { label: '轩窗', href: '/', children: [] },
  {
    label: '尺素',
    href: '/projects/',
    children: [
      { label: '铺陈', href: '/projects/' },
      { label: '踏青', href: '/diary/' },
      { label: '留芳', href: '/files/' },
    ],
  },
  {
    label: '墨竹',
    href: '/games/',
    children: [
      { label: '闲游', href: '/games/' },
      { label: '忆影', href: '/anime/' },
      { label: '清言', href: '/les/' },
    ],
  },
  { label: '拾遗', href: '/shiyi/', children: [] },
  {
    label: '萍踪',
    href: '/links/',
    children: [
      { label: '幽竹', href: '/links/' },
      { label: '石径', href: '/friends/' },
      { label: '陋室', href: '/about/' },
    ],
  },
];

// ========== 社交链接 (Hero 区域展示) ==========
export const SOCIAL_LINKS = [
  { name: 'GitHub', url: 'https://github.com/qitinyu', icon: 'ri:github-fill' },
  { name: 'Gitee', url: 'https://gitee.com/qi-tingyu', icon: 'simple-icons:gitee' },
  { name: 'Gitcode', url: 'https://gitcode.com/user/YQAMM/repos', icon: 'ri:codepen-line' },
  { name: 'Email', url: 'mailto:484894496@qq.com', icon: 'ri:mail-line' },
  { name: '米游社', url: 'https://www.miyoushe.com/ys/accountCenter/postList?id=227165994', icon: 'ri:gamepad-line' },
  { name: 'B站', url: 'https://space.bilibili.com/3461582895974946', icon: 'ri:bilibili-line' },
];

// ========== 设置面板 ==========
export const SETTINGS_PANEL = {
  enabled: true,
  options: {
    live2d: true,
    sakura: true,
    themeColor: true,
    darkMode: true,
    music: true,
    postLayout: true,
  },
};

// ========== 主题色板 (5 套淡雅色调，仅明亮模式生效) ==========
export const THEME_COLORS = [
  { id: 'sakura', name: '樱花粉', primary: '#DF9193', soft: '#f5d6d8', deep: '#c97375', bg: '#fdf6f6' },
  { id: 'matcha', name: '抹茶绿', primary: '#7BAE7E', soft: '#d6ebd8', deep: '#5d8a60', bg: '#f4faf5' },
  { id: 'indigo', name: '青瓷蓝', primary: '#6B8FA3', soft: '#d3e0e8', deep: '#52708a', bg: '#f3f7f9' },
  { id: 'amber', name: '琥珀黄', primary: '#C9A05A', soft: '#f0e0c2', deep: '#a8823f', bg: '#fbf6ec' },
  { id: 'rosea', name: '藕荷紫', primary: '#A085B5', soft: '#e3d9ec', deep: '#7e6594', bg: '#f7f3fa' },
];

// ========== Live2D 看板娘配置 ==========
export const LIVE2D = {
  enabled: true,
  modelPath: 'https://cdn.jsdmirror.com/gh/qitinyu/yqlive2@v1.0.2/models/cmtt/cmtt.model3.json',
  modelName: 'cmtt',
  bottom: 0,
  left: 10,
  right: 10,
  width: 400,
  height: 620,
  scale: 0.15,
  mobileOff: false,
  modelList: [
    { name: 'wwa', path: 'https://cdn.jsdmirror.com/gh/qitinyu/yqlive2@v1.0.2/models/wwa/wwa.model3.json' },
    { name: 'cmtt', path: 'https://cdn.jsdmirror.com/gh/qitinyu/yqlive2@v1.0.2/models/cmtt/cmtt.model3.json' },
    { name: 'jk', path: 'https://cdn.jsdmirror.com/gh/qitinyu/yqlive2@v1.0.2/models/jk/jk.model3.json' },
    { name: 'girl', path: 'https://cdn.jsdmirror.com/gh/qitinyu/yqlive2@v1.0.2/models/girl/girl.model3.json' },
  ],
};

// ========== 站点公告 ==========
export const ANNOUNCEMENTS = [
  '欢迎来到 Sumyu 的个人博客！',
  '祝福原神六周年快乐！',
  'Sumy Music更新至V2.0.7.5,欢迎下载体验！',
  '博客已经接入萌ICP备20268826号,请放心访问！',
  '祝福铠甲勇士刑天15周年,我们的童年回头看了我一眼！',
];

// ========== 站点统计配置 ==========
// 站点起始日期 (用于计算运行时长)
export const SITE_START_DATE = '2026-07-01';
// 总字数 (手动填写，单位: 字)
export const TOTAL_WORD_COUNT = '3.2万';

// ========== 音乐播放器配置 ==========
// source: meting(默认) / webdav(坚果云等网盘音乐)
// webdav 凭据仅在本地 dev 代理使用，构建产物不会暴露到客户端
export const MUSIC = {
  enabled: true,
  source: 'netease',
  api: 'https://api.qijieya.cn/meting/',
  server: 'netease',
  type: 'playlist',
  id: '17863308200',
  webdav: {
    url: 'https://dav.jianguoyun.com/dav/',
    username: '484894496@qq.com',
    password: 'a3ajk3mke2s59mk5',
    directory: '/Sumy Music',
    publicUrl: '',
  },
};

// ========== 评论系统配置 ==========
// system: 'yuamli' / 'giscus' / 'twikoo'
export const COMMENT = {
  enable: true,
  system: 'yuamli',
  yuamli: {
    url: 'https://yuamli.yqamm.top/',
  },
  twikoo: {
    envId: 'https://netlify-nt.netlify.app/.netlify/functions/twikoo',
    lang: 'zh-CN',
    version: '1.7.10',
    cdn: 'https://s4.zstatic.net/npm/twikoo@{version}/dist/twikoo.min.js',
    fallbackCdn: 'https://registry.npmmirror.com/twikoo@{version}/files/dist/twikoo.min.js',
  },
  giscus: {
    repo: 'qitinyu/yuami-giscus',
    repoId: 'R_kgDOSmXsaA',
    category: 'Announcements',
    categoryId: 'DIC_kwDOSmXsaM4C9uxi',
    mapping: 'pathname',
    strict: '1',
    reactionsEnabled: '1',
    emitMetadata: '0',
    inputPosition: 'top',
    theme: 'noborder_light',
    lang: 'zh-CN',
    loading: 'lazy',
  },
};

// ========== 分页配置 ==========
// 每页展示的博文/日记卡片数量
export const POSTS_PAGE_SIZE = 8;
export const DIARY_PAGE_SIZE = 8;
