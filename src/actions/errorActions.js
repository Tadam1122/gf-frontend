import { SET_ERROR, CLEAR_ERROR } from './types'

export const setError = (errors) => (dispatch) => {
  dispatch({
    type: SET_ERROR,
    payload: errors,
  })
}
export const clearError = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  })
}
