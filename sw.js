'use strict';
// Service worker v4 - clears all old caches
const CACHE = 'cinewire-v4';
const API_CACHE = 'cinewire-api-v4';

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(['/', '/index.html']))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE && k !== API_CACHE).map(k => {
        console.log('SW: deleting old cache', k);
        return caches.delete(k);
      }))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Always go network-first, no caching — prevents stale JS issues
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
