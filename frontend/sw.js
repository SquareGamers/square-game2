const CACHE_NAME = 'pwa-cache-v2';
// List all local assets you want to cache for offline use
const ASSETS_TO_CACHE = [
  './',
  '/index.html',
  'styles.css',
  './app.js',
  './manifest.json',
  './purple.png',
  './blue.png'
];

// Install Event: Cache all essential mobile/web assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching shell assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Fetch Event: Serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Return cached file if found, otherwise fetch from network
      return cachedResponse || fetch(event.request);
    })
  );
});
