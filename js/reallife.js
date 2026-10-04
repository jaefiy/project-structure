/* Real-Life Quests Controller - Perimeter & Area Quest */

document.addEventListener('DOMContentLoaded', () => {
  initRealLifeQuests();
});

let currentQuest = 1;

const questData = {
  1: {
    badge: "Malaysian Scenario #1",
    location: "📍 Kampong Durian Sebatang, Perak",
    title: "Uncle Samad's L-Shaped Kampong Garden",
    story: "Uncle Samad wants to put a wooden fence around his L-shaped garden and plant fresh grass turf on the ground. The garden combines a main rectangle (10 m × 6 m) and a square plot (4 m × 4 m). Total bottom = 14 m, Total left = 10 m.",
    targetPeri: 48, // Top (10) + Inner Right (6) + Step Top (4) + Square Right (4) + Bottom Total (14) + Left Total (10) = 48 m
    targetArea: 76, // Rectangle (10×6 = 60) + Square (4×4 = 16) = 76 m²
    partADesc: "Outer boundary perimeter for wooden fence (Top 10m + Inner Right 6m + Step 4m + Sq Right 4m + Bottom 14m + Left 10m):",
    partBDesc: "Total turf area for grass (Rectangle 10×6 + Square 4×4):",
    unitA: "m",
    unitB: "m²",
    drawSVG: (svg) => {
      svg.innerHTML = `
        <path d="M 80,60 L 220,60 L 220,150 L 280,150 L 280,240 L 80,240 Z" fill="#bbf7d0" stroke="#16a34a" stroke-width="4"/>
        <line x1="220" y1="150" x2="220" y2="240" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4"/>

        <!-- Fruit/Vegetable decor icons -->
        <text x="150" y="110" font-size="22">🥬</text>
        <text x="120" y="180" font-size="22">🌶️</text>
        <text x="245" y="200" font-size="22">🍉</text>

        <!-- Labels -->
        <text x="150" y="50" text-anchor="middle" font-weight="bold" fill="#15803d" font-size="14">Top: 10 m</text>
        <text x="235" y="105" font-weight="bold" fill="#15803d" font-size="14">6 m</text>
        <text x="250" y="140" text-anchor="middle" font-weight="bold" fill="#ca8a04" font-size="14">4 m</text>
        <text x="295" y="200" font-weight="bold" fill="#ca8a04" font-size="14">4 m</text>
        <text x="180" y="260" text-anchor="middle" font-weight="bold" fill="#15803d" font-size="14">Bottom Total: 14 m</text>
        <text x="60" y="150" text-anchor="end" font-weight="bold" fill="#15803d" font-size="14">Left Total: 10 m</text>
      `;
    }
  },
  2: {
    badge: "Malaysian Scenario #2",
    location: "📍 SK Seri Bintang Utama, Kuala Lumpur",
    title: "Hari Merdeka Celebration Banner",
    story: "For Hari Merdeka, Year 5 students are crafting a decorative banner. It has a central rectangular body (8 m × 3 m) with two decorative Equilateral Triangles attached on each end (side = 3 m, height = 2.6 m).",
    targetPeri: 28, // Bottom 8 + Top 8 + 4 slanted triangle sides (3+3+3+3) = 8 + 8 + 12 = 28 m
    targetArea: 31.8, // Rect: 8×3 = 24. Triangle 1: ½×3×2.6 = 3.9. Triangle 2: ½×3×2.6 = 3.9. Total = 24 + 7.8 = 31.8 m²
    partADesc: "Total outer border ribbon length (Top 8m + Bottom 8m + 4 Triangle sides 3m each):",
    partBDesc: "Total fabric area needed (Rectangle 8×3 + 2 Triangles ½×3×2.6 each):",
    unitA: "m",
    unitB: "m²",
    drawSVG: (svg) => {
      svg.innerHTML = `
        <!-- Left Triangle -->
        <polygon points="100,160 40,80 100,80" fill="#fef08a" stroke="#ca8a04" stroke-width="3"/>
        <!-- Middle Rect -->
        <rect x="100" y="80" width="240" height="80" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="3"/>
        <!-- Right Triangle -->
        <polygon points="340,80 400,80 340,160" fill="#fef08a" stroke="#ca8a04" stroke-width="3"/>

        <!-- Flag motif -->
        <text x="220" y="130" text-anchor="middle" font-size="28">🇲🇾 SELAMAT HARI MERDEKA 🇲🇾</text>

        <!-- Labels -->
        <text x="220" y="65" text-anchor="middle" font-weight="bold" fill="#1e40af" font-size="14">8 m</text>
        <text x="220" y="180" text-anchor="middle" font-weight="bold" fill="#1e40af" font-size="14">8 m</text>
        <text x="60" y="70" font-weight="bold" fill="#854d0e" font-size="13">Eq. Side 3 m</text>
        <text x="360" y="70" font-weight="bold" fill="#854d0e" font-size="13">Eq. Side 3 m</text>
      `;
    }
  },
  3: {
    badge: "Malaysian Scenario #3",
    location: "📍 Taman Rekreasi Shah Alam, Selangor",
    title: "Chandra's Playground Sandbox & Ramp",
    story: "Chandra is helping design the community playground! The sandbox is a rectangle (6 m × 4 m) with a right-angled wooden climbing ramp attached (base 3 m, height 4 m, hypotenuse 5 m).",
    targetPeri: 24, // Rectangle Top (6) + Rectangle Left (4) + Rectangle Bottom (6) + Ramp Base (3) + Ramp Hypotenuse (5) = 6+4+6+3+5 = 24 m
    targetArea: 30, // Rect (6×4 = 24) + Right Triangle (½×3×4 = 6) = 30 m²
    partADesc: "Safety railing length along outer perimeter:",
    partBDesc: "Total ground surface area (Rectangle 6×4 + Right Triangle ½×3×4):",
    unitA: "m",
    unitB: "m²",
    drawSVG: (svg) => {
      svg.innerHTML = `
        <!-- Rect sandbox -->
        <rect x="80" y="100" width="180" height="120" fill="#fde047" stroke="#ca8a04" stroke-width="3"/>
        <!-- Right Triangle Ramp -->
        <polygon points="260,100 260,220 350,220" fill="#f87171" stroke="#dc2626" stroke-width="3"/>

        <!-- Playground icons -->
        <text x="160" y="170" text-anchor="middle" font-size="28">🏖️ Sandbox</text>
        <text x="290" y="180" font-size="22">🛝 Ramp</text>

        <!-- Labels -->
        <text x="170" y="85" text-anchor="middle" font-weight="bold" fill="#854d0e" font-size="14">Top: 6 m</text>
        <text x="60" y="160" text-anchor="end" font-weight="bold" fill="#854d0e" font-size="14">Left: 4 m</text>
        <text x="170" y="240" text-anchor="middle" font-weight="bold" fill="#854d0e" font-size="14">Bottom: 6 m</text>
        <text x="305" y="240" text-anchor="middle" font-weight="bold" fill="#991b1b" font-size="14">Ramp Base: 3 m</text>
        <text x="320" y="150" font-weight="bold" fill="#991b1b" font-size="14">Slanted: 5 m</text>
      `;
    }
  }
};

