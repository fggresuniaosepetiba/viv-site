/* ============================================
   Instituto V.I.V - Animations
   ============================================
   Intersection Observer for scroll-triggered
   animations, impact counter, parallax
   ============================================ */

(function () {
  'use strict';

  /* ---- Intersection Observer for Fade In ---- */
  function createObserver(elements, options, callback) {
    if (!('IntersectionObserver' in window)) {
      /* Fallback: show everything immediately */
      elements.forEach(function (el) {
        el.classList.add('visible');
      });
      return null;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          if (callback) {
            callback(entry.target);
          } else {
            entry.target.classList.add('visible');
          }
          observer.unobserve(entry.target);
        }
      });
    }, options);

    elements.forEach(function (el) {
      observer.observe(el);
    });

    return observer;
  }

  /* Observe all .fade-in-up elements */
  var fadeElements = document.querySelectorAll('.fade-in-up');
  if (fadeElements.length) {
    createObserver(fadeElements, {
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.1
    });
  }

  /* Observe all .fade-scale elements */
  var scaleElements = document.querySelectorAll('.fade-scale');
  if (scaleElements.length) {
    createObserver(scaleElements, {
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.1
    });
  }

  /* Observe all .slide-in-left elements */
  var slideLeftElements = document.querySelectorAll('.slide-in-left');
  if (slideLeftElements.length) {
    createObserver(slideLeftElements, {
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.1
    });
  }

  /* Observe all .slide-in-right elements */
  var slideRightElements = document.querySelectorAll('.slide-in-right');
  if (slideRightElements.length) {
    createObserver(slideRightElements, {
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.1
    });
  }

  /* ---- Impact Counter Animation ---- */
  function animateCounter(element, target, suffix) {
    var current = 0;
    var increment = Math.ceil(target / 60);
    var timer = setInterval(function () {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = current + (suffix || '');
    }, 20);
  }

  var impactNumbers = document.querySelectorAll('.impact-number');
  if (impactNumbers.length) {
    createObserver(impactNumbers, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.3
    }, function (el) {
      var text = el.textContent.trim();
      var match = text.match(/(\d+)(\+?)/);
      if (match) {
        var target = parseInt(match[1], 10);
        var suffix = match[2] || '';
        el.textContent = '0';
        el.classList.add('visible');
        animateCounter(el, target, suffix);
      } else {
        el.classList.add('visible');
      }
    });
  }

  /* ---- Parallax effect for hero (gentle) ---- */
  var hero = document.querySelector('.hero');
  var heroBg = hero ? hero.querySelector('.hero-bg') : null;

  if (heroBg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', function () {
      var scrollY = window.pageYOffset;
      if (scrollY < hero.offsetHeight) {
        heroBg.style.transform = 'translateY(' + (scrollY * 0.15) + 'px)';
      }
    }, { passive: true });
  }

  /* ---- Section header icons entrance ---- */
  var headerIcons = document.querySelectorAll('.section-header-icon');
  if (headerIcons.length) {
    createObserver(headerIcons, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.5
    }, function (el) {
      el.classList.add('visible');
      el.style.transform = 'scale(1)';
      el.style.opacity = '1';
    });
  }

})();
