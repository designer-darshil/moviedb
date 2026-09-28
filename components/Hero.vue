<template>
  <div :class="$style.wrapper">
    <section :class="$style.hero" aria-label="Featured Media">
      <!-- Backdrop Image Layer -->
      <div :class="$style.backdropLayer">
        <div :class="$style.backdropContainer">
          <img
            v-if="backdrop"
            v-lazyload="backdrop"
            class="lazyload"
            :class="$style.backdropImage"
            :alt="name">

          <!-- Multi-stage cinematic gradients for readability -->
          <div :class="$style.scrimLeft" />
          <div :class="$style.scrimBottom" />
        </div>
      </div>

      <!-- Content Column -->
      <div :class="$style.contentContainer">
        <div :class="$style.content">
          <!-- Tag & Media pill -->
          <div :class="$style.badgeRow">
            <span :class="$style.featuredTag">Featured</span>
            <span :class="$style.mediaBadge">{{ type === 'movie' ? 'Movie' : 'TV Series' }}</span>
            <span v-if="cert" :class="$style.certBadge">{{ cert }}</span>
          </div>

          <!-- Title -->
          <h1 :class="$style.title">
            <template v-if="isSingle">
              {{ name }}
            </template>
            <template v-else>
              <nuxt-link :to="{ name: `${type}-id`, params: { id: item.id } }">
                {{ name }}
              </nuxt-link>
            </template>
          </h1>

          <!-- Metadata Row: Rating, Year, Runtime/Seasons, Genres -->
          <div :class="$style.metaRow">
            <div v-if="item.vote_average" :class="$style.ratingPill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <strong :class="$style.ratingValue">{{ item.vote_average | rating }}</strong>
              <span v-if="item.vote_count" :class="$style.voteCount">({{ item.vote_count | numberWithCommas }})</span>
            </div>

            <span v-if="yearStart" :class="$style.metaItem">{{ yearStart }}</span>

            <span v-if="item.runtime" :class="$style.metaItem">{{ item.runtime | runtime }}</span>
            <span v-else-if="item.number_of_seasons" :class="$style.metaItem">{{ item.number_of_seasons }} {{ item.number_of_seasons > 1 ? 'Seasons' : 'Season' }}</span>

            <span v-if="genresList" :class="$style.genres">{{ genresList }}</span>
          </div>

          <!-- Synopsis Description -->
          <p v-if="item.overview" :class="$style.synopsis">
            {{ item.overview | truncate(isSingle ? 320 : 220) }}
          </p>

          <!-- Interactive Actions -->
          <div :class="$style.actions">
            <button
              v-if="trailer"
              type="button"
              class="button button--primary"
              :class="$style.actionBtn"
              @click="openModal">
              <span class="icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span>Watch Trailer</span>
            </button>

            <nuxt-link
              v-if="!isSingle"
              :to="{ name: `${type}-id`, params: { id: item.id } }"
              class="button button--secondary"
              :class="$style.actionBtn">
              <span class="icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </span>
              <span>View Details</span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Trailer Modal -->
    <Modal
      v-if="modalVisible"
      :data="trailer"
      type="iframe"
      @close="closeModal" />
  </div>
</template>

<script>
import { name, stars, yearStart, cert, backdrop, trailer } from '~/mixins/Details';
import Modal from '~/components/Modal';

export default {
  components: {
    Modal,
  },

  mixins: [
    name,
    stars,
    yearStart,
    cert,
    backdrop,
    trailer,
  ],

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  data () {
    return {
      isSingle: this.item.id === this.$route.params.id,
      modalVisible: false,
    };
  },

  computed: {
    type () {
      return this.item.title ? 'movie' : 'tv';
    },

    genresList () {
      if (this.item.genres && this.item.genres.length) {
        return this.item.genres.slice(0, 3).map(g => g.name).join(' • ');
      }
      return null;
    },
  },

  methods: {
    openModal () {
      this.modalVisible = true;
    },

    closeModal () {
      this.modalVisible = false;
    },
  },
};
</script>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.wrapper {
  position: relative;
  width: 100%;
}

