<template>
  <div class="photo-gallery" v-if="positions.length" :style="width$ > 768 ? pageStyle : ''" :class="{ loading }">
    <div v-for="(photo, i) in activePhotos" :key="i" class="photo-gallery__thumbnail" :style="getStyle(i)" ref="list">
      <router-link
        tag="a"
        :to="`/photography/${photo.id}`"
        :id="photo.id"
        class="photo-gallery__link"
        :class="`delay-${i} ${photo.aspect}`"
        :aria-label="`Open photo ${photo.name}`"
      >
        <photo
          class="photo-gallery__img"
          :id="`photo-${photo.id}`"
          :height="photo.height"
          :width="photo.width"
          :src="photo.urls.Large.source"
          :placeholder="photo.urls.Small.source"
          :alt="photo.name"
          :aspect="photo.aspect"
          :style="{ minHeight: photo.height }"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
import photos from '@/assets/photos'
import Photo from '@/components/Photo'
import WidthMixin from '@/mixins/WidthMixin'

import layout from './fixed-partition'

export default {
  name: 'photography-gallery',
  components: { Photo },
  mixins: [WidthMixin],
  props: ['loading', 'pageKey'],
  data() {
    return {
      activePhotos: [],
      positions: [],
      pageStyle: {},
    }
  },
  computed: {
    elements() {
      return this.activePhotos.map((photo) => ({
        width: photo.width,
        height: photo.height,
      }))
    },
  },
  methods: {
    filterPhotos() {
      let activePhotos = clone(photos)
      if (this.$route.query.tag) {
        activePhotos = activePhotos.filter((photo) => photo.tags.includes(this.$route.query.tag))
      }
      // this.activePhotos = activePhotos.sort(sortPhotos)
      this.activePhotos = activePhotos
    },
    fit(width) {
      if (width === 0) {
        return
      }
      let spacing = 6
      let idealElementHeight = 400
      let containerWidth = width - 16 * 10

      if (width > 1600) {
        spacing = 6
        idealElementHeight = 300
      } else if (width > 1200) {
        spacing = 6
        idealElementHeight = 275
      } else if (width > 900) {
        spacing = 6
        idealElementHeight = 275
      } else if (width < 768) {
        spacing = 6
        containerWidth = width
        idealElementHeight = 300
      }

      let result = layout(this.elements, {
        idealElementHeight,
        containerWidth,
        spacing,
      })
      this.pageStyle = {
        width: `${result.width}px`,
        height: `${result.height + 64}px`,
      }
      this.positions = result.positions
    },
    getStyle(i) {
      let pos = this.positions[i]
      let photo = this.activePhotos[i]
      if (this.width$ < 768) {
        return {}
      }
      return {
        width: `${pos.width}px`,
        height: `${pos.height}px`,
        top: `${pos.y}px`,
        left: `${pos.x}px`,
        backgroundColor: `rgba(${[...photo.placeholderColor, 0.5]})`,
      }
    },
  },
  watch: {
    pageKey: {
      handler: 'filterPhotos',
      immediate: true,
    },
    width$: {
      handler: 'fit',
      immediate: true,
    },
    activePhotos: {
      handler: 'fit',
      deep: true,
    },
  },
}
function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}
</script>

<style lang="scss">
@import '@/styles/component';

@keyframes loading {
  0% {
    opacity: 1;
  }
  40% {
    opacity: 0;
  }
  60% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.photo-gallery {
  position: relative;

  &__thumbnail {
    position: absolute;
    display: inline-block;
    overflow: hidden;
    opacity: 1;
    background-color: #eeeff2;

    &:hover {
      .photo-gallery {
        &__img {
          transform: scale(1.025);
          box-shadow: 0 0 0 -2px var(--c-blue);
        }
      }
    }
    &:active {
      .photo-gallery {
        &__img {
          transform: scale(1);
          box-shadow: 0 0 0 -2px var(--c-blue);
        }
      }
    }
  }
  &__link {
    display: block;
    width: 100%;
    height: 100%;
  }
  &__img {
    position: relative;
    width: auto;
    height: 100%;
    transition: transform 0.35s ease, opacity 1s ease;
    opacity: 1;
  }
}

@media only screen and (max-width: 768px) {
  .photo-gallery {
    &__thumbnail {
      position: relative;
    }
    &__link {
      position: relative;
    }
    &__img {
      transform: scale(1) !important;
      position: relative;
      grid-column: unset !important;
      grid-row: unset !important;
      max-height: unset !important;
      max-width: unset !important;
      width: 100% !important;
      height: auto !important;
      margin-bottom: 1rem;

      .progressive-image-wrapper {
        padding: 0 !important;
      }
      .progressive-image-main {
        position: relative;
      }
    }
  }
}

@media only screen and (max-width: 2065px) {
  .photography-gallery {
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(30, calc(3vw - 5px));
    grid-gap: 0.25rem;

    .h {
      grid-column: span 4;
      grid-row: span 5;
    }
    .v {
      grid-column: span 2;
      grid-row: span 7;
    }
    .s {
      grid-column: span 2;
      grid-row: span 5;
    }
  }
}
@keyframes down {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
