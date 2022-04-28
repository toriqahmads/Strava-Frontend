import { getLoginUri, login, logout } from '@/apis/auth'

const authentication = {
  namespaced: true,
  state: () => ({
    login_uri: '',
    jwt_token: '',
    refresh_token: '',
    athlete: '',
    logged_in: false,
    error: ''
  }),
  getters: {
    login_uri: (state) => state.login_uri,
    jwt_token: (state) => state.jwt_token,
    refresh_token: (state) => state.refresh_token,
    athlete: (state) => state.athlete,
    error: (state) => state.error,
    logged_in: (state) => state.logged_in
  },
  mutations: {
    setLoginUri(state, login_uri) {
      state.login_uri = login_uri
    },
    setJwtToken(state, jwt_token) {
      state.jwt_token = jwt_token
    },
    setRefreshToken(state, refresh_token) {
      state.refresh_token = refresh_token
    },
    setAthlete(state, athlete) {
      state.athlete = athlete
    },
    setError(state, error) {
      state.error = error
    },
    setLoggedIn(state, logged_in) {
      state.logged_in = logged_in
    }
  },
  actions: {
    async getLoginUri({ commit }) {
      try {
        const login_uri = await getLoginUri()
        commit('setLoginUri', login_uri)
      } catch(err) {
        commit('setError', err.message)
      }
    },
    async login({ commit }, code) {
      try {
        const response = await login(code)

        commit('setAthlete', response.athlete)
        commit('setJwtToken', response.authentication.jwt_token)
        commit('setRefreshToken', response.authentication.refresh_token)
        commit('setLoggedIn', true)

        localStorage.setItem('athlete', JSON.stringify(response.athlete))
        localStorage.setItem('jwt_token', response.authentication.jwt_token)
        localStorage.setItem('refresh_token', response.authentication.refresh_token)
      } catch (err) {
        commit('setError', err.message)
      }
    },
    async checkIsLoggedIn({ commit }) {
      try {
        const getAthlete = localStorage.getItem('athlete')
        const jwt_token = localStorage.getItem('jwt_token')
        const refresh_token = localStorage.getItem('refresh_token')

        if ((getAthlete && getAthlete !== '')
          && (jwt_token && jwt_token !== '')
          && (refresh_token && refresh_token !== '')) {
          commit('setAthlete', JSON.parse(getAthlete))
          commit('setJwtToken', jwt_token)
          commit('setRefreshToken', refresh_token)

          commit('setLoggedIn', true)
        }
      } catch (err) {
        commit('setError', err.message)
      }
    },
    async logout({ commit, dispatch }) {
      try {
        await logout()

        commit('setAthlete', '')
        commit('setJwtToken', '')
        commit('setRefreshToken', '')
        commit('setLoggedIn', false)

        localStorage.removeItem('athlete')
        localStorage.removeItem('jwt_token')
        localStorage.removeItem('refresh_token')

        dispatch('activity/reset', null, { root: true })
      } catch (err) {
        commit('setAthlete', '')
        commit('setJwtToken', '')
        commit('setRefreshToken', '')
        commit('setLoggedIn', false)

        localStorage.removeItem('athlete')
        localStorage.removeItem('jwt_token')
        localStorage.removeItem('refresh_token')

        dispatch('activity/reset', null, { root: true })
      }
    }
  }
}

export default authentication
