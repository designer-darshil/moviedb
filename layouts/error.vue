<template>
  <div class="min-h-[80vh] flex items-center justify-center p-6 text-center">
    <div class="max-w-[480px] w-full bg-surface-1 border border-border-subtle rounded-xl p-8 sm:p-10 flex flex-col items-center">
      <div class="font-display text-[6.4rem] font-bold leading-none tracking-tight mb-3 text-text-subtle">
        {{ error.statusCode || 404 }}
      </div>

      <h1 class="m-0 mb-3 font-display text-[2.2rem] font-bold text-white -tracking-wide">
        {{ message }}
      </h1>

      <p v-if="error.statusCode === 504" class="m-0 mb-8 text-[1.45rem] leading-relaxed text-text-secondary">
        Unable to connect to the film database at this moment. Please check your connection and try again.
      </p>
      <p v-else class="m-0 mb-8 text-[1.45rem] leading-relaxed text-text-secondary">
        The title or page you are looking for does not exist or may have been moved.
      </p>

      <div class="flex flex-wrap items-center justify-center gap-3">
        <nuxt-link
          to="/"
          class="inline-flex items-center justify-center gap-2 h-10 px-5 text-[1.3rem] font-semibold text-[#07080b] bg-primary-amber hover:bg-primary-hover rounded-md transition-colors duration-150">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
          <span>Return Home</span>
        </nuxt-link>

        <nuxt-link
          to="/movie"
          class="inline-flex items-center justify-center gap-2 h-10 px-5 text-[1.3rem] font-medium text-text-primary bg-surface-2 border border-border-subtle hover:bg-surface-3 hover:text-white rounded-md transition-colors duration-150">
          <span>Explore Movies</span>
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

  head () {
    return {
      title: `${this.message} — CINEPULSE`,
    };
  },

  computed: {
    message () {
      if (this.error.statusCode === 404) {
        return 'Page Not Found';
      } else if (this.error.statusCode === 504) {
        return 'Service Unavailable';
      }
      return this.error.message || 'An Error Occurred';
    },
  },
};
</script>
