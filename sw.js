/* =========================================================
   এসো আরবি শিখি — Service Worker
   ভবিষ্যতে কনটেন্ট আপডেট করলে শুধু CACHE_NAME এর সংখ্যাটি
   বাড়িয়ে দিন (যেমন v1 -> v2), তাহলে ইউজারদের ডিভাইসে পুরনো
   ক্যাশ মুছে নতুন ফাইল লোড হবে।
========================================================= */
const CACHE_NAME = 'esho-arabi-shikhi-v2';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-192.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
  './favicon-32.png',
  './favicon-16.png'
];

/* ---- INSTALL: pre-cache the app shell ---- */
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

/* ---- ACTIVATE: clear out old cache versions ---- */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

/* ---- FETCH: cache-first, then update cache in the background ---- */
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const networkFetch = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.ok) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || networkFetch;
    })
  );
});
