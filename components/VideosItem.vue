<template>
  <div :class="$style.item">
    <a
      :class="$style.link"
      :href="video.url"
      :aria-label="`Play ${video.name}`"
      @click.prevent="handleVideo(index)">
      <div :class="$style.thumbWrap">
        <img
          v-if="video.thumb"
          v-lazyload="video.thumb"
          class="lazyload"
          :class="$style.image"
          :alt="video.name">

        <div v-if="video.duration" :class="$style.duration">
          {{ formatDuration(video.duration) }}
        </div>

        <div :class="$style.playOverlay">
          <span :class="$style.playBtn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </span>
        </div>
      </div>

      <div :class="$style.details">
        <span :class="$style.typeBadge">{{ video.type }}</span>
        <h3 :class="$style.name" :title="video.name">
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

<style lang="scss" module>
@import "~/assets/css/utilities/_variables.scss";

.item {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.link {
  display: flex;
  flex-direction: column;
  height: 100%;
  text-decoration: none;
  outline: none;

  &:hover {
    .thumbWrap {
      box-shadow: $shadow-md;
      border-color: $border-medium;
    }

    .playBtn {
      transform: scale(1.1);
      background-color: $primary-color;
      color: #0a0b0e;
    }

    .name {
      color: $primary-color;
    }
  }

  &:focus-visible .thumbWrap {
    outline: 2px solid $primary-color;
    outline-offset: 3px;
  }
}

.thumbWrap {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; // 16:9 ratio
  overflow: hidden;
  background-color: $surface-2;
  border: 1px solid $border-subtle;
  border-radius: $radius-md;
  transition: all $transition-normal;
}

.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.duration {
  position: absolute;
  right: 0.8rem;
  bottom: 0.8rem;
  padding: 0.2rem 0.6rem;
  font-size: 1.15rem;
  font-weight: 600;
  color: #fff;
  background-color: rgba(10, 11, 14, 0.85);
  backdrop-filter: blur(4px);
  border-radius: $radius-xs;
}

.playOverlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(10, 11, 14, 0.2);
}

.playBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.8rem;
  height: 4.8rem;
  border-radius: $radius-full;
  color: #fff;
  background-color: rgba(10, 11, 14, 0.75);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all $transition-fast;

  svg {
    margin-left: 2px;
  }
}

.details {
  display: flex;
  flex-direction: column;
  padding-top: 1.2rem;
}

.typeBadge {
  font-size: 1.1rem;
  font-weight: 700;
  color: $primary-color;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.4rem;
}

.name {
  margin: 0;
  font-size: 1.45rem;
  font-weight: 600;
  line-height: 1.4;
  color: $text-primary;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color $transition-fast;
}
</style>
