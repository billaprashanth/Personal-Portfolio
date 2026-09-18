// ===========================================================
// Footer year
// ===========================================================
document.getElementById('year').textContent = new Date().getFullYear();

// ===========================================================
// Mobile nav toggle
// ===========================================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===========================================================
// Project filter
// ===========================================================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => {
      b.classList.remove('is-active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('is-active');
    btn.setAttribute('aria-selected', 'true');

    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.cat === filter;
      card.hidden = !match;
    });
  });
});

// ===========================================================
// Hero canvas: an animated "loss curve" line plot.
// Purely decorative, ties directly to the ML subject matter.
// ===========================================================
(function initSignalCanvas(){
  const canvas = document.getElementById('signalCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width, height, dpr;
  let points = [];
  const POINT_COUNT = 48;

  function resize(){
    dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // Generate a noisy, decaying curve reminiscent of a training loss plot.
  function buildSeries(){
    points = [];
    let value = 0.85;
    for (let i = 0; i < POINT_COUNT; i++){
      const progress = i / (POINT_COUNT - 1);
      const decay = Math.pow(1 - progress, 1.6);
      const noise = (Math.random() - 0.5) * 0.05 * decay;
      value = 0.06 + decay * 0.8 + noise;
      points.push(Math.max(0.03, Math.min(0.95, value)));
    }
  }

  function drawGrid(){
    ctx.strokeStyle = 'rgba(232, 234, 237, 0.06)';
    ctx.lineWidth = 1;
    const rows = 4;
    for (let r = 0; r <= rows; r++){
      const y = (height / rows) * r;
      ctx.beginPath();
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(width, y + 0.5);
      ctx.stroke();
    }
  }

  function drawSeries(revealCount){
    const step = width / (POINT_COUNT - 1);

    ctx.beginPath();
    points.slice(0, revealCount).forEach((v, i) => {
      const x = i * step;
      const y = height - v * (height - 20) - 10;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.strokeStyle = '#F0B429';
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.stroke();

    // Fill under curve
    if (revealCount > 1){
      const lastX = (revealCount - 1) * step;
      ctx.lineTo(lastX, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'rgba(240, 180, 41, 0.16)');
      gradient.addColorStop(1, 'rgba(240, 180, 41, 0)');
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    // Leading point
    if (revealCount > 0){
      const idx = revealCount - 1;
      const x = idx * step;
      const y = height - points[idx] * (height - 20) - 10;
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#4FD1C5';
      ctx.fill();
    }
  }

  let revealCount = 0;
  let lastTime = 0;
  const stepInterval = 60; // ms between points revealing

  function animate(time){
    if (!lastTime) lastTime = time;
    const elapsed = time - lastTime;

    if (elapsed > stepInterval){
      lastTime = time;
      revealCount++;
      if (revealCount > POINT_COUNT){
        buildSeries();
        revealCount = 0;
      }
    }

    ctx.clearRect(0, 0, width, height);
    drawGrid();
    drawSeries(revealCount);

    requestAnimationFrame(animate);
  }

  function staticFrame(){
    ctx.clearRect(0, 0, width, height);
    drawGrid();
    drawSeries(POINT_COUNT);
  }

  window.addEventListener('resize', () => {
    resize();
    if (prefersReducedMotion) staticFrame();
  });

  resize();
  buildSeries();

  if (prefersReducedMotion){
    staticFrame();
  } else {
    requestAnimationFrame(animate);
  }
})();

// ===========================================================
// Nav background intensifies on scroll
// ===========================================================
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 12){
    nav.style.borderBottomColor = 'rgba(232, 234, 237, 0.18)';
  } else {
    nav.style.borderBottomColor = 'rgba(232, 234, 237, 0.10)';
  }
});
