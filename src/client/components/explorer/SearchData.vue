<template>
  <v-flex xs12 sm6>
    <v-card class="card">
      <v-card-title primary-title style="margin:0 !important;">
        <h3 class="display-3 font-weight-thin">Current Block Number</h3>
      </v-card-title>
      <v-card-text class="blockNumber">
        <h2 class="display-2 font-weight-thin">Number: {{ this.currentBlockNumber }}</h2>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
export default {}
</script>

<style scoped>
</style>
