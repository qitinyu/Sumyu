import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { Readable } from 'node:stream';
import remarkReadingTime from './src/plugins/remark-reading-time.mjs';
import remarkSpoiler from './src/plugins/remark-spoiler.mjs';
import rehypeAlerts from './src/plugins/rehype-alerts.mjs';
import { MUSIC } from './src/config.ts';

// ========== 开发模式 WebDAV 同源代理 ==========
// /webdav/* → 转发到 src/config.ts 里 MUSIC.webdav.url 对应的 WebDAV 服务
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
          // 从中央配置 src/config.ts 读取 MUSIC.webdav
          const wd = (MUSIC && MUSIC.webdav) || {};
          const upstream = String(wd.url || '').replace(/\/+$/, '');
          if (!upstream || !wd.username) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify({ error: 'config.ts 未配置 MUSIC.webdav.url / username' }));
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
    plugins: [sumyuWebdavProxyPlugin()],
  },
});
