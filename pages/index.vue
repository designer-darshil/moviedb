<template>
  <main class="main pb-16">
    <!-- Featured Hero Showcase -->
    <Hero
      v-if="featured"
      :item="featured" />

    <!-- Movie & TV Discovery Sections -->
    <div class="flex flex-col gap-2 mt-4 sm:mt-6">
      <!-- Popular Movies -->
      <ListingCarousel
        v-if="popularMovies && popularMovies.results.length"
        :title="popularMoviesTitle"
        :view-all-url="popularMoviesUrl"
        :items="popularMovies" />

      <!-- Trending Movies -->
      <ListingCarousel
        v-if="trendingMovies && trendingMovies.results.length"
        :title="trendingMoviesTitle"
        :view-all-url="trendingMoviesUrl"
        :items="trendingMovies" />

      <!-- Top Rated Movies -->
      <ListingCarousel
        v-if="topRatedMovies && topRatedMovies.results.length"
        :title="topRatedMoviesTitle"
        :view-all-url="topRatedMoviesUrl"
        :items="topRatedMovies" />

      <!-- Trending TV Shows -->
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
import ListingCarousel from '~/components/ListingCarousel';

export default {
  components: {
    Hero,
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
  },
};
</script>
