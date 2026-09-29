<template>
  <Dialog
    :visible="isOpen"
    :modal="true"
    :dismissable-mask="true"
    :close-on-escape="true"
    :closable="false"
    class="cinema-dialog-clean w-full max-w-[1280px] mx-4"
    :content-style="{
      padding: '0',
      overflow: 'visible',
      background: 'transparent',
    }"
    :aria-label="label"
    @hide="close"
  >
    <div
      class="relative w-full flex flex-col items-center justify-center p-2 sm:p-4"
    >
      <!-- Close Button -->
      <button
        type="button"
        class="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center justify-center w-11 h-11 p-0 bg-surface-2/90 border border-border-medium rounded-full cursor-pointer hover:bg-surface-3 hover:border-primary-amber/50 hover:scale-105 active:scale-95 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary-amber shadow-cinema-md"
        aria-label="Close dialog"
        @click="close"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#f8fafc"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <!-- Video Player (16:9 responsive) -->
      <div
        v-if="type === 'iframe' && activeItem"
        class="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-cinema-xl border border-border-subtle"
      >
        <iframe
          :src="activeItem.src"
          frameborder="0"
          allow="autoplay; encrypted-media; fullscreen"
          allowfullscreen
          class="absolute inset-0 w-full h-full border-0"
        />
      </div>

      <!-- Image Lightbox -->
      <div
        v-else-if="type === 'image' && activeItem"
        class="relative flex flex-col items-center max-h-[85vh] max-w-full"
      >
        <img
          :src="activeItem.src"
          class="max-h-[80vh] max-w-full object-contain mx-auto rounded-xl shadow-cinema-xl border border-border-subtle"
          :alt="label || 'Media gallery photo'"
        />
      </div>

      <!-- Navigation Bar (for gallery / multi-item) -->
      <div
        v-if="showNav"
        class="flex items-center justify-between w-full max-w-[400px] mt-4 px-4 py-2 bg-surface-1/90 backdrop-blur-md border border-border-subtle rounded-2xl shadow-cinema-sm"
      >
        <button
          type="button"
          class="flex items-center justify-center w-10 h-10 rounded-xl text-text-muted hover:text-white hover:bg-surface-3 transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary-amber"
          aria-label="Previous item"
          @click="previous"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <span
          class="text-[1.3rem] font-semibold text-text-primary tabular-nums"
        >
          {{ selected + 1 }} / {{ data.length }}
        </span>

        <button
          type="button"
          class="flex items-center justify-center w-10 h-10 rounded-xl text-text-muted hover:text-white hover:bg-surface-3 transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary-amber"
          aria-label="Next item"
          @click="next"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  </Dialog>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: 'image',
    },
    modifier: {
      type: String,
      default: '',
    },
    nav: {
      type: Boolean,
      default: false,
    },
    startAt: {
      type: Number,
      default: 0,
    },
    ariaLabel: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      isOpen: true,
      selected: this.startAt,
      activeItem: null,
    };
  },

  computed: {
    showNav() {
      return this.nav && this.data.length > 1;
    },

    label() {
      if (this.ariaLabel) return this.ariaLabel;
      if (this.activeItem && this.activeItem.name) return this.activeItem.name;
      return 'Media Preview';
    },
  },

  watch: {
    selected: {
      immediate: true,
      handler(newIndex) {
        if (this.data && this.data.length > 0) {
          this.activeItem = this.data[newIndex] || null;
        }
      },
    },
  },

  mounted() {
    window.addEventListener('keydown', this.handleKeyDown);
  },

  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
  },

  methods: {
    previous() {
      if (this.data.length > 0) {
        this.selected =
          (this.selected - 1 + this.data.length) % this.data.length;
      }
    },

    next() {
      if (this.data.length > 0) {
        this.selected = (this.selected + 1) % this.data.length;
      }
    },

    close() {
      this.isOpen = false;
      this.$emit('close');
    },

    handleKeyDown(e) {
      if (this.showNav) {
        if (e.key === 'ArrowRight') {
          this.next();
        } else if (e.key === 'ArrowLeft') {
          this.previous();
        }
      }
    },
  },
};
</script>
