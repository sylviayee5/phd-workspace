// Shu's PhD Workspace - Service Worker
// 策略：
//   - HTML / JS / CSS: stale-while-revalidate（优先缓存，后台更新）
//   - 外部 CDN（Tailwind、Chart.js、flatpickr、FontAwesome、fonts）: cache-first
//   - Supabase API 请求: network-first，离线时读缓存
//
// 升级说明：改 CACHE_VERSION 触发老缓存清理

const CACHE_VERSION = 'v6-2026-04-24-ui';
const APP_CACHE = `phd-app-${CACHE_VERSION}`;
const CDN_CACHE = `phd-cdn-${CACHE_VERSION}`;
const API_CACHE = `phd-api-${CACHE_VERSION}`;

// 预缓存的本地文件
// 注意：SW 以 /app/sw.js 的位置加载（GitHub Pages 作用域限制），
// 所以相对路径以 /app/ 为基准
const APP_SHELL = [
  './phd-workspace-v3.html',
  '../shared/supabase-client.js',
  '../assets/manifest.json',
  '../assets/icon-192.png',
  '../assets/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(APP_CACHE).then((cache) =>
      cache.addAll(APP_SHELL).catch((err) => {
        console.warn('[SW] 预缓存部分失败（首次可忽略）:', err);
      })
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => ![APP_CACHE, CDN_CACHE, API_CACHE].includes(k))
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // 跳过 chrome-extension 等非 http(s)
  if (!url.protocol.startsWith('http')) return;

  // ★ 跳过视频/音频文件：避免 Range 请求被 SW 劫持导致播放异常
  //   浏览器对视频用字节分片请求，SW 缓存全文件会返回错误的 200（应为 206），导致黑屏/卡住
  if (/\.(mp4|webm|ogg|mov|m4a|mp3|wav)(\?|$)/i.test(url.pathname)) {
    return; // 让浏览器直接走网络，不经过 SW
  }
  // 同样跳过带 Range header 的任何请求（视频/大文件分片下载）
  if (req.headers.has('range')) return;

  // Supabase API: network-first
  if (url.hostname.endsWith('.supabase.co')) {
    event.respondWith(networkFirst(req, API_CACHE));
    return;
  }

  // 外部 CDN: cache-first
  const cdnHosts = [
    'cdn.tailwindcss.com',
    'cdn.jsdelivr.net',
    'cdnjs.cloudflare.com',
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'ka-f.fontawesome.com',
    'esm.sh',
  ];
  if (cdnHosts.some((h) => url.hostname.endsWith(h))) {
    event.respondWith(cacheFirst(req, CDN_CACHE));
    return;
  }

  // 同源 HTML / JS / CSS / 资源: stale-while-revalidate
  if (url.origin === self.location.origin) {
    event.respondWith(staleWhileRevalidate(req, APP_CACHE));
    return;
  }
});

async function cacheFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  if (cached) return cached;
  try {
    const res = await fetch(req);
    if (res.ok) cache.put(req, res.clone());
    return res;
  } catch (err) {
    return cached || Response.error();
  }
}

async function networkFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const res = await fetch(req);
    if (res.ok) cache.put(req, res.clone());
    return res;
  } catch (err) {
    const cached = await cache.match(req);
    return cached || Response.error();
  }
}

async function staleWhileRevalidate(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  const network = fetch(req)
    .then((res) => {
      if (res && res.ok) cache.put(req, res.clone());
      return res;
    })
    .catch(() => cached);
  return cached || network;
}
