<template>
  <main class="main">
    <TopNav :title="metaTitle" />

    <!-- Person Hero & Bio Card -->
    <PersonInfo :person="person" />

    <!-- Section Switcher Pills -->
    <MediaNav :menu="menu" @clicked="navClicked" />

    <!-- Dynamic Section Container with Transitions -->
    <transition name="fade" mode="out-in">
      <div :key="`person-tab-${activeMenu}`">
        <template v-if="activeMenu === 'known-for'">
          <Listing
            v-if="knownFor && knownFor.results.length"
            :items="knownFor" />
        </template>

        <template v-if="activeMenu === 'credits'">
          <CreditsHistory :credits="person.combined_credits" />
        </template>

        <template v-if="activeMenu === 'photos' && showImages">
          <Images
            v-if="person.images.profiles.length"
            title="Photos"
            type="poster"
            :images="person.images.profiles" />
        </template>
      </div>
    </transition>
  </main>
</template>

<script>
import { apiImgUrl, getPerson } from '~/api';
import TopNav from '~/components/global/TopNav';
import PersonInfo from '~/components/person/PersonInfo';
import MediaNav from '~/components/MediaNav';
import CreditsHistory from '~/components/person/CreditsHistory';
import Images from '~/components/Images';
import Listing from '~/components/Listing';

export default {
  components: {
    TopNav,
    PersonInfo,
    MediaNav,
    CreditsHistory,
    Images,
    Listing,
  },

  async asyncData ({ params, error }) {
    try {
      const person = await getPerson(params.id);

      if (person.adult) {
        error({ message: 'This person is not available' });
      } else {
        return { person };
      }
    } catch {
      error({ statusCode: 404, message: 'Page not found' });
    }
  },

  data () {
    return {
      menu: [],
      activeMenu: 'known-for',
      knownFor: null,
    };
  },

  head () {
    return {
      title: `${this.metaTitle} — CINEPULSE`,
      meta: [
        { hid: 'og:title', property: 'og:title', content: this.metaTitle },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.metaDescription,
        },
        {
          hid: 'description',
          name: 'description',
          content: this.metaDescription,
        },
        { hid: 'og:image', property: 'og:image', content: this.metaImage },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.FRONTEND_URL}${this.$route.path}`,
        },
      ],
      bodyAttrs: {
        class: 'topnav-active',
      },
    };
  },

  computed: {
    metaTitle () {
      return this.person.name;
    },

    metaDescription () {
      if (this.person.biography) {
        return this.truncate(this.person.biography, 200);
      } else {
        return '';
      }
    },

    metaImage () {
      if (this.person.profile_path) {
        return `${apiImgUrl}/w500${this.person.profile_path}`;
      } else {
        return '';
      }
    },

    showImages () {
      const images = this.person.images;
      return images && images.profiles && images.profiles.length;
    },
  },

  created () {
    this.createMenu();
    this.initKnownFor();
  },

  methods: {
    truncate (string, length) {
      return this.$options.filters.truncate(string, length);
    },

    createMenu () {
      const menu = [];

      // known for
      menu.push('Known For');

      // credits
      menu.push('Credits');

      // images
      if (this.showImages) menu.push('Photos');

      this.menu = menu;
    },

    navClicked (label) {
      this.activeMenu = label;
    },

    initKnownFor () {
      if (this.knownFor !== null) return;

      const department = this.person.known_for_department;
      let results;

      if (department === 'Acting') {
        results = this.person.combined_credits.cast;
      } else if (department === 'Directing') {
        results = this.person.combined_credits.crew.filter(
          item => item.department === 'Directing',
        );
      } else if (department === 'Production') {
        results = this.person.combined_credits.crew.filter(
          item => item.department === 'Production',
        );
      } else if (department === 'Writing' || department === 'Creator') {
        results = this.person.combined_credits.crew.filter(
          item => item.department === 'Writing',
        );
      }

      if (!results) return;

      results = this.removeDuplicates(results);

      // results = results.filter((item) => {
      //   if (item.adult) return false;
      //   return true;
      // });

      results.sort((a, b) => (a.vote_count > b.vote_count ? -1 : 1));

      this.knownFor = {
        page: 1,
        total_pages: 1,
        total_results: results.length,
        results,
      };
    },

    removeDuplicates (myArr) {
      return myArr.filter((obj, pos, arr) => {
        const prop = obj.title ? 'title' : 'name';
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
      });
    },
  },
};
</script>
