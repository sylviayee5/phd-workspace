// Thin service worker loader.
// Service workers can only control URLs under their own directory on GitHub Pages
// (no Service-Worker-Allowed header), so we place this file next to the main HTML.
// It just delegates to the real implementation in /pwa/service-worker.js.
importScripts('../pwa/service-worker.js');
