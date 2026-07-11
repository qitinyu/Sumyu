---
title: "live2D-MOC3在Yuami的适配"
published: 2026-05-30
description: "MOC3在Yuami的适配"
tags: [BLOG]
licenseName: "CC BY 4.0"
author: "Yuami"
image: ""
pubDate: 2026-05-30
encrypted: false
password: "0723"
---

# Live2D moc3 看板娘适配指南

> 本文档详细记录了 Yuami 博客主题中 Live2D moc3 模型的适配原理、技术架构、文件结构以及实操步骤。  
>> 文章由AI生成,请谨慎阅读。

---

## 目录
---  

## 一、什么是 Live2D 与 moc3

Live2D 是一种将 2D 静态插画转化为可动态驱动的技术，广泛应用于虚拟主播、游戏角色互动和博客看板娘等场景。与传统的帧动画不同，Live2D 通过对原画的网格变形（Deform）、参数插值（Parameter Interpolation）和物理模拟（Physics）来实现流畅的动态效果，最终呈现出的动画既保留了原画的精细度，又具备了接近 3D 的动态表现力。

moc3 是 Live2D Cubism SDK 4.x 及以上版本使用的模型格式。相较于旧版的 moc（Cubism 2.x/3.x），moc3 在以下方面做出了显著改进：

- **二进制格式更紧凑**：moc3 采用高效的二进制序列化方案，模型文件体积更小，加载速度更快，适合 Web 端实时渲染场景。
- **表情系统升级**：moc3 引入了独立的 Expression 文件（`.exp3.json`），表情切换与动作触发解耦，同一模型可拥有多组表情组合。
- **物理模拟增强**：内置的 Physics 文件（`.physics3.json`）支持更精细的头发、衣物摆动模拟，参数可调性更强。
- **Pose 系统重构**：`.pose3.json` 允许按部件组设定默认可见性及切换逻辑，实现如眨眼交替、配件显隐等复杂效果。

在 Web 端渲染 moc3 模型，核心依赖是 **Cubism Core**（Live2D 官方提供的 WASM/JS 运行时）以及构建在其上的渲染框架。

---

## 二、技术架构总览

Yuami 博客的 Live2D 看板娘功能采用以下三层架构：

```
┌─────────────────────────────────────────────┐
│            应用层 (Live2D.astro)             │
│   配置读取 · 拖拽交互 · 模型切换 · 提示语    │
├─────────────────────────────────────────────┤
│         渲染框架层 (pixi-live2d-display)      │
│   PIXI.live2d.Live2DModel · 动作/表情触发    │
│   焦点追踪 · 碰撞检测 · 自适应缩放           │
├─────────────────────────────────────────────┤
│            底层引擎层                         │
│   ┌──────────────┐  ┌─────────────────────┐ │
│   │  PixiJS 6.x  │  │  Cubism Core (WASM) │ │
│   │  WebGL 渲染器 │  │  moc3 解析 + 运算    │ │
│   └──────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────┘
```

### 2.1 PixiJS（渲染引擎）

PixiJS 是一个高性能的 2D WebGL 渲染引擎，在 Live2D 看板娘中扮演以下关键角色：

- **创建 WebGL 画布**：通过 `new PIXI.Application()` 初始化一个透明的 WebGL Canvas 元素，作为模型的渲染载体。
- **管理渲染循环**：PixiJS 内置的 Ticker 机制每帧驱动模型更新，确保动画流畅播放。
- **提供舞台容器**：`pixiApp.stage` 作为模型的父级容器，负责坐标变换、缩放和定位。
- **交互事件桥接**：PixiJS 的事件系统将 DOM 层面的鼠标/触摸事件映射到模型内部的碰撞区域检测。

Yuami 使用的是 PixiJS 6.5.10 版本，通过 CDN 动态加载：

```javascript
await loadScript('https://cdn.jsdelivr.net/npm/pixi.js@6.5.10/dist/browser/pixi.min.js');
```

