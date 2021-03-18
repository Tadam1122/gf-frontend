export function getLowestPrice(stores) {
  return `$${Math.min(
    ...stores.map((store) => Number(store.price.split('$')[1]))
  )}`
}

export function getLowestNumber(stores) {
  return Math.min(...stores.map((store) => Number(store.price.split('$')[1])))
}
