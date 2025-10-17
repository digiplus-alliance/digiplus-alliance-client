'use client';

import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useTokenRefreshInitializer } from '@/hooks/useTokenRefreshInitializer';

const isBrowser = typeof window !== 'undefined';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,         // 1 minute
      gcTime: 1000 * 60 * 60 * 24,   // 24 hours
    },
  },
});

// Setup async persister (works in browser or other async storages)
const asyncStoragePersister = isBrowser
  ? createAsyncStoragePersister({
      storage: window.localStorage,
      serialize: JSON.stringify,
      deserialize: JSON.parse,
      // optional: throttleTime, maxSize, etc
    })
  : undefined;

// Component to initialize token refresh
function TokenRefreshInitializer() {
  useTokenRefreshInitializer();
  return null;
}

export function AppProviders({ children }: { children: ReactNode }) {
  if (!isBrowser || !asyncStoragePersister) {
    return (
      <QueryClientProvider client={queryClient}>
        <TokenRefreshInitializer />
        {children}
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    );
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: asyncStoragePersister,
        maxAge: 1000 * 60 * 60 * 24, 
        dehydrateOptions: {
          shouldDehydrateQuery: (query) => {
            return (query.meta as { persist?: boolean })?.persist === true;
          },
        },
      }}
    >
      <TokenRefreshInitializer />
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </PersistQueryClientProvider>
  );
}
