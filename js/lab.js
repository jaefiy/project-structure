/* Interactive Shape Lab Controller - Perimeter & Area Quest */

document.addEventListener('DOMContentLoaded', () => {
  initLab();
});

let currentPreset = 'house';
let currentMode = 'perimeter'; // 'perimeter' or 'area'

// Default dimension parameters for presets
const presetsData = {
  house: {
    name: "House (Rectangle + Isosceles Triangle)",
    shapeA: { type: "Rectangle", name: "Shape A (Base Rectangle)", width: 10, height: 8 },
    shapeB: { type: "Isosceles Triangle", name: "Shape B (Roof Triangle)", base: 10, height: 6, side: 7.81 },
    sliders: [
      { id: "rectW", label: "House Width (m)", min: 4, max: 16, value: 10, step: 1 },
      { id: "rectH", label: "House Height (m)", min: 4, max: 14, value: 8, step: 1 },
      { id: "triH", label: "Roof Height (m)", min: 3, max: 10, value: 6, step: 1 }
    ]
  },
  lshape: {
    name: "L-Shape (Rectangle + Square)",
    shapeA: { type: "Rectangle", name: "Shape A (Main Block)", width: 12, height: 6 },
    shapeB: { type: "Square", name: "Shape B (Side Square)", side: 6 },
    sliders: [
      { id: "rectW", label: "Main Rectangle Width (cm)", min: 6, max: 16, value: 12, step: 1 },
      { id: "rectH", label: "Main Rectangle Height (cm)", min: 4, max: 12, value: 6, step: 1 },
      { id: "sqS", label: "Side Square (cm)", min: 3, max: 8, value: 6, step: 1 }
    ]
  },
  rocket: {
    name: "Rocket (Rectangle + Equilateral Triangle)",
    shapeA: { type: "Rectangle", name: "Shape A (Body)", width: 8, height: 12 },
    shapeB: { type: "Equilateral Triangle", name: "Shape B (Nose Cone)", side: 8, height: 6.93 },
    sliders: [
      { id: "rectW", label: "Body Width / Triangle Side (m)", min: 4, max: 12, value: 8, step: 2 },
      { id: "rectH", label: "Body Height (m)", min: 6, max: 16, value: 12, step: 1 }
    ]
  },
  arrow: {
    name: "Arrow (Rectangle + Right-Angled Triangle)",
    shapeA: { type: "Rectangle", name: "Shape A (Shaft)", width: 10, height: 6 },
    shapeB: { type: "Right-Angled Triangle", name: "Shape B (Arrowhead)", base: 8, height: 6, hypotenuse: 10 },
    sliders: [
      { id: "rectW", label: "Shaft Length (cm)", min: 6, max: 16, value: 10, step: 1 },
      { id: "rectH", label: "Shaft / Triangle Height (cm)", min: 4, max: 10, value: 6, step: 1 },
      { id: "triB", label: "Arrowhead Extension Base (cm)", min: 4, max: 12, value: 8, step: 1 }
    ]
  },
  gem: {
    name: "Gem (Isosceles Triangle + Isosceles Triangle)",
    shapeA: { type: "Isosceles Triangle", name: "Shape A (Top Crystal)", base: 10, height: 5, side: 7.07 },
    shapeB: { type: "Isosceles Triangle", name: "Shape B (Bottom Crystal)", base: 10, height: 8, side: 9.43 },
    sliders: [
      { id: "baseW", label: "Shared Middle Base (m)", min: 6, max: 16, value: 10, step: 2 },
      { id: "topH", label: "Top Crystal Height (m)", min: 3, max: 10, value: 5, step: 1 },
      { id: "botH", label: "Bottom Crystal Height (m)", min: 4, max: 12, value: 8, step: 1 }
    ]
  }
};

function initLab() {
  setupPresetButtons();
  setupTabButtons();
  renderLab();
}

function setupPresetButtons() {
  const container = document.getElementById('preset-buttons');
  if (!container) return;
  const buttons = container.querySelectorAll('button');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      playSound('click');
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPreset = btn.getAttribute('data-preset');
      renderLab();
    });
  });
}

function setupTabButtons() {
  const tabPeri = document.getElementById('tab-perimeter');
  const tabArea = document.getElementById('tab-area');

  if (tabPeri && tabArea) {
    tabPeri.addEventListener('click', () => {
      playSound('click');
      tabPeri.classList.add('active');
      tabArea.classList.remove('active');
      currentMode = 'perimeter';
      renderLab();
    });

    tabArea.addEventListener('click', () => {
      playSound('click');
      tabArea.classList.add('active');
      tabPeri.classList.remove('active');
      currentMode = 'area';
      renderLab();
    });
  }
}

