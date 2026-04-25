'use client';

import { useEffect, useState } from 'react';

import { checkSession, getMe } from '@/lib/api/api';
import { useAuthStore } from '@/lib/store/authStore';

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(true);

  const setUser = useAuthStore(state => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    state => state.clearIsAuthenticated
  );

  useEffect(() => {
    async function fetchUser() {
        
      try {
        const isAuthenticated = await checkSession();

        if (isAuthenticated) {
          const user = await getMe();

          if (user) {
            setUser(user);
          } else {
            clearIsAuthenticated();
          }
        } else {
          clearIsAuthenticated();
        }
      } catch  {
        clearIsAuthenticated();
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, [clearIsAuthenticated, setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return children;
}

export default AuthProvider;
