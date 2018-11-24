var staticCacheName = 'RestRevApp1';
var urlsToCache = [
                '/',
                '/js/dbhelper.js',
                '/js/main.js',
                '/img/1.jpg',
                '/img/2.jpg',
                '/img/3.jpg',
                '/img/4.jpg',
                '/img/5.jpg',
                '/img/6.jpg',
                '/img/7.jpg',
                '/img/8.jpg',
                '/img/9.jpg',
                '/img/10.jpg',
                '/js/restaurant_info.js',
                '/css/styles.css',
                '/data/restaurants.json',
                '/manifest.json',
                '/index.html',
                '/restaurant.html',
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

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    })
  );
});