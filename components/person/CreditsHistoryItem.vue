<template>
  <tr class="group hover:bg-white/[0.03] transition-colors duration-200">
    <td
      class="w-24 px-4 py-3.5 border-b border-border-subtle text-[1.4rem] font-semibold text-text-muted align-middle"
    >
      {{ year ? year : '—' }}
    </td>
    <td
      class="px-4 py-3.5 border-b border-border-subtle text-[1.5rem] align-middle"
    >
      <nuxt-link
        :to="{ name: `${media}-id`, params: { id: credit.id } }"
        class="inline-flex flex-wrap items-baseline gap-1.5 no-underline"
      >
        <strong
          class="text-text-primary font-semibold group-hover:text-primary-amber transition-colors duration-200"
          >{{ name }}</strong
        >

        <span v-if="episodes" class="text-[1.25rem] text-text-muted">
          {{ episodes }}
        </span>

        <span v-if="role" class="text-[1.35rem] text-text-secondary">
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
    media() {
      if (this.credit.media_type) {
        return this.credit.media_type;
      } else if (this.credit.name) {
        return 'tv';
      } else {
        return 'movie';
      }
    },

    name() {
      return this.credit.title ? this.credit.title : this.credit.name;
    },

    role() {
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

    episodes() {
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
