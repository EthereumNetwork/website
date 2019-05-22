import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const API = 'https://api.stateofthedapps.com/dapps'

export default new Vuex.Store({
  state: {
    dapps: [],
    page: 1,
    errorPage: false
  },
  mutations: {
    fillDapp (state, data) {
      for (let dapp of data.items) {
        state.dapps = [...state.dapps, dapp]
      }
    },
    incPage (state) {
      state.page++
    }
  },
  actions: {
    async fillDapp ({ commit }, page) {
      let data = await axios.get(API+page+'&limit=16')
      commit('fillDapp', data.data)
    }
  },
  getters: {
    getDapps (state) {
      return state.dapps
    },
    getDataByQuery: (state) => async (query) => {
      let data = await axios.get(API+query)
      if (data.data.items.length === 0) {
        state.errorPage = true
        return data
      }
      state.errorPage = false
      return data
    }
  }
})
