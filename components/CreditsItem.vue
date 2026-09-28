<template>
  <div :class="$style.item">
    <nuxt-link
      :class="$style.link"
      :to="{ name: 'person-id', params: { id: person.id } }"
      :aria-label="`${person.name} as ${person.character}`">
      <div :class="$style.photoWrap">
        <img
          v-if="poster"
          v-lazyload="poster"
          class="lazyload"
          :class="$style.image"
          :alt="person.name">

        <div v-else :class="$style.placeholder">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      </div>

      <div :class="$style.content">
        <h3 :class="$style.name" :title="person.name">
          {{ person.name }}
        </h3>
        <p
          v-if="person.character"
          :class="$style.character"
          :title="person.character">
          {{ person.character }}
        </p>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import { getProfileUrl } from '~/api';

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
        return getProfileUrl(this.person.profile_path, 'h632');
      }
      return null;
    },
  },
};
</script>

<style lang="scss" module>
@import "~/assets/css/utilities/_variables.scss";

.item {
  width: 100%;
}

.link {
  display: flex;
  flex-direction: column;
  height: 100%;
  text-decoration: none;
  outline: none;

  &:hover {
    .photoWrap {
      border-color: $border-medium;
      box-shadow: $shadow-md;
      transform: translateY(-3px);
    }

    .image {
      transform: scale(1.05);
    }

    .name {
      color: $primary-color;
    }
  }

  &:focus-visible .photoWrap {
    outline: 2px solid $primary-color;
    outline-offset: 2px;
  }
}

.photoWrap {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 150%; // Standard 2:3 portrait ratio
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
  background-color: $surface-1;
}

.content {
  display: flex;
  flex-direction: column;
  padding: 1rem 0.2rem 0;
}

.name {
  margin: 0;
  font-size: 1.35rem;
  font-weight: 600;
  color: $text-primary;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color $transition-fast;
}

.character {
  margin: 0.3rem 0 0;
  font-size: 1.2rem;
  color: $text-muted;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