function renderLab() {
  const preset = presetsData[currentPreset];
  renderSliders(preset);
  updateAndDraw();
}

function renderSliders(preset) {
  const container = document.getElementById('sliders-container');
  if (!container) return;

  container.innerHTML = preset.sliders.map(s => `
    <div class="control-group">
      <div class="control-label">
        <span>${s.label}</span>
        <span id="val-${s.id}" style="color: var(--primary-color); font-size: 1.1rem;">${s.value}</span>
      </div>
      <input type="range" class="slider-input" id="${s.id}" min="${s.min}" max="${s.max}" value="${s.value}" step="${s.step || 1}">
    </div>
  `).join('');

  preset.sliders.forEach(s => {
    const input = document.getElementById(s.id);
    if (input) {
      input.addEventListener('input', (e) => {
        s.value = parseFloat(e.target.value);
        document.getElementById(`val-${s.id}`).textContent = s.value;
        updateAndDraw();
      });
    }
  });
}

function updateAndDraw() {
  const svg = document.getElementById('lab-svg');
  const breakdown = document.getElementById('calculation-breakdown');
  const legend = document.getElementById('lab-canvas-legend');
  if (!svg || !breakdown) return;

  if (currentPreset === 'house') {
    drawHouse(svg, breakdown, legend);
  } else if (currentPreset === 'lshape') {
    drawLShape(svg, breakdown, legend);
  } else if (currentPreset === 'rocket') {
    drawRocket(svg, breakdown, legend);
  } else if (currentPreset === 'arrow') {
    drawArrow(svg, breakdown, legend);
  } else if (currentPreset === 'gem') {
    drawGem(svg, breakdown, legend);
  }
}

/* Drawing and calculation functions for presets */

