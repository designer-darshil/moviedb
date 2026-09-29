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
          class="m-0 font-display text-[1.8rem] sm:text-[2rem] lg:text-[2.4rem] font-bold leading-[1.2] text-text-primary -tracking-wide"
        >
          {{ title }}
        </h2>
        <span v-if="items.total_results" class="text-[1.25rem] text-text-muted">
          {{ items.total_results | numberWithCommas }} titles
        </span>
      </div>

      <nuxt-link
        v-if="viewAllUrl"
        v-ripple
        :to="viewAllUrl"
        class="inline-flex items-center gap-1.5 px-3 py-1 text-[1.3rem] font-semibold text-text-muted hover:text-primary-amber rounded-lg transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary-amber"
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
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5"
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
        <h3 class="m-0 mb-1 text-[1.8rem] font-bold text-text-primary">
          No titles available
        </h3>
        <p class="m-0 text-[1.3rem] text-text-muted">
          Check back later or explore another category.
        </p>
      </div>
    </div>

    <!-- Loading Shimmer Skeletons for Next Page -->
    <div v-if="loading" class="mt-6 flex flex-col items-center gap-6">
      <div
        class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-5 w-full"
      >
        <div
          v-for="n in 6"
          :key="`loading-skeleton-${n}`"
          class="flex flex-col gap-2"
        >
          <Skeleton
            width="100%"
            height="0"
            class="!pt-[150%] !rounded-xl !bg-surface-2 border border-border-subtle"
          />
          <Skeleton
            width="80%"
            height="1.4rem"
            class="!rounded !bg-surface-2"
          />
          <Skeleton
            width="50%"
            height="1.1rem"
            class="!rounded !bg-surface-2/60"
          />
        </div>
      </div>
      <ProgressSpinner
        style="width: 36px; height: 36px"
        stroke-width="4"
        class="opacity-80"
        aria-label="Loading more titles"
      />
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

      if (scrollTop + clientHeight >= scrollHeight - 500 && !this.loading) {
        if (this.items.page < this.items.total_pages) {
          this.loading = true;
          this.$emit('loadMore');
        }
      }
    },
  },
};
</script>
