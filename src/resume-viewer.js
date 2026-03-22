/**
 * Resume Viewer Modal Logic
 */

export function initResumeViewer() {
  const modal = document.getElementById('resume-modal');
  const closeBtn = document.querySelector('.modal-close-btn');
  const overlay = document.querySelector('.modal-overlay');
  
  const triggers = [
    document.getElementById('nav-resume-btn'),
    document.getElementById('hero-resume-btn'),
    document.getElementById('mobile-resume-btn'),
    document.getElementById('resume-download') // From contact section
  ];

  const meta = document.getElementById('resume-meta');
  
  async function updateFileSize() {
    try {
      const response = await fetch('resume.pdf', { method: 'HEAD' });
      const size = response.headers.get('content-length');
      if (size && meta) {
        const kb = (size / 1024).toFixed(0);
        meta.textContent = `PDF • ${kb} KB`;
      }
    } catch (err) {
      console.warn('Could not fetch real file size:', err);
    }
  }

  function openModal(e) {
    if (e) e.preventDefault();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    updateFileSize();
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  triggers.forEach(trigger => {
    if (trigger) {
      trigger.addEventListener('click', openModal);
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}
