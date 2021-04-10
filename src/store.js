import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducers'

const initialState = {}

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['productsRed', 'wishlistRed'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleware = [thunk]

const store = createStore(
  persistedReducer,
  initialState,
  compose(applyMiddleware(...middleware))
)
export const persistor = persistStore(store)

export default store