### 2.2 Cubism Core（底层运算引擎）

Cubism Core 是 Live2D 官方提供的核心运行时，负责以下工作：

- **解析 moc3 二进制文件**：将 `.moc3` 文件反序列化为内存中的模型数据结构（顶点、参数、网格、绘制指令等）。
- **参数插值运算**：每帧根据当前参数值（如角度 X/Y、眼睛开合、嘴巴张合等）计算各网格顶点的目标位置。
- **物理模拟**：根据 `.physics3.json` 的配置，计算摆锤（Pendulum）对顶点的附加位移，实现头发和衣物的自然摆动。
- **表情混合**：将表情参数按权重叠加到当前参数上，实现平滑的表情过渡。

Cubism Core 以 WASM 形式运行在浏览器中，Yuami 使用了双 CDN 回退策略加载：

```javascript
// 主 CDN：Live2D 官方
await loadScript('https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js');
// 备用 CDN：社区镜像
await loadScript('https://cdn.jsdelivr.net/gh/nicx519y/nicx519y.github.io@master/live2d-cubism-core/live2dcubismcore.min.js');
```

### 2.3 pixi-live2d-display（桥接层）

pixi-live2d-display 是连接 PixiJS 和 Cubism Core 的桥接库，它将 Live2D 模型封装为 PixiJS 的 DisplayObject，使得模型可以像普通精灵一样添加到 PixiJS 舞台上。该库主要提供：

- **`PIXI.live2d.Live2DModel` 类**：核心模型类，封装了模型的加载、渲染、交互和销毁逻辑。
- **`.from()` 静态方法**：异步加载模型，接收 `.model3.json` 的 URL，自动解析并下载所有关联资源（贴图、动作、表情等）。
- **交互接口**：`.focus(x, y)` 实现鼠标跟踪，`.motion(group)` 触发动作，`.expression(name)` 切换表情。
- **碰撞检测**：基于模型内部定义的 HitArea，判断点击位置对应模型的哪个区域。

Yuami 加载的是 Cubism 4 专用版本：

```javascript
await loadScript('https://cdn.jsdelivr.net/npm/pixi-live2d-display/dist/cubism4.min.js');
```

---

## 三、moc3 模型文件结构

一个完整的 moc3 模型由多个文件组成，它们通过 `.model3.json` 中心配置文件相互关联。典型的目录结构如下：

```
public/live2/models/cmtt/
├── cmtt.model3.json      ← 模型入口配置文件
├── cmtt.moc3             ← 模型二进制数据（核心）
├── cmtt.physics3.json    ← 物理模拟配置
├── cmtt.pose3.json       ← 姿势/部件切换配置
├── textures/
│   ├── texture_00.png    ← 贴图素材（可能有多张）
│   └── texture_01.png
├── motions/
│   ├── Idle.motion3.json      ← 待机动作
│   ├── TapBody.motion3.json   ← 点击身体触发的动作
│   └── ...
└── expressions/
    ├── smile.exp3.json        ← 微笑表情
    ├── angry.exp3.json        ← 生气表情
    └── ...
```

### 3.1 `.model3.json`（模型入口文件）

这是整个模型的核心索引文件，pixi-live2d-display 在加载模型时首先读取此文件，然后根据其中的路径逐一加载其他资源。其典型结构如下：

```json
{
  "Version": 3,
  "FileReferences": {
    "Moc": "cmtt.moc3",
    "Textures": ["textures/texture_00.png"],
    "Physics": "cmtt.physics3.json",
    "Pose": "cmtt.pose3.json",
    "Motions": {
      "Idle": [{ "File": "motions/Idle.motion3.json" }],
      "TapBody": [{ "File": "motions/TapBody.motion3.json" }]
    },
    "Expressions": [
      { "Name": "smile", "File": "expressions/smile.exp3.json" }
    ]
  },
  "Groups": [
    { "Target": "Parameter", "Name": "EyeBlink", "Ids": ["ParamEyeLOpen", "ParamEyeROpen"] },
    { "Target": "Parameter", "Name": "LipSync", "Ids": ["ParamMouthOpenY"] }
  ],
  "HitAreas": [
    { "Id": "HitAreaBody", "Name": "body" },
    { "Id": "HitAreaHead", "Name": "head" }
  ]
}
```

