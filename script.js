/**
 * Portfolio JavaScript - Bilingual & Interactive System
 */
(function () {
  'use strict';

  // Real SVG vector flags: Japan & US
  const FLAGS = {
    ja: `<svg class="flag-svg" viewBox="0 0 32 32" width="26" height="26" aria-hidden="true"><circle cx="16" cy="16" r="15" fill="#ffffff" stroke="#d5dde0" stroke-width="1.2"/><circle cx="16" cy="16" r="6" fill="#bc002d"/></svg>`,
    en: `<svg class="flag-svg" viewBox="0 0 32 32" width="26" height="26" aria-hidden="true"><defs><clipPath id="us-clip"><circle cx="16" cy="16" r="15"/></clipPath></defs><g clip-path="url(#us-clip)"><rect width="32" height="32" fill="#bf0a30"/><path d="M0 4.92h32M0 9.85h32M0 14.77h32M0 19.69h32M0 24.62h32M0 29.54h32" stroke="#ffffff" stroke-width="2.46"/><rect width="14" height="17.2" fill="#002868"/><circle cx="3.5" cy="4" r="0.9" fill="#fff"/><circle cx="7" cy="4" r="0.9" fill="#fff"/><circle cx="10.5" cy="4" r="0.9" fill="#fff"/><circle cx="5.25" cy="7" r="0.9" fill="#fff"/><circle cx="8.75" cy="7" r="0.9" fill="#fff"/><circle cx="3.5" cy="10" r="0.9" fill="#fff"/><circle cx="7" cy="10" r="0.9" fill="#fff"/><circle cx="10.5" cy="10" r="0.9" fill="#fff"/><circle cx="5.25" cy="13" r="0.9" fill="#fff"/><circle cx="8.75" cy="13" r="0.9" fill="#fff"/></g><circle cx="16" cy="16" r="15" fill="none" stroke="#d5dde0" stroke-width="1.2"/></svg>`
  };

  // Default language
  let currentLang = localStorage.getItem('portfolio-lang') || 'en';

  function updateTexts(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-en]').forEach(el => {
      const text = el.getAttribute('data-' + lang);
      if (text !== null) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = text;
        } else {
          el.innerHTML = text;
        }
      }
    });

    // Update real flag button: show the flag of the current language
    // In English mode -> shows US flag (click to switch to Japanese)
    // In Japanese mode -> shows Japan flag (click to switch to English)
    const label = lang === 'en' ? '日本語に切替 (Switch to Japanese)' : 'Switch to English (英語に切替)';
    document.querySelectorAll('.lang-flag-btn').forEach(btn => {
      btn.innerHTML = FLAGS[lang];
      btn.setAttribute('aria-label', label);
      btn.setAttribute('title', label);
    });

    localStorage.setItem('portfolio-lang', lang);
  }

  function setLanguage(lang) {
    currentLang = lang;
    updateTexts(currentLang);
  }

  document.querySelectorAll('.lang-flag-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const nextLang = currentLang === 'en' ? 'ja' : 'en';
      setLanguage(nextLang);
    });
  });

  // Initialize on load
  document.addEventListener('DOMContentLoaded', () => {
    updateTexts(currentLang);
  });

  // Header scroll shadow
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }
  });

  // Back to top scroll: appears progressively when scrolling deeper, settles into fixed place
  const scrollTopBtns = document.querySelectorAll('.scroll-top-btn');
  function updateScrollTopVisibility() {
    const scrollY = window.scrollY || window.pageYOffset;
    scrollTopBtns.forEach(btn => {
      if (scrollY > 100) {
        btn.classList.add('is-visible');
        // Progressive transition between 100px and 350px scroll depth
        const progress = Math.min(1, Math.max(0, (scrollY - 100) / 250));
        btn.style.opacity = progress.toFixed(2);
        btn.style.transform = `translateY(${(1 - progress) * 18}px)`;
        btn.style.pointerEvents = progress > 0.15 ? 'auto' : 'none';
      } else {
        btn.classList.remove('is-visible');
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(18px)';
        btn.style.pointerEvents = 'none';
      }
    });
  }

  window.addEventListener('scroll', updateScrollTopVisibility, { passive: true });
  updateScrollTopVisibility();

  scrollTopBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });

  // Mobile menu toggle
  const mobileBtn = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      mobileBtn.classList.toggle('active');
    });
  }

  // Active page link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

})();
