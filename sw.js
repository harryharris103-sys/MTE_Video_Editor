/* MTE Video Editor — offline engine
   The page registers this file as  sw.js?v=<APP.v>, so the cache name follows the app version
   (bump APP.v in index.html on each release; nothing to edit here).

   - APP SHELL  : index.html (required), manifest and icons are saved on install. index.html is
                  fetched network-first (3 s limit, so weak wifi falls back to the saved copy) and the
                  saved copy is refreshed every time it loads online.
   - CONVERTER  : ffmpeg.wasm (~30 MB; used for MKV / H.264 / WMV import and export) is saved in its
                  own cache the first time it is used, or on demand with the "Save converter for
                  offline" button. That cache survives app updates.
   - NOT HERE   : videos, music, pictures, fonts, templates and logos live in the browser's own
                  storage (IndexedDB / localStorage) and already work offline. */
const V = new URL(self.location.href).searchParams.get('v') || '0';
const SHELL = 'mte-shell-' + V;
const FFC = 'mte-ffmpeg-v1';                       // converter cache: kept across versions
const SCOPE = self.registration.scope;
const u = p => new URL(p, SCOPE).href;
const SHELL_URL = u('index.html');
const OPTIONAL = ['manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png', 'maskable-192.png',
                  'maskable-512.png', 'apple-touch-icon.png', 'logo-overlay-white.png', 'logo-overlay-dark.png'].map(u);
const NET_TIMEOUT = 3000;

const UNPKG = 'https://unpkg.com/@ffmpeg/';
const FF_SETS = [
  ['ffmpeg.js', 'util.js', '814.ffmpeg.js', 'ffmpeg-core.js', 'ffmpeg-core.wasm'].map(f => u('vendor/ffmpeg/' + f)),
  [UNPKG + 'ffmpeg@0.12.10/dist/umd/ffmpeg.js', UNPKG + 'util@0.12.1/dist/umd/index.js',
   UNPKG + 'ffmpeg@0.12.10/dist/umd/814.ffmpeg.js', UNPKG + 'core@0.12.6/dist/umd/ffmpeg-core.js',
   UNPKG + 'core@0.12.6/dist/umd/ffmpeg-core.wasm']
];
const isFF = url => url.startsWith(UNPKG) || url.startsWith(u('vendor/ffmpeg/'));
const timeout = ms => new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms));

async function tell(msg) {
  for (const c of await self.clients.matchAll({ type: 'window', includeUncontrolled: true })) c.postMessage(msg);
}

/* ---------- lifecycle ---------- */
self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const cache = await caches.open(SHELL);
    await cache.add(new Request(SHELL_URL, { cache: 'reload' }));          // required: if this fails, install fails
    await Promise.all(OPTIONAL.map(url => cache.add(new Request(url, { cache: 'reload' })).catch(() => {})));
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k.startsWith('mte-shell-') && k !== SHELL) await caches.delete(k);
    await self.clients.claim();
  })());
});

/* ---------- strategies ---------- */
async function page(req) {                                   // index.html / navigations
  const cache = await caches.open(SHELL);
  try {
    const res = await Promise.race([fetch(req, { cache: 'no-cache' }), timeout(NET_TIMEOUT)]);
    if (res && res.status === 200) {
      const keep = res.redirected ? new Response(await res.clone().blob(), { status: 200, headers: res.headers }) : res.clone();
      cache.put(SHELL_URL, keep).catch(() => {});
      return res.redirected ? keep : res;
    }
    throw new Error('http ' + (res && res.status));
  } catch (err) {
    const hit = await cache.match(SHELL_URL);
    if (hit) return hit;
    return new Response('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><body style="font:16px system-ui;background:#1A1A1A;color:#eee;padding:32px"><h2 style="color:#C9932E">MTE Video Editor isn’t saved on this device yet</h2><p>Open it once with internet (over https://) and wait for “Ready to work offline”.</p>', { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }
}
async function asset(req) {                                  // icons, manifest: saved copy first, refreshed behind
  const cache = await caches.open(SHELL);
  const hit = await cache.match(req, { ignoreSearch: true });
  const net = fetch(req).then(res => { if (res.status === 200 && res.type === 'basic') cache.put(req, res.clone()).catch(() => {}); return res; });
  if (hit) { net.catch(() => {}); return hit; }
  return net;
}
async function converter(req) {                              // ffmpeg files: cache-first, forever
  const cache = await caches.open(FFC);
  const hit = await cache.match(req.url, { ignoreVary: true });
  if (hit) return hit;
  // re-request with CORS so we never store opaque (quota-padded) responses
  const res = await fetch(req.url, { mode: 'cors', credentials: 'omit' });
  if (res.ok) cache.put(req.url, res.clone()).catch(() => {});
  return res;
}
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || req.headers.has('range')) return;
  const url = new URL(req.url);
  if (isFF(req.url)) { e.respondWith(converter(req)); return; }
  if (url.origin !== location.origin) return;
  if (req.mode === 'navigate' || url.href === SHELL_URL || url.href === SCOPE) { e.respondWith(page(req)); return; }
  e.respondWith(asset(req));
});

/* ---------- "Save converter for offline" ---------- */
let preloading = false;
async function preloadConverter() {
  if (preloading) return; preloading = true;
  try {
    const cache = await caches.open(FFC);
    let set = null;
    for (const s of FF_SETS) {                                // use the bundled copy if it exists, else unpkg
      try { const r = await fetch(s[4], { method: 'HEAD', mode: 'cors', credentials: 'omit' }); if (r.ok) { set = s; break; } } catch (e) {}
    }
    if (!set) throw new Error('converter files not reachable (are you online?)');
    let done = 0;
    for (const url of set) {
      if (!(await cache.match(url, { ignoreVary: true }))) {
        const res = await fetch(url, { mode: 'cors', credentials: 'omit' });
        if (!res.ok) throw new Error('HTTP ' + res.status + ' for ' + url.split('/').pop());
        await cache.put(url, res);
      }
      await tell({ type: 'FF_PROGRESS', done: ++done, total: set.length });
    }
    await tell({ type: 'FF_DONE' });
  } catch (err) {
    await tell({ type: 'FF_FAIL', error: String(err && err.message || err) });
  } finally { preloading = false; }
}
self.addEventListener('message', e => {
  const d = e.data || {};
  if (d.type === 'SKIP_WAITING') self.skipWaiting();
  if (d.type === 'PRELOAD_FF') e.waitUntil(preloadConverter());
});
