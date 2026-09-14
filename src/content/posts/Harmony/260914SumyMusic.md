---
title: SumyMusic-鸿蒙原生多源聚合播放器
pubDate: 2026-09-14
description: 一款鸿蒙原生音乐播放器，支持多音源聚合搜索、自建API、WebDAV云盘播放、数据同步等功能
author: YuQi
tags: [Harmony]
---

## Sumy Music（目前支持鸿蒙手机端API24及以上设备）
> 是什么？
- 你是否遇到过单平台因为歌曲版权而无法播放，不得已在你的设备塞满不同音乐软件的经历？
- 你是否遇到过因为辛苦下载一堆爱听的音乐，但是非常占据手机空间不得已放入网盘却无法从本地听歌的经历？
- 所以，他来了：
- **Sumy Music：** *一款鸿蒙原生音乐播放器，支持多音源聚合搜索、自建API、WebDAV云盘播放、数据同步等功能*
> 承诺：
- **无任何收费！无无良广告！无引流弹窗！**
- **听你想听，回归音乐本质！**
## 功能特性

### 播放与搜索
- 多音源聚合搜索（小我、小狗、小QQ、小云、小咕）
- 自建API搜索（支持自定义API地址）
- 插件化音源管理（支持导入JSON/JS插件）
- 歌词显示（逐行高亮、桌面歌词）
- 播放队列管理、多种播放模式

### 歌单管理
- 自建歌单（创建、编辑、排序）
- 本地音乐导入与播放
- WebDAV云盘歌单播放

### 数据同步
- 华为账号登录（获取头像昵称）
- WebDAV 全量数据备份与恢复（歌单、收藏、搜索记录、音源配置、主题设置等）

### 个性化
- 主题色自定义
- 深色/浅色模式
- 沉浸光感材质UI

## 技术栈

- **HarmonyOS** Stage模型
- **ArkTS** + ArkUI 声明式UI
- **API 26** (HarmonyOS 6.0)
- 关键Kit：AccountKit、NetworkKit、CoreFileKit、MediaKit

## 项目结构

```
entry/src/main/ets/
├── components/          # UI组件（播放器、搜索栏、歌曲卡片等）
├── database/            # 数据库管理（relationalStore）
├── entryability/        # Ability入口
├── model/               # 数据模型定义
├── pages/               # 页面（主页、搜索、设置、详情）
├── utils/               # 工具类（API、播放器、主题、同步、账号）
│   ├── AccountManager.ets    # 华为账号登录
│   ├── MusicApi.ets          # 音乐搜索API
│   ├── SelfHostedApi.ets     # 自建API
│   ├── WebDavSync.ets        # WebDAV数据同步
│   ├── AudioPlayer.ets       # 音频播放
│   ├── SourceManager.ets     # 音源插件管理
│   └── ThemeManager.ets      # 主题管理
└── resources/           # 资源文件
```

## 开发环境

- DevEco Studio 6.0+
- HarmonyOS SDK 26.0+
- 编译目标：HarmonyOS 6.0


## 权限说明

| 权限 | 用途 |
|------|------|
| INTERNET | 网络请求（搜索、播放） |
| GET_NETWORK_INFO | 检测网络状态 |
| READ_MEDIA | 读取本地音乐文件 |
| WRITE_MEDIA | 写入下载文件 |
| KEEP_BACKGROUND_RUNNING | 后台播放 |

## 开源协议

MIT License

## 免责声明

本项目仅供学习和个人使用，不提供任何音源接口。项目中的音源搜索功能依赖第三方公开接口，使用者需自行承担相关风险。请支持正版音乐，通过官方渠道获取音乐资源。

## 下载体验
1. 开源仓库：Sumy Music V2.0.6.3
- [GITHUB](https://github.com/qitinyu/Sumy-Music/)
- [GITEE](https://gitcode.com/YQAMM/Sumyu)
>[!tip]
>由于个人技术有限以及官方限制要求，暂不考虑上架应用市场，随缘邀测，有能力的可自行<a id="one">侧载体验</a>
2. 完整更新日志：
- [GITHUB Wiki](https://github.com/qitinyu/Sumy-Music/wiki/)
3. [侧载教程](#one)
- [点击查看](https://yqamm.top/posts/harmony/260713hokit/)

## 安卓/PC同类型软件（非本人开发）：
- [LX Music](https://yqamm.top/posts/gonju/260406lx/)
