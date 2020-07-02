const BROWSER_CACHE_TTL = 14400000; // 4 hours

async function fetchFromCache(url: string, ttl: number = BROWSER_CACHE_TTL): Promise<JSON> {
    try {
        const cachedData = localStorage.getItem(url);

        if (!cachedData) {
            throw new Error("cache miss");
        }

        const {
            data,
            time
        } = JSON.parse(cachedData);

        const now = (new Date()).getTime();

        if (!time || now - time > ttl) {
            throw new Error("cache expired");
        }

        return data;
    } catch (error) {
        return await window.fetch(url)
            .then((response) => response.json())
            .then((data: JSON) => {
                try {
                    localStorage.setItem(url, JSON.stringify({
                        data,
                        time: (new Date()).getTime()
                    }));
                } catch (e) {
                    // only a problem if we can't set storage, just make live calls
                }

                return data;
            });
    }
}

export default fetchFromCache;
