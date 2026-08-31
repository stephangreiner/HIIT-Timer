// Schlanker, selbst gepflegter Service Worker für die HIIT-Timer-PWA.
// Strategie: Stale-While-Revalidate – Anfragen werden sofort aus dem Cache
// beantwortet (offline-fähig) und im Hintergrund aktualisiert, sodass ein
// Update spätestens beim nächsten Start greift. Cache-Version erhöhen, um
// bei Bedarf alle alten Einträge zu verwerfen.
const CACHE = 'hiit-v1';

const CORE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './bilder/favicon.ico',
  './bilder/HIIT48x48.png',
  './bilder/HIIT250x250.png',
  './bilder/HIIT400x400.png',
  './bilder/herunterladensymbol.png',
  './audio/gongsound.mp3',
  './audio/m1.mp3',
  './audio/go1.mp3', './audio/go2.mp3', './audio/go3.mp3', './audio/go4.mp3',
  './audio/go5.mp3', './audio/go6.mp3', './audio/go7.mp3', './audio/go8.mp3',
  './audio/go9.mp3', './audio/go10.mp3', './audio/go11.mp3',
  './audio/kurzepause1.mp3', './audio/kurzepause2.mp3', './audio/kurzepause3.mp3',
  './audio/kurzepause4.mp3', './audio/kurzepause5.mp3', './audio/kurzepause6.mp3',
  './audio/kurzepause7.mp3', './audio/kurzepause8.mp3',
  './audio/vor1.mp3', './audio/vor2.mp3', './audio/vor3.mp3',
  './audio/vor4.mp3', './audio/vor5.mp3', './audio/vor6.mp3',
  './audio/ende1.mp3', './audio/ende2.mp3', './audio/ende3.mp3', './audio/ende4.mp3'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      // Einzeln hinzufügen, damit eine fehlende Datei nicht die
      // gesamte Installation scheitern lässt.
      .then((cache) => Promise.allSettled(
        CORE_ASSETS.map((url) => cache.add(url))
      ))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Nur eigene GET-Anfragen behandeln; alles andere (z. B. Blob-/Kamera-
  // Streams, fremde Hosts) unangetastet ans Netz durchreichen.
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.open(CACHE).then((cache) =>
      cache.match(request).then((cached) => {
        const netzwerk = fetch(request)
          .then((antwort) => {
            if (antwort && antwort.status === 200) {
              cache.put(request, antwort.clone());
            }
            return antwort;
          })
          .catch(() => cached);

        return cached || netzwerk;
      })
    )
  );
});
