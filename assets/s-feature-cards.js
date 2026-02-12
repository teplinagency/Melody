(function () {
  const MOBILE = window.matchMedia('(max-width: 768px)');
  const SECTION = '.s-feature-cards';
  const SLIDER = '[data-s-feature-cards]';

  function run() {
    if (!window.Swiper) return;
    document.querySelectorAll(SECTION).forEach(function (section) {
      const el = section.querySelector(SLIDER);
      if (!el) return;
      if (MOBILE.matches) {
        if (!el._swiper) {
          el._swiper = new window.Swiper(el, {
            slidesPerView: 1.58,
            spaceBetween: 20,
            loop:true,
          });
        }
      } else {
        if (el._swiper) {
          el._swiper.destroy(true, true);
          el._swiper = null;
        }
      }
    });
  }

  function onReady() {
    run();
    MOBILE.addEventListener('change', run);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
  if (!window.Swiper) setTimeout(run, 300);

  document.addEventListener('shopify:section:load', function (e) {
    var target = e.target;
    if (target && (target.matches(SECTION) || target.querySelector(SECTION))) {
      run();
    }
  });
})();
