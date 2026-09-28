<template>
  <div :class="[$style.item, $style[type]]">
    <a
      :href="image.thumb"
      :class="$style.link"
      aria-label="View high resolution photograph"
      @click.prevent="handleGallery(index)">
      <div :class="$style.image">
        <img
          v-lazyload="image.thumb"
          class="lazyload"
          :class="$style.img"
          alt="Film still photograph">

        <div :class="$style.overlay">
          <span :class="$style.zoomIcon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </span>
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
@import '~/assets/css/utilities/_variables.scss';

.item {
  position: relative;
}

.link {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: $radius-md;
  overflow: hidden;
  outline: none;

  &:focus-visible {
    outline: 2px solid $primary-color;
    outline-offset: 2px;
  }
}

.image {
  position: relative;
  width: 100%;
  height: 0;
  overflow: hidden;
  background-color: $surface-2;
  border-radius: $radius-md;
  transition: transform $transition-normal, box-shadow $transition-normal;

  .link:hover & {
    transform: translateY(-2px);
    box-shadow: $shadow-md;
  }
}

.img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform $transition-slow;

  .link:hover & {
    transform: scale(1.04);
  }
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
  background-color: rgba(11, 12, 14, 0.4);
  opacity: 0;
  transition: opacity $transition-fast;

  .link:hover & {
    opacity: 1;
  }
}

.zoomIcon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.8rem;
  height: 3.8rem;
  border-radius: $radius-full;
  color: #0b0c0e;
  background-color: $primary-color;
  transform: scale(0.85);
  transition: transform $transition-fast;

  .link:hover & {
    transform: scale(1);
  }
}

.backdrop {
  .image {
    padding-top: 56.28%; // 16:9 aspect ratio
  }
}

.poster {
  .image {
    padding-top: 150%; // 2:3 aspect ratio
  }
}
</style>