关键字段解析：

| 字段 | 说明 |
|------|------|
| `Moc` | moc3 二进制文件路径 |
| `Textures` | 贴图文件路径数组 |
| `Physics` | 物理模拟配置文件路径 |
| `Pose` | 姿势配置文件路径 |
| `Motions` | 动作分组字典，键为动作组名（如 `Idle`、`TapBody`），值为动作文件数组 |
| `Expressions` | 表情定义数组，每个条目包含 `Name` 和 `File` |
| `Groups` | 参数分组定义，如 `EyeBlink`（自动眨眼）和 `LipSync`（口型同步） |
| `HitAreas` | 碰撞区域定义，将模型内部区域 ID 映射为可读名称 |

### 3.2 `.moc3`（模型二进制数据）

这是模型的骨架数据文件，包含以下核心信息：

- **参数定义**：所有可驱动参数的 ID、最小值、最大值和默认值（如 `ParamAngleX` 范围 -30~30）。
- **绘制指令**：每个绘制组的贴图索引、混合模式、顶点坐标和 UV 映射。
- **网格变形数据**：每个参数在不同取值下对应的顶点偏移量（Deform 表），这是 Live2D 动画的核心数据。
- **绑定关系**：参数到绘制组的影响关系图。

`.moc3` 文件为专有的二进制格式，无法直接编辑，只能通过 Live2D Cubism Editor 生成。

### 3.3 动作文件 `.motion3.json`

每个动作文件描述了一段参数关键帧动画：

```json
{
  "Version": 3,
  "Meta": { "Duration": 2.0, "Fps": 30.0, "Loop": true },
  "Curves": [
    {
      "Target": "Parameter",
      "Id": "ParamAngleX",
      "Segments": [0, 0, 1, 1, 0, 2, 0.5, 0]
    }
  ]
}
```

其中 `Segments` 采用贝塞尔曲线编码，描述参数随时间的变化轨迹。`Loop: true` 表示动作循环播放（如待机呼吸动作）。

### 3.4 表情文件 `.exp3.json`

表情文件定义了一组参数的快照值和混合权重：

```json
{
  "Type": "Live2D Expression",
  "Parameters": [
    { "Id": "ParamEyeLOpen", "Value": 1.2, "Blend": "Add" },
    { "Id": "ParamMouthForm", "Value": 1.0, "Blend": "Overwrite" }
  ]
}
```

`Blend` 模式说明：`Overwrite` 直接覆写参数值，`Add` 在当前值基础上叠加，`Multiply` 做乘法混合。

---

## 四、Yuami 项目中的实现详解

### 4.1 涉及文件清单

| 文件 | 职责 |
|------|------|
| `config.ts` | Live2D 全局配置（开关、模型路径、尺寸、位置等） |
| `src/components/Live2D.astro` | 组件主体（HTML 结构 + 样式 + 脚本逻辑） |
| `src/layouts/BaseLayout.astro` | 引入 Live2D 组件，添加 `transition:persist` 保持页面切换时不重载 |
| `public/live2/models/` | 模型资源存放目录 |

### 4.2 配置项说明（`config.ts`）