// 1. House (Rectangle + Isosceles Triangle)
function drawHouse(svg, breakdown, legend) {
  const rectW = presetsData.house.sliders[0].value;
  const rectH = presetsData.house.sliders[1].value;
  const triH = presetsData.house.sliders[2].value;

  // Slanted side of isosceles roof = sqrt((rectW/2)^2 + triH^2)
  const roofSide = Math.hypot(rectW / 2, triH).toFixed(1);
  const roofSideNum = parseFloat(roofSide);

  const scale = 14;
  const cx = 250;
  const cy = 250;

  const wPx = rectW * scale;
  const hPx = rectH * scale;
  const triHPx = triH * scale;

  const xLeft = cx - wPx / 2;
  const xRight = cx + wPx / 2;
  const yBottom = cy + hPx / 2;
  const yMiddle = cy - hPx / 2;
  const yPeak = yMiddle - triHPx;

  let svgContent = '';
  let legendText = '';
  let calcHTML = '';

  if (currentMode === 'perimeter') {
    legendText = "🔍 Glowing Yellow Lines = Outer Perimeter Boundary (Inner edge excluded!)";

    // Outer border path
    const outerPath = `M ${xLeft} ${yBottom} L ${xRight} ${yBottom} L ${xRight} ${yMiddle} L ${cx} ${yPeak} L ${xLeft} ${yMiddle} Z`;

    svgContent = `
      <!-- Inner dashed edge -->
      <line x1="${xLeft}" y1="${yMiddle}" x2="${xRight}" y2="${yMiddle}" stroke="#94a3b8" stroke-width="3" stroke-dasharray="6,6"/>
      <text x="${cx}" y="${yMiddle + 20}" text-anchor="middle" fill="#94a3b8" font-weight="bold" font-size="14">(Inner edge = ${rectW} m - NOT counted)</text>

      <!-- Outer boundary fill & glow -->
      <path d="${outerPath}" fill="#e0f2fe" stroke="#f59e0b" stroke-width="6" stroke-linejoin="round"/>

      <!-- Side labels -->
      <text x="${cx}" y="${yBottom + 25}" text-anchor="middle" font-weight="bold" fill="#0369a1" font-size="16">Bottom: ${rectW} m</text>
      <text x="${xRight + 20}" y="${(yBottom + yMiddle)/2}" text-anchor="start" font-weight="bold" fill="#0369a1" font-size="16">Right: ${rectH} m</text>
      <text x="${xLeft - 20}" y="${(yBottom + yMiddle)/2}" text-anchor="end" font-weight="bold" fill="#0369a1" font-size="16">Left: ${rectH} m</text>
      <text x="${(cx + xRight)/2 + 15}" y="${(yPeak + yMiddle)/2}" text-anchor="start" font-weight="bold" fill="#d97706" font-size="16">Roof Right: ${roofSideNum} m</text>
      <text x="${(cx + xLeft)/2 - 15}" y="${(yPeak + yMiddle)/2}" text-anchor="end" font-weight="bold" fill="#d97706" font-size="16">Roof Left: ${roofSideNum} m</text>
    `;

    const totalPeri = (rectW + rectH + rectH + roofSideNum + roofSideNum).toFixed(1);
    calcHTML = `
      <div class="step-box" style="border-left-color: #f59e0b;">
        <h3 style="color: #d97706;">📏 Perimeter Calculation (6.3.1)</h3>
        <p style="margin-top: 0.5rem;">Add up all 5 <strong>OUTER</strong> sides:</p>
        <p class="formula-highlight" style="margin: 0.5rem 0; font-size: 1.1rem;">
          Perimeter = Bottom + Left + Right + Roof Left + Roof Right
        </p>
        <p style="font-size: 1.1rem; font-weight: bold;">
          = ${rectW} + ${rectH} + ${rectH} + ${roofSideNum} + ${roofSideNum} = <span style="color: #d97706; font-size: 1.3rem;">${totalPeri} m</span>
        </p>
        <p style="font-size: 0.9rem; color: #64748b; margin-top: 0.5rem;">
          💡 <strong>Tip for Year 5:</strong> Do not add the inner dashed line (${rectW} m) because it is inside the shape!
        </p>
      </div>
    `;
  } else {
    // Area Mode
    legendText = "🎨 Blue = Shape A (Rectangle), Orange = Shape B (Isosceles Triangle)";

    svgContent = `
      <!-- Shape A (Rectangle) -->
      <rect x="${xLeft}" y="${yMiddle}" width="${wPx}" height="${hPx}" fill="#60a5fa" fill-opacity="0.5" stroke="#2563eb" stroke-width="3"/>
      <text x="${cx}" y="${yMiddle + hPx/2}" text-anchor="middle" font-weight="bold" fill="#1e3a8a" font-size="18">Shape A (Rectangle)</text>

      <!-- Shape B (Triangle) -->
      <polygon points="${xLeft},${yMiddle} ${xRight},${yMiddle} ${cx},${yPeak}" fill="#fbbf24" fill-opacity="0.6" stroke="#d97706" stroke-width="3"/>
      <text x="${cx}" y="${yMiddle - triHPx/3}" text-anchor="middle" font-weight="bold" fill="#78350f" font-size="18">Shape B (Triangle)</text>

      <!-- Height indicator line for triangle -->
      <line x1="${cx}" y1="${yMiddle}" x2="${cx}" y2="${yPeak}" stroke="#78350f" stroke-width="2" stroke-dasharray="4,4"/>
      <text x="${cx + 8}" y="${(yMiddle + yPeak)/2}" font-weight="bold" fill="#78350f" font-size="14">Height = ${triH} m</text>
    `;

    const areaA = rectW * rectH;
    const areaB = 0.5 * rectW * triH;
    const totalArea = areaA + areaB;

    calcHTML = `
      <div class="step-box" style="border-left-color: #2563eb;">
        <h4 style="color: #1e40af;">Step 1: Area of Shape A (Rectangle)</h4>
        <p class="formula-highlight">Area A = Length × Width</p>
        <p>= ${rectW} m × ${rectH} m = <strong>${areaA} m²</strong></p>
      </div>

      <div class="step-box" style="border-left-color: #d97706;">
        <h4 style="color: #92400e;">Step 2: Area of Shape B (Isosceles Triangle)</h4>
        <p class="formula-highlight">Area B = ½ × Base × Height</p>
        <p>= ½ × ${rectW} m × ${triH} m = <strong>${areaB} m²</strong></p>
      </div>

      <div class="step-box" style="border-left-color: #10b981; background: #ecfdf5;">
        <h3 style="color: #047857;">Step 3: Total Composite Area (6.3.2)</h3>
        <p class="formula-highlight">Total Area = Area A + Area B</p>
        <p style="font-size: 1.2rem; font-weight: bold; color: #047857;">
          = ${areaA} + ${areaB} = <span style="font-size: 1.4rem;">${totalArea} m²</span>
        </p>
      </div>
    `;
  }

  svg.innerHTML = svgContent;
  breakdown.innerHTML = calcHTML;
  legend.textContent = legendText;
}

