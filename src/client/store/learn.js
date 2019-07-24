import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex, axios)

const CMS_API = process.env.VUE_APP_CMS_API

export default ({
  namespaced: true,
  state: {
    heads: [],
    titles: []
  },
  actions: {
    async LOAD_HEADINGS ({ commit }) {
      let dataRecieved = await axios.get(`${CMS_API}/headings`)
      let heads = dataRecieved.data
      commit('SET_Headings', heads)
    },
    async LOAD_TITLES ({ commit }) {
      let dataRecieved = await axios.get(`${CMS_API}/titles`)
      let titles = dataRecieved.data
      commit('SET_Titles', titles)
    }
  },
  mutations: {
    SET_Headings: (state, heads) => {
      state.heads = heads
    },
    SET_Titles: (state, titles) => {
      state.titles = titles
    }
  }
})
