/* eslint-disable import/no-anonymous-default-export */
import { SET_ERROR, CLEAR_ERROR } from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        errors: action.payload,
      }
    case CLEAR_ERROR:
      return {}
    default:
      return state
  }
}
