<template>
  <tr :class="$style.item">
    <td :class="$style.year">
      {{ year ? year : "—" }}
    </td>
    <td :class="$style.titleCell">
      <nuxt-link
        :to="{ name: `${media}-id`, params: { id: credit.id } }"
        :class="$style.link">
        <strong :class="$style.title">{{ name }}</strong>

        <span v-if="episodes" :class="$style.episodes">
          {{ episodes }}
        </span>

        <span v-if="role" :class="$style.role">
          {{ role }}
        </span>
      </nuxt-link>
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
        return `as ${job}`;
      } else {
        return false;
      }
    },

    episodes () {
      const episodes = this.credit.episode_count;

      if (episodes) {
        if (episodes > 1) {
          return `(${episodes} episodes)`;
        } else {
          return `(${episodes} episode)`;
        }
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="scss" module>
@import "~/assets/css/utilities/_variables.scss";

.item {
  transition: background-color $transition-fast;

  &:hover {
    background-color: rgba(255, 255, 255, 0.03);

    .title {
      color: $primary-color;
    }
  }

  td {
    padding: 1.4rem 1.6rem;
    border-bottom: 1px solid $border-subtle;
    vertical-align: middle;
  }
}

.year {
  width: 9rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: $text-muted;
}

.titleCell {
  font-size: 1.5rem;
}

.link {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.6rem;
  text-decoration: none;
}

.title {
  color: $text-primary;
  font-weight: 600;
  transition: color $transition-fast;
}

.episodes {
  font-size: 1.25rem;
  color: $text-muted;
}

.role {
  font-size: 1.35rem;
  color: $text-secondary;
}
</style>
