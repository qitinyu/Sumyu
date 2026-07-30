// =========================================================
// Sumyu Blog · 中央配置
// 数据统一从 src/data/*.config.json 读取，本文件仅做重新导出
// 编辑配置请通过 /admin 后台或修改 src/data/ 下的 JSON 文件
// =========================================================

import siteConfig from './data/site.config.json';
import navConfig from './data/nav.config.json';
import themeConfig from './data/theme.config.json';
import socialConfig from './data/social.config.json';
import featureConfig from './data/feature.config.json';

// ========== 站点身份 ==========
export const SITE_TITLE = siteConfig.site.title;
export const SITE_SUBTITLE = siteConfig.site.subtitle;
export const SITE_DESCRIPTION = siteConfig.site.description;
export const SITE_AUTHOR = siteConfig.site.author;
export const SITE_URL = siteConfig.site.url;

// ========== 头像/Logo/图标配置 ==========
export const AVATAR = siteConfig.avatar;
export const ICON = siteConfig.icon;
export const LOGO = siteConfig.logo as { image?: string; text?: string };

// ========== 用户信息 (Hero 区域展示) ==========
export const USER_PROFILE = siteConfig.userProfile;

// ========== 随机语录 (Hero 区域展示，无打字机背景) ==========
export const RANDOM_QUOTES = siteConfig.randomQuotes;

export const HERO_SETTINGS = siteConfig.heroSettings;

// ========== Hero 背景图 (本地路径) ==========
export const HERO_IMAGES = siteConfig.heroImages;

// ========== 随机图片 (轩窗板块公告栏随机图片轮播) ==========
export const RANDOM_IMAGES = siteConfig.randomImages;

// ========== 顶部导航: 五大版块 ==========
export const NAV_SECTIONS = navConfig.sections;

// ========== 社交链接 (Hero 区域展示) ==========
export const SOCIAL_LINKS = socialConfig.links;

// ========== 设置面板 ==========
export const SETTINGS_PANEL = themeConfig.settingsPanel;

// ========== 主题色板 (5 套淡雅色调，仅明亮模式生效) ==========
export const THEME_COLORS = themeConfig.themeColors;

// ========== Live2D 看板娘配置 ==========
export const LIVE2D = featureConfig.live2d;

// ========== 站点公告 ==========
export const ANNOUNCEMENTS = siteConfig.announcements;

// ========== 站点统计配置 ==========
export const SITE_START_DATE = siteConfig.siteStartDate;
export const TOTAL_WORD_COUNT = siteConfig.totalWordCount;

// ========== 音乐播放器配置 ==========
export const MUSIC = featureConfig.music;

// ========== 评论系统配置 ==========
export const COMMENT = featureConfig.comment;

// ========== 分页配置 ==========
export const POSTS_PAGE_SIZE = siteConfig.pagination.postsPageSize;
export const DIARY_PAGE_SIZE = siteConfig.pagination.diaryPageSize;
