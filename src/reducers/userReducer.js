/* eslint-disable import/no-anonymous-default-export */
import { AUTH_USER, LOGOUT_USER, UPDATE_USER } from '../actions/types'
import { getUser } from '../services/authServices'

let user = getUser()
const initialState = user
  ? {
      loggedIn: true,
      user,
    }
  : {}

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        user: action.payload,
      }
    case LOGOUT_USER:
      return {}
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      }
    default:
      return state
  }
}
