<template>
  <div class="relative w-full">
    <div
      class="relative flex items-center min-h-[540px] sm:min-h-[620px] h-[72vh] sm:h-[76vh] max-h-[760px] overflow-hidden bg-base-bg">
      <!-- Backdrop with Cinematic Ambient Lighting -->
      <div class="absolute inset-0 w-full h-full overflow-hidden">
        <transition name="fade" mode="out-in">
          <img
            v-if="backdropUrl"
            :key="`hero-bg-${activeItem.id}`"
            :src="backdropUrl"
            :alt="itemName"
            class="absolute top-0 right-0 w-full lg:w-4/5 h-full object-cover object-[center_25%]">
        </transition>

        <!-- Dynamic Cinematic Scrims -->
        <div
          class="absolute inset-y-0 left-0 w-full z-10 bg-gradient-to-b sm:bg-gradient-to-r from-[rgba(7,8,11,0.3)] sm:from-[#07080b] via-[rgba(7,8,11,0.88)] sm:via-[rgba(7,8,11,0.96)] to-[#07080b] sm:to-transparent" />
        <div
          class="absolute inset-x-0 bottom-0 h-[220px] bg-gradient-to-t from-base-bg via-[rgba(7,8,11,0.8)] to-transparent z-10" />
        <div
          class="absolute inset-x-0 top-0 h-[120px] bg-gradient-to-b from-[rgba(7,8,11,0.7)] to-transparent z-10" />
        <div
          class="absolute inset-0 z-10 pointer-events-none"
          style="background: radial-gradient(circle at 80% 30%, transparent 30%, rgba(7, 8, 11, 0.6) 100%);" />
      </div>

      <!-- Main Content Pane -->
      <div
        class="relative z-20 flex flex-col justify-end sm:justify-center w-full max-w-[1600px] h-full mx-auto px-4 sm:px-8 lg:px-12 pb-10 sm:pb-12 lg:pb-14">
        <div class="max-w-[720px]">
          <transition name="fade-slide" mode="out-in">
            <div :key="`hero-content-${activeItem.id}`" class="flex flex-col">
              <!-- Eyebrow Badge -->
              <div
                class="inline-flex items-center gap-2 px-3 py-1 mb-4 text-[1.2rem] font-bold tracking-widest uppercase text-primary-amber bg-[rgba(229,169,60,0.12)] border border-[rgba(229,169,60,0.3)] rounded-full w-fit">
                <span class="w-1.5 h-1.5 rounded-full bg-primary-amber shadow-[0_0_10px_#e5a93c]" />
                <span>Featured {{ mediaType === "tv" ? "Series" : "Cinema" }}</span>
              </div>

              <!-- Main Title -->
              <h1
                class="m-0 mb-4 font-display text-[3.4rem] sm:text-[4.8rem] lg:text-[5.8rem] font-black leading-[1.08] -tracking-wider text-white">
                <template v-if="isSingle">
                  {{ itemName }}
                </template>
                <template v-else>
                  <nuxt-link
                    :to="{ name: `${mediaType}-id`, params: { id: activeItem.id } }"
                    class="text-white hover:text-primary-amber transition-colors duration-200">
                    {{ itemName }}
                  </nuxt-link>
                </template>
              </h1>

              <!-- Meta Spec Badges -->
              <div class="flex flex-wrap items-center gap-4 mb-4.5">
                <div
                  v-if="activeItem.vote_average"
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 text-[1.35rem] font-bold text-white bg-[rgba(7,8,11,0.85)] backdrop-blur-md border border-[rgba(229,169,60,0.4)] rounded-md">
                  <svg
                    class="text-primary-amber"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor">
                    <path
                      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <span>{{ activeItem.vote_average | rating }}</span>
                  <span
                    v-if="activeItem.vote_count"
                    class="text-[1.2rem] font-medium text-text-muted">({{ activeItem.vote_count | numberWithCommas }})</span>
                </div>

                <div class="flex items-center gap-3 text-[1.35rem] text-text-secondary">
                  <span v-if="releaseYear" class="font-semibold">{{
                    releaseYear
                  }}</span>
                  <span
                    v-if="activeItem.number_of_seasons"
                    class="font-semibold">{{ activeItem.number_of_seasons }}
                    {{
                      activeItem.number_of_seasons === 1 ? "Season" : "Seasons"
                    }}</span>
                  <span v-if="activeItem.runtime" class="font-semibold">{{
                    activeItem.runtime | runtime
                  }}</span>
                  <span
                    v-if="itemCert"
                    class="px-1.5 py-0.5 text-[1.1rem] font-bold text-text-muted border border-white/15 rounded">{{
                      itemCert
                    }}</span>
                </div>
              </div>

              <!-- Overview Text -->
              <p
                v-if="activeItem.overview"
                class="m-0 mb-7 text-[1.55rem] sm:text-[1.65rem] leading-relaxed text-text-secondary line-clamp-3">
                {{ activeItem.overview | truncate(280) }}
              </p>

              <!-- Action Bar -->
              <div class="flex flex-wrap items-center gap-3.5">
                <button
                  v-if="trailerData"
                  type="button"
                  class="inline-flex items-center justify-center gap-2 h-12 px-6 text-[1.45rem] font-semibold rounded-xl cursor-pointer text-[#07080b] bg-gradient-to-br from-primary-amber to-[#ff8a00] shadow-[0_4px_20px_rgba(229,169,60,0.4)] hover:shadow-[0_6px_28px_rgba(229,169,60,0.6)] hover:-translate-y-0.5 transition-all duration-200"
                  @click="openModal">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <span>Watch Trailer</span>
                </button>

                <nuxt-link
                  v-if="!isSingle"
                  :to="{ name: `${mediaType}-id`, params: { id: activeItem.id } }"
                  class="inline-flex items-center justify-center gap-2 h-12 px-6 text-[1.45rem] font-semibold rounded-xl cursor-pointer text-white bg-white/[0.08] border border-white/15 backdrop-blur-md hover:bg-white/[0.16] hover:border-white/30 hover:-translate-y-0.5 transition-all duration-200">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  <span>View Details</span>
                </nuxt-link>
              </div>
            </div>
          </transition>
        </div>

        <!-- Multi-item Carousel Ticker / Switcher (if list passed) -->
        <div v-if="featuredList && featuredList.length > 1" class="hidden lg:flex flex-col gap-2.5 absolute right-12 bottom-10 max-w-[480px]">
          <div class="text-[1.15rem] font-bold tracking-widest uppercase text-text-muted">
            Trending Highlights
          </div>
          <div class="flex gap-2">
            <button
              v-for="(feat, idx) in featuredList.slice(0, 5)"
              :key="`ticker-${feat.id}`"
              type="button"
              class="flex flex-col gap-1 px-3.5 py-2 rounded-md backdrop-blur-md cursor-pointer text-left max-w-[130px] transition-all duration-200"
              :class="selectedIndex === idx
                ? '!bg-surface-3 !border-primary-amber shadow-[0_0_16px_rgba(229,169,60,0.25)]'
                : 'bg-[rgba(14,17,23,0.8)] border border-border-subtle hover:bg-surface-3 hover:border-border-medium'"
              :aria-label="`Switch to ${feat.title || feat.name}`"
              @click="selectedIndex = idx">
              <span class="text-[1.1rem] font-black text-primary-amber tracking-wide">0{{ idx + 1 }}</span>
              <span class="text-[1.2rem] font-semibold text-text-primary truncate">{{ feat.title || feat.name }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- YouTube Trailer Modal -->
    <Modal
      v-if="modalVisible && trailerData"
      :data="trailerData"
      type="iframe"
      @close="closeModal" />
  </div>
</template>

<script>
import { getBackdropUrl } from '~/api';
import Modal from '~/components/Modal';

export default {
  components: {
    Modal,
  },

  props: {
    item: {
      type: Object,
      required: false,
      default: () => ({}),
    },

    featuredList: {
      type: Array,
      required: false,
      default: () => null,
    },
  },

  data () {
    return {
      selectedIndex: 0,
      modalVisible: false,
    };
  },

  computed: {
    activeItem () {
      if (this.featuredList && this.featuredList.length > this.selectedIndex) {
        return this.featuredList[this.selectedIndex];
      }
      return this.item || {};
    },

    isSingle () {
      return this.activeItem.id === this.$route.params.id;
    },

    itemName () {
      return this.activeItem.title || this.activeItem.name || '';
    },

    mediaType () {
      if (this.activeItem.title) return 'movie';
      if (this.activeItem.name) return 'tv';
      return 'movie';
    },

    backdropUrl () {
      if (this.activeItem && this.activeItem.backdrop_path) {
        return getBackdropUrl(this.activeItem.backdrop_path, 'w1280');
      }
      return null;
    },

    releaseYear () {
      const date = this.activeItem.release_date || this.activeItem.first_air_date;
      return date ? date.split('-')[0] : null;
    },

    itemCert () {
      if (this.activeItem.release_dates) {
        const releases = this.activeItem.release_dates.results.find(
          r => r.iso_3166_1 === 'US' || r.iso_3166_1 === process.env.API_COUNTRY,
        );
        if (releases) {
          const cert = releases.release_dates.find(d => d.certification !== '');
          if (cert) return cert.certification;
        }
      } else if (this.activeItem.content_ratings) {
        const releases = this.activeItem.content_ratings.results.find(
          r => r.iso_3166_1 === 'US' || r.iso_3166_1 === process.env.API_COUNTRY,
        );
        if (releases) return releases.rating;
      }
      return null;
    },

    trailerData () {
      if (!this.activeItem.videos || !this.activeItem.videos.results) return null;
      const videos = this.activeItem.videos.results;
      const trailer = videos.find(v => v.type === 'Trailer');
      if (!trailer) return null;

      return [
        {
          name: trailer.name,
          src: `https://www.youtube.com/embed/${trailer.key}?rel=0&showinfo=0&autoplay=1`,
        },
      ];
    },
  },

  methods: {
    openModal () {
      this.modalVisible = true;
    },

    closeModal () {
      this.modalVisible = false;
    },
  },
};
</script>
