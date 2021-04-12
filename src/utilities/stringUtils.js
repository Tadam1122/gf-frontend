export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function lowercase(str) {
  return str.charAt(0).toLowerCase() + str.slice(1)
}

//format filter names and sort filter values
export function formatFilters(filters) {
  return filters.map((item) => {
    item.filterName = capitalize(item.filterName.replace(/([A-Z])/g, ' $1'))
    item.filterName = item.filterName.split(' ')
    if (item.filterName[1] === 'Config') {
      item.filterName[1] = 'Configuration'
    }
    if (item.filterName[1] === 'Len') {
      item.filterName[1] = 'Length'
    }
    if (item.filterName[1] === 'Num') {
      item.filterName[1] = 'Number'
    }
    item.filterName = item.filterName.join(' ')
    item.values = item.values.sort((a, b) => (a > b ? 1 : -1))
    return item
  })
}

export function formatFilter(filter) {
  filter = capitalize(filter.replace(/([A-Z])/g, ' $1'))
  filter = filter.split(' ')
  if (filter[1] === 'Config') {
    filter[1] = 'Configuration'
  }
  if (filter[1] === 'Len') {
    filter[1] = 'Length'
  }
  if (filter[1] === 'Num') {
    filter[1] = 'Number'
  }
  filter = filter.join(' ')
  return filter
}
