import { combineReducers } from 'redux'
import productsReducer from './productsReducer'
import userReducer from './userReducer'
import errorReducer from './errorReducer'
import successReducer from './successReducer'
import wishlistReducer from './wishlistReducer'
import filtersReducer from './filtersReducer'

export default combineReducers({
  productsRed: productsReducer,
  userRed: userReducer,
  errorsRed: errorReducer,
  successRed: successReducer,
  wishlistRed: wishlistReducer,
  filtersRed: filtersReducer,
})
