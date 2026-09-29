<template>
  <main class="main">
    <!-- Featured Series Spotlight -->
    <Hero :item="featured" />

    <!-- Category Discovery Switcher Bar -->
    <section class="tw-relative tw-z-10 -tw-mt-6 sm:-tw-mt-8 tw-px-4 sm:tw-px-8 lg:tw-px-12 tw-pb-8">
      <div class="tw-flex tw-items-center tw-gap-4 tw-max-w-[1600px] tw-mx-auto tw-px-5 tw-py-3 tw-bg-[rgba(14,17,23,0.9)] tw-backdrop-blur-xl tw-border tw-border-white/15 tw-rounded-full tw-shadow-cinema-md">
        <span class="tw-hidden sm:tw-inline-block tw-text-[1.2rem] tw-font-bold tw-uppercase tw-tracking-widest tw-text-primary-amber tw-shrink-0">Explore Television:</span>
        <div class="tw-flex tw-items-center tw-gap-2 tw-overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:tw-hidden">
          <nuxt-link
            :to="{ name: 'tv-category-name', params: { name: 'popular' } }"
            class="tw-inline-flex tw-items-center tw-px-4 tw-py-1.5 tw-text-[1.3rem] tw-font-semibold tw-text-text-secondary tw-bg-surface-2 tw-border tw-border-border-subtle tw-rounded-full tw-whitespace-nowrap hover:tw-text-[#07080b] hover:tw-bg-primary-amber hover:tw-border-primary-amber hover:tw-shadow-[0_2px_12px_rgba(229,169,60,0.4)] hover:-tw-translate-y-0.5 tw-transition-all tw-duration-200">
            Popular Series
          </nuxt-link>
          <nuxt-link
            :to="{ name: 'tv-category-name', params: { name: 'top_rated' } }"
            class="tw-inline-flex tw-items-center tw-px-4 tw-py-1.5 tw-text-[1.3rem] tw-font-semibold tw-text-text-secondary tw-bg-surface-2 tw-border tw-border-border-subtle tw-rounded-full tw-whitespace-nowrap hover:tw-text-[#07080b] hover:tw-bg-primary-amber hover:tw-border-primary-amber hover:tw-shadow-[0_2px_12px_rgba(229,169,60,0.4)] hover:-tw-translate-y-0.5 tw-transition-all tw-duration-200">
            Top Rated
          </nuxt-link>
          <nuxt-link
            :to="{ name: 'tv-category-name', params: { name: 'on_the_air' } }"
            class="tw-inline-flex tw-items-center tw-px-4 tw-py-1.5 tw-text-[1.3rem] tw-font-semibold tw-text-text-secondary tw-bg-surface-2 tw-border tw-border-border-subtle tw-rounded-full tw-whitespace-nowrap hover:tw-text-[#07080b] hover:tw-bg-primary-amber hover:tw-border-primary-amber hover:tw-shadow-[0_2px_12px_rgba(229,169,60,0.4)] hover:-tw-translate-y-0.5 tw-transition-all tw-duration-200">
            Currently Airing
          </nuxt-link>
          <nuxt-link
            :to="{ name: 'tv-category-name', params: { name: 'airing_today' } }"
            class="tw-inline-flex tw-items-center tw-px-4 tw-py-1.5 tw-text-[1.3rem] tw-font-semibold tw-text-text-secondary tw-bg-surface-2 tw-border tw-border-border-subtle tw-rounded-full tw-whitespace-nowrap hover:tw-text-[#07080b] hover:tw-bg-primary-amber hover:tw-border-primary-amber hover:tw-shadow-[0_2px_12px_rgba(229,169,60,0.4)] hover:-tw-translate-y-0.5 tw-transition-all tw-duration-200">
            Airing Today
          </nuxt-link>
        </div>
      </div>
    </section>

    <!-- Popular TV Series Carousel (Ranked) -->
    <ListingCarousel
      v-if="popular && popular.results.length"
      :title="popularTitle"
      subtitle="Binge-worthy shows dominating cultural conversations"
      :view-all-url="popularUrl"
      :items="popular"
      :is-ranked="true" />

    <!-- Top Rated TV Shows Carousel -->
    <ListingCarousel
      v-if="topRated && topRated.results.length"
      :title="topRatedTitle"
      subtitle="Critically acclaimed masterpieces with legendary reviews"
      :view-all-url="topRatedUrl"
      :items="topRated" />

    <!-- Currently Airing Series Carousel -->
    <ListingCarousel
      v-if="onAir && onAir.results.length"
      :title="onAirTitle"
      subtitle="Ongoing broadcast seasons dropping new episodes weekly"
      :view-all-url="onAirUrl"
      :items="onAir" />

    <!-- Airing Today Carousel -->
    <ListingCarousel
      v-if="airingToday && airingToday.results.length"
      :title="airingTodayTitle"
      subtitle="Fresh episodes premiering globally within the next 24 hours"
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

  async asyncData ({ error }) {
    try {
      const popular = await getTvShows('popular');
      const topRated = await getTvShows('top_rated');
      const onAir = await getTvShows('on_the_air');
      const airingToday = await getTvShows('airing_today');
      const featured = await getTvShow(popular.results[0].id);

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

    queryUrl () {
      return { name: 'tv-category-name', params: { name: 'airing_today' } };
    },

    airingTodayUrl () {
      return { name: 'tv-category-name', params: { name: 'airing_today' } };
    },
  },
};
</script>
