// Service worker de Revisea (A5, P24).
// Le nom du cache est lié à la version : l'assemblage remplace le marqueur ci-dessous et refuse
// de livrer si le numéro ne correspond pas à celui de index.html. L'appli relit ce numéro ici
// (sw.js, jamais mis en cache) pour savoir s'il y a une mise à jour.
const VERSION = '1.0-e1c';
const CACHE = 'revisea-' + VERSION;
// index.html contient tout le code, les styles et les polices : c'est le seul fichier indispensable.
const ESSENTIELS = ['./', 'index.html'];
// Déposés une seule fois : on les garde s'ils sont là, sans bloquer l'installation sinon.
const FACULTATIFS = ['manifest.webmanifest', 'icone-192.png', 'icone-512.png'];

self.addEventListener('install', (ev) => {
  // cache: 'reload' : on contourne le cache HTTP de GitHub Pages (10 min) pour ne pas
  // garder une ancienne copie sous le nom de la nouvelle version.
  const frais = (u) => new Request(u, { cache: 'reload' });
  ev.waitUntil(caches.open(CACHE).then(async (c) => {
    await c.addAll(ESSENTIELS.map(frais));
    await Promise.all(FACULTATIFS.map((u) => c.add(frais(u)).catch(() => {})));
  }));
  // Pas de skipWaiting automatique : la nouvelle version attend le geste « Installer ».
});

self.addEventListener('activate', (ev) => {
  ev.waitUntil((async () => {
    const noms = await caches.keys();
    await Promise.all(noms.filter((n) => n.startsWith('revisea-') && n !== CACHE).map((n) => caches.delete(n)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', (ev) => {
  if (ev.data && ev.data.type === 'ACTIVER') self.skipWaiting();
});

self.addEventListener('fetch', (ev) => {
  const req = ev.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  // Jamais en cache ici : le signal de mise à jour (sw.js) et le contenu (gardé par l'appli dans IndexedDB).
  if (url.pathname.endsWith('/sw.js') || url.pathname.includes('/contenu/')) return;

  if (req.mode === 'navigate') {
    ev.respondWith(caches.match('index.html', { cacheName: CACHE }).then((r) => r || fetch(req)));
    return;
  }
  ev.respondWith(
    caches.match(req, { cacheName: CACHE, ignoreSearch: true }).then((r) => r || fetch(req))
  );
});
