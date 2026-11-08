/**
 * PlantCare Lab - Production PWA Service Worker
 * Version: 1.0.4
 * Explicitly excludes Google AdSense, analytics, and private queries.
 */

const CACHE_NAME = 'plantcare-lab-v1.0.4';

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/icon.svg',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/pwa-maskable-512x512.png',
  '/apple-touch-icon.png'
];

// Domains and endpoints that MUST NEVER be cached
const NEVER_CACHE_PATTERNS = [
  /pagead2\.googlesyndication\.com/,
  /adservice\.google\./,
  /googleads/,
  /doubleclick\.net/,
  /googletagmanager\.com/,
  /google-analytics\.com/,
  /adtrafficquality\.google/,
  /safeframe\.googlesyndication\.com/,
  /adsbygoogle/,
  /\/api\//
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  // Never intercept non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Strictly skip all Google AdSense and third-party advertising resources
  for (const pattern of NEVER_CACHE_PATTERNS) {
    if (pattern.test(url)) {
      return; // Handled directly by standard browser network stack
    }
  }

  // Handle HTML navigation requests (SPA Fallback / Offline)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(event.request);
          if (cached) return cached;
          const rootCached = await caches.match('/index.html') || await caches.match('/');
          if (rootCached) return rootCached;
          return new Response(
            `<!DOCTYPE html>
            <html lang="en">
            <head><meta charset="UTF-8"><title>PlantCare Lab - Offline</title></head>
            <body style="font-family:system-ui;text-align:center;padding:50px 20px;background:#F7F7F0;color:#1B3527;">
              <h1 style="font-size:2rem;margin-bottom:12px;">🌿 Offline Mode</h1>
              <p style="font-size:1.1rem;color:#547761;">You are currently offline. Please reconnect to access the latest plant care guides and live tools.</p>
            </body>
            </html>`,
            { headers: { 'Content-Type': 'text/html' } }
          );
        })
    );
    return;
  }

  // Static Assets: Stale-While-Revalidate or Cache-First for local assets
  if (url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const clone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, clone);
              });
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
  }
});
