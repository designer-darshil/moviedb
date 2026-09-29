<template>
  <main class="main">
    <TopNav :title="metaTitle" />

    <!-- Category Pill Switcher -->
    <div class="tw-px-4 sm:tw-px-8 lg:tw-px-12 tw-pt-6 sm:tw-pt-8 lg:tw-pt-10">
      <div class="tw-flex tw-items-center tw-gap-2 tw-overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:tw-hidden">
        <nuxt-link
          v-for="cat in categories"
          :key="cat.query"
          :to="{ name: 'movie-category-name', params: { name: cat.query } }"
          class="tw-inline-flex tw-items-center tw-px-5 tw-py-2 tw-text-[1.3rem] tw-font-semibold tw-rounded-full tw-whitespace-nowrap tw-transition-all tw-duration-200"
          :class="$route.params.name === cat.query
            ? '!tw-text-[#07080b] !tw-bg-primary-amber !tw-border-primary-amber !tw-font-bold tw-shadow-[0_2px_12px_rgba(229,169,60,0.4)]'
            : 'tw-text-text-secondary tw-bg-surface-2 tw-border tw-border-border-subtle hover:tw-text-white hover:tw-bg-surface-3 hover:tw-border-border-medium'">
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
import { getTrending, getMovies, getListItem } from '~/api';
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
        ? getTrending('movie')
        : getMovies(to.params.name);

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
          ? await getTrending('movie')
          : await getMovies(params.name);
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
        { title: 'Upcoming', query: 'upcoming' },
        { title: 'Now Playing', query: 'now_playing' },
      ],
    };
  },

  head () {
    return {
      title: `${this.metaTitle} — Movies — CINEPULSE`,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${this.metaTitle} — Movies`,
        },
        {
          hid: 'description',
          name: 'description',
          content: `Browse ${this.metaTitle} cinema catalog.`,
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
    title () {
      return this.metaTitle;
    },

    metaTitle () {
      return getListItem('movie', this.$route.params.name).title;
    },
  },

  methods: {
    loadMore () {
      this.loading = true;

      if (this.$route.params.name === 'trending') {
        getTrending('movie', this.items.page + 1)
          .then((response) => {
            this.items.results = this.items.results.concat(response.results);
            this.items.page = response.page;
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      } else {
        getMovies(this.$route.params.name, this.items.page + 1)
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
