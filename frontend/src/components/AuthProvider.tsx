'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth';
import { User } from '@/types';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const { login } = useAuthStore();

  useEffect(() => {
    // 只在客户端执行
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
          const userData: User = JSON.parse(storedUser);
          login(userData, storedToken);
        }
      } catch (error) {
        // 如果解析失败，清除存储
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, [login]);

  // 在认证状态初始化完成前显示加载状态
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
