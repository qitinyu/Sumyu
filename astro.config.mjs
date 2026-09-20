import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { Readable } from 'node:stream';
import { fileURLToPath } from 'node:url';
import remarkReadingTime from './src/plugins/remark-reading-time.mjs';
import remarkSpoiler from './src/plugins/remark-spoiler.mjs';
import rehypeAlerts from './src/plugins/rehype-alerts.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========== 开发模式同步插件 ==========
// POST /api/sync → 执行 scripts/sync-to-repo.mjs 同步到正式仓库
// 仅在 astro dev 下生效 (apply: 'serve')，生产构建不受影响
// 目标仓库可用环境变量 SUMYU_REPO_PATH 覆盖，默认 D:\YQ\Sumyu
function sumyuDevSyncPlugin() {
  return {
    name: 'sumyu-dev-sync',
    apply: 'serve',
    configureServer(server) {
      let running = false;
      server.middlewares.use('/api/sync', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        if (req.method !== 'POST') {
          res.statusCode = 404;
          res.end(JSON.stringify({ success: false, error: 'not found' }));
          return;
        }
        if (running) {
          res.statusCode = 429;
          res.end(JSON.stringify({ success: false, error: '同步正在进行中，请稍候' }));
          return;
        }
        const target = process.env.SUMYU_REPO_PATH || 'D:\\YQ\\Sumyu';
        running = true;
        const child = spawn(process.execPath, [path.join(__dirname, 'scripts', 'sync-to-repo.mjs'), target], {
          cwd: __dirname,
          stdio: ['ignore', 'pipe', 'pipe'],
        });
        let stdout = '';
        let stderr = '';
        child.stdout.on('data', (d) => { stdout += d.toString(); });
        child.stderr.on('data', (d) => { stderr += d.toString(); });
        child.on('error', (err) => {
          running = false;
          res.statusCode = 500;
          res.end(JSON.stringify({ success: false, error: err.message }));
        });
        child.on('close', (code) => {
          running = false;
          if (code === 0) {
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, stdout, stderr }));
          } else {
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: stderr.trim() || `同步脚本退出码 ${code}`, stdout, stderr }));
          }
        });
      });
    },
  };
}

// ========== 开发模式 WebDAV 同源代理 ==========
// /webdav/* → 转发到 feature.config.json 里 music.webdav.url 对应的 WebDAV 服务
// 坚果云等 WebDAV 服务不带 CORS 头, 浏览器无法直连, 必须经同源代理
// 鉴权在服务端注入 (凭据不暴露给页面), 并剥离坚果云返回的 Content-Disposition: attachment
// (否则 <audio> 会触发浏览器下载而不是播放)
// 生产环境由 functions/webdav/[[path]].js (Cloudflare Pages Function) 承担同样的职责
function sumyuWebdavProxyPlugin() {
  return {
    name: 'sumyu-webdav-proxy',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/webdav', async (req, res) => {
        try {
          // 每次请求时读取配置, 后台改完 feature.config.json 无需重启 dev
          const cfgPath = path.join(__dirname, 'src', 'data', 'feature.config.json');
          const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
          const wd = (cfg && cfg.music && cfg.music.webdav) || {};
          const upstream = String(wd.url || '').replace(/\/+$/, '');
          if (!upstream || !wd.username) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify({ error: 'feature.config.json 未配置 music.webdav.url / username' }));
            return;
          }
          const u = new URL(upstream);
          const basePath = u.pathname.replace(/\/+$/, '');
          // connect 已剥掉 /webdav 前缀, req.url 即目标路径 (含查询串)
          const target = u.origin + basePath + req.url;
          // 鉴权由服务端注入; 转发 Depth (PROPFIND) / Range (流式播放) 等安全白名单头
          const headers = {
            Authorization:
              'Basic ' + Buffer.from(String(wd.username) + ':' + String(wd.password || '')).toString('base64'),
            'User-Agent': 'SumyuBlog-WebDAV-Proxy/1.0',
          };
          for (const h of ['depth', 'content-type', 'accept', 'range']) {
            if (req.headers[h]) headers[h] = req.headers[h];
          }
          // 读取请求体 (PROPFIND 携带 XML body)
          const chunks = [];
          for await (const c of req) chunks.push(c);
          const body = chunks.length > 0 ? Buffer.concat(chunks) : undefined;
          const upstreamRes = await fetch(target, { method: req.method, headers, body });
          res.statusCode = upstreamRes.status;
          // 跳过: content-disposition (attachment 会触发下载), 以及 fetch 自动解压后不符的长度/压缩头
          const skipHeaders = ['content-encoding', 'content-length', 'transfer-encoding', 'set-cookie', 'connection', 'content-disposition'];
          upstreamRes.headers.forEach((v, k) => {
            if (!skipHeaders.includes(k.toLowerCase())) res.setHeader(k, v);
          });
          if (upstreamRes.body) {
            Readable.fromWeb(upstreamRes.body).pipe(res);
          } else {
            res.end();
          }
        } catch (err) {
          res.statusCode = 502;
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.end(JSON.stringify({ error: 'WebDAV 代理失败: ' + (err && err.message ? err.message : String(err)) }));
        }
      });
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://yqamm.top',
  integrations: [mdx(), sitemap()],

  // ========== 构建优化 ==========
  compressHTML: true,
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },

  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },

  markdown: {
    remarkPlugins: [remarkReadingTime, remarkSpoiler],
    rehypePlugins: [rehypeAlerts],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },

  vite: {
    plugins: [sumyuDevSyncPlugin(), sumyuWebdavProxyPlugin()],
  },
});
