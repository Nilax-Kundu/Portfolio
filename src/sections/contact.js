export function initContact() {
  const container = document.getElementById('contact-info');
  if (!container) return;

  container.innerHTML = `
    <div class="contact-grid">
      <div class="contact-info-block">
        <div class="contact-links">
          <a href="mailto:nilaxsafidon@gmail.com" class="contact-item" id="contact-email">
            <span class="contact-icon">✉</span>
            <span class="contact-label">Email</span>
            <span class="contact-value">nilaxsafidon@gmail.com</span>
          </a>
          <a href="https://github.com/Nilax-Kundu" target="_blank" rel="noopener" class="contact-item" id="contact-github">
            <span class="contact-icon">⌂</span>
            <span class="contact-label">GitHub</span>
            <span class="contact-value">Nilax-Kundu</span>
          </a>
          <a href="https://linkedin.com/in/nilax-kundu" target="_blank" rel="noopener" class="contact-item" id="contact-linkedin">
            <span class="contact-icon">∞</span>
            <span class="contact-label">LinkedIn</span>
            <span class="contact-value">nilax-kundu</span>
          </a>
        </div>
        <a href="/resume.pdf" download class="resume-btn" id="resume-download">
          ↓ Download Resume
        </a>
      </div>

      <div class="contact-terminal">
        <div class="terminal-header">
          <div class="terminal-buttons">
            <span></span><span></span><span></span>
          </div>
          <div class="terminal-title">nilax@systems:~</div>
        </div>
        <div class="terminal-body" id="terminal-body"></div>
      </div>
    </div>
  `;

  const terminalBody = document.getElementById('terminal-body');
  if (!terminalBody) return;

  const logs = [
    { type: 'INFO', msg: 'Initializing Nilax Engine v2.5' },
    { type: 'SUCCESS', msg: 'Certificates decrypted and loaded' },
    { type: 'DEBUG', msg: 'Database connection pool established' },
    { type: 'INFO', msg: 'System monitoring active' },
    { type: 'SUCCESS', msg: 'Handshake established with visitor' },
    { type: 'DEBUG', msg: 'Latency optimized: 12ms' },
    { type: 'INFO', msg: 'Syncing projects from local repository...' },
    { type: 'SUCCESS', msg: 'Buffer clean-up complete' },
    { type: 'WARN', msg: 'No unauthorized access detected' },
    { type: 'INFO', msg: 'Waiting for connection...' },
    { type: 'SUCCESS', msg: 'TCP Socket bound to [PORTFOLIO]' },
    { type: 'DEBUG', msg: 'Cache-Control enabled' }
  ];

  function addLog(type, msg) {
    const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
    const line = document.createElement('div');
    line.className = 'terminal-line';
    
    let labelClass = 'log-info';
    if (type === 'SUCCESS') labelClass = 'log-success';
    if (type === 'DEBUG') labelClass = 'log-debug';
    if (type === 'WARN') labelClass = 'log-warn';

    line.innerHTML = `
      <span class="log-time">[${time}] </span>
      <span class="log-type ${labelClass}">${type}:</span>
      <span class="log-msg"> ${msg}</span>
    `;

    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;

    if (terminalBody.children.length > 20) {
      terminalBody.removeChild(terminalBody.firstChild);
    }
  }

  // Initial sequence
  let delay = 0;
  logs.slice(0, 5).forEach((log) => {
    setTimeout(() => addLog(log.type, log.msg), delay);
    delay += 500 + (Math.random() * 500);
  });

  // Recurring random logs
  setInterval(() => {
    const log = logs[Math.floor(Math.random() * logs.length)];
    addLog(log.type, log.msg);
  }, 3500 + (Math.random() * 2000));
}
