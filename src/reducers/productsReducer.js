/* eslint-disable import/no-anonymous-default-export */
import { FETCH_PRODUCTS, FIND_PRODUCTS } from '../actions/types'

const initialState = {
  products: [],
  product: {},
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
    default:
      return state
  }
}