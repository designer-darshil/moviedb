<template>
  <main class="main">
    <TopNav :title="metaTitle" />

    <!-- Genre Pill Switcher -->
    <div class="px-4 sm:px-8 lg:px-12 pt-6 sm:pt-8 lg:pt-10">
      <div class="flex items-center gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-2">
        <nuxt-link
          v-for="g in allGenres"
          :key="g.id"
          :to="`/genre/${g.id}/tv`"
          class="inline-flex items-center px-5 py-2 text-[1.3rem] font-semibold rounded-full whitespace-nowrap transition-all duration-200"
          :class="genre.id === g.id
            ? '!text-[#07080b] !bg-primary-amber !border-primary-amber !font-bold shadow-[0_2px_12px_rgba(229,169,60,0.4)]'
            : 'text-text-secondary bg-surface-2 border border-border-subtle hover:text-white hover:bg-surface-3 hover:border-border-medium'">
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
      const items = await getMediaByGenre('tv', params.id);
      const allGenres = await getGenreList('tv');
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
        return `TV Genre: ${this.genre.name}`;
      } else {
        return 'TV Genre';
      }
    },
  },

  methods: {
    loadMore () {
      this.loading = true;

      getMediaByGenre('tv', this.$route.params.id, this.items.page + 1)
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
