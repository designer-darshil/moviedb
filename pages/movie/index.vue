<template>
  <main class="main pb-16">
    <!-- Featured Cinema Spotlight -->
    <Hero :item="featured" />

    <!-- Movie Rails -->
    <div class="flex flex-col gap-2 mt-4 sm:mt-6">
      <!-- Popular Films -->
      <ListingCarousel
        v-if="popular && popular.results.length"
        :title="popularTitle"
        :view-all-url="popularUrl"
        :items="popular" />

      <!-- Top Rated Films -->
      <ListingCarousel
        v-if="topRated && topRated.results.length"
        :title="topRatedTitle"
        :view-all-url="topRatedUrl"
        :items="topRated" />

      <!-- Upcoming Releases -->
      <ListingCarousel
        v-if="upcoming && upcoming.results.length"
        :title="upcomingTitle"
        :view-all-url="upcomingUrl"
        :items="upcoming" />

      <!-- Now In Theatres -->
      <ListingCarousel
        v-if="nowPlaying && nowPlaying.results.length"
        :title="nowPlayingTitle"
        :view-all-url="nowPlayingUrl"
        :items="nowPlaying" />
    </div>
  </main>
</template>

<script>
import { getMovies, getMovie, getListItem } from '~/api';
import Hero from '~/components/Hero';
import ListingCarousel from '~/components/ListingCarousel';

export default {
  components: {
    Hero,
    ListingCarousel,
  },

  async asyncData ({ error }) {
    try {
      const [popular, topRated, upcoming, nowPlaying] = await Promise.all([
        getMovies('popular'),
        getMovies('top_rated'),
        getMovies('upcoming'),
        getMovies('now_playing'),
      ]);

      const heroId = upcoming.results[0] ? upcoming.results[0].id : popular.results[0].id;
      const featured = await getMovie(heroId);

      return { popular, topRated, upcoming, nowPlaying, featured };
    } catch {
      error({ statusCode: 504, message: 'Data not available' });
    }
  },

  head () {
    return {
      title: 'Movies — CINEPULSE',
      meta: [
        { hid: 'og:title', property: 'og:title', content: 'Movies' },
        {
          hid: 'description',
          name: 'description',
          content: 'Explore popular, top rated, upcoming and now playing movies.',
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.FRONTEND_URL}${this.$route.path}`,
        },
      ],
    };
  },

  computed: {
    popularTitle () {
      return getListItem('movie', 'popular').title;
    },

    popularUrl () {
      return { name: 'movie-category-name', params: { name: 'popular' } };
    },

    topRatedTitle () {
      return getListItem('movie', 'top_rated').title;
    },

    topRatedUrl () {
      return { name: 'movie-category-name', params: { name: 'top_rated' } };
    },

    upcomingTitle () {
      return getListItem('movie', 'upcoming').title;
    },

    upcomingUrl () {
      return { name: 'movie-category-name', params: { name: 'upcoming' } };
    },

    nowPlayingTitle () {
      return getListItem('movie', 'now_playing').title;
    },

    nowPlayingUrl () {
      return { name: 'movie-category-name', params: { name: 'now_playing' } };
    },
  },
};
</script>
