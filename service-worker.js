const CACHE_NAME = "mcpa-prototype-v18";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./assets/mcpa-logo-full.png",
  "./assets/mcpa-logo-square.png",
  "./assets/mcpa-logo-wide.png",
  "./assets/team-shockers.png",
  "./assets/team-sharks.png",
  "./assets/team-rage.png",
  "./assets/team-pride.png",
  "./assets/team-kings.png",
  "./assets/team-huskies.png",
  "./assets/team-hoyas.png",
  "./assets/team-fusion.png",
  "./assets/team-wave.png",
  "./assets/team-energy.png",
  "./assets/team-dragons.png",
  "./assets/team-crush.png",
  "./sample-final-score.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
