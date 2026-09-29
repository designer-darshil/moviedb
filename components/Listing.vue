<template>
  <div
    class="my-6 sm:my-8 lg:my-10 px-4 sm:px-8 lg:px-12 max-w-[1600px] mx-auto w-full"
  >
    <!-- Header -->
    <div
      v-if="title || viewAllUrl"
      class="flex items-center justify-between mb-6 pb-2 border-b border-border-subtle"
    >
      <div class="flex items-baseline gap-3">
        <h2
          v-if="title"
          class="m-0 font-display text-[2rem] sm:text-[2.4rem] font-bold text-white -tracking-wide"
        >
          {{ title }}
        </h2>
        <span v-if="items.total_results" class="text-[1.25rem] text-text-muted">
          {{ items.total_results | numberWithCommas }} titles
        </span>
      </div>

      <nuxt-link
        v-if="viewAllUrl"
        :to="viewAllUrl"
        class="inline-flex items-center gap-1.5 text-[1.3rem] font-semibold text-text-muted hover:text-primary-amber transition-colors duration-200"
      >
        <span>View all</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </nuxt-link>
    </div>

    <!-- Responsive Grid -->
    <div
      v-if="items.results && items.results.length"
      class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-5"
    >
      <Card
        v-for="item in items.results"
        :key="`grid-card-${item.id}`"
        :item="item"
      />
    </div>

    <!-- Empty State -->
    <div v-else-if="!loading" class="py-12">
      <div
        class="flex flex-col items-center justify-center text-center p-8 bg-surface-1 border border-border-subtle rounded-2xl max-w-[480px] mx-auto"
      >
        <span
          class="flex items-center justify-center w-14 h-14 mb-4 rounded-xl bg-surface-2 text-text-muted"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
        </span>
        <h3 class="m-0 mb-1 text-[1.8rem] font-bold text-white">
          No titles available
        </h3>
        <p class="m-0 text-[1.3rem] text-text-muted">
          Check back later or explore another category.
        </p>
      </div>
    </div>

    <!-- Loading Shimmer Skeletons for Next Page -->
    <div v-if="loading" class="mt-6">
      <div
        class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-5"
      >
        <div
          v-for="n in 6"
          :key="`loading-skeleton-${n}`"
          class="flex flex-col gap-2"
        >
          <div
            class="relative w-full h-0 pt-[150%] rounded-xl overflow-hidden bg-surface-2 border border-border-subtle animate-pulse"
          />
          <div class="h-4 w-3/4 bg-surface-2 rounded animate-pulse" />
          <div class="h-3 w-1/2 bg-surface-2/60 rounded animate-pulse" />
        </div>
      </div>
    </div>

    <!-- End of Catalog Message -->
    <div
      v-if="
        items.page >= items.total_pages && items.results && items.results.length
      "
      class="flex items-center justify-center py-12 text-[1.25rem] text-text-subtle"
    >
      <span>You've reached the end of the catalog</span>
    </div>

    <!-- Floating Back to Top Button -->
    <button
      v-show="showBackToTop"
      type="button"
      aria-label="Back to Top"
      class="fixed bottom-20 md:bottom-8 right-6 z-40 flex items-center justify-center w-11 h-11 rounded-full bg-surface-2/90 backdrop-blur-md border border-border-medium text-text-muted hover:text-white hover:bg-surface-3 hover:border-primary-amber/40 shadow-cinema-md transition-all duration-200"
      @click="scrollToTop"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
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

  data() {
    return {
      loading: false,
      showBackToTop: false,
    };
  },

  mounted() {
    window.addEventListener('scroll', this.scrollHandler);
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollHandler);
  },

  methods: {
    scrollHandler() {
      debounce(this.scrollEvent(), 100);
    },

    scrollEvent() {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      this.showBackToTop = scrollTop > 600;

      if (scrollTop + clientHeight >= scrollHeight - 500 && !this.loading) {
        if (this.items.page < this.items.total_pages) {
          this.loading = true;
          this.$emit('loadMore');
        }
      }
    },

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
};
</script>