```typescript
live2d: {
  enabled: true,           // 是否启用看板娘
  modelPath: '/live2/models/cmtt/',  // 默认模型路径（旧字段，兼容用）
  modelName: 'cmtt',       // 默认模型名称（旧字段，兼容用）
  position: 'left',        // 初始位置：'left' 或 'right'
  bottom: 0,               // 距底部偏移（像素）
  left: 10,                // 左侧偏移（position='left' 时生效）
  right: 10,               // 右侧偏移（position='right' 时生效）
  width: 300,              // Canvas 渲染宽度
  height: 500,             // Canvas 渲染高度
  scale: 0.15,             // 缩放比例（旧字段，当前代码使用自适应缩放）
  mobileOff: true,         // 移动端是否禁用
  modelList: [             // 模型列表（支持多模型切换）
    { name: 'cmtt', path: '/live2/models/cmtt/cmtt.model3.json' },
    { name: 'jk', path: '/live2/models/jk/jk.model3.json' },
  ],
},
```

### 4.3 初始化流程

Live2D 组件的初始化遵循以下流程：

```
页面加载
  │
  ├─ 检查 cfg.enabled && window.innerWidth > 768
  │     └─ 不满足则跳过初始化
  │
  ├─ 设置初始位置（left/right/bottom）
  │
  ├─ 绑定拖拽事件（鼠标 + 触摸）
  │
  ├─ initLive2D()
  │     ├─ 动态加载 PixiJS（如未加载）
  │     ├─ 动态加载 Cubism Core（双 CDN 回退）
  │     ├─ 动态加载 pixi-live2d-display/cubism4
  │     ├─ 创建 PIXI.Application（透明 Canvas）
  │     └─ loadModel(modelList[0].path)
  │           ├─ 清除旧模型（如有）
  │           ├─ PIXI.live2d.Live2DModel.from(url)
  │           ├─ 自适应缩放计算
  │           ├─ 居中 + 底部对齐定位
  │           ├─ 添加鼠标跟踪
  │           ├─ 绑定 HitArea 点击事件
  │           └─ 播放 Idle 动作
  │
  └─ 绑定控制按钮事件（切换模型 / 关闭看板娘）
```

### 4.4 自适应缩放算法

模型加载后，Yuami 采用以下策略将模型适配到 Canvas 尺寸：

```javascript
const canvasW = pixiApp.screen.width;   // Canvas 宽度（配置中的 width）
const canvasH = pixiApp.screen.height;  // Canvas 高度（配置中的 height）
const modelOrigW = currentModel.internalModel.originalWidth;   // 模型原始宽度
const modelOrigH = currentModel.internalModel.originalHeight;  // 模型原始高度

// 以高度为基准计算缩放比，留 8% 的边距
const fitScale = (canvasH * 0.92) / modelOrigH;
// 以宽度为约束计算缩放比，留 5% 的边距
const finalScale = Math.min(fitScale, (canvasW * 0.95) / modelOrigW);
currentModel.scale.set(finalScale);

// 水平居中，垂直底部对齐
currentModel.x = (canvasW - currentModel.width) / 2;
currentModel.y = canvasH - currentModel.height;
```

该算法确保模型在 Canvas 中完整显示，同时保留合理的边距，不会出现裁剪或溢出。

### 4.5 鼠标跟踪与交互

**焦点追踪**：通过监听 `mousemove` 事件，调用 `currentModel.focus(clientX, clientY)`，pixi-live2d-display 内部会将屏幕坐标映射为模型参数值（角度 X/Y），驱动模型头部/眼睛朝向鼠标位置。

**碰撞检测**：模型在 `.model3.json` 的 `HitAreas` 中定义了可交互区域（如 `body`、`head`）。当用户点击模型时，pixi-live2d-display 通过命中测试判断点击了哪个区域，触发 `hit` 事件：

```javascript
currentModel.on('hit', (hitAreas) => {
  if (hitAreas.includes('body')) {
    try { currentModel.motion('TapBody'); } catch {}
  }
  if (hitAreas.includes('head')) {
    try { currentModel.expression('smile'); } catch {}
  }
});
```

**拖拽交互**：Yuami 实现了完整的拖拽功能，支持鼠标和触摸。拖拽时将定位方式从 `bottom/right` 切换为 `left/top`，并限制模型不超出视口范围。通过 `hasMoved` 标志区分"点击"和"拖拽"，避免拖拽结束时误触发点击事件。

