<template>
  <div class="tw-my-7 tw-mx-4 sm:tw-my-10 sm:tw-mx-8 lg:tw-my-12 lg:tw-mx-12">
    <div class="tw-flex tw-items-baseline tw-mb-4 lg:tw-mb-6">
      <h2 class="tw-m-0 tw-text-[1.8rem] lg:tw-text-[2.4rem] tw-font-bold tw-text-white -tw-tracking-wide">
        {{ title }}
      </h2>

      <strong class="tw-ml-4 tw-text-[1.2rem] lg:tw-text-[1.4rem] tw-font-medium tw-text-text-muted">
        {{ imagesCount }}
      </strong>
    </div>

    <div class="tw-flex tw-flex-wrap -tw-mx-1.5">
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
      aria-label="Images"
      nav
      :start-at="modalStartAt"
      @close="closeModal" />
  </div>
</template>

<script>
import { getPosterUrl, getBackdropUrl } from '~/api';
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
      return `${this.images.length} ${
        this.images.length > 1 ? 'Images' : 'Image'
      }`;
    },
  },

  created () {
    this.handleData();
  },

  methods: {
    handleData () {
      this.images.forEach((image) => {
        if (!image.file_path) return;
        const thumb =
          this.type === 'poster'
            ? getPosterUrl(image.file_path, 'w500')
            : getBackdropUrl(image.file_path, 'w780');
        const src = getBackdropUrl(image.file_path, 'original');
        this.$set(image, 'thumb', thumb);
        this.$set(image, 'src', src);
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
