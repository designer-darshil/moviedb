<template>
  <main class="main pb-16">
    <!-- Featured Series Spotlight -->
    <Hero :item="featured" />

    <!-- TV Series Rails -->
    <div class="flex flex-col gap-2 mt-4 sm:mt-6">
      <!-- Popular TV Series -->
      <ListingCarousel
        v-if="popular && popular.results.length"
        :title="popularTitle"
        :view-all-url="popularUrl"
        :items="popular" />

      <!-- Top Rated TV Shows -->
      <ListingCarousel
        v-if="topRated && topRated.results.length"
        :title="topRatedTitle"
        :view-all-url="topRatedUrl"
        :items="topRated" />

      <!-- Currently Airing Series -->
      <ListingCarousel
        v-if="onAir && onAir.results.length"
        :title="onAirTitle"
        :view-all-url="onAirUrl"
        :items="onAir" />

      <!-- Airing Today -->
      <ListingCarousel
        v-if="airingToday && airingToday.results.length"
        :title="airingTodayTitle"
        :view-all-url="airingTodayUrl"
        :items="airingToday" />
    </div>
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

  async asyncData ({ error }) {
    try {
      const [popular, topRated, onAir, airingToday] = await Promise.all([
        getTvShows('popular'),
        getTvShows('top_rated'),
        getTvShows('on_the_air'),
        getTvShows('airing_today'),
      ]);

      const heroId = popular.results[0].id;
      const featured = await getTvShow(heroId);

      return { popular, topRated, onAir, airingToday, featured };
    } catch {
      error({ statusCode: 504, message: 'Data not available' });
    }
  },

  head () {
    return {
      title: 'TV Shows — CINEPULSE',
      meta: [
        { hid: 'og:title', property: 'og:title', content: 'TV Shows' },
        {
          hid: 'description',
          name: 'description',
          content: 'Browse popular, top rated, and airing TV series.',
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
};
</script>
