import React, { useEffect, useState } from 'react';

const LoadingScreen = ({ onFinished }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Progress bar animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2; // Increments by 2 every 50ms (takes 2.5s total)
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Trigger fade out, then call onFinished after animation completes
      let finishTimeout;
      const timeout = setTimeout(() => {
        setFadeOut(true);
        finishTimeout = setTimeout(() => {
          onFinished();
        }, 800); // fadeOut transition duration
      }, 500); // hold at 100% progress for a moment
      return () => {
        clearTimeout(timeout);
        clearTimeout(finishTimeout);
      };
    }

    return undefined;
  }, [progress, onFinished]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#110804',
        backgroundImage: 'radial-gradient(circle at center, #261109 0%, #0c0402 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        transition: 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s ease',
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? 'none' : 'auto',
        transform: fadeOut ? 'scale(1.05)' : 'scale(1)',
      }}
    >
      <div className="text-center" style={{ maxWidth: '400px', padding: '20px' }}>
        {/* Lord Ganesh SVG Vector - Golden Shimmer */}
        <div style={{ marginBottom: '30px', animation: 'pulse-btn 2s infinite' }}>
          <svg
            width="120"
            height="120"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.6))' }}
          >
            {/* Crown / Mukut */}
            <path d="M45 5 L55 5 L53 20 L47 20 Z" fill="url(#goldGrad)" />
            <path d="M40 20 L60 20 L58 28 L42 28 Z" fill="url(#goldGrad)" />
            <circle cx="50" cy="12" r="2" fill="#8B0000" />
            
            {/* Face & Trunk */}
            <path d="M42 28 Q50 32 58 28 Q63 42 55 50 Q48 55 48 65 Q48 78 60 78 Q64 78 64 73 L58 73 Q54 73 54 68 Q54 60 62 55 Q68 45 62 30" stroke="url(#goldGrad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Tusk (Dant) */}
            <path d="M42 45 L36 44 L41 40 Z" fill="#FFFFFF" />
            
            {/* Tikka / Tilak */}
            <path d="M48 30 Q50 25 52 30 L50 38 Z" fill="#8B0000" />
            <line x1="45" y1="33" x2="55" y2="33" stroke="#ffd700" strokeWidth="1.5" />
            <line x1="46" y1="35" x2="54" y2="35" stroke="#ffd700" strokeWidth="1.5" />

            {/* Ears (Modifying curves for ears) */}
            {/* Left Ear */}
            <path d="M42 28 C28 28 20 40 38 48 C42 44 42 36 42 28 Z" fill="url(#goldGrad)" opacity="0.85" />
            <path d="M38 32 C30 32 26 38 36 43" stroke="#8B0000" strokeWidth="1.5" strokeLinecap="round" />
            
            {/* Right Ear */}
            <path d="M58 28 C72 28 80 40 62 48 C58 44 58 36 58 28 Z" fill="url(#goldGrad)" opacity="0.85" />
            <path d="M62 32 C70 32 74 38 64 43" stroke="#8B0000" strokeWidth="1.5" strokeLinecap="round" />

            {/* Modak symbol or sweet at the side */}
            <circle cx="63" cy="62" r="3" fill="#ffd700" />
            <circle cx="66" cy="65" r="2.5" fill="#ffd700" />
            <circle cx="61" cy="67" r="2" fill="#ffd700" />

            {/* Gradients */}
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#AA7C11" />
                <stop offset="30%" stopColor="#FFD700" />
                <stop offset="70%" stopColor="#F3E5AB" />
                <stop offset="100%" stopColor="#AA7C11" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Lord Ganesh text */}
        <h4 
          className="devanagari-text" 
          style={{ 
            color: '#ffd700', 
            letterSpacing: '2px', 
            marginBottom: '5px',
            fontSize: '1.2rem',
            fontFamily: "'Tiro Devanagari Marathi', serif"
          }}
        >
          || श्री गणेशाय नमः ||
        </h4>
        
        <p 
          style={{ 
            color: '#faf5ec', 
            fontSize: '0.9rem', 
            opacity: 0.7, 
            letterSpacing: '1px',
            marginBottom: '40px' 
          }}
        >
          विवाह निमंत्रण पत्रक लोड होत आहे...
        </p>

        {/* Shimmering Progress Bar */}
        <div 
          style={{ 
            width: '100%', 
            height: '4px', 
            backgroundColor: 'rgba(212, 175, 55, 0.15)', 
            borderRadius: '2px', 
            overflow: 'hidden',
            position: 'relative',
            marginBottom: '15px'
          }}
        >
          <div 
            style={{ 
              width: `${progress}%`, 
              height: '100%', 
              background: 'linear-gradient(90deg, #aa7c11, #ffd700, #aa7c11)',
              transition: 'width 0.1s ease',
              boxShadow: '0 0 10px #ffd700'
            }}
          />
        </div>
        
        {/* Progress Percentage */}
        <span style={{ color: '#ffd700', fontSize: '0.85rem', letterSpacing: '1px' }}>
          {progress}%
        </span>
      </div>
    </div>
  );
};

export default LoadingScreen;
