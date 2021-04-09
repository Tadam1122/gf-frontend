import { FETCH_PRODUCTS, FIND_PRODUCTS } from './types'
import { getProducts, findProducts } from '../services/productServices'

export const fetchProducts = (table) => async (dispatch) => {
  let products = ''
  if (
    table === 'electric-guitars' ||
    table === 'acoustic-guitars' ||
    table === 'acoustic-amps' ||
    table === 'electric-amps' ||
    table === 'effect-pedals'
  ) {
    const res = await getProducts(table)
    products = await res.data
    dispatch({
      type: FETCH_PRODUCTS,
      payload: products,
    })
  }
}

export const searchProducts = (searchText) => async (dispatch) => {
  const res = await findProducts(searchText)
  const productsFound = await res.data
  dispatch({
    type: FIND_PRODUCTS,
    payload: productsFound,
  })
}
