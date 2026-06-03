import React from 'react';
import '../styles/Animations.css';
import '../styles/WeddingCard.css';

const FloralBorder = () => {
  const WhiteFlowerSVG = ({ size = 65, style = {} }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className="flower-hover-pulse"
      style={{
        filter: 'drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.4))',
        zIndex: 5,
        pointerEvents: 'auto',
        ...style,
      }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="leafGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#AA7C11" />
          <stop offset="35%" stopColor="#FFD700" />
          <stop offset="65%" stopColor="#F3E5AB" />
          <stop offset="100%" stopColor="#AA7C11" />
        </linearGradient>
      </defs>

      <path d="M50 50 Q30 20 15 30 Q15 45 50 50 Z" fill="url(#leafGold)" />
      <path d="M50 50 Q70 20 85 30 Q85 45 50 50 Z" fill="url(#leafGold)" />
      <path d="M50 50 Q20 70 30 85 Q45 85 50 50 Z" fill="url(#leafGold)" />
      <path d="M50 50 Q80 70 70 85 Q55 85 50 50 Z" fill="url(#leafGold)" />

      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, idx) => (
        <path
          key={idx}
          d="M50 50 C45 30 38 12 50 10 C62 12 55 30 50 50 Z"
          fill="#FFFFFF"
          stroke="#E5E4E7"
          strokeWidth="0.5"
          transform={`rotate(${angle} 50 50)`}
          style={{ filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.1))' }}
        />
      ))}

      <circle cx="50" cy="50" r="14" fill="url(#leafGold)" stroke="#8B0000" strokeWidth="0.5" />
      <circle cx="50" cy="50" r="10" fill="#FFC107" />
      <circle cx="47" cy="47" r="1" fill="#8B0000" />
      <circle cx="53" cy="47" r="1" fill="#8B0000" />
      <circle cx="47" cy="53" r="1" fill="#8B0000" />
      <circle cx="53" cy="53" r="1" fill="#8B0000" />
      <circle cx="50" cy="50" r="2" fill="#E65100" />
    </svg>
  );

  const Lantern = ({ style, delay = '0s' }) => (
    <div
      className="swing-lantern d-print-none"
      style={{
        position: 'absolute',
        width: '40px',
        height: '140px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 8,
        animationDelay: delay,
        ...style,
      }}
    >
      <div style={{ width: '1.5px', height: '50px', background: 'linear-gradient(#aa7c11, #ffd700)' }} />
      <svg width="30" height="55" viewBox="0 0 40 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 10 L30 10 L35 20 L5 20 Z" fill="url(#leafGold)" stroke="#8B0000" strokeWidth="0.5" />
        <circle cx="20" cy="6" r="4" stroke="url(#leafGold)" strokeWidth="1.5" fill="none" />
        <path d="M5 20 L8 50 L32 50 L35 20 Z" fill="rgba(255, 215, 0, 0.1)" stroke="url(#leafGold)" strokeWidth="1.5" />
        <path className="flicker-flame" d="M20 30 C15 38 15 48 20 48 C25 48 25 38 20 30 Z" fill="url(#lanternFlame)" />
        <path d="M8 50 L32 50 L28 56 L12 56 Z" fill="url(#leafGold)" />
        <line x1="20" y1="56" x2="20" y2="66" stroke="url(#leafGold)" strokeWidth="1.5" />
      </svg>
    </div>
  );

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 15,
        overflow: 'visible',
      }}
    >
      <div className="gold-carved-border top-border" />
      <div className="gold-carved-border bottom-border" />
      <div className="gold-carved-border left-border" />
      <div className="gold-carved-border right-border" />

      <WhiteFlowerSVG style={{ position: 'absolute', top: '-15px', left: '-15px' }} />
      <WhiteFlowerSVG style={{ position: 'absolute', top: '-15px', right: '-15px' }} />
      <WhiteFlowerSVG style={{ position: 'absolute', bottom: '-15px', left: '-15px' }} />
      <WhiteFlowerSVG style={{ position: 'absolute', bottom: '-15px', right: '-15px' }} />

      <WhiteFlowerSVG size={55} style={{ position: 'absolute', top: '50%', left: '-15px', transform: 'translateY(-50%)' }} />
      <WhiteFlowerSVG size={55} style={{ position: 'absolute', top: '50%', right: '-15px', transform: 'translateY(-50%)' }} />
      <WhiteFlowerSVG size={60} style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)' }} />
      <WhiteFlowerSVG size={45} style={{ position: 'absolute', top: '25%', left: '-12px' }} />
      <WhiteFlowerSVG size={45} style={{ position: 'absolute', top: '25%', right: '-12px' }} />
      <WhiteFlowerSVG size={45} style={{ position: 'absolute', bottom: '25%', left: '-12px' }} />
      <WhiteFlowerSVG size={45} style={{ position: 'absolute', bottom: '25%', right: '-12px' }} />

      <Lantern style={{ top: 0, left: '30px' }} delay="0s" />
      <Lantern style={{ top: 0, right: '30px' }} delay="-1.5s" />

      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#AA7C11" />
            <stop offset="35%" stopColor="#FFD700" />
            <stop offset="65%" stopColor="#F3E5AB" />
            <stop offset="100%" stopColor="#AA7C11" />
          </linearGradient>
          <linearGradient id="leafGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#AA7C11" />
            <stop offset="35%" stopColor="#FFD700" />
            <stop offset="65%" stopColor="#F3E5AB" />
            <stop offset="100%" stopColor="#AA7C11" />
          </linearGradient>
          <linearGradient id="lanternFlame" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FF3D00" />
            <stop offset="50%" stopColor="#FFA000" />
            <stop offset="100%" stopColor="#FFFF00" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default FloralBorder;
