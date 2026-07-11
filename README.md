# Sumyu · 轩窗听雨 · 岁月生香

> 基于 Astro 7 构建的樱花系个人博客主题，五版块导航结构 + 全屏轮播 Hero + Live2D 看板娘 + MetingJS 音乐播放器。

**当前版本：v1.0.3**

---

## 简介

Sumyu 是一款以「樱花」为主色调、采用「轩窗 / 尺素 / 墨竹 / 琉璃 / 萍踪」五版块导航结构的 Astro 博客主题。所有站点设置集中在 `src/config.ts`，页脚信息集中在 `src/data/footer.ts`，开箱即用、配置驱动。

- 站点品牌：**SUMYU · 轩窗听雨 · 岁月生香**
- 技术栈：Astro 7 + TypeScript + 原生 CSS 变量（无 UI 框架依赖）
- 内容：Markdown / MDX 文章，Astro Content Collections 管理

---

## 特性

### 核心体验
- **五版块导航**：轩窗（首页）/ 尺素 / 墨竹 / 琉璃 / 萍踪，每版块下挂子页面，下拉二级目录
- **全屏 Hero 轮播**：首页顶部全屏背景轮播 + 头像 + 用户名 + 签名 + 打字机随机语录 + 社交链接
- **Astro View Transitions**：客户端导航，页面切换无刷新
- **跨页面持久状态**：音乐播放、Live2D 位置、主题、侧边栏折叠状态均持久化

### 视觉与动效
- **五套淡雅主题色**：樱花粉 / 抹茶绿 / 青瓷蓝 / 琥珀黄 / 藕荷紫（仅明亮模式生效）
- **暗黑模式**：一键切换，跟随系统偏好
- **樱花飘落**：全屏 CSS 花瓣动画，可开关
- **Live2D 看板娘**：moc3 模型，可拖拽，位置记忆，多模型切换
- **加载/过渡动画**：首屏加载动效 + 页面切换过渡

### 功能模块
- **音乐播放器**：MetingJS API 播放网易云歌单，4 段式悬浮窗（图标 / 音乐 / 控制 / 列表），跨页面不中断播放
- **评论系统**：三选一 —— Yuamli / Twikoo / Giscus
- **文章加密**：frontmatter 配置 `encrypted` + `password`，访问需密码
- **文章置顶**：`pinned: true` 自动置顶并高亮
- **TOC 目录**：文章详情页左侧目录，右侧正文
- **全局搜索**：Ctrl/Cmd + K 唤起，文章 + 版块页面联合搜索
- **站点统计**：运行时长 / 文章数 / 总字数 / 最后编辑
- **公告栏 / 随机文章 / RSS 朋友圈**：首页右侧信息卡片

---

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Astro 7（静态站点生成 SSG） |
| 语言 | TypeScript |
| 集成 | `@astrojs/mdx`、`@astrojs/rss`、`@astrojs/sitemap` |
| 图标 | Iconify（iconify-icon Web Component）+ Font Awesome |
| Live2D | PixiJS 6 + Live2D Cubism 4 Core + pixi-live2d-display |
| 评论 | Yuamli / Twikoo / Giscus（可选） |
| 统计 | 不蒜子 Busuanzi |
| 音乐 | MetingJS API（网易云） |

---

## 目录结构

