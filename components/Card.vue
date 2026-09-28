<template>
  <div :class="$style.card">
    <nuxt-link
      :class="$style.link"
      :to="{ name: `${media}-id`, params: { id: item.id } }"
      :aria-label="`${name} (${mediaLabel})`">
      <div :class="$style.posterWrap">
        <div :class="$style.poster">
          <img
            v-if="poster"
            v-lazyload="poster"
            class="lazyload"
            :class="$style.image"
            :alt="name">

          <div v-else :class="$style.placeholder">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round">
              <rect
                x="2"
                y="2"
                width="20"
                height="20"
                rx="2.18"
                ry="2.18" />
              <line x1="7" y1="2" x2="7" y2="22" />
              <line x1="17" y1="2" x2="17" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <line x1="2" y1="7" x2="7" y2="7" />
              <line x1="2" y1="17" x2="7" y2="17" />
              <line x1="17" y1="17" x2="22" y2="17" />
              <line x1="17" y1="7" x2="22" y2="7" />
            </svg>
            <span :class="$style.placeholderText">No Image</span>
          </div>

          <!-- Subtle bottom gradient -->
          <div :class="$style.scrim" />

          <!-- Rating badge -->
          <div
            v-if="media !== 'person' && item.vote_average"
            :class="$style.ratingBadge">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span>{{ item.vote_average | rating }}</span>
          </div>

          <!-- Hover view circle overlay -->
          <div :class="$style.hoverOverlay">
            <span :class="$style.playBtn" aria-hidden="true">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div :class="$style.content">
        <div :class="$style.metaRow">
          <span v-if="year" :class="$style.year">{{ year }}</span>
          <span v-if="year && mediaLabel" :class="$style.dot">•</span>
          <span :class="$style.typeBadge">{{ mediaLabel }}</span>
        </div>

        <h2 :class="$style.title" :title="name">
          {{ name }}
        </h2>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import { getPosterUrl, getProfileUrl } from '~/api';
import { name, stars } from '~/mixins/Details';

export default {
  mixins: [name, stars],

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  computed: {
    poster () {
      if (this.item.poster_path) {
        return getPosterUrl(this.item.poster_path, 'w500');
      } else if (this.item.profile_path) {
        return getProfileUrl(this.item.profile_path, 'h632');
      } else {
        return false;
      }
    },

    media () {
      if (this.item.media_type) {
        return this.item.media_type;
      } else if (this.item.name) {
        return 'tv';
      } else {
        return 'movie';
      }
    },

    mediaLabel () {
      if (this.media === 'tv') {
        return 'TV Series';
      } else if (this.media === 'person') {
        return 'Person';
      } else {
        return 'Movie';
      }
    },

    year () {
      const date = this.item.release_date || this.item.first_air_date;
      if (date) {
        return date.split('-')[0];
      }
      return null;
    },
  },
};
</script>

<style lang="scss" module>
@import "~/assets/css/utilities/_variables.scss";

.card {
  position: relative;
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

  &:focus-visible .poster {
    outline: 2px solid $primary-color;
    outline-offset: 3px;
  }
}

.posterWrap {
  position: relative;
  width: 100%;
  border-radius: $radius-md;
  overflow: hidden;
  background-color: $surface-1;
}

.poster {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 150%; // Standard 2:3 poster ratio
  overflow: hidden;
  background-color: $surface-2;
  border-radius: $radius-md;
  transition: transform $transition-normal, box-shadow $transition-normal;

  .link:hover & {
    transform: translateY(-4px);
    box-shadow: $shadow-lg;
  }
}

.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform $transition-slow;

  .link:hover & {
    transform: scale(1.05);
  }
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
  gap: 0.8rem;
  color: $text-muted;
  background-color: $surface-1;
  border: 1px solid $border-subtle;
}

.placeholderText {
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.scrim {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 35%;
  background: linear-gradient(
    to top,
    rgba(10, 11, 14, 0.7) 0%,
    transparent 100%
  );
  pointer-events: none;
}

.ratingBadge {
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.7rem;
  font-size: 1.15rem;
  font-weight: 700;
  color: #fff;
  background-color: rgba(10, 11, 14, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: $radius-sm;

  svg {
    color: $primary-color;
  }
}

.hoverOverlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(10, 11, 14, 0.35);
  opacity: 0;
  transition: opacity $transition-fast;
  pointer-events: none;

  .link:hover & {
    opacity: 1;
  }
}

.playBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.2rem;
  height: 4.2rem;
  border-radius: $radius-full;
  color: #0a0b0e;
  background-color: $primary-color;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6);
  transform: scale(0.85);
  transition: transform $transition-fast;

  .link:hover & {
    transform: scale(1);
  }

  svg {
    margin-left: 2px;
  }
}

.content {
  display: flex;
  flex-direction: column;
  padding: 1rem 0.2rem 0;
}

.metaRow {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.4rem;
  font-size: 1.2rem;
  color: $text-muted;
}

.year {
  font-weight: 500;
}

.dot {
  opacity: 0.4;
}

.typeBadge {
  font-size: 1.1rem;
  font-weight: 500;
  color: $text-subtle;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.title {
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
