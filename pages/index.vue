<template>
  <main class="main">
    <!-- Interactive Multi-Featured Hero Showcase -->
    <Hero
      v-if="featuredItems && featuredItems.length"
      :item="featuredItems[0]"
      :featured-list="featuredItems" />

    <!-- Curated Quick Genre Discovery Bar -->
    <section class="tw-relative tw-z-10 -tw-mt-6 sm:-tw-mt-8 tw-px-4 sm:tw-px-8 lg:tw-px-12 tw-pb-8">
      <div class="tw-flex tw-items-center tw-gap-4 tw-max-w-[1600px] tw-mx-auto tw-px-5 tw-py-3 tw-bg-[rgba(14,17,23,0.9)] tw-backdrop-blur-xl tw-border tw-border-white/15 tw-rounded-full tw-shadow-cinema-md">
        <span class="tw-hidden sm:tw-inline-block tw-text-[1.2rem] tw-font-bold tw-uppercase tw-tracking-widest tw-text-primary-amber tw-shrink-0">Browse by Genre:</span>
        <div class="tw-flex tw-items-center tw-gap-2 tw-overflow-x-auto tw-scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:tw-hidden">
          <nuxt-link
            v-for="genre in quickGenres"
            :key="genre.id"
            :to="`/genre/${genre.id}/movie`"
            class="tw-inline-flex tw-items-center tw-px-4 tw-py-1.5 tw-text-[1.25rem] tw-font-semibold tw-text-text-secondary tw-bg-surface-2 tw-border tw-border-border-subtle tw-rounded-full tw-whitespace-nowrap hover:tw-text-white hover:tw-bg-surface-3 hover:tw-border-primary-amber tw-transition-all tw-duration-200">
            {{ genre.name }}
          </nuxt-link>
        </div>
      </div>
    </section>

    <!-- Top 10 Trending Cinema Showcase (with Big Rank Numbers) -->
    <ListingCarousel
      v-if="trendingMovies && trendingMovies.results.length"
      :title="trendingMoviesTitle"
      subtitle="The most-watched films across the globe this week"
      :view-all-url="trendingMoviesUrl"
      :items="trendingMovies"
      :is-ranked="true" />

    <!-- Editorial Spotlight Banner (Curated Masterpiece) -->
    <section v-if="spotlightItem" class="tw-my-12 sm:tw-my-16 tw-px-4 sm:tw-px-8 lg:tw-px-12">
      <div class="tw-max-w-[1600px] tw-mx-auto">
        <div class="tw-relative tw-rounded-2xl tw-overflow-hidden tw-border tw-border-white/15 tw-bg-surface-1 tw-shadow-2xl">
          <div class="tw-relative tw-w-full tw-h-[360px] sm:tw-h-[420px] tw-overflow-hidden">
            <img
              v-if="spotlightBackdrop"
              :src="spotlightBackdrop"
              :alt="spotlightItem.title || spotlightItem.name"
              class="tw-w-full tw-h-full tw-object-cover tw-object-center">
            <div class="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-[#07080b] tw-via-[rgba(7,8,11,0.7)] sm:tw-bg-gradient-to-r sm:tw-from-[#07080b] sm:tw-via-[rgba(7,8,11,0.85)] sm:tw-to-transparent" />
          </div>

          <div class="tw-absolute tw-inset-y-0 tw-left-0 tw-z-10 tw-flex tw-flex-col tw-justify-center tw-max-w-[640px] tw-p-6 sm:tw-p-10 lg:tw-p-12">
            <div class="tw-inline-flex tw-items-center tw-gap-2 tw-px-3 tw-py-1 tw-mb-3 tw-text-[1.15rem] tw-font-bold tw-uppercase tw-tracking-widest tw-text-primary-amber tw-bg-primary-amber/12 tw-border tw-border-primary-amber/30 tw-rounded-full tw-w-fit">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span>Critic's Spotlight Choice</span>
            </div>

            <h3 class="tw-m-0 tw-mb-3 tw-font-display tw-text-[2.6rem] sm:tw-text-[3.6rem] tw-font-black -tw-tracking-wider tw-text-white tw-leading-tight">
              {{ spotlightItem.title || spotlightItem.name }}
            </h3>

            <div class="tw-flex tw-flex-wrap tw-items-center tw-gap-2.5 tw-mb-4 tw-text-[1.3rem] tw-text-text-muted">
              <span class="tw-font-bold tw-text-primary-amber">
                ★ {{ spotlightItem.vote_average | rating }} Rating
              </span>
              <span class="tw-opacity-40">•</span>
              <span>{{ spotlightItem.release_date ? spotlightItem.release_date.split('-')[0] : 'Feature' }}</span>
              <span v-if="spotlightItem.runtime" class="tw-opacity-40">•</span>
              <span v-if="spotlightItem.runtime">{{ spotlightItem.runtime | runtime }}</span>
            </div>

            <p class="tw-m-0 tw-mb-6 tw-text-[1.45rem] tw-leading-relaxed tw-text-text-secondary tw-line-clamp-3">
              {{ spotlightItem.overview | truncate(220) }}
            </p>

            <div class="tw-flex tw-items-center">
              <nuxt-link
                :to="{ name: 'movie-id', params: { id: spotlightItem.id } }"
                class="tw-inline-flex tw-items-center tw-gap-2 tw-h-11 tw-px-6 tw-text-[1.35rem] tw-font-bold tw-text-[#07080b] tw-bg-gradient-to-br tw-from-primary-amber tw-to-[#ff8a00] tw-rounded-xl tw-shadow-[0_4px_16px_rgba(229,169,60,0.4)] hover:tw-shadow-[0_6px_24px_rgba(229,169,60,0.6)] hover:-tw-translate-y-0.5 tw-transition-all tw-duration-200">
                <span>Explore Feature</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Top 10 Trending TV Series (with Big Rank Numbers) -->
    <ListingCarousel
      v-if="trendingTv && trendingTv.results.length"
      :title="trendingTvTitle"
      subtitle="Binge-worthy series captivating audiences worldwide"
      :view-all-url="trendingTvUrl"
      :items="trendingTv"
      :is-ranked="true" />

    <!-- Visual Genre Exploration Grid -->
    <section class="tw-my-12 sm:tw-my-16 tw-px-4 sm:tw-px-8 lg:tw-px-12">
      <div class="tw-max-w-[1600px] tw-mx-auto">
        <div class="tw-flex tw-items-center tw-gap-3 tw-mb-6">
          <span class="tw-inline-block tw-w-1 tw-h-7 tw-rounded-full tw-bg-gradient-to-b tw-from-primary-amber tw-to-[#ff8a00]" />
          <h2 class="tw-m-0 tw-font-display tw-text-[2.2rem] sm:tw-text-[2.6rem] tw-font-bold tw-text-white -tw-tracking-wide">
            Explore Curated Worlds
          </h2>
        </div>

        <div class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-5">
          <nuxt-link
            v-for="tile in genreTiles"
            :key="tile.name"
            :to="tile.url"
            class="tw-group tw-flex tw-items-center tw-gap-5 tw-p-6 tw-rounded-2xl tw-border tw-border-white/10 tw-no-underline hover:tw-border-primary-amber/40 hover:-tw-translate-y-1 hover:tw-shadow-xl tw-transition-all tw-duration-300"
            :style="{ background: tile.gradient }">
            <span class="tw-text-[3rem]">{{ tile.icon }}</span>
            <div class="tw-flex tw-flex-col tw-gap-1">
              <h3 class="tw-m-0 tw-text-[1.7rem] tw-font-bold tw-text-white group-hover:tw-text-primary-amber tw-transition-colors tw-duration-200">
                {{ tile.name }}
              </h3>
              <span class="tw-text-[1.25rem] tw-text-text-secondary">{{ tile.desc }}</span>
            </div>
          </nuxt-link>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { getTrending, getMovie, getTvShow, getListItem, getBackdropUrl } from '~/api';
