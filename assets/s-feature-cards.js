(() => {
  const SELECTOR = '.s-feature-cards';
  const SLIDER_SELECTOR = '[data-s-feature-cards]';
  const PAGINATION_SELECTOR = '.s-feature-cards__pagination';
  const BREAKPOINT = '(max-width: 768px)';

  const bindSection = (root) => {
    if (!root || root.dataset.sFeatureCardsBound === 'true') return;

    const slider = root.querySelector(SLIDER_SELECTOR);
    if (!slider) return;

    const pagination = root.querySelector(PAGINATION_SELECTOR);
    const breakpoint = window.matchMedia(BREAKPOINT);
    let swiperInstance = null;

    const enable = () => {
      if (swiperInstance || !window.Swiper) return;
      swiperInstance = new Swiper(slider, {
        slidesPerView: 1.5,
        spaceBetween: 20,
        // Space after last slide so it can scroll fully into view (match right padding)
        slidesOffsetAfter: 32,
        resistanceRatio: 0,
      });
    };

    const disable = () => {
      if (!swiperInstance) return;
      swiperInstance.destroy(true, true);
      swiperInstance = null;
    };

    const onChange = () => {
      if (breakpoint.matches) {
        enable();
      } else {
        disable();
      }
    };

    const bindBreakpoint = () => {
      onChange();
      if (breakpoint.addEventListener) {
        breakpoint.addEventListener('change', onChange);
      } else {
        breakpoint.addListener(onChange);
      }
    };

    const waitForSwiper = () => {
      if (window.Swiper) {
        bindBreakpoint();
        return;
      }
      let tries = 0;
      const timer = setInterval(() => {
        tries += 1;
        if (window.Swiper) {
          clearInterval(timer);
          bindBreakpoint();
        } else if (tries > 60) {
          clearInterval(timer);
        }
      }, 50);
    };

    root.dataset.sFeatureCardsBound = 'true';
    waitForSwiper();
  };

  const bindAll = () => {
    document.querySelectorAll(SELECTOR).forEach(bindSection);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindAll, { once: true });
  } else {
    bindAll();
  }

  document.addEventListener('shopify:section:load', (event) => {
    if (!event.target) return;
    if (event.target.matches(SELECTOR)) {
      bindSection(event.target);
    } else {
      event.target.querySelectorAll?.(SELECTOR).forEach(bindSection);
    }
  });
})();
