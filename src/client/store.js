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
      state.dapps = state.dapps
      .map(e => e['name'])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter(e => state.dapps[e]).map(e => state.dapps[e]);
    },
    incPage (state) {
      state.page++
    },
    setErrorPageStatus (state, value) {
      state.errorPage = value
    },
    setPageValue (state, value) {
      state.page = value
    },
    emptyDapps (state) {
      state.dapps = []
    }
  },
  actions: {
    async fillDapp({ commit }, { page, text='' }) {
      let data = await axios.get(API + '?limit=16' + page + text)
      if (data.data.items.length !== 0) {
        commit('fillDapp', data.data)
      }
    }
  },
  getters: {
    getDapps (state) {
      return state.dapps
    }
  }
})
