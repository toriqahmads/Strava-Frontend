import axios from 'axios'

let endpoint = process.env.VUE_APP_ENDPOINT_API
endpoint += process.env.VUE_APP_API_VERSION ? `/${process.env.VUE_APP_API_VERSION}` : ''

const getLoginUri = async() => {
  try {
    const login = await axios.get(`${endpoint}/auth/stravalogin`)

    return Promise.resolve(login.data.response.uri)
  } catch (err) {
    return Promise.reject(err)
  }
}

const login = async(code) => {
  try {
    const login = await axios.post(`${endpoint}/auth/login`, {
      code
    })

    return Promise.resolve(login.data.response)
  } catch (err) {
    return Promise.reject(err)
  }
}

const logout = async() => {
  try {
    const jwt_token = localStorage.getItem('jwt_token')

    if (!jwt_token || jwt_token === '') {
      return Promise.resolve()
    }

    await axios.get(`${endpoint}/auth/logout`, {
      headers: {
        Authorization: jwt_token
      }
    })

    return Promise.resolve()
  } catch (err) {
    return Promise.resolve()
  }
}

export {
  getLoginUri,
  login,
  logout
}
