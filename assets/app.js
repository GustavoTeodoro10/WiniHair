/* ================================================
   WINI HAIR — app.js
   analytics · menu · tabs · accordion · reveal
   ================================================ */

/* ---- GoatCounter CTA Tracking ---- */
document.addEventListener('click', function (e) {
  var el = e.target.closest('[data-gc-event]');
  if (!el) return;
  var name = el.getAttribute('data-gc-event');
  if (window.goatcounter && window.goatcounter.count) {
    window.goatcounter.count({ path: name, title: name, event: true });
  }
});

/* ---- Nav: scroll state ---- */
var nav = document.getElementById('nav');

window.addEventListener('scroll', function () {
  if (window.scrollY > 60) {
    nav.classList.add('nav-scrolled');
  } else {
    nav.classList.remove('nav-scrolled');
  }
}, { passive: true });

/* ---- Mobile Menu ---- */
var menuBtn    = document.getElementById('menu-btn');
var menuClose  = document.getElementById('menu-close');
var mobileMenu = document.getElementById('mobile-menu');

function openMenu() {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
  menuBtn.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
  menuBtn.setAttribute('aria-expanded', 'false');
}

if (menuBtn)   menuBtn.addEventListener('click', openMenu);
if (menuClose) menuClose.addEventListener('click', closeMenu);
if (mobileMenu) {
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
  });
}

/* ---- Service Tabs ---- */
var tabBtns      = document.querySelectorAll('.service-tab');
var serviceCards = document.querySelectorAll('.service-card');

tabBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    var filter = btn.getAttribute('data-filter');

    tabBtns.forEach(function (b) {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    serviceCards.forEach(function (card) {
      var cat = card.getAttribute('data-category');
      if (filter === 'todos' || cat === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ---- FAQ Accordion ---- */
document.querySelectorAll('.faq-trigger').forEach(function (trigger) {
  trigger.addEventListener('click', function () {
    var item   = trigger.closest('.faq-item');
    var answer = item.querySelector('.faq-answer');
    var isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item').forEach(function (i) {
      i.classList.remove('open');
      i.querySelector('.faq-answer').classList.remove('open');
      i.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      item.classList.add('open');
      answer.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ---- Scroll Reveal ---- */
if ('IntersectionObserver' in window) {
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(function (el) {
    el.classList.add('reveal-ready');
    revealObs.observe(el);
  });
}

/* ---- Smooth Scroll ---- */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      var navH   = nav ? nav.offsetHeight : 0;
      var targetY = target.getBoundingClientRect().top + window.scrollY - navH - 8;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  });
});
