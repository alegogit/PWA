/* 
Any update on the site, change CHNAME below, 
so all caches will be replaced on 'activate' handler
*/
const CHNAME = 'pwa202311152202';
// List all the required files/resources
/* It's okay to have some files being forgotten, add them later. 
Console log will tell you what file needed like below:
Failed to load ‘https://your.site/manifest.json’. 
A ServiceWorker passed a promise to FetchEvent.respondWith() that rejected 
with ‘TypeError: NetworkError when attempting to fetch resource.’. */
const ASSETS = [
	'./',
	'index.html',
	'favicon.ico',
	'manifest.json',
	'README.md',
	'./css/github-markdown.css',
	'./css/ssc.css',
	'./jss/jquery-3.6.0.min.js',
	'./jss/marked.min.js',
	'./jss/eek.js',
	'./ass/ico36.png',
	'./ass/ico48.png',
	'./ass/ico72.png',
	'./ass/ico96.png',
	'./ass/ico144.png',
	'./ass/ico384.png',
	'./ass/touch-icon-iphone.png',
	'./ass/touch-icon-ipad.png',
	'./ass/touch-icon-ipad-retina.png',
	'./ass/touch-icon-iphone-retina.png'
];
// The install handler takes care of precaching the resources
self.addEventListener('install', (evt) => {
	evt.waitUntil(
		caches.open(CHNAME).then(cache => {
			cache.addAll(ASSETS)
		}).then(self.skipWaiting())
	)
});
// The activate handler takes care of cleaning up old caches
self.addEventListener("activate", (evt) => {
	const CURCHC = [CHNAME];
	evt.waitUntil(
		caches.keys().then(keys => {
			return keys.filter(key => !CURCHC.includes(key))
		}).then(keys => {
			return Promise.all(keys.map(key => {
				return caches.delete(key)
			}))
		}).then(() => self.registration.update())
		.then(() => self.clients.claim())
	)
});
// The fetch handler serves responses of resources from a cache
self.addEventListener('fetch', (evt) => {
	evt.respondWith(
		caches.match(evt.request).then(res => {
			return res || fetch(evt.request)
		})
	)
});