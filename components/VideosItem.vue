<template>
  <div :class="$style.item">
    <a
      :class="$style.link"
      :href="video.url"
      :aria-label="`Watch ${video.name}`"
      @click.prevent="handleVideo(index)">
      <!-- Thumbnail & Play icon -->
      <div :class="$style.thumbWrap">
        <div :class="$style.image">
          <img
            v-if="video.thumb"
            v-lazyload="video.thumb"
            class="lazyload"
            :class="$style.img"
            :alt="video.name">

          <div v-if="video.duration" :class="$style.duration">
            {{ formatDuration(video.duration) }}
          </div>

          <!-- Play Button Overlay -->
          <div :class="$style.play">
            <span :class="$style.playCircle">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <!-- Info -->
      <div :class="$style.content">
        <span :class="$style.type">{{ video.type }}</span>
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
      let a = duration.match(/\d+/g);
      if (!a) return 0;

      if (duration.indexOf('M') >= 0 && duration.indexOf('H') === -1 && duration.indexOf('S') === -1) {
        a = [0, a[0], 0];
      }
      if (duration.indexOf('H') >= 0 && duration.indexOf('M') === -1) {
        a = [a[0], 0, a[1]];
      }
      if (duration.indexOf('H') >= 0 && duration.indexOf('M') === -1 && duration.indexOf('S') === -1) {
        a = [a[0], 0, 0];
      }

      let dur = 0;
      if (a.length === 3) dur = parseInt(a[0]) * 3600 + parseInt(a[1]) * 60 + parseInt(a[2]);
      if (a.length === 2) dur = parseInt(a[0]) * 60 + parseInt(a[1]);
      if (a.length === 1) dur = parseInt(a[0]);
      return dur;
    },

    formatDuration (duration) {
      const seconds = this.getSeconds(duration);
      let secondsLeft = seconds;
      secondsLeft = secondsLeft % 3600;
      const mins = Math.floor(secondsLeft / 60);
      secondsLeft = secondsLeft % 60;
      if (secondsLeft < 10) secondsLeft = `0${secondsLeft}`;
      return `${mins}:${secondsLeft}`;
    },
  },
};
</script>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

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

  &:focus-visible .image {
    outline: 2px solid $primary-color;
    outline-offset: 3px;
  }
}

.thumbWrap {
  border-radius: $radius-md;
  overflow: hidden;
  background-color: $surface-1;
}

.image {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 56.25%;
  overflow: hidden;
  background-color: $surface-2;
  border-radius: $radius-md;
  transition: transform $transition-normal, box-shadow $transition-normal;

  .link:hover & {
    transform: translateY(-3px);
    box-shadow: $shadow-md;
  }
}

.img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform $transition-slow;

  .link:hover & {
    transform: scale(1.04);
  }
}

.play {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(11, 12, 14, 0.3);
  transition: background-color $transition-fast;

  .link:hover & {
    background-color: rgba(11, 12, 14, 0.15);
  }
}

.playCircle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.4rem;
  height: 4.4rem;
  border-radius: $radius-full;
  color: #0b0c0e;
  background-color: $primary-color;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
  transform: scale(0.9);
  transition: transform $transition-fast, background-color $transition-fast;

  .link:hover & {
    transform: scale(1);
    background-color: $primary-hover;
  }
}

.duration {
  position: absolute;
  right: 0.8rem;
  bottom: 0.8rem;
  z-index: 2;
  padding: 0.3rem 0.6rem;
  font-size: 1.15rem;
  font-weight: 600;
  color: #fff;
  background-color: rgba(11, 12, 14, 0.85);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: $radius-sm;
  letter-spacing: 0.02em;
}

.content {
  display: flex;
  flex-direction: column;
  padding: 1rem 0.2rem 0;
}

.type {
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: $primary-color;
  margin-bottom: 0.3rem;
}

.name {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.35;
  color: $text-primary;
  letter-spacing: -0.01em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color $transition-fast;

  .link:hover & {
    color: $primary-color;
  }
}
</style>
