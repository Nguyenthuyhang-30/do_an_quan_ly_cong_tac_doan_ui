import React from 'react';
import './LoginButton.scss';

interface LoginButtonProps {
  type?: 'default' | 'primary' | 'link' | 'text';
  size?: 'small' | 'middle' | 'large';
  className?: string;
}

/**
 * LoginButton Component
 * Displays a login button that navigates to login page
 */
const LoginButton: React.FC<LoginButtonProps> = () => {
  const handleLoginClick = () => {
    window.location.href = '/auth/login';
  };

  return (
    <button
      className="bg-gradient-to-r from-blue-900 to-blue-700 text-white font-bold rounded-md hover:from-blue-800 hover:to-blue-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 whitespace-nowrap"
      style={{
        fontSize: 'clamp(0.55rem, 1.8vw, 0.85rem)',
        letterSpacing: '0.1px',
        padding: 'clamp(0.3rem, 1.2vw, 0.5rem) clamp(0.4rem, 2vw, 0.8rem)',
      }}
      onClick={handleLoginClick}
    >
      Đăng nhập
    </button>
  );
};

export default LoginButton;
