<template>
  <div class="min-h-[85vh] flex items-center justify-center p-6 text-center">
    <div
      class="max-w-[520px] w-full bg-surface-1 border border-border-medium rounded-2xl shadow-cinema-xl p-8 sm:p-12 flex flex-col items-center"
    >
      <!-- Icon -->
      <div
        class="flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-surface-2 border border-border-subtle text-primary-amber"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
          <line x1="7" y1="2" x2="7" y2="22" />
          <line x1="17" y1="2" x2="17" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <line x1="2" y1="7" x2="7" y2="7" />
          <line x1="2" y1="17" x2="7" y2="17" />
          <line x1="17" y1="17" x2="22" y2="17" />
          <line x1="17" y1="7" x2="22" y2="7" />
        </svg>
      </div>

      <div
        class="font-display text-[6.4rem] font-extrabold leading-none tracking-tight mb-3 text-text-subtle"
      >
        {{ error.statusCode || 404 }}
      </div>

      <h1
        class="m-0 mb-3 font-display text-[2.4rem] font-bold text-text-primary leading-[1.2] -tracking-wide"
      >
        {{ message }}
      </h1>

      <p
        v-if="error.statusCode === 504"
        class="m-0 mb-8 text-[1.45rem] leading-relaxed text-text-secondary"
      >
        Unable to reach the movie database servers right now. Please check your
        network connection and try again.
      </p>
      <p
        v-else
        class="m-0 mb-8 text-[1.45rem] leading-relaxed text-text-secondary"
      >
        The title, series, or person you requested could not be located in the
        catalog.
      </p>

      <div class="flex flex-wrap items-center justify-center gap-3">
        <nuxt-link
          v-ripple
          to="/"
          class="inline-flex items-center justify-center gap-2 h-11 px-6 text-[1.35rem] font-semibold text-[#07080b] bg-primary-amber hover:bg-primary-hover rounded-xl shadow-cinema-sm transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary-amber"
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
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
          <span>Return Home</span>
        </nuxt-link>

        <nuxt-link
          v-ripple
          to="/search"
          class="inline-flex items-center justify-center gap-2 h-11 px-6 text-[1.35rem] font-medium text-text-primary bg-surface-2 border border-border-subtle hover:bg-surface-3 hover:text-text-primary rounded-xl transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary-amber"
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
          <span>Search Catalog</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'no-footer',

  props: {
    error: {
      type: Object,
      required: true,
    },
  },

  head() {
    return {
      title: `${this.message} — CINEPULSE`,
    };
  },

  computed: {
    message() {
      if (this.error.statusCode === 404) {
        return 'Reel Not Found';
      } else if (this.error.statusCode === 504) {
        return 'Connection Offline';
      }
      return this.error.message || 'An Error Occurred';
    },
  },
};
</script>
