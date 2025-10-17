/**
 * Token Status Display Component
 * Shows token expiration info and status (useful for testing/debugging)
 */

'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth';

function decodeJWT(token: string): { exp?: number } | null {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}

export function TokenStatusDisplay() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!accessToken) {
      setTimeRemaining('No token');
      return;
    }

    const decoded = decodeJWT(accessToken);
    if (!decoded || !decoded.exp) {
      setTimeRemaining('Invalid token');
      return;
    }

    const updateTimeRemaining = () => {
      const expirationTime = decoded.exp! * 1000;
      const currentTime = Date.now();
      const timeLeft = expirationTime - currentTime;

      if (timeLeft <= 0) {
        setIsExpired(true);
        setTimeRemaining('Expired');
        return;
      }

      setIsExpired(false);
      const minutes = Math.floor(timeLeft / 1000 / 60);
      const seconds = Math.floor((timeLeft / 1000) % 60);
      setTimeRemaining(`${minutes}m ${seconds}s`);
    };

    updateTimeRemaining();
    const interval = setInterval(updateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [accessToken]);

  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  if (!accessToken) {
    return (
      <div className="fixed bottom-4 left-4 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm">
        <div className="font-semibold">Token Status</div>
        <div className="text-gray-300">Not logged in</div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm">
      <div className="font-semibold">Token Status</div>
      <div className={isExpired ? 'text-red-400' : 'text-green-400'}>
        {isExpired ? '❌' : '✅'} {timeRemaining}
      </div>
    </div>
  );
}
