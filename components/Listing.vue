<template>
  <div class="tw-my-8 sm:tw-my-12 lg:tw-my-16 tw-mb-16 sm:tw-mb-20 tw-px-4 sm:tw-px-8 lg:tw-px-12">
    <div v-if="title || viewAllUrl" class="tw-flex tw-items-end tw-justify-between tw-mb-8">
      <div class="tw-flex tw-items-center tw-gap-3.5">
        <span class="tw-inline-block tw-w-1 tw-h-8 tw-rounded-full tw-bg-gradient-to-b tw-from-primary-amber tw-to-[#ff8a00] tw-shadow-[0_0_12px_rgba(229,169,60,0.4)]" />
        <div>
          <h2 v-if="title" class="tw-m-0 tw-font-display tw-text-[2.4rem] sm:tw-text-[3rem] tw-font-extrabold tw-text-white -tw-tracking-wide">
            {{ title }}
          </h2>
          <span v-if="items.total_results" class="tw-text-[1.25rem] tw-font-medium tw-text-text-muted">
            {{ items.total_results | numberWithCommas }} Titles Available
          </span>
        </div>
      </div>

      <nuxt-link
        v-if="viewAllUrl"
        :to="viewAllUrl"
        class="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-[1.4rem] tw-font-bold tw-text-primary-amber hover:tw-text-primary-hover hover:tw-translate-x-1 tw-transition-all tw-duration-200">
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

    <div class="tw-grid tw-grid-cols-2 xs:tw-grid-cols-3 sm:tw-grid-cols-4 md:tw-grid-cols-5 2xl:tw-grid-cols-6 tw-gap-4.5 xs:tw-gap-5.5 sm:tw-gap-6.5 2xl:tw-gap-7">
      <Card
        v-for="item in items.results"
        :key="`card-${item.id}`"
        :item="item" />
    </div>

    <!-- Infinite Scroll Loading Indicator -->
    <div v-if="items.page < items.total_pages" class="tw-flex tw-items-center tw-justify-center tw-py-12">
      <div v-if="loading" class="tw-flex tw-flex-col tw-items-center tw-gap-3.5">
        <span class="tw-w-9 tw-h-9 tw-border-[3px] tw-border-primary-amber/20 tw-border-t-primary-amber tw-rounded-full tw-animate-spin" />
        <span class="tw-text-[1.35rem] tw-font-medium tw-text-text-muted tw-tracking-wide">Loading more titles...</span>
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
