/**
 * Skills section — categorized skill groups with specific tech icons.
 */

const SKILLS = [
  {
    category: 'Systems',
    logo: 'SYS',
    items: [
      { name: 'Linux', icon: '🐧' },
      { name: 'Networking', icon: '🌐' },
      { name: 'Distributed Systems', icon: '🏗️' }
    ]
  },
  {
    category: 'Backend',
    logo: 'BE',
    items: [
      { name: 'Node.js', icon: '🟢' },
      { name: 'Express', icon: '🚂' },
      { name: 'REST APIs', icon: '🔌' },
      { name: 'JWT/Auth', icon: '🔐' }
    ]
  },
  {
    category: 'Databases',
    logo: 'DB',
    items: [
      { name: 'PostgreSQL', icon: '🐘' },
      { name: 'MongoDB', icon: '🍃' },
      { name: 'Redis', icon: '🔴' }
    ]
  },
  {
    category: 'Languages',
    logo: 'JS',
    items: [
      { name: 'JavaScript', icon: '🟨' },
      { name: 'Python', icon: '🐍' },
      { name: 'Java', icon: '☕' },
      { name: 'C++', icon: '🔵' },
      { name: 'Go', icon: '🐹' }
    ]
  },
  {
    category: 'Tools',
    logo: 'GIT',
    items: [
      { name: 'Git', icon: '📂' },
      { name: 'Docker', icon: '🐳' },
      { name: 'GitHub Actions', icon: '🤖' }
    ]
  },
  {
    category: 'Core',
    logo: 'CS',
    items: [
      { name: 'DSA', icon: '🧠' },
      { name: 'System Design', icon: '📐' },
      { name: 'Debugging', icon: '🔍' }
    ]
  }
];

export function initSkills() {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;

  SKILLS.forEach((group, i) => {
    const el = document.createElement('div');
    el.className = 'skill-group';
    el.style.transitionDelay = `${i * 0.08}s`;

    el.innerHTML = `
      <div class="skill-header">
        <div class="skill-logo">${group.logo}</div>
        <h3 class="skill-group-title">${group.category}</h3>
      </div>
      <ul class="skill-list">
        ${group.items.map(s => `
          <li class="skill-item">
            <span class="skill-icon-placeholder">${s.icon}</span>
            <span>${s.name}</span>
          </li>
        `).join('')}
      </ul>
    `;

    grid.appendChild(el);
  });
}
