<template>
  <div class="relative flex flex-col w-full group">
    <nuxt-link
      class="relative flex flex-col h-full no-underline outline-none focus-visible:ring-2 focus-visible:ring-primary-amber focus-visible:ring-offset-2 focus-visible:ring-offset-base-bg rounded-xl"
      :to="itemLink"
      :aria-label="accessibleLabel"
    >
      <!-- Poster Container -->
      <div
        class="relative w-full rounded-xl overflow-hidden bg-surface-2 border border-border-subtle transition-all duration-300 group-hover:border-primary-amber/40 group-hover:shadow-glow"
      >
        <div class="relative w-full h-0 pt-[150%] overflow-hidden bg-surface-2">
          <!-- Poster Image -->
          <img
            v-if="poster"
            v-lazyload="poster"
            class="lazyload absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.04] group-hover:brightness-105"
            :alt="name"
          />

          <!-- Fallback when no image exists -->
          <div
            v-else
            class="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-2 text-text-subtle bg-surface-2 p-4 text-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
              <line x1="7" y1="2" x2="7" y2="22" />
              <line x1="17" y1="2" x2="17" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <line x1="2" y1="7" x2="7" y2="7" />
              <line x1="2" y1="17" x2="7" y2="17" />
              <line x1="17" y1="17" x2="22" y2="17" />
              <line x1="17" y1="7" x2="22" y2="7" />
            </svg>
            <span
              class="text-[1.05rem] font-medium tracking-wider uppercase text-text-subtle"
              >No Artwork</span
            >
          </div>

          <!-- Atmospheric Vignette on Hover -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-base-bg/90 via-base-bg/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3 pointer-events-none"
          >
            <span
              class="inline-flex items-center gap-1.5 px-3 py-1.5 text-[1.15rem] font-semibold text-white bg-black/60 backdrop-blur-md border border-white/20 rounded-full shadow-cinema-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="text-primary-amber"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span>Explore</span>
            </span>
          </div>

          <!-- Rank Indicator Badge (for Top 10/Ranked Rails) -->
          <div
            v-if="rank"
            class="absolute top-2 left-2 z-10 flex items-center justify-center w-7 h-7 rounded-lg bg-black/75 backdrop-blur-md border border-white/20 text-[1.2rem] font-extrabold text-primary-amber shadow-cinema-sm"
          >
            {{ rank }}
          </div>

          <!-- Media Type Chip on mixed lists -->
          <div
            v-if="showMediaBadge"
            class="absolute top-2 right-2 z-10 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/15 text-[1rem] font-bold uppercase tracking-wider text-text-muted"
          >
            {{ mediaLabel }}
          </div>
        </div>
      </div>

      <!-- Card Metadata -->
      <div class="flex flex-col pt-2.5 px-0.5">
        <h3
          class="m-0 text-[1.35rem] font-semibold leading-snug text-text-primary -tracking-wide truncate transition-colors duration-200 group-hover:text-primary-amber"
          :title="name"
        >
          {{ name }}
        </h3>

        <div
          class="flex items-center gap-1.5 mt-1 text-[1.2rem] text-text-muted"
        >
          <span v-if="year">{{ year }}</span>
          <span v-if="year && formattedRating" class="opacity-40"
            >&middot;</span
          >
          <span
            v-if="formattedRating"
            class="flex items-center gap-1 font-semibold text-text-secondary"
          >
            <svg
              class="text-primary-amber"
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              />
            </svg>
            <span>{{ formattedRating }}</span>
          </span>
          <span
            v-else-if="mediaLabel && !year"
            class="text-[1.15rem] text-text-subtle"
            >{{ mediaLabel }}</span
          >
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
    showMediaBadge: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    poster() {
      if (this.item.poster_path) {
        return getPosterUrl(this.item.poster_path, 'w500');
      } else if (this.item.profile_path) {
        return getProfileUrl(this.item.profile_path, 'h632');
      } else {
        return false;
      }
    },

    media() {
      if (this.item.media_type) {
        return this.item.media_type;
      } else if (this.item.name && !this.item.title) {
        return this.item.known_for_department ? 'person' : 'tv';
      } else {
        return 'movie';
      }
    },

    mediaLabel() {
      if (this.media === 'tv') return 'TV';
      if (this.media === 'person') return 'Person';
      return 'Movie';
    },

    itemLink() {
      return { name: `${this.media}-id`, params: { id: this.item.id } };
    },

    accessibleLabel() {
      const yearPart = this.year ? `, released ${this.year}` : '';
      const ratingPart = this.formattedRating
        ? `, rated ${this.formattedRating} out of 10`
        : '';
      return `${this.name} (${this.mediaLabel}${yearPart}${ratingPart})`;
    },

    year() {
      const date = this.item.release_date || this.item.first_air_date;
      if (date) {
        return date.split('-')[0];
      }
      return null;
    },

    formattedRating() {
      if (this.media !== 'person' && this.item.vote_average) {
        return this.$options.filters.rating(this.item.vote_average);
      }
      return null;
    },
  },
};
</script>
