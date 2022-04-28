import { syncActivity } from '@/apis/sync'

const sync = {
  namespaced: true,
  state: () => ({
    synced: false,
    error: ''
  }),
  getters: {
    synced: (state) => state.synced,
    error: (state) => state.error
  },
  mutations: {
    setSynced(state, synced) {
      state.synced = synced
    },
    setError(state, error) {
      state.error = error
    }
  },
  actions: {
    async sync({ commit }) {
      try {
        await syncActivity()
        commit('setSynced', true)
      } catch(err) {
        commit('setSynced', false)
        commit('setError', err.message)
      }
    }
  }
}

export default sync
