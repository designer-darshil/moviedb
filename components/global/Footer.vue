<template>
  <footer class="relative w-full bg-surface-1 border-t border-border-subtle mt-20 sm:mt-24 pb-20 md:pb-8">
    <div class="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 pt-10 sm:pt-12">
      <div class="flex flex-col md:flex-row justify-between gap-8 pb-10 border-b border-border-subtle">
        <!-- Brand & Mission Column -->
        <div class="flex flex-col gap-3 max-w-[360px]">
          <div class="flex items-center gap-2">
            <div class="flex items-center justify-center w-7 h-7 rounded-md bg-primary-amber text-[#07080b]">
              <svg
                class="ml-0.5"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <span class="font-display text-[1.5rem] font-bold tracking-tight text-white uppercase">CINEPULSE</span>
          </div>
          <p class="m-0 text-[1.25rem] leading-relaxed text-text-muted">
            A minimal, modern movie and television discovery experience powered by The Movie Database.
          </p>
        </div>

        <!-- Links Columns Grid -->
        <div class="flex flex-wrap gap-8 sm:gap-14 text-[1.25rem]">
          <div class="flex flex-col gap-2.5">
            <h4 class="m-0 text-[1.15rem] font-semibold uppercase tracking-wider text-text-primary">
              Movies
            </h4>
            <ul class="flex flex-col gap-2 list-none m-0 p-0 text-text-muted [&_a]:text-text-muted hover:[&_a]:text-white [&_a]:transition-colors [&_a]:duration-150">
              <li>
                <nuxt-link :to="{ name: 'movie-category-name', params: { name: 'popular' } }">
                  Popular
                </nuxt-link>
              </li>
              <li>
                <nuxt-link :to="{ name: 'movie-category-name', params: { name: 'top_rated' } }">
                  Top Rated
                </nuxt-link>
              </li>
              <li>
                <nuxt-link :to="{ name: 'movie-category-name', params: { name: 'upcoming' } }">
                  Upcoming
                </nuxt-link>
              </li>
              <li>
                <nuxt-link :to="{ name: 'movie-category-name', params: { name: 'now_playing' } }">
                  Now Playing
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div class="flex flex-col gap-2.5">
            <h4 class="m-0 text-[1.15rem] font-semibold uppercase tracking-wider text-text-primary">
              TV Series
            </h4>
            <ul class="flex flex-col gap-2 list-none m-0 p-0 text-text-muted [&_a]:text-text-muted hover:[&_a]:text-white [&_a]:transition-colors [&_a]:duration-150">
              <li>
                <nuxt-link :to="{ name: 'tv-category-name', params: { name: 'popular' } }">
                  Popular
                </nuxt-link>
              </li>
              <li>
                <nuxt-link :to="{ name: 'tv-category-name', params: { name: 'top_rated' } }">
                  Top Rated
                </nuxt-link>
              </li>
              <li>
                <nuxt-link :to="{ name: 'tv-category-name', params: { name: 'on_the_air' } }">
                  On The Air
                </nuxt-link>
              </li>
              <li>
                <nuxt-link :to="{ name: 'tv-category-name', params: { name: 'airing_today' } }">
                  Airing Today
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div class="flex flex-col gap-2.5 max-w-[280px]">
            <h4 class="m-0 text-[1.15rem] font-semibold uppercase tracking-wider text-text-primary">
              Data &amp; API
            </h4>
            <p class="m-0 text-[1.2rem] leading-relaxed text-text-muted">
              Film data and artwork provided by
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener"
                class="text-text-primary underline hover:text-primary-amber">TMDb</a>.
              This product uses the TMDb API but is not certified or endorsed by TMDb.
            </p>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-6 text-[1.15rem] text-text-subtle">
        <div>
          &copy; {{ new Date().getFullYear() }} CINEPULSE. All movie metadata and imagery courtesy of TMDb.
        </div>

        <div>
          <a
            href="https://github.com/designer-darshil/moviedb"
            target="_blank"
            rel="noopener"
            aria-label="GitHub Repository"
            class="text-text-muted hover:text-white transition-colors duration-150">
            GitHub
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
