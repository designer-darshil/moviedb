<template>
  <tr :class="$style.item">
    <td :class="$style.year">
      {{ year ? year : '—' }}
    </td>
    <td :class="$style.details">
      <nuxt-link
        :to="{ name: `${media}-id`, params: { id: credit.id } }"
        :class="$style.link">
        <strong :class="$style.title">{{ name }}</strong>

        <span
          v-if="episodes"
          :class="$style.episodes">
          {{ episodes }}
        </span>

        <span
          v-if="role"
          :class="$style.role">
          {{ role }}
        </span>
      </nuxt-link>
    </td>
    <td :class="$style.typeCell">
      <span :class="[$style.typeBadge, $style[`type${media}`]]">
        {{ media === 'tv' ? 'TV' : 'Movie' }}
      </span>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    year: {
      type: String,
      required: true,
    },

    credit: {
      type: Object,
      required: true,
    },
  },

  computed: {
    media () {
      if (this.credit.media_type) {
        return this.credit.media_type;
      } else if (this.credit.name) {
        return 'tv';
      } else {
        return 'movie';
      }
    },

    name () {
      return this.credit.title ? this.credit.title : this.credit.name;
    },

    role () {
      const character = this.credit.character;
      const job = this.credit.job;

      if (character) {
        return `as ${character}`;
      } else if (job) {
        return `(${job})`;
      }
      return false;
    },

    episodes () {
      const episodes = this.credit.episode_count;
      if (episodes) {
        return `${episodes} ${episodes > 1 ? 'eps' : 'ep'}`;
      }
      return false;
    },
  },
};
</script>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.item {
  transition: background-color $transition-fast;

  &:hover {
    background-color: rgba(255, 255, 255, 0.03);
  }

  td {
    padding: 1.4rem 1.6rem;
    border-bottom: 1px solid $border-subtle;
    vertical-align: middle;
  }
}

.year {
  width: 8rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: $primary-color;
  letter-spacing: 0.02em;
}

.details {
  min-width: 0;
}

.link {
  display: inline-flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.8rem;
  text-decoration: none;
  outline: none;

  &:hover .title {
    color: $primary-color;
  }

  &:focus-visible {
    outline: 2px solid $primary-color;
    outline-offset: 2px;
  }
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  transition: color $transition-fast;
}

.episodes {
  padding: 0.15rem 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: $text-muted;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: $radius-sm;
}

.role {
  font-size: 1.35rem;
  color: $text-color-grey;
}

.typeCell {
  width: 7rem;
  text-align: right;
}

.typeBadge {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: $radius-sm;
}

.typemovie {
  color: #60a5fa;
  background-color: rgba(96, 165, 250, 0.12);
}

.typetv {
  color: #34d399;
  background-color: rgba(52, 211, 153, 0.12);
}
</style>
