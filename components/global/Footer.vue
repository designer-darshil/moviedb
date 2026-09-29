<template>
  <footer
    class="relative w-full bg-surface-1 border-t border-border-subtle mt-20 sm:mt-24 pb-24 md:pb-12"
    aria-label="Footer"
  >
    <div
      class="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 pt-12 sm:pt-16"
    >
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12 pb-12 border-b border-border-subtle"
      >
        <!-- Brand & Mission Column (2 Cols on lg) -->
        <div class="lg:col-span-2 flex flex-col gap-4 max-w-[420px]">
          <nuxt-link
            to="/"
            class="inline-flex items-center gap-3 no-underline group"
            aria-label="CINEPULSE Home"
          >
            <div
              class="flex items-center justify-center w-8 h-8 rounded-xl bg-primary-amber text-[#07080b] shadow-glow"
            >
              <svg
                class="ml-0.5"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <span
              class="font-display text-[1.65rem] font-black tracking-tight text-text-primary uppercase"
              >CINEPULSE</span
            >
          </nuxt-link>
          <p class="m-0 text-[1.35rem] leading-relaxed text-text-muted">
            The definitive cinematic discovery experience. Explore acclaimed
            films, trending television, and cast filmographies powered by The
            Movie Database.
          </p>
        </div>

        <!-- Movies Column -->
        <div class="flex flex-col gap-3">
          <h4
            class="m-0 text-[1.2rem] font-bold uppercase tracking-wider text-text-primary"
          >
            Feature Films
          </h4>
          <ul class="flex flex-col gap-2.5 list-none m-0 p-0 text-[1.3rem]">
            <li>
              <nuxt-link
                :to="{
                  name: 'movie-category-name',
                  params: { name: 'popular' },
                }"
                class="text-text-muted hover:text-primary-amber transition-colors duration-150"
              >
                Popular Films
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                :to="{
                  name: 'movie-category-name',
                  params: { name: 'top_rated' },
                }"
                class="text-text-muted hover:text-primary-amber transition-colors duration-150"
              >
                Top Rated Classics
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                :to="{
                  name: 'movie-category-name',
                  params: { name: 'upcoming' },
                }"
                class="text-text-muted hover:text-primary-amber transition-colors duration-150"
              >
                Upcoming Releases
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                :to="{
                  name: 'movie-category-name',
                  params: { name: 'now_playing' },
                }"
                class="text-text-muted hover:text-primary-amber transition-colors duration-150"
              >
                Now in Theatres
              </nuxt-link>
            </li>
          </ul>
        </div>

        <!-- TV Series Column -->
        <div class="flex flex-col gap-3">
          <h4
            class="m-0 text-[1.2rem] font-bold uppercase tracking-wider text-text-primary"
          >
            Television
          </h4>
          <ul class="flex flex-col gap-2.5 list-none m-0 p-0 text-[1.3rem]">
            <li>
              <nuxt-link
                :to="{ name: 'tv-category-name', params: { name: 'popular' } }"
                class="text-text-muted hover:text-primary-amber transition-colors duration-150"
              >
                Popular Shows
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                :to="{
                  name: 'tv-category-name',
                  params: { name: 'top_rated' },
                }"
                class="text-text-muted hover:text-primary-amber transition-colors duration-150"
              >
                Top Rated Series
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                :to="{
                  name: 'tv-category-name',
                  params: { name: 'on_the_air' },
                }"
                class="text-text-muted hover:text-primary-amber transition-colors duration-150"
              >
                Currently Airing
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                :to="{
                  name: 'tv-category-name',
                  params: { name: 'airing_today' },
                }"
                class="text-text-muted hover:text-primary-amber transition-colors duration-150"
              >
                Airing Today
              </nuxt-link>
            </li>
          </ul>
        </div>

        <!-- Data & Legal Column -->
        <div class="flex flex-col gap-3">
          <h4
            class="m-0 text-[1.2rem] font-bold uppercase tracking-wider text-text-primary"
          >
            Attribution
          </h4>
          <p class="m-0 text-[1.25rem] leading-relaxed text-text-muted">
            All film metadata and imagery courtesy of
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-text-primary font-medium underline hover:text-primary-amber transition-colors duration-150"
            >
              TMDb </a
            >. This product uses the TMDb API but is not certified or endorsed
            by TMDb.
          </p>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-8 text-[1.2rem] text-text-subtle"
      >
        <div>
          &copy; {{ new Date().getFullYear() }} CINEPULSE. Crafted for movie
          &amp; television lovers.
        </div>

        <div class="flex items-center gap-5">
          <nuxt-link
            to="/search"
            class="text-text-muted hover:text-text-primary transition-colors duration-150"
          >
            Search
          </nuxt-link>
          <a
            href="https://github.com/designer-darshil/moviedb"
            target="_blank"
            rel="noopener noreferrer"
            class="text-text-muted hover:text-text-primary transition-colors duration-150"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>
