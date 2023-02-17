const CACHE_NAME = 'SF_FETCH';
const CACHE_DATE_EXPIRACY_KEY = `${CACHE_NAME}_DATE`;

/**
 * Executes a fetch caching the response for a specific amount of time
 * @param url 
 * The url to make the request
 * @param time 
 * The time that cache would be valid in miliseconds
 * @default 3600000 => 5 minutes
 * @returns Response
 */
export async function fetchWithCache(url: string, time: number = 3600000): Promise<Response> {
    const cacheStorage: Cache = await caches.open(CACHE_NAME);

    const cachedResponse = await cacheStorage.match(url);

    if (cachedResponse) {
        const now = new Date().getTime();
        const cachedResponseDate = new Headers(cachedResponse.headers).get(CACHE_DATE_EXPIRACY_KEY);
        if (cachedResponseDate !== null && now < Number(cachedResponseDate) + time) {
            return cachedResponse;
        }
    }

    const response = await fetch(url);

    if (response && (response.status <= 200 || response.status > 300)) {
        const responseToCache = response.clone();
        const headers = new Headers(responseToCache.headers);
        headers.set(CACHE_DATE_EXPIRACY_KEY, new Date().getTime().toString());
        cacheStorage.put(url, new Response(responseToCache.body, {
            headers,
            status: responseToCache.status,
            statusText: responseToCache.statusText
        }));
    }

    return response;
}

/**
 * Clear cache url
 * @param url 
 */
export async function clearCache(url: string): Promise<void> {
    const cacheStorage: Cache = await caches.open(CACHE_NAME);

    cacheStorage.delete(url);
}


/**
 * Reset all cache url
 */
export async function resetCache(): Promise<void> {
    const cacheStorage: Cache = await caches.open(CACHE_NAME);

    cacheStorage.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
            cacheStorage.delete(cacheName.url);
        });
    });
}

/**
 * Clear all cache keys that includes the value passed as parameter
 * @param value 
 */
export async function clearCacheKeysThatIncludes(value: string): Promise<void> {
    const cacheStorage: Cache = await caches.open(CACHE_NAME);

    cacheStorage.keys().then(cacheNames => {
        cacheNames.filter(names => names.url.includes(value)).forEach(cacheName => {
            cacheStorage.delete(cacheName.url);
        });
    });
}