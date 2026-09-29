<template>
  <div class="my-8 sm:my-12 lg:my-16 mb-16 sm:mb-20 px-4 sm:px-8 lg:px-12">
    <div v-if="title || viewAllUrl" class="flex items-end justify-between mb-8">
      <div class="flex items-center gap-3.5">
        <span class="inline-block w-1 h-8 rounded-full bg-gradient-to-b from-primary-amber to-[#ff8a00] shadow-[0_0_12px_rgba(229,169,60,0.4)]" />
        <div>
          <h2 v-if="title" class="m-0 font-display text-[2.4rem] sm:text-[3rem] font-extrabold text-white -tracking-wide">
            {{ title }}
          </h2>
          <span v-if="items.total_results" class="text-[1.25rem] font-medium text-text-muted">
            {{ items.total_results | numberWithCommas }} Titles Available
          </span>
        </div>
      </div>

      <nuxt-link
        v-if="viewAllUrl"
        :to="viewAllUrl"
        class="inline-flex items-center gap-1.5 text-[1.4rem] font-bold text-primary-amber hover:text-primary-hover hover:translate-x-1 transition-all duration-200">
        <span>Explore All</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </nuxt-link>
    </div>

    <div class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 2xl:grid-cols-6 gap-4.5 xs:gap-5.5 sm:gap-6.5 2xl:gap-7">
      <Card
        v-for="item in items.results"
        :key="`card-${item.id}`"
        :item="item" />
    </div>

    <!-- Infinite Scroll Loading Indicator -->
    <div v-if="items.page < items.total_pages" class="flex items-center justify-center py-12">
      <div v-if="loading" class="flex flex-col items-center gap-3.5">
        <span class="w-9 h-9 border-[3px] border-primary-amber/20 border-t-primary-amber rounded-full animate-spin" />
        <span class="text-[1.35rem] font-medium text-text-muted tracking-wide">Loading more titles...</span>
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
