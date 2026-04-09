interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

export class ProviderCache {
  private cache = new Map<string, CacheEntry<unknown>>();

  private static SEARCH_TTL = 5 * 60 * 1000;     // 5 minutes
  private static DETAIL_TTL = 30 * 60 * 1000;     // 30 minutes
  private static VALUATION_TTL = 60 * 60 * 1000;  // 1 hour

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    return entry.data as T;
  }

  setSearch<T>(key: string, data: T): void {
    this.cache.set(key, { data, expiresAt: Date.now() + ProviderCache.SEARCH_TTL });
  }

  setDetail<T>(key: string, data: T): void {
    this.cache.set(key, { data, expiresAt: Date.now() + ProviderCache.DETAIL_TTL });
  }

  setValuation<T>(key: string, data: T): void {
    this.cache.set(key, { data, expiresAt: Date.now() + ProviderCache.VALUATION_TTL });
  }

  static buildKey(prefix: string, params: Record<string, unknown>): string {
    const sorted = Object.entries(params)
      .filter(([, v]) => v !== undefined && v !== null && v !== '')
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${Array.isArray(v) ? v.join(',') : v}`)
      .join('&');
    return `${prefix}:${sorted}`;
  }
}
