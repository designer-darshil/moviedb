<template>
  <div :class="$style.wrapper">
    <div :class="$style.head">
      <div :class="$style.titleWrap">
        <span :class="$style.accentPip" />
        <h2 :class="$style.title">
          {{ title }}
        </h2>
      </div>

      <span :class="$style.count">
        {{ imagesCount }}
      </span>
    </div>

    <div :class="[$style.grid, $style[`grid${type}`]]">
      <ImagesItem
        v-for="(image, index) in images"
        :key="`image-${index}`"
        :image="image"
        :index="index"
        :type="type"
        @openModal="openModal" />
    </div>

    <Modal
      v-if="modalVisible"
      :data="images"
      modifier="modal--images"
      aria-label="High Resolution Film Images"
      nav
      :start-at="modalStartAt"
      @close="closeModal" />
  </div>
</template>

<script>
import { apiImgUrl } from '~/api';
import ImagesItem from '~/components/ImagesItem';
import Modal from '~/components/Modal';

export default {
  components: {
    ImagesItem,
    Modal,
  },

  props: {
    title: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    images: {
      type: Array,
      required: true,
    },
  },

  data () {
    return {
      modalVisible: false,
      modalStartAt: 0,
    };
  },

  computed: {
    imagesCount () {
      return `${this.images.length} ${this.images.length > 1 ? 'Photos' : 'Photo'}`;
    },
  },

  created () {
    this.handleData();
  },

  methods: {
    handleData () {
      let thumb;
      if (this.type === 'poster') {
        thumb = `${apiImgUrl}/w370_and_h556_bestv2`;
      } else {
        thumb = `${apiImgUrl}/w533_and_h300_bestv2`;
      }

      this.images.forEach((image) => {
        this.$set(image, 'thumb', `${thumb}${image.file_path}`);
        this.$set(image, 'src', `${apiImgUrl}/original${image.file_path}`);
      });
    },

    openModal (index) {
      this.modalStartAt = index;
      this.modalVisible = true;
    },

    closeModal () {
      this.modalVisible = false;
      this.modalStartAt = 0;
    },
  },
};
</script>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.wrapper {
  padding: 3.2rem 1.6rem;
  max-width: 1600px;
  margin: 0 auto;

  @media (min-width: $breakpoint-small) {
    padding: 4rem 3.2rem;
  }

  @media (min-width: $breakpoint-large) {
    padding: 4.8rem 4.8rem;
  }
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.4rem;
  padding-bottom: 1.6rem;
  border-bottom: 1px solid $border-subtle;
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

.title {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.02em;

  @media (min-width: $breakpoint-large) {
    font-size: 2.2rem;
  }
}

.count {
  font-size: 1.35rem;
  font-weight: 500;
  color: $text-muted;
}

.grid {
  display: grid;
  gap: 1.6rem;

  @media (min-width: $breakpoint-small) {
    gap: 2rem;
  }
}

.gridbackdrop {
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (min-width: $breakpoint-small) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: $breakpoint-large) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media (min-width: 1600px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}

.gridposter {
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (min-width: $breakpoint-xsmall) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: $breakpoint-small) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media (min-width: $breakpoint-medium) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  @media (min-width: 1500px) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
}
</style>
