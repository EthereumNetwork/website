<template>
  <v-progress-circular
    v-if="data.length === 0 && (showError !== '' && !showError)"
    indeterminate
    color="primary"
    class="progress"
  ></v-progress-circular>
</template>

<script>
export default {
  name: 'Progress',
  props: {
    data: Array,
    showError: Boolean
  }
}
</script>

<style scoped>
.progress {
  display: inline;
  margin-left: 48%;
  margin-top: 30vh;
}
</style>
