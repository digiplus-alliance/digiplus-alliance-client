/**
 * Manual Token Refresh Component
 * Provides a button to manually trigger token refresh (useful for testing/debugging)
 */

'use client';

import { useState } from 'react';
import { manualRefresh } from '@/lib/tokenRefresh';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function ManualTokenRefresh() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    try {
      const success = await manualRefresh();
      if (success) {
        toast.success('Token refreshed successfully');
      } else {
        toast.error('Failed to refresh token');
      }
    } catch (error) {
      toast.error('Error refreshing token');
    } finally {
      setIsRefreshing(false);
    }
  };

  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <Button
      onClick={handleManualRefresh}
      disabled={isRefreshing}
      variant="outline"
      size="sm"
    >
      {isRefreshing ? 'Refreshing...' : 'Manual Token Refresh'}
    </Button>
  );
}
