import React, { useRef, useState } from 'react';
import FloralBorder from './FloralBorder';
import FoldableCover from './FoldableCover';
import InvitationContent from './InvitationContent';
import MusicButton from './MusicButton';
import PetalAnimation from './PetalAnimation';
import SparkleTrail from './SparkleTrail';
import '../styles/WeddingCard.css';
import '../styles/Animations.css';

const WeddingCard = () => {
  const [isOpened, setIsOpened] = useState(false);
  const musicRef = useRef(null);

  const handleOpen = () => {
    setIsOpened(true);
    if (musicRef.current?.play) {
      musicRef.current.play();
    }
  };

  return (
    <div className="wedding-root wedding-image-style">
      <div className="card-perspective-container">
        <div className={`wedding-card-wrapper ${isOpened ? 'opened' : ''}`}>
          <FoldableCover isOpened={isOpened} onOpen={handleOpen} />

          <div className="invitation-inner-card" style={{ pointerEvents: isOpened ? 'auto' : 'none' }}>
            <div className="inner-gold-border-double" />
            <InvitationContent />
          </div>
        </div>
        <FloralBorder />
      </div>

      <MusicButton ref={musicRef} />
      <PetalAnimation />
      <SparkleTrail />
    </div>
  );
};

export default WeddingCard;
