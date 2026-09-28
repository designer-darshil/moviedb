<template>
  <div :class="$style.item">
    <nuxt-link
      :class="$style.link"
      :to="{ name: 'person-id', params: { id: person.id } }"
      :aria-label="`${person.name} as ${person.character}`">
      <div :class="$style.posterWrap">
        <div :class="$style.poster">
          <img
            v-if="poster"
            v-lazyload="poster"
            class="lazyload"
            :class="$style.image"
            :alt="person.name">

          <div v-else :class="$style.placeholder">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span :class="$style.placeholderText">No Photo</span>
          </div>

          <div :class="$style.scrim" />
        </div>
      </div>

      <div :class="$style.content">
        <h3 :class="$style.name">
          {{ person.name }}
        </h3>
        <p v-if="person.character" :class="$style.character">
          {{ person.character }}
        </p>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import { apiImgUrl } from '~/api';

export default {
  props: {
    person: {
      type: Object,
      required: true,
    },
  },

  computed: {
    poster () {
      if (this.person.profile_path) {
        return `${apiImgUrl}/w370_and_h556_bestv2${this.person.profile_path}`;
      } else {
        return null;
      }
    },
  },
};
</script>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.item {
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
  padding-top: 150%;
  overflow: hidden;
  background-color: $surface-2;
  border-radius: $radius-md;
  transition: transform $transition-normal, box-shadow $transition-normal;

  .link:hover & {
    transform: translateY(-3px);
    box-shadow: $shadow-md;
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
    transform: scale(1.04);
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
  background: linear-gradient(to top, rgba(11, 12, 14, 0.6) 0%, transparent 100%);
  pointer-events: none;
}

.content {
  display: flex;
  flex-direction: column;
  padding: 0.8rem 0.2rem 0;
}

.name {
  margin: 0;
  font-size: 1.35rem;
  font-weight: 600;
  line-height: 1.3;
  color: $text-primary;
  letter-spacing: -0.01em;
  transition: color $transition-fast;

  .link:hover & {
    color: $primary-color;
  }
}

.character {
  margin: 0.3rem 0 0;
  font-size: 1.2rem;
  color: $text-color-grey;
  line-height: 1.35;
}
</style>
