<template>
  <div class="spacing">
    <div :class="$style.head">
      <div :class="$style.seasonSelectWrap">
        <select
          v-if="seasons.length > 1"
          v-model="activeSeason"
          aria-label="Select TV Season"
          @change="getEpisodes">
          <option
            v-for="season in seasons"
            :key="`season-${season.season}`"
            :value="season.season">
            Season {{ season.season }}
          </option>
        </select>
      </div>

      <div v-if="activeEpisodes" :class="$style.count">
        {{ episodeCount }}
      </div>
    </div>

    <div v-if="activeEpisodes" :class="$style.grid">
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

<style lang="scss" module>
@import "~/assets/css/utilities/_variables.scss";

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.4rem;
  padding-bottom: 1.6rem;
  border-bottom: 1px solid $border-subtle;
}

.seasonSelectWrap {
  display: flex;
  align-items: center;
}

.count {
  font-size: 1.35rem;
  font-weight: 500;
  color: $text-muted;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: $breakpoint-small) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: $breakpoint-large) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2.4rem;
  }
}
</style>
