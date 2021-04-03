import { http } from './httpServices'

export function getProducts(tableName) {
  return http().get(`/${tableName}`)
}

export function findProducts(searchText) {
  return http().get(`/search/${searchText}`)
}