// 2. L-Shape (Rectangle + Square)
function drawLShape(svg, breakdown, legend) {
  const rectW = presetsData.lshape.sliders[0].value;
  const rectH = presetsData.lshape.sliders[1].value;
  const sqS = presetsData.lshape.sliders[2].value;

  const scale = 14;
  const startX = 120;
  const startY = 100;

  const wPx = rectW * scale;
  const hPx = rectH * scale;
  const sqPx = sqS * scale;

  let svgContent = '';
  let legendText = '';
  let calcHTML = '';

  if (currentMode === 'perimeter') {
    legendText = "🔍 Outer boundary outline glows in amber! Note side lengths.";

    // Polygon points for L shape: (x,y) -> right -> down -> right sqS -> down sqS -> left -> up
    const outerPath = `M ${startX} ${startY} L ${startX + wPx} ${startY} L ${startX + wPx} ${startY + hPx} L ${startX + wPx + sqPx} ${startY + hPx} L ${startX + wPx + sqPx} ${startY + hPx + sqPx} L ${startX} ${startY + hPx + sqPx} Z`;

    svgContent = `
      <!-- Dashed inner boundary -->
      <line x1="${startX + wPx}" y1="${startY + hPx}" x2="${startX + wPx}" y2="${startY + hPx + sqPx}" stroke="#94a3b8" stroke-width="3" stroke-dasharray="6,6"/>

      <!-- Outer Path -->
      <path d="${outerPath}" fill="#e0f2fe" stroke="#f59e0b" stroke-width="6" stroke-linejoin="round"/>

      <!-- Labels -->
      <text x="${startX + wPx/2}" y="${startY - 10}" text-anchor="middle" font-weight="bold" fill="#0369a1" font-size="15">Top: ${rectW} cm</text>
      <text x="${startX - 15}" y="${startY + (hPx+sqPx)/2}" text-anchor="end" font-weight="bold" fill="#0369a1" font-size="15">Left Total: ${rectH + sqS} cm</text>
      <text x="${startX + (wPx+sqPx)/2}" y="${startY + hPx + sqPx + 22}" text-anchor="middle" font-weight="bold" fill="#0369a1" font-size="15">Bottom Total: ${rectW + sqS} cm</text>
      <text x="${startX + wPx + sqPx + 15}" y="${startY + hPx + sqPx/2}" text-anchor="start" font-weight="bold" fill="#d97706" font-size="15">Right Sq: ${sqS} cm</text>
      <text x="${startX + wPx + sqPx/2}" y="${startY + hPx - 10}" text-anchor="middle" font-weight="bold" fill="#d97706" font-size="15">Step Top: ${sqS} cm</text>
      <text x="${startX + wPx + 15}" y="${startY + hPx/2}" text-anchor="start" font-weight="bold" fill="#0369a1" font-size="15">Inner Right: ${rectH} cm</text>
    `;

    const outerSides = [rectW, rectH, sqS, sqS, rectW + sqS, rectH + sqS];
    const totalPeri = outerSides.reduce((a, b) => a + b, 0);

    calcHTML = `
      <div class="step-box" style="border-left-color: #f59e0b;">
        <h3 style="color: #d97706;">📏 Perimeter Calculation (6.3.1)</h3>
        <p style="margin-top: 0.5rem;">Sum of all 6 outer sides of the L-shape:</p>
        <p class="formula-highlight" style="margin: 0.5rem 0; font-size: 1.05rem;">
          Perimeter = Top (${rectW}) + Right1 (${rectH}) + Step (${sqS}) + Right2 (${sqS}) + Bottom (${rectW + sqS}) + Left (${rectH + sqS})
        </p>
        <p style="font-size: 1.2rem; font-weight: bold; color: #d97706;">
          = ${rectW} + ${rectH} + ${sqS} + ${sqS} + ${rectW + sqS} + ${rectH + sqS} = <span>${totalPeri} cm</span>
        </p>
      </div>
    `;
  } else {
    legendText = "🎨 Shape A = Rectangle (${rectW}×${rectH}), Shape B = Square (${sqS}×${sqS})";

    svgContent = `
      <!-- Shape A (Rectangle) -->
      <rect x="${startX}" y="${startY}" width="${wPx}" height="${hPx}" fill="#60a5fa" fill-opacity="0.5" stroke="#2563eb" stroke-width="3"/>
      <text x="${startX + wPx/2}" y="${startY + hPx/2}" text-anchor="middle" font-weight="bold" fill="#1e3a8a" font-size="16">Shape A (Rectangle)</text>

      <!-- Extension to make lower L block -->
      <rect x="${startX}" y="${startY + hPx}" width="${wPx}" height="${sqPx}" fill="#60a5fa" fill-opacity="0.5" stroke="#2563eb" stroke-dasharray="4,4"/>

      <!-- Shape B (Square) -->
      <rect x="${startX + wPx}" y="${startY + hPx}" width="${sqPx}" height="${sqPx}" fill="#a7f3d0" fill-opacity="0.7" stroke="#059669" stroke-width="3"/>
      <text x="${startX + wPx + sqPx/2}" y="${startY + hPx + sqPx/2}" text-anchor="middle" font-weight="bold" fill="#065f46" font-size="16">Shape B (Square)</text>
    `;

    const areaA = rectW * rectH;
    const areaB = sqS * sqS;
    const totalArea = areaA + areaB;

    calcHTML = `
      <div class="step-box" style="border-left-color: #2563eb;">
        <h4 style="color: #1e40af;">Step 1: Area of Shape A (Rectangle)</h4>
        <p class="formula-highlight">Area A = Length × Width</p>
        <p>= ${rectW} cm × ${rectH} cm = <strong>${areaA} cm²</strong></p>
      </div>

      <div class="step-box" style="border-left-color: #059669;">
        <h4 style="color: #065f46;">Step 2: Area of Shape B (Square)</h4>
        <p class="formula-highlight">Area B = Side × Side</p>
        <p>= ${sqS} cm × ${sqS} cm = <strong>${areaB} cm²</strong></p>
      </div>

      <div class="step-box" style="border-left-color: #10b981; background: #ecfdf5;">
        <h3 style="color: #047857;">Step 3: Total Composite Area (6.3.2)</h3>
        <p class="formula-highlight">Total Area = Area A + Area B</p>
        <p style="font-size: 1.2rem; font-weight: bold; color: #047857;">
          = ${areaA} + ${areaB} = <span style="font-size: 1.4rem;">${totalArea} cm²</span>
        </p>
      </div>
    `;
  }

  svg.innerHTML = svgContent;
  breakdown.innerHTML = calcHTML;
  legend.textContent = legendText;
}

