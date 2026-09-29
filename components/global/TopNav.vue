<template>
  <nav class="tw-fixed tw-top-0 tw-right-0 tw-left-0 tw-z-50 tw-flex tw-items-center tw-justify-center tw-h-14 tw-px-14 tw-bg-surface-1/80 tw-backdrop-blur-xl tw-border-b tw-border-border-subtle md:tw-hidden" aria-label="Contextual Top Navigation">
    <button
      type="button"
      aria-label="Go Back"
      class="tw-absolute tw-top-1/2 tw-left-3 -tw-translate-y-1/2 tw-flex tw-items-center tw-justify-center tw-w-[3.8rem] tw-h-[3.8rem] tw-p-0 tw-text-text-primary tw-bg-surface-2 tw-border tw-border-border-medium tw-rounded-full hover:tw-text-white hover:tw-bg-surface-3 hover:tw-border-primary-amber focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-primary-amber tw-cursor-pointer tw-transition-all tw-duration-200"
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

    <h2 class="tw-m-0 tw-overflow-hidden tw-font-display tw-text-[1.55rem] tw-font-bold tw-text-white tw-truncate tw-tracking-tight">
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
