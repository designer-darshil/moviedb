<template>
  <div class="flex flex-col w-full">
    <a
      class="group flex flex-col h-full no-underline outline-none focus-visible:outline-none"
      :href="video.url"
      :aria-label="`Play ${video.name}`"
      @click.prevent="handleVideo(index)">
      <div class="relative w-full h-0 pb-[56.25%] overflow-hidden bg-surface-2 border border-border-subtle rounded-xl transition-all duration-300 group-hover:shadow-cinema-md group-hover:border-border-medium group-focus-visible:ring-2 group-focus-visible:ring-primary-amber">
        <img
          v-if="video.thumb"
          v-lazyload="video.thumb"
          class="lazyload absolute inset-0 w-full h-full object-cover"
          :alt="video.name">

        <div v-if="video.duration" class="absolute right-2 bottom-2 px-1.5 py-0.5 text-[1.15rem] font-semibold text-white bg-[rgba(10,11,14,0.85)] backdrop-blur rounded">
          {{ formatDuration(video.duration) }}
        </div>

        <div class="absolute inset-0 flex items-center justify-center bg-black/20">
          <span class="flex items-center justify-center w-12 h-12 rounded-full text-white bg-[rgba(10,11,14,0.75)] backdrop-blur-md border border-white/20 transition-all duration-200 group-hover:scale-110 group-hover:bg-primary-amber group-hover:text-[#0a0b0e]">
            <svg
              class="ml-0.5"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </span>
        </div>
      </div>

      <div class="flex flex-col pt-3">
        <span class="text-[1.1rem] font-bold text-primary-amber uppercase tracking-wider mb-1">{{ video.type }}</span>
        <h3 class="m-0 text-[1.45rem] font-semibold leading-snug text-text-primary line-clamp-2 transition-colors duration-200 group-hover:text-primary-amber" :title="video.name">
          {{ video.name }}
        </h3>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    video: {
      type: Object,
      required: true,
    },

    index: {
      type: Number,
      required: true,
    },
  },

  methods: {
    handleVideo (index) {
      this.$emit('openModal', index);
    },

    getSeconds (duration) {
      if (!duration) return 0;
      let a = duration.match(/\d+/g);
      if (!a) return 0;

      if (
        duration.includes('M') &&
        !duration.includes('H') &&
        !duration.includes('S')
      ) {
        a = [0, a[0], 0];
      }

      if (duration.includes('H') && !duration.includes('M')) {
        a = [a[0], 0, a[1]];
      }

      if (
        duration.includes('H') &&
        !duration.includes('M') &&
        !duration.includes('S')
      ) {
        a = [a[0], 0, 0];
      }

      let total = 0;

      if (a.length === 3) {
        total = parseInt(a[0]) * 3600 + parseInt(a[1]) * 60 + parseInt(a[2]);
      } else if (a.length === 2) {
        total = parseInt(a[0]) * 60 + parseInt(a[1]);
      } else if (a.length === 1) {
        total = parseInt(a[0]);
      }

      return total;
    },

    formatDuration (duration) {
      const seconds = this.getSeconds(duration);
      if (!seconds) return '';
      let secondsLeft = seconds % 3600;
      const mins = Math.floor(secondsLeft / 60);
      secondsLeft = secondsLeft % 60;
      const secStr = secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft;
      return `${mins}:${secStr}`;
    },
  },
};
</script>
