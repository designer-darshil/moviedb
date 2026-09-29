<template>
  <div class="relative w-full overflow-hidden bg-base-bg">
    <!-- Hero Container -->
    <div class="relative flex items-center min-h-[480px] sm:min-h-[560px] h-[65vh] sm:h-[70vh] max-h-[720px] overflow-hidden">
      <!-- Backdrop Atmosphere -->
      <div class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <transition name="fade" mode="out-in">
          <img
            v-if="backdropUrl"
            :key="`hero-bg-${activeItem.id}`"
            :src="backdropUrl"
            :alt="itemName"
            class="absolute top-0 right-0 w-full lg:w-3/4 h-full object-cover object-[center_20%] opacity-60">
        </transition>

        <!-- Seamless Dark Cinematic Gradient Overlays -->
        <div class="absolute inset-y-0 left-0 w-full lg:w-2/3 bg-gradient-to-r from-base-bg via-base-bg/90 to-transparent" />
        <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-base-bg to-transparent" />
        <div class="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-base-bg/80 to-transparent" />
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-12">
        <div class="max-w-[680px]">
          <transition name="fade-slide" mode="out-in">
            <div :key="`hero-content-${activeItem.id}`" class="flex flex-col">
              <!-- Eyebrow Tag -->
              <div class="flex items-center gap-2 mb-3 text-[1.2rem] font-semibold tracking-wider uppercase text-primary-amber">
                <span class="w-1.5 h-1.5 rounded-full bg-primary-amber" />
                <span>Featured {{ mediaType === 'tv' ? 'Series' : 'Film' }}</span>
              </div>

              <!-- Movie / TV Title -->
              <h1 class="m-0 mb-3.5 font-display text-[3.2rem] sm:text-[4.4rem] lg:text-[5.2rem] font-extrabold leading-[1.1] -tracking-tight text-white">
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

              <!-- Metadata Specs -->
              <div class="flex flex-wrap items-center gap-3.5 mb-4 text-[1.3rem] text-text-secondary">
                <div
                  v-if="activeItem.vote_average"
                  class="flex items-center gap-1 font-bold text-white">
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
                </div>

                <span v-if="releaseYear" class="opacity-40">&middot;</span>
                <span v-if="releaseYear">{{ releaseYear }}</span>

                <template v-if="activeItem.runtime">
                  <span class="opacity-40">&middot;</span>
                  <span>{{ activeItem.runtime | runtime }}</span>
                </template>

                <template v-if="activeItem.number_of_seasons">
                  <span class="opacity-40">&middot;</span>
                  <span>{{ activeItem.number_of_seasons }} {{ activeItem.number_of_seasons === 1 ? 'Season' : 'Seasons' }}</span>
                </template>

                <template v-if="genresList">
                  <span class="opacity-40">&middot;</span>
                  <span>{{ genresList }}</span>
                </template>

                <span
                  v-if="itemCert"
                  class="px-1.5 py-0.5 text-[1.1rem] font-semibold text-text-muted border border-border-medium rounded">
                  {{ itemCert }}
                </span>
              </div>

              <!-- Synopsis Overview -->
              <p
                v-if="activeItem.overview"
                class="m-0 mb-6 text-[1.45rem] sm:text-[1.55rem] leading-relaxed text-text-secondary line-clamp-3">
                {{ activeItem.overview | truncate(260) }}
              </p>

              <!-- Action Buttons -->
              <div class="flex flex-wrap items-center gap-3">
                <button
                  v-if="trailerData"
                  type="button"
                  class="inline-flex items-center justify-center gap-2 h-11 px-5 text-[1.35rem] font-semibold rounded-lg cursor-pointer text-[#07080b] bg-primary-amber hover:bg-primary-hover active:bg-primary-active transition-colors duration-200"
                  @click="openModal">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <span>Watch Trailer</span>
                </button>

                <nuxt-link
                  v-if="!isSingle"
                  :to="{ name: `${mediaType}-id`, params: { id: activeItem.id } }"
                  class="inline-flex items-center justify-center gap-2 h-11 px-5 text-[1.35rem] font-medium rounded-lg cursor-pointer text-text-primary bg-surface-2 border border-border-subtle hover:bg-surface-3 hover:text-white transition-colors duration-200">
                  <span>More Details</span>
                </nuxt-link>
              </div>
            </div>
          </transition>
        </div>

        <!-- Subtle Featured Switcher Indicators (if multiple featured items passed) -->
        <div
          v-if="featuredList && featuredList.length > 1"
          class="flex items-center gap-2 mt-8">
          <button
            v-for="(feat, idx) in featuredList.slice(0, 5)"
            :key="`indicator-${feat.id}`"
            type="button"
            class="h-1.5 rounded-full transition-all duration-300"
            :class="selectedIndex === idx ? 'w-8 bg-primary-amber' : 'w-2 bg-white/20 hover:bg-white/40'"
            :aria-label="`Switch to featured ${feat.title || feat.name}`"
            @click="selectedIndex = idx" />
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

    genresList () {
      if (this.activeItem.genres && this.activeItem.genres.length) {
        return this.activeItem.genres.slice(0, 3).map(g => g.name).join(' · ');
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
