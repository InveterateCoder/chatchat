/* eslint-disable no-restricted-globals */
/* eslint-disable arrow-parens */
const CACHE_V = 'cache-v1'

const PRECACHE_URLS = [
  'index.html', './',
  'app.bundle.js', 'vendor.bundle.js',
]

self.addEventListener('install', event => {
  event.waitUntil(async () => {
    const cache = await caches.open(CACHE_V)
    await cache.addAll(PRECACHE_URLS)
    self.skipWaiting()
  })
})

self.addEventListener('activate', event => {
  event.waitUntil(async () => {
    let keys = caches.keys()
    keys = keys.filter(key => key !== CACHE_V)
    await Promise.all(keys.map(key => caches.delete(key)))
    self.clients.claim()
  })
})

self.addEventListener('fetch', event => {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(async () => {
      const cachedRes = await caches.match(event.request)
      if (cachedRes) return cachedRes
      const cache = await caches.open(CACHE_V)
      const res = await fetch(event.request)
      await cache.put(event.request, res.clone())
      return res
    })
  }
})