```
sumyu/
├── astro.config.mjs          # Astro 配置
├── package.json
├── src/
│   ├── config.ts             # ★ 中央配置（站点设置总控）
│   ├── content.config.ts     # Content Collections schema（frontmatter 校验）
│   ├── components/           # 组件
│   │   ├── Navbar.astro          # 导航栏
│   │   ├── Sidebar.astro         # 移动端侧边栏
│   │   ├── Hero.astro            # 首页 Hero 轮播
│   │   ├── MusicPlayer.astro     # 音乐播放器
│   │   ├── Live2D.astro          # Live2D 看板娘
│   │   ├── SearchModal.astro     # 全局搜索
│   │   ├── SettingsPanel.astro   # 设置面板
│   │   ├── Comment.astro         # 评论区
│   │   ├── Footer.astro          # 页脚
│   │   └── ...
│   ├── data/                 # ★ 各版块数据内容
│   │   ├── footer.ts             # ★ 页脚配置（独立编辑）
│   │   ├── projects.ts           # 铺陈：项目
│   │   ├── diary                 # 踏青：日记（Content Collection）
│   │   ├── files.ts              # 留芳：相册
│   │   ├── anime.ts              # 忆影：番剧
│   │   ├── games.ts              # 闲游：游戏
│   │   ├── les.ts                # 清言：语录
│   │   ├── info.ts               # 陋室：关于
│   │   ├── links.ts              # 幽竹：友链
│   │   └── about.ts
│   ├── content/              # Markdown 文章
│   │   ├── posts/                # 博文（按子文件夹分类）
│   │   └── diary/                # 踏青日记
│   ├── layouts/Layout.astro  # 全局布局
│   ├── pages/                # 路由页面
│   └── styles/global.css     # 全局样式 / CSS 变量
└── public/                   # 静态资源
    ├── assets/                   # 头像 / logo / favicon
    ├── home/                     # 首页轮播图、Hero 背景
    ├── fonts/                    # 自定义字体（.woff2）
    ├── live2/models/             # Live2D 模型文件
    └── img/                      # 文章/相册配图
```

---

## 快速开始

### 环境要求
- Node.js ≥ 20
- pnpm（推荐）/ npm / yarn

### 安装与运行

```bash
# 1. 安装依赖
pnpm install
# 或 npm install

# 2. 本地开发
pnpm dev
# 访问 http://localhost:4321

# 3. 生产构建
pnpm build

# 4. 本地预览构建产物
pnpm preview
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
| `HERO_IMAGES` | Hero 背景图 |
| `NAV_SECTIONS` | ★ 五大版块导航 + 二级菜单定义 |
| `SOCIAL_LINKS` | 社交链接 |
| `SETTINGS_PANEL` | 设置面板开关与可选功能 |
| `THEME_COLORS` | 五套主题色板 |
| `LIVE2D` | Live2D 看板娘配置 |
| `ANNOUNCEMENTS` | 站点公告（3 条） |
| `SITE_START_DATE` / `TOTAL_WORD_COUNT` | 站点统计 |
| `MUSIC` | 音乐播放器（MetingJS API） |
| `COMMENT` | 评论系统（yuamli / twikoo / giscus） |
| `POSTS_PAGE_SIZE` / `DIARY_PAGE_SIZE` | 分页大小 |

### 2. 页脚配置 `src/data/footer.ts`

页脚信息独立于此文件编辑，不再硬编码于组件中：

- `brand`：站点品牌 / 标语
- `copyright`：版权年份 / 所有者 / 站点地址 / 邮箱
- `powered`：框架 / 主题 / 版本号
- `icp`：备案信息（留空则不显示）
- `customLines`：自定义额外行（支持 HTML）

### 3. 主题色与字体

- **主题色**：`THEME_COLORS` 定义五套色板；用户可在右下角设置面板切换（仅明亮模式）
- **字体**：在 `src/styles/global.css` 的 `--font-*` 变量与 `public/fonts/` 下放置 `.woff2` 文件

---

## 内容编写

### 文章（博文 / 踏青日记）

文章位于 `src/content/posts/`，日记位于 `src/content/diary/`，均为 Markdown（`.md`）或 MDX（`.mdx`）。支持多级子文件夹分类，Astro Content Collections 通过 `glob` 自动扫描识别。

**Frontmatter 模板：**

```markdown
---
title: "文章标题"              # 必填
description: "文章概述/摘要"     # 文章描述
pubDate: 2026-07-07            # 发布日期（必填）
image: "/img/xxx.jpg"          # 文章配图，留空则不展示卡片图片
showImage: true                # 卡片是否展示图片
category: "随笔"               # 分类
tags: [标签1, 标签2]           # 标签
author: "Sumyu"               # 作者
licenseName: "CC BY 4.0"      # 许可协议
pinned: false                 # 是否置顶（true 自动置顶并高亮）
encrypted: false              # 是否加密
password: ""                  # 加密密码（encrypted 为 true 时生效）
draft: false                  # 是否草稿（不发布）
---

