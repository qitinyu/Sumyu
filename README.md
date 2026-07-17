# Sumyu · 轩窗听雨 · 岁月生香

> 基于 Astro 7 构建的樱花系个人博客主题，五版块导航结构 + 全屏轮播 Hero + Live2D 看板娘 + MetingJS 音乐播放器。

**当前版本：v1.0.8**

---

## 简介

Sumyu 是一款以「樱花」为主色调、采用「轩窗 / 尺素 / 墨竹 / 拾遗 / 萍踪」五版块导航结构的 Astro 现代化简约风个人博客。

- 站点：**SUMYU · 轩窗听雨 · 岁月生香**
- 作者：Sumyu (YuQi)
- 技术栈：Astro 7 + TypeScript + MDX + 原生 CSS 变量（无 UI 框架依赖）
- 内容：Markdown / MDX 文章，Astro Content Collections 管理（posts + diary）
- 构建产物：纯静态站点，部署于 `dist/`

---

## 特性

### 核心体验

- **五版块导航**：轩窗（首页）/ 尺素（铺陈·踏青·留芳）/ 墨竹（闲游·忆影·清言）/ 拾遗 / 萍踪（幽竹·石径·陋室），每版块下挂子页面，下拉二级目录
- **全屏 Hero 轮播**：首页顶部全屏背景轮播 + 头像 + 用户名 + 签名 + 打字机随机语录 + 社交链接
- **Astro View Transitions**：客户端导航，页面切换无刷新
- **跨页面持久状态**：音乐播放、Live2D 位置、主题、侧边栏折叠状态均通过 `localStorage` 持久化
- **Yuamli 留言系统**：独立的[外链式](https://yuamli.yqamm.top/)留言系统，深度集成，独立可控后台管理

### 视觉与动效

- **五套淡雅主题色**：樱花粉 / 抹茶绿 / 青瓷蓝 / 琥珀黄 / 藕荷紫（仅明亮模式生效）
- **暗黑模式**：一键切换，跟随系统偏好
- **樱花飘落**：全屏 CSS 花瓣动画，可开关
- **Live2D 看板娘**：Cubism 4 (moc3) 模型，CDN 加载（jsdelivr），可拖拽，位置记忆，多模型切换（cmtt / jk / girl）
- **加载/过渡动画**：首屏加载动效 + 页面切换过渡
- **字体**：LXGW WenKai Screen（霞鹜文楷屏显版）via CDN

### 功能模块

- **音乐播放器**：MetingJS API (`api.qijieya.cn`) 播放网易云歌单，4 段式悬浮窗（图标 / 音乐 / 控制 / 列表），跨页面不中断播放
- **评论系统**：三选一 —— Yuamli / Twikoo / Giscus
- **文章加密**：frontmatter 配置 `encrypted` + `password`，访问需密码
- **文章置顶**：`pinned: true` 自动置顶并高亮
- **TOC 目录**：文章详情页左侧目录，右侧正文
- **全局搜索**：Ctrl/Cmd + K 唤起，文章 + 版块页面联合搜索（`search.json.js`）
- **站点统计**：运行时长 / 文章数 / 总字数 / 最后编辑
- **公告栏 / 随机图片轮播 / 精选文章 / RSS 朋友圈**：首页右侧信息卡片
- **RSS 订阅**：`/rss.xml` 输出全站文章
- **文章分页**：博文 / 日记均支持分页（可配每页数量）

---

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Astro 7（静态站点生成 SSG） |
| 语言 | TypeScript |
| 集成 | `@astrojs/mdx`、`@astrojs/rss`、`@astrojs/sitemap` |
| 图标 | Iconify（iconify-icon Web Component）+ Font Awesome |
| 字体 | LXGW WenKai Screen (CDN) |
| Live2D | PixiJS 6 + Live2D Cubism 4 Core + pixi-live2d-display（模型托管于 CDN） |
| 评论 | Yuamli / Twikoo / Giscus（可选） |
| 统计 | 不蒜子 Busuanzi |
| 音乐 | MetingJS API（网易云，`api.qijieya.cn`） |
| 图片处理 | Sharp（Astro 内置） |
| 代码高亮 | Shiki（github-light 主题） |
| 预加载 | Astro Prefetch（viewport 策略） |

---

## 目录结构

```
sumyu/                    # 项目根目录
├── astro.config.mjs          # Astro 配置（集成、插件、构建、图片等）
├── package.json              # 依赖与脚本
├── tsconfig.json             # TypeScript 配置（路径别名 @/ 等）
├── config.ts.txt             # 旧版配置备份（仅供参考）
├── public/                   # 静态资源（直接映射到根路径）
│   ├── assets/               # 头像 / logo / favicon
│   ├── hero/                 # Hero 背景图、随机图
│   ├── home/                 # 首页轮播图
│   ├── img/anime/            # 番剧封面图
│   ├── liufang/              # 留芳相册封面（按相册名分目录）
│   ├── _headers              # Cloudflare Pages 自定义头部
│   └── ...
├── src/
│   ├── config.ts             # ★ 中央配置（站点设置总控）
│   ├── content.config.ts     # Content Collections schema（frontmatter 校验）
│   ├── components/           # Astro 组件
│   │   ├── Navbar.astro          # 导航栏（毛玻璃效果）
│   │   ├── Sidebar.astro         # 移动端侧边栏
│   │   ├── Hero.astro            # 首页 Hero 轮播
│   │   ├── MusicPlayer.astro     # 音乐播放器
│   │   ├── Live2D.astro          # Live2D 看板娘
│   │   ├── SearchModal.astro     # 全局搜索模态框
│   │   ├── SettingsPanel.astro   # 设置面板（主题/樱花/Live2D等）
│   │   ├── Comment.astro         # 评论区
│   │   ├── Footer.astro          # 页脚
│   │   ├── PostCard.astro        # 文章卡片
│   │   ├── BlogPostCard.astro    # 博客文章卡片
│   │   ├── NoticeBoard.astro     # 公告栏
│   │   ├── FloatingActions.astro # 右下角浮动操作按钮
│   │   └── ...
│   ├── data/                 # ★ 各版块数据内容
│   │   ├── index.ts              # 统一导出所有数据模块
│   │   ├── footer.ts             # ★ 页脚配置（独立编辑）
│   │   ├── projects.ts           # 铺陈：个人项目展示
│   │   ├── files.ts              # 留芳：相册（多相册，每相册独立 slug）
│   │   ├── games.ts              # 闲游：游戏列表 + 轮播图
│   │   ├── anime.ts              # 忆影：番剧列表（含状态/评分/进度）
│   │   ├── les.ts                # 清言：LES 百合作品收藏
│   │   ├── links.ts              # 幽竹：友链
│   │   ├── about.ts              # 陋室：关于页面数据
│   │   └── rss.ts                # RSS 订阅 + 站点信息 + 友链朋友圈
│   ├── content/              # Markdown 文章
│   │   ├── posts/                # 博文（按子文件夹分类：Blog/Github/Jiqiao/等）
│   │   └── diary/                # 踏青日记
│   ├── layouts/
│   │   └── Layout.astro          # 全局布局（含 SEO / 导航 / 页脚 / 设置）
│   ├── pages/                # 路由页面
│   │   ├── index.astro           # 首页（轩窗）
│   │   ├── posts/                # 博文列表 + 详情 [...slug]
│   │   ├── diary/                # 踏青列表 + 详情
│   │   ├── projects/             # 铺陈
│   │   ├── files/                # 留芳（相册列表 + 详情 [slug]）
│   │   ├── games/                # 闲游
│   │   ├── anime/                # 忆影
│   │   ├── les/                  # 清言
│   │   ├── shiyi/                # 拾遗（留言板）
│   │   ├── links/                # 幽竹
│   │   ├── friends/              # 石径（友链 + RSS 朋友圈）
│   │   ├── about/                # 陋室
│   │   ├── info/                 # 站点信息页面
│   │   ├── archives.astro        # 归档
│   │   ├── categories.astro      # 分类
│   │   ├── tags.astro            # 标签云
│   │   ├── travel.astro          # 旅记
│   │   ├── moments.astro         # 动态/瞬间
│   │   ├── comment.astro         # 独立评论区页面
│   │   ├── 404.astro             # 自定义 404
│   │   ├── search.json.js        # 搜索索引 JSON
│   │   └── rss.xml.js            # RSS Feed 输出
│   ├── plugins/              # 自定义 Markdown 插件
│   │   ├── remark-reading-time.mjs  # 自动计算阅读时间
│   │   ├── remark-spoiler.mjs       # 隐藏文字 (:spoiler[...])
│   │   ├── remark-alerts.mjs        # GitHub 风格告警 (remark 版本)
│   │   ├── rehype-alerts.mjs        # GitHub 风格告警 (rehype 版本)
│   │   └── remark-github.mjs        # GitHub 仓库卡片 (::github{repo="..."})
│   ├── styles/
│   │   └── global.css           # ★ 全局样式 / CSS 变量 / 主题色 / 动画
│   └── utils/
│       ├── posts.ts             # 文章工具函数（获取/排序/分类/标签/归档）
│       └── rss-parser.ts        # RSS 朋友圈解析器（支持 RSS 2.0 + Atom）
└── dist/                    # 构建产物（gitignore）
```

---

## 快速开始

### 环境要求

- Node.js ≥ 20
- pnpm 9.15.9（推荐）/ npm / yarn

### 安装与运行

```bash
# 1. 安装依赖
pnpm install

# 2. 本地开发
pnpm dev
# 访问 http://localhost:4321

# 3. 生产构建
pnpm build

# 4. 本地预览构建产物
pnpm preview --host
```

### 脚本说明

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动开发服务器（热更新） |
| `pnpm build` | 构建生产站点到 `dist/` |
| `pnpm preview` | 本地预览构建产物 |
| `pnpm astro` | 调用 Astro CLI |

---

## 配置说明

### 1. 中央配置 `src/config.ts`

站点的所有可调项集中于此，编辑该文件即可控制全站行为。主要分块：

| 配置块 | 作用 |
|--------|------|
| `SITE_*` | 站点标题 / 副标题 / 描述 / 作者 / URL |
| `AVATAR` / `ICON` / `LOGO` | 头像、favicon、导航栏 logo |
| `USER_PROFILE` | Hero 区用户名、签名、头像 |
| `RANDOM_QUOTES` | 随机语录池（打字机展示） |
| `HERO_SETTINGS` | Hero 打字机开关与速度 |
| `HERO_IMAGES` | Hero 背景图 |
| `RANDOM_IMAGES` | 公告栏随机图片轮播 |
| `NAV_SECTIONS` | ★ 五大版块导航 + 二级菜单定义 |
| `SOCIAL_LINKS` | 社交链接（GitHub / 米游社 / B站 / QQ / Email） |
| `SETTINGS_PANEL` | 设置面板开关与可选功能 |
| `THEME_COLORS` | 五套主题色板（樱花粉 / 抹茶绿 / 青瓷蓝 / 琥珀黄 / 藕荷紫） |
| `LIVE2D` | Live2D 看板娘配置（CDN 模型路径 / 尺寸 / 模型列表） |
| `ANNOUNCEMENTS` | 站点公告（3 条） |
| `SITE_START_DATE` / `TOTAL_WORD_COUNT` | 站点统计 |
| `MUSIC` | 音乐播放器（MetingJS API） |
| `COMMENT` | 评论系统（yuamli / twikoo / giscus 三选一） |
| `POSTS_PAGE_SIZE` / `DIARY_PAGE_SIZE` | 分页大小 |

### 2. 页脚配置 `src/data/footer.ts`

页脚信息独立于此文件编辑：

- `brand`：站点名称 / 标语
- `copyright`：版权年份 / 所有者 / 站点地址 / 邮箱
- `powered`：框架 / 主题 / 版本号（当前 v1.0.8）
- `icp`：备案信息（留空则不显示）
- `customLines`：自定义额外行（支持 HTML）

### 3. 主题色与字体

- **主题色**：`THEME_COLORS` 定义五套色板；用户可在右下角设置面板切换（仅明亮模式），暗黑模式使用固定粉色调
- **字体**：通过 CDN 加载 LXGW WenKai Screen 字体，在 `src/styles/global.css` 的 `--font-*` 变量中定义

---

## 内容编写

### 文章（博文 / 踏青日记）

文章位于 `src/content/posts/`，日记位于 `src/content/diary/`，均为 Markdown（`.md`）或 MDX（`.mdx`）。支持多级子文件夹分类，Content Collections 通过 `glob` 自动扫描识别。

**Frontmatter 模板：**

```markdown
---
title: "文章标题"              # 必填
description: "文章概述/摘要"     # 文章描述
pubDate: 2026-07-07            # 发布日期（必填）
updatedDate: 2026-07-08        # 更新日期（可选）
image: "/img/xxx.jpg"          # 文章配图，留空则不展示卡片图片
showImage: true                # 卡片是否展示图片
category: "随笔"               # 分类
tags: [标签1, 标签2]           # 标签
author: "Sumyu"                # 作者
licenseName: "CC BY 4.0"      # 许可协议
pinned: false                  # 是否置顶（true 自动置顶并高亮）
encrypted: false               # 是否加密
password: ""                   # 加密密码（encrypted 为 true 时生效）
draft: false                   # 是否草稿（不发布）
comment_id: ""                 # 留言区页面标识（用于独立留言区）
---
```

### 子文件夹分类

文章按子文件夹组织（如 `posts/Blog/`、`posts/Les/`、`posts/Github/`、`posts/Jiqiao/`、`posts/Gonju/`、`posts/Openlist/`、`posts/Qushi/` 等），Collection 自动识别所有层级，无需额外配置。

### 自定义 Markdown 插件

写作时支持以下扩展语法：

- **`> [!note]` / `> [!tip]` / `> [!warning]` / `> [!important]` / `> [!caution]`**：GitHub 风格告警块
- **`:spoiler[隐藏文字]`**：鼠标悬停才可见的隐藏文字
- **`::github{repo="owner/repo"}`**：自动生成 GitHub 仓库卡片
- 阅读时间自动计算（基于中文/英文混排字数）

---

## 五大版块说明

| 版块 | 路径 | 子页面 | 说明 |
|------|------|--------|------|
| **轩窗** | `/` | — | 首页：Hero 轮播 + 博文列表 + 公告/语录/随机图片/统计 |
| **尺素** | `/projects/` | 铺陈 `/projects/` / 踏青 `/diary/` / 留芳 `/files/` | 项目展示、日记、相册 |
| **墨竹** | `/games/` | 闲游 `/games/` / 忆影 `/anime/` / 清言 `/les/` | 游戏、番剧、LES 百合作品 |
| **拾遗** | `/shiyi/` | 拾遗 `/shiyi/` | 留言板（iframe 嵌入 Yuamli） |
| **萍踪** | `/links/` | 幽竹 `/links/` / 石径 `/friends/` / 陋室 `/about/` | 友链、RSS 朋友圈、关于 |

---

## 功能模块详解

### 音乐播放器

- 配置：`MUSIC`（`config.ts`）
- 数据源：MetingJS API（`api.qijieya.cn`），默认网易云歌单 `17863308200`
- 交互：点击导航栏音乐图标弹出悬浮窗；关闭悬浮窗（X 或空白处）不停止音乐
- 持久化：播放进度、模式、当前歌曲通过 `localStorage` 保存
- 跨页面：基于 Astro View Transitions，导航时不中断播放

### Live2D 看板娘

- 配置：`LIVE2D`
- 模型：moc3（Cubism 4），托管于 GitHub CDN（jsdelivr），不占用本地空间
- 模型列表：cmtt（默认）/ jk / girl
- 拖拽：按住模型可拖动，位置自动记忆（`sumyu-live2d-position` localStorage）
- 多模型：在设置面板切换

### 评论系统

- 配置：`COMMENT`，`system` 三选一
  - `yuamli`：只需填 `url`（默认使用 `https://yuamli.yqamm.top/`）
  - `twikoo`：填 `envId` + CDN（含备用 CDN）
  - `giscus`：填 GitHub Discussions 仓库参数

### 文章加密

- frontmatter 设置 `encrypted: true` + `password: "xxx"`
- 访问时需输入正确密码才能查看正文

### RSS 朋友圈（石径）

- 配置：`rssFriends`（`src/data/rss.ts`）
- 自动抓取友链站点的 RSS/Atom Feed，展示友邻最新文章
- 自定义 RSS 解析器（`src/utils/rss-parser.ts`），支持 RSS 2.0 和 Atom 格式

### 全局搜索

- 快捷键 Ctrl/Cmd + K 唤起搜索模态框
- 搜索索引由 `src/pages/search.json.js` 在构建时生成
- 联合搜索文章标题 + 版块页面

### 留芳相册

- 配置：`galleryAlbums`（`src/data/files.ts`）
- 支持多相册，每相册独立 slug 路由（`/files/<slug>`）
- 封面 + 图片列表，支持本地图片和在线 URL
- 目前含 6 个相册：胡桃 / 叶瞬光 / 青衣 / 琪亚娜 / 爱莉希雅 / LES

---

## 部署

本项目为纯静态站点，`pnpm build` 后生成 `dist/`，可部署到任意静态托管平台：

- **Cloudflare Pages**：构建命令 `pnpm build`，输出目录 `dist`（已配置 `_headers`）
- **Vercel** / **Netlify**：导入仓库，框架选 Astro，自动构建
- **GitHub Pages**：使用 GitHub Actions 部署 `dist/`
- **自建服务器**：将 `dist/` 上传至 Web 服务器（Nginx / Caddy）

> 部署前请在 `src/config.ts` 修改 `SITE_URL` 为正式域名 `https://yqamm.top`，并在 `astro.config.mjs` 中配置 `site` 字段（影响 sitemap / RSS / canonical）。

---

## 致谢

- [Astro](https://astro.build/) —— 静态站点框架
- [MetingJS](https://github.com/metowolf/MetingJS) —— 音乐 API
- [PixiJS](https://pixijs.com/) / [pixi-live2d-display](https://github.com/guansss/pixi-live2d-display) —— Live2D 渲染
- [Iconify](https://iconify.design/) —— 图标库
- [LXGW WenKai](https://github.com/lxgw/LxgwWenKai) —— 霞鹜文楷字体
- [AIOVTUE](https://github.com/AIOVTUE) —— 原创樱花主题灵感

---

## 许可证

MIT License

文章内容（`src/content/`）默认遵循各自 frontmatter 中声明的协议（默认 CC BY 4.0）。
