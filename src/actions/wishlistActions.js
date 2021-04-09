import { FETCH_WISHLIST_PRODUCTS, UPDATE_WISHLIST_PRODUCTS } from './types'
import { getProductById } from '../services/productServices'
import { capitalize } from '../utilities/stringUtils'

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

export const updateWishlistProducts = (products) => (dispatch) => {
  dispatch({
    type: UPDATE_WISHLIST_PRODUCTS,
    payload: products,
  })
}
