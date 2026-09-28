<template>
  <div :class="$style.heroWrap">
    <div :class="$style.hero">
      <!-- Backdrop with gradient scrims -->
      <div :class="$style.backdrop">
        <img
          v-if="backdrop"
          v-lazyload="backdrop"
          class="lazyload"
          :class="$style.image"
          :alt="name">

        <!-- Scrim gradients for contrast -->
        <div :class="$style.scrimLeft" />
        <div :class="$style.scrimBottom" />
        <div :class="$style.scrimTop" />
      </div>

      <!-- Main content pane -->
      <div :class="$style.contentPane">
        <transition appear name="fade-slide">
          <div :class="$style.inner">
            <div :class="$style.eyebrow">
              <span :class="$style.pulseDot" />
              <span>Spotlight {{ type === "tv" ? "Series" : "Feature" }}</span>
            </div>

            <h1 :class="$style.title">
              <template v-if="isSingle">
                {{ name }}
              </template>
              <template v-else>
                <nuxt-link
                  :to="{ name: `${type}-id`, params: { id: item.id } }">
                  {{ name }}
                </nuxt-link>
              </template>
            </h1>

            <div :class="$style.metaRow">
              <div v-if="item.vote_average" :class="$style.scoreBadge">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor">
                  <path
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <span>{{ item.vote_average | rating }}</span>
                <span
                  v-if="item.vote_count"
                  :class="$style.voteCount">({{ item.vote_count | numberWithCommas }})</span>
              </div>

              <div :class="$style.specs">
                <span v-if="yearStart" :class="$style.specItem">{{
                  yearStart
                }}</span>
                <span
                  v-if="item.number_of_seasons"
                  :class="$style.specItem">{{ item.number_of_seasons }}
                  {{
                    item.number_of_seasons === 1 ? "Season" : "Seasons"
                  }}</span>
                <span v-if="item.runtime" :class="$style.specItem">{{
                  item.runtime | runtime
                }}</span>
                <span v-if="cert" :class="$style.certBadge">{{ cert }}</span>
              </div>
            </div>

            <p v-if="item.overview" :class="$style.overview">
              {{ item.overview | truncate(260) }}
            </p>

            <div :class="$style.actions">
              <button
                v-if="trailer"
                type="button"
                :class="[$style.btn, $style.btnPrimary]"
                @click="openModal">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span>Watch Trailer</span>
              </button>

              <nuxt-link
                v-if="!isSingle"
                :to="{ name: `${type}-id`, params: { id: item.id } }"
                :class="[$style.btn, $style.btnSecondary]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <span>More Info</span>
              </nuxt-link>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- YouTube Trailer Modal -->
    <Modal
      v-if="modalVisible"
      :data="trailer"
      type="iframe"
      @close="closeModal" />
  </div>
</template>

<script>
import {
  name,
  stars,
  yearStart,
  cert,
  backdrop,
  trailer,
} from '~/mixins/Details';
import Modal from '~/components/Modal';

export default {
  components: {
    Modal,
  },

  mixins: [name, stars, yearStart, cert, backdrop, trailer],

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
@import "~/assets/css/utilities/_variables.scss";

.heroWrap {
  position: relative;
  width: 100%;
}

.hero {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 520px;
  max-height: 720px;
  height: 68vh;
  overflow: hidden;
  background-color: $base-bg;

  @media (min-width: $breakpoint-small) {
    min-height: 600px;
  }
}

.backdrop {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.image {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;

  @media (min-width: $breakpoint-medium) {
    width: 75%;
    left: auto;
  }
}

.scrimLeft {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(
    to right,
    $base-bg 0%,
    rgba(10, 11, 14, 0.95) 30%,
    rgba(10, 11, 14, 0.6) 65%,
    transparent 100%
  );
  z-index: 1;

  @media (max-width: $breakpoint-small) {
    background: linear-gradient(
      to bottom,
      rgba(10, 11, 14, 0.4) 0%,
      rgba(10, 11, 14, 0.85) 60%,
      $base-bg 100%
    );
  }
}

.scrimBottom {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 180px;
  background: linear-gradient(to top, $base-bg 0%, transparent 100%);
  z-index: 1;
}

.scrimTop {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 100px;
  background: linear-gradient(
    to bottom,
    rgba(10, 11, 14, 0.5) 0%,
    transparent 100%
  );
  z-index: 1;
}

.contentPane {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (min-width: $breakpoint-small) {
    padding: 0 4rem;
  }

  @media (min-width: $breakpoint-large) {
    padding: 0 6rem;
  }
}

.inner {
  max-width: 680px;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.4rem 1.2rem;
  margin-bottom: 1.6rem;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: $primary-color;
  background-color: rgba(229, 169, 60, 0.12);
  border: 1px solid rgba(229, 169, 60, 0.25);
  border-radius: $radius-full;
}

.pulseDot {
  width: 6px;
  height: 6px;
  border-radius: $radius-full;
  background-color: $primary-color;
  box-shadow: 0 0 8px $primary-color;
}

.title {
  margin: 0 0 1.6rem;
  font-size: 3.2rem;
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.03em;
  color: #fff;

  a {
    color: inherit;
    transition: color $transition-fast;

    &:hover {
      color: $primary-color;
    }
  }

  @media (min-width: $breakpoint-small) {
    font-size: 4.4rem;
  }

  @media (min-width: $breakpoint-large) {
    font-size: 5.4rem;
  }
}

.metaRow {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.6rem;
  margin-bottom: 1.8rem;
}

.scoreBadge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.9rem;
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  background-color: rgba(229, 169, 60, 0.18);
  border: 1px solid rgba(229, 169, 60, 0.35);
  border-radius: $radius-sm;

  svg {
    color: $primary-color;
  }
}

.voteCount {
  font-size: 1.15rem;
  font-weight: 400;
  color: $text-muted;
}

.specs {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  font-size: 1.35rem;
  color: $text-secondary;
}

.specItem {
  font-weight: 500;
}

.certBadge {
  padding: 0.2rem 0.6rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: $text-muted;
  border: 1px solid $border-medium;
  border-radius: $radius-xs;
}

.overview {
  margin: 0 0 2.8rem;
  font-size: 1.5rem;
  line-height: 1.6;
  color: $text-secondary;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (min-width: $breakpoint-small) {
    font-size: 1.6rem;
  }
}

.actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.2rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 1.2rem 2.4rem;
  font-size: 1.45rem;
  font-weight: 600;
  border-radius: $radius-sm;
  cursor: pointer;
  transition: all $transition-fast;
}

.btnPrimary {
  color: #0a0b0e;
  background-color: $primary-color;
  border: 1px solid $primary-color;

  &:hover {
    background-color: $primary-hover;
    box-shadow: 0 4px 20px rgba(229, 169, 60, 0.4);
    transform: translateY(-2px);
  }
}

.btnSecondary {
  color: $text-primary;
  background-color: rgba(255, 255, 255, 0.08);
  border: 1px solid $border-medium;
  backdrop-filter: blur(8px);

  &:hover {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
  }
}
</style>
