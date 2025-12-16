// Use timestamp as version to force update on each build
const CACHE_VERSION = Date.now();
const CACHE_NAME = `clinicai-v${CACHE_VERSION}`;
const urlsToCache = [
  '/',
  '/home',
  '/catalog'
];

// Install event - cache resources and skip waiting
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...', CACHE_NAME);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Opened cache:', CACHE_NAME);
        // Cache only existing files
        return Promise.all(
          urlsToCache.map(url => {
            return fetch(url)
              .then(response => {
                if (response.ok) {
                  return cache.put(url, response);
                }
              })
              .catch(() => {
                // Ignore errors for missing files
              });
          })
        );
      })
      .then(() => {
        // Skip waiting to activate immediately
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[Service Worker] Cache install error:', error);
      })
  );
});

// Activate event - clean up old caches and claim clients
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...', CACHE_NAME);
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete all old caches
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      // Claim all clients immediately
      return self.clients.claim();
    })
    .then(() => {
      console.log('[Service Worker] Activated and claimed clients');
      // Notify all clients about the update
      return self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({ type: 'SW_UPDATED', cacheName: CACHE_NAME });
        });
      });
    })
  );
});

// Fetch event - network first, fallback to cache
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension, chrome, and other non-http(s) schemes
  const url = new URL(event.request.url);
  if (!url.protocol.startsWith('http')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Check if valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        
        // Only cache same-origin requests
        const responseUrl = new URL(response.url);
        if (responseUrl.origin !== location.origin) {
          return response;
        }
        
        // Clone the response
        const responseToCache = response.clone();
        
        // Cache the response (with error handling)
        caches.open(CACHE_NAME)
          .then((cache) => {
            try {
              cache.put(event.request, responseToCache);
            } catch (error) {
              console.warn('[Service Worker] Failed to cache:', event.request.url, error);
            }
          })
          .catch((error) => {
            console.warn('[Service Worker] Cache open error:', error);
          });
        
        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(event.request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Return offline page or error
            return new Response('Offline', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

// Message event - handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

