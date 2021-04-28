import { http } from './httpServices'
import { setToken } from './authServices'

// update token with new user data
export function update(user) {
  return http()
    .put(`/user`, user)
    .then((res) => {
      if (res) {
        setToken(res.data.token)
      }
    })
    .catch(function (error) {
      if (error.response) {
        return error.response
      }
    })
}

export function resendConfirm(user) {
  return http()
    .post('/confirm', user)
    .catch(function (error) {
      if (error.response) {
        return error.response
      }
    })
}

//set token if successful
export async function login(user) {
  return http()
    .post('/auth', user)
    .then((res) => {
      if (res) {
        setToken(res.data.token)
      }
    })
    .catch(function (error) {
      if (error.response) {
        return error.response
      }
    })
}

// create new user
export function register(user) {
  return http()
    .post('/register', user)
    .catch(function (error) {
      if (error.response) {
        return error.response
      }
    })
}
