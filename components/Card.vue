<template>
  <div
    class="tw-relative tw-flex tw-flex-col tw-w-full tw-group"
    :class="rank > 0 ? 'tw-pl-8 sm:tw-pl-12' : ''">
    <!-- Big Typographic Rank Number for Top 10 Carousels -->
    <div
      v-if="rank > 0"
      class="tw-absolute -tw-left-3 sm:-tw-left-5 tw-bottom-12 sm:tw-bottom-14 tw-z-0 tw-font-display tw-text-[7.2rem] sm:tw-text-[9.6rem] tw-font-black tw-leading-none tw-text-[#07080b] tw-select-none tw-pointer-events-none"
      style="-webkit-text-stroke: 2px rgba(229, 169, 60, 0.45); text-shadow: 0 4px 16px rgba(0, 0, 0, 0.9);"
      aria-hidden="true">
      {{ rank }}
    </div>

    <nuxt-link
      class="tw-relative tw-z-10 tw-flex tw-flex-col tw-h-full tw-no-underline tw-outline-none focus-visible:tw-outline-none"
      :to="{ name: `${media}-id`, params: { id: item.id } }"
      :aria-label="`${name} (${mediaLabel})`">
      <div
        class="tw-relative tw-w-full tw-rounded-xl tw-overflow-hidden tw-bg-surface-1 tw-border tw-border-border-subtle tw-transition-all tw-duration-300 group-hover:tw-border-[rgba(229,169,60,0.45)] group-hover:tw-shadow-glow group-hover:-tw-translate-y-1">
        <div class="tw-relative tw-w-full tw-h-0 tw-pt-[150%] tw-overflow-hidden tw-bg-surface-2">
          <img
            v-if="poster"
            v-lazyload="poster"
            class="lazyload tw-absolute tw-inset-0 tw-w-full tw-h-full tw-object-cover tw-transition-transform tw-duration-500 group-hover:tw-scale-105"
            :alt="name">

          <div
            v-else
            class="tw-absolute tw-inset-0 tw-w-full tw-h-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2.5 tw-text-text-subtle tw-bg-surface-2">
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
            <span class="tw-text-[1.1rem] tw-font-semibold tw-tracking-wider tw-uppercase">No Image</span>
          </div>

          <!-- Bottom gradient scrim -->
          <div class="tw-absolute tw-inset-x-0 tw-bottom-0 tw-h-[40%] tw-bg-gradient-to-t tw-from-[rgba(7,8,11,0.85)] tw-to-transparent tw-pointer-events-none" />

          <!-- Rating badge -->
          <div
            v-if="media !== 'person' && item.vote_average"
            class="tw-absolute tw-top-2 tw-right-2 tw-z-20 tw-flex tw-items-center tw-gap-1 tw-px-2 tw-py-1 tw-text-[1.2rem] tw-font-bold tw-text-white tw-bg-[rgba(7,8,11,0.85)] tw-backdrop-blur-md tw-border tw-border-white/15 tw-rounded-md">
            <svg class="tw-text-primary-amber" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span>{{ item.vote_average | rating }}</span>
          </div>

          <!-- Hover Overlay with Play Button -->
          <div class="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-[rgba(7,8,11,0.4)] tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity tw-duration-200 tw-pointer-events-none">
            <span
              class="tw-flex tw-items-center tw-justify-center tw-w-11 tw-h-11 tw-rounded-full tw-text-[#07080b] tw-bg-gradient-to-br tw-from-primary-amber tw-to-[#ff8a00] tw-shadow-[0_4px_20px_rgba(0,0,0,0.8)] tw-scale-90 group-hover:tw-scale-100 tw-transition-transform tw-duration-200"
              aria-hidden="true">
              <svg
                class="tw-ml-0.5"
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

      <div class="tw-flex tw-flex-col tw-pt-3 tw-px-0.5">
        <div class="tw-flex tw-items-center tw-gap-1.5 tw-mb-1 tw-text-[1.2rem] tw-text-text-muted">
          <span v-if="year" class="tw-font-semibold tw-text-text-secondary">{{ year }}</span>
          <span v-if="year && mediaLabel" class="tw-opacity-35">•</span>
          <span class="tw-text-[1.1rem] tw-font-semibold tw-text-text-subtle tw-uppercase tw-tracking-wider">{{ mediaLabel }}</span>
        </div>

        <h3
          class="tw-m-0 tw-text-[1.45rem] tw-font-semibold tw-leading-snug tw-text-text-primary -tw-tracking-wide tw-line-clamp-2 tw-transition-colors tw-duration-200 group-hover:tw-text-primary-amber"
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
