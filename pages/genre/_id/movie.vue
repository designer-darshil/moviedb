<template>
  <main class="main">
    <TopNav :title="metaTitle" />

    <!-- Genre Pill Switcher -->
    <div class="px-4 sm:px-8 lg:px-12 pt-6 sm:pt-8 max-w-[1600px] mx-auto">
      <div class="flex items-center gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-1">
        <nuxt-link
          v-for="g in allGenres"
          :key="g.id"
          :to="`/genre/${g.id}/movie`"
          class="inline-flex items-center px-4 py-1.5 text-[1.25rem] font-medium rounded-md whitespace-nowrap transition-colors duration-150"
          :class="genre.id === g.id
            ? 'text-white bg-surface-3 font-semibold'
            : 'text-text-muted bg-surface-1 border border-border-subtle hover:text-white hover:bg-surface-2'">
          {{ g.name }}
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
import { getMediaByGenre, getGenreList } from '~/api';
import TopNav from '~/components/global/TopNav';
import Listing from '~/components/Listing';

export default {
  components: {
    TopNav,
    Listing,
  },

  async asyncData ({ params, error }) {
    try {
      const items = await getMediaByGenre('movie', params.id);
      const allGenres = await getGenreList('movie');
      const genre = allGenres.find(g => g.id === parseInt(params.id));

      if (genre) {
        return { items, genre, allGenres };
      } else {
        error({ message: 'Genre not found' });
      }
    } catch {
      error({ statusCode: 504, message: 'Data not available' });
    }
  },

  data () {
    return {
      loading: false,
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
      if (this.genre) {
        return `${this.genre.name} Movies`;
      } else {
        return 'Movie Genre';
      }
    },
  },

  methods: {
    loadMore () {
      this.loading = true;

      getMediaByGenre('movie', this.$route.params.id, this.items.page + 1)
        .then((response) => {
          this.items.results = this.items.results.concat(response.results);
          this.items.page = response.page;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>
