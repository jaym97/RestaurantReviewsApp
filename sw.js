var staticCacheName = 'RestRevApp1';


self.addEventListener('install', function (event) {

    event.waitUntil(
        caches.open(staticCacheName).then(function (cache) {
            return cache.addAll([
                '/RestaurantReviewsApp/',
                '/RestaurantReviewsApp/js/dbhelper.js',
                '/RestaurantReviewsApp/js/main.js',
                '/RestaurantReviewsApp/img/1.jpg',
                '/RestaurantReviewsApp/img/2.jpg',
                '/RestaurantReviewsApp/img/3.jpg',
                '/RestaurantReviewsApp/img/4.jpg',
                '/RestaurantReviewsApp/img/5.jpg',
                '/RestaurantReviewsApp/img/6.jpg',
                '/RestaurantReviewsApp/img/7.jpg',
                '/RestaurantReview-App/img/8.jpg',
                '/RestaurantReviewsApp/img/9.jpg',
                '/RestaurantReviewsApp/img/10.jpg',
                '/RestaurantReviewsApp/js/restaurant_info.js',
                '/RestaurantReviewsApp/css/styles.css',
                '/RestaurantReviewsApp/data/restaurants.json',
                '/RestaurantReviewsApp/manifest.json',
                '/RestaurantReviewsApp/index.html',
                '/RestaurantReviewsApp/restaurant.html',
                'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
                'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css'
              ]);
        }).then(console.log('Cache is sucessful!'))
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