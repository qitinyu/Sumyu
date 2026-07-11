// =========================================================
// 留芳 · 相册数据
// =========================================================
// 独立文件夹相册结构:
//   每个相册是一个独立单元 (cover + name + desc + images[])
//   相册列表以 3 列 grid 布局展示封面
//   点击相册封面进入具体相册详情页, 内部图片以 grid 布局排列
// 支持两种图片来源:
//   1. 在线图片 URL (https://...)
//   2. 本地图片路径, 放在 public/img/files/ 目录下, 填写 '/img/files/xxx.jpg'
//      支持多种格式: .jpg / .png / .webp / .gif / .avif 等
// =========================================================

export interface GalleryImage {
  // 图片地址 (URL 或本地路径)
  src: string;
  // 图片标题 (可选, 显示在放大查看时)
  title?: string;
  // 图片描述 (可选)
  desc?: string;
}

export interface GalleryAlbum {
  // 相册唯一标识 (用于 URL 路由, 例如 /files/album-1)
  // 必须为英文/数字/短横线, 不能重复
  slug: string;
  // 相册名称
  name: string;
  // 相册描述 (可选)
  desc?: string;
  // 相册封面 (默认取第一张图片)
  cover?: string;
  // 相册内的图片列表
  images: GalleryImage[];
}

// 全部相册
export const galleryAlbums: GalleryAlbum[] = [
  {
    slug: 'hutao',
    name: '胡桃',
    desc: '幽蝶能留一缕芳',
    cover: '/liufang/胡桃/cover.webp',
    images: [
      //{ src: 'https://picsum.photos/seed/spring1/800/600', title: '春风十里' },
      //{ src: 'https://picsum.photos/seed/spring2/800/600', title: '桃花依旧' },
      //{ src: 'https://picsum.photos/seed/spring3/800/600', title: '柳絮飞扬' },
      //{ src: 'https://picsum.photos/seed/spring4/800/600', title: '燕归巢' },
      //{ src: 'https://picsum.photos/seed/spring5/800/600', title: '细雨如丝' },
      //{ src: 'https://picsum.photos/seed/spring6/800/600', title: '陌上花开' },
    ],
  },
  {
    slug: 'yeshunguang',
    name: '叶瞬光',
    desc: '我信任你,就像我信任你这样',
    cover: '/liufang/叶瞬光/cover.webp',
    images: [
      //{ src: 'https://picsum.photos/seed/summer1/800/600', title: '潮起潮落' },
      //{ src: 'https://picsum.photos/seed/summer2/800/600', title: '夕阳无限' },
      //{ src: 'https://picsum.photos/seed/summer3/800/600', title: '椰影婆娑' },
      //{ src: 'https://picsum.photos/seed/summer4/800/600', title: '海天一色' },
    ],
  },
  {
    slug: 'qingyi',
    name: '青衣',
    desc: '红透晚烟青',
    cover: '/liufang/青衣/cover.webp',
    images: [
      //{ src: 'https://picsum.photos/seed/autumn1/800/600', title: '银杏大道' },
      //{ src: 'https://picsum.photos/seed/autumn2/800/600', title: '枫叶如丹' },
      //{ src: 'https://picsum.photos/seed/autumn3/800/600', title: '秋水长天' },
      //{ src: 'https://picsum.photos/seed/autumn4/800/600', title: '层林尽染' },
      //{ src: 'https://picsum.photos/seed/autumn5/800/600', title: '落霞孤鹜' },
    ],
  },
  {
    slug: 'qiyana',
    name: '琪亚娜',
    desc: '琪亚娜,出击!',
    cover: '/liufang/琪亚娜/cover.webp',
    images: [
      //{ src: 'https://picsum.photos/seed/winter1/800/600', title: '初雪降临' },
      //{ src: 'https://picsum.photos/seed/winter2/800/600', title: '银装素裹' },
      //{ src: 'https://picsum.photos/seed/winter3/800/600', title: '寒梅傲雪' },
    ],
  },
  {
    slug: 'ailixiya',
    name: '爱莉希雅',
    desc: '为世界上所有美好而战',
    cover: '/liufang/爱莉希雅/cover.webp',
    images: [
      //{ src: 'https://picsum.photos/seed/city1/800/600', title: '霓虹闪烁' },
      //{ src: 'https://picsum.photos/seed/city2/800/600', title: '车水马龙' },
      //{ src: 'https://picsum.photos/seed/city3/800/600', title: '夜色迷人' },
      //{ src: 'https://picsum.photos/seed/city4/800/600', title: '繁华似锦' },
    ],
  },
  {
    slug: 'les',
    name: 'LES',
    desc: '她的眼里全都是她',
    cover: '/liufang/LES/cover.webp',
    images: [
      //{ src: 'https://picsum.photos/seed/travel1/800/600', title: '古镇晨雾' },
      //{ src: 'https://picsum.photos/seed/travel2/800/600', title: '山间小路' },
      //{ src: 'https://picsum.photos/seed/travel3/800/600', title: '溪水潺潺' },
      //{ src: 'https://picsum.photos/seed/travel4/800/600', title: '云海日出' },
      //{ src: 'https://picsum.photos/seed/travel5/800/600', title: '老街旧巷' },
      //{ src: 'https://picsum.photos/seed/travel6/800/600', title: '晚霞归途' },
    ],
  },
];

// 通过 slug 获取相册
export function getAlbumBySlug(slug: string): GalleryAlbum | undefined {
  return galleryAlbums.find(a => a.slug === slug);
}
