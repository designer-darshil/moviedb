<template>
  <div class="my-8 sm:my-10 lg:my-12 mb-16 sm:mb-20 px-4 sm:px-8 lg:px-12">
    <div v-if="title" class="flex items-center justify-between mb-7">
      <div class="flex items-center gap-3">
        <span class="inline-block w-1 h-6 bg-primary-amber rounded-full" />
        <h2 class="m-0 text-[2.2rem] font-bold text-white -tracking-wide">
          {{ title }}
        </h2>
      </div>
      <span v-if="items.total_results" class="text-[1.3rem] font-medium text-text-muted">
        {{ items.total_results }}
        {{ items.total_results === 1 ? "result" : "results" }}
      </span>
    </div>

    <div class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 2xl:grid-cols-6 gap-4.5 xs:gap-5.5 sm:gap-6.5 2xl:gap-7">
      <Card
        v-for="item in items.results"
        :key="`card-${item.id}`"
        :item="item" />
    </div>

    <div v-if="items.page < items.total_pages" class="flex items-center justify-center py-12">
      <div v-if="loading" class="flex flex-col items-center gap-3.5">
        <span class="w-9 h-9 border-[3px] border-primary-amber/20 border-t-primary-amber rounded-full animate-spin" />
        <span class="text-[1.35rem] font-medium text-text-muted tracking-wide">Loading more results...</span>
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
