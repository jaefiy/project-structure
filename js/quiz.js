/* Quiz Challenge Controller - Perimeter & Area Quest */

document.addEventListener('DOMContentLoaded', () => {
  initQuiz();
});

let currentQuestionIndex = 0;
let userScore = 0;
let selectedOptionIndex = null;
let answeredCurrent = false;

// Question Bank aligned with KSSR 6.3.1 & 6.3.2
const questions = [
  {
    id: 1,
    category: "6.3.1 Perimeter",
    title: "House Diagram Perimeter",
    desc: "Calculate the total outer perimeter of this house shape made of a rectangle (10 cm × 8 cm) and an isosceles triangle roof (slanted sides 7 cm each).",
    hint: "Add all 5 outer sides: Bottom (10 cm) + Left (8 cm) + Right (8 cm) + Roof Left (7 cm) + Roof Right (7 cm). Do not count the inner base line!",
    options: ["33 cm", "40 cm", "50 cm", "30 cm"],
    correctIndex: 1, // 10+8+8+7+7 = 40
    svgDraw: (svg) => {
      svg.innerHTML = `
        <rect x="120" y="140" width="160" height="110" fill="#e0f2fe" stroke="#0284c7" stroke-width="3"/>
        <polygon points="120,140 280,140 200,60" fill="#fef3c7" stroke="#d97706" stroke-width="3"/>
        <line x1="120" y1="140" x2="280" y2="140" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4"/>
        <text x="200" y="270" text-anchor="middle" font-weight="bold" fill="#0369a1" font-size="14">Bottom: 10 cm</text>
        <text x="295" y="200" font-weight="bold" fill="#0369a1" font-size="14">8 cm</text>
        <text x="90" y="200" font-weight="bold" fill="#0369a1" font-size="14">8 cm</text>
        <text x="250" y="95" font-weight="bold" fill="#d97706" font-size="14">7 cm</text>
        <text x="130" y="95" font-weight="bold" fill="#d97706" font-size="14">7 cm</text>
      `;
    }
  },
  {
    id: 2,
    category: "6.3.2 Area",
    title: "House Diagram Total Area",
    desc: "Calculate the total area of the house shape above. The rectangle is 10 cm wide by 8 cm high. The roof triangle has a base of 10 cm and height of 6 cm.",
    hint: "Area = Area of Rectangle (Length × Width) + Area of Triangle (½ × Base × Height). Area = (10 × 8) + (½ × 10 × 6).",
    options: ["110 cm²", "80 cm²", "140 cm²", "95 cm²"],
    correctIndex: 0, // 80 + 30 = 110
    svgDraw: (svg) => {
      svg.innerHTML = `
        <rect x="120" y="140" width="160" height="110" fill="#93c5fd" stroke="#1d4ed8" stroke-width="3"/>
        <polygon points="120,140 280,140 200,60" fill="#fde047" stroke="#ca8a04" stroke-width="3"/>
        <line x1="200" y1="140" x2="200" y2="60" stroke="#ca8a04" stroke-width="2" stroke-dasharray="4,4"/>
        <text x="200" y="200" text-anchor="middle" font-weight="bold" fill="#1e3a8a" font-size="15">Rect: 10 cm × 8 cm</text>
        <text x="210" y="105" font-weight="bold" fill="#854d0e" font-size="14">Height = 6 cm</text>
        <text x="200" y="270" text-anchor="middle" font-weight="bold" fill="#0369a1" font-size="14">Base = 10 cm</text>
      `;
    }
  },
  {
    id: 3,
    category: "6.3.1 Perimeter",
    title: "L-Shape Outer Boundary",
    desc: "Find the perimeter of an L-shaped playground made of a rectangle (12 m × 6 m) attached to a square (6 m × 6 m). Total bottom = 18 m, Total left = 12 m.",
    hint: "Perimeter is the sum of all 6 outer edges: Top (12 m) + Right1 (6 m) + Step Top (6 m) + Right2 (6 m) + Bottom (18 m) + Left (12 m).",
    options: ["48 m", "60 m", "54 m", "36 m"],
    correctIndex: 1, // 12 + 6 + 6 + 6 + 18 + 12 = 60
    svgDraw: (svg) => {
      svg.innerHTML = `
        <path d="M 100,60 L 220,60 L 220,150 L 280,150 L 280,240 L 100,240 Z" fill="#e0f2fe" stroke="#f59e0b" stroke-width="4"/>
        <line x1="220" y1="150" x2="220" y2="240" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4"/>
        <text x="160" y="50" text-anchor="middle" font-weight="bold" fill="#0369a1" font-size="14">12 m</text>
        <text x="235" y="105" font-weight="bold" fill="#0369a1" font-size="14">6 m</text>
        <text x="250" y="140" text-anchor="middle" font-weight="bold" fill="#d97706" font-size="14">6 m</text>
        <text x="295" y="200" font-weight="bold" fill="#d97706" font-size="14">6 m</text>
        <text x="190" y="260" text-anchor="middle" font-weight="bold" fill="#0369a1" font-size="14">18 m</text>
        <text x="80" y="150" text-anchor="end" font-weight="bold" fill="#0369a1" font-size="14">12 m</text>
      `;
    }
  },
  {
    id: 4,
    category: "6.3.2 Area",
    title: "L-Shape Total Area",
    desc: "Calculate the total area of the L-shaped playground (Rectangle 12 m × 6 m and Square 6 m × 6 m).",
    hint: "Total Area = Area A (Rectangle: 12 × 6) + Area B (Square: 6 × 6) = 72 + 36.",
    options: ["108 m²", "96 m²", "120 m²", "72 m²"],
    correctIndex: 0, // 72 + 36 = 108
    svgDraw: (svg) => {
      svg.innerHTML = `
        <rect x="100" y="60" width="120" height="180" fill="#a7f3d0" stroke="#059669" stroke-width="3"/>
        <rect x="220" y="150" width="60" height="90" fill="#fef08a" stroke="#ca8a04" stroke-width="3"/>
        <text x="160" y="150" text-anchor="middle" font-weight="bold" fill="#065f46" font-size="15">Shape A (12m × 6m)</text>
        <text x="250" y="200" text-anchor="middle" font-weight="bold" fill="#854d0e" font-size="13">Shape B (6m × 6m)</text>
      `;
    }
  },
  {
    id: 5,
    category: "6.3.1 Perimeter",
    title: "Rocket Banner Perimeter",
    desc: "A banner is shaped like a rocket: Rectangle body (6 cm × 14 cm) with an Equilateral Triangle nose cone (all sides 6 cm). What is its perimeter?",
    hint: "Equilateral triangle sides are all 6 cm. Perimeter = Bottom (6 cm) + Left (14 cm) + Right (14 cm) + Cone Left (6 cm) + Cone Right (6 cm). Do not add the inner shared border!",
    options: ["52 cm", "46 cm", "40 cm", "34 cm"],
    correctIndex: 1, // 6 + 14 + 14 + 6 + 6 = 46
    svgDraw: (svg) => {
      svg.innerHTML = `
        <rect x="140" y="120" width="120" height="150" fill="#e0f2fe" stroke="#0284c7" stroke-width="3"/>
        <polygon points="140,120 260,120 200,40" fill="#fecdd3" stroke="#e11d48" stroke-width="3"/>
        <line x1="140" y1="120" x2="260" y2="120" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4"/>
        <text x="200" y="288" text-anchor="middle" font-weight="bold" fill="#0369a1" font-size="14">6 cm</text>
        <text x="275" y="200" font-weight="bold" fill="#0369a1" font-size="14">14 cm</text>
        <text x="110" y="200" font-weight="bold" fill="#0369a1" font-size="14">14 cm</text>
        <text x="245" y="75" font-weight="bold" fill="#be123c" font-size="14">6 cm</text>
        <text x="140" y="75" font-weight="bold" fill="#be123c" font-size="14">6 cm</text>
      `;
    }
  },
  {
    id: 6,
    category: "6.3.2 Area",
    title: "Arrowhead Composite Area",
    desc: "An arrow sign consists of a rectangular shaft (10 cm × 4 cm) and a right-angled triangle arrowhead (base 5 cm, height 4 cm). What is the total area?",
    hint: "Total Area = Rectangle (10 × 4) + Right Triangle (½ × 5 × 4) = 40 + 10.",
    options: ["50 cm²", "60 cm²", "45 cm²", "55 cm²"],
    correctIndex: 0, // 40 + 10 = 50
    svgDraw: (svg) => {
      svg.innerHTML = `
        <rect x="80" y="110" width="160" height="80" fill="#93c5fd" stroke="#1d4ed8" stroke-width="3"/>
        <polygon points="240,110 240,190 320,190" fill="#a7f3d0" stroke="#059669" stroke-width="3"/>
        <text x="160" y="155" text-anchor="middle" font-weight="bold" fill="#1e3a8a" font-size="14">Rect (10 × 4)</text>
        <text x="270" y="175" text-anchor="middle" font-weight="bold" fill="#065f46" font-size="12">Triangle (Base 5, Height 4)</text>
      `;
    }
  },
  {
    id: 7,
    category: "6.3.1 Perimeter",
    title: "Diamond Gem Outer Boundary",
    desc: "A diamond gem is formed by joining two isosceles triangles at their shared base (10 cm). The top triangle sides are 8 cm each, and the bottom triangle sides are 12 cm each. What is the perimeter?",
    hint: "Perimeter = Top Left (8 cm) + Top Right (8 cm) + Bottom Left (12 cm) + Bottom Right (12 cm). Exclude shared middle base!",
    options: ["50 cm", "40 cm", "30 cm", "48 cm"],
    correctIndex: 1, // 8+8+12+12 = 40
    svgDraw: (svg) => {
      svg.innerHTML = `
        <polygon points="120,150 280,150 200,60" fill="#e9d5ff" stroke="#7e22ce" stroke-width="3"/>
        <polygon points="120,150 280,150 200,260" fill="#fbcfe8" stroke="#be185d" stroke-width="3"/>
        <line x1="120" y1="150" x2="280" y2="150" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4"/>
        <text x="145" y="100" font-weight="bold" fill="#6b21a8" font-size="14">8 cm</text>
        <text x="240" y="100" font-weight="bold" fill="#6b21a8" font-size="14">8 cm</text>
        <text x="135" y="220" font-weight="bold" fill="#9d174d" font-size="14">12 cm</text>
        <text x="245" y="220" font-weight="bold" fill="#9d174d" font-size="14">12 cm</text>
        <text x="200" y="145" text-anchor="middle" font-weight="bold" fill="#64748b" font-size="12">Base 10 cm (Inside)</text>
      `;
    }
  },
  {
    id: 8,
    category: "6.3.2 Area",
    title: "Double Triangle Area",
    desc: "Calculate the total area of the diamond gem above. Shared base = 10 cm. Top triangle height = 6 cm. Bottom triangle height = 9 cm.",
    hint: "Total Area = Area A (½ × 10 × 6) + Area B (½ × 10 × 9) = 30 + 45.",
    options: ["75 cm²", "90 cm²", "60 cm²", "105 cm²"],
    correctIndex: 0, // 30 + 45 = 75
    svgDraw: (svg) => {
      svg.innerHTML = `
        <polygon points="120,150 280,150 200,60" fill="#c084fc" stroke="#7e22ce" stroke-width="3"/>
        <polygon points="120,150 280,150 200,260" fill="#f472b6" stroke="#be185d" stroke-width="3"/>
        <line x1="200" y1="60" x2="200" y2="260" stroke="#334155" stroke-width="2" stroke-dasharray="4,4"/>
        <text x="210" y="110" font-weight="bold" fill="#581c87" font-size="14">H1 = 6 cm</text>
        <text x="210" y="210" font-weight="bold" fill="#831843" font-size="14">H2 = 9 cm</text>
        <text x="200" y="285" text-anchor="middle" font-weight="bold" fill="#0369a1" font-size="14">Shared Base = 10 cm</text>
      `;
    }
  },
  {
    id: 9,
    category: "6.3.1 Perimeter",
    title: "Square & Right Triangle Ramp",
    desc: "A wooden ramp block consists of a square base (8 cm × 8 cm) and a right-angled triangle ramp attached on top (base 8 cm, height 6 cm, hypotenuse 10 cm). What is the perimeter?",
    hint: "Add outer sides: Base bottom (8 cm) + Base left (8 cm) + Base right (8 cm) + Ramp top (10 cm) + Ramp vertical left (6 cm). Do not add shared horizontal edge!",
    options: ["40 cm", "32 cm", "50 cm", "42 cm"],
    correctIndex: 0, // 8 + 8 + 8 + 10 + 6 = 40
    svgDraw: (svg) => {
      svg.innerHTML = `
        <rect x="130" y="140" width="140" height="120" fill="#fed7aa" stroke="#c2410c" stroke-width="3"/>
        <polygon points="130,140 270,140 130,60" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="3"/>
        <line x1="130" y1="140" x2="270" y2="140" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4"/>
        <text x="200" y="280" text-anchor="middle" font-weight="bold" fill="#9a3412" font-size="14">8 cm</text>
        <text x="285" y="200" font-weight="bold" fill="#9a3412" font-size="14">8 cm</text>
        <text x="100" y="200" font-weight="bold" fill="#9a3412" font-size="14">8 cm</text>
        <text x="210" y="90" font-weight="bold" fill="#1e40af" font-size="14">10 cm</text>
        <text x="100" y="100" font-weight="bold" fill="#1e40af" font-size="14">6 cm</text>
      `;
    }
  },
  {
    id: 10,
    category: "6.3.2 Area",
    title: "Square & Right Triangle Area",
    desc: "What is the total composite area of the wooden ramp block above (Square 8 cm × 8 cm and Right-Angled Triangle base 8 cm, height 6 cm)?",
    hint: "Total Area = Area of Square (8 × 8) + Area of Right Triangle (½ × 8 × 6) = 64 + 24.",
    options: ["88 cm²", "96 cm²", "80 cm²", "100 cm²"],
    correctIndex: 0, // 64 + 24 = 88
    svgDraw: (svg) => {
      svg.innerHTML = `
        <rect x="130" y="140" width="140" height="120" fill="#fdba74" stroke="#c2410c" stroke-width="3"/>
        <polygon points="130,140 270,140 130,60" fill="#60a5fa" stroke="#1d4ed8" stroke-width="3"/>
        <text x="200" y="200" text-anchor="middle" font-weight="bold" fill="#7c2d12" font-size="15">Square: 8 cm × 8 cm</text>
        <text x="180" y="115" text-anchor="middle" font-weight="bold" fill="#1e3a8a" font-size="13">Triangle: ½ × 8 × 6</text>
      `;
    }
  }
];

