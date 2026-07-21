// =========================================================
// Sumyu Blog · 中央配置
// 所有站点设置集中在此文件，编辑此文件即可控制
// 导航、Hero、社交链接、主题色、Live2D、樱花等
// =========================================================

// ========== 站点身份 ==========
export const SITE_TITLE = 'SUMYU';
export const SITE_SUBTITLE = '轩窗听雨 · 岁月生香';
export const SITE_DESCRIPTION = 'SUMYU 的个人博客 · 轩窗 / 尺素 / 墨竹 / 拾遗 / 萍踪';
export const SITE_AUTHOR = 'SUMYU';
export const SITE_URL = 'https://yqamm.top';

// ========== 头像/Logo/图标配置 ==========
// 头像 - 用于 Hero 区域个人信息展示
export const AVATAR = '/assets/avatar.webp';
// 网站图标 - 浏览器标签栏图标 (favicon)
export const ICON = '/assets/logo.ico';
// Logo 配置 - 导航栏左上角显示
// 支持三种模式:
//   1. 只显示文字 logo:   logo: { text: 'Sumyu' }
//   2. 只显示图片 logo:   logo: { image: '/assets/logo.webp' }
//   3. 同时显示图片+文字: logo: { image: '/assets/logo.webp', text: 'Sumyu' }
export const LOGO = {
  image: '/assets/logo.webp',
  text: 'SUMYU',
} as {
  image?: string;
  text?: string;
};

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
    '/hero/suiji/les1.webp',
    '/hero/suiji/les2.webp',
    '/hero/suiji/les3.webp',
    '/hero/suiji/les4.webp',
  ],
};

// ========== 顶部导航: 五大版块 ==========
// 轩窗 / 尺素 / 墨竹 / 拾遗 / 萍踪
// 注: 已取消二级菜单的 desc 说明，只保留 label
export const NAV_SECTIONS = [
  {
    label: '轩窗',
    href: '/',
    children: null,
  },
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
  {
    label: '拾遗',
    href: '/shiyi/',
    children: null,
  },
  {
    label: '萍踪',
    href: '/links/',
    children: [
      { label: '幽竹', href: '/links/' },
      { label: '石径', href: '/friends/' },
      { label: '陋室', href: '/about/' },
    ],
  },
] as const;

// ========== 社交链接 (Hero 区域展示) ==========
export const SOCIAL_LINKS = [
  { name: 'GitHub', url: 'https://github.com/qitinyu', icon: 'fa-brands fa-github-alt' },
  { name: '米游社', url: 'https://www.miyoushe.com/sr/accountCenter/postList?id=227165994', icon: 'fa-brands fa-battle-net' },
  { name: 'B站', url: 'https://space.bilibili.com/3461582895974946', icon: 'fab fa-bilibili' },
  { name: 'QQ', url: 'https://qm.qq.com/cgi-bin/qm/qr?k=-A9MUAbpO68zcu1YAp11NiI3ir7WczLO', icon: 'fa-brands fa-qq' },
  { name: 'Email', url: 'mailto:484894496@qq.com', icon: 'fa-solid fa-envelope' },
] as const;

// ========== 设置面板 ==========
// 是否对用户开启设置面板
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
  { id: 'amber',  name: '琥珀黄', primary: '#C9A05A', soft: '#f0e0c2', deep: '#a8823f', bg: '#fbf6ec' },
  { id: 'rosea',  name: '藕荷紫', primary: '#A085B5', soft: '#e3d9ec', deep: '#7e6594', bg: '#f7f3fa' },
] as const;

// ========== Live2D 看板娘配置 ==========
// 支持 moc3 模型 (Live2D Cubism 3+)
// 模型文件放在 public/live2/models/<modelName>/ 目录下
// position: 初始位置 (left/right), 用户可拖拽移动, 位置会持久化保存
// width/height: 画布尺寸, 数值越大模型显示越大
//export const LIVE2D = {
//enabled: true,
//modelPath: '/live2/models/cmtt/',
//modelName: 'cmtt',
//position: 'left',
//bottom: 0,
//left: 10,
//right: 10,
//width: 300,
//height: 520,
//scale: 0.15,
//mobileOff: false,
//modelList: [
//{ name: 'cmtt', path: '/live2/models/cmtt/cmtt.model3.json' },
//{ name: 'jk',   path: '/live2/models/jk/jk.model3.json' },
//{ name: 'girl', path: '/live2/models/girl/girl.model3.json' },
//  ],
//};
//

export const LIVE2D = {
  enabled: true,
  modelPath: 'https://cdn.jsdelivr.net/gh/qitinyu/yqlive2@v1.0.2/models/cmtt/',
  modelName: 'cmtt', 
  bottom: 0,
  left: 10,
  right: 10,
  width: 400,
  height: 620,
  scale: 0.15,
  mobileOff: false,
  modelList: [
    { name: 'cmtt', path: 'https://cdn.jsdelivr.net/gh/qitinyu/yqlive2@v1.0.2/models/cmtt/cmtt.model3.json' },
    { name: 'jk',   path: 'https://cdn.jsdelivr.net/gh/qitinyu/yqlive2@v1.0.2/models/jk/jk.model3.json' },
    { name: 'girl', path: 'https://cdn.jsdelivr.net/gh/qitinyu/yqlive2@v1.0.2/models/girl/girl.model3.json' },    
  ],
};
// ========== 站点公告 (3 条) ==========
export const ANNOUNCEMENTS = [
  '欢迎来到 Sumyu 的个人博客！',
  '祝贺2026-07-15-胡桃胡堂主生日快乐!!',
  '祝福铠甲勇士刑天15周年，我们的童年回头看了我一眼',
  '博客更新至v1.0.8,修复一系列问题',
];

// ========== 站点统计配置 ==========
// 站点起始日期 (用于计算运行时长)
export const SITE_START_DATE = '2026-07-01';
// 总字数 (手动填写，单位: 字)
export const TOTAL_WORD_COUNT = '3.2万';

// ========== 音乐播放器配置 ==========
// 使用 MetingJS API 播放网易云歌单
export const MUSIC = {
  enabled: true,
  api: 'https://api.qijieya.cn/meting/',
  server: 'netease',
  type: 'playlist',
  id: '17863308200',
};

// ========== 评论系统配置 ==========
// enable: 是否启用评论区 (false 时文章底部不显示评论)
// system: 选择评论系统, 支持 'yuamli' / 'giscus' / 'twikoo' 三选一
//   - yuamli: 只需配置 url (导入配置好的 yuamli 评论系统链接)
//   - twikoo: 配置 envId / 版本 / CDN (主+备)
//   - giscus: 配置 GitHub Discussions 仓库等参数
export const COMMENT = {
  enable: true,
  system: 'yuamli',
  yuamli: {
    // yuamli 评论系统地址 (只需导入配置好的链接)
    url: 'https://yuamli.yqamm.top/',
  },
  twikoo: {
    envId: 'https://netlify-nt.netlify.app/.netlify/functions/twikoo',
    lang: 'zh-CN',
    // Twikoo 前端 CDN 版本配置
    // 修改 version 可升级前端版本, 如 '1.7.10'
    // cdn 可替换为自定义 CDN 地址
    version: '1.7.10',
    cdn: 'https://s4.zstatic.net/npm/twikoo@{version}/dist/twikoo.min.js',
    // 备用 CDN (主 CDN 加载失败时使用)
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