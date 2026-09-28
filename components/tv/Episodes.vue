<template>
  <div :class="$style.wrapper">
    <div :class="$style.head">
      <div :class="$style.selectWrap">
        <label for="season-select" :class="$style.selectLabel">Season</label>
        <select
          id="season-select"
          v-model="activeSeason"
          :class="$style.select"
          @change="getEpisodes">
          <option
            v-for="season in seasons"
            :key="`season-${season.season}`"
            :value="season.season">
            Season {{ season.season }}
          </option>
        </select>
      </div>

      <span v-if="activeEpisodes" :class="$style.count">
        {{ episodeCount }}
      </span>
    </div>

    <!-- Episodes List -->
    <div v-if="activeEpisodes" :class="$style.items">
      <EpisodesItem
        v-for="episode in activeEpisodes"
        :key="`episode-${episode.id}`"
        :episode="episode" />
    </div>

    <!-- Loading State -->
    <div v-else :class="$style.loading">
      <p>Loading episode guide...</p>
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
      return `${this.activeEpisodes.length} ${this.activeEpisodes.length > 1 ? 'Episodes' : 'Episode'}`;
    },

    seasons () {
      const seasons = [];
      for (let index = 0; index < this.numberOfSeasons; index++) {
        seasons.push({
          season: index + 1,
          episodes: null,
        });
      }
      seasons.sort((a, b) => a.season > b.season ? -1 : 1);
      return seasons;
    },
  },

  mounted () {
    this.getEpisodes();
  },

  methods: {
    getEpisodes () {
      const season = this.seasons.find(s => s.season === this.activeSeason);
      if (!season) return;

      if (season.episodes) {
        this.activeEpisodes = season.episodes;
      } else {
        getTvShowEpisodes(this.$route.params.id, this.activeSeason).then((response) => {
          season.episodes = response.episodes;
          this.activeEpisodes = season.episodes;
        });
      }
    },
  },
};
</script>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.wrapper {
  padding: 3.2rem 1.6rem;
  max-width: 1440px;
  margin: 0 auto;

  @media (min-width: $breakpoint-small) {
    padding: 4rem 3.2rem;
  }

  @media (min-width: $breakpoint-large) {
    padding: 4.8rem 4.8rem;
  }
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.8rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid $border-subtle;
}

.selectWrap {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.selectLabel {
  font-size: 1.3rem;
  font-weight: 600;
  color: $text-muted;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.select {
  min-width: 14rem;
}

.count {
  font-size: 1.35rem;
  font-weight: 500;
  color: $text-muted;
}

.items {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  @media (min-width: $breakpoint-small) {
    gap: 2rem;
  }
}

.loading {
  padding: 6rem 2rem;
  text-align: center;
  color: $text-muted;
  font-size: 1.5rem;
}
</style>