function initQuiz() {
  currentQuestionIndex = 0;
  userScore = 0;
  updateStarsDisplay();
  loadQuestion();

  document.getElementById('btn-hint').addEventListener('click', toggleHint);
  document.getElementById('btn-submit-answer').addEventListener('click', submitAnswer);
  document.getElementById('btn-next-question').addEventListener('click', nextQuestion);
  document.getElementById('btn-restart-quiz').addEventListener('click', restartQuiz);
}

function updateStarsDisplay() {
  document.getElementById('quiz-score-stars').textContent = `${userScore} / ${questions.length}`;
}

function loadQuestion() {
  answeredCurrent = false;
  selectedOptionIndex = null;

  const q = questions[currentQuestionIndex];

  // Update UI headers & progress
  document.getElementById('quiz-progress-text').textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  document.getElementById('quiz-category-tag').textContent = q.category;

  const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
  document.getElementById('quiz-progress-bar').style.width = `${progressPercent}%`;

  document.getElementById('question-title').textContent = `${q.id}. ${q.title}`;
  document.getElementById('question-desc').textContent = q.desc;

  // Render SVG
  const svg = document.getElementById('quiz-svg');
  q.svgDraw(svg);

  // Render Options
  const container = document.getElementById('quiz-options-container');
  container.innerHTML = q.options.map((opt, idx) => `
    <button class="btn btn-outline option-btn" data-index="${idx}" style="text-align: left; justify-content: flex-start; padding: 0.8rem 1.25rem;">
      <span style="background: #e2e8f0; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 0.9rem; margin-right: 0.5rem;">
        ${String.fromCharCode(65 + idx)}
      </span>
      ${opt}
    </button>
  `).join('');

  // Attach option click listeners
  const optBtns = container.querySelectorAll('.option-btn');
  optBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (answeredCurrent) return;
      playSound('click');
      optBtns.forEach(b => b.style.borderColor = 'var(--primary-color)');
      optBtns.forEach(b => b.style.background = 'white');

      btn.style.borderColor = 'var(--accent-amber)';
      btn.style.background = '#fef3c7';
      selectedOptionIndex = parseInt(btn.getAttribute('data-index'), 10);
    });
  });

  // Reset Hint and Feedback
  document.getElementById('hint-box').style.display = 'none';
  document.getElementById('hint-text').textContent = q.hint;
  document.getElementById('feedback-container').innerHTML = '';

  document.getElementById('btn-submit-answer').style.display = 'inline-flex';
  document.getElementById('btn-next-question').style.display = 'none';
}

