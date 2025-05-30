self.addEventListener("install", event => {
  console.log("[Service Worker] Install");
  event.waitUntil(
    caches.open("hitzkale-cache-v1").then(cache =>
      cache.addAll(["/", "/index.html", "/manifest.json", "/favicon.png"])
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});