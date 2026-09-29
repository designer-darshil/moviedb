<template>
  <main class="main pb-20">
    <!-- Featured Series Spotlight -->
    <Hero :item="featured" />

    <!-- TV Category Quick Jump Bar -->
    <div class="px-4 sm:px-8 lg:px-12 pt-6 sm:pt-8 max-w-[1600px] mx-auto">
      <div
        class="flex items-center gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-1"
      >
        <nuxt-link
          v-for="cat in quickCategories"
          :key="cat.query"
          :to="{ name: 'tv-category-name', params: { name: cat.query } }"
          class="inline-flex items-center px-4 py-2 text-[1.25rem] font-semibold rounded-xl whitespace-nowrap text-text-muted bg-surface-1 border border-border-subtle hover:text-white hover:bg-surface-2 hover:border-primary-amber/40 transition-all duration-150"
        >
          {{ cat.title }}
        </nuxt-link>
      </div>
    </div>

    <!-- TV Series Rails -->
    <div class="flex flex-col gap-2 mt-4 sm:mt-6">
      <!-- Popular TV Series -->
      <ListingCarousel
        v-if="popular && popular.results.length"
        :title="popularTitle"
        subtitle="The most watched television shows capturing audience attention"
        :view-all-url="popularUrl"
        :items="popular"
      />

      <!-- Top Rated TV Shows -->
      <ListingCarousel
        v-if="topRated && topRated.results.length"
        :title="topRatedTitle"
        subtitle="Masterpiece series and landmark television accomplishments"
        :view-all-url="topRatedUrl"
        :items="topRated"
      />

      <!-- Currently Airing Series -->
      <ListingCarousel
        v-if="onAir && onAir.results.length"
        :title="onAirTitle"
        subtitle="Series currently broadcasting new weekly episodes"
        :view-all-url="onAirUrl"
        :items="onAir"
      />

      <!-- Airing Today -->
      <ListingCarousel
        v-if="airingToday && airingToday.results.length"
        :title="airingTodayTitle"
        subtitle="New episodes scheduled to broadcast within the next 24 hours"
        :view-all-url="airingTodayUrl"
        :items="airingToday"
      />
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

  async asyncData({ error }) {
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

  data() {
    return {
      quickCategories: [
        { title: 'Popular', query: 'popular' },
        { title: 'Top Rated', query: 'top_rated' },
        { title: 'Currently Airing', query: 'on_the_air' },
        { title: 'Airing Today', query: 'airing_today' },
        { title: 'Trending', query: 'trending' },
      ],
    };
  },

  head() {
    return {
      title: 'Television Series — CINEPULSE',
      meta: [
        { hid: 'og:title', property: 'og:title', content: 'Television Series' },
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
    popularTitle() {
      return getListItem('tv', 'popular').title;
    },

    popularUrl() {
      return { name: 'tv-category-name', params: { name: 'popular' } };
    },

    topRatedTitle() {
      return getListItem('tv', 'top_rated').title;
    },

    topRatedUrl() {
      return { name: 'tv-category-name', params: { name: 'top_rated' } };
    },

    onAirTitle() {
      return getListItem('tv', 'on_the_air').title;
    },

    onAirUrl() {
      return { name: 'tv-category-name', params: { name: 'on_the_air' } };
    },

    airingTodayTitle() {
      return getListItem('tv', 'airing_today').title;
    },

    airingTodayUrl() {
      return { name: 'tv-category-name', params: { name: 'airing_today' } };
    },
  },
};
</script>
