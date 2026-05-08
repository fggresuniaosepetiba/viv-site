/* ============================================
   Instituto V.I.V - Interactions
   ============================================
   Navbar, menu toggle, scroll behavior,
   back-to-top, mobile interactions
   ============================================ */

(function () {
  'use strict';

  const navbar = document.querySelector('.navbar');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const backToTop = document.querySelector('.back-to-top');
  let lastScroll = 0;

  /* ---- Mobile Menu Toggle ---- */
  function toggleMenu(open) {
    const isOpen = open !== undefined ? open : !menuToggle.classList.contains('active');
    menuToggle.classList.toggle('active', isOpen);
    mobileMenu.classList.toggle('open', isOpen);
    mobileOverlay.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      toggleMenu();
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', function () {
      toggleMenu(false);
    });
  }

  /* Close mobile menu on link click */
  document.querySelectorAll('.mobile-nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      toggleMenu(false);
    });
  });

  /* Close mobile menu on escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      toggleMenu(false);
    }
  });

  /* ---- Navbar Scroll Behavior ---- */
  window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset;

    /* Show/hide navbar on scroll direction */
    if (currentScroll > lastScroll && currentScroll > 100) {
      navbar.classList.add('navbar-hidden');
    } else {
      navbar.classList.remove('navbar-hidden');
    }

    /* Add shadow on scroll */
    if (currentScroll > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    /* Back to top button */
    if (currentScroll > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    /* Active nav link based on scroll position */
    updateActiveNavLink(currentScroll);

    lastScroll = currentScroll;
  }, { passive: true });

  /* ---- Active Nav Link Update ---- */
  function updateActiveNavLink(scrollY) {
    const sections = document.querySelectorAll('section[id], #hero');
    let currentSection = '';

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id') || 'hero';
      }
    });

    document.querySelectorAll('.nav-link').forEach(function (link) {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  }

  /* ---- Page load: set section detection ---- */
  window.addEventListener('load', function () {
    setTimeout(function () {
      updateActiveNavLink(window.pageYOffset);
    }, 100);
  });

  /* ---- Smooth internal link scroll (fallback) ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

})();
