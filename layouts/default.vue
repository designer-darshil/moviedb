<template>
  <div class="relative min-h-screen bg-base-bg text-text-primary antialiased">
    <Toast position="top-right" />
    <CookieConsent />
    <InstallPrompt />

    <SearchForm v-if="searchOpen" />

    <Nav />
    <main id="main-content" class="min-h-[calc(100vh-200px)]">
      <nuxt />
    </main>
    <Footer />

    <ScrollTop :threshold="400" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CookieConsent from '~/components/global/CookieConsent';
import InstallPrompt from '~/components/global/InstallPrompt';
import SearchForm from '~/components/global/SearchForm';
import Nav from '~/components/global/Nav';
import Footer from '~/components/global/Footer';

export default {
  components: {
    CookieConsent,
    InstallPrompt,
    SearchForm,
    Nav,
    Footer,
  },

  computed: {
    ...mapState('search', ['searchOpen']),
  },
};
</script>
