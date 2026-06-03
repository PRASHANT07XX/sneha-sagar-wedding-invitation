import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';

const MusicButton = forwardRef(({ autoStart = false }, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [useSynth, setUseSynth] = useState(false);
  
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const droneNodeRef = useRef([]);
  const melodyTimeoutRef = useRef(null);

  // A beautiful Indian classical shehnai / flute track (royalty-free loop)
  // We use a high-quality free mp3/wav link, but if it fails, our Web Audio synth starts automatically.
  const audioUrl = 'https://www.soundjays.com/free-music/ambient-theme-1.mp3'; // Backup standard track

  // We expose play/stop methods to parent components via ref
  useImperativeHandle(ref, () => ({
    play: () => {
      if (!isPlaying) {
        startAudio();
      }
    },
    stop: () => {
      if (isPlaying) {
        stopAudio();
      }
    }
  }));

  const startAudio = () => {
    setIsPlaying(true);

    // Try playing the audio element first
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setUseSynth(false);
        })
        .catch((err) => {
          console.warn('Audio tag play failed or blocked, starting Web Audio synth fallback...', err);
          // Fallback to Web Audio Synth
          setUseSynth(true);
          initSynth();
        });
    } else {
      setUseSynth(true);
      initSynth();
    }
  };

  const stopAudio = () => {
    setIsPlaying(false);
    
    // Stop audio element
    if (audioRef.current) {
      audioRef.current.pause();
    }

    // Stop Web Audio Synth
    stopSynth();
  };

  const togglePlayback = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  // Web Audio Synth - Tanpura Drone & Shehnai simulation
  const initSynth = () => {
    try {
      if (audioContextRef.current) return;

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioContextRef.current = ctx;

      // --- TANPURA DRONE ---
      // Frequencies for a royal C-sharp/C-major drone (C3, G3, C4)
      const baseFreqs = [130.81, 196.0, 261.63];
      const droneNodes = [];

      baseFreqs.forEach((freq, idx) => {
        // Oscillator for rich harmonics
        const osc = ctx.createOscillator();
        osc.type = idx === 1 ? 'triangle' : 'sawtooth';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Filter out harsh highs for a mellow string-like drone
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, ctx.currentTime);

        // Individual gain nodes to model Tanpura plucking modulation
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.08, ctx.currentTime);

        // Plucking simulator LFO
        const lfo = ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.2 + idx * 0.1, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(0.04, ctx.currentTime);

        lfo.connect(lfoGain);
        lfoGain.connect(gain.gain);
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        lfo.start();

        droneNodes.push({ osc, lfo, gain, filter });
      });

      droneNodeRef.current = droneNodes;

      // --- SHEHNAI MELODY SEQUENCER (Raag Bhairav / Yaman scale) ---
      // Scale: C4 (261.63), D4 (293.66), E4 (329.63), F#4 (369.99), G4 (392.00), A4 (440.00), B4 (493.88), C5 (523.25)
      const scale = [261.63, 293.66, 329.63, 369.99, 392.00, 440.00, 493.88, 523.25];
      
      const playMelodyNote = () => {
        if (!audioContextRef.current || ctx.state === 'suspended') return;

        // Create oscillator for shehnai
        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        
        // Custom wave shaper or filters for woodwind feel
        const waveShaper = ctx.createWaveShaper();
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 800;
        filter.Q.value = 1.5;

        // Select a random note from the Raag scale
        const noteIndex = Math.floor(Math.random() * scale.length);
        const freq = scale[noteIndex];
        
        // Pitch Slide / Portamento
        osc.frequency.setValueAtTime(freq - 20, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq, ctx.currentTime + 0.3);

        // Add vibrato
        const vibrato = ctx.createOscillator();
        vibrato.type = 'sine';
        vibrato.frequency.value = 6; // 6Hz
        const vibratoGain = ctx.createGain();
        vibratoGain.gain.value = 3; // depth
        vibrato.connect(vibratoGain);
        vibratoGain.connect(osc.frequency);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.4); // slow rise
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8); // slow decay

        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start();
        vibrato.start();
        
        osc.stop(ctx.currentTime + 2.0);
        vibrato.stop(ctx.currentTime + 2.0);

        // Schedule next note randomly
        const nextTime = Math.random() * 1500 + 1200;
        melodyTimeoutRef.current = setTimeout(playMelodyNote, nextTime);
      };

      // Start the melody loop
      playMelodyNote();

    } catch (e) {
      console.error('Failed to initialize Web Audio synthesis:', e);
    }
  };

  const stopSynth = () => {
    if (melodyTimeoutRef.current) {
      clearTimeout(melodyTimeoutRef.current);
      melodyTimeoutRef.current = null;
    }

    if (droneNodeRef.current.length > 0) {
      droneNodeRef.current.forEach((nodes) => {
        try {
          nodes.osc.stop();
          nodes.lfo.stop();
        } catch (e) {}
      });
      droneNodeRef.current = [];
    }

    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch (e) {}
      audioContextRef.current = null;
    }
  };

  useEffect(() => {
    if (autoStart) {
      startAudio();
    }
    return () => {
      stopSynth();
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '25px',
        right: '25px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      {/* Hidden standard HTML Audio tag */}
      <audio
        ref={audioRef}
        src={audioUrl}
        loop
        preload="auto"
        style={{ display: 'none' }}
      />

      {/* Floating Action Button */}
      <button
        onClick={togglePlayback}
        className="pulse-button"
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: '#8B0000',
          border: '2px solid #FFD700',
          color: '#FFD700',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 4px 15px rgba(139, 0, 0, 0.4)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          outline: 'none',
        }}
        title={isPlaying ? 'संगीत बंद करा (Mute)' : 'संगीत चालू करा (Unmute)'}
      >
        {isPlaying ? (
          <div style={{ display: 'flex', alignItems: 'flex-end', height: '18px' }}>
            <span className="music-wave-bar"></span>
            <span className="music-wave-bar"></span>
            <span className="music-wave-bar"></span>
            <span className="music-wave-bar"></span>
            <span className="music-wave-bar"></span>
          </div>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
      </button>
    </div>
  );
});

export default MusicButton;