// 3. Rocket (Rectangle + Equilateral Triangle)
function drawRocket(svg, breakdown, legend) {
  const rectW = presetsData.rocket.sliders[0].value;
  const rectH = presetsData.rocket.sliders[1].value;
  const triH = parseFloat(((Math.sqrt(3) / 2) * rectW).toFixed(1));

  const scale = 14;
  const cx = 250;
  const cy = 230;

  const wPx = rectW * scale;
  const hPx = rectH * scale;
  const triHPx = triH * scale;

  const xLeft = cx - wPx / 2;
  const xRight = cx + wPx / 2;
  const yBottom = cy + hPx / 2;
  const yMiddle = cy - hPx / 2;
  const yPeak = yMiddle - triHPx;

  let svgContent = '';
  let legendText = '';
  let calcHTML = '';

  if (currentMode === 'perimeter') {
    legendText = "🔍 Glowing Yellow Border = Perimeter. All 3 triangle sides are equal (${rectW} m).";

    const outerPath = `M ${xLeft} ${yBottom} L ${xRight} ${yBottom} L ${xRight} ${yMiddle} L ${cx} ${yPeak} L ${xLeft} ${yMiddle} Z`;

    svgContent = `
      <line x1="${xLeft}" y1="${yMiddle}" x2="${xRight}" y2="${yMiddle}" stroke="#94a3b8" stroke-width="3" stroke-dasharray="6,6"/>
      <path d="${outerPath}" fill="#e0f2fe" stroke="#f59e0b" stroke-width="6" stroke-linejoin="round"/>

      <text x="${cx}" y="${yBottom + 22}" text-anchor="middle" font-weight="bold" fill="#0369a1" font-size="15">Bottom: ${rectW} m</text>
      <text x="${xRight + 20}" y="${cy}" text-anchor="start" font-weight="bold" fill="#0369a1" font-size="15">Right: ${rectH} m</text>
      <text x="${xLeft - 20}" y="${cy}" text-anchor="end" font-weight="bold" fill="#0369a1" font-size="15">Left: ${rectH} m</text>
      <text x="${(cx+xRight)/2 + 15}" y="${(yPeak+yMiddle)/2}" text-anchor="start" font-weight="bold" fill="#d97706" font-size="15">Eq. Side: ${rectW} m</text>
      <text x="${(cx+xLeft)/2 - 15}" y="${(yPeak+yMiddle)/2}" text-anchor="end" font-weight="bold" fill="#d97706" font-size="15">Eq. Side: ${rectW} m</text>
    `;

    const totalPeri = rectW + rectH + rectH + rectW + rectW;
    calcHTML = `
      <div class="step-box" style="border-left-color: #f59e0b;">
        <h3 style="color: #d97706;">📏 Perimeter Calculation (6.3.1)</h3>
        <p style="margin-top: 0.5rem;">Equilateral triangle has all equal sides (${rectW} m):</p>
        <p class="formula-highlight" style="margin: 0.5rem 0;">
          Perimeter = Bottom + Left + Right + Eq. Side 1 + Eq. Side 2
        </p>
        <p style="font-size: 1.2rem; font-weight: bold; color: #d97706;">
          = ${rectW} + ${rectH} + ${rectH} + ${rectW} + ${rectW} = <span>${totalPeri} m</span>
        </p>
      </div>
    `;
  } else {
    legendText = "🎨 Shape A = Rectangle (${rectW}×${rectH}), Shape B = Equilateral Triangle (Base ${rectW}, Height ${triH})";

    svgContent = `
      <rect x="${xLeft}" y="${yMiddle}" width="${wPx}" height="${hPx}" fill="#60a5fa" fill-opacity="0.5" stroke="#2563eb" stroke-width="3"/>
      <text x="${cx}" y="${cy}" text-anchor="middle" font-weight="bold" fill="#1e3a8a" font-size="16">Shape A (Body)</text>

      <polygon points="${xLeft},${yMiddle} ${xRight},${yMiddle} ${cx},${yPeak}" fill="#f43f5e" fill-opacity="0.6" stroke="#e11d48" stroke-width="3"/>
      <text x="${cx}" y="${yMiddle - triHPx/3}" text-anchor="middle" font-weight="bold" fill="#881337" font-size="16">Shape B (Nose Cone)</text>

      <line x1="${cx}" y1="${yMiddle}" x2="${cx}" y2="${yPeak}" stroke="#881337" stroke-width="2" stroke-dasharray="4,4"/>
      <text x="${cx + 8}" y="${yMiddle - triHPx/2}" font-weight="bold" fill="#881337" font-size="14">Height = ${triH} m</text>
    `;

    const areaA = rectW * rectH;
    const areaB = parseFloat((0.5 * rectW * triH).toFixed(1));
    const totalArea = (areaA + areaB).toFixed(1);

    calcHTML = `
      <div class="step-box" style="border-left-color: #2563eb;">
        <h4 style="color: #1e40af;">Step 1: Area of Shape A (Rectangle)</h4>
        <p class="formula-highlight">Area A = Length × Width = ${rectW} × ${rectH} = <strong>${areaA} m²</strong></p>
      </div>

      <div class="step-box" style="border-left-color: #f43f5e;">
        <h4 style="color: #9f1239;">Step 2: Area of Shape B (Equilateral Triangle)</h4>
        <p class="formula-highlight">Area B = ½ × Base × Height = ½ × ${rectW} × ${triH} = <strong>${areaB} m²</strong></p>
      </div>

      <div class="step-box" style="border-left-color: #10b981; background: #ecfdf5;">
        <h3 style="color: #047857;">Step 3: Total Composite Area (6.3.2)</h3>
        <p style="font-size: 1.2rem; font-weight: bold; color: #047857;">
          Total Area = ${areaA} + ${areaB} = <span style="font-size: 1.4rem;">${totalArea} m²</span>
        </p>
      </div>
    `;
  }

  svg.innerHTML = svgContent;
  breakdown.innerHTML = calcHTML;
  legend.textContent = legendText;
}