import Hero from '~/components/Hero';
import ListingCarousel from '~/components/ListingCarousel';

export default {
  components: {
    Hero,
    ListingCarousel,
  },

  async asyncData ({ error }) {
    try {
      const trendingMovies = await getTrending('movie');
      const trendingTv = await getTrending('tv');

      // Curate top 5 items for the multi-featured Hero ticker
      const featuredItems = [];
      const pool = [...trendingMovies.results.slice(0, 3), ...trendingTv.results.slice(0, 2)];

      for (const item of pool) {
        if (item.title) {
          const detail = await getMovie(item.id);
          featuredItems.push(detail);
        } else {
          const detail = await getTvShow(item.id);
          featuredItems.push(detail);
        }
      }

      // Spotlight item: choose the highest rated movie from trending
      const spotlightCandidate = [...trendingMovies.results]
        .sort((a, b) => b.vote_average - a.vote_average)[0];
      const spotlightItem = spotlightCandidate ? await getMovie(spotlightCandidate.id) : null;

      return {
        trendingMovies,
        trendingTv,
        featuredItems,
        spotlightItem,
      };
    } catch {
      error({ statusCode: 504, message: 'Data not available' });
    }
  },

  data () {
    return {
      quickGenres: [
        { id: 28, name: 'Action' },
        { id: 878, name: 'Sci-Fi' },
        { id: 18, name: 'Drama' },
        { id: 53, name: 'Thriller' },
        { id: 16, name: 'Animation' },
        { id: 35, name: 'Comedy' },
        { id: 27, name: 'Horror' },
        { id: 12, name: 'Adventure' },
        { id: 99, name: 'Documentary' },
      ],
      genreTiles: [
        {
          name: 'Action & High Octane',
          desc: 'Adrenaline, stunts and warfare',
          url: '/genre/28/movie',
          icon: '⚡',
          gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
        },
        {
          name: 'Sci-Fi & Future Worlds',
          desc: 'Cyberpunk, cosmos and AI',
          url: '/genre/878/movie',
          icon: '🚀',
          gradient: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)',
        },
        {
          name: 'Prestige Drama',
          desc: 'Compelling character narratives',
          url: '/genre/18/movie',
          icon: '🎭',
          gradient: 'linear-gradient(135deg, #451a03 0%, #78350f 100%)',
        },
        {
          name: 'Thriller & Mystery',
          desc: 'Plot twists and tension',
          url: '/genre/53/movie',
          icon: '🔍',
          gradient: 'linear-gradient(135deg, #3b0764 0%, #581c87 100%)',
        },
        {
          name: 'Animation & Anime',
          desc: 'Artistic visuals and imagination',
          url: '/genre/16/movie',
          icon: '🎨',
          gradient: 'linear-gradient(135deg, #831843 0%, #9d174d 100%)',
        },
        {
          name: 'Comedy & Satire',
          desc: 'Laughter, wit and lighthearted fun',
          url: '/genre/35/movie',
          icon: '✨',
          gradient: 'linear-gradient(135deg, #713f12 0%, #854d0e 100%)',
        },
      ],
    };
  },

  head () {
    return {
      title: 'CINEPULSE — Discover Cinema, TV Shows & People',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Discover trending films, acclaimed television series, and filmography powered by The Movie Database.',
        },
        { hid: 'og:title', property: 'og:title', content: 'CINEPULSE Studio' },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Next-generation cinematic discovery engine.',
        },
      ],
    };
  },

  computed: {
    trendingMoviesTitle () {
      return getListItem('movie', 'trending').title;
    },

    trendingMoviesUrl () {
      return { name: 'movie-category-name', params: { name: 'trending' } };
    },

    trendingTvTitle () {
      return getListItem('tv', 'trending').title;
    },

    trendingTvUrl () {
      return { name: 'tv-category-name', params: { name: 'trending' } };
    },

    spotlightBackdrop () {
      if (this.spotlightItem && this.spotlightItem.backdrop_path) {
        return getBackdropUrl(this.spotlightItem.backdrop_path, 'w1280');
      }
      return null;
    },
  },
};
</script>
