const CACHE='olgc-show-v2-live-20260916-2';
const ASSETS=['./','./index.html','./v2.html'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>Promise.all(ASSETS.map(async path=>{
    const response=await fetch(new Request(path,{cache:'reload'}));
    if(!response.ok)throw new Error('Unable to cache app');
    await cache.put(path,response);
  }))).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('olgc-show-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url);
  if(event.request.method!=='GET'||url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    try{
      const response=await fetch(event.request,{cache:'no-store'});
      if(!response.ok)throw new Error('App request failed');
      await cache.put(event.request,response.clone());
      return response;
    }catch(error){
      const cached=await cache.match(event.request,{ignoreSearch:true});
      if(cached)return cached;
      if(event.request.mode==='navigate'){
        const app=await cache.match('./v2.html');
        if(app)return app;
      }
      return Response.error();
    }
  })());
});
