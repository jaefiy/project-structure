/* Shared JS Utilities & Common Component Renderers */

document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
  initMobileMenu();
  highlightActiveNav();
});

function renderHeader() {
  const headerContainer = document.getElementById('header-container');
  if (!headerContainer) return;

  headerContainer.innerHTML = `
    <header class="site-header">
      <div class="header-container">
        <a href="index.html" class="logo-link">
          <span class="logo-icon">📐</span>
          <span>Perimeter & Area Quest</span>
        </a>
        <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Toggle navigation">
          ☰
        </button>
        <nav>
          <ul class="nav-links" id="nav-links">
            <li><a href="index.html" class="nav-link home-link">🏠 Home</a></li>
            <li><a href="lab.html" class="nav-link lab-link">🧪 Shape Lab</a></li>
            <li><a href="quiz.html" class="nav-link quiz-link">🎯 Quiz Challenge</a></li>
            <li><a href="reallife.html" class="nav-link reallife-link">🏞️ Real-Life Quest</a></li>
          </ul>
        </nav>
      </div>
    </header>
  `;
}

function renderFooter() {
  const footerContainer = document.getElementById('footer-container');
  if (!footerContainer) return;

  footerContainer.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <p>🌟 <strong>Perimeter and Area Quest</strong> - Year 5 Malaysian Primary School Mathematics (KSSR)</p>
        <p style="margin-top: 0.25rem; font-size: 0.85rem;">Standard 6.3.1 (Perimeter) & Standard 6.3.2 (Area of Composite Shapes)</p>
      </div>
    </footer>
  `;
}

function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const nav = document.getElementById('nav-links');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }
}

function highlightActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Sound effects simulation using Web Audio API
function playSound(type) {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.3);
    } else if (type === 'click') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.1);
    }
  } catch (e) {
    // Audio Context optional
  }
}

// LocalStorage User Score & Stars helper
const QuestStorage = {
  getStars: () => parseInt(localStorage.getItem('paq_stars') || '0', 10),
  addStars: (count) => {
    const current = QuestStorage.getStars();
    localStorage.setItem('paq_stars', current + count);
  },
  getQuizScore: () => parseInt(localStorage.getItem('paq_quiz_score') || '0', 10),
  setQuizScore: (score) => localStorage.setItem('paq_quiz_score', score)
};
