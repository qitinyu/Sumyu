import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SOURCE = path.resolve(__dirname, '..');
const TARGET = process.argv[2] || process.env.SUMYU_REPO_PATH || '';

// 需要同步的目录和文件（相对于项目根目录）
const SYNC_ITEMS = [
  'src/content/posts',
  'src/content/diary',
  'src/data',
  'src/config.ts',
  'src/pages/admin.astro',
  'public/admin/config.yml',
  'scripts/sync-to-repo.mjs',
  'scripts/sync-server.mjs',
  'admin-guide.md',
  'pnpm-lock.yaml',
];

function log(...args) {
  console.log('[sync]', ...args);
}

function error(...args) {
  console.error('[sync]', ...args);
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    ensureDir(dest);
    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    ensureDir(path.dirname(dest));
    fs.copyFileSync(src, dest);
  }
}

function syncItem(item) {
  const src = path.join(SOURCE, item);
  const dest = path.join(TARGET, item);

  if (!fs.existsSync(src)) {
    error('源文件不存在，跳过:', item);
    return { item, status: 'skipped', reason: 'source not found' };
  }

  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    ensureDir(dest);
    copyRecursive(src, dest);
  } else {
    ensureDir(path.dirname(dest));
    fs.copyFileSync(src, dest);
  }

  log('已同步:', item);
  return { item, status: 'synced' };
}

function main() {
  if (!TARGET) {
    error('缺少目标仓库路径。用法: node scripts/sync-to-repo.mjs <目标路径>');
    error('或设置环境变量 SUMYU_REPO_PATH');
    process.exit(1);
  }

  if (!fs.existsSync(TARGET)) {
    error('目标路径不存在:', TARGET);
    process.exit(1);
  }

  log('源:', SOURCE);
  log('目标:', TARGET);

  const results = [];
  for (const item of SYNC_ITEMS) {
    results.push(syncItem(item));
  }

  log('同步完成');
  return results;
}

main();
