<template>
  <div class="relative flex flex-col w-full group">
    <nuxt-link
      class="relative flex flex-col h-full no-underline outline-none focus-visible:outline-none"
      :to="{ name: `${media}-id`, params: { id: item.id } }"
      :aria-label="`${name} (${mediaLabel})`">
      <!-- Poster Container -->
      <div
        class="relative w-full rounded-lg overflow-hidden bg-surface-2 border border-border-subtle transition-all duration-300 group-hover:border-border-medium group-hover:shadow-cinema-md">
        <div class="relative w-full h-0 pt-[150%] overflow-hidden bg-surface-2">
          <img
            v-if="poster"
            v-lazyload="poster"
            class="lazyload absolute inset-0 w-full h-full object-cover transition-all duration-300 group-hover:scale-[1.03] group-hover:brightness-105"
            :alt="name">

          <div
            v-else
            class="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-2 text-text-subtle bg-surface-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
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
                y="2"
                width="20"
                height="20"
                rx="2.18"
                ry="2.18" />
              <line x1="7" y1="2" x2="7" y2="22" />
              <line x1="17" y1="2" x2="17" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <line x1="2" y1="7" x2="7" y2="7" />
              <line x1="2" y1="17" x2="7" y2="17" />
              <line x1="17" y1="17" x2="22" y2="17" />
              <line x1="17" y1="7" x2="22" y2="7" />
            </svg>
            <span class="text-[1.1rem] font-medium tracking-wider uppercase">No Poster</span>
          </div>

          <!-- Subtle hover overlay -->
          <div class="absolute inset-0 bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </div>

      <!-- Card Metadata: Title & Year · Rating -->
      <div class="flex flex-col pt-2.5 px-0.5">
        <h3
          class="m-0 text-[1.35rem] font-medium leading-snug text-text-primary -tracking-wide truncate transition-colors duration-200 group-hover:text-primary-amber"
          :title="name">
          {{ name }}
        </h3>

        <div class="flex items-center gap-1.5 mt-1 text-[1.2rem] text-text-muted">
          <span v-if="year">{{ year }}</span>
          <span v-if="year && formattedRating" class="opacity-40">&middot;</span>
          <span v-if="formattedRating" class="flex items-center gap-1 font-medium text-text-secondary">
            <svg class="text-primary-amber" width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span>{{ formattedRating }}</span>
          </span>
          <span v-else-if="mediaLabel && !year" class="text-[1.15rem] text-text-subtle">{{ mediaLabel }}</span>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import { getPosterUrl, getProfileUrl } from '~/api';
import { name, stars } from '~/mixins/Details';

export default {
  mixins: [name, stars],

  props: {
    item: {
      type: Object,
      required: true,
    },

    rank: {
      type: Number,
      required: false,
      default: 0,
    },
  },

  computed: {
    poster () {
      if (this.item.poster_path) {
        return getPosterUrl(this.item.poster_path, 'w500');
      } else if (this.item.profile_path) {
        return getProfileUrl(this.item.profile_path, 'h632');
      } else {
        return false;
      }
    },

    media () {
      if (this.item.media_type) {
        return this.item.media_type;
      } else if (this.item.name) {
        return 'tv';
      } else {
        return 'movie';
      }
    },

    mediaLabel () {
      if (this.media === 'tv') {
        return 'TV';
      } else if (this.media === 'person') {
        return 'Person';
      } else {
        return 'Movie';
      }
    },

    year () {
      const date = this.item.release_date || this.item.first_air_date;
      if (date) {
        return date.split('-')[0];
      }
      return null;
    },

    formattedRating () {
      if (this.media !== 'person' && this.item.vote_average) {
        return this.$options.filters.rating(this.item.vote_average);
      }
      return null;
    },
  },
};
</script>
