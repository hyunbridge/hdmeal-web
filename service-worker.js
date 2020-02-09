/**
 * Service Worker
 */

const _version = 'v1';

const log = msg => {
  console.log(`[ServiceWorker ${_version}] ${msg}`);
}

// Life cycle: INSTALL
self.addEventListener('install', event => {
  self.skipWaiting();
  log('INSTALL');
});

// Life cycle: ACTIVATE
self.addEventListener('activate', event => {
  log('Activate');
});

// Functional: FETCH
self.addEventListener('fetch', event => {
  log('Fetch ' + event.request.url);
  event.respondWith(fetch(event.request));
});
