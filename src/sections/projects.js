/**
 * Projects section — renders project cards with 3D tilt, glow, and expand-on-click.
 */

const PROJECTS = [
  {
    id: 'unravel',
    name: 'Unravel',
    image: 'unravel.png',
    short: 'Interactive number puzzle platform with real-time logic validation.',
    tech: ['React', 'JavaScript', 'Tailwind'],
    status: 'Live',
    links: {
      github: 'https://github.com/Nilax-Kundu/unravel',
      live: 'https://nilax-kundu.github.io/unravel/',
    },
    details: {
      overview: 'Browser-based puzzle system with responsive gameplay and logic validation.',
      problem: 'Needed a fast, interactive system for logic-based gameplay with immediate feedback.',
      approach: 'Built state-driven UI with optimized updates and real-time validation.',
      highlights: ['Sub-200ms state updates', 'Dynamic UI animations', 'Wordle-style validation system'],
    },
  },
  {
    id: 'koda',
    name: 'Koda',
    image: 'koda.png',
    short: 'Discord bot managing multiplayer counting games with rule enforcement.',
    tech: ['Python', 'PostgreSQL', 'Discord API'],
    status: 'Stable',
    links: { github: 'https://github.com/Nilax-Kundu/koda' },
    details: {
      overview: 'Automated system for multiplayer counting games in Discord.',
      problem: 'Needed rule enforcement and persistence in multiplayer chat environment.',
      approach: 'Built parsing engine with database-backed state tracking.',
      highlights: ['BODMAS-compliant parsing', 'Persistent scoring system', 'Stable at 2000+ users'],
    },
  },
  {
    id: 'library-tracker',
    name: 'Personal Library Tracker',
    image: 'lib.png',
    short: 'Full-stack system for managing book collections and media workflows.',
    tech: ['MongoDB', 'Express', 'React', 'Node.js'],
    status: 'Completed',
    links: { github: 'https://github.com/Nilax-Kundu/Personal-Library-Tracker' },
    details: {
      overview: 'MERN application for managing book inventory and metadata.',
      problem: 'Needed structured tracking of books with media support.',
      approach: 'Designed REST APIs with authentication and file handling.',
      highlights: ['JWT authentication', 'Cloudinary media storage', 'Scalable backend structure'],
    },
  },
  {
    id: 'rgov',
    name: 'Rgov',
    image: 'rgov.png',
    short: 'Governance simulation exploring rule enforcement and system stability.',
    tech: ['Python'],
    status: 'Experimental',
    links: {},
    details: {
      overview: 'Simulation of structured governance systems.',
      problem: 'Modeling stability under adversarial conditions.',
      approach: 'Designed layered rule enforcement and system logic.',
      highlights: ['Adversarial system modeling', 'Stability analysis', 'Rule-based simulation'],
    },
  },
  {
    id: 'apiscope',
    name: 'API Scope',
    image: 'apiscope.png',
    short: 'API inspection tool for exploring endpoints and response structures.',
    tech: ['Node.js'],
    status: 'In Progress',
    links: {},
    details: {
      overview: 'Tool for analyzing API behavior and structure.',
      problem: 'Lack of visibility into API responses and schema.',
      approach: 'Built inspection workflows for structured analysis.',
      highlights: ['Endpoint analysis', 'Response inspection', 'Debugging support'],
    },
  },
];

function getStatusClass(status) {
  const s = status.toLowerCase();
  if (s === 'live') return 'live';
  if (s === 'experimental') return 'experimental';
  return '';
}

function createProjectCard(project, index) {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.style.transitionDelay = `${index * 0.1}s`;

  const linksHtml = [];
  if (project.links.github) {
    linksHtml.push(`<a href="${project.links.github}" target="_blank" rel="noopener" class="project-link">GitHub ↗</a>`);
  }
  if (project.links.live) {
    linksHtml.push(`<a href="${project.links.live}" target="_blank" rel="noopener" class="project-link">Live ↗</a>`);
  }

  card.innerHTML = `
    <div class="project-preview">
      <img src="${project.image}" alt="${project.name}" loading="lazy">
    </div>
    <div class="project-content">
      <div class="project-card-header">
      <span class="project-name">${project.name}</span>
      <span class="project-status ${getStatusClass(project.status)}">${project.status}</span>
    </div>
    <p class="project-short">${project.short}</p>
    <div class="project-tech">
      ${project.tech.map(t => `<span class="tech-badge">${t}</span>`).join('')}
    </div>
    ${linksHtml.length ? `<div class="project-links">${linksHtml.join('')}</div>` : ''}
    <div class="project-details">
      <div class="project-details-inner">
        <div class="project-detail-label">Overview</div>
        <p class="project-detail-text">${project.details.overview}</p>
        <div class="project-detail-label">Problem</div>
        <p class="project-detail-text">${project.details.problem}</p>
        <div class="project-detail-label">Approach</div>
        <p class="project-detail-text">${project.details.approach}</p>
        <div class="project-detail-label">Highlights</div>
        <ul class="project-highlights">
          ${project.details.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;

  // 3D tilt on hover
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    card.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(0)`;
    card.style.setProperty('--mouse-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    card.style.setProperty('--mouse-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });

  // Expand/collapse on click
  card.addEventListener('click', (e) => {
    // Don't toggle if clicking a link
    if (e.target.closest('a')) return;
    card.classList.toggle('expanded');
  });

  return card;
}

export function initProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  PROJECTS.forEach((project, i) => {
    grid.appendChild(createProjectCard(project, i));
  });
}
