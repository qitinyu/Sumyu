// =========================================================
// 闲游 · 游戏数据
// =========================================================
// 顶部轮播图配置 (gamesCarousel): 在 games 页面顶部展示
//   - images: 轮播图片数组, 支持 URL 与本地路径 /img/games/xxx.jpg
//   - interval: 轮播间隔 (毫秒), 默认 5000
// 游戏列表 (gameList): 每个游戏卡片 3 列 grid 布局
//   - 封面图片位于 /public/img/games/, 本地路径填写 '/img/games/xxx.jpg'
//   - 点击卡片跳转到 url (Steam、官网等外部链接)
// =========================================================

export interface GameItem {
  id: string;              // 唯一标识
  name: string;            // 游戏名称
  playTime: string;        // 游玩时间区间 (例如 "2025.06---至今")
  imageUrl: string;        // 封面图片 URL 或本地路径
  description: string;     // 一句话感悟
  url: string;             // 点击卡片跳转地址 (官网 / Steam)
  tags: string[];          // 标签数组 (例如 ["动作", "角色扮演"])
  rating: number;          // 评分 (1-5 星)
  company: string;         // 发行公司
  releaseDate: string;     // 发行日期
}

// 顶部轮播图数据 (来自 game.ts.txt)
export const carouselImages = [
  { src: 'https://i.postimg.cc/tg8TTK1g/崩坏三1.jpg', alt: '游戏轮播图1' },
  { src: 'https://i.postimg.cc/xjRzs7rk/原神1.jpg', alt: '游戏轮播图2' },
  { src: 'https://i.postimg.cc/YSHDH9R2/绝区零1.jpg', alt: '游戏轮播图3' },
];

// 闲游感悟
export const reflectionText = '我们不会孤军奋战,我们还要携手向前!';

// 顶部轮播图配置 (兼容旧接口)
export const gamesCarousel = {
  enabled: true,
  interval: 5000,
  get images() {
    return carouselImages.map((c) => c.src);
  },
};

// 游戏列表 (来自 game.ts.txt)
export const gameList: GameItem[] = [
  {
    id: 'honkai-3',
    name: '崩坏三',
    playTime: '2025.06---至今',
    imageUrl: 'https://i.postimg.cc/3w4G6Y7t/bhs.jpg',
    description: '为世界所有美好而战',
    url: 'https://bh3.mihoyo.com',
    tags: ['动作', '角色扮演', '女武神'],
    rating: 5,
    company: '米哈游',
    releaseDate: '2016-10-14',
  },
  {
    id: 'genshin-impact',
    name: '原神',
    playTime: '2021.06---至今',
    imageUrl: 'https://i.postimg.cc/g2PBGzNM/ys.jpg',
    description: '我们终将重逢',
    url: 'https://ys.mihoyo.com',
    tags: ['开放世界', '角色扮演', '冒险'],
    rating: 5,
    company: '米哈游',
    releaseDate: '2020-09-28',
  },
  {
    id: 'zenless-zone-zero',
    name: '绝区零',
    playTime: '2024.07---至今',
    imageUrl: 'https://i.postimg.cc/jjnpjgyZ/zzz8.webp',
    description: '新艾利都永不落幕',
    url: 'https://zzz.mihoyo.com',
    tags: ['动作', '末日生存', '空洞奇遇'],
    rating: 5,
    company: '米哈游',
    releaseDate: '2024-07-04',
  },
  {
    id: 'starry-farm',
    name: '星布谷地',
    playTime: '202x.0x---XXX',
    imageUrl: 'https://i.postimg.cc/TwqHyZhG/xbgd.jpg',
    description: 'XXXXXXXXX',
    url: 'https://planet.mihoyo.com/home',
    tags: ['模拟经营', '休闲', '农场'],
    rating: 5,
    company: '米哈游',
    releaseDate: '202x-xx',
  },
  {
    id: 'minecraft',
    name: 'Minecraft',
    playTime: '2016.06---至今',
    imageUrl: 'https://i.postimg.cc/gkVttfKr/Minecraft.avif',
    description: 'MC不灭，方块人不悔',
    url: 'https://www.minecraft.net',
    tags: ['沙盒', '创造', '生存'],
    rating: 5,
    company: 'Mojang',
    releaseDate: '2011-11-18',
  },
];

// 兼容旧引用 (games)
export const games = gameList;
