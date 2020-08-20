<template>
  <div
    class="photo-gallery"
    v-if="positions.length"
    :style="width$ > 768 ? pageStyle : ''"
    :class="{ loading }"
  >
    <div
      v-for="(photo, i) in activePhotos"
      :key="i"
      class="photo-gallery__thumbnail"
      :style="getStyle(i)"
    >
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
          :placeholder="photo.urls.Medium.source"
          :alt="photo.name"
          :aspect="photo.aspect"
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
  props: ['loading'],
  data() {
    return {
      activePhotos: [],
      positions: [],
      pageStyle: {},
      tag: '',
    }
  },
  computed: {
    elements() {
      return this.activePhotos.map(photo => ({
        width: photo.width,
        height: photo.height,
      }))
    },
    filteredPhotos() {
      if (!this.tag) {
        return clone(photos).sort(sortPhotos)
      }
      return clone(photos).filter(photo => photo.tags.includes(this.tag))
    },
  },
  methods: {
    fit() {
      let width = this.width$
      let spacing = 8
      let idealElementHeight = 400
      let containerWidth = width - 16 * 8

      if (width > 1600) {
        spacing = 16
        containerWidth = 1600 - 16 * 8
      } else if (width > 1200) {
        spacing = 8
        idealElementHeight = 300
      } else if (width > 900) {
        spacing = 8
        idealElementHeight = 300
      } else if (width < 768) {
        return
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
    width$: 'fit',
    activePhotos: {
      handler: 'fit',
      deep: true,
    },
    filteredPhotos: {
      handler(photos) {
        this.activePhotos = photos
        // setTimeout(() => {
        // }, 250)
      },
      deep: true,
      immediate: true,
    },
    $route(route) {
      if (route.name === 'photography') {
        this.tag = this.$route.query.tag
      }
    },
  },
}

const sort = [
  '(Outer Banks, US)',
  '(San Francisco, US)',
  '(New York, US)',
  '(Maine, US)',
  '(Patagonia, Chile)',
  '(Easter Island, Chile)',
  '(Vina del Mar, Chile)',
  '(Peru, Chile)',
  '(Atacama, Chile)',
  '(Jamaica)',
  '(Chesapeake, US)',
  '(Maryland, US)',
]

function sortPhotos(a, b) {
  let aSort = sort.findIndex(s => a.description.includes(s))
  let bSort = sort.findIndex(s => b.description.includes(s))
  return aSort - bSort
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

  &.loading {
    // animation: loading 1.75s;

    // .photo-gallery__img {
    //   opacity: 0;
    // }
  }

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

// .photography-gallery {
// 	display: grid;
// 	grid-auto-flow: dense;

// 	&__link {
// 		background-color: var(--c-grey1);
// 		cursor: pointer;
// 		overflow: hidden;
// 		transition: transform 0.25s ease;
// 		position: relative;
// 		width: 100%;
// 		height: 100%;
// 		object-fit: cover;

// 		&.h .img {
// 			width: 100%;
// 			height: auto;
// 		}
// 		&.v .img {
// 			width: auto;
// 			height: 100%;
// 		}
// 		&.s .img {
// 			width: auto;
// 			height: 110%;
// 		}

// 		&:after {
// 			content: '';
// 			opacity: 0;
// 			transition: opacity 0.35s ease;
// 			z-index: 1;
// 		}
// &:hover {
// 	img {
// 		transform: scale(1.05);
// 	}

// 		&:after {
// 			content: '';
// 			position: absolute;
// 			bottom: 0;
// 			left: 0;
// 			right: 0;
// 			min-height: 50px;
// 			opacity: 1;
// 			pointer-events: none;
// 			background: rgb(0, 0, 0);
// 			background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.75) 100%);
// 		}
// 	}
// 	&:hover .photography-gallery__info {
// 		margin-bottom: 0;
// 		opacity: 1;
// 	}
// }
// &__info {
// 	position: absolute;
// 	z-index: 2;
// 	bottom: 0.5rem;
// 	left: 1rem;
// 	margin-bottom: -50px;
// 	transition: margin 0.35s ease;
// 	opacity: 0;
// }
// &__caption {
// 	color: white;
// 	line-height: 1.4em;
// 	display: inline-block;
// 	max-width: 100%;
// 	font-size: 1rem;
// 	position: relative;
// 	pointer-events: auto;
// 	white-space: nowrap;
// 	overflow: hidden;
// 	text-overflow: ellipsis;
// 	text-shadow: 0 0 2px rgba(0, 0, 0, 0.75);
// }
// }

// @media only screen and (max-width: 2065px) {
// 	.photography-gallery {
// 		grid-template-columns: repeat(8, 1fr);
// 		grid-template-rows: repeat(30, calc(3vw - 5px));
// 		grid-gap: 1rem;

// 		.h {
// 			grid-column: span 4;
// 			grid-row: span 5;
// 		}
// 		.v {
// 			grid-column: span 2;
// 			grid-row: span 7;
// 		}
// 		.s {
// 			grid-column: span 2;
// 			grid-row: span 5;
// 		}
// 	}
// }
// @media only screen and (max-width: 1665px) {
// 	.photography-gallery {
// 		grid-template-columns: repeat(6, 1fr);
// 		grid-template-rows: repeat(20, calc(3vw - 1px));
// 		grid-gap: 1.5rem;

// 		.h {
// 			grid-column: span 4;
// 			grid-row: span 7;
// 		}
// 		.v {
// 			grid-column: span 2;
// 			grid-row: span 8;
// 		}
// 		.s {
// 			grid-column: span 2;
// 			grid-row: span 6;
// 		}
// 	}
// }
// @media only screen and (max-width: 1100px) {
// 	.photography-gallery {
// 		grid-template-columns: repeat(3, 1fr);
// 		grid-template-rows: repeat(30, 5vw);
// 		grid-gap: 1rem;

// 		.h {
// 			grid-column: span 2;
// 			grid-row: span 5;
// 		}
// 		.v {
// 			grid-column: span 1;
// 			grid-row: span 5;
// 		}
// 		.s {
// 			grid-column: span 1;
// 			grid-row: span 4;
// 		}
// 	}
// }
// @media only screen and (max-width: 768px) {
// 	.photography-gallery {
// 		grid-template-columns: unset;
// 		grid-template-rows: unset;
// 		grid-gap: unset;
// 		grid-auto-flow: unset;
// 		display: block;

// 		overflow-x: hidden;
// 		width: 100% !important;

// 		.img {
// grid-column: unset !important;
// grid-row: unset !important;
// max-height: unset !important;
// max-width: unset !important;
// width: 100% !important;
// height: auto !important;
// margin-bottom: 1rem;

// .progressive-image-wrapper {
// 	padding: 0 !important;
// }
// .progressive-image-main {
// 	position: relative;
// }
// 		}
// 		&__info {
// 			display: none;
// 		}
// 	}
// }

@for $i from 0 through 25 {
  .delay-#{$i} {
    animation: down 0.25s + 0.2s * $i ease-in !important;
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
