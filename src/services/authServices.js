import jwt from 'jsonwebtoken'

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
