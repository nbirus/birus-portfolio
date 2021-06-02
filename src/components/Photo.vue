<template>
  <div class="root" :style="style">
    <progressive-img v-if="visible" :class="aspect" :src="src" :placeholder="placeholder" :alt="alt" :id="id" />
  </div>
</template>

<script>
export default {
  name: 'photo',
  props: {
    id: {
      type: String,
      default: null,
    },
    src: {
      type: String,
      default: null,
    },
    alt: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    height: {
      type: Number,
      default: null,
    },
    width: {
      type: Number,
      default: null,
    },
    aspect: {
      type: String,
      default: null,
    },
    backgroundColor: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      visible: true,
      loading: true,
    }
  },
  computed: {
    aspectRatio() {
      return (this.height / this.width) * 100
    },
    style() {
      let style = {}
      style.backgroundColor = this.backgroundColor
      return style
    },
  },
}
</script>

<style lang="scss">
.root {
  height: 100%;
  position: relative;

  .progressive-image {
    max-width: unset !important;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .progressive-image-wrapper {
    padding-bottom: 100% !important;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  img {
    height: 100%;
  }
}
</style>
