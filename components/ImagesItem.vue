<template>
  <div
    class="p-2"
    :class="
      type === 'poster'
        ? 'w-1/2 xs:w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6'
        : 'w-full sm:w-1/2 md:w-1/3 lg:w-1/4'
    "
  >
    <a
      class="group block w-full h-full outline-none focus-visible:ring-2 focus-visible:ring-primary-amber rounded-xl"
      :href="image.src"
      aria-label="View photo in full size lightbox"
      @click.prevent="handleGallery(index)"
    >
      <div
        class="relative h-0 overflow-hidden bg-surface-2 border border-border-subtle rounded-xl transition-all duration-300 group-hover:border-primary-amber/40 group-hover:shadow-glow group-hover:-translate-y-0.5"
        :class="type === 'poster' ? 'pt-[150%]' : 'pt-[56.25%]'"
      >
        <img
          v-lazyload="image.thumb"
          class="lazyload absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          alt="Gallery photograph"
        />

        <div
          class="absolute inset-0 flex items-center justify-center text-white bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <span
            class="flex items-center justify-center w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white transform scale-90 group-hover:scale-100 transition-transform duration-200"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },

  methods: {
    handleGallery(index) {
      this.$emit('openModal', index);
    },
  },
};
</script>
