/* ============================================
   Instituto V.I.V - Main Application
   ============================================
   Initialization, global app logic,
   performance monitoring, service worker
   ============================================ */

(function () {
  'use strict';

  /* ---- App Configuration ---- */
  var APP = {
    name: 'Instituto V.I.V',
    version: '1.0.0',
    debug: false
  };

  if (APP.debug) {
    console.log('[' + APP.name + '] v' + APP.version + ' initialized');
  }

  /* ---- Performance Check ---- */
  function checkPerformance() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      var navEntries = performance.getEntriesByType('navigation');
      if (navEntries.length > 0) {
        var nav = navEntries[0];
        if (APP.debug) {
          console.log('[' + APP.name + '] DOM Interactive:', nav.domInteractive, 'ms');
          console.log('[' + APP.name + '] Load Event:', nav.loadEventEnd, 'ms');
        }
      }
    }

    /* Check for layout shifts */
    if ('PerformanceObserver' in window) {
      try {
        var clsObserver = new PerformanceObserver(function (list) {
          for (var entries = list.getEntries(), i = 0; i < entries.length; i++) {
            if (!entries[i].hadRecentInput && APP.debug) {
              console.log('[' + APP.name + '] CLS:', entries[i].value);
            }
          }
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });
      } catch (e) {
        /* CLS not supported */
      }
    }
  }

  if (APP.debug) {
    if (document.readyState === 'complete') {
      checkPerformance();
    } else {
      window.addEventListener('load', checkPerformance);
    }
  }

  /* ---- Image Lazy Loading Optimization ---- */
  function observeImages() {
    if (!('IntersectionObserver' in window)) return;

    var lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if (!lazyImages.length) return;

    var imageObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '200px 0px',
      threshold: 0.01
    });

    lazyImages.forEach(function (img) {
      imageObserver.observe(img);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeImages);
  } else {
    observeImages();
  }

  /* ---- Service Worker Registration ---- */
  if ('serviceWorker' in navigator && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js').then(function () {
        /* SW registered silently */
      }).catch(function () {
        /* SW registration failed silently */
      });
    });
  }

  /* ---- Global Error Handler ---- */
  window.addEventListener('error', function (e) {
    if (APP.debug) {
      console.warn('[' + APP.name + '] Uncaught error:', e.message);
    }
    e.preventDefault();
  });

  /* ---- Expose APP to global scope for debugging ---- */
  if (APP.debug) {
    window.__VIV = APP;
  }

})();
