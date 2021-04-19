import { http } from './httpServices'

// return all products in a given table
export function getProducts(tableName) {
  return http().get(`/${tableName}`)
}

// return all products that match a query
export function findProducts(searchText) {
  return http().get(`/search/${searchText}`)
}

// return product given its tablename and id
export function getProductById(tableName, id) {
  return http().get(`/${tableName}/${id}`)
}
