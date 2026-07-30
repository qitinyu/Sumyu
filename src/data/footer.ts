// =========================================================
// 页脚配置 · 数据来自 footer.config.json
// 编辑请通过 /admin 后台或修改 src/data/footer.config.json
// =========================================================

import rawFooterConfig from './footer.config.json';

export const footerConfig = rawFooterConfig as {
  brand: { title: string; subtitle: string };
  copyright: { year: number; owner: string; siteUrl: string; email: string };
  powered: { framework: string; theme: string; version: string };
  icp: string;
  customLines: string[];
};
