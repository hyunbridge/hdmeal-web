// ██╗  ██╗██████╗ ███╗   ███╗███████╗ █████╗ ██╗
// ██║  ██║██╔══██╗████╗ ████║██╔════╝██╔══██╗██║
// ███████║██║  ██║██╔████╔██║█████╗  ███████║██║
// ██╔══██║██║  ██║██║╚██╔╝██║██╔══╝  ██╔══██║██║
// ██║  ██║██████╔╝██║ ╚═╝ ██║███████╗██║  ██║███████╗
// ╚═╝  ╚═╝╚═════╝ ╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝
// Copyright 2019-2020, Hyungyo Seo

const API_ORIGIN = "https://app.api.hdml.kr";


importScripts('https://cdn.jsdelivr.net/npm/workbox-sw@5.1.3/build/workbox-sw.js');

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});


// 오프라인 페이지 프리페칭
offlineFallbackPage = "/offline.html"
self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open("Offline")
      .then((cache) => cache.add(offlineFallbackPage))
  );
});


// API 요청
workbox.routing.registerRoute(
  ({url}) => url.origin === API_ORIGIN,
  new workbox.strategies.NetworkFirst({
    cacheName: "API",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 1,
        maxAgeSeconds: 86400 // 1 Day
      }),
      new workbox.backgroundSync.BackgroundSyncPlugin("API", {
        maxRetentionTime: 1440 // 24 Hours
      })
    ]
  })
);


// 나머지 요청
workbox.routing.setDefaultHandler(
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "Cache",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 20
      })
    ]
  })
);


// Failback
workbox.routing.setCatchHandler(({event}) => {
  switch (event.request.destination) {
    case 'document':
      caches.open("Offline")
      return caches.match(offlineFallbackPage);

    default:
      return Response.error();
  }
});
