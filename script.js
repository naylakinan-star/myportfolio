

  /* ==========================================
   1. ACTIVE NAV LINK
   ========================================== */
function updateActiveNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}
 
/* ==========================================
   2. SCROLL-TO-TOP BUTTON
   ========================================== */
function toggleScrollBtn() {
  if (scrollBtn) scrollBtn.classList.toggle('visible', window.scrollY > 400);
}
 
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
 
/* ==========================================
   3. SMOOTH SCROLL
   ========================================== */
function smoothScroll(href) {
  const target = document.querySelector(href);
  if (target) target.scrollIntoView({ behavior: 'smooth' });
}
 
/* ==========================================
   4. PROGRESS BARS
   ========================================== */
function initProgressBars() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width + '%';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
 
  document.querySelectorAll('.progress-fill').forEach(el => obs.observe(el));
}
 
/* ==========================================
   5. REVEAL ON SCROLL
   ========================================== */
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
 
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}
 
/* ==========================================
   6. HAMBURGER MENU
   ========================================== */
function openMobileNav() {
  mobileNav.classList.add('open');
}
 
function closeMobileNav() {
  mobileNav.classList.remove('open');
}
 
function initHamburger() {
  if (!hamburger) return;
  hamburger.addEventListener('click', openMobileNav);
  closeNav.addEventListener('click', closeMobileNav);
 
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      closeMobileNav();
      smoothScroll(link.getAttribute('href'));
    });
  });
}
 
/* ==========================================
   7. CONTACT FORM
   ========================================== */
function sendMessage() {
  const name    = document.getElementById('inputName').value.trim();
  const country = document.getElementById('inputCountry').value.trim();
  const msg     = document.getElementById('inputMessage').value.trim();
 
  if (!name || !country || !msg) {
    feedback.style.color = '#ff9e9e';
    feedback.textContent = '⚠️ Harap isi semua kolom sebelum mengirim.';
    return;
  }
 
  btnSend.disabled = true;
  btnSend.textContent = 'Sending…';
  feedback.style.color = 'var(--gold-light)';
  feedback.textContent = '';
 
  setTimeout(() => {
    feedback.textContent = `✅ Terima kasih, ${name}! Pesan kamu sudah terkirim.`;
    btnSend.textContent  = 'Send Message';
    btnSend.disabled     = false;
    document.getElementById('inputName').value    = '';
    document.getElementById('inputCountry').value = '';
    document.getElementById('inputMessage').value = '';
  }, 1000);
}
 
function initContactForm() {
  if (btnSend) btnSend.addEventListener('click', sendMessage);
}
 
/* ==========================================
   8. NAV LINK SMOOTH SCROLL
   ========================================== */
function initNavLinks() {
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      smoothScroll(link.getAttribute('href'));
    });
  });
}
 
/* ==========================================
   SCROLL EVENT
   ========================================== */
function onScroll() {
  updateActiveNav();
  toggleScrollBtn();
}
 
/* ==========================================
   INIT — run everything
   ========================================== */
function init() {
  initProgressBars();
  initReveal();
  initHamburger();
  initContactForm();
  initNavLinks();
 
  if (scrollBtn) scrollBtn.addEventListener('click', scrollToTop);
  window.addEventListener('scroll', onScroll, { passive: true });
 
  // Run once on load
  updateActiveNav();
  toggleScrollBtn();
}
 
document.addEventListener('DOMContentLoaded', init);