// =========================================================
// 友链配置 · 数据来自 links.config.json
// 编辑请通过 /admin 后台或修改 src/data/links.config.json
// =========================================================

import linksConfig from './links.config.json';

export interface LinkItem {
  name: string;
  url: string;
  avatar: string;
  desc: string;
  tags: string[];
}

export const friendLinks: LinkItem[] = linksConfig.friendLinks;
