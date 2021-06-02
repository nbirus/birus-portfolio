<!-- Observer.vue -->
<template>
  <div class="observer" />
</template>

<script>
export default {
  props: ['options'],
  data: () => ({
    observer: null,
  }),
  mounted() {
    const options = this.options || {}
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry) {
        this.$emit('intersect', entry.isIntersecting)
      }
    }, options)

    setTimeout(() => {
      this.observer.observe(this.$el)
    }, 500)
  },
  destroyed() {
    this.observer.disconnect()
  },
}
</script>