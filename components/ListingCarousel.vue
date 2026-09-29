<template>
  <section class="relative my-12 sm:my-16">
    <div class="flex items-end justify-between mb-6 px-4 sm:px-8 lg:px-12">
      <div class="flex items-center gap-3.5">
        <span class="inline-block w-1 h-7 rounded-full bg-gradient-to-b from-primary-amber to-[#ff8a00] shadow-[0_0_12px_rgba(229,169,60,0.4)]" />
        <div>
          <h2 v-if="title" class="m-0 font-display text-[2.2rem] sm:text-[2.6rem] font-extrabold text-white -tracking-wide">
            {{ title }}
          </h2>
          <span v-if="subtitle" class="text-[1.3rem] font-medium text-text-muted">{{ subtitle }}</span>
        </div>
      </div>

      <div class="flex items-center gap-5">
        <nuxt-link
          v-if="viewAllUrl"
          :to="viewAllUrl"
          class="inline-flex items-center gap-1.5 text-[1.35rem] font-bold text-primary-amber hover:text-primary-hover hover:translate-x-1 transition-all duration-200">
          <span>View All</span>
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

        <div class="hidden sm:flex items-center gap-2">
          <button
            class="flex items-center justify-center w-10 h-10 rounded-full text-text-primary bg-surface-2 border border-white/15 transition-all duration-200 hover:bg-surface-3 hover:border-primary-amber hover:text-white hover:scale-105 disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:border-white/15"
            aria-label="Scroll left"
            type="button"
            :disabled="disableLeftButton"
            @click="moveToClickEvent('left')">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            class="flex items-center justify-center w-10 h-10 rounded-full text-text-primary bg-surface-2 border border-white/15 transition-all duration-200 hover:bg-surface-3 hover:border-primary-amber hover:text-white hover:scale-105 disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:border-white/15"
            aria-label="Scroll right"
            type="button"
            :disabled="disableRightButton"
            @click="moveToClickEvent('right')">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="relative w-full">
      <div
        ref="carouselElement"
        class="flex gap-4 sm:gap-5 lg:gap-6 px-4 sm:px-8 lg:px-12 pb-5 sm:pb-6 lg:pb-7 overflow-x-auto scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        @scroll="scrollEvent">
        <div
          v-for="(item, index) in items.results"
          :key="`card-${item.id}`"
          class="shrink-0 snap-start"
          :class="isRanked ? 'w-[48%] xs:w-[34%] sm:w-[25%] md:w-[19%] 2xl:w-[16%]' : 'w-[42%] xs:w-[30%] sm:w-[22%] md:w-[17%] 2xl:w-[14%]'">
          <Card :item="item" :rank="isRanked ? index + 1 : 0" />
        </div>

        <!-- Trailing Explore All Card -->
        <div
          v-if="viewAllUrl"
          class="shrink-0 snap-start w-[42%] xs:w-[30%] sm:w-[22%] md:w-[17%] 2xl:w-[14%]">
          <nuxt-link
            :to="viewAllUrl"
            class="group relative flex flex-col items-center justify-center w-full h-0 pt-[150%] rounded-xl bg-surface-1 border border-white/15 no-underline transition-all duration-300 hover:bg-surface-2 hover:border-primary-amber hover:-translate-y-1 hover:shadow-glow">
            <div class="absolute top-[36%] text-text-muted group-hover:text-primary-amber group-hover:scale-110 transition-all duration-200">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 16 16 12 12 8" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </div>
            <span class="absolute top-[54%] text-[1.45rem] font-bold text-text-primary">Explore All</span>
            <span class="absolute top-[66%] max-w-[80%] text-[1.15rem] font-medium text-text-muted text-center truncate">{{ title }}</span>
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
