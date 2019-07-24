import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex, axios)

const CMS_API = process.env.VUE_APP_CMS_API

export default ({
  namespaced: true,
  state: {
    today: '',
    events: [],
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    year: 0,
    mnthIndex: 0,
    years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029]
  },
  actions: {
    async LOAD_EVENTS ({ commit }) {
      let dataRecieved = await axios.get(`${CMS_API}/events`)
      let events = dataRecieved.data
      events.forEach(function (event) {
        event.date = event.date.slice(0, 10)
      })
      commit('SET_Events', events)
    },
    SET_TODAYS_DATE ({ commit }) {
      let today = new Date()
      today.date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
      today.month = today.getMonth()
      today.year = today.getFullYear()
      commit('SET_DATE', today)
    },
    DEC_MNTH ({ state, commit }) {
      commit('CHANGE_MNTH_IND', --state.mnthIndex)
    },
    INC_MNTH ({ state, commit }) {
      commit('CHANGE_MNTH_IND', ++state.mnthIndex)
    },
    MONTH_DROP ({ state, commit }, month) {
      let ind = state.months.indexOf(month)
      commit('CHANGE_MNTH_IND', ind)
    },
    YEAR_DROP ({ commit }, year) {
      commit('CHANGE_YEAR', year)
    }
  },
  mutations: {
    SET_Events: (state, events) => {
      state.events = events
    },
    SET_DATE: (state, today) => {
      state.today = today.date
      state.mnthIndex = today.month
      state.year = today.year
    },
    CHANGE_MNTH_IND: (state, ind) => {
      if (ind < 0) {
        ind = 11
        state.year--
      } else if (ind > 11) {
        ind = 0
        state.year++
      }
      state.mnthIndex = ind
    },
    CHANGE_YEAR: (state, year) => {
      state.year = year
    }
  }
})
