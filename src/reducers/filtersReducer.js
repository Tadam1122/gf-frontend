/* eslint-disable import/no-anonymous-default-export */
import {
  SET_FILTERS,
  SET_ACTIVE_FILTERS,
  SET_ACTIVE_RADIO,
  CLEAR_FILTERS,
  SET_MAX,
  SET_MIN,
  SET_PRICE,
  CLEAR_PRICE,
} from '../actions/types'

const initialState = {
  filters: [],
  activeFilters: [],
  activeRadio: [],
  activePrice: [],
  maxPrice: '',
  minPrice: '',
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FILTERS:
      return {
        ...state,
        filters: action.payload,
      }
    case SET_ACTIVE_FILTERS:
      return {
        ...state,
        activeFilters: action.payload,
      }
    case SET_ACTIVE_RADIO:
      return {
        ...state,
        activeRadio: action.payload,
      }
    case SET_MAX:
      return {
        ...state,
        maxPrice: action.payload,
      }
    case SET_MIN:
      return {
        ...state,
        minPrice: action.payload,
      }
    case SET_PRICE:
      return {
        ...state,
        activePrice: action.payload,
      }
    case CLEAR_PRICE:
      return {
        ...state,
        activePrice: [],
      }
    case CLEAR_FILTERS:
      return {
        filters: [],
        activeFilters: [],
        activeRadio: [],
        activePrice: [],
        maxPrice: '',
        minPrice: '',
      }
    default:
      return state
  }
}
