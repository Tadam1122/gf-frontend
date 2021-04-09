import {
  AUTH_USER,
  LOGOUT_USER,
  UPDATE_USER,
  SET_ERROR,
  CLEAR_ERROR,
  CLEAR_SUCCESS,
} from './types'
import { setSuccess } from './successActions'
import {
  login,
  logout,
  getUser,
  register,
  getUserId,
} from '../services/authServices'
import { update } from '../services/userServices'

export const loginUser = (user, history) => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR })
  const authErr = await login(user)
  if (!authErr) {
    let user = getUser()
    dispatch({
      type: AUTH_USER,
      payload: user,
    })
    history.push('/')
  } else {
    let newErrors = []
    for (let error of authErr.data.message.split('/')) {
      if (error.length > 1) newErrors.push({ message: `${error}` })
    }
    dispatch({
      type: SET_ERROR,
      payload: newErrors,
    })
  }
}

export const logoutUser = () => (dispatch) => {
  logout()
  dispatch({ type: LOGOUT_USER })
}

export const registerUser = (user, history) => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR })
  const reg = await register(user)
  if (reg.status < 200 || reg.status > 300) {
    let newErrors = []
    for (let error of reg.data.message.split('/')) {
      if (error.length > 1) newErrors.push({ message: `${error}` })
    }
    dispatch({
      type: SET_ERROR,
      payload: newErrors,
    })
  } else {
    dispatch(
      loginUser({ username: user.username, password: user.password }, history)
    )
  }
}

export const updateUser = (
  wishlists,
  username = '',
  password = '',
  email = ''
) => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR })
  dispatch({ type: CLEAR_SUCCESS })
  // get parameters to update
  let user = {
    id: getUserId(),
    wishlists: wishlists,
  }
  if (username !== '') {
    user.username = username
  }
  if (password !== '') {
    user.password = password
  }
  if (email !== '') {
    user.email = email
  }

  const updatedErr = await update(user)

  if (updatedErr) {
    let newErrors = []
    for (let error of updatedErr.data.message.split('/')) {
      if (error.length > 1) newErrors.push({ message: `${error}` })
    }
    dispatch({
      type: SET_ERROR,
      payload: newErrors,
    })
  } else {
    let updatedUser = getUser()
    dispatch({
      type: UPDATE_USER,
      payload: updatedUser,
    })
    dispatch(setSuccess('User update successful'))
  }
}
