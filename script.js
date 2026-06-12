// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ===== Mobile hamburger menu =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.textContent = '☰';
    });
  });
}

// ===== Animated stat counters =====
const statValues = document.querySelectorAll('.stat-value[data-target]');
const animateCount = (el) => {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1500;
  const start = performance.now();
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
statValues.forEach(el => statObserver.observe(el));

// ===== Mock tracking system =====
const trackBtn = document.getElementById('trackBtn');
const trackingInput = document.getElementById('trackingInput');
const trackingResult = document.getElementById('trackingResult');

const statuses = [
  'Status: Shipment in transit from Guangzhou to Accra-Tema Hub. ETA 12 days.',
  'Status: Cleared customs at Tema Port — awaiting final delivery.',
  'Status: Cargo loaded at Dubai warehouse, en route to Ghana. ETA 8 days.',
  'Status: Shipment delivered to Koforidua Hub — ready for pickup.',
  'Status: In transit from Los Angeles to Accra — ETA 5 days.',
  'Status: Cross-border cargo dispatched from Lagos. ETA 3 days.'
];

const handleTrack = () => {
  if (!trackingInput || !trackingResult) return;
  const id = trackingInput.value.trim();
  trackingResult.classList.remove('hidden');
  if (!id) {
    trackingResult.textContent = '⚠️ Please enter a tracking ID.';
    return;
  }
  const sum = id.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const status = statuses[sum % statuses.length];
  trackingResult.textContent = `📦 ${id.toUpperCase()} — ${status}`;
};

if (trackBtn && trackingInput && trackingResult) {
  trackBtn.addEventListener('click', handleTrack);
  trackingInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleTrack();
  });
}

