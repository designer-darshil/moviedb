<template>
  <main class="main pb-20">
    <TopNav :title="metaTitle" />

    <!-- Category Header Banner -->
    <div class="px-4 sm:px-8 lg:px-12 pt-8 sm:pt-12 max-w-[1600px] mx-auto">
      <div class="flex flex-col gap-2 mb-6">
        <div
          class="flex items-center gap-2 text-[1.15rem] font-semibold tracking-wider uppercase text-primary-amber"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-primary-amber" />
          <span>Television Catalog</span>
        </div>
        <h1
          class="m-0 font-display text-[2.8rem] sm:text-[3.6rem] font-extrabold text-white -tracking-wide"
        >
          {{ metaTitle }}
        </h1>
        <p class="m-0 text-[1.4rem] text-text-muted max-w-[640px]">
          Discover {{ metaTitle.toLowerCase() }} television shows, broadcast
          releases, and critical achievements.
        </p>
      </div>

      <!-- Category Pill Switcher -->
      <div
        class="flex items-center gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-2 border-b border-border-subtle"
      >
        <nuxt-link
          v-for="cat in categories"
          :key="cat.query"
          v-ripple
          :to="{ name: 'tv-category-name', params: { name: cat.query } }"
          class="inline-flex items-center px-4 py-2 text-[1.25rem] font-semibold rounded-xl whitespace-nowrap transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary-amber"
          :class="
            $route.params.name === cat.query
              ? 'text-white bg-surface-3 border border-border-medium shadow-cinema-sm'
              : 'text-text-muted bg-surface-1 border border-border-subtle hover:text-white hover:bg-surface-2'
          "
        >
          {{ cat.title }}
        </nuxt-link>
      </div>
    </div>

    <Listing
      v-if="items && items.results.length"
      :items="items"
      :loading="loading"
      @loadMore="loadMore"
    />
  </main>
</template>

<script>
import { getTrending, getTvShows, getListItem } from '~/api';
import TopNav from '~/components/global/TopNav';
import Listing from '~/components/Listing';

export default {
  components: {
    TopNav,
    Listing,
  },

  beforeRouteUpdate(to, from, next) {
    this.loading = true;
    const fetcher =
      to.params.name === 'trending'
        ? getTrending('tv')
        : getTvShows(to.params.name);

    fetcher
      .then((response) => {
        this.items = response;
        this.loading = false;
        next();
      })
      .catch(() => {
        this.loading = false;
      });
  },

  async asyncData({ params, error }) {
    try {
      const items =
        params.name === 'trending'
          ? await getTrending('tv')
          : await getTvShows(params.name);
      return { items };
    } catch {
      error({ message: 'Page not found' });
    }
  },

  data() {
    return {
      loading: false,
      categories: [
        { title: 'Trending', query: 'trending' },
        { title: 'Popular', query: 'popular' },
        { title: 'Top Rated', query: 'top_rated' },
        { title: 'Currently Airing', query: 'on_the_air' },
        { title: 'Airing Today', query: 'airing_today' },
      ],
    };
  },

  head() {
    return {
      title: `${this.metaTitle} — Television — CINEPULSE`,
      meta: [
        { hid: 'og:title', property: 'og:title', content: this.metaTitle },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.FRONTEND_URL}${this.$route.path}`,
        },
      ],
      bodyAttrs: {
        class: 'topnav-active',
      },
    };
  },

  computed: {
    metaTitle() {
      return this.title;
    },

    title() {
      return getListItem('tv', this.$route.params.name).title;
    },
  },

  methods: {
    loadMore() {
      this.loading = true;

      if (this.$route.params.name === 'trending') {
        getTrending('tv', this.items.page + 1)
          .then((response) => {
            this.items.results = this.items.results.concat(response.results);
            this.items.page = response.page;
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      } else {
        getTvShows(this.$route.params.name, this.items.page + 1)
          .then((response) => {
            this.items.results = this.items.results.concat(response.results);
            this.items.page = response.page;
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },
  },
};
</script>
