import axios from 'axios'

const url =
  process.env.MONGO_USER && process.env.MONGO_PASS
    ? '/api'
    : 'http://localhost:8000/api'

//TODO: swap baseURL to env var in production '/api'
export function http() {
  return axios.create({
    baseURL: url,
    headers: {
      authorization: localStorage.getItem('token'),
    },
  })
}
