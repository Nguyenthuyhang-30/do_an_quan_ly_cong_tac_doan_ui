import React, { useEffect, useState, useCallback } from 'react';
import { User } from '../types/auth';
import authService from '../services/api/auth.service';
import { notification } from 'antd';
import { AuthContext } from './AuthContext';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize user from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const currentUser = authService.getCurrentUser();
        const isAuth = authService.isAuthenticated();

        if (currentUser && isAuth) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        authService.clearAuth();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await authService.login({ email, password });

      setUser(response.member);

      notification.success({
        message: 'Đăng nhập thành công!',
        description: `Chào mừng ${response.member.fullName} trở lại!`,
        placement: 'topRight',
        duration: 3,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!';

      notification.error({
        message: 'Đăng nhập thất bại',
        description: errorMessage,
        placement: 'topRight',
        duration: 4,
      });

      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await authService.logout();

      setUser(null);

      notification.info({
        message: 'Đăng xuất thành công',
        description: 'Hẹn gặp lại bạn!',
        placement: 'topRight',
        duration: 3,
      });

      // Redirect to home page
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      // Clear auth even if API call fails
      authService.clearAuth();
      setUser(null);
      window.location.href = '/';
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshUser = useCallback(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const value = {
    user,
    isAuthenticated: !!user && authService.isAuthenticated(),
    isLoading,
    login,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
