/**
 * Service Worker
 */

const _version = 'v1';
const cacheName = 'v1';
const cacheList = [
  '/',
  '/manifest.json',
  '/service-worker.js',
  '/script.js',
  '/style.css',
  '/settings/',
  '/settings/script.js',
  '/settings/style.css',
  '/icons/192',
  '/icons/512',
  '/favicon.ico',
  'https://cdn.jsdelivr.net/npm/bootstrap@4.4.0/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js',
  'https://cdn.jsdelivr.net/npm/spoqa-han-sans@2.1.2/css/SpoqaHanSans-kr.css',
  'https://cdn.jsdelivr.net/npm/spoqa-han-sans@2.1.2/Subset/SpoqaHanSans/SpoqaHanSansRegular.woff2',
  'https://cdn.jsdelivr.net/npm/spoqa-han-sans@2.1.2/Subset/SpoqaHanSans/SpoqaHanSansBold.woff2',
  'https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js',
  'https://cdn.jsdelivr.net/npm/sweetalert2@9.5.4/dist/sweetalert2.all.min.js',
  'https://cdn.jsdelivr.net/npm/swiper@5.3.0/css/swiper.min.css',
  'https://cdn.jsdelivr.net/npm/swiper@5.3.0/js/swiper.min.js'
];

const log = msg => {
  console.log(`[ServiceWorker ${_version}] ${msg}`);
}

// Life cycle: INSTALL
self.addEventListener('install', event => {
  self.skipWaiting();
  log('INSTALL');
  caches.open(cacheName).then(cache => {
    log('Caching app shell');
    return cache.addAll(cacheList);
  })
});

// Life cycle: ACTIVATE
self.addEventListener('activate', event => {
  log('Activate');
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== cacheName) {
          log('Removing old cache ' + key);
          return caches.delete(key);
        }
      }));
    })
  );
});

// Functional: FETCH
self.addEventListener('fetch', event => {
  log('Fetch ' + event.request.url);
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
