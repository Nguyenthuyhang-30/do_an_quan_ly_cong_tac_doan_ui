import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import UserMenu from './UserMenu';
import LoginButton from './LoginButton';

interface HeaderAuthProps {
  className?: string;
}

/**
 * HeaderAuth Component
 * Displays UserMenu if authenticated, LoginButton if not
 */
const HeaderAuth: React.FC<HeaderAuthProps> = ({ className = '' }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className={`header-auth-loading ${className}`}>
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className={`header-auth ${className}`}>
      {isAuthenticated ? <UserMenu /> : <LoginButton />}
    </div>
  );
};

export default HeaderAuth;