function toggleHint() {
  playSound('click');
  const box = document.getElementById('hint-box');
  box.style.display = box.style.display === 'none' ? 'block' : 'none';
}

function submitAnswer() {
  if (selectedOptionIndex === null) {
    alert("Please select an answer option first!");
    return;
  }
  if (answeredCurrent) return;

  answeredCurrent = true;
  const q = questions[currentQuestionIndex];
  const isCorrect = selectedOptionIndex === q.correctIndex;

  const feedbackContainer = document.getElementById('feedback-container');

  if (isCorrect) {
    playSound('success');
    userScore++;
    updateStarsDisplay();
    feedbackContainer.innerHTML = `
      <div class="feedback-msg correct">
        <span>🎉 Excellent! That is correct!</span>
      </div>
    `;
  } else {
    feedbackContainer.innerHTML = `
      <div class="feedback-msg incorrect">
        <span>❌ Not quite. The correct answer was <strong>${q.options[q.correctIndex]}</strong>.</span>
      </div>
    `;
  }

  // Highlight correct/incorrect options
  const optBtns = document.querySelectorAll('.option-btn');
  optBtns.forEach((btn, idx) => {
    if (idx === q.correctIndex) {
      btn.style.background = '#d1e7dd';
      btn.style.borderColor = '#10b981';
      btn.style.color = '#0f5132';
    } else if (idx === selectedOptionIndex && !isCorrect) {
      btn.style.background = '#f8d7da';
      btn.style.borderColor = '#f43f5e';
      btn.style.color = '#842029';
    }
  });

  document.getElementById('btn-submit-answer').style.display = 'none';
  document.getElementById('btn-next-question').style.display = 'inline-flex';
}

function nextQuestion() {
  playSound('click');
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showCertificateModal();
  }
}

function showCertificateModal() {
  QuestStorage.setQuizScore(userScore);
  QuestStorage.addStars(userScore);

  const modal = document.getElementById('certificate-modal');
  modal.style.display = 'flex';

  let starsStr = "⭐";
  if (userScore >= 8) starsStr = "⭐⭐⭐";
  else if (userScore >= 5) starsStr = "⭐⭐";

  document.getElementById('final-stars-display').textContent = starsStr;
  document.getElementById('final-score-text').textContent = `Final Score: ${userScore} / ${questions.length}`;
}

function restartQuiz() {
  playSound('click');
  document.getElementById('certificate-modal').style.display = 'none';
  initQuiz();
}
