<template>
  <div
    class="group flex flex-col bg-surface-1 border border-border-subtle rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary-amber/40 hover:shadow-glow hover:-translate-y-0.5"
  >
    <div class="relative w-full h-0 pt-[56.25%] overflow-hidden bg-surface-2">
      <img
        v-if="poster"
        v-lazyload="poster"
        class="lazyload absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        :alt="episode.name"
      />

      <div
        v-else
        class="absolute inset-0 flex items-center justify-center text-text-subtle bg-surface-2"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
          <polyline points="17 2 12 7 7 2" />
        </svg>
      </div>

      <div
        class="absolute top-2.5 left-2.5 px-2 py-0.5 text-[1.1rem] font-bold text-text-primary bg-[rgba(7,8,11,0.85)] backdrop-blur-md rounded-md border border-border-subtle"
      >
        EP {{ episode.episode_number | numberWithDoubleDigits }}
      </div>
    </div>

    <div class="flex flex-col p-4 gap-2 flex-1">
      <div class="flex flex-col gap-0.5">
        <h3
          class="m-0 text-[1.4rem] font-semibold text-text-primary leading-snug group-hover:text-primary-amber transition-colors duration-200"
        >
          {{ episode.name }}
        </h3>
        <span
          v-if="episode.air_date"
          class="text-[1.15rem] font-medium text-text-muted"
        >
          {{ episode.air_date | fullDate }}
        </span>
      </div>

      <p
        v-if="episode.overview"
        class="m-0 text-[1.3rem] leading-relaxed text-text-secondary line-clamp-3"
      >
        {{ episode.overview | truncate(200) }}
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
    poster() {
      if (this.episode.still_path) {
        return getStillUrl(this.episode.still_path, 'w300');
      }
      return null;
    },
  },
};
</script>
