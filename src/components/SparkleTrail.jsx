import React, { useEffect, useRef } from 'react';

const SparkleTrail = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Disable trail on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const particles = [];
    const colors = ['#FFD700', '#D4AF37', '#F3E5AB', '#AA7C11'];

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = Math.random() * 1.5 - 0.75 - 0.5; // Slight upward bias
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.015;
        this.angle = Math.random() * Math.PI * 2;
        this.spin = Math.random() * 0.1 - 0.05;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= this.decay;
        this.angle += this.spin;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.globalAlpha = this.alpha;
        
        // Draw a tiny 4-pointed star shape
        ctx.beginPath();
        ctx.fillStyle = this.color;
        
        const spikes = 4;
        const outerRadius = this.size;
        const innerRadius = this.size / 2.5;
        
        let cx = 0;
        let cy = 0;
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        let step = Math.PI / spikes;

        ctx.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
          x = cx + Math.cos(rot) * outerRadius;
          y = cy + Math.sin(rot) * outerRadius;
          ctx.lineTo(x, y);
          rot += step;

          x = cx + Math.cos(rot) * innerRadius;
          y = cy + Math.sin(rot) * innerRadius;
          ctx.lineTo(x, y);
          rot += step;
        }
        
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.restore();
      }
    }

    const handleMouseMove = (e) => {
      // Spawn multiple particles per move event for a richer trail
      for (let i = 0; i < 2; i++) {
        particles.push(new Particle(e.clientX, e.clientY));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        if (p.alpha <= 0) {
          particles.splice(i, 1);
        } else {
          p.draw();
        }
      }

      // Limit particle count to avoid lag
      if (particles.length > 150) {
        particles.splice(0, particles.length - 150);
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9998, // Just underneath modal screens, above main contents
      }}
    />
  );
};

export default SparkleTrail;
