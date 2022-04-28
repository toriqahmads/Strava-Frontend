import axios from 'axios'

let endpoint = process.env.VUE_APP_ENDPOINT_API
endpoint += process.env.VUE_APP_API_VERSION ? `/${process.env.VUE_APP_API_VERSION}` : ''

const getActivity = async(params) => {
  try {
    const jwt_token = localStorage.getItem('jwt_token')

    if (!jwt_token || jwt_token === '') {
      throw new Error(`user not logged in`)
    }

    const activities = await axios.get(`${endpoint}/activities`, {
      params,
      headers: {
        Authorization: jwt_token
      }
    })

    return Promise.resolve(activities.data.response)
  } catch (err) {
    return Promise.reject(err)
  }
}

const getActivityById = async(id) => {
  try {
    const jwt_token = localStorage.getItem('jwt_token')

    if (!jwt_token || jwt_token === '') {
      throw new Error(`user not logged in`)
    }

    const activities = await axios.get(`${endpoint}/activities/${id}`, {
      headers: {
        Authorization: jwt_token
      }
    })

    return Promise.resolve(activities.data.response)
  } catch (err) {
    return Promise.reject(err)
  }
}

export {
  getActivity,
  getActivityById
}
