<template>
  <div :class="$style.wrapper">
    <!-- Header with Type Filter -->
    <div :class="$style.head">
      <div :class="$style.filterWrap">
        <label for="video-filter" :class="$style.filterLabel">Filter</label>
        <select
          v-if="videoTypes.length > 1"
          id="video-filter"
          v-model="activeType"
          :class="$style.select"
          @change="filterVideos">
          <option value="all">
            All Videos
          </option>
          <option
            v-for="type in videoTypes"
            :key="`video-type-${type}`"
            :value="type">
            {{ type }}
          </option>
        </select>
      </div>

      <span :class="$style.count">
        {{ videoCount }}
      </span>
    </div>

    <!-- Video Grid -->
    <div :class="$style.grid">
      <VideosItem
        v-for="(video, index) in activeVideos"
        :key="`video-${video.id}`"
        :video="video"
        :index="index"
        @openModal="openModal" />
    </div>

    <!-- Video Playback Modal -->
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
      return `${this.activeVideos.length} ${this.activeVideos.length > 1 ? 'Videos' : 'Video'}`;
    },

    videoTypes () {
      return this.videos.map(video => video.type).filter((video, index, self) => self.indexOf(video) === index);
    },
  },

  created () {
    this.handleData();
  },

  methods: {
    handleData () {
      const ids = this.videos.map(video => video.key).join(',');

      this.videos.forEach((video) => {
        this.$set(video, 'thumb', `https://img.youtube.com/vi/${video.key}/mqdefault.jpg`);
        this.$set(video, 'src', `https://www.youtube.com/embed/${video.key}?rel=0&showinfo=0&autoplay=1`);
        this.$set(video, 'url', `https://youtube.com/watch?v=${video.key}`);
      });

      if (process.env.API_YOUTUBE_KEY) {
        getYouTubeVideo(ids).then((response) => {
          if (response && response.items) {
            for (let index = 0; index < this.videos.length; index++) {
              if (response.items[index]) {
                this.$set(this.videos[index], 'duration', response.items[index].contentDetails.duration);
              }
            }
          }
        }).catch(() => {});
      }
    },

    filterVideos () {
      this.activeVideos = this.videos.filter(video => this.activeType === 'all' ? true : video.type === this.activeType);
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
  margin-bottom: 2.8rem;
  padding-bottom: 1.6rem;
  border-bottom: 1px solid $border-subtle;
}

.filterWrap {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.filterLabel {
  font-size: 1.3rem;
  font-weight: 600;
  color: $text-muted;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.select {
  min-width: 14rem;
}

.count {
  font-size: 1.35rem;
  font-weight: 500;
  color: $text-muted;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.4rem 2rem;

  @media (min-width: $breakpoint-xsmall) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: $breakpoint-medium) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 3.2rem 2.4rem;
  }

  @media (min-width: 1500px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
