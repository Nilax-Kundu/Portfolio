/**
 * Main entry — initializes all modules, scroll animations, and loader.
 */

import './style.css';
import { initBackground } from './background.js';
import { initHero, updateHeroExpansion } from './hero.js';
import { initNav } from './nav.js';
import { initBackgroundStars } from './background-stars.js';
import { initResumeViewer } from './resume-viewer.js';
import { initProjects } from './sections/projects.js';
import { initSkills } from './sections/skills.js';
import { initCertifications } from './sections/certifications.js';
import { initContact } from './sections/contact.js';

// ===== Scroll-reveal system =====
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
  );

  // Observe sections for title underline animation
  document.querySelectorAll('.section').forEach(s => observer.observe(s));

  // Reveal lines (about text)
  const lineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          lineObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -5% 0px', threshold: 0.2 }
  );

  document.querySelectorAll('.reveal-line').forEach(el => lineObserver.observe(el));

  // Reveal project cards
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -5% 0px', threshold: 0.1 }
  );

  document.querySelectorAll('.project-card').forEach(el => cardObserver.observe(el));

  // Reveal certification cards
  const certObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          certObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -5% 0px', threshold: 0.1 }
  );

  document.querySelectorAll('.cert-card').forEach(el => certObserver.observe(el));

  // Reveal skill groups
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -5% 0px', threshold: 0.1 }
  );

  document.querySelectorAll('.skill-group').forEach(el => skillObserver.observe(el));

  // Reveal timeline nodes
  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          timelineObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -5% 0px', threshold: 0.15 }
  );

  document.querySelectorAll('.timeline-node').forEach(el => timelineObserver.observe(el));

  // Reveal contact items
  const contactObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          contactObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -5% 0px', threshold: 0.1 }
  );

  document.querySelectorAll('.contact-item, .resume-btn').forEach(el => contactObserver.observe(el));
}

// ===== Expansion Scroll (Hero Zoom) =====
function initExpansionScroll() {
  const buffer = document.querySelector('.hero-scroll-buffer');
  if (!buffer) return;

  function onScroll() {
    const scrollY = window.scrollY;
    // Map scroll from 0 to about section top (which is 100vh)
    const progress = Math.min(1, Math.max(0, scrollY / window.innerHeight));
    
    updateHeroExpansion(progress);
  }

  window.addEventListener('scroll', onScroll);
  onScroll(); // Initial call
}

// ===== Parallax on scroll =====
function initParallax() {
  const isMobile = window.innerWidth < 768;
  if (isMobile) return; // Skip parallax on mobile

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        // Hero parallax — content moves up slower
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
          heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
          heroContent.style.opacity = 1 - scrollY / (window.innerHeight * 0.8);
        }

        // Scroll hint fades early
        const scrollHint = document.getElementById('scroll-hint');
        if (scrollHint) {
          scrollHint.style.opacity = Math.max(0, 1 - scrollY / (window.innerHeight * 0.3));
        }

        // Section titles parallax
        document.querySelectorAll('.section-title').forEach(title => {
          const rect = title.getBoundingClientRect();
          const viewRatio = rect.top / vh;
          if (viewRatio > 0 && viewRatio < 1) {
            title.style.transform = `translateX(${viewRatio * 30}px)`;
          }
        });

        // About text parallax
        const aboutText = document.getElementById('about-text');
        if (aboutText) {
          const rect = aboutText.getBoundingClientRect();
          if (rect.top < vh && rect.bottom > 0) {
            aboutText.style.transform = `translateY(${(rect.top - vh / 2) * 0.05}px)`;
          }
        }

        ticking = false;
      });
      ticking = true;
    }
  });
}

// ===== Init everything =====
function init() {
  // Initialize sections first (render DOM)
  initProjects();
  initSkills();
  initCertifications();
  initContact();

  // Then start canvas animations
  initBackground();
  initBackgroundStars();
  initHero();
  initNav();
  initResumeViewer();
  initExpansionScroll();
  initScrollReveal();
  initParallax();

  // Dismiss loader
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 800);
  }
}

// Start on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
