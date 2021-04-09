/* eslint-disable import/no-anonymous-default-export */
import { SET_SUCCESS, CLEAR_SUCCESS } from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case SET_SUCCESS:
      return { success: action.payload }
    case CLEAR_SUCCESS:
      return {}
    default:
      return state
  }
}
