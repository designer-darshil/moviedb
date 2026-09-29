<template>
  <main class="main pb-16">
    <TopNav :title="metaTitle" />

    <!-- Unified Cinematic TV Series Details -->
    <div class="relative w-full overflow-hidden bg-base-bg">
      <!-- Atmospheric Full-Width Backdrop -->
      <div class="absolute inset-x-0 top-0 h-[480px] sm:h-[580px] lg:h-[640px] overflow-hidden pointer-events-none">
        <img
          v-if="backdropUrl"
          :src="backdropUrl"
          :alt="name"
          class="w-full h-full object-cover object-[center_20%] opacity-40">
        <div class="absolute inset-0 bg-gradient-to-t from-base-bg via-base-bg/75 to-transparent" />
        <div class="absolute inset-0 bg-gradient-to-b from-base-bg/60 via-transparent to-base-bg" />
        <div class="hidden lg:block absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-base-bg via-base-bg/80 to-transparent" />
      </div>

      <!-- TV Hero & Presentation -->
      <div class="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 pt-20 sm:pt-24 lg:pt-32 pb-8">
        <div class="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
          <!-- Poster Column -->
          <div class="w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] shrink-0 mx-auto md:mx-0">
            <div class="relative w-full rounded-xl overflow-hidden bg-surface-2 border border-border-subtle shadow-cinema-lg">
              <div class="relative w-full h-0 pt-[150%] overflow-hidden bg-surface-2">
                <img
                  v-if="posterUrl"
                  v-lazyload="posterUrl"
                  class="lazyload absolute inset-0 w-full h-full object-cover"
                  :alt="name">
                <div v-else class="absolute inset-0 flex flex-col items-center justify-center gap-2 text-text-subtle bg-surface-2">
                  <span class="text-[1.1rem] font-medium uppercase tracking-wider">No Poster</span>
                </div>
              </div>
            </div>
            <p v-if="item.tagline" class="mt-3 text-center italic text-[1.3rem] text-text-muted">
              &ldquo;{{ item.tagline }}&rdquo;
            </p>
          </div>

          <!-- Series Information Column -->
          <div class="flex-1 flex flex-col max-w-[900px] w-full">
            <!-- Series Title -->
            <h1 class="m-0 mb-3 font-display text-[2.8rem] sm:text-[4rem] lg:text-[4.6rem] font-extrabold leading-tight text-white -tracking-tight">
              {{ name }}
            </h1>

            <!-- Rating · Year · Seasons -->
            <div class="flex flex-wrap items-center gap-3 mb-4 text-[1.35rem] text-text-secondary">
              <div v-if="item.vote_average" class="flex items-center gap-1.5 font-bold text-white">
                <svg class="text-primary-amber" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <span>{{ item.vote_average | rating }}</span>
              </div>

              <span v-if="yearStart" class="opacity-40">&middot;</span>
              <span v-if="yearStart">
                {{ yearStart }}<template v-if="yearEnd && yearEnd !== yearStart">&ndash;{{ yearEnd }}</template>
              </span>

              <template v-if="item.number_of_seasons">
                <span class="opacity-40">&middot;</span>
                <span>{{ item.number_of_seasons }} {{ item.number_of_seasons === 1 ? 'Season' : 'Seasons' }}</span>
              </template>

              <span
                v-if="itemCert"
                class="px-1.5 py-0.5 text-[1.1rem] font-semibold text-text-muted border border-border-medium rounded">
                {{ itemCert }}
              </span>
            </div>

            <!-- Genres -->
            <div v-if="item.genres && item.genres.length" class="flex flex-wrap gap-2 mb-6">
              <nuxt-link
                v-for="genre in item.genres"
                :key="genre.id"
                :to="`/genre/${genre.id}/tv`"
                class="inline-flex items-center px-3 py-1 text-[1.2rem] font-medium text-text-secondary bg-surface-2 border border-border-subtle rounded-md hover:text-white hover:bg-surface-3 transition-colors duration-150">
                {{ genre.name }}
              </nuxt-link>
            </div>

            <!-- Description -->
            <div v-if="item.overview" class="mb-6">
              <p class="m-0 text-[1.5rem] sm:text-[1.6rem] leading-relaxed text-text-secondary">
                {{ item.overview }}
              </p>
            </div>

            <!-- Primary Action: Watch Trailer -->
            <div class="flex flex-wrap items-center gap-3 mb-8">
              <button
                v-if="trailerData"
                type="button"
                class="inline-flex items-center justify-center gap-2 h-11 px-5 text-[1.35rem] font-semibold rounded-lg cursor-pointer text-[#07080b] bg-primary-amber hover:bg-primary-hover active:bg-primary-active transition-colors duration-200"
                @click="openModal">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span>Watch Trailer</span>
              </button>

              <a
                v-if="item.homepage"
                :href="item.homepage"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center justify-center gap-2 h-11 px-5 text-[1.35rem] font-medium rounded-lg text-text-primary bg-surface-2 border border-border-subtle hover:bg-surface-3 hover:text-white transition-colors duration-200">
                <span>Website</span>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>

            <!-- Additional Information -->
            <div class="bg-surface-1 border border-border-subtle rounded-xl p-5 sm:p-6">
              <h3 class="m-0 mb-4 text-[1.5rem] font-semibold text-white -tracking-wide">
                Details
              </h3>

              <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none m-0 p-0 text-[1.3rem]">
                <li v-if="creators" class="flex flex-col gap-1">
                  <span class="text-[1.1rem] font-medium uppercase tracking-wider text-text-subtle">Created by</span>
                  <span class="font-medium text-text-primary" v-html="creators" />
                </li>

                <li v-if="item.first_air_date" class="flex flex-col gap-1">
                  <span class="text-[1.1rem] font-medium uppercase tracking-wider text-text-subtle">First Aired</span>
                  <span class="font-medium text-text-primary">{{ item.first_air_date | fullDate }}</span>
                </li>

                <li v-if="item.last_air_date" class="flex flex-col gap-1">
                  <span class="text-[1.1rem] font-medium uppercase tracking-wider text-text-subtle">Last Aired</span>
                  <span class="font-medium text-text-primary">{{ item.last_air_date | fullDate }}</span>
                </li>

                <li v-if="item.number_of_seasons" class="flex flex-col gap-1">
                  <span class="text-[1.1rem] font-medium uppercase tracking-wider text-text-subtle">Seasons &amp; Episodes</span>
                  <span class="font-medium text-text-primary">
                    {{ item.number_of_seasons }} {{ item.number_of_seasons === 1 ? 'Season' : 'Seasons' }}
                    <span v-if="item.number_of_episodes" class="text-text-muted font-normal">({{ item.number_of_episodes }} ep)</span>
                  </span>
                </li>

                <li v-if="item.status" class="flex flex-col gap-1">
                  <span class="text-[1.1rem] font-medium uppercase tracking-wider text-text-subtle">Status</span>
                  <span class="font-medium text-text-primary">{{ item.status }}</span>
                </li>

                <li v-if="item.networks && item.networks.length" class="flex flex-col gap-1">
                  <span class="text-[1.1rem] font-medium uppercase tracking-wider text-text-subtle">Network</span>
                  <span class="font-medium text-text-primary">{{ item.networks | arrayToList }}</span>
                </li>

                <li v-if="item.original_language" class="flex flex-col gap-1">
                  <span class="text-[1.1rem] font-medium uppercase tracking-wider text-text-subtle">Language</span>
                  <span class="font-medium text-text-primary">{{ item.original_language | fullLang }}</span>
                </li>
              </ul>

              <div v-if="item.external_ids" class="pt-4 mt-4 border-t border-border-subtle">
                <ExternalLinks :links="item.external_ids" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Media Switcher (Overview / Episodes / Videos / Photos) -->
    <div v-if="menu.length > 1" class="mt-4">
      <MediaNav :menu="menu" @clicked="navClicked" />
    </div>

    <!-- Dynamic Section Container -->
    <transition name="fade" mode="out-in">
      <div :key="`tv-tab-content-${activeMenu}`">
        <template v-if="activeMenu === 'overview'">
          <!-- Top Cast -->
          <Credits v-if="showCredits" :people="item.credits.cast" />
        </template>

        <template v-if="activeMenu === 'episodes' && showEpisodes">
          <Episodes :number-of-seasons="item.number_of_seasons" />
        </template>

        <template v-if="activeMenu === 'videos' && showVideos">
          <Videos :videos="item.videos.results" />
        </template>

        <template v-if="activeMenu === 'photos' && showImages">
          <Images
            v-if="item.images.backdrops.length"
            title="Backdrops"
            type="backdrop"
            :images="item.images.backdrops" />

          <Images
            v-if="item.images.posters.length"
            title="Posters"
            type="poster"
            :images="item.images.posters" />
        </template>
      </div>
    </transition>

    <!-- Similar TV Shows -->
    <ListingCarousel
      v-if="recommended && recommended.results.length"
      title="More Like This"
      subtitle="Recommended series based on genre and critical acclaim"
      :items="recommended" />

    <!-- YouTube Trailer Modal -->
    <Modal
      v-if="modalVisible && trailerData"
      :data="trailerData"
      type="iframe"
      @close="closeModal" />
  </main>
