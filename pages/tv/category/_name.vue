<template>
  <main class="main">
    <TopNav :title="metaTitle" />

    <!-- Category Pill Switcher -->
    <div class="px-4 sm:px-8 lg:px-12 pt-6 sm:pt-8 max-w-[1600px] mx-auto">
      <div class="flex items-center gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <nuxt-link
          v-for="cat in categories"
          :key="cat.query"
          :to="{ name: 'tv-category-name', params: { name: cat.query } }"
          class="inline-flex items-center px-4 py-1.5 text-[1.25rem] font-medium rounded-md whitespace-nowrap transition-colors duration-150"
          :class="$route.params.name === cat.query
            ? 'text-white bg-surface-3 font-semibold'
            : 'text-text-muted bg-surface-1 border border-border-subtle hover:text-white hover:bg-surface-2'">
          {{ cat.title }}
        </nuxt-link>
      </div>
    </div>

    <Listing
      v-if="items && items.results.length"
      :title="title"
      :items="items"
      :loading="loading"
      @loadMore="loadMore" />
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

  beforeRouteUpdate (to, from, next) {
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

  async asyncData ({ params, error }) {
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

  data () {
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

  head () {
    return {
      title: `${this.metaTitle} — CINEPULSE`,
      meta: [
        { hid: 'og:title', property: 'og:title', content: this.metaTitle },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.FRONTEND_URL}${this.$route.path}`,
        },
      ],
    };
  },

  computed: {
    metaTitle () {
      return this.title;
    },

    title () {
      return getListItem('tv', this.$route.params.name).title;
    },
  },

  methods: {
    loadMore () {
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
