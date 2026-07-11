# Live2D 模型放置目录

将 moc3 模型文件夹放到此处，每个模型一个子目录。

例如:
```
public/live2/models/cmtt/
  cmtt.model3.json
  cmtt.moc3
  cmtt.2048/texture_00.png
  cmtt.motion3.json
  ...
public/live2/models/jk/
  jk.model3.json
  jk.moc3
  ...
```

在 `src/consts.ts` 的 `LIVE2D.modelList` 中添加模型路径，例如:

```ts
modelList: [
  { name: 'cmtt', path: '/live2/models/cmtt/cmtt.model3.json' },
  { name: 'jk',   path: '/live2/models/jk/jk.model3.json' },
],
```

浏览器端可通过设置面板的"看板娘模型"按钮切换。
