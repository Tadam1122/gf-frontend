import { combineReducers } from 'redux'
import userReducer from '../features/users/usersSlice'

const rootReducer = combineReducers({
  users: userReducer,
})

export default rootReducer
