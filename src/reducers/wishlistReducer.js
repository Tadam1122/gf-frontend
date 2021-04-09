/* eslint-disable import/no-anonymous-default-export */
import {
  FETCH_WISHLIST_PRODUCTS,
  UPDATE_WISHLIST_PRODUCTS,
} from '../actions/types'

const initialState = {
  products: {},
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_WISHLIST_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      }
    case UPDATE_WISHLIST_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      }
    default:
      return state
  }
}
