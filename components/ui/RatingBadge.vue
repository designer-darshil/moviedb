<template>
  <div
    class="inline-flex items-center gap-1 font-bold text-text-primary select-none"
    :class="
      size === 'lg'
        ? 'text-[1.5rem]'
        : size === 'sm'
        ? 'text-[1.15rem]'
        : 'text-[1.3rem]'
    "
    :aria-label="`Rating: ${formattedRating} out of 10`"
  >
    <svg
      class="text-primary-amber shrink-0"
      :width="iconSize"
      :height="iconSize"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      />
    </svg>
    <span>{{ formattedRating }}</span>
    <span
      v-if="votes && showCount"
      class="font-normal text-text-muted text-[0.85em]"
    >
      ({{ votes | numberWithCommas }})
    </span>
  </div>
</template>

<script>
export default {
  props: {
    rating: {
      type: [Number, String],
      required: true,
    },
    votes: {
      type: [Number, String],
      default: null,
    },
    showCount: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'md',
      validator: (s) => ['sm', 'md', 'lg'].includes(s),
    },
  },

  computed: {
    formattedRating() {
      if (!this.rating) return '0.0';
      return this.$options.filters.rating(this.rating);
    },

    iconSize() {
      if (this.size === 'lg') return 16;
      if (this.size === 'sm') return 11;
      return 13;
    },
  },
};
</script>
