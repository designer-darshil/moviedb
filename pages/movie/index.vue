<template>
  <main class="main">
    <!-- Featured Cinema Spotlight -->
    <Hero :item="featured" />

    <!-- Category Discovery Switcher Bar -->
    <section class="tw-relative tw-z-10 -tw-mt-6 sm:-tw-mt-8 tw-px-4 sm:tw-px-8 lg:tw-px-12 tw-pb-8">
      <div class="tw-flex tw-items-center tw-gap-4 tw-max-w-[1600px] tw-mx-auto tw-px-5 tw-py-3 tw-bg-[rgba(14,17,23,0.9)] tw-backdrop-blur-xl tw-border tw-border-white/15 tw-rounded-full tw-shadow-cinema-md">
        <span class="tw-hidden sm:tw-inline-block tw-text-[1.2rem] tw-font-bold tw-uppercase tw-tracking-widest tw-text-primary-amber tw-shrink-0">Explore Cinema:</span>
        <div class="tw-flex tw-items-center tw-gap-2 tw-overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:tw-hidden">
          <nuxt-link
            :to="{ name: 'movie-category-name', params: { name: 'popular' } }"
            class="tw-inline-flex tw-items-center tw-px-4 tw-py-1.5 tw-text-[1.3rem] tw-font-semibold tw-text-text-secondary tw-bg-surface-2 tw-border tw-border-border-subtle tw-rounded-full tw-whitespace-nowrap hover:tw-text-[#07080b] hover:tw-bg-primary-amber hover:tw-border-primary-amber hover:tw-shadow-[0_2px_12px_rgba(229,169,60,0.4)] hover:-tw-translate-y-0.5 tw-transition-all tw-duration-200">
            Popular Films
          </nuxt-link>
          <nuxt-link
            :to="{ name: 'movie-category-name', params: { name: 'top_rated' } }"
            class="tw-inline-flex tw-items-center tw-px-4 tw-py-1.5 tw-text-[1.3rem] tw-font-semibold tw-text-text-secondary tw-bg-surface-2 tw-border tw-border-border-subtle tw-rounded-full tw-whitespace-nowrap hover:tw-text-[#07080b] hover:tw-bg-primary-amber hover:tw-border-primary-amber hover:tw-shadow-[0_2px_12px_rgba(229,169,60,0.4)] hover:-tw-translate-y-0.5 tw-transition-all tw-duration-200">
            Top Rated
          </nuxt-link>
          <nuxt-link
            :to="{ name: 'movie-category-name', params: { name: 'upcoming' } }"
            class="tw-inline-flex tw-items-center tw-px-4 tw-py-1.5 tw-text-[1.3rem] tw-font-semibold tw-text-text-secondary tw-bg-surface-2 tw-border tw-border-border-subtle tw-rounded-full tw-whitespace-nowrap hover:tw-text-[#07080b] hover:tw-bg-primary-amber hover:tw-border-primary-amber hover:tw-shadow-[0_2px_12px_rgba(229,169,60,0.4)] hover:-tw-translate-y-0.5 tw-transition-all tw-duration-200">
            Upcoming Releases
          </nuxt-link>
          <nuxt-link
            :to="{ name: 'movie-category-name', params: { name: 'now_playing' } }"
            class="tw-inline-flex tw-items-center tw-px-4 tw-py-1.5 tw-text-[1.3rem] tw-font-semibold tw-text-text-secondary tw-bg-surface-2 tw-border tw-border-border-subtle tw-rounded-full tw-whitespace-nowrap hover:tw-text-[#07080b] hover:tw-bg-primary-amber hover:tw-border-primary-amber hover:tw-shadow-[0_2px_12px_rgba(229,169,60,0.4)] hover:-tw-translate-y-0.5 tw-transition-all tw-duration-200">
            Now Playing
          </nuxt-link>
        </div>
      </div>
    </section>

    <!-- Popular Cinema Carousel (Ranked) -->
    <ListingCarousel
      v-if="popular && popular.results.length"
      :title="popularTitle"
      subtitle="Trending theatrical releases and crowd favourites"
      :view-all-url="popularUrl"
      :items="popular"
      :is-ranked="true" />

    <!-- Top Rated Masterpieces Carousel -->
    <ListingCarousel
      v-if="topRated && topRated.results.length"
      :title="topRatedTitle"
      subtitle="All-time cinematic milestones rated by millions"
      :view-all-url="topRatedUrl"
      :items="topRated" />

    <!-- Upcoming Releases Carousel -->
    <ListingCarousel
      v-if="upcoming && upcoming.results.length"
      :title="upcomingTitle"
      subtitle="Highly anticipated films heading to screens soon"
      :view-all-url="upcomingUrl"
      :items="upcoming" />

    <!-- Now In Theatres Carousel -->
    <ListingCarousel
      v-if="nowPlaying && nowPlaying.results.length"
      :title="nowPlayingTitle"
      subtitle="Currently screening in cinema halls today"
      :view-all-url="nowPlayingUrl"
      :items="nowPlaying" />
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
      const popular = await getMovies('popular');
      const topRated = await getMovies('top_rated');
      const upcoming = await getMovies('upcoming');
      const nowPlaying = await getMovies('now_playing');
      const featured = await getMovie(upcoming.results[0].id);

      return { popular, topRated, upcoming, nowPlaying, featured };
    } catch {
      error({ statusCode: 504, message: 'Data not available' });
    }
  },

  head () {
    return {
      title: 'Movies — CINEPULSE',
      meta: [
        { hid: 'og:title', property: 'og:title', content: 'Movies Catalog' },
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
