const SVCWRK = 'svc.js';
if ("serviceWorker" in navigator) {
	navigator.serviceWorker
		.register(SVCWRK, { scope: "/" })
		.then(res => console.log("service worker registered.. ", res))
		.catch(err => console.error("service worker not registered.. ", err))
}