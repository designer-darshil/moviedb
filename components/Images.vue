<template>
  <div class="my-6 sm:my-8 px-4 sm:px-8 lg:px-12 max-w-[1600px] mx-auto">
    <div class="flex items-baseline gap-3 mb-4 pb-3 border-b border-border-subtle">
      <h2 class="m-0 text-[1.8rem] font-bold text-white -tracking-wide">
        {{ title }}
      </h2>

      <span class="text-[1.25rem] text-text-muted">
        {{ imagesCount }}
      </span>
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
        this.images.length > 1 ? 'images' : 'image'
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
