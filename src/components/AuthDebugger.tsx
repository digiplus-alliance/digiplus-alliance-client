import { useAuthStore } from '@/store/auth';
import { useEffect, useState } from 'react';

export function AuthDebugger() {
  const { user, accessToken } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [localStorageValue, setLocalStorageValue] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setLocalStorageValue(localStorage.getItem('auth-storage'));
  }, []);

  useEffect(() => {
    if (mounted) {
      setLocalStorageValue(localStorage.getItem('auth-storage'));
    }
  }, [user, accessToken, mounted]);

  if (!mounted) {
    return <div>Loading auth debug...</div>;
  }

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white border rounded-lg shadow-lg max-w-md text-xs">
      <h3 className="font-bold mb-2">Auth Debug</h3>
      
      <div className="space-y-1">
        <div>
          <strong>User:</strong> {user ? `${user.email} (${user.role})` : 'null'}
        </div>
        <div>
          <strong>Token:</strong> {accessToken ? `${accessToken.substring(0, 20)}...` : 'null'}
        </div>
        <div>
          <strong>LocalStorage:</strong> 
          <pre className="text-xs mt-1 bg-gray-100 p-2 rounded overflow-auto max-h-20">
            {localStorageValue || 'null'}
          </pre>
        </div>
      </div>
    </div>
  );
}