### 4.6 `transition:persist` 页面保持

Yuami 基于 Astro 的 View Transitions 实现页面无刷新切换。默认情况下，页面切换会销毁当前页面的 DOM 并重建，导致 Live2D 模型被销毁并重新初始化，产生闪烁和重复加载。

为解决此问题，Live2D 组件的包裹元素使用了 `transition:persist`：

```astro
<div class="live2d-wrapper" id="live2dWrapper" transition:persist="live2dWrapper">
```

`transition:persist` 告诉 Astro 在页面切换时保留该 DOM 元素，不进行销毁和重建。这样 Live2D 的 Canvas、PixiJS 应用实例和模型实例在页面切换后依然存活，避免了重复初始化的问题。

### 4.7 模型切换与关闭

**模型切换**：当 `modelList` 中配置了多个模型时，切换按钮可见。点击后循环切换到下一个模型：

```javascript
switchBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  currentModelIdx = (currentModelIdx + 1) % modelList.length;
  loadModel(modelList[currentModelIdx].path);
});
```

`loadModel` 函数在加载新模型前会先销毁旧模型（`currentModel.destroy()`），防止内存泄漏。

**关闭看板娘**：点击关闭按钮后，隐藏 Live2D 包裹元素，并在页面左下角生成一个恢复按钮（猫图标），点击后恢复显示。

---

## 五、如何添加新的 moc3 模型

### 步骤 1：准备模型文件

