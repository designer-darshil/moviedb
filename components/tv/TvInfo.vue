<template>
  <div :class="$style.wrapper">
    <div :class="$style.layout">
      <!-- Left Column: Poster Artwork -->
      <aside :class="$style.left">
        <div :class="$style.posterWrap">
          <div :class="$style.poster">
            <img
              v-if="poster"
              v-lazyload="poster"
              class="lazyload"
              :class="$style.image"
              :alt="name">

            <div v-else :class="$style.placeholder">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="2" y="2" width="20" height="20" rx="2" />
                <line x1="7" y1="2" x2="7" y2="22" />
                <line x1="17" y1="2" x2="17" y2="22" />
              </svg>
              <span>No Poster</span>
            </div>
          </div>
        </div>

        <div :class="$style.desktopExternal">
          <ExternalLinks :links="item.external_ids" />
        </div>
      </aside>

      <!-- Right Column: Storyline & Series Facts -->
      <div :class="$style.right">
        <!-- Storyline -->
        <section v-if="item.overview" :class="$style.section">
          <div :class="$style.sectionHeader">
            <span :class="$style.accentPip" />
            <h2 :class="$style.sectionTitle">
              Storyline
            </h2>
          </div>
          <div :class="$style.synopsis" v-html="item.overview" />
        </section>

        <!-- Series Details Grid -->
        <section :class="$style.section">
          <div :class="$style.sectionHeader">
            <span :class="$style.accentPip" />
            <h2 :class="$style.sectionTitle">
              Series Details
            </h2>
          </div>

          <div :class="$style.statsGrid">
            <div v-if="item.first_air_date" :class="$style.statItem">
              <span :class="$style.statLabel">First Aired</span>
              <span :class="$style.statValue">{{ item.first_air_date | fullDate }}</span>
            </div>

            <div v-if="item.last_air_date" :class="$style.statItem">
              <span :class="$style.statLabel">Last Aired</span>
              <span :class="$style.statValue">{{ item.last_air_date | fullDate }}</span>
            </div>

            <div v-if="item.number_of_seasons" :class="$style.statItem">
              <span :class="$style.statLabel">Seasons</span>
              <span :class="$style.statValue">{{ item.number_of_seasons }}</span>
            </div>

            <div v-if="item.number_of_episodes" :class="$style.statItem">
              <span :class="$style.statLabel">Total Episodes</span>
              <span :class="$style.statValue">{{ item.number_of_episodes }}</span>
            </div>

            <div v-if="creators" :class="$style.statItem">
              <span :class="$style.statLabel">Creator</span>
              <span :class="$style.statValue" v-html="creators" />
            </div>

            <div v-if="item.genres && item.genres.length" :class="$style.statItem">
              <span :class="$style.statLabel">Genres</span>
              <span :class="$style.statValue" v-html="formatGenres(item.genres)" />
            </div>

            <div v-if="item.networks && item.networks.length" :class="$style.statItem">
              <span :class="$style.statLabel">Network</span>
              <span :class="$style.statValue">{{ item.networks | arrayToList }}</span>
            </div>

            <div v-if="item.status" :class="$style.statItem">
              <span :class="$style.statLabel">Status</span>
              <span :class="$style.statValue">{{ item.status }}</span>
            </div>

            <div v-if="item.original_language" :class="$style.statItem">
              <span :class="$style.statLabel">Language</span>
              <span :class="$style.statValue">{{ item.original_language | fullLang }}</span>
            </div>

            <div v-if="item.episode_run_time && item.episode_run_time.length" :class="$style.statItem">
              <span :class="$style.statLabel">Episode Runtime</span>
              <span :class="$style.statValue">{{ formatRunTime(item.episode_run_time) }}</span>
            </div>
          </div>
        </section>

        <!-- Mobile External Links -->
        <div :class="$style.mobileExternal">
          <ExternalLinks :links="item.external_ids" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiImgUrl } from '~/api';
import { name, creators } from '~/mixins/Details';
import ExternalLinks from '~/components/ExternalLinks';

export default {
  components: {
    ExternalLinks,
  },

  mixins: [
    name,
    creators,
  ],

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  computed: {
    poster () {
      if (this.item.poster_path) {
        return `${apiImgUrl}/w370_and_h556_bestv2${this.item.poster_path}`;
      }
      return false;
    },
  },

  created () {
    if (this.item.homepage) {
      this.item.external_ids.homepage = this.item.homepage;
    }
  },

  methods: {
    formatGenres (genres) {
      return genres.map(genre => `<a href="/genre/${genre.id}/tv">${genre.name}</a>`).join(', ');
    },

    formatRunTime (times) {
      return times.map(time => `${time}m`).join(', ');
    },
  },
};
</script>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.wrapper {
  padding: 4rem 1.6rem;
  max-width: 1440px;
  margin: 0 auto;

  @media (min-width: $breakpoint-small) {
    padding: 4.8rem 3.2rem;
  }

  @media (min-width: $breakpoint-large) {
    padding: 6.4rem 4.8rem;
  }
}

.layout {
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media (min-width: $breakpoint-small) {
    flex-direction: row;
    align-items: flex-start;
    gap: 4rem;
  }

  @media (min-width: $breakpoint-large) {
    gap: 6.4rem;
  }
}

.left {
  flex: 0 0 24rem;

  @media (min-width: $breakpoint-medium) {
    flex: 0 0 28rem;
  }

  @media (min-width: $breakpoint-large) {
    flex: 0 0 32rem;
  }
}

.posterWrap {
  border-radius: $radius-lg;
  overflow: hidden;
  box-shadow: $shadow-lg;
  border: 1px solid $border-subtle;
}

.poster {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 150%;
  background-color: $surface-2;
}

.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: $text-muted;
}

.desktopExternal {
  display: none;

  @media (min-width: $breakpoint-small) {
    display: block;
    margin-top: 2rem;
  }
}

.mobileExternal {
  margin-top: 3.2rem;

  @media (min-width: $breakpoint-small) {
    display: none;
  }
}

.right {
  flex: 1;
  min-width: 0;
}

.section {
  margin-bottom: 4rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.sectionHeader {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.6rem;
}

.accentPip {
  display: inline-block;
  width: 4px;
  height: 2rem;
  background-color: $primary-color;
  border-radius: $radius-full;
}

.sectionTitle {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.02em;

  @media (min-width: $breakpoint-large) {
    font-size: 2.2rem;
  }
}

.synopsis {
  margin: 0;
  font-size: 1.55rem;
  line-height: 1.7;
  color: rgba(243, 244, 246, 0.9);
  max-width: 80rem;

  @media (min-width: $breakpoint-large) {
    font-size: 1.65rem;
  }
}

.statsGrid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.6rem;
  background-color: $surface-1;
  border: 1px solid $border-subtle;
  border-radius: $radius-lg;
  padding: 2.4rem;

  @media (min-width: $breakpoint-xsmall) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem 2.4rem;
  }

  @media (min-width: $breakpoint-large) {
    padding: 3.2rem;
  }
}

.statItem {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  a {
    color: $primary-color;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.statLabel {
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: $text-muted;
}

.statValue {
  font-size: 1.45rem;
  font-weight: 500;
  color: $text-primary;
  line-height: 1.4;
}
</style>
