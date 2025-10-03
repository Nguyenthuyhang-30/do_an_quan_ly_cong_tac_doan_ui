import { useEffect, useState } from 'react';

const LogoSwitcher: React.FC = () => {
  const doanLogoSrc = '/logos/doan_logo.png'; // Đoàn
  const dnuLogoSrc = '/logos/dainam_logo.png'; // Trường (DNU)
  const khoaLogoSrc = '/logos/fitdnu_logo.png'; // Khoa
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % 3), 2500);
    return () => clearInterval(t);
  }, []);

  const commonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 54,
    height: 54,
    objectFit: 'contain',
    transition: 'transform 600ms cubic-bezier(.2,.9,.2,1), opacity 600ms ease',
    willChange: 'transform, opacity',
    pointerEvents: 'none',
  };

  return (
    <div
      className="relative overflow-hidden rounded-lg transition-all duration-300"
      style={{
        width: 70,
        height: 70,
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
      {
        // Helper to compute transform based on position index (0=Đoàn,1=Trường,2=Khoa)
      }
      {[
        { src: doanLogoSrc, alt: 'Đoàn logo', pos: 0 },
        { src: dnuLogoSrc, alt: 'Trường DNU logo', pos: 1 },
        { src: khoaLogoSrc, alt: 'Khoa logo', pos: 2 },
      ].map(({ src, alt, pos }) => {
        const offset = pos - index; // -1,0,1 etc
        const translateX = `${offset * 140}%`;
        const scale = offset === 0 ? 1 : 0.9;
        const opacity = offset === 0 ? 1 : 0;
        return (
          <img
            key={pos}
            src={src}
            alt={alt}
            style={{
              ...commonStyle,
              transform: `translate(-50%, -50%) translateX(${translateX}) scale(${scale})`,
              opacity,
              filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.12))',
            }}
          />
        );
      })}
    </div>
  );
};

export default LogoSwitcher;
