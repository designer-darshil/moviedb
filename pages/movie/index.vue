<template>
  <main class="main">
    <Hero
      v-if="featured"
      :item="featured" />

    <ListingCarousel
      v-if="popular && popular.results.length"
      :title="popularTitle"
      :view-all-url="popularUrl"
      :items="popular" />

    <ListingCarousel
      v-if="nowPlaying && nowPlaying.results.length"
      :title="nowPlayingTitle"
      :view-all-url="nowPlayingUrl"
      :items="nowPlaying" />

    <ListingCarousel
      v-if="topRated && topRated.results.length"
      :title="topRatedTitle"
      :view-all-url="topRatedUrl"
      :items="topRated" />

    <ListingCarousel
      v-if="upcoming && upcoming.results.length"
      :title="upcomingTitle"
      :view-all-url="upcomingUrl"
      :items="upcoming" />
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

  head () {
    return {
      title: 'Movies — CinemaDB',
      meta: [
        { hid: 'og:title', property: 'og:title', content: 'Movies — CinemaDB' },
        { hid: 'og:description', property: 'og:description', content: 'Browse popular, top-rated, upcoming, and currently playing feature films.' },
        { hid: 'og:url', property: 'og:url', content: `${process.env.FRONTEND_URL}${this.$route.path}` },
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

  async asyncData ({ error }) {
    try {
      const [popular, topRated, upcoming, nowPlaying] = await Promise.all([
        getMovies('popular'),
        getMovies('top_rated'),
        getMovies('upcoming'),
        getMovies('now_playing'),
      ]);

      let featured = null;
      if (nowPlaying && nowPlaying.results && nowPlaying.results.length) {
        featured = await getMovie(nowPlaying.results[0].id);
      } else if (popular && popular.results && popular.results.length) {
        featured = await getMovie(popular.results[0].id);
      }

      return { popular, topRated, upcoming, nowPlaying, featured };
    } catch {
      error({ statusCode: 504, message: 'Data not available' });
    }
  },
};
</script>
