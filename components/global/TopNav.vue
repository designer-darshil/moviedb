<template>
  <nav class="fixed top-0 right-0 left-0 z-50 flex items-center justify-center h-14 px-14 bg-surface-1/80 backdrop-blur-xl border-b border-border-subtle md:hidden" aria-label="Contextual Top Navigation">
    <button
      type="button"
      aria-label="Go Back"
      class="absolute top-1/2 left-3 -translate-y-1/2 flex items-center justify-center w-[3.8rem] h-[3.8rem] p-0 text-text-primary bg-surface-2 border border-border-medium rounded-full hover:text-white hover:bg-surface-3 hover:border-primary-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-amber cursor-pointer transition-all duration-200"
      @click="$router.go(-1)">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>

    <h2 class="m-0 overflow-hidden font-display text-[1.55rem] font-bold text-white truncate tracking-tight">
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
