const SVCWRK = 'svc.js';
window.addEventListener('beforeinstallprompt', (evt) => {
	//shit only works in chrome
	console.log(evt)
	// evt.currentTarget.prompt()
})
window.addEventListener('appinstalled', () => {
	console.log('PWA was installed')
})
/* getEventListeners((evt) => {
	console.log('EVA: ', evt)
}) */
if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register(SVCWRK)
		.catch(err => console.error("service worker not registered.. ", err))
}