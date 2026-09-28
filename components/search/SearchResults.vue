<template>
  <div :class="$style.listing">
    <div v-if="title" :class="$style.head">
      <div :class="$style.titleGroup">
        <span :class="$style.accentBar" />
        <h2 :class="$style.title">
          {{ title }}
        </h2>
      </div>
      <span v-if="items.total_results" :class="$style.count">
        {{ items.total_results }}
        {{ items.total_results === 1 ? "result" : "results" }}
      </span>
    </div>

    <div :class="$style.grid">
      <Card
        v-for="item in items.results"
        :key="`card-${item.id}`"
        :item="item" />
    </div>

    <div v-if="items.page < items.total_pages" :class="$style.loaderContainer">
      <div v-if="loading" :class="$style.spinner">
        <span :class="$style.spinnerRing" />
        <span :class="$style.spinnerText">Loading more results...</span>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from '~/mixins/Functions';
import Card from '~/components/Card';

export default {
  components: {
    Card,
  },

  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },

    items: {
      type: Object,
      required: true,
    },

    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  mounted () {
    window.addEventListener('scroll', this.getScrollPosition);
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.getScrollPosition);
  },

  methods: {
    getScrollPosition () {
      debounce(this.scrollEvent(), 100);
    },

    scrollEvent () {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 400 && !this.loading) {
        if (this.items.page < this.items.total_pages) {
          this.$emit('loadMore');
        }
      }
    },
  },
};
</script>

<style lang="scss" module>
@import "~/assets/css/utilities/_variables.scss";

.listing {
  margin: 3.2rem 0 6rem;
  padding: 0 1.6rem;

  @media (min-width: $breakpoint-small) {
    padding: 0 3.2rem;
    margin: 4rem 0 8rem;
  }

  @media (min-width: $breakpoint-large) {
    padding: 0 4.8rem;
  }
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.8rem;
}

.titleGroup {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.accentBar {
  display: inline-block;
  width: 4px;
  height: 2.4rem;
  background-color: $primary-color;
  border-radius: $radius-full;
}

.title {
  margin: 0;
  font-size: 2.2rem;
  font-weight: 700;
  color: $text-primary;
  letter-spacing: -0.02em;

  @media (min-width: $breakpoint-small) {
    font-size: 2.8rem;
  }
}

.count {
  font-size: 1.4rem;
  font-weight: 500;
  color: $text-muted;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.6rem;

  @media (min-width: $breakpoint-xsmall) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  @media (min-width: $breakpoint-small) {
    grid-template-columns: repeat(4, 1fr);
    gap: 2.4rem;
  }

  @media (min-width: $breakpoint-medium) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (min-width: $breakpoint-xlarge) {
    grid-template-columns: repeat(6, 1fr);
    gap: 2.8rem;
  }
}

.loaderContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
}

.spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
}

.spinnerRing {
  width: 3.2rem;
  height: 3.2rem;
  border: 3px solid rgba(229, 169, 60, 0.2);
  border-top-color: $primary-color;
  border-radius: $radius-full;
  animation: spin 0.8s linear infinite;
}

.spinnerText {
  font-size: 1.3rem;
  color: $text-muted;
  letter-spacing: 0.02em;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
