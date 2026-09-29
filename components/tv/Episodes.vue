<template>
  <div class="my-6 sm:my-8 px-4 sm:px-8 lg:px-12 max-w-[1600px] mx-auto">
    <div class="flex items-center justify-between mb-6 pb-3 border-b border-border-subtle">
      <div class="flex items-center">
        <select
          v-if="seasons.length > 1"
          v-model="activeSeason"
          aria-label="Select TV Season"
          class="bg-surface-2 text-text-primary border border-border-subtle rounded-md px-3 py-1.5 text-[1.25rem] outline-none focus:border-border-medium"
          @change="getEpisodes">
          <option
            v-for="season in seasons"
            :key="`season-${season.season}`"
            :value="season.season">
            Season {{ season.season }}
          </option>
        </select>
        <span v-else class="text-[1.4rem] font-semibold text-white">Episodes</span>
      </div>

      <div v-if="activeEpisodes" class="text-[1.25rem] text-text-muted">
        {{ episodeCount }}
      </div>
    </div>

    <div v-if="activeEpisodes" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      <EpisodesItem
        v-for="episode in activeEpisodes"
        :key="`episode-${episode.id}`"
        :episode="episode" />
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

  data () {
    return {
      activeSeason: this.numberOfSeasons,
      activeEpisodes: null,
    };
  },

  computed: {
    episodeCount () {
      return `${this.activeEpisodes.length} ${
        this.activeEpisodes.length > 1 ? 'episodes' : 'episode'
      }`;
    },

    seasons () {
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

  mounted () {
    this.getEpisodes();
  },

  methods: {
    getEpisodes () {
      const season = this.seasons.find(
        season => season.season === this.activeSeason,
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
