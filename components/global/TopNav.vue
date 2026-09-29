<template>
  <nav class="fixed top-0 right-0 left-0 z-50 flex items-center justify-center h-[5.2rem] px-12 bg-[rgba(7,8,11,0.9)] backdrop-blur-md border-b border-border-subtle md:hidden" aria-label="Contextual Top Navigation">
    <button
      type="button"
      aria-label="Go Back"
      class="absolute top-1/2 left-3 -translate-y-1/2 flex items-center justify-center w-8 h-8 text-text-muted hover:text-white bg-surface-2 border border-border-subtle rounded-md cursor-pointer transition-colors duration-150"
      @click="$router.go(-1)">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>

    <h2 class="m-0 overflow-hidden font-display text-[1.45rem] font-semibold text-white truncate">
      {{ title }}
    </h2>
  </nav>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
