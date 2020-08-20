<template>
  <div class="snackbar">
    <div class="card">
      <div class="message" v-text="message"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'snackbar',
  data() {
    return {
      message: '',
    }
  },
}
</script>

<style>
</style>