import axios from 'axios'

//TODO: swap baseURL to env var in production '/api'
export function http() {
  return axios.create({
    baseURL: '/api',
    headers: {
      authorization: localStorage.getItem('token'),
    },
  })
}
