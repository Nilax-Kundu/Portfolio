import * as THREE from 'three';
let heroGroup;
let heroCore;

export function initHero() {
  const container = document.querySelector('.hero-section');
  const canvas = document.getElementById('hero-canvas');
  if (!container || !canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.offsetWidth, container.offsetHeight);

  const group = new THREE.Group();
  scene.add(group);
  setHeroGroup(group);

  // Colors
  const accentColor = 0x4fc3f7; // Cyan/Blue
  const coreColor = 0xffffff;

  // 1. Central Core (Glowing Sphere)
  const coreGeom = new THREE.SphereGeometry(0.5, 32, 32);
  const coreMat = new THREE.MeshBasicMaterial({ 
    color: coreColor,
    transparent: true,
    opacity: 0.9,
    side: THREE.DoubleSide
  });
  const core = new THREE.Mesh(coreGeom, coreMat);
  group.add(core);
  setHeroGroup(group, core);

  // 2. Nested Wireframe Icosahedron
  const icoGeom = new THREE.IcosahedronGeometry(1.2, 1);
  const icoMat = new THREE.MeshBasicMaterial({
    color: accentColor,
    wireframe: true,
    transparent: true,
    opacity: 0.3
  });
  const ico = new THREE.Mesh(icoGeom, icoMat);
  group.add(ico);

  // 3. Nested Rings (Torus)
  const rings = [];
  const ringConfigs = [
    { r: 2.0, t: 0.015, speed: 0.01, axis: 'z' },
    { r: 2.5, t: 0.012, speed: -0.008, axis: 'x' },
    { r: 3.0, t: 0.01, speed: 0.012, axis: 'y' }
  ];

  ringConfigs.forEach(config => {
    const geom = new THREE.TorusGeometry(config.r, config.t, 16, 100);
    const mat = new THREE.MeshBasicMaterial({ 
      color: accentColor,
      transparent: true,
      opacity: 0.4
    });
    const ring = new THREE.Mesh(geom, mat);
    
    // Randomize initial orientations
    ring.rotation.x = Math.random() * Math.PI;
    ring.rotation.y = Math.random() * Math.PI;
    
    group.add(ring);
    rings.push({ mesh: ring, ...config });
  });

  // 4. Floating Particles (to add some dynamic "data" atmosphere)
  const particleCount = 500;
  const pGeom = new THREE.BufferGeometry();
  const pPos = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    pPos[i3] = (Math.random() - 0.5) * 10;
    pPos[i3 + 1] = (Math.random() - 0.5) * 10;
    pPos[i3 + 2] = (Math.random() - 0.5) * 10;
  }
  pGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({
    size: 0.02,
    color: accentColor,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending
  });
  const particles = new THREE.Points(pGeom, pMat);
  group.add(particles);

  camera.position.z = 8;

  // Mouse interactivity
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) / 100;
    mouseY = (e.clientY - window.innerHeight / 2) / 100;
  });

  function onResize() {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
  }

  window.addEventListener('resize', onResize);

  function animate() {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.001;

    // Smooth system tilt based on mouse
    targetX = mouseX * 0.2;
    targetY = mouseY * 0.2;
    group.rotation.y += (targetX - group.rotation.y) * 0.05;
    group.rotation.x += (targetY - group.rotation.x) * 0.05;

    // Animate core pulse - combine with expansion scale if available
    const pulse = 1 + Math.sin(time * 2) * 0.1;
    const expScale = core.userData.expansionScale || 1;
    core.scale.setScalar(expScale * pulse);
    
    // Only pulse opacity when not expanding
    if (expScale <= 1.2) {
      core.material.opacity = 0.7 + Math.sin(time * 2) * 0.2;
    }

    // Animate nested polyhedrons
    ico.rotation.y -= 0.005;
    ico.rotation.x += 0.003;

    // Animate rings
    rings.forEach(r => {
      r.mesh.rotation[r.axis] += r.speed;
    });

    // Slow drift for background particles
    particles.rotation.y += 0.001;

    renderer.render(scene, camera);
  }

  animate();

  return () => {
    window.removeEventListener('mousemove', () => {});
    window.removeEventListener('resize', onResize);
    renderer.dispose();
  };
}

export function updateHeroExpansion(progress) {
  const isMobile = window.innerWidth < 768;
  const heroContent = document.querySelector('.hero-content');
  
  if (heroContent) {
    const fadeSpeed = isMobile ? 3.5 : 3.0;
    heroContent.style.opacity = Math.max(0, 1 - progress * fadeSpeed);
    heroContent.style.transform = `translateY(${progress * -100}px) scale(${1 - progress * 0.2})`;
    heroContent.style.pointerEvents = progress > 0.1 ? 'none' : 'auto';
  }

  if (heroGroup && heroCore) {
    // 1. Scale rings/icosahedron (Linear expansion)
    const ringsScale = 1 + progress * (isMobile ? 5 : 8);
    heroGroup.scale.setScalar(ringsScale);
    
    // 2. Scale Core (Aggressive exponential expansion for white-out)
    // At 1000x scale, radius 0.5 becomes 500, swallowing the camera at z=8.
    const corePower = isMobile ? 4 : 5;
    const maxCoreScale = isMobile ? 400 : 1000;
    const coreScale = 1 + Math.pow(progress, corePower) * maxCoreScale;
    
    // Store in userData for the animate() loop to use
    heroCore.userData.expansionScale = coreScale;
    
    // Ramp up opacity for a pure white flash
    if (progress > 0.97) {
      heroCore.material.transparent = false;
      heroCore.material.opacity = 1.0;
      // Hide other elements in the group to ensure only white is visible
      heroGroup.children.forEach(child => {
        if (child !== heroCore) child.visible = false;
      });
    } else {
      heroCore.material.transparent = true;
      heroCore.material.opacity = Math.min(0.95, 0.7 + progress * 0.5);
      heroGroup.children.forEach(child => {
        child.visible = true;
      });
    }
    
    // Rotate faster as it expands
    heroGroup.rotation.y += progress * 0.05;
  }

  const canvas = document.getElementById('hero-canvas');
  const heroSection = document.querySelector('.hero-section');

  if (canvas && heroSection) {
    // Reveal About section exactly at peak flash
    if (progress >= 0.99) {
      heroSection.style.opacity = '0';
      heroSection.style.pointerEvents = 'none';
    } else if (progress >= 0.98) {
      // Pure white bridge
      heroSection.style.opacity = '1';
      heroSection.style.background = 'white';
      canvas.style.opacity = '0';
      heroSection.style.pointerEvents = 'auto';
    } else {
      heroSection.style.opacity = '1';
      heroSection.style.background = 'var(--bg-primary)';
      canvas.style.opacity = '1';
      heroSection.style.pointerEvents = 'auto';
    }
  }
}

// Internal reference for the animation loop to use
function setHeroGroup(group, core) {
  heroGroup = group;
  heroCore = core;
}
