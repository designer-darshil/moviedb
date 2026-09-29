<template>
  <div class="my-7 mx-4 sm:my-10 sm:mx-8 lg:my-12 lg:mx-12">
    <div class="flex items-center justify-between mb-6 pb-4 border-b border-border-subtle">
      <div class="flex items-center gap-3">
        <select
          v-if="videoTypes.length > 1"
          v-model="activeType"
          aria-label="Filter videos by type"
          class="bg-surface-2 text-text-primary border border-border-subtle rounded-lg px-3 py-2 text-[1.3rem] outline-none focus:border-primary-amber"
          @change="filterVideos">
          <option value="all">
            All Video Types
          </option>
          <option
            v-for="type in videoTypes"
            :key="`video-type-${type}`"
            :value="type">
            {{ type }}
          </option>
        </select>
      </div>

      <div class="text-[1.35rem] font-medium text-text-muted">
        {{ videoCount }}
      </div>
    </div>

    <div class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
      <VideosItem
        v-for="(video, index) in activeVideos"
        :key="`video-${video.id}`"
        :video="video"
        :index="index"
        @openModal="openModal" />
    </div>

    <Modal
      v-if="modalVisible"
      :data="videos"
      type="iframe"
      nav
      :start-at="modalStartAt"
      @close="closeModal" />
  </div>
</template>

<script>
import { getYouTubeVideo } from '~/api';
import VideosItem from '~/components/VideosItem';
import Modal from '~/components/Modal';

export default {
  components: {
    VideosItem,
    Modal,
  },

  props: {
    videos: {
      type: Array,
      required: true,
    },
  },

  data () {
    return {
      activeType: 'all',
      activeVideos: this.videos,
      modalVisible: false,
      modalStartAt: 0,
    };
  },

  computed: {
    videoCount () {
      return `${this.activeVideos.length} ${
        this.activeVideos.length > 1 ? 'Videos' : 'Video'
      }`;
    },

    videoTypes () {
      return this.videos
        .map(video => video.type)
        .filter((video, index, self) => self.indexOf(video) === index);
    },
  },

  created () {
    this.handleData();
  },

  methods: {
    handleData () {
      const ids = this.videos.map(video => video.key).join(',');

      // video params
      this.videos.forEach((video) => {
        this.$set(
          video,
          'thumb',
          `https://img.youtube.com/vi/${video.key}/mqdefault.jpg`,
        );
        this.$set(
          video,
          'src',
          `https://www.youtube.com/embed/${video.key}?rel=0&showinfo=0&autoplay=1`,
        );
        this.$set(video, 'url', `https://youtube.com/watch?v=${video.key}`);
      });

      // get video duration from YouTube api
      getYouTubeVideo(ids)
        .then((response) => {
          if (response && response.items) {
            for (let index = 0; index < this.videos.length; index++) {
              if (response.items[index]) {
                this.$set(
                  this.videos[index],
                  'duration',
                  response.items[index].contentDetails.duration,
                );
              }
            }
          }
        })
        .catch(() => {});
    },

    filterVideos () {
      this.activeVideos = this.videos.filter(video =>
        this.activeType === 'all' ? true : video.type === this.activeType,
      );
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
