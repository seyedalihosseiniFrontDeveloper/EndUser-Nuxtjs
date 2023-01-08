if (location.hostname !== 'localhost') {
    try {
        const urlSearchParams = new URLSearchParams(location.search);
        const PARAMS = Object.fromEntries(urlSearchParams.entries());
        let CURRENT_CACHE = {
            static: 'static-cache-v' + PARAMS.version,
            dynamic: 'dynamic-cache-v' + PARAMS.version
        };


        self.addEventListener('install', (event) => {
            console.log('installing service worker. version:', PARAMS.version);
            event.waitUntil(
                caches.open(CURRENT_CACHE.static)
                    .then((cache) => {
                        cache.addAll([]).then();
                    })
                    .catch(err => console.log('sw caches open error', err))
            )
        })

        self.addEventListener('activate', (event) => {
            console.log('activating service worker', event)
            event.waitUntil(
                caches.keys().then(cacheNames => {
                    let expectedCacheNames = Object.values(CURRENT_CACHE);
                    return Promise.all(
                        cacheNames.map(cacheName => {
                            if (!expectedCacheNames.includes(cacheName)) {
                                console.log('Deleting out of date cache:', cacheName)
                                return caches.delete(cacheName)
                            }
                        })
                    )
                })
            )

        })

        const onlyOnline = [
            location.origin + '/config.json',
            location.origin + `/sw.js`,
        ]
        self.addEventListener('fetch', (event) => {
            if (!event.request)
                return event.preventDefault()

            let method = event.request.method
            let dontCache = event.request.url.match('api')?.length || method === 'POST' || method === 'PUT' || method === 'PATCH' || method === 'DELETE' || onlyOnline.indexOf(event.request) > -1 || PARAMS.mode === 'development'

            if (dontCache)
                return event.respondWith(
                    fetch(event.request)
                )
            else
                event.respondWith(
                    caches.match(event.request).then(response => {
                        if (response) return response;
                        return fetch(event.request).then(networkResponse => {
                            return caches.open(CURRENT_CACHE.dynamic).then(cache => cache.put(event.request, networkResponse.clone()).then(() => networkResponse).catch(cacheError => networkResponse)).catch(responseError => networkResponse)
                        }).catch(networkResponseError => {
                            console.log('sw networkResponse', networkResponseError)
                        })
                    })
                )
        });

    } catch (e) {
        console.log('error in sw', e)
    }
}