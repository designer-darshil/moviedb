<template>
  <article :class="$style.card">
    <!-- Still photo / Preview Image -->
    <div :class="$style.stillWrap">
      <div :class="$style.still">
        <img
          v-if="poster"
          v-lazyload="poster"
          class="lazyload"
          :class="$style.image"
          :alt="episode.name">

        <div v-else :class="$style.placeholder">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="2" y="2" width="20" height="20" rx="2" />
            <line x1="7" y1="2" x2="7" y2="22" />
            <line x1="17" y1="2" x2="17" y2="22" />
          </svg>
          <span>No Still</span>
        </div>

        <!-- Episode badge on still image -->
        <span :class="$style.episodeBadge">
          EP {{ episode.episode_number | numberWithDoubleDigits }}
        </span>
      </div>
    </div>

    <!-- Episode Content -->
    <div :class="$style.content">
      <div :class="$style.header">
        <h3 :class="$style.title">
          {{ episode.name }}
        </h3>
        <span v-if="episode.air_date" :class="$style.aired">
          {{ episode.air_date | fullDate }}
        </span>
      </div>

      <p v-if="episode.overview" :class="$style.overview">
        {{ episode.overview | truncate(240) }}
      </p>
      <p v-else :class="$style.overviewEmpty">
        No episode synopsis available.
      </p>
    </div>
  </article>
</template>

<script>
import { apiImgUrl } from '~/api';

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
        return `${apiImgUrl}/w400${this.episode.still_path}`;
      }
      return null;
    },
  },
};
</script>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.card {
  display: flex;
  flex-direction: column;
  background-color: $surface-1;
  border: 1px solid $border-subtle;
  border-radius: $radius-lg;
  overflow: hidden;
  transition: transform $transition-fast, border-color $transition-fast;

  &:hover {
    transform: translateY(-2px);
    border-color: $border-medium;
  }

  @media (min-width: $breakpoint-small) {
    flex-direction: row;
  }
}

.stillWrap {
  flex: 0 0 24rem;

  @media (min-width: $breakpoint-large) {
    flex: 0 0 28rem;
  }
}

.still {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 56.25%; // 16:9 ratio
  background-color: $surface-2;
  overflow: hidden;

  @media (min-width: $breakpoint-small) {
    height: 100%;
    padding-top: 0;
    min-height: 16rem;
  }
}

.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  color: $text-muted;
  font-size: 1.1rem;
}

.episodeBadge {
  position: absolute;
  bottom: 0.8rem;
  left: 0.8rem;
  padding: 0.3rem 0.7rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: #0b0c0e;
  background-color: $primary-color;
  border-radius: $radius-sm;
  letter-spacing: 0.04em;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.6rem 2rem;
}

.header {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 0.8rem;

  @media (min-width: $breakpoint-xsmall) {
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
  }
}

.title {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: -0.01em;
}

.aired {
  font-size: 1.25rem;
  color: $text-muted;
  white-space: nowrap;
}

.overview {
  margin: 0;
  font-size: 1.35rem;
  line-height: 1.6;
  color: $text-color-grey;
}

.overviewEmpty {
  margin: 0;
  font-size: 1.3rem;
  font-style: italic;
  color: $text-muted;
}
</style>
