<template>
  <div class="min-h-[80vh] flex items-center justify-center p-8 text-center">
    <div class="max-w-[540px] w-full bg-surface-1 border border-border-medium rounded-3xl p-10 sm:py-14 sm:px-9 shadow-cinema-lg flex flex-col items-center">
      <div class="font-display text-[8.8rem] font-black leading-none tracking-tighter mb-4 bg-gradient-to-br from-primary-amber to-[#ff8a00] bg-clip-text text-transparent">
        {{ error.statusCode || 404 }}
      </div>

      <h1 class="m-0 mb-3 font-display text-[2.6rem] font-extrabold text-white tracking-tight">
        {{ message }}
      </h1>

      <p v-if="error.statusCode === 504" class="m-0 mb-9 text-[1.55rem] leading-relaxed text-text-secondary">
        We are unable to connect to the film database at this moment. Please
        check your internet connection or try again in a few moments.
      </p>
      <p v-else class="m-0 mb-9 text-[1.55rem] leading-relaxed text-text-secondary">
        The title, page, or resource you are looking for does not exist or may
        have been moved.
      </p>

      <div class="flex flex-wrap items-center justify-center gap-3.5">
        <nuxt-link to="/" class="inline-flex items-center justify-center gap-2 h-[4.6rem] px-6 text-[1.4rem] font-bold text-[#07080b] bg-primary-amber border border-primary-amber rounded-full shadow-[0_2px_14px_rgba(229,169,60,0.4)] hover:shadow-[0_4px_20px_rgba(229,169,60,0.6)] hover:-translate-y-0.5 transition-all duration-200">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
          <span>Return Home</span>
        </nuxt-link>

        <nuxt-link to="/movie" class="inline-flex items-center justify-center gap-2 h-[4.6rem] px-6 text-[1.4rem] font-semibold text-text-primary bg-surface-2 border border-border-medium rounded-full hover:text-white hover:bg-surface-3 hover:border-white/30 hover:-translate-y-0.5 transition-all duration-200">
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
        return 'Title or Page Not Found';
      } else if (this.error.statusCode === 504) {
        return 'Service Unavailable';
      }
      return this.error.message || 'An Unexpected Error Occurred';
    },
  },
};
</script>
