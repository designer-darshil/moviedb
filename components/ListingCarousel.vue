<template>
  <section class="relative my-8 sm:my-10 lg:my-12">
    <!-- Section Header -->
    <div class="flex items-center justify-between mb-4 px-4 sm:px-8 lg:px-12">
      <div class="flex items-baseline gap-3">
        <h2 v-if="title" class="m-0 font-display text-[2rem] sm:text-[2.2rem] font-bold text-white -tracking-wide">
          {{ title }}
        </h2>
        <span v-if="subtitle" class="hidden md:inline-block text-[1.25rem] text-text-muted">{{ subtitle }}</span>
      </div>

      <div class="flex items-center gap-4">
        <nuxt-link
          v-if="viewAllUrl"
          :to="viewAllUrl"
          class="inline-flex items-center gap-1 text-[1.25rem] font-medium text-text-muted hover:text-primary-amber transition-colors duration-200">
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

        <div class="hidden sm:flex items-center gap-1.5">
          <button
            class="flex items-center justify-center w-8 h-8 rounded-full text-text-muted bg-surface-2 border border-border-subtle hover:text-white hover:bg-surface-3 disabled:opacity-20 disabled:cursor-not-allowed transition-colors duration-200"
            aria-label="Scroll left"
            type="button"
            :disabled="disableLeftButton"
            @click="moveToClickEvent('left')">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            class="flex items-center justify-center w-8 h-8 rounded-full text-text-muted bg-surface-2 border border-border-subtle hover:text-white hover:bg-surface-3 disabled:opacity-20 disabled:cursor-not-allowed transition-colors duration-200"
            aria-label="Scroll right"
            type="button"
            :disabled="disableRightButton"
            @click="moveToClickEvent('right')">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Horizontal Scroll Rail -->
    <div class="relative w-full">
      <div
        ref="carouselElement"
        class="flex gap-4 sm:gap-5 px-4 sm:px-8 lg:px-12 pb-4 overflow-x-auto scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        @scroll="scrollEvent">
        <div
          v-for="(item, index) in items.results"
          :key="`rail-card-${item.id}`"
          class="shrink-0 snap-start w-[140px] xs:w-[160px] sm:w-[180px] md:w-[195px] lg:w-[210px]">
          <Card :item="item" :rank="isRanked ? index + 1 : 0" />
        </div>

        <!-- Trailing View All Link Card -->
        <div
          v-if="viewAllUrl"
          class="shrink-0 snap-start w-[140px] xs:w-[160px] sm:w-[180px] md:w-[195px] lg:w-[210px]">
          <nuxt-link
            :to="viewAllUrl"
            class="group relative flex flex-col items-center justify-center w-full h-0 pt-[150%] rounded-lg bg-surface-2 border border-border-subtle no-underline hover:border-border-medium transition-all duration-300">
            <div class="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
              <span class="flex items-center justify-center w-10 h-10 rounded-full bg-surface-3 text-text-muted group-hover:text-primary-amber transition-colors duration-200">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
              <span class="text-[1.3rem] font-medium text-text-secondary group-hover:text-white transition-colors duration-200">View All</span>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import carousel from '~/mixins/Carousel';
import Card from '~/components/Card';

export default {
  components: {
    Card,
  },

  mixins: [carousel],

  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },

    subtitle: {
      type: String,
      required: false,
      default: '',
    },

    isRanked: {
      type: Boolean,
      required: false,
      default: false,
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
};
</script>
