<template>
  <div class="my-7 mx-4 sm:my-10 sm:mx-8 lg:my-12 lg:mx-12">
    <div class="flex items-baseline mb-4 lg:mb-6">
      <h2 class="m-0 text-[1.8rem] lg:text-[2.4rem] font-bold text-white -tracking-wide">
        {{ title }}
      </h2>

      <strong class="ml-4 text-[1.2rem] lg:text-[1.4rem] font-medium text-text-muted">
        {{ imagesCount }}
      </strong>
    </div>

    <div class="flex flex-wrap -mx-1.5">
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
