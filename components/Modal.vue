<template>
  <transition name="modal" appear>
    <div
      ref="modal"
      class="modal"
      tabindex="-1"
      aria-hidden="false"
      :aria-label="label"
      role="dialog"
      :class="modalClass"
      @click="close">
      <div class="modal__wrap">
        <div
          class="modal__body"
          @click.stop>
          <!-- Close Button -->
          <button
            class="modal__close"
            aria-label="Close dialog"
            type="button"
            @click.stop="close">
            <span class="modal__closeIcon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </span>
          </button>

          <!-- Modal Media Content -->
          <div :class="`modal__${type}`">
            <iframe
              v-if="type === 'iframe' && activeItem"
              :src="activeItem.src"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen />

            <img
              v-if="type === 'image' && activeItem"
              v-lazyload="activeItem.src"
              class="lazyload"
              alt="Film photograph">
          </div>

          <!-- Gallery Navigation Controls -->
          <div
            v-if="showNav"
            class="modal__nav">
            <button
              class="modal__arrow modal__arrow--prev"
              aria-label="Previous photograph"
              type="button"
              @click.stop="previous">
              <span class="modal__arrowCircle">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </span>
            </button>

            <div class="modal__count">
              {{ selected + 1 }} / {{ data.length }}
            </div>

            <button
              class="modal__arrow modal__arrow--next"
              aria-label="Next photograph"
              type="button"
              @click.stop="next">
              <span class="modal__arrowCircle">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { debounce } from '~/mixins/Functions';

let focusedElBeforeOpen;
let focusableEls;
let firstFocusableEl;
let lastFocusableEl;

export default {
  props: {
    data: {
      type: Array,
      required: false,
      default: function () {
        return [];
      },
    },

    type: {
      type: String,
      required: false,
      default: 'image',
    },

    modifier: {
      type: String,
      required: false,
      default: '',
    },

    nav: {
      type: Boolean,
      required: false,
      default: false,
    },

    startAt: {
      type: Number,
      required: false,
      default: 0,
    },

    ariaLabel: {
      type: String,
      required: false,
      default: '',
    },
  },

  head () {
    return {
      bodyAttrs: {
        class: 'modal-open',
      },
    };
  },

  data () {
    return {
      selected: null,
      activeItem: null,
    };
  },

  computed: {
    modalClass () {
      return {
        'modal--nav': this.showNav,
        [`modal--${this.type}`]: true,
        [this.modifier]: true,
      };
    },

    showNav () {
      return this.nav && this.data.length > 1;
    },

    label () {
      if (this.ariaLabel) {
        return this.ariaLabel;
      } else if (this.activeItem && this.activeItem.name) {
        return this.activeItem.name;
      } else {
        return null;
      }
    },
  },

  watch: {
    selected () {
      this.activeItem = this.data[this.selected];
    },
  },

  created () {
    this.selected = this.startAt;
  },

  beforeMount () {
    window.addEventListener('keydown', this.handleKeyDown);
    focusedElBeforeOpen = document.activeElement;
  },

  mounted () {
    focusableEls = this.$refs.modal.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
    focusableEls = Array.prototype.slice.call(focusableEls);

    firstFocusableEl = focusableEls[0];
    lastFocusableEl = focusableEls[focusableEls.length - 1];

    if (firstFocusableEl) {
      firstFocusableEl.focus();
    }

    if (this.type === 'iframe') {
      this.handleIframeSize();
      window.addEventListener('resize', this.resizeIframeSize);
    }
  },

  beforeDestroy () {
    window.removeEventListener('keydown', this.handleKeyDown);

    if (this.type === 'iframe') {
      window.removeEventListener('resize', this.resizeIframeSize);
    }

    if (focusedElBeforeOpen) {
      focusedElBeforeOpen.focus();
    }
  },

  methods: {
    previous () {
      this.selected = ((this.selected - 1) + this.data.length) % this.data.length;
    },

    next () {
      this.selected = (this.selected + 1) % this.data.length;
    },

    close () {
      this.$emit('close');
    },

    handleKeyDown (e) {
      if (e.keyCode === 27) { // esc key
        this.close();
      } else if (this.nav && e.keyCode === 39) { // right arrow
        this.next();
      } else if (this.nav && e.keyCode === 37) { // left arrow
        this.previous();
      } else if (e.keyCode === 9) { // tab trap
        if (focusableEls.length <= 1) {
          e.preventDefault();
          return;
        }

        if (e.shiftKey) {
          this.handleBackwardTab(e);
        } else {
          this.handleForwardTab(e);
        }
      }
    },

    handleForwardTab (e) {
      if (document.activeElement === lastFocusableEl) {
        e.preventDefault();
        firstFocusableEl.focus();
      }
    },

    handleBackwardTab (e) {
      if (document.activeElement === firstFocusableEl) {
        e.preventDefault();
        lastFocusableEl.focus();
      }
    },

    handleIframeSize () {
      const aspectRatio = 16 / 9;
      if (!this.$refs.modal) return;
      const styles = getComputedStyle(this.$refs.modal);
      let maxWidth = this.$refs.modal.offsetWidth;
      let maxHeight = this.$refs.modal.offsetHeight;

      maxWidth -= parseFloat(styles.paddingRight) + parseFloat(styles.paddingLeft) + 40;
      maxHeight -= parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom) + 80;

      let width = maxWidth;
      let height = maxHeight;

      if (maxHeight > maxWidth / aspectRatio) {
        height = maxWidth / aspectRatio;
      } else if (maxWidth > maxHeight * aspectRatio) {
        width = maxHeight * aspectRatio;
      }

      const iframeEl = this.$refs.modal.querySelector('.modal__iframe');
      if (iframeEl) {
        iframeEl.style.width = `${Math.min(width, 1200)}px`;
        iframeEl.style.height = `${Math.min(height, 675)}px`;
      }
    },

    resizeIframeSize: debounce(function () {
      this.handleIframeSize();
    }, 300),
  },
};
</script>

