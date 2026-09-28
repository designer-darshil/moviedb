<template>
  <main class="main">
    <!-- Editorial Hero Showcase (Stable selection) -->
    <Hero
      v-if="featured"
      :item="featured" />

    <!-- Trending Now (Movies) -->
    <ListingCarousel
      v-if="trendingMovies && trendingMovies.results.length"
      title="Trending This Week"
      :view-all-url="trendingMoviesUrl"
      :items="trendingMovies" />

    <!-- Trending TV Series -->
    <ListingCarousel
      v-if="trendingTv && trendingTv.results.length"
      title="Popular In Television"
      :view-all-url="trendingTvUrl"
      :items="trendingTv" />

    <!-- Curated Cinema Discover More: Genre Exploration -->
    <section :class="$style.genreSection" aria-label="Explore by Genre">
      <div :class="$style.genreHeader">
        <div :class="$style.titleWrap">
          <span :class="$style.accentPip" />
          <h2 :class="$style.genreTitle">
            Curated Film Disciplines & Genres
          </h2>
        </div>
        <p :class="$style.genreSubtitle">
          Explore cinema through dedicated genres and narrative categories.
        </p>
      </div>

      <div :class="$style.genreGrid">
        <nuxt-link
          v-for="genre in popularGenres"
          :key="`genre-${genre.id}`"
          :to="{ name: 'genre-id-movie', params: { id: genre.id } }"
          :class="$style.genreCard">
          <span :class="$style.genreName">{{ genre.name }}</span>
          <span :class="$style.genreArrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </span>
        </nuxt-link>
      </div>
    </section>

    <!-- Popular Feature Films -->
    <ListingCarousel
      v-if="popularMovies && popularMovies.results.length"
      title="Critically Acclaimed & Popular"
      :view-all-url="popularMoviesUrl"
      :items="popularMovies" />
  </main>
</template>

<script>
import { getTrending, getMovie, getMovies, getListItem } from '~/api';
import Hero from '~/components/Hero';
import ListingCarousel from '~/components/ListingCarousel';

export default {
  components: {
    Hero,
    ListingCarousel,
  },

  data () {
    return {
      popularGenres: [
        { id: 28, name: 'Action & Adventure' },
        { id: 18, name: 'Drama' },
        { id: 878, name: 'Science Fiction' },
        { id: 53, name: 'Thriller' },
        { id: 35, name: 'Comedy' },
        { id: 16, name: 'Animation' },
        { id: 80, name: 'Crime' },
        { id: 9648, name: 'Mystery' },
        { id: 27, name: 'Horror' },
        { id: 99, name: 'Documentary' },
      ],
    };
  },

  head () {
    return {
      title: 'CinemaDB — Modern Film & TV Discovery',
      meta: [
        { hid: 'og:title', property: 'og:title', content: 'CinemaDB — Modern Film & TV Discovery' },
        { hid: 'og:description', property: 'og:description', content: 'Discover curated movies, trending television series, and filmmaker credits.' },
      ],
    };
  },

  computed: {
    trendingMoviesUrl () {
      return { name: 'movie-category-name', params: { name: 'trending' } };
    },

    trendingTvUrl () {
      return { name: 'tv-category-name', params: { name: 'trending' } };
    },

    popularMoviesUrl () {
      return { name: 'movie-category-name', params: { name: 'popular' } };
    },
  },

  async asyncData ({ error }) {
    try {
      const [trendingMovies, trendingTv, popularMovies] = await Promise.all([
        getTrending('movie'),
        getTrending('tv'),
        getMovies('popular'),
      ]);

      // Stable, intentional selection strategy: feature the top trending film with full details
      let featured = null;
      if (trendingMovies && trendingMovies.results && trendingMovies.results.length) {
        featured = await getMovie(trendingMovies.results[0].id);
      }

      return { trendingMovies, trendingTv, popularMovies, featured };
    } catch {
      error({ statusCode: 504, message: 'Data not available' });
    }
  },
};
</script>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.genreSection {
  padding: 0 1.6rem 4.8rem;
  max-width: 1600px;
  margin: 0 auto;

  @media (min-width: $breakpoint-small) {
    padding: 0 3.2rem 6.4rem;
  }

  @media (min-width: $breakpoint-large) {
    padding: 0 4.8rem 6.4rem;
  }
}

.genreHeader {
  margin-bottom: 2.4rem;
}

.titleWrap {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.accentPip {
  display: inline-block;
  width: 4px;
  height: 2rem;
  background-color: $primary-color;
  border-radius: $radius-full;
}

.genreTitle {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.02em;

  @media (min-width: $breakpoint-large) {
    font-size: 2.2rem;
  }
}

.genreSubtitle {
  margin: 0.6rem 0 0 1.4rem;
  font-size: 1.3rem;
  color: $text-muted;
}

.genreGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.2rem;

  @media (min-width: $breakpoint-xsmall) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: $breakpoint-medium) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 1.6rem;
  }
}

.genreCard {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 1.8rem;
  background-color: $surface-1;
  border: 1px solid $border-subtle;
  border-radius: $radius-md;
  text-decoration: none;
  transition: all $transition-fast;

  &:hover {
    background-color: $surface-2;
    border-color: rgba(229, 169, 60, 0.4);
    transform: translateY(-2px);
    box-shadow: $shadow-md;

    .genreName {
      color: #fff;
    }

    .genreArrow {
      color: $primary-color;
      transform: translateX(3px);
    }
  }
}

.genreName {
  font-size: 1.35rem;
  font-weight: 600;
  color: $text-color;
  transition: color $transition-fast;
}

.genreArrow {
  display: flex;
  align-items: center;
  color: $text-muted;
  transition: transform $transition-fast, color $transition-fast;
}
</style>
