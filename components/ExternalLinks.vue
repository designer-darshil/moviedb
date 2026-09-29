<template>
  <ul class="flex items-center gap-2.5 list-none m-0 p-0">
    <li v-if="links.imdb_id">
      <a
        v-ripple
        v-tooltip.top="'View on IMDb'"
        :href="`https://www.imdb.com/${imdb}/${links.imdb_id}`"
        target="_blank"
        aria-label="View on IMDb"
        class="flex items-center justify-center w-10 h-10 rounded-full text-text-secondary bg-surface-2 border border-border-subtle hover:text-text-primary hover:bg-surface-3 hover:border-border-medium hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-amber"
        rel="noopener"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M14.31 9.588v.005c-.077-.048-.227-.07-.42-.07v4.815c.27 0 .44-.06.5-.165.062-.104.095-.405.095-.885v-2.866c0-.33-.004-.54-.033-.63a.292.292 0 0 0-.14-.204z"
          />
          <path
            d="M22.416 0H1.62C.742.06.06.744 0 1.596V22.38c.06.874.712 1.542 1.555 1.617.015.003.03.003.045.003h20.845A1.727 1.727 0 0 0 24 22.29V1.71C24 .82 23.305.07 22.416 0zM4.792 15.626H2.887V8.26h1.905v7.366zm6.54-.002H9.67v-4.97L9 15.623H7.812l-.698-4.86-.007 4.86H5.44V8.26h2.468c.083.523.16 1.048.23 1.574l.27 1.87.442-3.444h2.483v7.364zm4.977-2.18c0 .655-.044 1.094-.104 1.32-.062.22-.17.4-.326.52-.15.13-.34.218-.57.266-.223.045-.57.075-1.02.075l-.004-.002H11.98V8.26h1.426c.914 0 1.45.047 1.77.128.325.09.575.225.745.42.165.18.273.404.313.645.05.235.076.705.076 1.402v2.588zm4.944.475c0 .45-.045.764-.09.99-.06.224-.195.404-.405.568-.226.166-.48.24-.78.24-.22 0-.5-.06-.68-.136a1.586 1.586 0 0 1-.515-.427l-.116.47H16.95V8.26l-.02-.003h1.8v2.4c.15-.175.315-.31.51-.4.196-.083.466-.127.69-.127.226-.003.45.036.66.115.17.07.32.185.436.33.09.125.15.27.18.42.03.138.044.43.044.87v2.054z"
          />
          <path
            d="M19.08 11.205c-.12 0-.194.04-.225.12-.03.08-.06.29-.06.624v1.946c0 .324.03.533.06.623.04.086.13.14.226.134.12 0 .272-.047.3-.14.03-.097.046-.32.046-.674l.03-.002v-1.89c0-.303-.015-.508-.06-.603-.044-.1-.195-.14-.315-.14z"
          />
        </svg>
      </a>
    </li>

    <li v-if="links.homepage">
      <a
        v-ripple
        v-tooltip.top="'Official Website'"
        :href="links.homepage"
        target="_blank"
        aria-label="Official Website"
        class="flex items-center justify-center w-10 h-10 rounded-full text-text-secondary bg-surface-2 border border-border-subtle hover:text-text-primary hover:bg-surface-3 hover:border-border-medium hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-amber"
        rel="noopener"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path
            d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"
          />
        </svg>
      </a>
    </li>

    <li v-if="links.twitter_id">
      <a
        v-ripple
        v-tooltip.top="'Twitter'"
        :href="`https://twitter.com/${links.twitter_id}`"
        target="_blank"
        aria-label="Twitter Profile"
        class="flex items-center justify-center w-10 h-10 rounded-full text-text-secondary bg-surface-2 border border-border-subtle hover:text-text-primary hover:bg-surface-3 hover:border-border-medium hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-amber"
        rel="noopener"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
          />
        </svg>
      </a>
    </li>

    <li v-if="links.instagram_id">
      <a
        v-ripple
        v-tooltip.top="'Instagram'"
        :href="`https://instagram.com/${links.instagram_id}`"
        target="_blank"
        aria-label="Instagram Profile"
        class="flex items-center justify-center w-10 h-10 rounded-full text-text-secondary bg-surface-2 border border-border-subtle hover:text-text-primary hover:bg-surface-3 hover:border-border-medium hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-amber"
        rel="noopener"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      </a>
    </li>

    <li v-if="links.facebook_id">
      <a
        v-ripple
        v-tooltip.top="'Facebook'"
        :href="`https://www.facebook.com/${links.facebook_id}`"
        target="_blank"
        aria-label="Facebook Profile"
        class="flex items-center justify-center w-10 h-10 rounded-full text-text-secondary bg-surface-2 border border-border-subtle hover:text-text-primary hover:bg-surface-3 hover:border-border-medium hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-amber"
        rel="noopener"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
          />
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    media: {
      type: String,
      required: false,
      default: '',
    },

    links: {
      type: Object,
      required: true,
    },
  },

  computed: {
    imdb() {
      if (this.media === 'person') {
        return 'name';
      } else {
        return 'title';
      }
    },
  },
};
</script>
