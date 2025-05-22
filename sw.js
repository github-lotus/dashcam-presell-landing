// Service Worker for Dash Cam Landing Page
// Provides caching strategy for offline functionality and improved performance

const CACHE_NAME = 'dashcam-landing-v1';
const CACHE_URLS = [
    '/',
    '/index.html',
    '/styles.css',
    '/main.js',
    '/images/dashcam.webp',
    '/images/abcnews.png',
    '/images/foxnews.png',
    '/images/newyorkpost.png',
    'https://cdn.tailwindcss.com',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@600;700&display=swap'
];

// Install event - cache essential resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching files');
                return cache.addAll(CACHE_URLS);
            })
            .catch(err => console.log('Service Worker: Cache failed', err))
    );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;
    
    // Skip external analytics and tracking requests
    if (event.request.url.includes('google-analytics') || 
        event.request.url.includes('facebook') ||
        event.request.url.includes('dobf67dfstrk.com')) {
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version if available
                if (response) {
                    return response;
                }
                
                // Otherwise fetch from network
                return fetch(event.request)
                    .then(response => {
                        // Don't cache if not a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Clone the response for caching
                        const responseToCache = response.clone();
                        
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch(() => {
                        // Return offline fallback for HTML pages
                        if (event.request.destination === 'document') {
                            return caches.match('/index.html');
                        }
                    });
            })
    );
});