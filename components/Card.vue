<template>
  <div class="relative flex flex-col w-full group">
    <nuxt-link
      class="relative flex flex-col h-full no-underline outline-none focus-visible:outline-none"
      :to="{ name: `${media}-id`, params: { id: item.id } }"
      :aria-label="`${name} (${mediaLabel})`">
      <!-- Poster Container -->
      <div
        class="relative w-full rounded-lg overflow-hidden bg-surface-2 border border-border-subtle transition-all duration-300 group-hover:border-border-medium group-hover:shadow-cinema-md group-hover:-translate-y-1">
        <div class="relative w-full h-0 pt-[150%] overflow-hidden bg-surface-2">
          <img
            v-if="poster"
            v-lazyload="poster"
            class="lazyload absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
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

          <!-- Subtle bottom shadow scrim for contrast -->
          <div class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[rgba(7,8,11,0.7)] to-transparent pointer-events-none" />

          <!-- Optional subtle rank badge for curated ranked lists -->
          <div
            v-if="rank > 0"
            class="absolute top-2 left-2 z-10 flex items-center justify-center w-6 h-6 text-[1.1rem] font-bold text-white bg-[rgba(7,8,11,0.85)] backdrop-blur-sm border border-border-medium rounded">
            {{ rank }}
          </div>

          <!-- Rating badge -->
          <div
            v-if="media !== 'person' && item.vote_average"
            class="absolute top-2 right-2 z-10 flex items-center gap-1 px-1.5 py-0.5 text-[1.15rem] font-bold text-white bg-[rgba(7,8,11,0.85)] backdrop-blur-sm border border-border-subtle rounded">
            <svg class="text-primary-amber" width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span>{{ item.vote_average | rating }}</span>
          </div>
        </div>
      </div>

      <!-- Card Metadata -->
      <div class="flex flex-col pt-2.5 px-0.5">
        <h3
          class="m-0 text-[1.35rem] font-medium leading-snug text-text-primary -tracking-wide truncate transition-colors duration-200 group-hover:text-primary-amber"
          :title="name">
          {{ name }}
        </h3>

        <div class="flex items-center gap-1.5 mt-1 text-[1.2rem] text-text-muted">
          <span v-if="year">{{ year }}</span>
          <span v-if="year && mediaLabel" class="opacity-40">&middot;</span>
          <span class="text-[1.15rem] text-text-subtle">{{ mediaLabel }}</span>
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
  },
};
</script>
