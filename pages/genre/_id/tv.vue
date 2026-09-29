<template>
  <main class="main pb-20">
    <TopNav :title="metaTitle" />

    <!-- Genre Header Banner -->
    <div class="px-4 sm:px-8 lg:px-12 pt-8 sm:pt-12 max-w-[1600px] mx-auto">
      <div class="flex flex-col gap-2 mb-6">
        <div
          class="flex items-center gap-2 text-[1.15rem] font-semibold tracking-wider uppercase text-primary-amber"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-primary-amber" />
          <span>Genre Discovery</span>
        </div>
        <h1
          class="m-0 font-display text-[2.8rem] sm:text-[3.6rem] font-extrabold text-white -tracking-wide"
        >
          {{ title }}
        </h1>
        <p class="m-0 text-[1.4rem] text-text-muted max-w-[640px]">
          Discover {{ genre ? genre.name.toLowerCase() : '' }} episodic stories
          and television achievements.
        </p>
      </div>

      <!-- Genre Pill Switcher -->
      <div
        class="flex items-center gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-2 border-b border-border-subtle"
      >
        <nuxt-link
          v-for="g in allGenres"
          :key="g.id"
          :to="`/genre/${g.id}/tv`"
          class="inline-flex items-center px-4 py-2 text-[1.25rem] font-semibold rounded-xl whitespace-nowrap transition-all duration-150"
          :class="
            genre && genre.id === g.id
              ? 'text-white bg-surface-3 border border-border-medium shadow-cinema-sm'
              : 'text-text-muted bg-surface-1 border border-border-subtle hover:text-white hover:bg-surface-2'
          "
        >
          {{ g.name }}
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
import { getMediaByGenre, getGenreList } from '~/api';
import TopNav from '~/components/global/TopNav';
import Listing from '~/components/Listing';

export default {
  components: {
    TopNav,
    Listing,
  },

  async asyncData({ params, error }) {
    try {
      const items = await getMediaByGenre('tv', params.id);
      const allGenres = await getGenreList('tv');
      const genre = allGenres.find((g) => g.id === parseInt(params.id));

      if (genre) {
        return { items, genre, allGenres };
      } else {
        error({ message: 'Genre not found' });
      }
    } catch {
      error({ statusCode: 504, message: 'Data not available' });
    }
  },

  data() {
    return {
      loading: false,
    };
  },

  head() {
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
      if (this.genre) {
        return `${this.genre.name} Series`;
      } else {
        return 'TV Genre';
      }
    },
  },

  methods: {
    loadMore() {
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
