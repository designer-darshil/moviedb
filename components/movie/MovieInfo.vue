<template>
  <div class="flex flex-col lg:flex-row gap-10 lg:gap-16 my-12 sm:my-16 px-4 sm:px-8 lg:px-12">
    <!-- Left Column: Floating Key Artwork & Quick Utility -->
    <div class="w-full lg:w-[340px] xl:w-[380px] shrink-0">
      <div class="relative rounded-2xl overflow-hidden bg-surface-1 border border-white/15 shadow-2xl">
        <div class="relative w-full h-0 pt-[150%] overflow-hidden bg-surface-2">
          <img
            v-if="poster"
            v-lazyload="poster"
            class="lazyload absolute inset-0 w-full h-full object-cover"
            :alt="name">

          <div v-else class="absolute inset-0 flex flex-col items-center justify-center gap-3 text-text-subtle bg-surface-2">
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
            <span class="text-[1.1rem] font-semibold tracking-wider uppercase">No Poster Available</span>
          </div>
        </div>

        <div v-if="item.tagline" class="p-5 text-center font-serif italic text-[1.45rem] text-text-muted border-t border-white/10 bg-surface-2/50">
          &ldquo;{{ item.tagline }}&rdquo;
        </div>
      </div>
    </div>

    <!-- Right Column: Editorial Narrative & Production Intelligence -->
    <div class="flex-1 flex flex-col gap-8">
      <!-- Storyline Section -->
      <div v-if="item.overview" class="flex flex-col gap-4">
        <div class="flex items-center gap-3">
          <span class="inline-block w-1 h-7 rounded-full bg-gradient-to-b from-primary-amber to-[#ff8a00] shadow-[0_0_12px_rgba(229,169,60,0.4)]" />
          <h2 class="m-0 font-display text-[2.2rem] font-bold text-white -tracking-wide">
            The Storyline
          </h2>
        </div>
        <p class="m-0 text-[1.6rem] leading-relaxed text-text-secondary" v-html="item.overview" />
      </div>

      <!-- Genre Pills -->
      <div v-if="item.genres && item.genres.length" class="flex flex-wrap gap-2.5">
        <nuxt-link
          v-for="genre in item.genres"
          :key="genre.id"
          :to="`/genre/${genre.id}/movie`"
          class="inline-flex items-center px-4 py-2 text-[1.25rem] font-semibold text-text-secondary bg-surface-2 border border-white/15 rounded-full hover:text-white hover:bg-surface-3 hover:border-primary-amber transition-all duration-200">
          {{ genre.name }}
        </nuxt-link>
      </div>

      <!-- Production Intelligence Grid -->
      <div class="bg-surface-1 border border-white/15 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div class="pb-5 mb-6 border-b border-white/10">
          <h3 class="m-0 font-display text-[1.8rem] font-bold text-white -tracking-wide">
            Production Intelligence
          </h3>
        </div>

        <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 list-none m-0 p-0">
          <li v-if="directors" class="flex flex-col gap-1.5">
            <span class="text-[1.15rem] font-bold uppercase tracking-widest text-text-subtle">Directed By</span>
            <span class="text-[1.4rem] font-semibold text-text-primary" v-html="directors" />
          </li>

          <li v-if="item.release_date" class="flex flex-col gap-1.5">
            <span class="text-[1.15rem] font-bold uppercase tracking-widest text-text-subtle">Release Date</span>
            <span class="text-[1.4rem] font-semibold text-text-primary">{{
              item.release_date | fullDate
            }}</span>
          </li>

          <li v-if="item.runtime" class="flex flex-col gap-1.5">
            <span class="text-[1.15rem] font-bold uppercase tracking-widest text-text-subtle">Total Runtime</span>
            <span class="text-[1.4rem] font-semibold text-text-primary">{{ item.runtime | runtime }}</span>
          </li>

          <li v-if="item.status" class="flex flex-col gap-1.5">
            <span class="text-[1.15rem] font-bold uppercase tracking-widest text-text-subtle">Theatrical Status</span>
            <span class="text-[1.4rem] font-semibold text-text-primary">{{ item.status }}</span>
          </li>

          <li v-if="item.budget" class="flex flex-col gap-1.5">
            <span class="text-[1.15rem] font-bold uppercase tracking-widest text-text-subtle">Production Budget</span>
            <span class="text-[1.4rem] font-semibold text-text-primary">${{ item.budget | numberWithCommas }}</span>
          </li>

          <li v-if="item.revenue" class="flex flex-col gap-1.5">
            <span class="text-[1.15rem] font-bold uppercase tracking-widest text-text-subtle">Worldwide Box Office</span>
            <span class="text-[1.4rem] font-bold text-accent-green">
              ${{ item.revenue | numberWithCommas }}
            </span>
          </li>

          <li v-if="item.original_language" class="flex flex-col gap-1.5">
            <span class="text-[1.15rem] font-bold uppercase tracking-widest text-text-subtle">Original Language</span>
            <span class="text-[1.4rem] font-semibold text-text-primary">{{
              item.original_language | fullLang
            }}</span>
          </li>

          <li
            v-if="item.production_companies && item.production_companies.length"
            class="flex flex-col gap-1.5">
            <span class="text-[1.15rem] font-bold uppercase tracking-widest text-text-subtle">Studio / Production</span>
            <span class="text-[1.4rem] font-semibold text-text-primary">{{
              item.production_companies | arrayToList
            }}</span>
          </li>
        </ul>
      </div>

      <!-- External Links & Socials -->
      <div v-if="item.external_ids" class="pt-2">
        <ExternalLinks :links="item.external_ids" />
      </div>
    </div>
  </div>
</template>

<script>
import { getPosterUrl } from '~/api';
import { name, directors } from '~/mixins/Details';
import ExternalLinks from '~/components/ExternalLinks';

export default {
  components: {
    ExternalLinks,
  },

  mixins: [name, directors],

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
};
</script>
