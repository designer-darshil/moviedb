<template>
  <div :class="[$style.item, $style[type]]">
    <a
      :class="$style.link"
      :href="image.src"
      aria-label="View photo full size"
      @click.prevent="handleGallery(index)">
      <div :class="$style.imageWrap">
        <img
          v-lazyload="image.thumb"
          class="lazyload"
          :class="$style.img"
          alt="Film gallery photograph">

        <div :class="$style.overlay">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      required: true,
    },

    index: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },
  },

  methods: {
    handleGallery (index) {
      this.$emit('openModal', index);
    },
  },
};
</script>

<style lang="scss" module>
@import "~/assets/css/utilities/_variables.scss";

.item {
  padding: 0.6rem;
}

.link {
  display: block;
  width: 100%;
  height: 100%;
  outline: none;

  &:hover {
    .imageWrap {
      border-color: $border-medium;
      box-shadow: $shadow-md;
    }

    .img {
      transform: scale(1.05);
    }

    .overlay {
      opacity: 1;
    }
  }

  &:focus-visible .imageWrap {
    outline: 2px solid $primary-color;
    outline-offset: 2px;
  }
}

.imageWrap {
  position: relative;
  height: 0;
  overflow: hidden;
  background-color: $surface-2;
  border: 1px solid $border-subtle;
  border-radius: $radius-md;
  transition: all $transition-normal;
}

.img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform $transition-slow;
}

.overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-color: rgba(10, 11, 14, 0.4);
  opacity: 0;
  transition: opacity $transition-fast;
}

.backdrop {
  width: 50%;

  @media (min-width: $breakpoint-xsmall) {
    width: 33.3333333%;
  }

  @media (min-width: $breakpoint-medium) {
    width: 25%;
  }

  @media (min-width: $breakpoint-large) {
    width: 20%;
  }

  .imageWrap {
    padding-top: 56.25%; // 16:9 ratio
  }
}

.poster {
  width: 33.3333333%;

  @media (min-width: $breakpoint-xsmall) {
    width: 25%;
  }

  @media (min-width: $breakpoint-medium) {
    width: 20%;
  }

  @media (min-width: $breakpoint-large) {
    width: 16.6666667%;
  }

  .imageWrap {
    padding-top: 150%; // 2:3 ratio
  }
}
</style>
