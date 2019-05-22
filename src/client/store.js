import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const API = 'https://api.stateofthedapps.com/dapps'

export default new Vuex.Store({
  state: {
    dapps: {},
    page: 0
  },
  mutations: {
    fillDapp (state, data) {
      state.dapps = data
    },
    incPage (state) {
      state.page++
    }
  },
  actions: {
    async fillDapp ({ commit }, page) {
      let data = await axios.get(API+`?offset=${page}`)
      commit('fillDapp', data.data)
    }
  },
  getters: {
    getDapps (state) {
      return state.dapps
    }
  }
})
