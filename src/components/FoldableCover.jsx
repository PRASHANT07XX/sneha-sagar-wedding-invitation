import React from 'react';
import '../styles/WeddingCard.css';
import '../styles/Animations.css';

const FoldableCover = ({ isOpened, onOpen }) => {
  return (
    <>
      {/* Left Flap Door */}
      <div className={`cover-flap left-flap`}>
        {/* Outer crimson face */}
        <div className="flap-outer" style={{ borderRight: 'none' }}>
          {/* Subtle gold design background details */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              right: '10px',
              bottom: '20px',
              border: '2px solid rgba(212, 175, 55, 0.4)',
              borderRadius: '4px',
              pointerEvents: 'none',
            }}
          />
          
          {/* Left half of the mandala vector */}
          <svg
            width="120"
            height="240"
            viewBox="0 0 60 120"
            fill="none"
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              opacity: 0.8,
            }}
          >
            <path
              d="M0 60 A 45 45 0 0 1 45 15 L45 105 A 45 45 0 0 1 0 60 Z"
              stroke="url(#coverGold)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M0 60 A 30 30 0 0 1 30 30 L30 90 A 30 30 0 0 1 0 60 Z"
              stroke="url(#coverGold)"
              strokeWidth="1"
              strokeDasharray="2 2"
              fill="none"
            />
            <circle cx="2" cy="60" r="4" fill="#ffd700" />
            <circle cx="15" cy="40" r="3" fill="#ffd700" opacity="0.7" />
            <circle cx="15" cy="80" r="3" fill="#ffd700" opacity="0.7" />
          </svg>

          {/* Left top text header */}
          <div
            className="devanagari-text text-end"
            style={{
              position: 'absolute',
              top: '12%',
              right: '25px',
              color: '#ffd700',
              fontFamily: "'Tiro Devanagari Marathi', serif",
            }}
          >
            <h3 style={{ fontSize: '1.2rem', margin: 0, letterSpacing: '1px' }}>शुभ</h3>
            <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>विवाह</span>
          </div>

          <div
            className="devanagari-text"
            style={{
              position: 'absolute',
              bottom: '15%',
              left: '30px',
              color: 'rgba(255, 215, 0, 0.65)',
              fontSize: '0.9rem',
              textAlign: 'left',
            }}
          >
            <p style={{ margin: 0 }}>वधू: स्नेहा</p>
            <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.8 }}>जैनवाडी/पंढरपूर</p>
          </div>
        </div>

        {/* Inner ivory face shown when flipped open */}
        <div className="flap-inner">
          <div
            style={{
              position: 'absolute',
              top: '15px',
              left: '15px',
              right: '15px',
              bottom: '15px',
              border: '1px solid rgba(170, 124, 17, 0.25)',
              borderRadius: '4px',
            }}
          />
        </div>
      </div>

      {/* Right Flap Door */}
      <div className={`cover-flap right-flap`}>
        {/* Outer crimson face */}
        <div className="flap-outer" style={{ borderLeft: 'none' }}>
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '10px',
              right: '20px',
              bottom: '20px',
              border: '2px solid rgba(212, 175, 55, 0.4)',
              borderRadius: '4px',
              pointerEvents: 'none',
            }}
          />

          {/* Right half of the mandala vector */}
          <svg
            width="120"
            height="240"
            viewBox="0 0 60 120"
            fill="none"
            style={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%) scaleX(-1)', // Mirrored
              opacity: 0.8,
            }}
          >
            <path
              d="M0 60 A 45 45 0 0 1 45 15 L45 105 A 45 45 0 0 1 0 60 Z"
              stroke="url(#coverGold)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M0 60 A 30 30 0 0 1 30 30 L30 90 A 30 30 0 0 1 0 60 Z"
              stroke="url(#coverGold)"
              strokeWidth="1"
              strokeDasharray="2 2"
              fill="none"
            />
            <circle cx="2" cy="60" r="4" fill="#ffd700" />
            <circle cx="15" cy="40" r="3" fill="#ffd700" opacity="0.7" />
            <circle cx="15" cy="80" r="3" fill="#ffd700" opacity="0.7" />
          </svg>

          {/* Right top text header */}
          <div
            className="devanagari-text text-start"
            style={{
              position: 'absolute',
              top: '12%',
              left: '25px',
              color: '#ffd700',
              fontFamily: "'Tiro Devanagari Marathi', serif",
            }}
          >
            <h3 style={{ fontSize: '1.2rem', margin: 0, letterSpacing: '1px' }}>निमंत्रण</h3>
            <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>पत्रिका</span>
          </div>

          <div
            className="devanagari-text"
            style={{
              position: 'absolute',
              bottom: '15%',
              right: '30px',
              color: 'rgba(255, 215, 0, 0.65)',
              fontSize: '0.9rem',
              textAlign: 'right',
            }}
          >
            <p style={{ margin: 0 }}>वर: सागर</p>
            <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.8 }}>माळशिरस/सोलापूर</p>
          </div>
        </div>

        {/* Inner ivory face shown when flipped open */}
        <div className="flap-inner">
          <div
            style={{
              position: 'absolute',
              top: '15px',
              left: '15px',
              right: '15px',
              bottom: '15px',
              border: '1px solid rgba(170, 124, 17, 0.25)',
              borderRadius: '4px',
            }}
          />
        </div>
      </div>

      {/* Royal Lock / Center Seal */}
      <div className="royal-seal-container">
        {/* Glowing aura */}
        <div
          style={{
            position: 'absolute',
            width: '180px',
            height: '180px',
            background: 'radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: -1,
          }}
        />

        {/* Seal Button */}
        <button onClick={onOpen} className="royal-seal" aria-label="Open Invitation">
          <svg viewBox="0 0 100 100" className="seal-icon">
            {/* Ganesh face mini outline */}
            <path
              d="M48 20 C42 20 30 25 35 42 C38 52 48 50 48 65 C48 72 58 72 58 65 C58 55 52 52 52 42 C52 32 60 25 58 20"
              stroke="#8B0000"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            {/* Crown */}
            <path d="M45 10 L55 10 L52 20 L48 20 Z" fill="#8B0000" />
            <circle cx="50" cy="8" r="1.5" fill="#8B0000" />
            {/* Left ear */}
            <path d="M38 28 C28 28 25 38 35 40 Z" fill="#8B0000" opacity="0.4" />
            {/* Right ear */}
            <path d="M62 28 C72 28 75 38 65 40 Z" fill="#8B0000" opacity="0.4" />
            {/* Tilak */}
            <circle cx="50" cy="28" r="2" fill="#FFD700" />
          </svg>
        </button>

        {/* Click to open label */}
        <button
          onClick={onOpen}
          className="gold-btn pulse-button"
          style={{
            marginTop: '25px',
            whiteSpace: 'nowrap',
            fontSize: '0.9rem',
            padding: '12px 28px',
            border: '2px solid #8B0000',
            boxShadow: '0 5px 20px rgba(0, 0, 0, 0.4)',
          }}
        >
          निमंत्रण उघडा / OPEN INVITATION
        </button>
      </div>

      {/* SVG gradients exclusively for the covers */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <linearGradient id="coverGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#AA7C11" />
            <stop offset="50%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#AA7C11" />
          </linearGradient>
        </defs>
      </svg>
    </>
  );
};

export default FoldableCover;
