var CACHE_NAME = 'essential-pwa-1';
var filesToCache = [
	'/assets/css/app.min.css',
	'/assets/fonts/material-design-icons/MaterialIcons-Regular.svg',
	'/assets/fonts/material-design-icons/MaterialIcons-Regular.ttf',
	'/assets/fonts/material-design-icons/MaterialIcons-Regular.woff',
	'/assets/fonts/material-design-icons/MaterialIcons-Regular.woff2',
	'/assets/js/app.min.js'
];

self.addEventListener('install', function (e) {
	console.log('[ServiceWorker] Install');
	e.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			console.log('[ServiceWorker] Caching app shell');
			return cache.addAll(filesToCache);
		})
	);
});

self.addEventListener('activate', function(e) {
  	console.log('[ServiceWorker] Activate');
	  e.waitUntil(
		    caches.keys().then(function(keyList) {
			    return Promise.all(keyList.map(function(key) {
			        if (key !== CACHE_NAME) {
			            console.log('[ServiceWorker] Removing old cache', key);
			            return caches.delete(key);
				    }
			    }));
		    })
	  );
	  return self.clients.claim();
});