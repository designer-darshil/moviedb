import dotenv from 'dotenv';
dotenv.config();

export default {
  // https://nuxtjs.org/deployments/netlify/
  target: 'static',

  ssr: false,

  generate: {
    fallback: true,
  },

  // Server configuration
  server: {
    port: process.env.PORT || 5173,
    host: '0.0.0.0',
  },

  // Headers of the page
  head: {
    title: 'Browse Movies, TV Shows and People',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Browse Movies, TV Shows and People',
      },
      { hid: 'author', name: 'author', content: 'Jason Ujma-Alvis' },
      { hid: 'og:locale', property: 'og:locale', content: 'en_GB' },
      { hid: 'og:title', property: 'og:title', content: 'Movies App' },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Browse Movies, TV Shows and People',
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://movies.jason.codes/',
      },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: 'Movies' },
      {
        name: 'twitter:description',
        content: 'Browse Movies, TV Shows and People',
      },
      { name: 'twitter:site', content: '@jasonujmaalvis' },
      { name: 'twitter:creator', content: '@jasonujmaalvis' },
      {
        name: 'twitter:image',
        content: 'https://movies.jason.codes/icon-medium.png',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
      },
    ],
  },

  // Global CSS
  css: [
    'primevue/resources/themes/lara-dark-indigo/theme.css',
    'primevue/resources/primevue.min.css',
    'primeicons/primeicons.css',
    '@/assets/css/primevue-custom.scss',
    '@/assets/css/tailwind.css',
    '@/assets/css/global.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/primevue.js',
    '~/plugins/lazyload.js',
    '~/plugins/filters.js',
    { src: '~/plugins/ga.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/postcss8',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  modules: ['@nuxtjs/dotenv', '@nuxtjs/axios', '@nuxtjs/pwa'],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
      name: 'Movies',
      short_name: 'Movies',
      description: 'Browse Movies, TV Shows and People',
      theme_color: '#e5a93c',
      background_color: '#0b0c0e',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['primevue'],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },

  loaders: {
    cssModules: {
      camelCase: true,
      localIdentName: '[local]_[hash:base64:5]',
    },
  },

  vue: {
    config: {
      productionTip: false,
      devtools: false,
    },
  },

  env: {
    FRONTEND_URL: process.env.FRONTEND_URL || '',
    API_KEY: process.env.API_KEY || '',
    API_LANG: process.env.API_LANG || 'en-US',
    API_COUNTRY: process.env.API_COUNTRY || 'GB',
    API_YOUTUBE_KEY: process.env.API_YOUTUBE_KEY || '',
    GA: process.env.GA || '',
  },

  // Customize the progress bar color
  loading: {
    color: '#e5a93c',
  },
};
