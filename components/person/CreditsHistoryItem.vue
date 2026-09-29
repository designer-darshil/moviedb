<template>
  <tr class="tw-group hover:tw-bg-white/[0.03] tw-transition-colors tw-duration-200">
    <td class="tw-w-24 tw-px-4 tw-py-3.5 tw-border-b tw-border-border-subtle tw-text-[1.4rem] tw-font-semibold tw-text-text-muted tw-align-middle">
      {{ year ? year : "—" }}
    </td>
    <td class="tw-px-4 tw-py-3.5 tw-border-b tw-border-border-subtle tw-text-[1.5rem] tw-align-middle">
      <nuxt-link
        :to="{ name: `${media}-id`, params: { id: credit.id } }"
        class="tw-inline-flex tw-flex-wrap tw-items-baseline tw-gap-1.5 tw-no-underline">
        <strong class="tw-text-text-primary tw-font-semibold group-hover:tw-text-primary-amber tw-transition-colors tw-duration-200">{{ name }}</strong>

        <span v-if="episodes" class="tw-text-[1.25rem] tw-text-text-muted">
          {{ episodes }}
        </span>

        <span v-if="role" class="tw-text-[1.35rem] tw-text-text-secondary">
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
