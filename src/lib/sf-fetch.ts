const CACHE_NAME = 'SF_FETCH';

/**
 * Executes a fetch caching the response for a specific amount of time.
 * You can check the date that the response was executed passing the header to the function getResponseDate
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

    if (cachedResponse && new Date().getTime() < Number(new Headers(cachedResponse.headers).get('date')) + time) {
        return cachedResponse;
    }

    const response = await fetch(url);

    const headers = new Headers(response.headers);
    headers.set('date', new Date().getTime().toString());

    if (response && (response.status <= 200 || response.status > 300)) {
        const responseToCache = response.clone();
        cacheStorage.put(url, new Response(responseToCache.body, {
            headers,
            status: responseToCache.status,
            statusText: responseToCache.statusText
        }));
    }

    return new Response(response.body, {
        headers,
        status: response.status,
        statusText: response.statusText
    });
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

/**
 * Get the date that the response was executed by the header 'date'
 * @param response 
 */
export function getResponseDate(response: Response): Date | null {
    const dateHeader = Number(response.headers.get(`date`));

    if (!dateHeader)
        return null;

    return new Date(dateHeader);
}