<style lang="scss">
@import '~/assets/css/utilities/_variables.scss';

body.modal-open {
  overflow: hidden;
}

.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow-x: hidden;
  overflow-y: auto;
  cursor: pointer;
  background-color: rgba(11, 12, 14, 0.94);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  @media (min-width: $breakpoint-large) {
    padding: 4rem 10rem;
  }
}

.modal__wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
}

.modal__body {
  position: relative;
  cursor: default;
  max-width: 100%;
}

.modal__close {
  position: absolute;
  top: -4.8rem;
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;

  @media (max-width: $breakpoint-small) {
    top: -4rem;
  }
}

.modal__closeIcon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.8rem;
  height: 3.8rem;
  border-radius: $radius-full;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all $transition-fast;

  &:hover {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }
}

.modal__nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 1.6rem;
}

.modal__arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
}

.modal__arrowCircle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.4rem;
  height: 4.4rem;
  border-radius: $radius-full;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all $transition-fast;

  &:hover {
    color: $primary-color;
    border-color: $primary-color;
    background-color: rgba(229, 169, 60, 0.12);
  }
}

.modal__count {
  padding: 0.6rem 1.4rem;
  font-size: 1.3rem;
  font-weight: 600;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: $radius-full;
  letter-spacing: 0.04em;
}

.modal__image {
  border-radius: $radius-md;
  overflow: hidden;
  box-shadow: $shadow-elevated;

  img {
    max-height: 80vh;
    max-width: 90vw;
    display: block;
    object-fit: contain;
    border-radius: $radius-md;
  }
}

.modal__iframe {
  position: relative;
  width: 90vw;
  max-width: 1100px;
  height: 0;
  padding-bottom: 56.25%;
  overflow: hidden;
  border-radius: $radius-lg;
  box-shadow: $shadow-elevated;
  border: 1px solid $border-subtle;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: $radius-lg;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}
</style>
