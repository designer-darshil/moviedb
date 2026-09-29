<template>
  <div
    class="flex flex-col md:flex-row gap-8 lg:gap-12 my-8 sm:my-10 lg:my-12 px-4 sm:px-8 lg:px-12 max-w-[1600px] mx-auto"
  >
    <!-- Left Column: Poster Artwork -->
    <div class="w-full md:w-[280px] lg:w-[320px] shrink-0">
      <div
        class="relative rounded-2xl overflow-hidden bg-surface-2 border border-border-medium shadow-cinema-lg"
      >
        <div class="relative w-full h-0 pt-[150%] overflow-hidden bg-surface-2">
          <img
            v-if="poster"
            v-lazyload="poster"
            class="lazyload absolute inset-0 w-full h-full object-cover"
            :alt="name"
          />

          <div
            v-else
            class="absolute inset-0 flex flex-col items-center justify-center gap-2 text-text-subtle bg-surface-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
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
            <span class="text-[1.1rem] font-medium tracking-wider uppercase"
              >No Poster</span
            >
          </div>
        </div>

        <div
          v-if="item.tagline"
          class="p-4 text-center italic text-[1.3rem] text-text-muted border-t border-border-subtle bg-surface-1"
        >
          &ldquo;{{ item.tagline }}&rdquo;
        </div>
      </div>
    </div>

    <!-- Right Column: Narrative & TV Series Information -->
    <div class="flex-1 flex flex-col gap-6">
      <!-- Storyline -->
      <div v-if="item.overview" class="flex flex-col gap-2.5">
        <h2
          class="m-0 font-display text-[2rem] font-bold text-text-primary -tracking-wide"
        >
          Series Synopsis
        </h2>
        <p
          class="m-0 text-[1.5rem] leading-[1.6] text-text-secondary"
          v-html="item.overview"
        />
      </div>

      <!-- Genres -->
      <div
        v-if="item.genres && item.genres.length"
        class="flex flex-wrap gap-2"
      >
        <nuxt-link
          v-for="genre in item.genres"
          :key="genre.id"
          :to="`/genre/${genre.id}/tv`"
          class="inline-flex items-center px-3.5 py-1 text-[1.2rem] font-medium text-text-secondary bg-surface-2 border border-border-subtle rounded-lg hover:text-text-primary hover:bg-surface-3 hover:border-primary-amber/40 transition-colors duration-150"
        >
          {{ genre.name }}
        </nuxt-link>
      </div>

      <!-- Television Details -->
      <div
        class="bg-surface-1 border border-border-subtle rounded-2xl p-6 sm:p-7 shadow-cinema-sm"
      >
        <h3
          class="m-0 mb-5 font-display text-[1.6rem] font-bold text-text-primary -tracking-wide"
        >
          Series Specifications
        </h3>

        <ul
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none m-0 p-0 text-[1.35rem]"
        >
          <li v-if="creators" class="flex flex-col gap-1">
            <span
              class="text-[1.15rem] font-semibold uppercase tracking-wider text-text-subtle"
              >Created by</span
            >
            <span class="font-medium text-text-primary" v-html="creators" />
          </li>

          <li v-if="item.first_air_date" class="flex flex-col gap-1">
            <span
              class="text-[1.15rem] font-semibold uppercase tracking-wider text-text-subtle"
              >First Aired</span
            >
            <span class="font-medium text-text-primary">{{
              item.first_air_date | fullDate
            }}</span>
          </li>

          <li v-if="item.last_air_date" class="flex flex-col gap-1">
            <span
              class="text-[1.15rem] font-semibold uppercase tracking-wider text-text-subtle"
              >Last Aired</span
            >
            <span class="font-medium text-text-primary">{{
              item.last_air_date | fullDate
            }}</span>
          </li>

          <li v-if="item.number_of_seasons" class="flex flex-col gap-1">
            <span
              class="text-[1.15rem] font-semibold uppercase tracking-wider text-text-subtle"
              >Seasons &amp; Episodes</span
            >
            <span class="font-medium text-text-primary">
              {{ item.number_of_seasons }}
              {{ item.number_of_seasons === 1 ? 'Season' : 'Seasons' }}
              <span
                v-if="item.number_of_episodes"
                class="text-text-muted font-normal"
                >({{ item.number_of_episodes }} episodes)</span
              >
            </span>
          </li>

          <li
            v-if="item.episode_run_time && item.episode_run_time.length"
            class="flex flex-col gap-1"
          >
            <span
              class="text-[1.15rem] font-semibold uppercase tracking-wider text-text-subtle"
              >Episode Runtime</span
            >
            <span class="font-medium text-text-primary">{{
              formatRunTime(item.episode_run_time)
            }}</span>
          </li>

          <li v-if="item.status" class="flex flex-col gap-1">
            <span
              class="text-[1.15rem] font-semibold uppercase tracking-wider text-text-subtle"
              >Status</span
            >
            <span class="font-medium text-text-primary">{{ item.status }}</span>
          </li>

          <li
            v-if="item.networks && item.networks.length"
            class="flex flex-col gap-1"
          >
            <span
              class="text-[1.15rem] font-semibold uppercase tracking-wider text-text-subtle"
              >Network</span
            >
            <span class="font-medium text-text-primary">{{
              item.networks | arrayToList
            }}</span>
          </li>

          <li v-if="item.original_language" class="flex flex-col gap-1">
            <span
              class="text-[1.15rem] font-semibold uppercase tracking-wider text-text-subtle"
              >Language</span
            >
            <span class="font-medium text-text-primary">{{
              item.original_language | fullLang
            }}</span>
          </li>
        </ul>

        <!-- External Links -->
        <div
          v-if="item.external_ids"
          class="pt-5 mt-5 border-t border-border-subtle flex items-center justify-between flex-wrap gap-4"
        >
          <span class="text-[1.2rem] font-medium text-text-subtle"
            >External References:</span
          >
          <ExternalLinks :links="item.external_ids" />
        </div>
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
    poster() {
      if (this.item.poster_path) {
        return getPosterUrl(this.item.poster_path, 'w500');
      }
      return false;
    },
  },

  methods: {
    formatRunTime(times) {
      return times.map((time) => `${time}m`).join(', ');
    },
  },
};
</script>
