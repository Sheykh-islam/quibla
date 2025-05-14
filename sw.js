// sw.js - Сервис-воркер

const CACHE_NAME = 'qibla-compass-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // Добавьте пути к вашим иконкам
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png'
  // Если добавите другие локальные файлы (CSS, JS) - их тоже сюда
];

// Установка сервис-воркера и кеширование ресурсов
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Перехват запросов и выдача из кеша, если возможно
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Если ресурс есть в кеше, отдаем его
        if (response) {
          return response;
        }
        // Иначе, делаем обычный запрос
        return fetch(event.request);
      })
  );
});

// Удаление старых версий кеша
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
