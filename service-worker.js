const CACHE_NAME = "alice-bakery-app-v1";
const APP_SHELL = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./cloud-sync.js",
    "./data-transfer.js",
    "./pwa-register.js",
    "./manifest.webmanifest",
    "./alice-app-icon.svg",
    "./logo-alice.webp"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(APP_SHELL))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(
                keys.filter(key => key.startsWith("alice-bakery-app-") && key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", event => {
    const request = event.request;
    const url = new URL(request.url);
    if (request.method !== "GET" || url.origin !== self.location.origin) return;

    if (request.mode === "navigate") {
        event.respondWith(
            fetch(request)
                .then(response => {
                    if (response.ok) {
                        const copy = response.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put("./index.html", copy));
                    }
                    return response;
                })
                .catch(() => caches.match(request).then(response => response || caches.match("./index.html")))
        );
        return;
    }

    event.respondWith(
        fetch(request)
            .then(response => {
                if (response.ok && response.type === "basic") {
                    const copy = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
                }
                return response;
            })
            .catch(error => caches.match(request).then(cached => {
                if (cached) return cached;
                throw error;
            }))
    );
});
