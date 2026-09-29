<template>
  <transition name="modal" appear>
    <div
      ref="modal"
      class="fixed inset-0 z-[999] overflow-x-hidden overflow-y-auto cursor-pointer bg-[rgba(10,11,14,0.92)] backdrop-blur-xl lg:py-11 lg:px-24"
      tabindex="-1"
      aria-hidden="false"
      :aria-label="label"
      role="dialog"
      :class="modalClass"
      @click="close">
      <div class="flex flex-col min-h-full">
        <div class="relative m-auto cursor-default" @click.stop>
          <button
            class="fixed lg:absolute top-4 lg:top-0 right-4 lg:right-0 z-10 flex items-center justify-center w-11 h-11 lg:w-10 lg:h-10 p-0 bg-surface-2 border border-border-subtle rounded-full cursor-pointer hover:bg-surface-3 hover:border-border-medium hover:scale-105 transition-all duration-200"
            :class="(type === 'image' || type === 'iframe') ? 'lg:-top-11' : ''"
            aria-label="Close"
            type="button"
            @click.stop="close">
            <!-- eslint-disable-next-line -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 15 15">
              <g
                fill="none"
                stroke="#fff"
                stroke-linecap="round"
                stroke-miterlimit="10"
                stroke-width="1.5">
                <path d="M.75.75l13.5 13.5M14.25.75L.75 14.25" />
              </g>
            </svg>
          </button>

          <div
            v-if="type === 'iframe'"
            class="modal__iframe relative w-full h-0 pb-[56.25%] overflow-hidden">
            <iframe
              v-if="activeItem"
              :src="activeItem.src"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
              class="absolute inset-0 w-full h-full p-0 m-0 bg-black border-0" />
          </div>

          <div
            v-else-if="type === 'image'"
            class="relative">
            <img
              v-if="activeItem"
              v-lazyload="activeItem.src"
              class="lazyload max-h-screen lg:max-h-[calc(100vh-8.8rem)] block mx-auto"
              alt="">
          </div>

          <div
            v-if="showNav"
            class="fixed lg:absolute inset-x-0 bottom-0 lg:-bottom-11 flex items-center justify-between lg:justify-end h-[5rem] lg:h-[4.4rem] bg-black lg:bg-transparent">
            <button
              class="flex items-center justify-center p-0 bg-transparent flex-1 lg:flex-none h-[5rem] lg:fixed lg:top-1/2 lg:left-0 lg:w-24 lg:h-24 lg:-mt-12 cursor-pointer"
              aria-label="Previous"
              type="button"
              @click.stop="previous">
              <!-- eslint-disable-next-line -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24">
                <path
                  fill="none"
                  stroke="#fff"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  d="M17.9 23.2L6.1 12 17.9.8" />
              </svg>
            </button>

            <div class="text-[1.6rem] leading-none text-white px-4">
              {{ selected + 1 }} / {{ data.length }}
            </div>

            <button
              class="flex items-center justify-center p-0 bg-transparent flex-1 lg:flex-none h-[5rem] lg:fixed lg:top-1/2 lg:right-0 lg:w-24 lg:h-24 lg:-mt-12 cursor-pointer"
              aria-label="Next"
              type="button"
              title="Next"
              @click.stop="next">
              <!-- eslint-disable-next-line -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24">
                <path
                  fill="none"
                  stroke="#fff"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  d="M6.1 23.2L17.9 12 6.1.8" />
              </svg>
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

  data () {
    return {
      selected: null,
      activeItem: null,
    };
  },

  head () {
    return {
      bodyAttrs: {
        class: 'modal-open',
      },
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
    focusableEls = this.$refs.modal.querySelectorAll(
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]',
    );
    focusableEls = Array.prototype.slice.call(focusableEls);

    firstFocusableEl = focusableEls[0];
    lastFocusableEl = focusableEls[focusableEls.length - 1];

    // focus on the first element
    firstFocusableEl.focus();

    // calculate iframe size for responsive sizing on resize
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
      this.selected = (this.selected - 1 + this.data.length) % this.data.length;
    },

    next () {
      this.selected = (this.selected + 1) % this.data.length;
    },

    close () {
      this.$emit('close');
    },

    handleKeyDown (e) {
      if (e.keyCode === 27) {
        // esc key
        this.close();
      } else if (this.nav && e.keyCode === 39) {
        // right arrow
        this.next();
      } else if (this.nav && e.keyCode === 37) {
        // left arrow
        this.previous();
      } else if (e.keyCode === 9) {
        // tab
        if (focusableEls.length === 1) {
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
      const styles = getComputedStyle(this.$refs.modal);
      let maxWidth = this.$refs.modal.offsetWidth;
      let maxHeight = this.$refs.modal.offsetHeight;
      let width;
      let height;

      maxWidth -=
        parseFloat(styles.paddingRight) + parseFloat(styles.paddingLeft);
      maxHeight -=
        parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);

      width = maxWidth;
      height = maxHeight;

      if (maxHeight > maxWidth / aspectRatio) {
        height = maxWidth / aspectRatio;
      } else if (maxWidth > maxHeight * aspectRatio) {
        width = maxHeight * aspectRatio;
      }

      this.$refs.modal.querySelector(
        '.modal__iframe',
      ).style.width = `${width}px`;
      this.$refs.modal.querySelector(
        '.modal__iframe',
      ).style.height = `${height}px`;
    },

    resizeIframeSize: debounce(function () {
      this.handleIframeSize();
    }, 600),
  },
};
</script>
