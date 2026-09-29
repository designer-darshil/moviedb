<template>
  <div class="tw-flex tw-flex-col tw-w-full">
    <a
      class="tw-group tw-flex tw-flex-col tw-h-full tw-no-underline tw-outline-none focus-visible:tw-outline-none"
      :href="video.url"
      :aria-label="`Play ${video.name}`"
      @click.prevent="handleVideo(index)">
      <div class="tw-relative tw-w-full tw-h-0 tw-pb-[56.25%] tw-overflow-hidden tw-bg-surface-2 tw-border tw-border-border-subtle tw-rounded-xl tw-transition-all tw-duration-300 group-hover:tw-shadow-cinema-md group-hover:tw-border-border-medium group-focus-visible:tw-ring-2 group-focus-visible:tw-ring-primary-amber">
        <img
          v-if="video.thumb"
          v-lazyload="video.thumb"
          class="lazyload tw-absolute tw-inset-0 tw-w-full tw-h-full tw-object-cover"
          :alt="video.name">

        <div v-if="video.duration" class="tw-absolute tw-right-2 tw-bottom-2 tw-px-1.5 tw-py-0.5 tw-text-[1.15rem] tw-font-semibold tw-text-white tw-bg-[rgba(10,11,14,0.85)] tw-backdrop-blur tw-rounded">
          {{ formatDuration(video.duration) }}
        </div>

        <div class="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-black/20">
          <span class="tw-flex tw-items-center tw-justify-center tw-w-12 tw-h-12 tw-rounded-full tw-text-white tw-bg-[rgba(10,11,14,0.75)] tw-backdrop-blur-md tw-border tw-border-white/20 tw-transition-all tw-duration-200 group-hover:tw-scale-110 group-hover:tw-bg-primary-amber group-hover:tw-text-[#0a0b0e]">
            <svg
              class="tw-ml-0.5"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </span>
        </div>
      </div>

      <div class="tw-flex tw-flex-col tw-pt-3">
        <span class="tw-text-[1.1rem] tw-font-bold tw-text-primary-amber tw-uppercase tw-tracking-wider tw-mb-1">{{ video.type }}</span>
        <h3 class="tw-m-0 tw-text-[1.45rem] tw-font-semibold tw-leading-snug tw-text-text-primary tw-line-clamp-2 tw-transition-colors tw-duration-200 group-hover:tw-text-primary-amber" :title="video.name">
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
