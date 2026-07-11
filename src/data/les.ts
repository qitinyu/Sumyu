// =========================================================
// 清言 · LES (创作与灵感) 数据
// =========================================================
// 卡片样式: 顶部封面图 + 下方详情 (纵向布局)
//   - cover: 封面图片 URL 或本地路径 (/les/xxx.png)
//   - url: 点击卡片跳转地址 (作品集、外部链接等, 留空则不可点击)
//   - 字段: title 标题 / type 原著 / status 状态 / cv 配音 / cp 配对 / comment 短评
// =========================================================

export interface LesItem {
  title: string;        // 作品标题
  cover: string;        // 封面图片 URL 或本地路径
  type: string;         // 原著 (例如 "七小皇叔原著")
  status: string;       // 状态 (例如 "全完结" / "连载中")
  cv: string;           // 配音 (例如 "陶典|龟娘")
  cp: string;           // 配对 (例如 "于舟|向挽")
  comment: string;      // 短评 / 感悟
  url: string;          // 跳转地址 (留空则不可点击)
}

// 清言页面元数据 (兼容旧接口)
export const lesPageMeta = {
  title: '清言 · LES',
  description: '清言 · Sumyu 的百合作品收藏与感悟',
  breadcrumb: '墨竹 / 清言',
  heading: '清言',
  subtitle: 'LES · 她们之间的故事与悸动',
  icon: 'mdi:book-heart-outline',
  emptyIcon: 'mdi:book-off-outline',
  emptyText: '暂无作品 · 请在 src/data/les.ts 添加',
};

// LES 作品列表 (来自 les.ts.txt)
export const lesList: LesItem[] = [
  {
    title: '帮我拍拍',
    cover: 'https://i.postimg.cc/28VCgCXL/帮我拍拍.png',
    type: '七小皇叔原著',
    status: '全完结',
    cv: '陶典|龟娘',
    cp: '于舟|向挽',
    comment: '于舟的眼里都是向挽',
    url: 'https://www.123865.com/s/iMSmjv-3MLo?pwd=0723#',
  },
  {
    title: '晚潮',
    cover: 'https://i.postimg.cc/mZM6pJTY/wc.jpg',
    type: '七小皇叔原著',
    status: '一完结',
    cv: '龟娘|穆雪婷',
    cp: '向挽|晁新',
    comment: '这里不用输入文本',
    url: 'https://www.123865.com/s/iMSmjv-hMLo?pwd=0723#',
  },
  {
    title: '白月光omega总想拥有我',
    cover: 'https://i.postimg.cc/sDPWrzFR/月光3.png',
    type: '七小皇叔原著',
    status: '全完结',
    cv: '陶典|龟娘',
    cp: '季潇|魏轻语',
    comment: '我明白了，魏轻语一吃醋就不理人',
    url: 'https://www.123865.com/s/iMSmjv-0hLo?pwd=0723#',
  },
  {
    title: '孤掷温柔',
    cover: 'https://i.postimg.cc/KvQpTTVt/gu-zhi-wen-rou.jpg',
    type: '闵然原著',
    status: '全完结',
    cv: '陶典|子楚',
    cp: '陆子筝|江怀溪',
    comment: '你，如漫长黑夜里的一丝烛光，微弱却足以令我孤注一掷',
    url: 'https://www.123865.com/s/iMSmjv-KhLo?pwd=0723',
  },
  {
    title: '今日离港',
    cover: 'https://i.postimg.cc/TPdsJdPS/jin-ri-li-gang.jpg',
    type: '鱼宰原著',
    status: '全完结',
    cv: '陶典|风镜',
    cp: '陆诗邈|薛桐',
    comment: '于舟的眼里都是向挽',
    url: 'https://www.123865.com/s/iMSmjv-nQLo?pwd=0723#',
  },
  {
    title: '飘飘',
    cover: 'https://i.postimg.cc/d3Mc3TbY/pp.jpg',
    type: '七小皇叔原著',
    status: '全完结',
    cv: '子楚|李蝉妃',
    cp: '陈飘飘|陶浸',
    comment: '于舟的眼里都是向挽',
    url: 'https://www.123865.com/s/iMSmjv-KBLo?pwd=0723#',
  },
  {
    title: '我的影后绯闻cp掉马了',
    cover: 'https://i.postimg.cc/kGrPGtkZ/yhcp1.png',
    type: '辞旧迎卿原著',
    status: '全完结',
    cv: '陶典|龟娘',
    cp: '于舟|向挽',
    comment: '喜欢是放肆，爱是克制。她脸红了，她好爱她！',
    url: 'https://www.123865.com/s/iMSmjv-oBLo?pwd=0723#',
  },
  {
    title: '她的山她的海',
    cover: 'https://i.postimg.cc/RVDpbBjc/tsth.webp',
    type: '扶华原著',
    status: '全完结',
    cv: '陶典|穆雪婷',
    cp: '池唐|游余',
    comment: '她为她筑起山峦般的依靠，她予她涌动海浪似的柔情',
    url: 'https://www.123865.com/s/iMSmjv-ZTLo?pwd=0723#',
  },
  {
    title: 'LES ANIME',
    cover: 'https://i.postimg.cc/ZnG3FJL7/les78.webp',
    type: '佚名',
    status: '连载中',
    cv: '--|--',
    cp: '--|--',
    comment: 'LES ANIME 全体保持嘴角下扬',
    url: 'https://www.123865.com/s/iMSmjv-3MLo?pwd=0723#',
  },
  {
    title: 'LES NOVEL',
    cover: 'https://i.postimg.cc/RVB6C0V4/les2.webp',
    type: '佚名',
    status: '连载中',
    cv: '--|--',
    cp: '--|--',
    comment: 'LES NOVEL 全体保持嘴角上扬',
    url: 'https://www.123865.com/s/iMSmjv-3MLo?pwd=0723#',
  },
  {
    title: 'LES GAME',
    cover: 'https://i.postimg.cc/TPL6KVmP/les3.webp',
    type: '佚名',
    status: '连载中',
    cv: '--|--',
    cp: '--|--',
    comment: 'LES GAME 全体保持嘴角不变',
    url: 'https://pan.xunlei.com/s/VO9NIcBdoaYEBLa0rtM51aIrA1',
  },
  {
    title: 'LES 百广大全',
    cover: 'https://i.postimg.cc/fTNtWbTM/les1.webp',
    type: '佚名',
    status: '连载中',
    cv: '--|--',
    cp: '--|--',
    comment: 'LES 百广大全 全体没有嘴角',
    url: 'https://my.feishu.cn/share/base/query/shrcnalxWt6VFN480RzFVTs6ipb',
  },
];
