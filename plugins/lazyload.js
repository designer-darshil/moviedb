import Vue from 'vue';

/**
 * Function called when image has loaded
 */
const imageLoaded = function (e) {
  if (e.target && e.target.parentElement) {
    e.target.parentElement.classList.remove('lazyerror', 'lazyloading');
    e.target.parentElement.classList.add('lazyloaded');
  }
};

/**
 * Function called when image has error
 */
const imageError = function (e) {
  if (e.target) {
    if (e.target.parentElement) {
      e.target.parentElement.classList.remove('lazyloaded', 'lazyloading');
      e.target.parentElement.classList.add('lazyerror');
    }
    // Prevent broken browser placeholder outline from breaking layout
    e.target.style.opacity = '0';
  }
};

/**
 * Function to load the image
 */
const loadImage = function (el, path) {
  if (!path || typeof path !== 'string' || path === 'null' || path === 'undefined') {
    if (el && el.parentElement) {
      el.parentElement.classList.remove('lazyloading', 'lazyloaded');
      el.parentElement.classList.add('lazyerror');
    }
    return;
  }

  // setup loading state
  if (el.parentElement) {
    el.parentElement.classList.remove('lazyerror', 'lazyloaded');
    el.parentElement.classList.add('lazyloading');
  }

  // image successfully loaded
  el.addEventListener('load', imageLoaded, { once: true });

  // image failed to load
  el.addEventListener('error', imageError, { once: true });

  // set element src to the path
  el.src = path;
};

/**
 * Lazy loading images
 */
Vue.directive('lazyload', {
  inserted (el, binding) {
    if (!binding.value) {
      return;
    }

    function handleIntersect (entries, observer) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          /* eslint-disable-next-line */
          return;
        } else {
          loadImage(el, binding.value);
          observer.unobserve(el);
        }
      });
    }

    // Detect that the element is in the viewport.
    function createObserver () {
      const options = {
        root: null,
        rootMargin: '250px 0px',
        threshold: 0,
      };

      const observer = new IntersectionObserver(handleIntersect, options);
      observer.observe(el);
    }

    // If IntersectionObserver is not supported, fallback and just load the images
    if (!window.IntersectionObserver) {
      loadImage(el, binding.value);
    } else {
      createObserver();
    }
  },

  update (el, binding) {
    // only run if the value is defined and has changed
    if (binding.value && binding.value !== binding.oldValue && binding.value !== el.src) {
      loadImage(el, binding.value);
    }
  },
});
