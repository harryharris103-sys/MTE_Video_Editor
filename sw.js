const V='mte-'+new URL(self.location).searchParams.get('v'),RT='mte-runtime',FILES=['./','index.html','manifest.webmanifest','icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V&&x!==RT).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
  e.respondWith((async()=>{
    if(u.origin!==location.origin||u.pathname.includes('/vendor/')){ // converter files: cache-first, kept for offline use
      const c=await caches.open(RT),h=await c.match(r);if(h)return h;
      try{const n=await fetch(r);if(n.ok||n.type==='opaque')c.put(r,n.clone());return n}catch(x){return Response.error()}}
    try{const n=await fetch(r);if(n.ok)caches.open(V).then(c=>c.put(r,n.clone()));return n} // app files: online = always fresh
    catch(x){return(await caches.match(r,{ignoreSearch:true}))||(r.mode==='navigate'?await caches.match('index.html'):Response.error())}})())});
