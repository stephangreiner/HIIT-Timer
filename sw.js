const CACHE_VERSION = 'v1';
const CACHE_NAME = `Knieb-${CACHE_VERSION}`;
const CACHE_ASSETS = [
    '/',                    // Root URL
    '/index.html',          // Main HTML
    '/manifest.json',       // Manifest
    '/script.js',           // Main JavaScript
    '/style.css',           // CSS (if applicable)
    '/media/favicon.ico',   // Favicon
    '/media/flach.png',     // Image for Squats
    '/media/hoch.png',      // Image for Pull-Ups
    '/media/quer.png',      // Image for Back Extensions
    '/media/LiegeS.png'     // Image for Push-Ups
];

// Install Event: Caches specified assets
self.addEventListener('install', async (event) => {
    console.log(`Service Worker: Installing, caching assets`);
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            await cache.addAll(CACHE_ASSETS);
            await self.skipWaiting();
            console.log('Service Worker: Cached all assets');
        })().catch(error => console.error('Install failed:', error))
    );
});

// Activate Event: Deletes old caches
self.addEventListener('activate', async (event) => {
    console.log('Service Worker: Activated');
    event.waitUntil(
        (async () => {
            const cacheNames = await caches.keys();
            await Promise.all(
                cacheNames.map(name => {
                    if (name !== CACHE_NAME) {
                        console.log(`Service Worker: Clearing old cache: ${name}`);
                        return caches.delete(name);
                    }
                })
            );
            await self.clients.claim(); // Immediately activate the new cache
        })().catch(error => console.error('Activate failed:', error))
    );
});

// Fetch Event: Serves from cache first, then network if unavailable
self.addEventListener('fetch', async (event) => {
    console.log(`Service Worker: Fetching ${event.request.url}`);
    event.respondWith(
        (async () => {
            try {
                const response = await fetch(event.request);
                const cache = await caches.open(CACHE_NAME);
                cache.put(event.request, response.clone());
                return response;
            } catch (error) {
                const cachedResponse = await caches.match(event.request);
                return cachedResponse || new Response("Offline", { status: 503 });
            }
        })()
    );
});
