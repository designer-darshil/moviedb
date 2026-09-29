<template>
  <main class="main pb-20">
    <!-- Featured Hero Showcase with cycling indicators -->
    <Hero v-if="featured" :item="featured" :featured-list="heroFeaturedList" />

    <!-- 1. TRENDING DISCOVERY: Sleek Horizontal Rail with Rank Badges -->
    <ListingCarousel
      v-if="trendingMovies && trendingMovies.results.length"
      title="Trending Discovery"
      subtitle="Today's most watched films worldwide"
      :is-ranked="true"
      :view-all-url="trendingMoviesUrl"
      :items="trendingMovies" />

    <!-- 2. EDITORIAL SPOTLIGHT: Asymmetric Curated Feature + Supporting Picks -->
    <EditorialSpotlight
      v-if="editorialFeature"
      title="Critics' Selection & Modern Classics"
      tag="Editorial Spotlight"
      :feature="editorialFeature"
      :supporting="editorialSupporting"
      :view-all-url="topRatedMoviesUrl" />

    <!-- 3. ACCLAIMED TELEVISION: Curated Series Rail -->
    <ListingCarousel
      v-if="trendingTv && trendingTv.results.length"
      title="Acclaimed Television"
      subtitle="Compelling stories defining episodic entertainment"
      :view-all-url="trendingTvUrl"
      :items="trendingTv" />

    <!-- 4. MORE TO DISCOVER: Clean Poster-First Grid with Interactive Category Switcher -->
    <section
      class="my-8 sm:my-12 px-4 sm:px-8 lg:px-12 max-w-[1600px] mx-auto w-full">
      <div
        class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <div
            class="flex items-center gap-2 mb-1.5 text-[1.15rem] font-semibold tracking-wider uppercase text-primary-amber">
            <span class="w-1.5 h-1.5 rounded-full bg-primary-amber" />
            <span>Discover More</span>
          </div>
          <h2
            class="m-0 font-display text-[2.2rem] sm:text-[2.6rem] font-bold text-white -tracking-wide">
            Explore The Catalog
          </h2>
        </div>

        <!-- Filter Tab Buttons -->
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="px-4 py-1.5 text-[1.25rem] font-medium rounded-lg cursor-pointer transition-colors duration-150"
            :class="
              activeDiscoverTab === 'popular'
                ? 'text-white bg-surface-3 font-semibold border border-border-medium'
                : 'text-text-muted bg-surface-1 border border-border-subtle hover:text-white hover:bg-surface-2'
            "
            @click="activeDiscoverTab = 'popular'">
            Popular
          </button>
          <button
            v-if="upcomingMovies && upcomingMovies.results.length"
            type="button"
            class="px-4 py-1.5 text-[1.25rem] font-medium rounded-lg cursor-pointer transition-colors duration-150"
            :class="
              activeDiscoverTab === 'upcoming'
                ? 'text-white bg-surface-3 font-semibold border border-border-medium'
                : 'text-text-muted bg-surface-1 border border-border-subtle hover:text-white hover:bg-surface-2'
            "
            @click="activeDiscoverTab = 'upcoming'">
            Upcoming
          </button>
        </div>
      </div>

      <!-- Poster Cards Grid -->
      <transition name="fade" mode="out-in">
        <div
          :key="`discover-grid-${activeDiscoverTab}`"
          class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-5">
          <Card
            v-for="item in activeDiscoverItems"
            :key="`discover-${activeDiscoverTab}-${item.id}`"
            :item="item" />
        </div>
      </transition>

      <!-- View All Link Footer -->
      <div class="flex items-center justify-center mt-10">
        <nuxt-link
          :to="activeDiscoverUrl"
          class="inline-flex items-center gap-2 h-11 px-6 text-[1.35rem] font-medium rounded-lg text-text-primary bg-surface-2 border border-border-subtle hover:bg-surface-3 hover:text-white transition-colors duration-200">
          <span>Browse All
            {{
              activeDiscoverTab === 'popular'
                ? 'Popular Films'
                : 'Upcoming Releases'
            }}</span>
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
    </section>
  </main>
</template>

<script>
import { getTrending, getMovies, getMovie } from '~/api';
import Hero from '~/components/Hero';
import Card from '~/components/Card';
import ListingCarousel from '~/components/ListingCarousel';
import EditorialSpotlight from '~/components/EditorialSpotlight';

export default {
  components: {
    Hero,
    Card,
    ListingCarousel,
    EditorialSpotlight,
  },

  async asyncData ({ error }) {
    try {
      const [
        popularMovies,
        trendingMovies,
        topRatedMovies,
        upcomingMovies,
        trendingTv,
      ] = await Promise.all([
        getMovies('popular'),
        getTrending('movie'),
        getMovies('top_rated'),
        getMovies('upcoming'),
        getTrending('tv'),
      ]);

      // Featured hero: detailed movie from trending/popular
      const heroId = trendingMovies.results[0]
        ? trendingMovies.results[0].id
        : popularMovies.results[0].id;
      const featured = await getMovie(heroId);

      return {
        popularMovies,
        trendingMovies,
        topRatedMovies,
        upcomingMovies,
        trendingTv,
        featured,
      };
    } catch {
      error({ statusCode: 504, message: 'Data not available' });
    }
  },

  data () {
    return {
      activeDiscoverTab: 'popular',
    };
  },

  head () {
    return {
      title: 'CINEPULSE — Discover Movies, TV Shows & People',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Discover popular, trending, and top-rated movies and television series.',
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
    heroFeaturedList () {
      if (this.trendingMovies && this.trendingMovies.results) {
        return this.trendingMovies.results.slice(0, 5);
      }
      return null;
    },

    trendingMoviesUrl () {
      return { name: 'movie-category-name', params: { name: 'trending' } };
    },

    topRatedMoviesUrl () {
      return { name: 'movie-category-name', params: { name: 'top_rated' } };
    },

    trendingTvUrl () {
      return { name: 'tv-category-name', params: { name: 'trending' } };
    },

    editorialFeature () {
      if (
        this.topRatedMovies &&
        this.topRatedMovies.results &&
        this.topRatedMovies.results.length
      ) {
        return this.topRatedMovies.results[0];
      }
      return null;
    },

    editorialSupporting () {
      if (
        this.topRatedMovies &&
        this.topRatedMovies.results &&
        this.topRatedMovies.results.length > 1
      ) {
        return this.topRatedMovies.results.slice(1, 5);
      }
      return [];
    },

    activeDiscoverItems () {
      if (this.activeDiscoverTab === 'upcoming' && this.upcomingMovies) {
        return this.upcomingMovies.results.slice(0, 12);
      }
      return this.popularMovies && this.popularMovies.results
        ? this.popularMovies.results.slice(0, 12)
        : [];
    },

    activeDiscoverUrl () {
      return {
        name: 'movie-category-name',
        params: { name: this.activeDiscoverTab },
      };
    },
  },
};
</script>
