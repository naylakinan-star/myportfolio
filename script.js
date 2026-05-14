
document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------
     1. ACTIVE NAV LINK on scroll
  ---------------------------------------- */
  const sections  = document.querySelectorAll('section[id], footer');
  const navLinks  = document.querySelectorAll('.nav-link');

  const setActiveLink = () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };


  /* ----------------------------------------
     2. PROGRESS BAR ANIMATION (IntersectionObserver)
  ---------------------------------------- */
  const fills = document.querySelectorAll('.progress-fill');

  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const target = fill.dataset.width || '0';
        // Small delay for stagger feel
        setTimeout(() => {
          fill.style.width = target + '%';
        }, 150);
        progressObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(f => progressObserver.observe(f));


  /* ----------------------------------------
     3. COUNT-UP ANIMATION for stats
  ---------------------------------------- */
  const statNums = document.querySelectorAll('.stat-num');

  const countUp = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1200;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, 16);
  };

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(n => statObserver.observe(n));


  /* ----------------------------------------
     4. REVEAL CARDS on scroll
  ---------------------------------------- */
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger each card
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 120);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(r => revealObserver.observe(r));


  /* ----------------------------------------
     5. SCROLL-TO-TOP BUTTON
  ---------------------------------------- */
  const scrollBtn = document.getElementById('scrollTop');

  const toggleScrollBtn = () => {
    if (window.scrollY > 400) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  };

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ----------------------------------------
     6. HERO TITLE LETTER SHIMMER on hover
  ---------------------------------------- */
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const text = heroTitle.textContent.trim();
    heroTitle.innerHTML = text.split('').map(ch =>
      ch === ' ' ? ' ' : `<span class="letter">${ch}</span>`
    ).join('');

    const letters = heroTitle.querySelectorAll('.letter');
    letters.forEach((letter, i) => {
      letter.style.display = 'inline-block';
      letter.style.transition = `color 0.3s ${i * 0.04}s, transform 0.3s ${i * 0.04}s`;
    });

    heroTitle.addEventListener('mouseenter', () => {
      letters.forEach(l => {
        l.style.color = '#fff8dc';
        l.style.transform = 'translateY(-6px) scale(1.05)';
      });
    });

    heroTitle.addEventListener('mouseleave', () => {
      letters.forEach(l => {
        l.style.color = '';
        l.style.transform = '';
      });
    });
  }


  /* ----------------------------------------
     7. SMOOTH SCROLL for nav links
  ---------------------------------------- */
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });


  /* ----------------------------------------
     8. SKILL CARD tilt effect
  ---------------------------------------- */
  const skillCards = document.querySelectorAll('.skill-card');

  skillCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top  - rect.height / 2;
      const rotX = -(y / rect.height) * 15;
      const rotY =  (x / rect.width)  * 15;
      card.style.transform = `perspective(400px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.05)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  /* ----------------------------------------
     9. SCROLL event listener (combined)
  ---------------------------------------- */
  window.addEventListener('scroll', () => {
    setActiveLink();
    toggleScrollBtn();
  }, { passive: true });

  // Initial call
  setActiveLink();
  toggleScrollBtn();


  /* ----------------------------------------
     10. CONTACT FORM — simple validation & feedback
  ---------------------------------------- */
  const btnSend   = document.getElementById('btnSend');
  const feedback  = document.getElementById('formFeedback');

  if (btnSend) {
    btnSend.addEventListener('click', () => {
      const name    = document.getElementById('inputName').value.trim();
      const country = document.getElementById('inputCountry').value.trim();
      const msg     = document.getElementById('inputMessage').value.trim();

      if (!name || !country || !msg) {
        feedback.style.color = '#ff9e9e';
        feedback.textContent = '⚠️ Please fill in all fields before sending.';
        return;
      }

      // Simulate sending
      btnSend.disabled = true;
      btnSend.textContent = 'Sending…';
      feedback.style.color = 'var(--gold-light)';
      feedback.textContent = '';

      setTimeout(() => {
        feedback.textContent = '✅ Message sent! Thank you, ' + name + '. I\'ll get back to you soon!';
        btnSend.textContent  = 'Send Message';
        btnSend.disabled     = false;
        document.getElementById('inputName').value    = '';
        document.getElementById('inputCountry').value = '';
        document.getElementById('inputMessage').value = '';
      }, 1200);
    });
  }


  /* ----------------------------------------
     11. PROJECT CARD — staggered reveal
         (reuse existing revealObserver, already covers .reveal)
  ---------------------------------------- */
  // myproject-cards are already .reveal so the existing observer handles them.
  // Add a little extra shimmer on thumb hover
  document.querySelectorAll('.myproject-thumb').forEach(thumb => {
    thumb.addEventListener('mouseenter', () => {
      thumb.querySelector('.thumb-glow').style.opacity = '1.5';
    });
    thumb.addEventListener('mouseleave', () => {
      thumb.querySelector('.thumb-glow').style.opacity = '1';
    });
  });

});

