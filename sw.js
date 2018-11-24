var staticCacheName = 'RestRevApp1';
var urlsToCache = [
                './',
                './js/dbhelper.js',
                './js/main.js',
                './img/1.jpg',
                './img/2.jpg',
                './img/3.jpg',
                './img/4.jpg',
                './img/5.jpg',
                './img/6.jpg',
                './img/7.jpg',
                './img/8.jpg',
                './img/9.jpg',
                './img/10.jpg',
                './js/restaurant_info.js',
                './css/styles.css',
                './data/restaurants.json',
                './manifest.json',
                './index.html',
                './restaurant.html',
                'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
                'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css'
              ];


self.addEventListener('install', function (event) {

    event.waitUntil(
        caches.open(staticCacheName)
        .then(function (cache) {
          (console.log('Cache is sucessful!'));
          return cache.addAll(urlsToCache);
        })
    );
});


self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => {
          return cacheName.startsWith('Rest') && cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function (e) {
  // We only want to call event.respondWith() if this is a GET request for an HTML document.
  if (event.request.method === 'GET' &&
    event.request.headers.get('accept').indexOf('text/html') !== -1) {
    console.log('Handling fetch event for', e.request.url);
    event.respondWith(
      fetch(event.request).catch(function (e) {
        console.error('Request failed.', e);
        return caches.open(OFFLINE_CACHE).then(function (cache) {
          return cache.match(OFFLINE_URL);
        });
      })
    );
  }
});