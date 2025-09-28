'use client';

import { useEffect, useState } from 'react';

export function JWTDebugger() {
  const [tokenData, setTokenData] = useState<any>(null);
  const [cookieValue, setCookieValue] = useState<string | null>(null);

  useEffect(() => {
    // Get token from cookies (client-side)
    const cookies = document.cookie.split(';');
    const accessTokenCookie = cookies.find(cookie => 
      cookie.trim().startsWith('accessToken=')
    );
    
    if (accessTokenCookie) {
      const token = accessTokenCookie.split('=')[1];
      setCookieValue(token);
      
      // Decode JWT
      try {
        const payload = token.split('.')[1];
        if (payload) {
          const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
          setTokenData(decoded);
        }
      } catch (error) {
        console.error('Error decoding JWT:', error);
      }
    }
  }, []);

  return (
    <div className="fixed bottom-4 left-4 p-4 bg-yellow-100 border rounded-lg shadow-lg max-w-md text-xs">
      <h3 className="font-bold mb-2">JWT Debug</h3>
      
      <div className="space-y-1">
        <div>
          <strong>Cookie Present:</strong> {cookieValue ? 'Yes' : 'No'}
        </div>
        <div>
          <strong>Token (first 30 chars):</strong> {cookieValue?.substring(0, 30)}...
        </div>
        <div>
          <strong>Decoded Payload:</strong>
          <pre className="text-xs mt-1 bg-gray-100 p-2 rounded overflow-auto max-h-32">
            {tokenData ? JSON.stringify(tokenData, null, 2) : 'null'}
          </pre>
        </div>
      </div>
    </div>
  );
}