从 Live2D 模型资源站（如 [Live2D 官方示例](https://www.live2d.com/download/sample-data/)、[GitHub 社区模型](https://github.com/topics/live2d)）获取 moc3 格式的模型文件。确保模型包含完整的 `.model3.json` 及其引用的所有资源文件。

### 步骤 2：放置模型文件

将模型文件夹放入 `public/live2/models/` 目录下：

```
public/live2/models/
├── cmtt/          ← 已有模型
│   └── ...
├── jk/            ← 已有模型
│   └── ...
└── new-model/     ← 新增模型
    ├── new-model.model3.json
    ├── new-model.moc3
    ├── new-model.physics3.json
    ├── textures/
    │   └── texture_00.png
    ├── motions/
    │   └── Idle.motion3.json
    └── expressions/
        └── ...
```

> **重要**：`public/` 目录下的文件在 Astro 构建时会原样复制到输出目录，因此模型路径直接以 `/live2/models/` 开头即可访问。

### 步骤 3：更新配置

在 `config.ts` 的 `live2d.modelList` 数组中添加新模型条目：

```typescript
modelList: [
  { name: 'cmtt', path: '/live2/models/cmtt/cmtt.model3.json' },
  { name: 'jk', path: '/live2/models/jk/jk.model3.json' },
  { name: 'new-model', path: '/live2/models/new-model/new-model.model3.json' },  // 新增
],
```

### 步骤 4：验证

1. 启动开发服务器：`npm run dev`
2. 页面加载后，Live2D 看板娘应自动显示默认模型
3. 点击切换按钮（衬衫图标），循环切换到新模型
4. 检查模型是否正常显示、动作是否播放、鼠标跟踪是否工作

---

## 六、CDN 加载策略与依赖版本

Yuami 采用动态脚本加载策略，在运行时按需加载三个依赖库，避免首屏加载不必要的资源：

| 依赖库 | 版本 | CDN 地址 | 加载时机 |
|--------|------|----------|----------|
| PixiJS | 6.5.10 | `cdn.jsdelivr.net/npm/pixi.js@6.5.10` | `typeof PIXI === 'undefined'` 时 |
| Cubism Core | 最新 | `cubism.live2d.com/sdk-web/cubismcore/`（主）<br>`cdn.jsdelivr.net/gh/nicx519y/...`（备） | `typeof Live2DCubismCore === 'undefined'` 时 |
| pixi-live2d-display | 最新（Cubism4） | `cdn.jsdelivr.net/npm/pixi-live2d-display/dist/cubism4.min.js` | `!PIXI.live2d` 时 |

**版本兼容性注意**：

- PixiJS 必须使用 v6.x，pixi-live2d-display 目前不兼容 PixiJS v7/v8。
- `cubism4.min.js` 是 pixi-live2d-display 的 Cubism 4 专用构建，仅支持 moc3 格式，不支持旧版 moc 格式。如果需要同时支持 Cubism 2/3/4 模型，应加载 `index.min.js`。
- Cubism Core 无固定版本号，Live2D 官方持续更新，社区镜像可能存在延迟。

---

## 七、常见问题与排查

### 7.1 模型加载失败（控制台报错 404）

**原因**：`.model3.json` 中引用的文件路径与实际文件路径不匹配。pixi-live2d-display 以 `.model3.json` 的 URL 为基准路径解析相对路径。

**解决**：确保模型文件夹中的相对路径与 `.model3.json` 中的引用完全一致。特别注意大小写（Linux 服务器区分大小写）。

### 7.2 模型显示白屏或透明

**原因**：贴图文件缺失或格式不正确。moc3 模型使用 PNG 贴图，如果贴图无法加载，模型会显示为白色轮廓或完全透明。

**解决**：检查 `textures/` 目录下的 PNG 文件是否完整，确认 `.model3.json` 中 `Textures` 字段引用的路径正确。

### 7.3 模型动作不触发

**原因**：模型没有定义对应的动作组，或动作组名称与代码中调用 `motion()` 的参数不匹配。

**解决**：打开 `.model3.json`，查看 `Motions` 字段中定义的动作组名。如果模型只有 `Idle` 而没有 `TapBody`，则点击身体不会触发动作。需要在代码中做容错处理（Yuami 已使用 `try-catch` 包裹）。

### 7.4 页面切换后看板娘消失

**原因**：未使用 `transition:persist`，Astro View Transitions 在页面切换时重建了 DOM，导致 Canvas 被销毁。

**解决**：确保 Live2D 包裹元素添加了 `transition:persist="live2dWrapper"` 属性，并且在 `BaseLayout.astro` 中只引入一次 Live2D 组件。

### 7.5 移动端不显示

**原因**：`mobileOff: true` 配置下，代码中通过 `window.innerWidth > 768` 判断，移动端跳过初始化。同时 CSS 中设置了 `@media (max-width: 768px) { .live2d-wrapper { display: none; } }`。

**解决**：如果需要在移动端显示，将 `mobileOff` 设为 `false`，并移除 CSS 中的媒体查询隐藏规则（注意移动端性能可能受影响）。

### 7.6 模型加载缓慢

**原因**：moc3 模型的贴图文件通常较大（单张 500KB~2MB），多个动作和表情文件也会增加请求次数。

**优化建议**：
- 对贴图进行 WebP 格式转换（需同时修改 `.model3.json` 中的扩展名）
- 使用 CDN 加速模型资源的分发
- 减少动作文件数量，只保留核心动作

---

## 八、架构设计总结

Yuami 的 Live2D 看板娘实现遵循了以下设计原则：

1. **配置驱动**：所有行为参数集中在 `config.ts`，无需修改组件代码即可调整开关、位置、尺寸和模型列表。
2. **按需加载**：三个外部依赖库通过运行时动态 `<script>` 注入，不影响首屏加载性能。
3. **双 CDN 回退**：Cubism Core 使用官方 CDN + 社区镜像的双重保障，提高可用性。
4. **渐进增强**：Live2D 功能完全可选，加载失败时展示 Canvas 占位提示，不影响博客核心功能。
5. **页面保持**：利用 Astro `transition:persist` 避免页面切换时的重复初始化，保证用户体验连续性。
6. **交互友好**：拖拽与点击通过位移阈值区分，支持鼠标和触摸两种交互方式，移动端自动隐藏。

---

> | 适用主题：Yuami v1.0.8+ | 最后更新：2026-05-30

---

