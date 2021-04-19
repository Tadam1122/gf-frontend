import { http } from './httpServices'
import jwt from 'jsonwebtoken'

// set browser token
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

//set state of app on logout
export function logout() {
  localStorage.clear()
}

export function setToken(token) {
  localStorage.setItem('token', token)
}

export function getToken() {
  return localStorage.getItem('token')
}

export function getUserId() {
  const token = decodeToken()
  if (!token) {
    return null
  }
  return token.user.id
}

export function getUser() {
  const token = decodeToken()
  if (!token) {
    return null
  }
  return token.user
}

function decodeToken() {
  const token = getToken()
  if (!token) {
    return null
  }
  return jwt.decode(token)
}
