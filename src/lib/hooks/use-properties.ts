'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Property,
  PropertyDetail,
  PropertySearchParams,
  PropertySearchResult,
} from '@/types';

export function usePropertySearch(params: PropertySearchParams) {
  const [data, setData] = useState<PropertySearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const fetchProperties = useCallback(async () => {
    // Cancel previous request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoading(true);
    setError(null);

    try {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.set(key, Array.isArray(value) ? value.join(',') : String(value));
        }
      });

      const res = await fetch(`/api/properties/search?${searchParams}`, {
        signal: controller.signal,
      });

      if (!res.ok) throw new Error('Failed to search properties');
      const result = await res.json();
      setData(result);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setIsLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetchProperties();
    return () => abortRef.current?.abort();
  }, [fetchProperties]);

  return { data, isLoading, error, refetch: fetchProperties };
}

export function useProperty(id: string | null) {
  const [property, setProperty] = useState<PropertyDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setProperty(null);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setError(null);

    fetch(`/api/properties/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Property not found');
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setProperty(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { property, isLoading, error };
}

export function useComparables(propertyId: string | null) {
  const [comps, setComps] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!propertyId) {
      setComps([]);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setError(null);

    fetch(`/api/properties/${propertyId}/comps`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch comparables');
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setComps(data.comps || []);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [propertyId]);

  return { comps, isLoading, error };
}
