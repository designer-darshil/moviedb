<template>
  <div class="group flex flex-col bg-surface-1 border border-border-subtle rounded-xl overflow-hidden transition-all duration-300 hover:border-border-medium hover:shadow-cinema-md hover:-translate-y-0.5">
    <div class="relative w-full h-0 pt-[56.25%] overflow-hidden bg-surface-2">
      <img
        v-if="poster"
        v-lazyload="poster"
        class="lazyload absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        :alt="episode.name">

      <div v-else class="absolute inset-0 flex items-center justify-center text-text-muted bg-surface-2">
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

      <div class="absolute top-2 left-2 px-2 py-0.5 text-[1.1rem] font-bold tracking-wide text-[#0a0b0e] bg-primary-amber rounded">
        EP {{ episode.episode_number | numberWithDoubleDigits }}
      </div>
    </div>

    <div class="flex flex-col p-4 gap-2 flex-1">
      <div class="flex flex-col gap-1">
        <h3 class="m-0 text-[1.5rem] font-semibold text-text-primary leading-snug">
          {{ episode.name }}
        </h3>
        <span v-if="episode.air_date" class="text-[1.2rem] font-medium text-text-muted">
          {{ episode.air_date | fullDate }}
        </span>
      </div>

      <p v-if="episode.overview" class="m-0 text-[1.35rem] leading-relaxed text-text-secondary">
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
