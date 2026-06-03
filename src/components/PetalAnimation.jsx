import React, { useEffect, useRef } from 'react';

const PetalAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const particles = [];
    const maxParticles = 60; // Slightly increased for rich fireflies + marigolds

    // Helper to draw a detailed marigold flower head
    const drawMarigoldFlower = (ctx, x, y, radius, angle, color) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      
      ctx.fillStyle = color;
      ctx.strokeStyle = '#D84315'; // Darker orange stroke for details
      ctx.lineWidth = 0.5;

      // Draw 3 layers of ruffled petals
      for (let layer = 0; layer < 3; layer++) {
        const petalCount = 8 + layer * 4;
        const currentRadius = radius * (1 - layer * 0.25);
        for (let i = 0; i < petalCount; i++) {
          const petalAngle = (i * Math.PI * 2) / petalCount;
          ctx.save();
          ctx.rotate(petalAngle);
          
          ctx.beginPath();
          ctx.arc(0, -currentRadius / 2, currentRadius / 2, 0, Math.PI, true);
          ctx.fill();
          ctx.stroke();
          
          ctx.restore();
        }
      }
      
      // Center disc
      ctx.beginPath();
      ctx.fillStyle = '#E65100'; // Dark center
      ctx.arc(0, 0, radius * 0.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // Helper to draw a leaf/petal slice
    const drawPetalSlice = (ctx, x, y, width, height, angle, color1, color2) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, color1);
      grad.addColorStop(1, color2);
      ctx.fillStyle = grad;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(width / 2, -height / 2, width, 0);
      ctx.quadraticCurveTo(width / 2, height / 2, 0, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    class FallingParticle {
      constructor(isBurst = false, clickX = 0, clickY = 0) {
        this.isBurst = isBurst;
        if (isBurst) {
          this.x = clickX;
          this.y = clickY;
          this.width = Math.random() * 8 + 6;
          this.height = this.width * (Math.random() * 0.4 + 0.8);
          // Explode outwards radially
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 4 + 2;
          this.speedX = Math.cos(angle) * speed;
          this.speedY = Math.sin(angle) * speed - 1; // slight upwards boost
          this.angle = Math.random() * Math.PI * 2;
          this.spinSpeed = Math.random() * 0.15 - 0.075;
          this.alpha = 1.0;
          this.decay = Math.random() * 0.02 + 0.02; // disappears fast
        } else {
          this.reset();
          this.y = Math.random() * canvas.height;
          this.alpha = 1.0;
        }
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.width = Math.random() * 8 + 8;
        this.height = this.width * (Math.random() * 0.4 + 0.8);
        this.speedY = Math.random() * 0.8 + 0.6;
        this.speedX = Math.random() * 0.6 - 0.3;
        this.angle = Math.random() * Math.PI * 2;
        this.spinSpeed = Math.random() * 0.02 - 0.01;
        this.swayValue = Math.random() * 100;
        this.swaySpeed = Math.random() * 0.015 + 0.01;
        this.alpha = 1.0;
        this.decay = 0;

        // Types: 0: Rose Petal, 1: Full Marigold Flower, 2: Firefly (Light Orb)
        const typeRand = Math.random();
        if (typeRand < 0.50) {
          this.type = 0; // Rose Petal
          this.color1 = '#C62828'; // Crimson
          this.color2 = '#800000'; // Maroon
        } else if (typeRand < 0.80) {
          this.type = 1; // Full Marigold Flower
          this.color1 = '#FFB300'; // Amber/Yellow
        } else {
          this.type = 2; // Floating golden firefly/light orb
          this.color1 = '#FFF9C4'; // Pale gold
          this.color2 = '#FFD54F';
          this.width = Math.random() * 3 + 1.5; // tiny orbs
          this.speedY = -(Math.random() * 0.4 + 0.2); // floats UPWARDS
          this.speedX = Math.random() * 0.4 - 0.2;
        }
      }

      update() {
        if (this.isBurst) {
          // Exploding physics
          this.x += this.speedX;
          this.y += this.speedY;
          // Apply gravity
          this.speedY += 0.08;
          this.angle += this.spinSpeed;
          this.alpha -= this.decay;
        } else {
          // Regular floating physics
          if (this.type === 2) {
            // Firefly floats upwards
            this.y += this.speedY;
            this.x += this.speedX + Math.sin(this.swayValue) * 0.2;
            this.swayValue += this.swaySpeed;
            // Slow breathing alpha
            this.alpha = 0.4 + Math.sin(this.swayValue) * 0.4;

            if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
              this.reset();
              this.y = canvas.height + 10; // start at bottom
            }
          } else {
            // Petal or Marigold falls down
            this.y += this.speedY;
            this.swayValue += this.swaySpeed;
            this.x += this.speedX + Math.sin(this.swayValue) * 0.4;
            this.angle += this.spinSpeed;

            if (this.y > canvas.height + 20 || this.x < -20 || this.x > canvas.width + 20) {
              this.reset();
            }
          }
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);

        if (this.type === 2) {
          // Floating firefly
          ctx.beginPath();
          const radial = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.width * 3);
          radial.addColorStop(0, '#FFFFFF');
          radial.addColorStop(0.3, this.color2);
          radial.addColorStop(1, 'transparent');
          ctx.fillStyle = radial;
          ctx.arc(this.x, this.y, this.width * 3, 0, Math.PI * 2);
          ctx.fill();
        } else if (this.type === 1 || this.isBurst) {
          // Marigold Flower head (or colored burst flower)
          const flowerColor = this.isBurst ? '#FF8F00' : this.color1;
          drawMarigoldFlower(ctx, this.x, this.y, this.width, this.angle, flowerColor);
        } else {
          // Rose Petal
          drawPetalSlice(ctx, this.x, this.y, this.width, this.height, this.angle, this.color1, this.color2);
        }

        ctx.restore();
      }
    }

    // Populate standard background floating roster
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new FallingParticle());
    }

    // Interactive Click/Touch Exploder
    const handleWindowClick = (e) => {
      const clickX = e.clientX;
      const clickY = e.clientY;
      // Burst out 10 flower petals at the click location
      for (let i = 0; i < 12; i++) {
        particles.push(new FallingParticle(true, clickX, clickY));
      }
    };

    window.addEventListener('click', handleWindowClick);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        if (p.isBurst && p.alpha <= 0) {
          particles.splice(i, 1);
        } else {
          p.draw();
        }
      }

      // Keep arrays bounded
      if (particles.length > 200) {
        particles.splice(maxParticles, particles.length - maxParticles);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('click', handleWindowClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
};

export default PetalAnimation;
