// Cloudflare Pages Function: /webdav/* 同源代理 (生产环境)
// 与 astro.config.mjs 里 dev 中间件的行为保持一致:
//   1. 鉴权在服务端注入 (读环境变量), WebDAV 凭据不暴露到页面源码
//   2. 剥离坚果云返回的 Content-Disposition: attachment (否则 <audio> 会触发下载而非播放)
//   3. 透传 PROPFIND / GET / Range, 支持歌单列举与流式播放
// 部署前在 Cloudflare Pages → Settings → Environment variables 配置:
//   WEBDAV_URL       如 https://dav.jianguoyun.com/dav/
//   WEBDAV_USERNAME  WebDAV 账号
//   WEBDAV_PASSWORD  WebDAV 应用密码
const SKIP_HEADERS = ['content-encoding', 'content-length', 'transfer-encoding', 'set-cookie', 'connection', 'content-disposition'];

export async function onRequest(context) {
  const { request, env } = context;
  const upstream = String(env.WEBDAV_URL || '').replace(/\/+$/, '');
  if (!upstream || !env.WEBDAV_USERNAME) {
    return Response.json({ error: '未配置 WEBDAV_URL / WEBDAV_USERNAME 环境变量 (CF Pages 项目设置)' }, { status: 500 });
  }
  const url = new URL(request.url);
  // /webdav/<路径> → 上游 <WEBDAV_URL>/<路径>
  const target = upstream + url.pathname.replace(/^\/webdav/, '') + url.search;
  const headers = {
    Authorization: 'Basic ' + btoa(String(env.WEBDAV_USERNAME) + ':' + String(env.WEBDAV_PASSWORD || '')),
    'User-Agent': 'SumyuBlog-WebDAV-Proxy/1.0',
  };
  for (const h of ['depth', 'content-type', 'accept', 'range']) {
    const v = request.headers.get(h);
    if (v) headers[h] = v;
  }
  const body = ['GET', 'HEAD'].includes(request.method) ? undefined : await request.arrayBuffer();
  const upstreamRes = await fetch(target, { method: request.method, headers, body });
  const respHeaders = new Headers();
  upstreamRes.headers.forEach((v, k) => {
    if (!SKIP_HEADERS.includes(k.toLowerCase())) respHeaders.set(k, v);
  });
  return new Response(upstreamRes.body, { status: upstreamRes.status, headers: respHeaders });
}
