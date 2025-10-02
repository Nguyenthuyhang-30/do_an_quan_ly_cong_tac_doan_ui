import { useEffect, useState } from 'react';

const LogoSwitcher: React.FC = () => {
  const doanLogoSrc = '/doan_logo.png';
  const dnuLogoSrc = '/dnu_logo.png';
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i === 0 ? 1 : 0)), 3000);
    return () => clearInterval(t);
  }, []);

  const commonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 36,
    height: 36,
    objectFit: 'contain',
    transition: 'transform 600ms cubic-bezier(.2,.9,.2,1), opacity 600ms ease',
    willChange: 'transform, opacity',
    pointerEvents: 'none',
  };

  return (
    <div
      className="relative overflow-hidden p-1 rounded-lg transition-all duration-300"
      style={{
        width: 44,
        height: 44,
        borderRadius: 12,
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-hidden={false}
      aria-label="logo switcher"
    >
      <img
        src={doanLogoSrc}
        alt="Đoàn logo"
        style={{
          ...commonStyle,
          transform:
            index === 0
              ? 'translate(-50%, -50%) translateX(0)'
              : 'translate(-50%, -50%) translateX(-120%)',
          opacity: index === 0 ? 1 : 0,
          filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.12))',
        }}
      />
      <img
        src={dnuLogoSrc}
        alt="DNU logo"
        style={{
          ...commonStyle,
          transform:
            index === 1
              ? 'translate(-50%, -50%) translateX(0)'
              : 'translate(-50%, -50%) translateX(120%)',
          opacity: index === 1 ? 1 : 0,
          filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.12))',
        }}
      />
    </div>
  );
};

export default LogoSwitcher;
