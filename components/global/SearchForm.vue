<template>
  <div
    :class="$style.overlay"
    role="dialog"
    aria-modal="true"
    aria-label="Search Film & TV Catalogue"
    @click.self="closeSearch">
    <div :class="$style.dialog">
      <!-- Input Header -->
      <div :class="$style.header">
        <span :class="$style.searchIcon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>

        <input
          id="search-input"
          ref="input"
          v-model.trim="query"
          type="text"
          :class="$style.input"
          placeholder="Search movies, TV shows, actors, directors..."
          autocomplete="off"
          spellcheck="false"
          @keydown.esc="closeSearch"
          @keydown.enter="submitSearch"
          @input="onInput">

        <button
          v-if="query"
          type="button"
          :class="$style.clearBtn"
          aria-label="Clear query"
          @click="clearQuery">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <button
          type="button"
          :class="$style.closeBtn"
          aria-label="Close search"
          @click="closeSearch">
          <span :class="$style.escKey">ESC</span>
        </button>
      </div>

      <!-- Live Search Body -->
      <div :class="$style.body">
        <!-- Loading State -->
        <div v-if="loading" :class="$style.stateWrap">
          <div :class="$style.spinner" />
          <p :class="$style.stateText">Searching the archive...</p>
        </div>

        <!-- Empty Query: Discovery Suggestions -->
        <div v-else-if="!query" :class="$style.discoveryWrap">
          <h3 :class="$style.sectionLabel">
            Popular Searches
          </h3>
          <div :class="$style.suggestionChips">
            <button
              v-for="chip in suggestions"
              :key="chip"
              type="button"
              :class="$style.chip"
              @click="selectSuggestion(chip)">
              {{ chip }}
            </button>
          </div>

          <div :class="$style.quickBrowse">
            <h3 :class="$style.sectionLabel">
              Quick Browse
            </h3>
            <div :class="$style.quickLinks">
              <nuxt-link to="/movie" :class="$style.quickLink" @click.native="closeSearch">
                <span :class="$style.quickLinkIcon">🎬</span>
                <span>Trending Movies</span>
              </nuxt-link>
              <nuxt-link to="/tv" :class="$style.quickLink" @click.native="closeSearch">
                <span :class="$style.quickLinkIcon">📺</span>
                <span>Popular Television</span>
              </nuxt-link>
            </div>
          </div>
        </div>

        <!-- Live Search Results -->
        <div v-else-if="results && results.length" :class="$style.resultsWrap">
          <div :class="$style.resultsList">
            <nuxt-link
              v-for="item in results"
              :key="`result-${item.id}`"
              :to="{ name: `${getMedia(item)}-id`, params: { id: item.id } }"
              :class="$style.resultItem"
              @click.native="closeSearch">
              <!-- Thumbnail -->
              <div :class="$style.resultThumb">
                <img
                  v-if="getThumb(item)"
                  :src="getThumb(item)"
                  :alt="getName(item)"
                  :class="$style.resultImg">
                <div v-else :class="$style.resultImgPlaceholder">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              </div>

              <!-- Metadata -->
              <div :class="$style.resultInfo">
                <div :class="$style.resultTitleRow">
                  <span :class="$style.resultTitle">{{ getName(item) }}</span>
                  <span :class="[$style.typeTag, $style[`type${getMedia(item)}`]]">
                    {{ getMediaLabel(item) }}
                  </span>
                </div>

                <div :class="$style.resultMeta">
                  <span v-if="getYear(item)">{{ getYear(item) }}</span>
                  <span v-if="item.vote_average" :class="$style.resultRating">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    {{ item.vote_average | rating }}
                  </span>
                  <span v-if="item.known_for_department">{{ item.known_for_department }}</span>
                </div>
              </div>

              <span :class="$style.resultArrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            </nuxt-link>
          </div>

          <!-- View all results button -->
          <div :class="$style.viewAllFooter">
            <button
              type="button"
              :class="$style.viewAllBtn"
              @click="submitSearch">
              <span>View all results for "{{ query }}"</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        <!-- No Results -->
        <div v-else-if="searched && (!results || !results.length)" :class="$style.stateWrap">
          <div :class="$style.emptyIcon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </div>
          <h4 :class="$style.emptyTitle">You've searched beyond the catalogue</h4>
          <p :class="$style.stateText">No matches found for "{{ query }}". Try searching by alternative titles, actor names, or director credits.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { search, apiImgUrl } from '~/api';

