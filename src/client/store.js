import Vue from 'vue'
import Vuex from 'vuex'
import explorer from './store/explorer'
import projects from './store/projects'
import learn from './store/learn'
import calendar from './store/calendar'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    explorer,
    projects,
    learn,
    calendar
  }
})
