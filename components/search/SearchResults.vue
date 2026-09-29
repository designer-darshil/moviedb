<template>
  <div class="tw-my-8 sm:tw-my-10 lg:tw-my-12 tw-mb-16 sm:tw-mb-20 tw-px-4 sm:tw-px-8 lg:tw-px-12">
    <div v-if="title" class="tw-flex tw-items-center tw-justify-between tw-mb-7">
      <div class="tw-flex tw-items-center tw-gap-3">
        <span class="tw-inline-block tw-w-1 tw-h-6 tw-bg-primary-amber tw-rounded-full" />
        <h2 class="tw-m-0 tw-text-[2.2rem] tw-font-bold tw-text-white -tw-tracking-wide">
          {{ title }}
        </h2>
      </div>
      <span v-if="items.total_results" class="tw-text-[1.3rem] tw-font-medium tw-text-text-muted">
        {{ items.total_results }}
        {{ items.total_results === 1 ? "result" : "results" }}
      </span>
    </div>

    <div class="tw-grid tw-grid-cols-2 xs:tw-grid-cols-3 sm:tw-grid-cols-4 md:tw-grid-cols-5 2xl:tw-grid-cols-6 tw-gap-4.5 xs:tw-gap-5.5 sm:tw-gap-6.5 2xl:tw-gap-7">
      <Card
        v-for="item in items.results"
        :key="`card-${item.id}`"
        :item="item" />
    </div>

    <div v-if="items.page < items.total_pages" class="tw-flex tw-items-center tw-justify-center tw-py-12">
      <div v-if="loading" class="tw-flex tw-flex-col tw-items-center tw-gap-3.5">
        <span class="tw-w-9 tw-h-9 tw-border-[3px] tw-border-primary-amber/20 tw-border-t-primary-amber tw-rounded-full tw-animate-spin" />
        <span class="tw-text-[1.35rem] tw-font-medium tw-text-text-muted tw-tracking-wide">Loading more results...</span>
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

    items: {
      type: Object,
      required: true,
    },

    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  mounted () {
    window.addEventListener('scroll', this.getScrollPosition);
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.getScrollPosition);
  },

  methods: {
    getScrollPosition () {
      debounce(this.scrollEvent(), 100);
    },

    scrollEvent () {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 400 && !this.loading) {
        if (this.items.page < this.items.total_pages) {
          this.$emit('loadMore');
        }
      }
    },
  },
};
</script>