.hero {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 54rem;
  overflow: hidden;
  background-color: $base-bg;

  @media (min-width: $breakpoint-small) {
    min-height: 60rem;
  }

  @media (min-width: $breakpoint-medium) {
    min-height: 68rem;
  }

  @media (min-width: $breakpoint-large) {
    min-height: 72rem;
  }

  @media (min-width: $breakpoint-cinema) {
    min-height: 78rem;
  }
}

.backdropLayer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  z-index: 1;

  @media (min-width: $breakpoint-medium) {
    left: 20%;
  }
}

.backdropContainer {
  position: relative;
  width: 100%;
  height: 100%;
}

.backdropImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  filter: brightness(0.85);
  animation: heroImageIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes heroImageIn {
  from {
    opacity: 0;
    transform: scale(1.05);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.scrimLeft {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    to bottom,
    rgba(11, 12, 14, 0.3) 0%,
    rgba(11, 12, 14, 0.8) 60%,
    rgba(11, 12, 14, 1) 100%
  );

  @media (min-width: $breakpoint-medium) {
    background: linear-gradient(
      to right,
      rgba(11, 12, 14, 1) 0%,
      rgba(11, 12, 14, 0.95) 25%,
      rgba(11, 12, 14, 0.5) 60%,
      rgba(11, 12, 14, 0.2) 100%
    );
  }
}

.scrimBottom {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 18rem;
  background: linear-gradient(to top, rgba(11, 12, 14, 1) 0%, rgba(11, 12, 14, 0.85) 45%, transparent 100%);
  pointer-events: none;
}

.contentContainer {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 4rem 1.6rem 4rem;

  @media (min-width: $breakpoint-small) {
    padding: 6rem 3.2rem 4.8rem;
  }

  @media (min-width: $breakpoint-large) {
    padding: 8rem 4.8rem 6.4rem;
  }
}

.content {
  max-width: 68rem;
  animation: heroContentIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes heroContentIn {
  from {
    opacity: 0;
    transform: translateY(1.6rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.badgeRow {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 1.4rem;
}

.featuredTag {
  padding: 0.3rem 0.8rem;
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #0b0c0e;
  background-color: $primary-color;
  border-radius: $radius-sm;
}

.mediaBadge {
  padding: 0.3rem 0.8rem;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: $text-color;
  background-color: rgba(255, 255, 255, 0.08);
  border: 1px solid $border-subtle;
  border-radius: $radius-sm;
}

.certBadge {
  padding: 0.3rem 0.6rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: $text-color-grey;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: $radius-sm;
}

.title {
  margin: 0 0 1.6rem;
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.15;
  color: #fff;
  letter-spacing: -0.03em;

  a {
    color: inherit;
    text-decoration: none;
    transition: color $transition-fast;

    &:hover {
      color: $primary-color;
    }
  }

  @media (min-width: $breakpoint-small) {
    font-size: 4rem;
  }

  @media (min-width: $breakpoint-large) {
    font-size: 5rem;
  }

  @media (min-width: $breakpoint-cinema) {
    font-size: 5.6rem;
  }
}

.metaRow {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.2rem;
  margin-bottom: 1.8rem;
  font-size: 1.4rem;
  color: $text-color-grey;
}

.ratingPill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.85rem;
  background-color: rgba(229, 169, 60, 0.15);
  border: 1px solid rgba(229, 169, 60, 0.3);
  border-radius: $radius-full;
  color: #fff;

  svg {
    color: $primary-color;
  }
}

.ratingValue {
  font-weight: 700;
  color: #fff;
}

.voteCount {
  font-size: 1.2rem;
  color: $text-color-grey;
}

.metaItem {
  font-weight: 500;
  color: $text-color;
}

.genres {
  font-weight: 400;
  color: $text-color-grey;
}

.synopsis {
  margin: 0 0 2.8rem;
  font-size: 1.5rem;
  line-height: 1.6;
  color: rgba(243, 244, 246, 0.85);

  @media (min-width: $breakpoint-small) {
    font-size: 1.6rem;
  }
}

.actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.2rem;
}

.actionBtn {
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
}
</style>
