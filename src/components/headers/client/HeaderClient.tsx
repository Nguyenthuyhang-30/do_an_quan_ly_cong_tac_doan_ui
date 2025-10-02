import LogoSwitcher from '@components/logo/LogoSwitcher';
import { Typography } from 'antd';
import { useState } from 'react';
import './HeaderClient.css';

const { Title } = Typography;

// Navigation Link Component
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      className="nav-link nav-link-ripple block text-white font-semibold uppercase tracking-wide transition-all duration-300 hover:bg-white hover:bg-opacity-20 hover:shadow-md relative"
      style={{
        textDecoration: 'none',
        borderBottom: `3px solid ${isHovered ? 'rgba(255,255,255,0.8)' : 'transparent'}`,
        padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(0.5rem, 2.5vw, 1.5rem)',
        fontSize: 'clamp(0.625rem, 1.5vw, 0.875rem)',
        letterSpacing: '0.05em',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {children}
    </a>
  );
};

const HeaderClient = () => {
  const navItems = [
    { href: '/', label: 'Trang chủ' },
    { href: '/tra-cuu-hoat-dong', label: 'Tra cứu hoạt động đoàn' },
    { href: '/bch-chi-doan', label: 'BCH chi đoàn' },
    { href: '/lien-he', label: 'Liên hệ' },
  ];

  return (
    <header
      className="text-blue-900 shadow-xl sticky top-0 z-50 backdrop-blur-md transition-all duration-300"
      style={{
        background: 'white',
        color: '#1E3A8A', // Tailwind blue-900
        fontFamily:
          'Manrope, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <div
        className="container mx-auto py-1 sm:py-2"
        style={{
          paddingLeft: 'clamp(0.25rem, 1.5vw, 1.5rem)',
          paddingRight: 'clamp(0.25rem, 1.5vw, 1.5rem)',
        }}
      >
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          {/* Logo Section */}
          <div
            className="flex items-center flex-shrink-0"
            style={{ marginRight: 'clamp(0.25rem, 1vw, 0.75rem)' }}
          >
            <div
              className="transition-all duration-300"
              style={{ transform: 'scale(clamp(0.65, 1.5vw + 0.5, 1))' }}
            >
              <LogoSwitcher />
            </div>
          </div>
          {/* Title Section - Responsive */}
          <div className="min-w-0 flex-1 overflow-hidden">
            <Title
              level={3}
              className="font-semibold tracking-tight text-blue-900 uppercase mb-0 header-title"
              style={{
                margin: 0,
                color: '#1E3A8A',
                fontSize: 'clamp(0.4rem, 2.2vw, 0.875rem)',
                lineHeight: 1.2,
                letterSpacing: 'clamp(-0.5px, 0.5vw, 0.2px)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              ĐOÀN THANH NIÊN TRƯỜNG ĐẠI HỌC ĐẠI NAM
            </Title>

            <div className="flex items-center mt-0">
              <span
                className="inline-flex items-center font-extrabold uppercase rounded-md transition-all duration-300 header-subtitle"
                style={{
                  color: '#001F54', // Navy blue
                  fontSize: 'clamp(0.48rem, 2.8vw, 1.15rem)',
                  lineHeight: '1.2',
                  letterSpacing: 'clamp(-0.5px, 0.5vw, 0.3px)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                <span className="hidden sm:inline">LIÊN CHI ĐOÀN KHOA CÔNG NGHỆ THÔNG TIN</span>
                <span className="inline sm:hidden">LIÊN CHI ĐOÀN KHOA CNTT</span>
              </span>
            </div>
          </div>
          {/* User Section */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* User info - Hidden on small screens */}
            <button
              className="bg-gradient-to-r from-blue-900 to-blue-700 text-white font-bold rounded-md hover:from-blue-800 hover:to-blue-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 whitespace-nowrap"
              style={{
                fontSize: 'clamp(0.55rem, 1.8vw, 0.85rem)',
                letterSpacing: '0.1px',
                padding: 'clamp(0.3rem, 1.2vw, 0.5rem) clamp(0.4rem, 2vw, 0.8rem)',
              }}
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
      {/* Navigation Bar */}
      <nav
        className="w-full overflow-x-auto scrollbar-hide"
        style={{
          background: 'var(--primary-color, #1E40AF)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-2 sm:px-4 lg:px-6">
          <ul className="flex items-center justify-start sm:justify-center gap-0.5 sm:gap-1 md:gap-2 list-none m-0 p-0 min-w-max sm:min-w-0">
            {navItems.map((item) => (
              <li key={item.href} className="nav-item flex-shrink-0">
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default HeaderClient;
