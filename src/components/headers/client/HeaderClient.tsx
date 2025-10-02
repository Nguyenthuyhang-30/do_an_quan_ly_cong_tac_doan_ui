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
    { href: '/van-ban-tai-lieu', label: 'Văn bản - Tài liệu' },
    { href: '/lich-lam-viec', label: 'Lịch làm việc' },
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
      <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-0.5 sm:py-1">
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <div className="transition-all duration-300">
              <LogoSwitcher />
            </div>
          </div>
          {/* Title Section - Responsive */}
          <div className="min-w-0 flex-1 overflow-hidden">
            <Title
              level={3}
              className="font-semibold tracking-tight text-blue-900 uppercase mb-0 sm:mb-1"
              style={{
                margin: 0,
                color: '#1E3A8A',
                fontSize: 'clamp(0.65rem, 2vw, 0.875rem)', // Responsive font size
                lineHeight: 1.2,
                letterSpacing: '0.2px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              <span className="hidden lg:inline">ĐOÀN THANH NIÊN TRƯỜNG ĐẠI HỌC ĐẠI NAM</span>
              <span className="hidden sm:inline lg:hidden">ĐTN TRƯỜNG ĐH ĐẠI NAM</span>
              <span className="inline sm:hidden">ĐTN ĐH ĐN</span>
            </Title>

            <div className="flex items-center space-x-1 sm:space-x-2 mt-1">
              <span
                className="inline-flex items-center font-extrabold uppercase rounded-md transition-all duration-300"
                style={{
                  color: '#001F54', // Navy blue
                  fontSize: 'clamp(0.8rem, 2.5vw, 1.15rem)', // Slightly larger
                  lineHeight: '1.3',
                  letterSpacing: '0.5px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                <span className="hidden md:inline">LIÊN CHI ĐOÀN KHOA CNTT</span>
                <span className="hidden sm:inline md:hidden">LCĐ KHOA CNTT</span>
                <span className="inline sm:hidden">LCĐ CNTT</span>
              </span>
            </div>
          </div>
          {/* User Section */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* User info - Hidden on small screens */}
            <button
              className="bg-gradient-to-r from-blue-900 to-blue-700 text-white font-bold py-2 px-4 rounded-lg hover:from-blue-800 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              style={{
                fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)',
                letterSpacing: '0.3px',
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
          background:
            'linear-gradient(135deg, var(--accent-dark) 0%, var(--accent-color) 60%, var(--accent-light) 100%)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
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
