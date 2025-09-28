import { useAuthStore } from '@/store/auth';

export const useAuth = () => {
  const { user, token, isAuthenticated, login, logout } = useAuthStore();

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
