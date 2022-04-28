import { getActivity, getActivityById } from '@/apis/activity'

const activity = {
  namespaced: true,
  state: () => ({
    activities: [],
    activity: '',
    error: ''
  }),
  getters: {
    activities: (state) => state.activities,
    activity: (state) => state.activity,
    error: (state) => state.error
  },
  mutations: {
    setActivities(state, activities) {
      state.activities = activities
    },
    setActivity(state, activity) {
      state.activity = activity
    },
    setError(state, error) {
      state.error = error
    },
    reset(state) {
      state.activities = []
      state.activity = ''
      state.error = ''
    }
  },
  actions: {
    async getActivities({ commit }, payload) {
      try {
        const activities = await getActivity(payload)
        commit('setActivities', activities)
      } catch(err) {
        commit('setError', err.message)
      }
    },
    async getActivityById({ commit }, id) {
      try {
        const activity = await getActivityById(id)
        commit('setActivity', activity)
      } catch(err) {
        commit('setError', err.message)
      }
    },
    reset({ commit }) {
      commit('reset')
    }
  }
}

export default activity
