<template>
  <div>
    <i @click="$emit('input', 1)" class="material-icons" :class="{ selected: value >= 1 }">star</i>
    <i @click="$emit('input', 2)" class="material-icons" :class="{ selected: value >= 2 }">star</i>
    <i @click="$emit('input', 3)" class="material-icons" :class="{ selected: value >= 3 }">star</i>
    <i @click="$emit('input', 4)" class="material-icons" :class="{ selected: value >= 4 }">star</i>
    <i @click="$emit('input', 5)" class="material-icons" :class="{ selected: value >= 5 }">star</i>
  </div>
</template>

<script>
export default {
  name: 'rating',
  props: ['value'],
}
</script>

<style lang="scss" scoped>
.selected {
  color: orange;
}
i {
  cursor: pointer;
}
</style>