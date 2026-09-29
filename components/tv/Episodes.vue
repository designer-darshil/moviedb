<template>
  <div class="my-8 sm:my-10 px-4 sm:px-8 lg:px-12 max-w-[1600px] mx-auto">
    <!-- Header with Season Dropdown & Episode Count -->
    <div
      class="flex flex-wrap items-center justify-between gap-4 mb-8 pb-3 border-b border-border-subtle"
    >
      <div class="flex items-center gap-3">
        <label
          v-if="seasons.length > 1"
          for="season-select"
          class="text-[1.2rem] font-semibold uppercase tracking-wider text-text-subtle"
        >
          Season:
        </label>
        <Dropdown
          v-if="seasons.length > 1"
          id="season-select"
          v-model="activeSeason"
          :options="seasonOptions"
          option-label="label"
          option-value="value"
          aria-label="Select TV Season"
          class="w-48 !bg-surface-2 !rounded-xl"
          @change="getEpisodes"
        />
        <h2
          v-else
          class="m-0 font-display text-[2rem] font-bold text-text-primary -tracking-wide"
        >
          Episodes
        </h2>
      </div>

      <div
        v-if="activeEpisodes"
        class="text-[1.3rem] font-medium text-text-muted"
      >
        <Tag
          :value="episodeCount"
          class="cinema-badge-neutral !text-[1.15rem] !px-3 !py-1"
        />
      </div>
    </div>

    <!-- Episodes Grid -->
    <div
      v-if="activeEpisodes && activeEpisodes.length"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <EpisodesItem
        v-for="episode in activeEpisodes"
        :key="`episode-${episode.id}`"
        :episode="episode"
      />
    </div>

    <!-- Loading Skeleton with PrimeVue Skeleton -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="n in 8"
        :key="`ep-skel-${n}`"
        class="flex flex-col rounded-2xl overflow-hidden bg-surface-1 border border-border-subtle"
      >
        <Skeleton
          width="100%"
          height="0"
          class="!pt-[56.25%] !rounded-none !bg-surface-2"
        />
        <div class="p-4 flex flex-col gap-2">
          <Skeleton
            width="75%"
            height="1.4rem"
            class="!rounded !bg-surface-2"
          />
          <Skeleton
            width="50%"
            height="1.1rem"
            class="!rounded !bg-surface-2/60"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTvShowEpisodes } from '~/api';
import EpisodesItem from '~/components/tv/EpisodesItem';

export default {
  components: {
    EpisodesItem,
  },

  props: {
    numberOfSeasons: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      activeSeason: this.numberOfSeasons,
      activeEpisodes: null,
    };
  },

  computed: {
    episodeCount() {
      return `${this.activeEpisodes.length} ${
        this.activeEpisodes.length > 1 ? 'episodes' : 'episode'
      }`;
    },

    seasons() {
      const seasons = [];

      for (let index = 0; index < this.numberOfSeasons; index++) {
        seasons.push({
          season: index + 1,
          episodes: null,
        });
      }

      seasons.sort((a, b) => (a.season > b.season ? -1 : 1));

      return seasons;
    },

    seasonOptions() {
      return this.seasons.map((s) => ({
        label: `Season ${s.season}`,
        value: s.season,
      }));
    },
  },

  mounted() {
    this.getEpisodes();
  },

  methods: {
    getEpisodes() {
      const season = this.seasons.find(
        (season) => season.season === this.activeSeason,
      );

      if (season && season.episodes) {
        this.activeEpisodes = season.episodes;
      } else {
        getTvShowEpisodes(this.$route.params.id, this.activeSeason)
          .then((response) => {
            if (season && response) {
              season.episodes = response.episodes;
              this.activeEpisodes = season.episodes;
            }
          })
          .catch(() => {});
      }
    },
  },
};
</script>
