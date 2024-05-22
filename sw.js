

// Set a name for the current cache

var cacheName = 'Kniebv1';
var cacheAssets = [

];

// Call install Event
	// Wait until promise is finished
	// When everything is set
self.addEventListener('install', e => {
	e.waitUntil(
		caches.open(cacheName)
		.then(cache => {
			console.log(`Service Worker: Caching Files: ${cache}`);
			cache.addAll(cacheAssets)			
				.then(() => self.skipWaiting())
		})
	);
})

// Call Activate Event
// Clean up old caches by looping through all of the
	// caches and deleting any old caches or caches that
	// are not defined in the list
self.addEventListener('activate', e => {
	console.log('Service Worker: Activated');
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

var cacheName = 'Kniebv1';

// Call Fetch Event
	// The response is a stream and in order the browser
			// to consume the response and in the same time the
			// cache consuming the response it needs to be
			// cloned in order to have two streams.
// Open cache
	// Add response to cache

self.addEventListener('fetch', e => {
	console.log('Service Worker: Fetching');
	e.respondWith(
		fetch(e.request)
		.then(res => {	
			const resClone = res.clone();	
			caches.open(cacheName)
				.then(cache => {		
					cache.put(e.request, resClone);
				});
			return res;
		}).catch(
			err => caches.match(e.request)
			.then(res => res)
		)
	);
});

self.addEventListener('push', event => {
	const options = {
	  body: event.data ? event.data.text() : 'Default body',
	  icon: 'favicon-16x16.png',
	  badge: 'favicon-16x16.png'
	};
	event.waitUntil(
	  self.registration.showNotification('Push Notification', options)
	);
  });
  