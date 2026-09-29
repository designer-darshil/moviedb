<template>
  <div class="tw-min-h-[80vh] tw-flex tw-items-center tw-justify-center tw-p-8 tw-text-center">
    <div class="tw-max-w-[540px] tw-w-full tw-bg-surface-1 tw-border tw-border-border-medium tw-rounded-3xl tw-p-10 sm:tw-py-14 sm:tw-px-9 tw-shadow-cinema-lg tw-flex tw-flex-col tw-items-center">
      <div class="tw-font-display tw-text-[8.8rem] tw-font-black tw-leading-none tw-tracking-tighter tw-mb-4 tw-bg-gradient-to-br tw-from-primary-amber tw-to-[#ff8a00] tw-bg-clip-text tw-text-transparent">
        {{ error.statusCode || 404 }}
      </div>

      <h1 class="tw-m-0 tw-mb-3 tw-font-display tw-text-[2.6rem] tw-font-extrabold tw-text-white tw-tracking-tight">
        {{ message }}
      </h1>

      <p v-if="error.statusCode === 504" class="tw-m-0 tw-mb-9 tw-text-[1.55rem] tw-leading-relaxed tw-text-text-secondary">
        We are unable to connect to the film database at this moment. Please
        check your internet connection or try again in a few moments.
      </p>
      <p v-else class="tw-m-0 tw-mb-9 tw-text-[1.55rem] tw-leading-relaxed tw-text-text-secondary">
        The title, page, or resource you are looking for does not exist or may
        have been moved.
      </p>

      <div class="tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-gap-3.5">
        <nuxt-link to="/" class="tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-h-[4.6rem] tw-px-6 tw-text-[1.4rem] tw-font-bold tw-text-[#07080b] tw-bg-primary-amber tw-border tw-border-primary-amber tw-rounded-full tw-shadow-[0_2px_14px_rgba(229,169,60,0.4)] hover:tw-shadow-[0_4px_20px_rgba(229,169,60,0.6)] hover:-tw-translate-y-0.5 tw-transition-all tw-duration-200">
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

        <nuxt-link to="/movie" class="tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-h-[4.6rem] tw-px-6 tw-text-[1.4rem] tw-font-semibold tw-text-text-primary tw-bg-surface-2 tw-border tw-border-border-medium tw-rounded-full hover:tw-text-white hover:tw-bg-surface-3 hover:tw-border-white/30 hover:-tw-translate-y-0.5 tw-transition-all tw-duration-200">
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
