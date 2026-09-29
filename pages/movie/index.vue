<template>
  <main class="main">
    <!-- Featured Cinema Spotlight -->
    <Hero :item="featured" />

    <!-- Category Discovery Switcher Bar -->
    <section class="relative z-10 -mt-6 sm:-mt-8 px-4 sm:px-8 lg:px-12 pb-8">
      <div class="flex items-center gap-4 max-w-[1600px] mx-auto px-5 py-3 bg-[rgba(14,17,23,0.9)] backdrop-blur-xl border border-white/15 rounded-full shadow-cinema-md">
        <span class="hidden sm:inline-block text-[1.2rem] font-bold uppercase tracking-widest text-primary-amber shrink-0">Explore Cinema:</span>
        <div class="flex items-center gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <nuxt-link
            :to="{ name: 'movie-category-name', params: { name: 'popular' } }"
            class="inline-flex items-center px-4 py-1.5 text-[1.3rem] font-semibold text-text-secondary bg-surface-2 border border-border-subtle rounded-full whitespace-nowrap hover:text-[#07080b] hover:bg-primary-amber hover:border-primary-amber hover:shadow-[0_2px_12px_rgba(229,169,60,0.4)] hover:-translate-y-0.5 transition-all duration-200">
            Popular Films
          </nuxt-link>
          <nuxt-link
            :to="{ name: 'movie-category-name', params: { name: 'top_rated' } }"
            class="inline-flex items-center px-4 py-1.5 text-[1.3rem] font-semibold text-text-secondary bg-surface-2 border border-border-subtle rounded-full whitespace-nowrap hover:text-[#07080b] hover:bg-primary-amber hover:border-primary-amber hover:shadow-[0_2px_12px_rgba(229,169,60,0.4)] hover:-translate-y-0.5 transition-all duration-200">
            Top Rated
          </nuxt-link>
          <nuxt-link
            :to="{ name: 'movie-category-name', params: { name: 'upcoming' } }"
            class="inline-flex items-center px-4 py-1.5 text-[1.3rem] font-semibold text-text-secondary bg-surface-2 border border-border-subtle rounded-full whitespace-nowrap hover:text-[#07080b] hover:bg-primary-amber hover:border-primary-amber hover:shadow-[0_2px_12px_rgba(229,169,60,0.4)] hover:-translate-y-0.5 transition-all duration-200">
            Upcoming Releases
          </nuxt-link>
          <nuxt-link
            :to="{ name: 'movie-category-name', params: { name: 'now_playing' } }"
            class="inline-flex items-center px-4 py-1.5 text-[1.3rem] font-semibold text-text-secondary bg-surface-2 border border-border-subtle rounded-full whitespace-nowrap hover:text-[#07080b] hover:bg-primary-amber hover:border-primary-amber hover:shadow-[0_2px_12px_rgba(229,169,60,0.4)] hover:-translate-y-0.5 transition-all duration-200">
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
