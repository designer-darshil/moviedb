<template>
  <div
    class="tw-p-1.5"
    :class="type === 'poster'
      ? 'tw-w-1/3 xs:tw-w-1/4 md:tw-w-1/5 lg:tw-w-1/6'
      : 'tw-w-1/2 xs:tw-w-1/3 md:tw-w-1/4 lg:tw-w-1/5'">
    <a
      class="tw-group tw-block tw-w-full tw-h-full tw-outline-none"
      :href="image.src"
      aria-label="View photo full size"
      @click.prevent="handleGallery(index)">
      <div
        class="tw-relative tw-h-0 tw-overflow-hidden tw-bg-surface-2 tw-border tw-border-border-subtle tw-rounded-xl tw-transition-all tw-duration-300 group-hover:tw-border-border-medium group-hover:tw-shadow-cinema-md group-focus-visible:tw-ring-2 group-focus-visible:tw-ring-primary-amber"
        :class="type === 'poster' ? 'tw-pt-[150%]' : 'tw-pt-[56.25%]'">
        <img
          v-lazyload="image.thumb"
          class="lazyload tw-absolute tw-inset-0 tw-w-full tw-h-full tw-object-cover tw-transition-transform tw-duration-500 group-hover:tw-scale-105"
          alt="Film gallery photograph">

        <div class="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-text-white tw-bg-black/40 tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity tw-duration-200">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
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
    handleGallery (index) {
      this.$emit('openModal', index);
    },
  },
};
</script>