// 4. Arrow (Rectangle + Right-Angled Triangle)
function drawArrow(svg, breakdown, legend) {
  const rectW = presetsData.arrow.sliders[0].value;
  const rectH = presetsData.arrow.sliders[1].value;
  const triB = presetsData.arrow.sliders[2].value;

  const hypotenuse = parseFloat(Math.hypot(triB, rectH).toFixed(1));

  const scale = 14;
  const startX = 100;
  const startY = 150;

  const wPx = rectW * scale;
  const hPx = rectH * scale;
  const triBPx = triB * scale;

  let svgContent = '';
  let legendText = '';
  let calcHTML = '';

  if (currentMode === 'perimeter') {
    legendText = "🔍 Outer boundary outline glows in amber! Hypotenuse side = ${hypotenuse} cm.";

    const outerPath = `M ${startX} ${startY} L ${startX + wPx} ${startY} L ${startX + wPx + triBPx} ${startY + hPx} L ${startX} ${startY + hPx} Z`;

    svgContent = `
      <line x1="${startX + wPx}" y1="${startY}" x2="${startX + wPx}" y2="${startY + hPx}" stroke="#94a3b8" stroke-width="3" stroke-dasharray="6,6"/>
      <path d="${outerPath}" fill="#e0f2fe" stroke="#f59e0b" stroke-width="6" stroke-linejoin="round"/>

      <text x="${startX + wPx/2}" y="${startY - 10}" text-anchor="middle" font-weight="bold" fill="#0369a1" font-size="15">Shaft Top: ${rectW} cm</text>
      <text x="${startX - 15}" y="${startY + hPx/2}" text-anchor="end" font-weight="bold" fill="#0369a1" font-size="15">Shaft Left: ${rectH} cm</text>
      <text x="${startX + (wPx+triBPx)/2}" y="${startY + hPx + 22}" text-anchor="middle" font-weight="bold" fill="#0369a1" font-size="15">Bottom Total: ${rectW + triB} cm</text>
      <text x="${startX + wPx + triBPx/2 + 10}" y="${startY + hPx/2}" font-weight="bold" fill="#d97706" font-size="15">Slanted Hypotenuse: ${hypotenuse} cm</text>
    `;

    const totalPeri = (rectW + rectH + rectW + triB + hypotenuse).toFixed(1);
    calcHTML = `
      <div class="step-box" style="border-left-color: #f59e0b;">
        <h3 style="color: #d97706;">📏 Perimeter Calculation (6.3.1)</h3>
        <p style="margin-top: 0.5rem;">Sum of all 4 outer sides:</p>
        <p class="formula-highlight" style="margin: 0.5rem 0;">
          Perimeter = Top (${rectW}) + Left (${rectH}) + Bottom (${rectW + triB}) + Slanted (${hypotenuse})
        </p>
        <p style="font-size: 1.2rem; font-weight: bold; color: #d97706;">
          = ${rectW} + ${rectH} + ${rectW + triB} + ${hypotenuse} = <span>${totalPeri} cm</span>
        </p>
      </div>
    `;
  } else {
    legendText = "🎨 Shape A = Rectangle (${rectW}×${rectH}), Shape B = Right-Angled Triangle (Base ${triB}, Height ${rectH})";

    svgContent = `
      <rect x="${startX}" y="${startY}" width="${wPx}" height="${hPx}" fill="#60a5fa" fill-opacity="0.5" stroke="#2563eb" stroke-width="3"/>
      <text x="${startX + wPx/2}" y="${startY + hPx/2}" text-anchor="middle" font-weight="bold" fill="#1e3a8a" font-size="16">Shape A (Shaft)</text>

      <polygon points="${startX + wPx},${startY} ${startX + wPx},${startY + hPx} ${startX + wPx + triBPx},${startY + hPx}" fill="#a7f3d0" fill-opacity="0.7" stroke="#059669" stroke-width="3"/>
      <text x="${startX + wPx + triBPx/3}" y="${startY + hPx*0.7}" text-anchor="middle" font-weight="bold" fill="#065f46" font-size="15">Shape B (Right Triangle)</text>

      <!-- Right angle marker -->
      <path d="M ${startX + wPx} ${startY + hPx - 15} L ${startX + wPx + 15} ${startY + hPx - 15} L ${startX + wPx + 15} ${startY + hPx}" fill="none" stroke="#059669" stroke-width="2"/>
    `;

    const areaA = rectW * rectH;
    const areaB = 0.5 * triB * rectH;
    const totalArea = areaA + areaB;

    calcHTML = `
      <div class="step-box" style="border-left-color: #2563eb;">
        <h4 style="color: #1e40af;">Step 1: Area of Shape A (Rectangle)</h4>
        <p class="formula-highlight">Area A = Length × Width = ${rectW} × ${rectH} = <strong>${areaA} cm²</strong></p>
      </div>

      <div class="step-box" style="border-left-color: #059669;">
        <h4 style="color: #065f46;">Step 2: Area of Shape B (Right-Angled Triangle)</h4>
        <p class="formula-highlight">Area B = ½ × Base × Height = ½ × ${triB} × ${rectH} = <strong>${areaB} cm²</strong></p>
      </div>

      <div class="step-box" style="border-left-color: #10b981; background: #ecfdf5;">
        <h3 style="color: #047857;">Step 3: Total Composite Area (6.3.2)</h3>
        <p style="font-size: 1.2rem; font-weight: bold; color: #047857;">
          Total Area = ${areaA} + ${areaB} = <span style="font-size: 1.4rem;">${totalArea} cm²</span>
        </p>
      </div>
    `;
  }

  svg.innerHTML = svgContent;
  breakdown.innerHTML = calcHTML;
  legend.textContent = legendText;
}

