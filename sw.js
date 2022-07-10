var cacheName = 'geeks-cache-v1';
var cacheAssets = [
 // die kleinen dateien scheinen automatisch imn den cache gelade zu werden. Die Audiodateien müssen benannt werden zu testzwecken bewusst keine offlinefähigkeiten für marniemedia bis auf go
    "/HIIT-Timer/index.html",
     "/HIIT-Timer/style.css",
    "/HIIT-Timer/script.js",
     '/HIIT-Timer/sw.js',
	'/HIIT-Timer/manifest.json',
    "/HIIT-Timer/audio/m1.mp3",
     "/HIIT-Timer/audio/gongsound.mp3",
	 "/HIIT-Timer/audio/go1.mp3",
	 "/HIIT-Timer/audio/go2.mp3",
	 "/HIIT-Timer/audio/go3.mp3",
	 "/HIIT-Timer/audio/go4.mp3",
];

// Call install Event
self.addEventListener('install', e => {
	// Wait until promise is finished
	e.waitUntil(
		caches.open(cacheName)
		.then(cache => {
			console.log(`Service Worker: Caching Files: ${cache}`);
			cache.addAll(cacheAssets)
				// When everything is set
				.then(() => self.skipWaiting())
		})
	);
})

// Call Activate Event
self.addEventListener('activate', e => {
	console.log('Service Worker: Activated');
	// Clean up old caches by looping through all of the
	// caches and deleting any old caches or caches that
	// are not defined in the list
	e.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.map(
					cache => {
						if (cache !== cacheName) {
							console.log('Service Worker: Clearing Old Cache');
							return caches.delete(cache);
						}
					}
				)
			)
		})
	);
})

var cacheName = 'geeks-cache-v1';

// Call Fetch Event
self.addEventListener('fetch', e => {
	console.log('Service Worker: Fetching');
	e.respondWith(
		fetch(e.request)
		.then(res => {
			// The response is a stream and in order the browser
			// to consume the response and in the same time the
			// cache consuming the response it needs to be
			// cloned in order to have two streams.
			const resClone = res.clone();
			// Open cache
			caches.open(cacheName)
				.then(cache => {
					// Add response to cache
					// zumindest wenn schon einmal was in cache geladen. gibt es einen 206 Fehler. Scheint was mit Teilabruf zu tun zu haben. Scheint aber folgenlos zu bleiben.
					cache.put(e.request, resClone);
				});
			return res;
		}).catch(
			err => caches.match(e.request)
			.then(res => res)
		)
	);
});

//müsste für eine statische Seite ausreichend sein. 
