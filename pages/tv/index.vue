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
      v-if="onAir && onAir.results.length"
      :title="onAirTitle"
      :view-all-url="onAirUrl"
      :items="onAir" />

    <ListingCarousel
      v-if="topRated && topRated.results.length"
      :title="topRatedTitle"
      :view-all-url="topRatedUrl"
      :items="topRated" />

    <ListingCarousel
      v-if="airingToday && airingToday.results.length"
      :title="airingTodayTitle"
      :view-all-url="airingTodayUrl"
      :items="airingToday" />
  </main>
</template>

<script>
import { getTvShows, getTvShow, getListItem } from '~/api';
import Hero from '~/components/Hero';
import ListingCarousel from '~/components/ListingCarousel';

export default {
  components: {
    Hero,
    ListingCarousel,
  },

  head () {
    return {
      title: 'TV Series — CinemaDB',
      meta: [
        { hid: 'og:title', property: 'og:title', content: 'TV Series — CinemaDB' },
        { hid: 'og:description', property: 'og:description', content: 'Browse trending television series, currently airing shows, and all-time top rated productions.' },
        { hid: 'og:url', property: 'og:url', content: `${process.env.FRONTEND_URL}${this.$route.path}` },
      ],
    };
  },

  computed: {
    popularTitle () {
      return getListItem('tv', 'popular').title;
    },

    popularUrl () {
      return { name: 'tv-category-name', params: { name: 'popular' } };
    },

    topRatedTitle () {
      return getListItem('tv', 'top_rated').title;
    },

    topRatedUrl () {
      return { name: 'tv-category-name', params: { name: 'top_rated' } };
    },

    onAirTitle () {
      return getListItem('tv', 'on_the_air').title;
    },

    onAirUrl () {
      return { name: 'tv-category-name', params: { name: 'on_the_air' } };
    },

    airingTodayTitle () {
      return getListItem('tv', 'airing_today').title;
    },

    airingTodayUrl () {
      return { name: 'tv-category-name', params: { name: 'airing_today' } };
    },
  },

  async asyncData ({ error }) {
    try {
      const [popular, topRated, onAir, airingToday] = await Promise.all([
        getTvShows('popular'),
        getTvShows('top_rated'),
        getTvShows('on_the_air'),
        getTvShows('airing_today'),
      ]);

      let featured = null;
      if (popular && popular.results && popular.results.length) {
        featured = await getTvShow(popular.results[0].id);
      }

      return { popular, topRated, onAir, airingToday, featured };
    } catch {
      error({ statusCode: 504, message: 'Data not available' });
    }
  },
};
</script>
