// =========================================================
// 页脚配置 · 所有页脚信息集中在此文件编辑
// 取消 Footer.astro 内的硬编码, 全部由此文件统一控制
// =========================================================

export const footerConfig = {
  // 第一行: 站点品牌 / 标语
  brand: {
    title: 'SUMYU',
    subtitle: '轩窗听雨 · 岁月生香',
  },
  // 第二行: 版权信息
  // year: 版权年份 (默认当前年份)
  // owner: 版权所有者
  // siteUrl: 站点永久地址
  // email: 联系邮箱
  copyright: {
    year: 2026,
    owner: 'YuQi',
    siteUrl: 'https://yqamm.top/',
    email: '484894496@qq.com',
  },
  // 第三行: 技术栈信息
  // framework: 使用的框架
  // theme: 主题名称
  // version: 主题版本号
  powered: {
    framework: 'Astro',
    theme: 'Sumyu',
    version: '1.0.6',
  },
  // 备案信息 (可选, 留空则不显示该行)
  icp: '',
  // 自定义额外行 (可选, 每行一段文字, 支持 HTML)
  customLines: [] as string[],
};