// 5. Gem (Two Isosceles Triangles joined at base)
function drawGem(svg, breakdown, legend) {
  const baseW = presetsData.gem.sliders[0].value;
  const topH = presetsData.gem.sliders[1].value;
  const botH = presetsData.gem.sliders[2].value;

  const topSide = parseFloat(Math.hypot(baseW / 2, topH).toFixed(1));
  const botSide = parseFloat(Math.hypot(baseW / 2, botH).toFixed(1));

  const scale = 14;
  const cx = 250;
  const cy = 180;

  const basePx = baseW * scale;
  const topHPx = topH * scale;
  const botHPx = botH * scale;

  const xLeft = cx - basePx / 2;
  const xRight = cx + basePx / 2;
  const yMiddle = cy;
  const yTopPeak = cy - topHPx;
  const yBotPeak = cy + botHPx;

  let svgContent = '';
  let legendText = '';
  let calcHTML = '';

  if (currentMode === 'perimeter') {
    legendText = "🔍 Outer boundary outline glows in amber! Shared middle base (${baseW} m) is excluded.";

    const outerPath = `M ${xLeft} ${yMiddle} L ${cx} ${yTopPeak} L ${xRight} ${yMiddle} L ${cx} ${yBotPeak} Z`;

    svgContent = `
      <line x1="${xLeft}" y1="${yMiddle}" x2="${xRight}" y2="${yMiddle}" stroke="#94a3b8" stroke-width="3" stroke-dasharray="6,6"/>
      <path d="${outerPath}" fill="#e0f2fe" stroke="#f59e0b" stroke-width="6" stroke-linejoin="round"/>

      <text x="${(cx+xLeft)/2 - 15}" y="${(yTopPeak+yMiddle)/2}" text-anchor="end" font-weight="bold" fill="#d97706" font-size="15">Top Left: ${topSide} m</text>
      <text x="${(cx+xRight)/2 + 15}" y="${(yTopPeak+yMiddle)/2}" text-anchor="start" font-weight="bold" fill="#d97706" font-size="15">Top Right: ${topSide} m</text>
      <text x="${(cx+xLeft)/2 - 15}" y="${(yBotPeak+yMiddle)/2}" text-anchor="end" font-weight="bold" fill="#d97706" font-size="15">Bot Left: ${botSide} m</text>
      <text x="${(cx+xRight)/2 + 15}" y="${(yBotPeak+yMiddle)/2}" text-anchor="start" font-weight="bold" fill="#d97706" font-size="15">Bot Right: ${botSide} m</text>
    `;

    const totalPeri = (topSide * 2 + botSide * 2).toFixed(1);
    calcHTML = `
      <div class="step-box" style="border-left-color: #f59e0b;">
        <h3 style="color: #d97706;">📏 Perimeter Calculation (6.3.1)</h3>
        <p style="margin-top: 0.5rem;">Sum of all 4 slanted outer sides:</p>
        <p class="formula-highlight" style="margin: 0.5rem 0;">
          Perimeter = 2 × Top Side (${topSide}) + 2 × Bottom Side (${botSide})
        </p>
        <p style="font-size: 1.2rem; font-weight: bold; color: #d97706;">
          = ${topSide} + ${topSide} + ${botSide} + ${botSide} = <span>${totalPeri} m</span>
        </p>
      </div>
    `;
  } else {
    legendText = "🎨 Shape A = Top Triangle (Base ${baseW}, Height ${topH}), Shape B = Bottom Triangle (Base ${baseW}, Height ${botH})";

    svgContent = `
      <polygon points="${xLeft},${yMiddle} ${xRight},${yMiddle} ${cx},${yTopPeak}" fill="#c084fc" fill-opacity="0.6" stroke="#9333ea" stroke-width="3"/>
      <text x="${cx}" y="${yMiddle - topHPx/3}" text-anchor="middle" font-weight="bold" fill="#581c87" font-size="16">Shape A (Top Crystal)</text>

      <polygon points="${xLeft},${yMiddle} ${xRight},${yMiddle} ${cx},${yBotPeak}" fill="#f472b6" fill-opacity="0.6" stroke="#db2777" stroke-width="3"/>
      <text x="${cx}" y="${yMiddle + botHPx/3}" text-anchor="middle" font-weight="bold" fill="#831843" font-size="16">Shape B (Bottom Crystal)</text>

      <line x1="${cx}" y1="${yTopPeak}" x2="${cx}" y2="${yBotPeak}" stroke="#334155" stroke-width="2" stroke-dasharray="4,4"/>
    `;

    const areaA = 0.5 * baseW * topH;
    const areaB = 0.5 * baseW * botH;
    const totalArea = areaA + areaB;

    calcHTML = `
      <div class="step-box" style="border-left-color: #9333ea;">
        <h4 style="color: #6b21a8;">Step 1: Area of Shape A (Top Isosceles Triangle)</h4>
        <p class="formula-highlight">Area A = ½ × Base × Height = ½ × ${baseW} × ${topH} = <strong>${areaA} m²</strong></p>
      </div>

      <div class="step-box" style="border-left-color: #db2777;">
        <h4 style="color: #9d174d;">Step 2: Area of Shape B (Bottom Isosceles Triangle)</h4>
        <p class="formula-highlight">Area B = ½ × Base × Height = ½ × ${baseW} × ${botH} = <strong>${areaB} m²</strong></p>
      </div>

      <div class="step-box" style="border-left-color: #10b981; background: #ecfdf5;">
        <h3 style="color: #047857;">Step 3: Total Composite Area (6.3.2)</h3>
        <p style="font-size: 1.2rem; font-weight: bold; color: #047857;">
          Total Area = ${areaA} + ${areaB} = <span style="font-size: 1.4rem;">${totalArea} m²</span>
        </p>
      </div>
    `;
  }

  svg.innerHTML = svgContent;
  breakdown.innerHTML = calcHTML;
  legend.textContent = legendText;
}
