const CACHE_NAME = 'ambururu-v1';
const urlsToCache = [
    '/',
    '/ambururu.html',
    '/icon.png',
    '/manifest.json',
    'https://cdnjs.cloudflare.com/ajax/libs/three.js/r167/three.min.js',
    'https://cdn.jsdelivr.net/npm/three@0.167.0/examples/jsm/controls/OrbitControls.min.js',
    'https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.js',
    'https://cdn.jsdelivr.net/npm/js-confetti@0.11.0/dist/js-confetti.browser.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(name => {
                    if (name !== CACHE_NAME) return caches.delete(name);
                })
            );
        })
    );
});