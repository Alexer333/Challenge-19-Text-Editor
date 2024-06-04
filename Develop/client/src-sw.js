const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
registerRoute(
  //Makes a callback check with request for the destinations of style, script, and worker, seeing if the request destination is in one of those locations, checking for 
  //stylesheets, JS files, and workerscripts respectively. 
  ({ request }) => ["style", "script", "worker"].includes(request.destination),
  //If it comes up true in one of the areas it has cacher make a cache asset, defining caching behavior for the matched requests, and then also having CacheableResponsePlugin 
  //configure the behavior depending on the status code. 
  new Cacher({
    cacheName: "asset-cache", 
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
)