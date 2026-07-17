---
title: "Sumy Music更新日志"
published: 2026-07-17
description: "sumy music更新日志"
tags: [Sumy]
licenseName: "CC BY 4.0"
author: "YuQi"
pubDate: 2026-07-17
comment_id: "260717"
encrypted: false
password: "0723"
pinned: false
---
 
---
### <span style="color:red"><u><i>回归质朴,回归音乐,回归本质</i></u>
---


## Sumy V1.0.9
<details>
<summary>点击查看</summary>

> [!warning]
> 修复

> **设置修改**

</details>

---

## Sumy V1.0.8
<details>
<summary>点击查看</summary>

> [!warning]
> - 该版本存在播控中心和同时运行时播控中心无法接管的问题
> - 存在因音源不稳定产生的音乐无法播放和控制中心无法正常接管音乐的问题

---

> 修改:

- [] **重点**:本地音乐可导入但是无法正常识别和播放的问题
- [] **重点**:加入桌面歌词
- [] **引入**:访问[Arkts进度加载](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-loadingprogress)引入官方加载动画
- [] **引入**：访问[沉浸光感](https://gitcode.com/HarmonyOS_Samples/Spatialization/blob/dev/README.md)，给软件UI适配沉浸光感

1. 开屏

- [] 延长开屏动画时长，主体居中展示软件logo/软件名称/官方加载动画/版权声明：Sumy By YuQi。

2. 歌单

- [] 歌单内歌曲长按菜单位置调整为最右侧，占据后方空白位置

3. 播放器悬浮窗

- [] 默认左侧页签栏+迷你栏，左右分开。迷你栏圆形与左侧页签栏分别独立，参考[底部页签的悬浮样式](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ui-design-hds-tabs-bar-floating#%E8%BF%B7%E4%BD%A0%E6%A0%8F)
- 逻辑：默认展示页签栏（轩窗/琴瑟/陋室）+迷你栏（音乐图标）
- 点击迷你栏时，向左滑动展示迷你栏折叠内容：音乐播放器/歌曲名/下方为歌手和歌词/右侧为上一首/暂停或播放/下一首图标。同时页签栏折叠成为新的迷你栏，位于左侧。

4. 气泡弹窗

- [] 自定义弹窗

5. 播放详情页

- [] 将左滑式切入改为底部上滑式。点击音乐迷你栏展开音乐播放器悬浮窗，然后点击音乐播放器向上展开音乐播放详情页
- [] 详情页取消上部的返回箭头'<'/歌曲名
- [] 播放器底部区域整体上移，上/播放/下三个操作按钮上移，取消最低部的三个按钮。
- [] 上一首的左侧添加'列表'图标，点击后向上弹出歌曲列表，整体竖排布局。上方左侧是向下的箭头，右侧是随机播放/单曲循环/顺序播放切换的按钮。下一首右侧添加一个三点图标。点击三点图标，从向上弹出菜单（竖排卡片排列）：添加歌单/分享歌曲。
- [] 可以控制进度条控制乐曲的播放，歌词位置同步调整。

6. 音乐播放页-歌词

- [] 上方的歌曲名稍微下移
- [] 歌词放大加粗条目由最上方第一条改为居中位置放大加粗。才用三级字体大小排布，从中间最大依次向上下减小1字号/0.5字号

</details>

---

## Sumy V1.0.7

<details>
  <summary>点击查看</summary>

>增加:
- [✅] 后台长时间播放不会被杀后台
- [✅] 音乐播放可以被播控中心接管，通知栏/锁屏均可以显示和单独控制播放
- [✅] 更改app包名/签名/应用名/图标
---

### Sumy V1.0.7.1
>[!warning] 
> 该版本存在播控中心和同时运行时播控中心无法接管的问题
---
>修改:
- [] **重点**:本地音乐可导入但是无法正常识别和播放的问题
- [] **重点**:加入桌面歌词
- [] 修复本地音乐导入后无法正常识别和播放的问题
- [] 修复本地音乐导入后无法正常识别和播放的问题
- [] 修复本地音乐导入后无法正常识别和播放的问题
- [] 修复本地音乐导入后无法正常识别和播放的问题

</details>

---

## SHMY V1.0.6

<details>
<summany>点击查看</summany>

>修改:
1. 轩窗:
- 用户登录和统计稍微向下移动一些,目前来说太高了.
- 本地音乐应该折叠起来,像歌单一样,先展示整体卡片,点击展开后展示具体内容.
- 直接去除所有和下载有关的内容,包括轩窗最下方的下载列表/点击长按歌曲弹出悬浮窗的下载按钮.

>修复:
1. 搜索无法触发
2. 本地音乐无法播放

---
### SHMY V1.0.6.1
>修改:
1. 将底部悬浮窗稍微上移,此时位于最顶部,应该距离底部始终保持10-20px的距离.
2. 目前悬浮窗的下方有一层背景可以完全去除
3. 红框内的背景为什么一直存在且删不掉,如果实在删不掉,就把悬浮窗放置到中间,大概绿框的位置.

---
### SHMY V1.0.6 图示
<details>
<summary>展开查看</summary>

![Sumy 106](https://i.postimg.cc/3RwPWYp9/shmy-1061.jpg)
![Sumy 106](https://i.postimg.cc/C1KWdSDc/shmy-1062.jpg)
![Sumy 106](https://i.postimg.cc/KzYd4xLD/shmy-1063.jpg)
![Sumy 106](https://i.postimg.cc/DZztmnsD/shmy-1064.jpg)
![Sumy 106](https://i.postimg.cc/rmY7r3C7/shmy-1065.jpg)
![Sumy 106](https://i.postimg.cc/cH5Pn2Mb/shmy-1067.jpg)
![Sumy 106](https://i.postimg.cc/cH5Pn2Bq/shmy-1068.jpg)
![Sumy 106](https://i.postimg.cc/wvbnmZQd/shmy-1069.jpg)
</details>

</details>

---

## SHMY V1.0.5-V1.0.0
:spoiler[如果你要问我这部分的日志在哪,别问,问就是之前的忘记写了🤣]








