<template>
  <main class="main">
    <!-- Interactive Multi-Featured Hero Showcase -->
    <Hero
      v-if="featuredItems && featuredItems.length"
      :item="featuredItems[0]"
      :featured-list="featuredItems" />

    <!-- Curated Quick Genre Discovery Bar -->
    <section class="relative z-10 -mt-6 sm:-mt-8 px-4 sm:px-8 lg:px-12 pb-8">
      <div class="flex items-center gap-4 max-w-[1600px] mx-auto px-5 py-3 bg-[rgba(14,17,23,0.9)] backdrop-blur-xl border border-white/15 rounded-full shadow-cinema-md">
        <span class="hidden sm:inline-block text-[1.2rem] font-bold uppercase tracking-widest text-primary-amber shrink-0">Browse by Genre:</span>
        <div class="flex items-center gap-2 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <nuxt-link
            v-for="genre in quickGenres"
            :key="genre.id"
            :to="`/genre/${genre.id}/movie`"
            class="inline-flex items-center px-4 py-1.5 text-[1.25rem] font-semibold text-text-secondary bg-surface-2 border border-border-subtle rounded-full whitespace-nowrap hover:text-white hover:bg-surface-3 hover:border-primary-amber transition-all duration-200">
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
    <section v-if="spotlightItem" class="my-12 sm:my-16 px-4 sm:px-8 lg:px-12">
      <div class="max-w-[1600px] mx-auto">
        <div class="relative rounded-2xl overflow-hidden border border-white/15 bg-surface-1 shadow-2xl">
          <div class="relative w-full h-[360px] sm:h-[420px] overflow-hidden">
            <img
              v-if="spotlightBackdrop"
              :src="spotlightBackdrop"
              :alt="spotlightItem.title || spotlightItem.name"
              class="w-full h-full object-cover object-center">
            <div class="absolute inset-0 bg-gradient-to-t from-[#07080b] via-[rgba(7,8,11,0.7)] sm:bg-gradient-to-r sm:from-[#07080b] sm:via-[rgba(7,8,11,0.85)] sm:to-transparent" />
          </div>

          <div class="absolute inset-y-0 left-0 z-10 flex flex-col justify-center max-w-[640px] p-6 sm:p-10 lg:p-12">
            <div class="inline-flex items-center gap-2 px-3 py-1 mb-3 text-[1.15rem] font-bold uppercase tracking-widest text-primary-amber bg-primary-amber/12 border border-primary-amber/30 rounded-full w-fit">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span>Critic's Spotlight Choice</span>
            </div>

            <h3 class="m-0 mb-3 font-display text-[2.6rem] sm:text-[3.6rem] font-black -tracking-wider text-white leading-tight">
              {{ spotlightItem.title || spotlightItem.name }}
            </h3>

            <div class="flex flex-wrap items-center gap-2.5 mb-4 text-[1.3rem] text-text-muted">
              <span class="font-bold text-primary-amber">
                ★ {{ spotlightItem.vote_average | rating }} Rating
              </span>
              <span class="opacity-40">•</span>
              <span>{{ spotlightItem.release_date ? spotlightItem.release_date.split('-')[0] : 'Feature' }}</span>
              <span v-if="spotlightItem.runtime" class="opacity-40">•</span>
              <span v-if="spotlightItem.runtime">{{ spotlightItem.runtime | runtime }}</span>
            </div>

            <p class="m-0 mb-6 text-[1.45rem] leading-relaxed text-text-secondary line-clamp-3">
              {{ spotlightItem.overview | truncate(220) }}
            </p>

            <div class="flex items-center">
              <nuxt-link
                :to="{ name: 'movie-id', params: { id: spotlightItem.id } }"
                class="inline-flex items-center gap-2 h-11 px-6 text-[1.35rem] font-bold text-[#07080b] bg-gradient-to-br from-primary-amber to-[#ff8a00] rounded-xl shadow-[0_4px_16px_rgba(229,169,60,0.4)] hover:shadow-[0_6px_24px_rgba(229,169,60,0.6)] hover:-translate-y-0.5 transition-all duration-200">
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
    <section class="my-12 sm:my-16 px-4 sm:px-8 lg:px-12">
      <div class="max-w-[1600px] mx-auto">
        <div class="flex items-center gap-3 mb-6">
          <span class="inline-block w-1 h-7 rounded-full bg-gradient-to-b from-primary-amber to-[#ff8a00]" />
          <h2 class="m-0 font-display text-[2.2rem] sm:text-[2.6rem] font-bold text-white -tracking-wide">
            Explore Curated Worlds
          </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <nuxt-link
            v-for="tile in genreTiles"
            :key="tile.name"
            :to="tile.url"
            class="group flex items-center gap-5 p-6 rounded-2xl border border-white/10 no-underline hover:border-primary-amber/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            :style="{ background: tile.gradient }">
            <span class="text-[3rem]">{{ tile.icon }}</span>
            <div class="flex flex-col gap-1">
              <h3 class="m-0 text-[1.7rem] font-bold text-white group-hover:text-primary-amber transition-colors duration-200">
                {{ tile.name }}
              </h3>
              <span class="text-[1.25rem] text-text-secondary">{{ tile.desc }}</span>
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
