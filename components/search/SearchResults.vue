<template>
  <div class="my-6 sm:my-8 px-4 sm:px-8 lg:px-12 max-w-[1600px] mx-auto">
    <div v-if="title" class="flex items-baseline gap-3 mb-6">
      <h2
        class="m-0 font-display text-[2rem] sm:text-[2.4rem] font-bold text-white -tracking-wide"
      >
        {{ title }}
      </h2>
      <span v-if="items.total_results" class="text-[1.25rem] text-text-muted">
        {{ items.total_results }}
        {{ items.total_results === 1 ? 'result' : 'results' }}
      </span>
    </div>

    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5"
    >
      <Card
        v-for="item in items.results"
        :key="`card-${item.id}`"
        :item="item"
      />
    </div>

    <div
      v-if="items.page < items.total_pages"
      class="flex items-center justify-center py-12"
    >
      <div
        v-if="loading"
        class="flex items-center gap-3 text-text-muted text-[1.3rem]"
      >
        <span
          class="w-5 h-5 border-2 border-white/20 border-t-primary-amber rounded-full animate-spin"
        />
        <span>Loading more results...</span>
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

  mounted() {
    window.addEventListener('scroll', this.getScrollPosition);
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.getScrollPosition);
  },

  methods: {
    getScrollPosition() {
      debounce(this.scrollEvent(), 100);
    },

    scrollEvent() {
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