let debounceTimeout = null;

export default {
  data () {
    return {
      query: this.$route.query.q || '',
      results: [],
      loading: false,
      searched: false,
      suggestions: [
        'Oppenheimer',
        'Dune',
        'Christopher Nolan',
        'Succession',
        'The Bear',
        'Interstellar',
        'Breaking Bad',
        'Denis Villeneuve',
      ],
    };
  },

  mounted () {
    this.$nextTick(() => {
      if (this.$refs.input) {
        this.$refs.input.focus();
      }
    });

    window.addEventListener('keydown', this.handleGlobalKeyDown);

    if (this.query) {
      this.executeLiveSearch();
    }
  },

  beforeDestroy () {
    window.removeEventListener('keydown', this.handleGlobalKeyDown);
    if (debounceTimeout) clearTimeout(debounceTimeout);
  },

  methods: {
    handleGlobalKeyDown (e) {
      if (e.key === 'Escape') {
        this.closeSearch();
      }
    },

    onInput () {
      if (debounceTimeout) clearTimeout(debounceTimeout);

      if (!this.query) {
        this.results = [];
        this.loading = false;
        this.searched = false;
        return;
      }

      this.loading = true;
      debounceTimeout = setTimeout(() => {
        this.executeLiveSearch();
      }, 300);
    },

    async executeLiveSearch () {
      if (!this.query) return;
      this.loading = true;

      try {
        const data = await search(this.query, 1);
        if (data && data.results) {
          // Limit instant dropdown to top 7 items
          this.results = data.results.slice(0, 7);
        } else {
          this.results = [];
        }
      } catch {
        this.results = [];
      } finally {
        this.loading = false;
        this.searched = true;
      }
    },

    submitSearch () {
      if (!this.query) return;
      this.$store.commit('search/closeSearch');
      this.$router.push({
        name: 'search',
        query: { q: this.query },
      });
    },

    selectSuggestion (val) {
      this.query = val;
      this.executeLiveSearch();
    },

    clearQuery () {
      this.query = '';
      this.results = [];
      this.searched = false;
      if (this.$refs.input) {
        this.$refs.input.focus();
      }
    },

    closeSearch () {
      this.$store.commit('search/closeSearch');
    },

    getMedia (item) {
      if (item.media_type) return item.media_type;
      if (item.name && item.first_air_date) return 'tv';
      if (item.name) return 'person';
      return 'movie';
    },

    getMediaLabel (item) {
      const media = this.getMedia(item);
      if (media === 'movie') return 'Movie';
      if (media === 'tv') return 'TV';
      return 'Person';
    },

    getName (item) {
      return item.title || item.name;
    },

    getYear (item) {
      const date = item.release_date || item.first_air_date;
      return date ? date.split('-')[0] : null;
    },

    getThumb (item) {
      if (item.poster_path) {
        return `${apiImgUrl}/w92${item.poster_path}`;
      } else if (item.profile_path) {
        return `${apiImgUrl}/w92${item.profile_path}`;
      }
      return null;
    },
  },
};
</script>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 1.6rem;
  background-color: rgba(11, 12, 14, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  overflow-y: auto;

  @media (min-width: $breakpoint-small) {
    padding: 6rem 2rem 3rem;
  }
}

.dialog {
  width: 100%;
  max-width: 68rem;
  background-color: $surface-1;
  border: 1px solid $border-medium;
  border-radius: $radius-lg;
  box-shadow: $shadow-elevated;
  overflow: hidden;
  animation: dialogIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes dialogIn {
  from {
    opacity: 0;
    transform: translateY(-1.2rem) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.header {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 1.6rem;
  height: 6.4rem;
  border-bottom: 1px solid $border-subtle;
  background-color: $surface-2;
}

.searchIcon {
  display: flex;
  align-items: center;
  color: $primary-color;
  margin-right: 1.2rem;
}

.input {
  flex: 1;
  height: 100%;
  font-size: 1.6rem;
  font-weight: 500;
  color: #fff;
  background: none;
  border: none;
  outline: none;

  &::placeholder {
    color: $text-muted;
  }
}

.clearBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.8rem;
  height: 2.8rem;
  padding: 0;
  color: $text-muted;
  background-color: rgba(255, 255, 255, 0.06);
  border-radius: $radius-full;
  cursor: pointer;
  margin-right: 0.8rem;

  &:hover {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.12);
  }
}

.closeBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
}

