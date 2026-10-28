// =========================================================
// 页脚配置 · 所有页脚信息集中在此文件编辑
// =========================================================

export const footerConfig = {
  // 第一行: 站点品牌 / 标语
  brand: {
    title: 'SUMYU',
    subtitle: '轩窗听雨 • 岁月生香',
  },
  // 第二行: 版权信息
  copyright: {
    year: 2026,
    owner: 'YuQi',
    siteUrl: 'https://yqamm.top',
    email: '484894496@qq.com',
  },
  // 第三行: 技术栈信息
  powered: {
    framework: 'Astro',
    theme: 'Sumyu',
    version: '1.1.5',
  },
  // 备案信息 (可选, 留空则不显示该行)
  icp: '',
  // 自定义额外行 (可选, 每行一段文字, 支持 HTML)
  customLines: ["<a href='https://icp.gov.moe/?keyword=20268826' target='_blank'>萌ICP备20268826号</a>"],
};