</template>

<script>
import { apiImgUrl, getBackdropUrl, getPosterUrl, getTvShow, getTvShowRecommended } from '~/api';
import { name, yearStart, yearEnd, creators } from '~/mixins/Details';
import TopNav from '~/components/global/TopNav';
import MediaNav from '~/components/MediaNav';
import Videos from '~/components/Videos';
import Images from '~/components/Images';
import Credits from '~/components/Credits';
import Episodes from '~/components/tv/Episodes';
import ListingCarousel from '~/components/ListingCarousel';
import Modal from '~/components/Modal';
import ExternalLinks from '~/components/ExternalLinks';

export default {
  components: {
    TopNav,
    MediaNav,
    Videos,
    Images,
    Credits,
    Episodes,
    ListingCarousel,
    Modal,
    ExternalLinks,
  },

  mixins: [name, yearStart, yearEnd, creators],

  async asyncData ({ params, error }) {
    try {
      const item = await getTvShow(params.id);
      return { item };
    } catch {
      error({ statusCode: 404, message: 'Page not found' });
    }
  },

  data () {
    return {
      menu: [],
      activeMenu: 'overview',
      recommended: null,
      modalVisible: false,
    };
  },

  head () {
    return {
      title: `${this.metaTitle} — CINEPULSE`,
      meta: [
        { hid: 'og:title', property: 'og:title', content: this.metaTitle },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.metaDescription,
        },
        {
          hid: 'description',
          name: 'description',
          content: this.metaDescription,
        },
        { hid: 'og:image', property: 'og:image', content: this.metaImage },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.FRONTEND_URL}${this.$route.path}`,
        },
      ],
      bodyAttrs: {
        class: 'topnav-active',
      },
    };
  },

  computed: {
    metaTitle () {
      if (this.item.status === 'Ended' && this.yearStart && this.yearEnd) {
        return `${this.name} (TV Series ${this.yearStart}-${this.yearEnd})`;
      } else if (this.yearStart) {
        return `${this.name} (TV Series ${this.yearStart}-)`;
      } else {
        return `${this.name} (TV Series)`;
      }
    },

    metaDescription () {
      if (this.item.overview) {
        return this.truncate(this.item.overview, 200);
      } else {
        return '';
      }
    },

    metaImage () {
      if (this.item.poster_path) {
        return `${apiImgUrl}/w500${this.item.poster_path}`;
      } else {
        return '';
      }
    },

    backdropUrl () {
      if (this.item && this.item.backdrop_path) {
        return getBackdropUrl(this.item.backdrop_path, 'w1280');
      }
      return null;
    },

    posterUrl () {
      if (this.item && this.item.poster_path) {
        return getPosterUrl(this.item.poster_path, 'w500');
      }
      return null;
    },

    itemCert () {
      if (this.item.content_ratings) {
        const releases = this.item.content_ratings.results.find(
          r => r.iso_3166_1 === 'US' || r.iso_3166_1 === process.env.API_COUNTRY,
        );
        if (releases) return releases.rating;
      }
      return null;
    },

    showCredits () {
      const credits = this.item.credits;
      return credits && credits.cast && credits.cast.length;
    },

    showEpisodes () {
      return this.item.number_of_seasons;
    },

    showVideos () {
      const videos = this.item.videos;
      return videos && videos.results && videos.results.length;
    },

    showImages () {
      const images = this.item.images;
      return (
        images &&
        ((images.backdrops && images.backdrops.length) ||
          (images.posters && images.posters.length))
      );
    },

    trailerData () {
      if (!this.item.videos || !this.item.videos.results) return null;
      const videos = this.item.videos.results;
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

  created () {
    this.createMenu();
    this.initRecommended();
  },

  methods: {
    truncate (string, length) {
      return this.$options.filters.truncate(string, length);
    },

    openModal () {
      this.modalVisible = true;
    },

    closeModal () {
      this.modalVisible = false;
    },

    createMenu () {
      const menu = [];

      // overview
      menu.push('Overview');

      // episodes
      if (this.showEpisodes) menu.push('Episodes');

      // videos
      if (this.showVideos) menu.push('Videos');

      // images
      if (this.showImages) menu.push('Photos');

      this.menu = menu;
    },

    navClicked (label) {
      this.activeMenu = label;
    },

    initRecommended () {
      if (this.recommended !== null) return;

      getTvShowRecommended(this.$route.params.id).then((response) => {
        this.recommended = response;
      });
    },
  },
};
</script>
