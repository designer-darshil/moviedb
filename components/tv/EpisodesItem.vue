<template>
  <div :class="$style.card">
    <div :class="$style.stillWrap">
      <img
        v-if="poster"
        v-lazyload="poster"
        class="lazyload"
        :class="$style.image"
        :alt="episode.name">

      <div v-else :class="$style.placeholder">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round">
          <rect
            x="2"
            y="7"
            width="20"
            height="15"
            rx="2"
            ry="2" />
          <polyline points="17 2 12 7 7 2" />
        </svg>
      </div>

      <div :class="$style.episodeBadge">
        EP {{ episode.episode_number | numberWithDoubleDigits }}
      </div>
    </div>

    <div :class="$style.content">
      <div :class="$style.header">
        <h3 :class="$style.title">
          {{ episode.name }}
        </h3>
        <span v-if="episode.air_date" :class="$style.airDate">
          {{ episode.air_date | fullDate }}
        </span>
      </div>

      <p v-if="episode.overview" :class="$style.overview">
        {{ episode.overview | truncate(220) }}
      </p>
    </div>
  </div>
</template>

<script>
import { getStillUrl } from '~/api';

export default {
  props: {
    episode: {
      type: Object,
      required: true,
    },
  },

  computed: {
    poster () {
      if (this.episode.still_path) {
        return getStillUrl(this.episode.still_path, 'w300');
      }
      return null;
    },
  },
};
</script>

<style lang="scss" module>
@import "~/assets/css/utilities/_variables.scss";

.card {
  display: flex;
  flex-direction: column;
  background-color: $surface-1;
  border: 1px solid $border-subtle;
  border-radius: $radius-md;
  overflow: hidden;
  transition: all $transition-normal;

  &:hover {
    border-color: $border-medium;
    box-shadow: $shadow-md;
    transform: translateY(-2px);

    .image {
      transform: scale(1.04);
    }
  }
}

.stillWrap {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 56.25%; // 16:9 ratio
  overflow: hidden;
  background-color: $surface-2;
}

.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform $transition-slow;
}

.placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $text-muted;
  background-color: $surface-2;
}

.episodeBadge {
  position: absolute;
  top: 0.8rem;
  left: 0.8rem;
  padding: 0.3rem 0.7rem;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #0a0b0e;
  background-color: $primary-color;
  border-radius: $radius-xs;
}

.content {
  display: flex;
  flex-direction: column;
  padding: 1.6rem;
  gap: 0.8rem;
  flex: 1;
}

.header {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: $text-primary;
  line-height: 1.35;
}

.airDate {
  font-size: 1.2rem;
  font-weight: 500;
  color: $text-muted;
}

.overview {
  margin: 0;
  font-size: 1.35rem;
  line-height: 1.6;
  color: $text-secondary;
}
</style>
