<template>
  <div :class="$style.overlay">
    <div :class="$style.container">
      <form autocomplete="off" :class="$style.form" @submit.prevent>
        <label
          class="visuallyhidden"
          for="search">Search Movies, TV Shows, and People</label>

        <div :class="$style.field">
          <span :class="$style.searchIcon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>

          <input
            id="search"
            ref="input"
            v-model.trim="query"
            name="search"
            type="text"
            placeholder="Search for movies, TV series, actors, directors..."
            :class="$style.input"
            @keyup="goToRoute"
            @keydown.esc="handleEscape">

          <div :class="$style.actions">
            <span :class="$style.kbdHint">ESC</span>

            <button
              type="button"
              aria-label="Close Search"
              :class="$style.closeButton"
              @click="closeSearch">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data () {
    return {
      query: this.$route.query.q ? this.$route.query.q : '',
    };
  },

  computed: {
    ...mapState('search', ['fromPage']),
  },

  mounted () {
    this.$nextTick(() => {
      if (this.$refs.input) {
        this.$refs.input.focus();
      }
    });
  },

  methods: {
    goToRoute () {
      if (this.query) {
        this.$router.push({
          name: 'search',
          query: { q: this.query },
        });
      }
    },

    handleEscape () {
      this.closeSearch();
    },

    closeSearch () {
      this.query = '';
      this.$store.commit('search/closeSearch');
      if (this.$route.name === 'search') {
        this.$router.push({
          path: this.fromPage || '/',
        });
      }
    },
  },
};
</script>

<style lang="scss" module>
@import "~/assets/css/utilities/_variables.scss";

.overlay {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 90;
  background-color: rgba(10, 11, 14, 0.94);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid $border-subtle;
  box-shadow: $shadow-lg;

  @media (min-width: $breakpoint-medium) {
    left: 8rem;
  }
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.2rem 1.6rem;

  @media (min-width: $breakpoint-small) {
    padding: 1.6rem 3.2rem;
  }

  @media (min-width: $breakpoint-large) {
    padding: 2rem 4.8rem;
  }
}

.form {
  width: 100%;
}

.field {
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 0.8rem 1.6rem;
  background-color: $surface-2;
  border: 1px solid $border-medium;
  border-radius: $radius-md;
  transition: all $transition-fast;

  &:focus-within {
    border-color: $primary-color;
    box-shadow: 0 0 0 3px rgba(229, 169, 60, 0.15);
  }
}

.searchIcon {
  display: flex;
  align-items: center;
  color: $primary-color;
}

.input {
  flex: 1;
  height: 4.4rem;
  padding: 0;
  font-size: 1.6rem;
  font-weight: 500;
  color: $text-primary;
  background: transparent;
  border: none;
  outline: none;

  &::placeholder {
    color: $text-muted;
  }

  @media (min-width: $breakpoint-small) {
    height: 4.8rem;
    font-size: 1.8rem;
  }
}

.actions {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.kbdHint {
  display: none;
  padding: 0.3rem 0.7rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: $text-muted;
  background-color: $surface-3;
  border: 1px solid $border-subtle;
  border-radius: $radius-xs;

  @media (min-width: $breakpoint-small) {
    display: inline-block;
  }
}

.closeButton {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.4rem;
  height: 3.4rem;
  border-radius: $radius-full;
  color: $text-muted;
  background-color: transparent;
  cursor: pointer;
  transition: all $transition-fast;

  &:hover {
    color: #fff;
    background-color: $surface-3;
  }
}
</style>
