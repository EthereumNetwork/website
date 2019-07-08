import Vue from 'vue'
import Vuex from 'vuex'
import explorer from './store/explorer'
import projects from './store/projects'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    explorer: explorer,
    projects: projects
  }
})