function initRealLifeQuests() {
  setupQuestTabs();
  loadQuest(1);

  document.getElementById('btn-check-parta').addEventListener('click', checkPartA);
  document.getElementById('btn-check-partb').addEventListener('click', checkPartB);
}

function setupQuestTabs() {
  for (let i = 1; i <= 3; i++) {
    const tab = document.getElementById(`quest-tab-${i}`);
    if (tab) {
      tab.addEventListener('click', () => {
        playSound('click');
        for (let j = 1; j <= 3; j++) {
          const t = document.getElementById(`quest-tab-${j}`);
          if (t) t.classList.remove('active');
        }
        tab.classList.add('active');
        currentQuest = i;
        loadQuest(i);
      });
    }
  }
}

function loadQuest(qId) {
  const data = questData[qId];

  document.getElementById('quest-badge').textContent = data.badge;
  document.getElementById('quest-location-tag').textContent = data.location;
  document.getElementById('quest-title').textContent = data.title;
  document.getElementById('quest-story').textContent = data.story;

  document.getElementById('quest-parta-desc').textContent = data.partADesc;
  document.getElementById('quest-partb-desc').textContent = data.partBDesc;

  document.getElementById('unit-part-a').textContent = data.unitA;
  document.getElementById('unit-part-b').textContent = data.unitB;

  // Clear inputs and feedback
  document.getElementById('input-part-a').value = '';
  document.getElementById('input-part-b').value = '';
  document.getElementById('feedback-parta').innerHTML = '';
  document.getElementById('feedback-partb').innerHTML = '';
  document.getElementById('quest-victory-box').style.display = 'none';

  // Draw SVG
  const svg = document.getElementById('quest-svg');
  data.drawSVG(svg);
}

function checkPartA() {
  const inputVal = parseFloat(document.getElementById('input-part-a').value);
  const data = questData[currentQuest];
  const feedback = document.getElementById('feedback-parta');

  if (isNaN(inputVal)) {
    feedback.innerHTML = `<p style="color: #dc2626; font-weight: bold; margin-top: 0.5rem;">Please enter a valid number!</p>`;
    return;
  }

  if (Math.abs(inputVal - data.targetPeri) < 0.1) {
    playSound('success');
    feedback.innerHTML = `
      <div class="feedback-msg correct" style="margin-top: 0.5rem; padding: 0.5rem 0.75rem;">
        <span>✅ Correct Perimeter! (${data.targetPeri} ${data.unitA})</span>
      </div>
    `;
    checkBothSolved();
  } else {
    feedback.innerHTML = `
      <div class="feedback-msg incorrect" style="margin-top: 0.5rem; padding: 0.5rem 0.75rem;">
        <span>❌ Try again! Hint: Add up all outer side lengths. Do not count inner shared lines.</span>
      </div>
    `;
  }
}

function checkPartB() {
  const inputVal = parseFloat(document.getElementById('input-part-b').value);
  const data = questData[currentQuest];
  const feedback = document.getElementById('feedback-partb');

  if (isNaN(inputVal)) {
    feedback.innerHTML = `<p style="color: #dc2626; font-weight: bold; margin-top: 0.5rem;">Please enter a valid number!</p>`;
    return;
  }

  if (Math.abs(inputVal - data.targetArea) < 0.1) {
    playSound('success');
    feedback.innerHTML = `
      <div class="feedback-msg correct" style="margin-top: 0.5rem; padding: 0.5rem 0.75rem;">
        <span>✅ Correct Area! (${data.targetArea} ${data.unitB})</span>
      </div>
    `;
    checkBothSolved();
  } else {
    feedback.innerHTML = `
      <div class="feedback-msg incorrect" style="margin-top: 0.5rem; padding: 0.5rem 0.75rem;">
        <span>❌ Try again! Hint: Calculate Area of Shape A + Area of Shape B.</span>
      </div>
    `;
  }
}

function checkBothSolved() {
  const feedbackA = document.getElementById('feedback-parta').textContent;
  const feedbackB = document.getElementById('feedback-partb').textContent;

  if (feedbackA.includes('Correct') && feedbackB.includes('Correct')) {
    QuestStorage.addStars(2);
    document.getElementById('quest-victory-box').style.display = 'block';
  }
}
