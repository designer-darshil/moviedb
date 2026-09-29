<template>
  <main class="main pb-20">
    <TopNav :title="metaTitle" />

    <!-- 1. FULL-WIDTH CINEMATIC BACKDROP & EDITORIAL HERO -->
    <div class="relative w-full overflow-hidden bg-base-bg">
      <!-- Full-Width Cinematic Backdrop Atmosphere -->
      <div
        class="relative min-h-[520px] sm:min-h-[600px] lg:min-h-[680px] flex items-end">
        <div
          class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <img
            v-if="backdropUrl"
            :src="backdropUrl"
            :alt="name"
            class="w-full h-full object-cover object-[center_20%] opacity-45 scale-[1.02]">

          <!-- Multi-Directional Atmospheric Dark Gradients -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-base-bg via-base-bg/75 to-transparent" />
          <div
            class="absolute inset-0 bg-gradient-to-b from-base-bg/80 via-transparent to-base-bg" />
          <div
            class="hidden lg:block absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-base-bg via-base-bg/85 to-transparent" />
        </div>

        <!-- Hero Content Overlay: Title, Specs, Description, Actions -->
        <div
          class="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 pt-28 sm:pt-36 pb-12 sm:pb-16">
          <div class="max-w-[920px]">
            <!-- Eyebrow Navigation & Tag -->
            <div
              class="flex items-center gap-3 mb-4 text-[1.2rem] font-semibold tracking-wider uppercase text-primary-amber">
              <span class="w-1.5 h-1.5 rounded-full bg-primary-amber" />
              <span>Television Series</span>
              <span
                v-if="itemCert"
                class="px-2 py-0.5 text-[1.05rem] font-bold text-text-muted bg-surface-2 border border-border-medium rounded">
                {{ itemCert }}
              </span>
            </div>

            <!-- Massive Cinematic Series Title -->
            <h1
              class="m-0 mb-4 font-display text-[3.2rem] sm:text-[4.6rem] lg:text-[5.6rem] font-extrabold leading-[1.08] text-white -tracking-tight">
              {{ name }}
            </h1>

            <!-- Metadata Specs: Year · Seasons · Rating · Genres -->
            <div
              class="flex flex-wrap items-center gap-3 sm:gap-4 mb-5 text-[1.35rem] sm:text-[1.4rem] text-text-secondary">
              <div
                v-if="item.vote_average"
                class="flex items-center gap-1.5 font-bold text-white">
                <svg
                  class="text-primary-amber"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor">
                  <path
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <span>{{ item.vote_average | rating }}</span>
              </div>

              <span v-if="yearStart" class="opacity-40">&middot;</span>
              <span v-if="yearStart" class="font-medium text-text-primary">
                {{ yearStart
                }}<template v-if="yearEnd && yearEnd !== yearStart">&ndash;{{ yearEnd }}</template>
              </span>

              <template v-if="item.number_of_seasons">
                <span class="opacity-40">&middot;</span>
                <span>{{ item.number_of_seasons }}
                  {{
                    item.number_of_seasons === 1 ? 'Season' : 'Seasons'
                  }}</span>
              </template>

              <template v-if="item.genres && item.genres.length">
                <span class="opacity-40">&middot;</span>
                <span class="text-text-muted">{{ genresList }}</span>
              </template>
            </div>

            <!-- Description / Synopsis -->
            <p
              v-if="item.overview"
              class="m-0 mb-8 text-[1.5rem] sm:text-[1.65rem] leading-relaxed text-text-secondary max-w-[820px]">
              {{ item.overview }}
            </p>

            <!-- Main Actions -->
            <div class="flex flex-wrap items-center gap-3.5">
              <button
                v-if="trailerData"
                type="button"
                class="inline-flex items-center justify-center gap-2.5 h-12 px-6 text-[1.4rem] font-semibold rounded-lg cursor-pointer text-[#07080b] bg-primary-amber hover:bg-primary-hover active:bg-primary-active shadow-cinema-sm transition-all duration-200"
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

              <a
                v-if="item.homepage"
                :href="item.homepage"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center justify-center gap-2 h-12 px-6 text-[1.4rem] font-medium rounded-lg text-text-primary bg-surface-2 border border-border-subtle hover:bg-surface-3 hover:text-white transition-colors duration-200">
                <span>Official Site</span>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round">
                  <path
                    d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. ASYMMETRIC POSTER ARTWORK & SERIES DETAILS -->
      <div
        class="relative z-20 w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-10">
        <div
          class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <!-- Floating Poster Artwork (4 cols) -->
          <div class="lg:col-span-4 w-[240px] sm:w-[280px] lg:w-full mx-auto">
            <div
              class="relative w-full rounded-xl overflow-hidden bg-surface-2 border border-border-medium shadow-cinema-lg -mt-8 sm:-mt-14 lg:-mt-20">
              <div
                class="relative w-full h-0 pt-[150%] overflow-hidden bg-surface-2">
                <img
                  v-if="posterUrl"
                  v-lazyload="posterUrl"
                  class="lazyload absolute inset-0 w-full h-full object-cover"
                  :alt="name">
                <div
                  v-else
                  class="absolute inset-0 flex flex-col items-center justify-center gap-2 text-text-subtle bg-surface-2">
                  <span
                    class="text-[1.1rem] font-medium uppercase tracking-wider">No Poster</span>
                </div>
              </div>
            </div>

            <p
              v-if="item.tagline"
              class="mt-4 text-center italic text-[1.35rem] text-text-muted">
              &ldquo;{{ item.tagline }}&rdquo;
            </p>
          </div>

          <!-- Additional Information & Specs (8 cols) -->
          <div class="lg:col-span-8 flex flex-col gap-6">
            <div
              class="bg-surface-1 border border-border-subtle rounded-xl p-6 sm:p-8">
              <h2
                class="m-0 mb-6 font-display text-[1.8rem] sm:text-[2rem] font-bold text-white -tracking-wide">
                Series &amp; Broadcast Details
              </h2>

              <ul
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none m-0 p-0 text-[1.35rem]">
                <li v-if="creators" class="flex flex-col gap-1.5">
                  <span
                    class="text-[1.15rem] font-medium uppercase tracking-wider text-text-subtle">Created by</span>
                  <span
                    class="font-medium text-text-primary"
                    v-html="creators" />
                </li>

                <li v-if="item.first_air_date" class="flex flex-col gap-1.5">
                  <span
                    class="text-[1.15rem] font-medium uppercase tracking-wider text-text-subtle">First Broadcast</span>
                  <span class="font-medium text-text-primary">{{
                    item.first_air_date | fullDate
                  }}</span>
                </li>

                <li v-if="item.last_air_date" class="flex flex-col gap-1.5">
                  <span
                    class="text-[1.15rem] font-medium uppercase tracking-wider text-text-subtle">Latest Broadcast</span>
                  <span class="font-medium text-text-primary">{{
                    item.last_air_date | fullDate
                  }}</span>
                </li>

                <li v-if="item.number_of_seasons" class="flex flex-col gap-1.5">
                  <span
                    class="text-[1.15rem] font-medium uppercase tracking-wider text-text-subtle">Seasons &amp; Episodes</span>
                  <span class="font-medium text-text-primary">
                    {{ item.number_of_seasons }}
                    {{ item.number_of_seasons === 1 ? 'Season' : 'Seasons' }}
                    <span
                      v-if="item.number_of_episodes"
                      class="text-text-muted font-normal">({{ item.number_of_episodes }} ep)</span>
                  </span>
                </li>

                <li v-if="item.status" class="flex flex-col gap-1.5">
                  <span
                    class="text-[1.15rem] font-medium uppercase tracking-wider text-text-subtle">Status</span>
                  <span class="font-medium text-text-primary">{{
                    item.status
                  }}</span>
                </li>

                <li
                  v-if="item.networks && item.networks.length"
                  class="flex flex-col gap-1.5">
                  <span
                    class="text-[1.15rem] font-medium uppercase tracking-wider text-text-subtle">Original Network</span>
                  <span class="font-medium text-text-primary">{{
                    item.networks | arrayToList
                  }}</span>
                </li>

                <li v-if="item.original_language" class="flex flex-col gap-1.5">
                  <span
                    class="text-[1.15rem] font-medium uppercase tracking-wider text-text-subtle">Original Language</span>
                  <span class="font-medium text-text-primary">{{
                    item.original_language | fullLang
                  }}</span>
                </li>
              </ul>

              <!-- External Links / Social -->
              <div
                v-if="item.external_ids"
                class="pt-6 mt-6 border-t border-border-subtle">
                <ExternalLinks :links="item.external_ids" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. MEDIA NAVIGATION (Overview / Episodes / Videos / Photos) -->
    <div v-if="menu.length > 1" class="my-4">
      <MediaNav :menu="menu" @clicked="navClicked" />
    </div>

    <!-- 4. CAST, EPISODES & MEDIA GALLERIES -->
    <transition name="fade" mode="out-in">
      <div :key="`tv-tab-content-${activeMenu}`">
        <template v-if="activeMenu === 'overview'">
          <!-- Top Cast Section -->
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

    <!-- 5. SIMILAR TV SHOWS -->
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
import {
  apiImgUrl,
  getBackdropUrl,
  getPosterUrl,
  getTvShow,
  getTvShowRecommended,
} from '~/api';
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
          r =>
            r.iso_3166_1 === 'US' || r.iso_3166_1 === process.env.API_COUNTRY,
        );
        if (releases) return releases.rating;
      }
      return null;
    },

    genresList () {
      if (this.item.genres && this.item.genres.length) {
        return this.item.genres.map(g => g.name).join(' · ');
      }
      return '';
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
