/**
 * Minimal Starfield Background — sparse, slow-drifting particles
 * Refined for depth without visual clutter (no connecting lines).
 */

export function initBackgroundStars() {
  const canvas = document.createElement('canvas');
  canvas.id = 'star-canvas';
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.zIndex = '0';
  canvas.style.pointerEvents = 'none';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let width, height;
  let stars = [];
  
  // Very low density for visual clarity
  const STAR_COUNT = window.innerWidth < 768 ? 25 : 60;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  class Star {
    constructor() {
      this.reset();
      // Randomize initial position across the full screen
      this.x = Math.random() * width;
      this.y = Math.random() * height;
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      // Extremely slow drift
      this.vx = (Math.random() - 0.5) * 0.1;
      this.vy = (Math.random() - 0.5) * 0.1;
      // Varied tiny sizes
      this.size = 0.5 + Math.random() * 1.5;
      // Subtle flickering alpha
      this.alpha = 0.1 + Math.random() * 0.4;
      this.flickerSpeed = 0.005 + Math.random() * 0.015;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Soft flickering
      this.alpha += Math.sin(Date.now() * this.flickerSpeed) * 0.01;
      this.alpha = Math.max(0.05, Math.min(0.6, this.alpha));

      // Wrap around edges
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180, 220, 255, ${this.alpha})`;
      ctx.fill();
    }
  }

  function init() {
    resize();
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push(new Star());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    for (const star of stars) {
      star.update();
      star.draw();
    }
    
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    resize();
    init();
  });

  init();
  animate();
}
