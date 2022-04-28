import Vue from 'vue'
import Vuex from 'vuex'
import authentication from './modules/auth'
import activity from './modules/activity'
import sync from './modules/sync'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    authentication,
    activity,
    sync
  }
})
