/* ===================================================
   VoxPlan — main.js
   =================================================== */

// ─── Reduced motion check ─────────────────────────────
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── Hero entrance ────────────────────────────────────
if (!prefersReduced) {
  const heroEls = document.querySelectorAll(
    '.hero__tag, .hero__headline, .hero__wave-row, .hero__sub, .hero__btns'
  );
  heroEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = `opacity .7s cubic-bezier(0.16,1,0.3,1), transform .7s cubic-bezier(0.16,1,0.3,1)`;
    el.style.transitionDelay = `${100 + i * 85}ms`;
  });

  const phoneWrap = document.querySelector('.hero__right');
  if (phoneWrap) {
    phoneWrap.style.opacity = '0';
    phoneWrap.style.transform = 'translateY(32px)';
    phoneWrap.style.transition = 'opacity .85s cubic-bezier(0.16,1,0.3,1) .15s, transform .85s cubic-bezier(0.16,1,0.3,1) .15s';
  }

  requestAnimationFrame(() => requestAnimationFrame(() => {
    heroEls.forEach(el => {
      el.style.opacity = '';
      el.style.transform = '';
    });
    if (phoneWrap) {
      phoneWrap.style.opacity = '';
      phoneWrap.style.transform = '';
    }
  }));
}

// ─── Nav scroll effect ────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ─── Scroll reveal ────────────────────────────────────
const STAGGER = { 'feat': 100, 'ov-item': 50 };

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const cls = el.className.split(' ')[0];
    const ms  = STAGGER[cls] ?? 80;
    const siblings = Array.from(el.parentElement.children);
    const idx = siblings.filter(s => s.hasAttribute('data-reveal')).indexOf(el);
    setTimeout(() => el.classList.add('revealed'), idx * ms);
    revealObs.unobserve(el);
  });
}, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => revealObs.observe(el));

// ─── Mobile nav ───────────────────────────────────────
const burger   = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');

burger?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
});

navLinks?.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', closeNav);
});

document.addEventListener('click', e => {
  if (!nav.contains(e.target)) closeNav();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && navLinks?.classList.contains('open')) {
    closeNav();
    burger?.focus();
  }
});

function closeNav() {
  navLinks?.classList.remove('open');
  burger?.classList.remove('open');
  burger?.setAttribute('aria-expanded', 'false');
}

// ─── Coming soon links ────────────────────────────────
document.querySelectorAll('.js-coming-soon').forEach(el => {
  el.addEventListener('click', e => e.preventDefault());
});

// ─── Smooth anchor scroll ─────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const offset = target.getBoundingClientRect().top + window.scrollY - (nav?.offsetHeight ?? 64);
    window.scrollTo({ top: offset, behavior: 'smooth' });
  });
});

// ─── Ticker pause on hover ────────────────────────────
const ticker = document.querySelector('.ticker__track');
ticker?.parentElement?.addEventListener('mouseenter', () => {
  ticker.style.animationPlayState = 'paused';
});
ticker?.parentElement?.addEventListener('mouseleave', () => {
  ticker.style.animationPlayState = 'running';
});
