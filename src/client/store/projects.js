import axios from 'axios'

const API = process.env.VUE_APP_PROJECTS_URL

export default ({
  namespaced: true,
  state: {
    dapps: [],
    page: 1,
    showError: false
  },
  mutations: {
    fillDapps (state, data) {
      for (let dapp of data.items) {
        state.dapps = [...state.dapps, dapp]
      }
      state.dapps = state.dapps.filter((dapp, index) => {
        const stateIndex = state.dapps.findIndex(x => x.name === dapp.name)
        if (stateIndex < index) return false
        return true
      })
    },
    incrementPageNo (state) {
      state.page++
    },
    toggleError (state, value) {
      state.showError = value
    },
    setPageNo (state, value) {
      state.page = value
    },
    emptyDapps (state) {
      state.dapps = []
    }
  },
  actions: {
    async fetchDapps ({ commit }, { page, text = '' }) {
      let data = await axios.get(API + '?limit=16' + page + text)
      if (data.data.items.length !== 0) {
        commit('fillDapps', data.data)
      }
    }
  },
  getters: {
    getDapps (state) {
      return state.dapps
    }
  }
})
