<template>
  <v-flex xs12 sm6 pa-3 :class="grid">
    <v-card class="card">
      <v-card-title primary-title style="margin:0 !important;">
        <h3 class="display-3 font-weight-thin title">{{ title }}</h3>
      </v-card-title>
      <div>
        <v-data-table :items="showData" hide-actions hide-headers class="elevation-1">
          <template v-slot:items="props">
            <td class="text-xs-left">{{ props.item.name }}:</td>
            <td class="text-xs-left">{{ props.item.value }}</td>
          </template>
          <template v-slot:no-data>
            <v-alert :value="true" color="error" icon="warning">
              Sorry, nothing to display here :(
            </v-alert>
          </template>
        </v-data-table>
      </div>
    </v-card>
  </v-flex>
</template>

<script>
const _ = require('lodash')

export default {
  name: 'BlockNumber',
  props: {
    title: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    grid: String
  },
  data () {
    return {
      showData: []
    }
  },
  mounted () {
    this.showData = this.changeDataToTable(this.data)
  },
  methods: {
    changeCase (data) {
      return _.startCase(data)
    },
    changeDataToTable (data) {
      let dataToAppend = []
      for (let subData in data) {
        dataToAppend = [...dataToAppend, {
          name: this.changeCase(subData),
          value: data[subData]
        }]
      }
      return dataToAppend
    }
  }
}
</script>

<style scoped>
.card {
  margin-bottom: 20px;
  display: block;
  height: 100%;
  padding: 20px;
  background-color: rgb(243, 243, 243);
}
.title {
  font-size: 45px !important;
  color: salmon;
}
</style>
