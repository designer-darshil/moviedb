<template>
  <div
    class="relative flex flex-col w-full group"
    :class="rank > 0 ? 'pl-8 sm:pl-12' : ''">
    <!-- Big Typographic Rank Number for Top 10 Carousels -->
    <div
      v-if="rank > 0"
      class="absolute -left-3 sm:-left-5 bottom-12 sm:bottom-14 z-0 font-display text-[7.2rem] sm:text-[9.6rem] font-black leading-none text-[#07080b] select-none pointer-events-none"
      style="-webkit-text-stroke: 2px rgba(229, 169, 60, 0.45); text-shadow: 0 4px 16px rgba(0, 0, 0, 0.9);"
      aria-hidden="true">
      {{ rank }}
    </div>

    <nuxt-link
      class="relative z-10 flex flex-col h-full no-underline outline-none focus-visible:outline-none"
      :to="{ name: `${media}-id`, params: { id: item.id } }"
      :aria-label="`${name} (${mediaLabel})`">
      <div
        class="relative w-full rounded-xl overflow-hidden bg-surface-1 border border-border-subtle transition-all duration-300 group-hover:border-[rgba(229,169,60,0.45)] group-hover:shadow-glow group-hover:-translate-y-1">
        <div class="relative w-full h-0 pt-[150%] overflow-hidden bg-surface-2">
          <img
            v-if="poster"
            v-lazyload="poster"
            class="lazyload absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            :alt="name">

          <div
            v-else
            class="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-2.5 text-text-subtle bg-surface-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
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
            <span class="text-[1.1rem] font-semibold tracking-wider uppercase">No Image</span>
          </div>

          <!-- Bottom gradient scrim -->
          <div class="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[rgba(7,8,11,0.85)] to-transparent pointer-events-none" />

          <!-- Rating badge -->
          <div
            v-if="media !== 'person' && item.vote_average"
            class="absolute top-2 right-2 z-20 flex items-center gap-1 px-2 py-1 text-[1.2rem] font-bold text-white bg-[rgba(7,8,11,0.85)] backdrop-blur-md border border-white/15 rounded-md">
            <svg class="text-primary-amber" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span>{{ item.vote_average | rating }}</span>
          </div>

          <!-- Hover Overlay with Play Button -->
          <div class="absolute inset-0 flex items-center justify-center bg-[rgba(7,8,11,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <span
              class="flex items-center justify-center w-11 h-11 rounded-full text-[#07080b] bg-gradient-to-br from-primary-amber to-[#ff8a00] shadow-[0_4px_20px_rgba(0,0,0,0.8)] scale-90 group-hover:scale-100 transition-transform duration-200"
              aria-hidden="true">
              <svg
                class="ml-0.5"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div class="flex flex-col pt-3 px-0.5">
        <div class="flex items-center gap-1.5 mb-1 text-[1.2rem] text-text-muted">
          <span v-if="year" class="font-semibold text-text-secondary">{{ year }}</span>
          <span v-if="year && mediaLabel" class="opacity-35">•</span>
          <span class="text-[1.1rem] font-semibold text-text-subtle uppercase tracking-wider">{{ mediaLabel }}</span>
        </div>

        <h3
          class="m-0 text-[1.45rem] font-semibold leading-snug text-text-primary -tracking-wide line-clamp-2 transition-colors duration-200 group-hover:text-primary-amber"
          :title="name">
          {{ name }}
        </h3>
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
        return 'TV Series';
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
  },
};
</script>