.escKey {
  padding: 0.3rem 0.7rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: $text-muted;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid $border-subtle;
  border-radius: $radius-sm;
}

.body {
  max-height: 60vh;
  overflow-y: auto;
  padding: 2rem 1.6rem;

  @media (min-width: $breakpoint-small) {
    padding: 2.4rem 2rem;
  }
}

.stateWrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 1.6rem;
  text-align: center;
}

.spinner {
  width: 3.2rem;
  height: 3.2rem;
  border: 3px solid rgba(229, 169, 60, 0.2);
  border-top-color: $primary-color;
  border-radius: $radius-full;
  animation: spin 0.8s linear infinite;
  margin-bottom: 1.6rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.stateText {
  margin: 0;
  font-size: 1.4rem;
  color: $text-muted;
  max-width: 40rem;
  line-height: 1.5;
}

.emptyIcon {
  color: $text-muted;
  margin-bottom: 1.4rem;
}

.emptyTitle {
  margin: 0 0 0.8rem;
  font-size: 1.7rem;
  font-weight: 600;
  color: #fff;
}

.discoveryWrap {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
}

.sectionLabel {
  margin: 0 0 1.2rem;
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: $text-muted;
}

.suggestionChips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.chip {
  padding: 0.6rem 1.2rem;
  font-size: 1.3rem;
  font-weight: 500;
  color: $text-color;
  background-color: $surface-2;
  border: 1px solid $border-subtle;
  border-radius: $radius-full;
  cursor: pointer;
  transition: all $transition-fast;

  &:hover {
    color: #fff;
    background-color: $surface-3;
    border-color: $border-medium;
  }
}

.quickBrowse {
  padding-top: 1.6rem;
  border-top: 1px solid $border-subtle;
}

.quickLinks {
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
}

.quickLink {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 1.6rem;
  font-size: 1.35rem;
  font-weight: 500;
  color: $text-color;
  background-color: $surface-2;
  border: 1px solid $border-subtle;
  border-radius: $radius-md;
  text-decoration: none;
  transition: all $transition-fast;

  &:hover {
    color: #fff;
    border-color: $primary-color;
    background-color: rgba(229, 169, 60, 0.08);
  }
}

.quickLinkIcon {
  font-size: 1.6rem;
}

.resultsWrap {
  display: flex;
  flex-direction: column;
}

.resultsList {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.resultItem {
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  border-radius: $radius-md;
  text-decoration: none;
  transition: background-color $transition-fast;

  &:hover {
    background-color: $surface-2;
  }
}

.resultThumb {
  flex: 0 0 4.2rem;
  height: 6rem;
  border-radius: $radius-sm;
  overflow: hidden;
  background-color: $surface-3;
  margin-right: 1.4rem;
}

.resultImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.resultImgPlaceholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: $text-muted;
}

.resultInfo {
  flex: 1;
  min-width: 0;
}

.resultTitleRow {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.resultTitle {
  font-size: 1.45rem;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.typeTag {
  padding: 0.15rem 0.6rem;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border-radius: $radius-sm;
  background-color: rgba(255, 255, 255, 0.08);
  color: $text-color-grey;
}

.typeMovie {
  color: #60a5fa;
  background-color: rgba(96, 165, 250, 0.12);
}

.typeTv {
  color: #34d399;
  background-color: rgba(52, 211, 153, 0.12);
}

.typePerson {
  color: #f472b6;
  background-color: rgba(244, 114, 182, 0.12);
}

.resultMeta {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: 0.3rem;
  font-size: 1.25rem;
  color: $text-muted;
}

.resultRating {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: $primary-color;
  font-weight: 600;
}

.resultArrow {
  color: $text-muted;
  margin-left: 0.8rem;
}

.viewAllFooter {
  padding-top: 1.6rem;
  margin-top: 1.2rem;
  border-top: 1px solid $border-subtle;
  text-align: center;
}

.viewAllBtn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1rem 2rem;
  font-size: 1.35rem;
  font-weight: 600;
  color: $primary-color;
  background-color: rgba(229, 169, 60, 0.08);
  border: 1px solid rgba(229, 169, 60, 0.25);
  border-radius: $radius-full;
  cursor: pointer;
  transition: all $transition-fast;

  &:hover {
    color: #0b0c0e;
    background-color: $primary-color;
  }
}
</style>
