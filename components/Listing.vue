<template>
  <div class="my-6 sm:my-8 lg:my-10 px-4 sm:px-8 lg:px-12">
    <!-- Header -->
    <div v-if="title || viewAllUrl" class="flex items-center justify-between mb-6">
      <div class="flex items-baseline gap-3">
        <h2 v-if="title" class="m-0 font-display text-[2rem] sm:text-[2.4rem] font-bold text-white -tracking-wide">
          {{ title }}
        </h2>
        <span v-if="items.total_results" class="text-[1.25rem] text-text-muted">
          {{ items.total_results | numberWithCommas }} titles
        </span>
      </div>

      <nuxt-link
        v-if="viewAllUrl"
        :to="viewAllUrl"
        class="inline-flex items-center gap-1 text-[1.3rem] font-medium text-text-muted hover:text-primary-amber transition-colors duration-200">
        <span>View all</span>
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

    <!-- Responsive Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
      <Card
        v-for="item in items.results"
        :key="`grid-card-${item.id}`"
        :item="item" />
    </div>

    <!-- Infinite Scroll Loading Indicator -->
    <div v-if="items.page < items.total_pages" class="flex items-center justify-center py-12">
      <div v-if="loading" class="flex items-center gap-3 text-text-muted text-[1.3rem]">
        <span class="w-5 h-5 border-2 border-white/20 border-t-primary-amber rounded-full animate-spin" />
        <span>Loading more titles...</span>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from '~/mixins/Functions';
import Card from '~/components/Card';

export default {
  components: {
    Card,
  },

  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },

    viewAllUrl: {
      type: Object,
      required: false,
      default: () => null,
    },

    items: {
      type: Object,
      required: true,
    },
  },

  data () {
    return {
      loading: false,
    };
  },

  mounted () {
    window.addEventListener('scroll', this.scrollHandler);
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.scrollHandler);
  },

  methods: {
    scrollHandler () {
      debounce(this.scrollEvent(), 100);
    },

    scrollEvent () {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 400 && !this.loading) {
        if (this.items.page < this.items.total_pages) {
          this.loading = true;
          this.$emit('loadMore');
        }
      }
    },
  },
};
</script>
