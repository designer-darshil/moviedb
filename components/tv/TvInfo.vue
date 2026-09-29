<template>
  <div class="tw-flex tw-flex-col lg:tw-flex-row tw-gap-10 lg:tw-gap-16 tw-my-12 sm:tw-my-16 tw-px-4 sm:tw-px-8 lg:tw-px-12">
    <!-- Left Column: Key Artwork & Tagline -->
    <div class="tw-w-full lg:tw-w-[340px] xl:tw-w-[380px] tw-shrink-0">
      <div class="tw-relative tw-rounded-2xl tw-overflow-hidden tw-bg-surface-1 tw-border tw-border-white/15 tw-shadow-2xl">
        <div class="tw-relative tw-w-full tw-h-0 tw-pt-[150%] tw-overflow-hidden tw-bg-surface-2">
          <img
            v-if="poster"
            v-lazyload="poster"
            class="lazyload tw-absolute tw-inset-0 tw-w-full tw-h-full tw-object-cover"
            :alt="name">

          <div v-else class="tw-absolute tw-inset-0 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-3 tw-text-text-subtle tw-bg-surface-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
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
            <span class="tw-text-[1.1rem] tw-font-semibold tw-tracking-wider tw-uppercase">No Poster Available</span>
          </div>
        </div>

        <div v-if="item.tagline" class="tw-p-5 tw-text-center tw-font-serif tw-italic tw-text-[1.45rem] tw-text-text-muted tw-border-t tw-border-white/10 tw-bg-surface-2/50">
          &ldquo;{{ item.tagline }}&rdquo;
        </div>
      </div>
    </div>

    <!-- Right Column: Narrative & Television Intelligence -->
    <div class="tw-flex-1 tw-flex tw-flex-col tw-gap-8">
      <div v-if="item.overview" class="tw-flex tw-flex-col tw-gap-4">
        <div class="tw-flex tw-items-center tw-gap-3">
          <span class="tw-inline-block tw-w-1 tw-h-7 tw-rounded-full tw-bg-gradient-to-b tw-from-primary-amber tw-to-[#ff8a00] tw-shadow-[0_0_12px_rgba(229,169,60,0.4)]" />
          <h2 class="tw-m-0 tw-font-display tw-text-[2.2rem] tw-font-bold tw-text-white -tw-tracking-wide">
            Series Synopsis
          </h2>
        </div>
        <p class="tw-m-0 tw-text-[1.6rem] tw-leading-relaxed tw-text-text-secondary" v-html="item.overview" />
      </div>

      <!-- Genre Pills -->
      <div v-if="item.genres && item.genres.length" class="tw-flex tw-flex-wrap tw-gap-2.5">
        <nuxt-link
          v-for="genre in item.genres"
          :key="genre.id"
          :to="`/genre/${genre.id}/tv`"
          class="tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-text-[1.25rem] tw-font-semibold tw-text-text-secondary tw-bg-surface-2 tw-border tw-border-white/15 tw-rounded-full hover:tw-text-white hover:tw-bg-surface-3 hover:tw-border-primary-amber tw-transition-all tw-duration-200">
          {{ genre.name }}
        </nuxt-link>
      </div>

      <!-- TV Intelligence Card -->
      <div class="tw-bg-surface-1 tw-border tw-border-white/15 tw-rounded-2xl tw-p-6 sm:tw-p-8 tw-shadow-xl">
        <div class="tw-pb-5 tw-mb-6 tw-border-b tw-border-white/10">
          <h3 class="tw-m-0 tw-font-display tw-text-[1.8rem] tw-font-bold tw-text-white -tw-tracking-wide">
            Television Intelligence
          </h3>
        </div>

        <ul class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-6 tw-list-none tw-m-0 tw-p-0">
          <li v-if="creators" class="tw-flex tw-flex-col tw-gap-1.5">
            <span class="tw-text-[1.15rem] tw-font-bold tw-uppercase tw-tracking-widest tw-text-text-subtle">Created By</span>
            <span class="tw-text-[1.4rem] tw-font-semibold tw-text-text-primary" v-html="creators" />
          </li>

          <li v-if="item.first_air_date" class="tw-flex tw-flex-col tw-gap-1.5">
            <span class="tw-text-[1.15rem] tw-font-bold tw-uppercase tw-tracking-widest tw-text-text-subtle">Series Premiere</span>
            <span class="tw-text-[1.4rem] tw-font-semibold tw-text-text-primary">{{
              item.first_air_date | fullDate
            }}</span>
          </li>

          <li v-if="item.last_air_date" class="tw-flex tw-flex-col tw-gap-1.5">
            <span class="tw-text-[1.15rem] tw-font-bold tw-uppercase tw-tracking-widest tw-text-text-subtle">Latest Airing</span>
            <span class="tw-text-[1.4rem] tw-font-semibold tw-text-text-primary">{{
              item.last_air_date | fullDate
            }}</span>
          </li>

          <li v-if="item.number_of_seasons" class="tw-flex tw-flex-col tw-gap-1.5">
            <span class="tw-text-[1.15rem] tw-font-bold tw-uppercase tw-tracking-widest tw-text-text-subtle">Seasons &amp; Episodes</span>
            <span class="tw-text-[1.4rem] tw-font-semibold tw-text-text-primary">
              {{ item.number_of_seasons }} {{ item.number_of_seasons === 1 ? 'Season' : 'Seasons' }}
              <span v-if="item.number_of_episodes">({{ item.number_of_episodes }} Episodes)</span>
            </span>
          </li>

          <li
            v-if="item.episode_run_time && item.episode_run_time.length"
            class="tw-flex tw-flex-col tw-gap-1.5">
            <span class="tw-text-[1.15rem] tw-font-bold tw-uppercase tw-tracking-widest tw-text-text-subtle">Average Episode Length</span>
            <span class="tw-text-[1.4rem] tw-font-semibold tw-text-text-primary">{{
              formatRunTime(item.episode_run_time)
            }}</span>
          </li>

          <li v-if="item.status" class="tw-flex tw-flex-col tw-gap-1.5">
            <span class="tw-text-[1.15rem] tw-font-bold tw-uppercase tw-tracking-widest tw-text-text-subtle">Broadcast Status</span>
            <span class="tw-text-[1.4rem] tw-font-semibold tw-text-text-primary">{{ item.status }}</span>
          </li>

          <li v-if="item.networks && item.networks.length" class="tw-flex tw-flex-col tw-gap-1.5">
            <span class="tw-text-[1.15rem] tw-font-bold tw-uppercase tw-tracking-widest tw-text-text-subtle">Original Network</span>
            <span class="tw-text-[1.4rem] tw-font-semibold tw-text-text-primary">{{ item.networks | arrayToList }}</span>
          </li>

          <li v-if="item.original_language" class="tw-flex tw-flex-col tw-gap-1.5">
            <span class="tw-text-[1.15rem] tw-font-bold tw-uppercase tw-tracking-widest tw-text-text-subtle">Original Language</span>
            <span class="tw-text-[1.4rem] tw-font-semibold tw-text-text-primary">{{
              item.original_language | fullLang
            }}</span>
          </li>
        </ul>
      </div>

      <!-- External Links -->
      <div v-if="item.external_ids" class="tw-pt-2">
        <ExternalLinks :links="item.external_ids" />
      </div>
    </div>
  </div>
</template>

<script>
import { getPosterUrl } from '~/api';
import { name, creators } from '~/mixins/Details';
import ExternalLinks from '~/components/ExternalLinks';

export default {
  components: {
    ExternalLinks,
  },

  mixins: [name, creators],

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  computed: {
    poster () {
      if (this.item.poster_path) {
        return getPosterUrl(this.item.poster_path, 'w500');
      }
      return false;
    },
  },

  methods: {
    formatRunTime (times) {
      return times.map(time => `${time}m`).join(', ');
    },
  },
};
</script>
