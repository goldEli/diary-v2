import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth';
import { User } from '@/types';

export const useAuth = () => {
  const { user, token, isAuthenticated, login, logout } = useAuthStore();

  useEffect(() => {
    // 检查localStorage中是否有token
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser && !isAuthenticated) {
      try {
        const userData: User = JSON.parse(storedUser);
        login(userData, storedToken);
      } catch (error) {
        // 如果解析失败，清除存储
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, [login, isAuthenticated]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout: handleLogout,
  };
};