正文内容（支持 Markdown / MDX 语法）...
```

### 子文件夹分类

文章按子文件夹组织（如 `posts/Blog/`、`posts/Les/`、`posts/Github/` 等），Collection 自动识别所有层级，无需额外配置。

---

## 五大版块说明

| 版块 | 路径 | 子页面 | 说明 |
|------|------|--------|------|
| **轩窗** | `/` | — | 首页：Hero 轮播 + 博文列表 + 公告/语录/统计 |
| **尺素** | `/projects/` | 铺陈 / 踏青 `/diary/` / 留芳 `/files/` | 项目展示、日记、相册 |
| **墨竹** | `/games/` | 闲游 / 忆影 `/anime/` / 清言 `/les/` | 游戏、番剧、语录 |
| **琉璃** | `/shiyi/` | 拾遗 / 采云 `/cloud/` | 留言板、网盘分享（iframe） |
| **萍踪** | `/links/` | 幽竹 / 石径 `/friends/` / 陋室 `/about/` | 友链、RSS 朋友圈、关于 |

---

## 功能模块详解

### 音乐播放器
- 配置：`MUSIC`（`config.ts`）
- 数据源：MetingJS API，默认网易云歌单
- 交互：点击导航栏音乐图标弹出悬浮窗；关闭悬浮窗（X 或空白处）不停止音乐
- 持久化：播放进度、模式、当前歌曲通过 `localStorage` 保存
- 跨页面：基于 Astro View Transitions，导航时不中断播放

### Live2D 看板娘
- 配置：`LIVE2D`
- 模型：moc3（Cubism 4），放置于 `public/live2/models/<name>/`
- 拖拽：按住模型可拖动，位置自动记忆（`sumyu-live2d-position`）
- 多模型：在设置面板切换，模型路径存于 `localStorage`

### 评论系统
- 配置：`COMMENT`，`system` 三选一
  - `yuamli`：只需填 `url`
  - `twikoo`：填 `envId` + CDN
  - `giscus`：填 GitHub Discussions 仓库参数

### 文章加密
- frontmatter 设置 `encrypted: true` + `password: "xxx"`
- 访问时需输入正确密码才能查看正文

---

## 部署

本项目为纯静态站点，`pnpm build` 后生成 `dist/`，可部署到任意静态托管平台：

- **Vercel** / **Netlify**：导入仓库，框架选 Astro，自动构建
- **Cloudflare Pages**：构建命令 `pnpm build`，输出目录 `dist`
- **GitHub Pages**：使用 GitHub Actions 部署 `dist/`
- **自建服务器**：将 `dist/` 上传至 Web 服务器（Nginx / Caddy）

> 部署前请在 `src/config.ts` 修改 `SITE_URL` 为正式域名，并在 `astro.config.mjs` 中配置 `site` 字段（影响 sitemap / RSS / canonical）。

---

## 版本历史

### v1.0.3（当前版本）

**修复（Astro View Transitions 适配）**
- ✅ 修复：跳转页面后 Live2D 看板娘不显示 —— Live2D 容器添加 `transition:persist`，导航时不销毁 PIXI Application
- ✅ 修复：跳转页面后点击音乐播放器图标无反应 —— `#music-open` 按钮事件改用 `astro:page-load` 重新绑定
- ✅ 修复：移动端侧边栏菜单图标与音乐播放器图标点击无效 —— 全局交互脚本统一包装到 `astro:page-load` 生命周期
- ✅ 优化：导航栏滚动透明效果适配 `astro:page-load`
- ✅ 优化：音乐播放状态图标（`is-playing`）改为动态查找元素，避免导航后引用失效

**此前版本要点**
- v1.0.2：音乐播放器优化、Live2D 拖拽与位置记忆、留芳相册 Lightbox、评论系统接入（twikoo/giscus）、移动端侧边栏折叠修复
- v1.0.1：五版块导航重构、音乐播放器重写、pinned 置顶、页脚独立配置、各版块题头统一

---

## 致谢

- [Astro](https://astro.build/) —— 静态站点框架
- [MetingJS](https://github.com/metowolf/MetingJS) —— 音乐 API
- [PixiJS](https://pixijs.com/) / [pixi-live2d-display](https://github.com/guansss/pixi-live2d-display) —— Live2D 渲染
- [Iconify](https://iconify.design/) —— 图标库

---

## 许可证

MIT License

文章内容（`src/content/`）默认遵循各自 frontmatter 中声明的协议（默认 CC BY 4.0）。
