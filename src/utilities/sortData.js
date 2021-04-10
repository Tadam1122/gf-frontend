import { getLowestNumber } from './priceUtils'

export function sortData(data, order, prop) {
  // price
  if (prop === 'price') {
    if (order === 'asc') {
      return data.sort(
        (a, b) => getLowestNumber(a.prices) - getLowestNumber(b.prices)
      )
    }
    return data.sort(
      (a, b) => getLowestNumber(b.prices) - getLowestNumber(a.prices)
    )
  }
  // sort name
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
  // sort string count
  if (prop === 'stringCount') {
    if (order === 'asc') {
      return data.sort((a, b) => Number(a.stringCount) - Number(b.stringCount))
    }
    return data.sort((a, b) => Number(b.stringCount) - Number(a.stringCount))
  }
  if (order === 'asc') {
    return data.sort((a, b) => (a[prop] > b[prop] ? 1 : -1))
  }
  return data.sort((a, b) => (a[prop] < b[prop] ? 1 : -1))
}
