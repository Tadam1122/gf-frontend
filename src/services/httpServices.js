import axios from 'axios'

export function http() {
  return axios.create({
    baseURL: '/api',
    headers: {
      authorization: localStorage.getItem('token'),
    },
  })
}
