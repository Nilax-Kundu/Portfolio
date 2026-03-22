/**
 * Certifications section — renders real user certification cards.
 */

const CERTIFICATIONS = [
  {
    name: 'Full Stack Development (MERN)',
    issuer: 'Cipher Schools',
    date: '2025',
    image: 'cipher.png',
    link: 'https://drive.google.com/file/d/1YIJlnQdKUaRm-8ZJeLsZDKT0p9E0QmdS/view'
  },
  {
    name: 'Introduction to Machine Learning',
    issuer: 'NPTEL',
    date: '2025',
    image: 'nptel.png',
    link: 'https://drive.google.com/file/d/1nHjYuR1xzwsRxreGVA552nEED_1ncTVF/view'
  },
  {
    name: 'Hardware & Operating Systems',
    issuer: 'IBM',
    date: '2024',
    image: 'ibm.png',
    link: 'https://coursera.org/share/4bb00ad4f07a9e51f1a59182e26cf7ac'
  },
  {
    name: 'Computer Networking',
    issuer: 'Google',
    date: '2024',
    image: 'google.png',
    link: 'https://coursera.org/share/53b04156b1f1d45c862b9080c21e13a7'
  },
  {
    name: 'Digital Systems',
    issuer: 'Universitat Autònoma de Barcelona',
    date: '2024',
    image: 'uab.png',
    link: 'https://coursera.org/share/4d417bc6724c32254adfb400ed68071c'
  },
  {
    name: 'Object Oriented Programming',
    issuer: 'Neocolab (LPU)',
    date: '2024',
    image: 'lpu.png',
    link: 'https://drive.google.com/file/d/1xPpswuOk3jAjMKL27Q6Jig6maityiKaj/view'
  }
];

export function initCertifications() {
  const grid = document.getElementById('certifications-grid');
  if (!grid) return;

  CERTIFICATIONS.forEach((cert, i) => {
    const card = document.createElement('div');
    card.className = 'cert-card';
    card.style.transitionDelay = `${i * 0.1}s`;

    card.innerHTML = `
      <div class="cert-preview">
        <img src="${cert.image}" alt="${cert.name}" loading="lazy">
      </div>
      <div class="cert-content">
        <p class="cert-issuer">${cert.issuer}</p>
        <h3 class="cert-name">${cert.name}</h3>
        <p class="cert-date">${cert.date}</p>
        <a href="${cert.link}" target="_blank" class="cert-link">View Certificate ↗</a>
      </div>
    `;

    grid.appendChild(card);
  });
}
