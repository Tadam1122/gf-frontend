import { FETCH_PRODUCTS, FETCH_WISHLIST_PRODUCTS, FIND_PRODUCTS } from './types'
import {
  getProducts,
  findProducts,
  getProductById,
} from '../services/productServices'
import { capitalize } from '../utilities/stringUtils'

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

//fetches list of products given their ids and table names
export const fetchWishlistProducts = (products) => async (dispatch) => {
  let productsFound = []
  for (let product of products) {
    let res = await getProductById(product.tablename, product.id)
    let data = await res.data
    data.category = `${capitalize(
      product.tablename.split('-')[0]
    )} ${capitalize(product.tablename.split('-')[1])}`
    productsFound.push(data)
  }
  dispatch({
    type: FETCH_WISHLIST_PRODUCTS,
    payload: productsFound,
  })
}
