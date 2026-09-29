<template>
  <div class="my-8 sm:my-10 px-4 sm:px-8 lg:px-12 max-w-[1600px] mx-auto">
    <!-- Header with Season Select & Episode Count -->
    <div
      class="flex items-center justify-between mb-8 pb-3 border-b border-border-subtle"
    >
      <div class="flex items-center gap-3">
        <label
          v-if="seasons.length > 1"
          for="season-select"
          class="text-[1.2rem] font-semibold uppercase tracking-wider text-text-subtle"
        >
          Select Season:
        </label>
        <select
          v-if="seasons.length > 1"
          id="season-select"
          v-model="activeSeason"
          aria-label="Select TV Season"
          class="bg-surface-2 text-text-primary border border-border-subtle rounded-xl px-4 py-2 text-[1.3rem] font-semibold outline-none focus:border-primary-amber cursor-pointer"
          @change="getEpisodes"
        >
          <option
            v-for="season in seasons"
            :key="`season-${season.season}`"
            :value="season.season"
          >
            Season {{ season.season }}
          </option>
        </select>
        <h2
          v-else
          class="m-0 font-display text-[2rem] font-bold text-white -tracking-wide"
        >
          Episodes
        </h2>
      </div>

      <div
        v-if="activeEpisodes"
        class="text-[1.3rem] font-medium text-text-muted"
      >
        {{ episodeCount }}
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

    <!-- Loading Skeleton -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="n in 8"
        :key="`ep-skel-${n}`"
        class="flex flex-col rounded-2xl overflow-hidden bg-surface-1 border border-border-subtle animate-pulse"
      >
        <div class="w-full h-0 pt-[56.25%] bg-surface-2" />
        <div class="p-4 flex flex-col gap-2">
          <div class="h-4 w-3/4 bg-surface-2 rounded" />
          <div class="h-3 w-1/2 bg-surface-2/60 rounded" />
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
