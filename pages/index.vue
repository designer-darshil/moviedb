<template>
  <main class="main pb-16">
    <!-- Featured Hero Showcase -->
    <Hero
      v-if="featured"
      :item="featured" />

    <!-- Movie & TV Discovery Hierarchy -->
    <div class="flex flex-col gap-6 sm:gap-8 mt-4 sm:mt-6">
      <!-- 1. TRENDING: Horizontal movie rail -->
      <ListingCarousel
        v-if="trendingMovies && trendingMovies.results.length"
        :title="trendingMoviesTitle"
        :view-all-url="trendingMoviesUrl"
        :items="trendingMovies" />

      <!-- 2. POPULAR: Movie grid -->
      <section
        v-if="popularMovies && popularMovies.results.length"
        class="my-4 sm:my-6 px-4 sm:px-8 lg:px-12 max-w-[1600px] mx-auto w-full">
        <div class="flex items-center justify-between mb-4 sm:mb-6">
          <h2 class="m-0 font-display text-[2rem] sm:text-[2.2rem] font-bold text-white -tracking-wide">
            {{ popularMoviesTitle }}
          </h2>

          <nuxt-link
            :to="popularMoviesUrl"
            class="inline-flex items-center gap-1 text-[1.25rem] font-medium text-text-muted hover:text-primary-amber transition-colors duration-200">
            <span>View all</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </nuxt-link>
        </div>

        <div class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-5">
          <Card
            v-for="item in popularGridItems"
            :key="`home-popular-${item.id}`"
            :item="item" />
        </div>
      </section>

      <!-- 3. TOP RATED: Movie rail -->
      <ListingCarousel
        v-if="topRatedMovies && topRatedMovies.results.length"
        :title="topRatedMoviesTitle"
        :view-all-url="topRatedMoviesUrl"
        :items="topRatedMovies" />

      <!-- 4. TRENDING TV: TV rail -->
      <ListingCarousel
        v-if="trendingTv && trendingTv.results.length"
        :title="trendingTvTitle"
        :view-all-url="trendingTvUrl"
        :items="trendingTv" />
    </div>
  </main>
</template>

<script>
import { getTrending, getMovies, getMovie, getListItem } from '~/api';
import Hero from '~/components/Hero';
import Card from '~/components/Card';
import ListingCarousel from '~/components/ListingCarousel';

export default {
  components: {
    Hero,
    Card,
    ListingCarousel,
  },

  async asyncData ({ error }) {
    try {
      const [popularMovies, trendingMovies, topRatedMovies, trendingTv] = await Promise.all([
        getMovies('popular'),
        getTrending('movie'),
        getMovies('top_rated'),
        getTrending('tv'),
      ]);

      // Featured hero: detailed movie from trending/popular
      const heroId = trendingMovies.results[0] ? trendingMovies.results[0].id : popularMovies.results[0].id;
      const featured = await getMovie(heroId);

      return {
        popularMovies,
        trendingMovies,
        topRatedMovies,
        trendingTv,
        featured,
      };
    } catch {
      error({ statusCode: 504, message: 'Data not available' });
    }
  },

  head () {
    return {
      title: 'CINEPULSE — Discover Movies, TV Shows & People',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Discover popular, trending, and top-rated movies and television series.',
        },
        { hid: 'og:title', property: 'og:title', content: 'CINEPULSE' },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Simple, modern movie discovery product.',
        },
      ],
    };
  },

  computed: {
    popularMoviesTitle () {
      return getListItem('movie', 'popular').title;
    },

    popularMoviesUrl () {
      return { name: 'movie-category-name', params: { name: 'popular' } };
    },

    trendingMoviesTitle () {
      return getListItem('movie', 'trending').title;
    },

    trendingMoviesUrl () {
      return { name: 'movie-category-name', params: { name: 'trending' } };
    },

    topRatedMoviesTitle () {
      return getListItem('movie', 'top_rated').title;
    },

    topRatedMoviesUrl () {
      return { name: 'movie-category-name', params: { name: 'top_rated' } };
    },

    trendingTvTitle () {
      return getListItem('tv', 'trending').title;
    },

    trendingTvUrl () {
      return { name: 'tv-category-name', params: { name: 'trending' } };
    },

    popularGridItems () {
      return this.popularMovies && this.popularMovies.results
        ? this.popularMovies.results.slice(0, 12)
        : [];
    },
  },
};
</script>
