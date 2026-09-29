<template>
  <div class="tw-group tw-flex tw-flex-col tw-bg-surface-1 tw-border tw-border-border-subtle tw-rounded-xl tw-overflow-hidden tw-transition-all tw-duration-300 hover:tw-border-border-medium hover:tw-shadow-cinema-md hover:-tw-translate-y-0.5">
    <div class="tw-relative tw-w-full tw-h-0 tw-pt-[56.25%] tw-overflow-hidden tw-bg-surface-2">
      <img
        v-if="poster"
        v-lazyload="poster"
        class="lazyload tw-absolute tw-inset-0 tw-w-full tw-h-full tw-object-cover tw-transition-transform tw-duration-500 group-hover:tw-scale-105"
        :alt="episode.name">

      <div v-else class="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-text-text-muted tw-bg-surface-2">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round">
          <rect
            x="2"
            y="7"
            width="20"
            height="15"
            rx="2"
            ry="2" />
          <polyline points="17 2 12 7 7 2" />
        </svg>
      </div>

      <div class="tw-absolute tw-top-2 tw-left-2 tw-px-2 tw-py-0.5 tw-text-[1.1rem] tw-font-bold tw-tracking-wide tw-text-[#0a0b0e] tw-bg-primary-amber tw-rounded">
        EP {{ episode.episode_number | numberWithDoubleDigits }}
      </div>
    </div>

    <div class="tw-flex tw-flex-col tw-p-4 tw-gap-2 tw-flex-1">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <h3 class="tw-m-0 tw-text-[1.5rem] tw-font-semibold tw-text-text-primary tw-leading-snug">
          {{ episode.name }}
        </h3>
        <span v-if="episode.air_date" class="tw-text-[1.2rem] tw-font-medium tw-text-text-muted">
          {{ episode.air_date | fullDate }}
        </span>
      </div>

      <p v-if="episode.overview" class="tw-m-0 tw-text-[1.35rem] tw-leading-relaxed tw-text-text-secondary">
        {{ episode.overview | truncate(220) }}
      </p>
    </div>
  </div>
</template>

<script>
import { getStillUrl } from '~/api';

export default {
  props: {
    episode: {
      type: Object,
      required: true,
    },
  },

  computed: {
    poster () {
      if (this.episode.still_path) {
        return getStillUrl(this.episode.still_path, 'w300');
      }
      return null;
    },
  },
};
</script>
