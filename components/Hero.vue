<template>
  <div class="tw-relative tw-w-full">
    <div
      class="tw-relative tw-flex tw-items-center tw-min-h-[540px] sm:tw-min-h-[620px] tw-h-[72vh] sm:tw-h-[76vh] tw-max-h-[760px] tw-overflow-hidden tw-bg-base-bg">
      <!-- Backdrop with Cinematic Ambient Lighting -->
      <div class="tw-absolute tw-inset-0 tw-w-full tw-h-full tw-overflow-hidden">
        <transition name="fade" mode="out-in">
          <img
            v-if="backdropUrl"
            :key="`hero-bg-${activeItem.id}`"
            :src="backdropUrl"
            :alt="itemName"
            class="tw-absolute tw-top-0 tw-right-0 tw-w-full lg:tw-w-4/5 tw-h-full tw-object-cover tw-object-[center_25%]">
        </transition>

        <!-- Dynamic Cinematic Scrims -->
        <div
          class="tw-absolute tw-inset-y-0 tw-left-0 tw-w-full tw-z-10 tw-bg-gradient-to-b sm:tw-bg-gradient-to-r tw-from-[rgba(7,8,11,0.3)] sm:tw-from-[#07080b] tw-via-[rgba(7,8,11,0.88)] sm:tw-via-[rgba(7,8,11,0.96)] tw-to-[#07080b] sm:tw-to-transparent" />
        <div
          class="tw-absolute tw-inset-x-0 tw-bottom-0 tw-h-[220px] tw-bg-gradient-to-t tw-from-base-bg tw-via-[rgba(7,8,11,0.8)] tw-to-transparent tw-z-10" />
        <div
          class="tw-absolute tw-inset-x-0 tw-top-0 tw-h-[120px] tw-bg-gradient-to-b tw-from-[rgba(7,8,11,0.7)] tw-to-transparent tw-z-10" />
        <div
          class="tw-absolute tw-inset-0 tw-z-10 tw-pointer-events-none"
          style="background: radial-gradient(circle at 80% 30%, transparent 30%, rgba(7, 8, 11, 0.6) 100%);" />
      </div>

      <!-- Main Content Pane -->
      <div
        class="tw-relative tw-z-20 tw-flex tw-flex-col tw-justify-end sm:tw-justify-center tw-w-full tw-max-w-[1600px] tw-h-full tw-mx-auto tw-px-4 sm:tw-px-8 lg:tw-px-12 tw-pb-10 sm:tw-pb-12 lg:tw-pb-14">
        <div class="tw-max-w-[720px]">
          <transition name="fade-slide" mode="out-in">
            <div :key="`hero-content-${activeItem.id}`" class="tw-flex tw-flex-col">
              <!-- Eyebrow Badge -->
              <div
                class="tw-inline-flex tw-items-center tw-gap-2 tw-px-3 tw-py-1 tw-mb-4 tw-text-[1.2rem] tw-font-bold tw-tracking-widest tw-uppercase tw-text-primary-amber tw-bg-[rgba(229,169,60,0.12)] tw-border tw-border-[rgba(229,169,60,0.3)] tw-rounded-full tw-w-fit">
                <span class="tw-w-1.5 tw-h-1.5 tw-rounded-full tw-bg-primary-amber tw-shadow-[0_0_10px_#e5a93c]" />
                <span>Featured {{ mediaType === "tv" ? "Series" : "Cinema" }}</span>
              </div>

              <!-- Main Title -->
              <h1
                class="tw-m-0 tw-mb-4 tw-font-display tw-text-[3.4rem] sm:tw-text-[4.8rem] lg:tw-text-[5.8rem] tw-font-black tw-leading-[1.08] -tw-tracking-wider tw-text-white">
                <template v-if="isSingle">
                  {{ itemName }}
                </template>
                <template v-else>
                  <nuxt-link
                    :to="{ name: `${mediaType}-id`, params: { id: activeItem.id } }"
                    class="tw-text-white hover:tw-text-primary-amber tw-transition-colors tw-duration-200">
                    {{ itemName }}
                  </nuxt-link>
                </template>
              </h1>

              <!-- Meta Spec Badges -->
              <div class="tw-flex tw-flex-wrap tw-items-center tw-gap-4 tw-mb-4.5">
                <div
                  v-if="activeItem.vote_average"
                  class="tw-inline-flex tw-items-center tw-gap-1.5 tw-px-2.5 tw-py-1 tw-text-[1.35rem] tw-font-bold tw-text-white tw-bg-[rgba(7,8,11,0.85)] tw-backdrop-blur-md tw-border tw-border-[rgba(229,169,60,0.4)] tw-rounded-md">
                  <svg
                    class="tw-text-primary-amber"
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
                    class="tw-text-[1.2rem] tw-font-medium tw-text-text-muted">({{ activeItem.vote_count | numberWithCommas }})</span>
                </div>

                <div class="tw-flex tw-items-center tw-gap-3 tw-text-[1.35rem] tw-text-text-secondary">
                  <span v-if="releaseYear" class="tw-font-semibold">{{
                    releaseYear
                  }}</span>
                  <span
                    v-if="activeItem.number_of_seasons"
                    class="tw-font-semibold">{{ activeItem.number_of_seasons }}
                    {{
                      activeItem.number_of_seasons === 1 ? "Season" : "Seasons"
                    }}</span>
                  <span v-if="activeItem.runtime" class="tw-font-semibold">{{
                    activeItem.runtime | runtime
                  }}</span>
                  <span
                    v-if="itemCert"
                    class="tw-px-1.5 tw-py-0.5 tw-text-[1.1rem] tw-font-bold tw-text-text-muted tw-border tw-border-white/15 tw-rounded">{{
                      itemCert
                    }}</span>
                </div>
              </div>

              <!-- Overview Text -->
              <p
                v-if="activeItem.overview"
                class="tw-m-0 tw-mb-7 tw-text-[1.55rem] sm:tw-text-[1.65rem] tw-leading-relaxed tw-text-text-secondary tw-line-clamp-3">
                {{ activeItem.overview | truncate(280) }}
              </p>

              <!-- Action Bar -->
              <div class="tw-flex tw-flex-wrap tw-items-center tw-gap-3.5">
                <button
                  v-if="trailerData"
                  type="button"
                  class="tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-h-12 tw-px-6 tw-text-[1.45rem] tw-font-semibold tw-rounded-xl tw-cursor-pointer tw-text-[#07080b] tw-bg-gradient-to-br tw-from-primary-amber tw-to-[#ff8a00] tw-shadow-[0_4px_20px_rgba(229,169,60,0.4)] hover:tw-shadow-[0_6px_28px_rgba(229,169,60,0.6)] hover:-tw-translate-y-0.5 tw-transition-all tw-duration-200"
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
                  class="tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-h-12 tw-px-6 tw-text-[1.45rem] tw-font-semibold tw-rounded-xl tw-cursor-pointer tw-text-white tw-bg-white/[0.08] tw-border tw-border-white/15 tw-backdrop-blur-md hover:tw-bg-white/[0.16] hover:tw-border-white/30 hover:-tw-translate-y-0.5 tw-transition-all tw-duration-200">
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
        <div v-if="featuredList && featuredList.length > 1" class="tw-hidden lg:tw-flex tw-flex-col tw-gap-2.5 tw-absolute tw-right-12 tw-bottom-10 tw-max-w-[480px]">
          <div class="tw-text-[1.15rem] tw-font-bold tw-tracking-widest tw-uppercase tw-text-text-muted">
            Trending Highlights
          </div>
          <div class="tw-flex tw-gap-2">
            <button
              v-for="(feat, idx) in featuredList.slice(0, 5)"
              :key="`ticker-${feat.id}`"
              type="button"
              class="tw-flex tw-flex-col tw-gap-1 tw-px-3.5 tw-py-2 tw-rounded-md tw-backdrop-blur-md tw-cursor-pointer tw-text-left tw-max-w-[130px] tw-transition-all tw-duration-200"
              :class="selectedIndex === idx
                ? '!tw-bg-surface-3 !tw-border-primary-amber tw-shadow-[0_0_16px_rgba(229,169,60,0.25)]'
                : 'tw-bg-[rgba(14,17,23,0.8)] tw-border tw-border-border-subtle hover:tw-bg-surface-3 hover:tw-border-border-medium'"
              :aria-label="`Switch to ${feat.title || feat.name}`"
              @click="selectedIndex = idx">
              <span class="tw-text-[1.1rem] tw-font-black tw-text-primary-amber tw-tracking-wide">0{{ idx + 1 }}</span>
              <span class="tw-text-[1.2rem] tw-font-semibold tw-text-text-primary tw-truncate">{{ feat.title || feat.name }}</span>
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
