import { UserOutlined } from '@ant-design/icons';
import LogoSwitcher from '@components/logo/LogoSwitcher';
import { Typography } from 'antd';
import { useState } from 'react';
import './HeaderClient.css';

const { Title, Text } = Typography;

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
      className="nav-link nav-link-ripple block px-3 py-3 md:px-4 lg:px-6 text-white font-semibold text-xs md:text-sm lg:text-base uppercase tracking-wide transition-all duration-300 hover:bg-white hover:bg-opacity-20 hover:shadow-md relative"
      style={{
        textDecoration: 'none',
        borderBottom: `3px solid ${isHovered ? 'rgba(255,255,255,0.8)' : 'transparent'}`,
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
      className="text-white shadow-xl sticky top-0 z-50 backdrop-blur-md transition-all duration-300"
      style={{
        background:
          'linear-gradient(135deg, var(--accent-dark) 0%, var(--accent-color) 60%, var(--accent-light) 100%)',
        color: 'var(--text-white)',
        fontFamily:
          'Manrope, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <div className="container mx-auto px-4 lg:px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className="bg-white bg-opacity-12 p-1 rounded-lg backdrop-blur-sm transition-all duration-300 hover:bg-opacity-20"
              style={{ border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <LogoSwitcher />
            </div>

            <div className="min-w-0 flex-1">
              <Title
                level={3}
                className="text-xl sm:text-xl lg:text-xl font-semibold tracking-tight text-white truncate uppercase"
                style={{
                  margin: 0,
                  color: 'var(--text-white)',
                  fontSize: '14px',
                  lineHeight: 1.2,
                  letterSpacing: '0.2px',
                }}
              >
                Trường Đại học Đại Nam
              </Title>

              <div className="flex items-center mt-1 space-x-2 text-xs">
                <span
                  className="inline-flex items-center py-1 rounded-full font-bold text-x"
                  style={{
                    color: 'var(--text-white)',
                    background: 'transparent',
                    fontSize: '18px',
                    lineHeight: '1',
                    letterSpacing: '0.15px',
                    paddingLeft: 0,
                    paddingRight: 0,
                  }}
                >
                  <span className="sm:inline uppercase">Đoàn TNCS Hồ Chí Minh Khoa CNTT</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="text-right hidden lg:block">
              <div
                className="font-semibold text-sm"
                style={{ color: 'var(--text-white)', fontFamily: 'inherit' }}
              >
                Lê Tuấn Anh
              </div>
              <Text
                className="text-xs text-white text-opacity-85"
                style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'inherit' }}
              >
                Phó bí thư Đoàn khoa CNTT
              </Text>
            </div>

            <div
              className="bg-white bg-opacity-12 p-2 flex justify-center align-middle rounded-lg backdrop-blur-sm transition-all duration-300 hover:bg-opacity-20 hover:scale-105 cursor-pointer"
              style={{ border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <UserOutlined style={{ fontSize: 22, color: 'var(--accent-color)' }} />
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Bar */}
      <nav
        className="w-full"
        style={{
          background: 'var(--primary-color, #b71c1c)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4 lg:px-6">
          <ul className="flex items-center justify-center flex-wrap space-x-0 md:space-x-1 lg:space-x-2 list-none m-0 p-0">
            {navItems.map((item) => (
              <>
                <li key={item.href} className="nav-item">
                  <NavLink href={item.href}>{item.label}</NavLink>
                </li>
              </>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default HeaderClient;
