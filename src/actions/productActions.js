import { FETCH_PRODUCTS, FIND_PRODUCTS, FILTER_PRODUCTS } from './types'
import { getProducts, findProducts } from '../services/productServices'
import { getLowestNumber } from '../utilities/priceUtils'

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

export const filterProducts = (
  activeFilters,
  activeRadio,
  products,
  minPrice,
  maxPrice
) => (dispatch) => {
  //update radio filter values
  let useRadioFilters = activeRadio.map((filter) =>
    filter.value === 'yes'
      ? { ...filter, value: true }
      : { ...filter, value: false }
  )

  //only use check filters whose values are not empty
  let useCheckFilters = activeFilters.filter(
    (filter) => filter.values.length > 0
  )

  //filter selections from products
  let filtered = products.filter((product) => {
    for (let filter of useCheckFilters) {
      let index = filter.values.indexOf(product[filter.name])
      if (index < 0) return false
    }
    return true
  })

  //filter radio selections from products
  if (useRadioFilters) {
    filtered = filtered.filter((product) => {
      for (let filter of useRadioFilters) {
        if (product[filter.name] !== filter.value) return false
      }
      return true
    })
  }

  //filter prices if set
  if (maxPrice) {
    filtered = filtered.filter(
      (product) => getLowestNumber(product.prices) <= maxPrice
    )
  }
  if (minPrice) {
    filtered = filtered.filter(
      (product) => getLowestNumber(product.prices) >= minPrice
    )
  }
  dispatch({
    type: FILTER_PRODUCTS,
    payload: filtered,
  })
}
