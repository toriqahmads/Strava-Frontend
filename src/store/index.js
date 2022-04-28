import Vue from 'vue'
import Vuex from 'vuex'
import authentication from './modules/auth'
import activity from './modules/activity'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    authentication,
    activity
  }
})
