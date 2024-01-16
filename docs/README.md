# PWA 👣  
Progressive Web Apps ♪ step-by-step ooh baby… ♪  

## 1. Preparation
> ⚠ Before you continue, make sure you can afford a **web server** able to run in **https**.
> Even it only for testing in your local machine.
> Otherwise, *♪ say good night and go… ♪*, forget this PWA 💩.

Place your *plain web site* files in a web server directory.  
Test ```https://your.site/```, make sure it runs properly before carry on.  
Don't bother do an offline test, obviously won't work for now.  

## 2. Manifestation
📄 Create a new file named ```manifest.json``` and link it to your ```index.html``` in the ```<head>``` section.  
```html
<link rel="manifest" href="manifest.json">
```  
📝 Edit ```manifest.json```, write this template:   
```json
{
	"name": "Progressive Web Apps ♪ step-by-step ooh baby… ♪",
	"short_name": "PWA 👣",
	"icons": [
		{
			"src": "/ass/ico36.png",
			"sizes": "36x36",
			"type": "image/png",
			"density": 0.75
		},
		{
			"src": "/ass/ico48.png",
			"sizes": "48x48",
			"type": "image/png",
			"density": 1.0
		},
		{
			"src": "/ass/ico72.png",
			"sizes": "72x72",
			"type": "image/png",
			"density": 1.5
		},
		{
			"src": "/ass/ico96.png",
			"sizes": "96x96",
			"type": "image/png",
			"density": 2.0
		},
		{
			"src": "/ass/ico144.png",
			"sizes": "144x144",
			"type": "image/png",
			"density": 3.0
		},
		{
			"src": "/ass/ico384.png",
			"sizes": "384x384",
			"type": "image/png"
		}
	],
	"id": "/",
	"start_url": "/",
	"display": "standalone"
}
```  
> ℹ As you can see above, we need to belatedly create those png images for your app shortcut icon.  

> 🅾 It is safer to define the whole url for **id** and **start_url** especially if your PWA under a sub dir, e.g. ```"start_url": "https://alegogit.github.io/PWA/"```.  

#### iOS Compatibility
> If you don't give a 💩 for iOS compatibility, skip this step.

iOS does not use the icons from PWA manifest file, thus we need to create another series of png images as minimum as follow:
```html
<!-- iOS 💩 -->
<link rel="apple-touch-icon" href="ass/touch-icon-iphone.png">
<link rel="apple-touch-icon" sizes="152x152" href="ass/touch-icon-ipad.png">
<link rel="apple-touch-icon" sizes="167x167" href="ass/touch-icon-ipad-retina.png">
<link rel="apple-touch-icon" sizes="180x180" href="ass/touch-icon-iphone-retina.png">
```  
place this code in the ```<head>``` section of your ```index.html```  
> ⚠ Avoid icons with transparency - those will not work.

## 3. Insemination
Now let the party begins! 🎉  
Start with a magic spell written in Javascript as below:  
```js
//The service worker file name & location
const SVCWRK = 'svc.js';
/* 
To make your life easier, just put the service worker file in root dir.
Otherwise, you might have to struggle more as described in the error log below: 
DOMException: Failed to register a ServiceWorker for scope ('https://your.site/') 
with script ('https://your.site/ass/svc.js'): 
The path of the provided scope ('/') 
is not under the max scope allowed ('/ass/'). 
Adjust the scope, move the Service Worker script, 
or use the Service-Worker-Allowed HTTP header to allow the scope.
*/
//Check first, whether the browser support 'navigator', otherwise, bye.
if ("serviceWorker" in navigator) {
	navigator.serviceWorker
		.register(SVCWRK, { scope: "/" })
		.then(res => console.log("service worker registered.. ", res))
		.catch(err => console.error("service worker not registered.. ", err))
}
```  
place this code in the ```<body>``` section of your ```index.html```  
> In this example, I put this in a separate file ```jss/eek.js```.

📄 Then create a new file for the **service worker** called by script above, ```svc.js```  
📝 Edit it with this template:  
```js
/* 
Any update on the site, change CHNAME below, 
so all caches will be replaced on 'activate' handler
*/
const CHNAME = 'pwa202310300241';
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
	'README.md',
	'./css/github-markdown.css',
	'./css/ssc.css',
	'./jss/jquery-3.6.0.min.js',
	'./jss/marked.min.js',
	'./jss/eek.js'
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
		}).then(() => self.clients.claim())
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
```

**👌 That's all**