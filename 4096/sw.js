var cacheName = '4096';
var filesToCache = [
  '/',
  '/index.html',
  '/assets/fonts/font.png',
  '/assets/fonts/font.fnt',
  '/assets/sounds/grow.mp3',
  '/assets/sounds/grow.ogg',
  '/assets/sounds/move.mp3',
  '/assets/sounds/move.ogg',
  '/assets/sprites/emtytitle.png',
  '/assets/sprites/gametitle.png',
  '/assets/sprites/howtoplay.png',
  '/assets/sprites/logo.png',
  '/assets/sprites/restart.png',
  '/assets/sprites/scorelabels.png',
  '/assets/sprites/scorepanel.png',
  '/assets/sprites/tiles.png',
  '/game.js',
  '/phaser-min.js',
  '/sw.js'
];

self.addEventListener('install', function(event) {
  console.log('sw install');
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('sw caching files');
      return cache.addAll(filesToCache);
    }).catch(function(err) {
      console.log(err);
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('sw fetch');
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    }).catch(function (error) {
      console.log(error);
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('sw activate');
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('sw removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});
