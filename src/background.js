/**
 * Animated background — gradient mesh blobs on a full-viewport canvas.
 * Colors shift subtly with time. Reduced on mobile.
 */

const BLOB_COUNT_DESKTOP = 4;
const BLOB_COUNT_MOBILE = 2;

class Blob {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.radius = 200 + Math.random() * 300;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.hue = 190 + Math.random() * 30; // blue-cyan range
    this.saturation = 50 + Math.random() * 20;
    this.lightness = 8 + Math.random() * 8;
    this.alpha = 0.3 + Math.random() * 0.2;
    this.hueSpeed = (Math.random() - 0.5) * 0.02;
    this.originalHue = this.hue;
  }

  update(scrollRatio = 0) {
    this.x += this.vx;
    this.y += this.vy;
    this.hue = this.originalHue + scrollRatio * 40; // Shift hue on scroll

    // Bounce off edges softly
    if (this.x < -this.radius) this.x = this.canvas.width + this.radius;
    if (this.x > this.canvas.width + this.radius) this.x = -this.radius;
    if (this.y < -this.radius) this.y = this.canvas.height + this.radius;
    if (this.y > this.canvas.height + this.radius) this.y = -this.radius;
  }

  draw(ctx) {
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.radius
    );
    gradient.addColorStop(0, `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`);
    gradient.addColorStop(1, `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, 0)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
  }
}

export function initBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const isMobile = window.innerWidth < 768;
  const blobCount = isMobile ? BLOB_COUNT_MOBILE : BLOB_COUNT_DESKTOP;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  const blobs = [];
  for (let i = 0; i < blobCount; i++) {
    blobs.push(new Blob(canvas));
  }

  let animId;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0a0e1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const scrollRatio = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);

    for (const blob of blobs) {
      blob.update(scrollRatio);
      blob.draw(ctx);
    }

    // Noise overlay via subtle random dots
    if (!isMobile) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 40) {
        const noise = (Math.random() - 0.5) * 8;
        data[i] += noise;
        data[i + 1] += noise;
        data[i + 2] += noise;
      }
      ctx.putImageData(imageData, 0, 0);
    }

    animId = requestAnimationFrame(animate);
  }

  animate();

  return () => cancelAnimationFrame(animId);
}
