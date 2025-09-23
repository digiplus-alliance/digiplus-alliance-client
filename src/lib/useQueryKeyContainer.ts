import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type KeyContainer = Record<string, string[]>;
const DEFAULT_STORAGE_KEY = 'keyContainers';
const isBrowser = typeof window !== 'undefined';

export type UseQueryKeyContainerOptions = {
  persistKey?: string;
  syncAcrossTabs?: boolean;
  debounceMs?: number;
  debug?: boolean;
};

export function useQueryKeyContainer({
  persistKey = DEFAULT_STORAGE_KEY,
  syncAcrossTabs = true,
  debounceMs = 250,
  debug = false,
}: UseQueryKeyContainerOptions = {}) {
  const [keyContainer, setKeyContainer] = useState<KeyContainer>({});
  const writeTimer = useRef<number | null>(null);
  const mounted = useRef(false);

  // load once on mount
  useEffect(() => {
    if (!isBrowser) return;
    try {
      const raw = localStorage.getItem(persistKey);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        setKeyContainer(parsed as KeyContainer);
      }
    } catch (err) {
      if (debug) console.warn('useQueryKeyContainer: failed to read from storage', err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persistKey]);

  // persist with debounce
  useEffect(() => {
    if (!isBrowser) return;
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    if (writeTimer.current) {
      clearTimeout(writeTimer.current);
    }

    // schedule write
    writeTimer.current = window.setTimeout(() => {
      try {
        localStorage.setItem(persistKey, JSON.stringify(keyContainer));
        if (debug) console.debug('useQueryKeyContainer: saved container', keyContainer);
      } catch (err) {
        if (debug) console.warn('useQueryKeyContainer: failed to save to storage', err);
      }
    }, debounceMs) as unknown as number;

    return () => {
      if (writeTimer.current) {
        clearTimeout(writeTimer.current);
        writeTimer.current = null;
      }
    };
  }, [keyContainer, persistKey, debounceMs, debug]);

  // sync across tabs
  useEffect(() => {
    if (!isBrowser || !syncAcrossTabs) return;
    const handler = (e: StorageEvent) => {
      if (e.key !== persistKey) return;
      try {
        const parsed = e.newValue ? JSON.parse(e.newValue) : {};
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          setKeyContainer(parsed as KeyContainer);
        }
      } catch (err) {
        if (debug) console.warn('useQueryKeyContainer: failed to parse storage event', err);
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [persistKey, syncAcrossTabs, debug]);

  const list = useCallback(() => ({ ...keyContainer }), [keyContainer]);

  const set = useCallback(
    (key: string, value: string[], { overwrite = true }: { overwrite?: boolean } = {}) => {
      if (!key || !Array.isArray(value)) return;
      setKeyContainer(prev => {
        if (!overwrite && prev[key]) return prev;
        return { ...prev, [key]: value };
      });
    },
    []
  );

  const upsert = useCallback((key: string, value: string[]) => set(key, value, { overwrite: true }), [set]);

  const get = useCallback(
    (key: string, mode: 'exact' | 'prefix' | 'contains' = 'exact') => {
      if (!key) return [] as string[];
      if (mode === 'exact') return keyContainer[key] ? [...keyContainer[key]] : [];
      const matches = Object.keys(keyContainer)
        .filter(k => (mode === 'prefix' ? k.startsWith(key) : k.includes(key)))
        .map(k => keyContainer[k]);
      if (mode === 'prefix') return matches.flat();
      return matches.length ? matches[0] : [];
    },
    [keyContainer]
  );

  const remove = useCallback((key: string) => {
    if (!key) return;
    setKeyContainer(prev => {
      if (!prev[key]) return prev;
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  }, []);

  const clear = useCallback(() => setKeyContainer({}), []);

  const setIfAbsent = useCallback((key: string, value: string[]) => set(key, value, { overwrite: false }), [set]);

  const api = useMemo(
    () => ({ set, upsert, setIfAbsent, get, remove, list, clear }),
    [set, upsert, setIfAbsent, get, remove, list, clear]
  );

  return api;
}
