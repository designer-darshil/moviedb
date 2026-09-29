<template>
  <nav
    class="fixed top-0 inset-x-0 z-50 flex items-center justify-between h-[5.2rem] px-4 bg-[rgba(7,8,11,0.9)] backdrop-blur-xl border-b border-border-subtle md:hidden select-none"
    aria-label="Contextual Top Navigation"
  >
    <!-- Back Button -->
    <button
      type="button"
      aria-label="Go Back"
      class="flex items-center justify-center w-9 h-9 text-text-muted hover:text-text-primary bg-surface-2/80 border border-border-subtle rounded-xl cursor-pointer transition-colors duration-150 active:scale-95"
      @click="handleBack"
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
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>

    <!-- Page Title -->
    <h2
      class="m-0 px-3 overflow-hidden font-display text-[1.45rem] font-bold text-text-primary text-center truncate flex-1"
    >
      {{ title }}
    </h2>

    <!-- Search / Home Action -->
    <nuxt-link
      to="/search"
      aria-label="Search"
      class="flex items-center justify-center w-9 h-9 text-text-muted hover:text-text-primary bg-surface-2/80 border border-border-subtle rounded-xl cursor-pointer transition-colors duration-150"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </nuxt-link>
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

  methods: {
    handleBack() {
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        this.$router.push('/');
      }
    },
  },
};
</script>
