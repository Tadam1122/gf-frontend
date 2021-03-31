import { getLowestNumber } from '../../../utilities/priceUtil'

// TODO: string count not sorting properly
export function sortData(data, order, prop) {
  // price and name specific cases
  if (prop === 'price') {
    if (order === 'asc') {
      return data.sort((a, b) =>
        getLowestNumber(a.prices) > getLowestNumber(b.prices) ? 1 : -1
      )
    }
    return data.sort((a, b) =>
      getLowestNumber(a.prices) < getLowestNumber(b.prices) ? 1 : -1
    )
  }
  if (prop === 'name') {
    if (order === 'asc') {
      return data.sort((a, b) =>
        `${a.brand} ${a.model}` > `${b.brand} ${b.model}` ? 1 : -1
      )
    }
    return data.sort((a, b) =>
      `${a.brand} ${a.model}` < `${b.brand} ${b.model}` ? 1 : -1
    )
  }
  if (order === 'asc') {
    return data.sort((a, b) => (a[prop] > b[prop] ? 1 : -1))
  }
  return data.sort((a, b) => (a[prop] < b[prop] ? 1 : -1))
}
