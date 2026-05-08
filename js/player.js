/* ============================================
   Instituto V.I.V - Media Player
   ============================================
   Audio/video player for gallery and
   multimedia content. Extensible for
   future podcast/video features.
   ============================================ */

(function () {
  'use strict';

  var Player = {
    current: null,
    elements: [],
    init: function () {
      this.setupAudioPlayers();
      this.setupVideoPlayers();
    },

    setupAudioPlayers: function () {
      var players = document.querySelectorAll('[data-audio-player]');
      players.forEach(function (container) {
        var playBtn = container.querySelector('.play-btn');
        var audio = container.querySelector('audio');
        if (playBtn && audio) {
          playBtn.addEventListener('click', function () {
            if (audio.paused) {
              Player.pauseAll();
              audio.play();
              playBtn.classList.add('playing');
            } else {
              audio.pause();
              playBtn.classList.remove('playing');
            }
          });

          audio.addEventListener('ended', function () {
            playBtn.classList.remove('playing');
          });
        }
      });
    },

    setupVideoPlayers: function () {
      var players = document.querySelectorAll('[data-video-player]');
      players.forEach(function (container) {
        var playBtn = container.querySelector('.video-play-btn');
        var iframe = container.querySelector('iframe');
        if (playBtn && iframe) {
          playBtn.addEventListener('click', function () {
            iframe.src = iframe.dataset.src || iframe.src;
            iframe.style.display = 'block';
            playBtn.style.display = 'none';

            /* Hide thumbnail if exists */
            var thumb = container.querySelector('.video-thumb');
            if (thumb) thumb.style.display = 'none';
          });
        }
      });
    },

    pauseAll: function () {
      document.querySelectorAll('audio, video').forEach(function (media) {
        media.pause();
      });
      document.querySelectorAll('.play-btn').forEach(function (btn) {
        btn.classList.remove('playing');
      });
    },

    destroy: function () {
      /* Cleanup if needed */
    }
  };

  /* Auto-initialize on DOM ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { Player.init(); });
  } else {
    Player.init();
  }

})();
