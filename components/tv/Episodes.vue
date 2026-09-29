<template>
  <div class="tw-my-7 tw-mx-4 sm:tw-my-10 sm:tw-mx-8 lg:tw-my-12 lg:tw-mx-12">
    <div class="tw-flex tw-items-center tw-justify-between tw-mb-6 tw-pb-4 tw-border-b tw-border-border-subtle">
      <div class="tw-flex tw-items-center">
        <select
          v-if="seasons.length > 1"
          v-model="activeSeason"
          aria-label="Select TV Season"
          class="tw-bg-surface-2 tw-text-text-primary tw-border tw-border-border-subtle tw-rounded-lg tw-px-3 tw-py-2 tw-text-[1.3rem] tw-outline-none focus:tw-border-primary-amber"
          @change="getEpisodes">
          <option
            v-for="season in seasons"
            :key="`season-${season.season}`"
            :value="season.season">
            Season {{ season.season }}
          </option>
        </select>
      </div>

      <div v-if="activeEpisodes" class="tw-text-[1.35rem] tw-font-medium tw-text-text-muted">
        {{ episodeCount }}
      </div>
    </div>

    <div v-if="activeEpisodes" class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4 tw-gap-5">
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
        this.activeEpisodes.length > 1 ? 'Episodes' : 'Episode'
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
