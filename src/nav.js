/**
 * Glassmorphic nav — shows on scroll past hero, hides on scroll down,
 * reveals on scroll up. Highlights active section.
 */

export function initNav() {
  const nav = document.getElementById('main-nav');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');

  if (!nav) return;

  let lastScroll = 0;
  let ticking = false;

  // Always show nav
  nav.classList.add('visible');

  function onScroll() {
    // No longer hiding nav on scroll down
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Smooth scroll on link click
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Logo click → scroll to top
  const logo = document.querySelector('.nav-logo');
  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Active section tracking
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach(link => {
            link.classList.toggle('active', link.dataset.section === id);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
  );

  // Hamburger Toggle
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-resume-link');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  sections.forEach(section => {
    if (section.id !== 'hero') {
      observer.observe(section);
    }
  });
}
