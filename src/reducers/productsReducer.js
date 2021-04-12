/* eslint-disable import/no-anonymous-default-export */
import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS,
  FIND_PRODUCTS,
} from '../actions/types'

const initialState = {
  products: [],
  filteredProducts: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      }
    case FIND_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      }
    case FILTER_PRODUCTS:
      return {
        ...state,
        filteredProducts: action.payload,
      }
    default:
      return state
  }
}
