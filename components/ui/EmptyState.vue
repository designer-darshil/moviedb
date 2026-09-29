<template>
  <div
    class="flex flex-col items-center justify-center text-center p-8 sm:p-12 max-w-[540px] mx-auto"
  >
    <div
      class="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-5 rounded-2xl bg-surface-2 border border-border-medium text-text-muted shadow-cinema-sm"
    >
      <slot name="icon">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      </slot>
    </div>

    <h3
      class="m-0 mb-2 font-display text-[2rem] sm:text-[2.2rem] font-bold text-text-primary -tracking-wide"
    >
      {{ title }}
    </h3>

    <p
      v-if="description"
      class="m-0 mb-6 text-[1.4rem] leading-relaxed text-text-muted"
    >
      {{ description }}
    </p>

    <div v-if="$slots.action || actionText" class="flex items-center gap-3">
      <slot name="action">
        <nuxt-link
          v-if="actionTo"
          v-ripple
          :to="actionTo"
          class="inline-flex items-center justify-center h-10 px-5 text-[1.3rem] font-semibold rounded-xl text-base-bg bg-primary-amber hover:bg-primary-hover shadow-cinema-sm transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary-amber"
        >
          {{ actionText }}
        </nuxt-link>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'No Items Found',
    },
    description: {
      type: String,
      default: '',
    },
    actionText: {
      type: String,
      default: '',
    },
    actionTo: {
      type: [String, Object],
      default: null,
    },
  },
};
</script>
