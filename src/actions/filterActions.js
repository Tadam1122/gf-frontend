import {
  SET_FILTERS,
  SET_ACTIVE_FILTERS,
  SET_ACTIVE_RADIO,
  SET_MIN,
  SET_MAX,
  SET_PRICE,
  CLEAR_PRICE,
} from './types'
import { formatFilters, lowercase } from '../utilities/stringUtils'

export const getFilters = (products, tableName) => (dispatch) => {
  //array for filters to display on page
  let defaultFilters = []

  for (let product of products) {
    for (let attribute in product) {
      // ignore attributes that wont contain checkboxes
      if (
        attribute !== '_id' &&
        attribute !== 'prices' &&
        attribute !== 'image' &&
        attribute !== 'category' &&
        attribute !== 'model' &&
        attribute !== 'inStock' &&
        attribute !== 'coilSplit' &&
        attribute !== 'coilTap' &&
        attribute !== 'leftHanded' &&
        attribute !== 'pickguard' &&
        attribute !== 'electronics' &&
        attribute !== 'reverb' &&
        attribute !== 'fxLoop'
      ) {
        let filterIndex = defaultFilters.findIndex(
          (item) => item.filterName === attribute
        )
        //create new filter from attribute name
        if (filterIndex === -1) {
          let filter = {}
          filter.filterName = attribute
          filter.values = [product[attribute]]
          defaultFilters.push(filter)
        }

        //add new product value in filter
        else if (
          !defaultFilters[filterIndex].values.some(
            (item) => item === product[attribute]
          )
        ) {
          defaultFilters[filterIndex].values.push(product[attribute])
        }
      }
    }

    // set radio filters for each product if no tablename provided
    if (!tableName) {
      defaultFilters = setSearchRadios(product, defaultFilters)
    }
  }

  // set radio filters for table
  if (tableName) {
    defaultFilters = setBrowseRadios(tableName, defaultFilters)
  }

  // sort and format filters
  defaultFilters = defaultFilters.sort((a, b) =>
    a.filterName > b.filterName ? 1 : -1
  )
  defaultFilters = formatFilters(defaultFilters)

  //manually set default radio filters to top of filters
  defaultFilters.unshift({ filterName: 'Price', values: ['', ''] })
  defaultFilters.unshift({ filterName: 'In Stock', values: [true] })

  dispatch({
    type: SET_FILTERS,
    payload: defaultFilters,
  })
}

export const setActiveChecked = (value, filterName, activeFilters) => (
  dispatch
) => {
  //format filterName for activeFilters
  filterName = lowercase(filterName.replace(/ /g, ''))

  //found filter object
  let found = activeFilters.find((filter) => filter.name === filterName)

  if (found) {
    let index = found.values.indexOf(value)
    //value not found, add it
    if (index < 0) {
      found.values.push(value)
    }
    //remove found value
    else {
      found.values.splice(index, 1)
    }
    //update active filters
    let updatedFilters = activeFilters.filter(
      (filter) => filter.name !== filterName
    )
    //re-add found entry if values isn't empty after splice
    if (found.values.length > 0) {
      updatedFilters.push(found)
    }
    dispatch({
      type: SET_ACTIVE_FILTERS,
      payload: updatedFilters,
    })
  }
  //filterName not found, add it and its value
  else {
    let updatedFilters = [...activeFilters]
    updatedFilters.push({ name: filterName, values: [value] })
    dispatch({
      type: SET_ACTIVE_FILTERS,
      payload: updatedFilters,
    })
  }
}

export const setActiveRadio = (value, filterName, activeRadio) => (
  dispatch
) => {
  //normalize filtername
  filterName = lowercase(filterName.replace(/ /g, ''))

  let found = activeRadio.find((item) => item.name === filterName)

  if (found) {
    let updatedRadio = activeRadio.filter((item) => item.name !== filterName)
    //remove filter object from state
    if (found.value === value) {
      dispatch({
        type: SET_ACTIVE_RADIO,
        payload: updatedRadio,
      })
    }
    //new value found for filter object, update it
    else {
      found.value = value
      updatedRadio.push(found)
      dispatch({
        type: SET_ACTIVE_RADIO,
        payload: updatedRadio,
      })
    }
  }
  //filter object not found, add it
  else {
    dispatch({
      type: SET_ACTIVE_RADIO,
      payload: [...activeRadio, { name: filterName, value: value }],
    })
  }
}

export const setPriceChange = (min, max) => (dispatch) => {
  if (max >= min || !max || !min) {
    dispatch({
      type: SET_MIN,
      payload: min,
    })
    dispatch({
      type: SET_MAX,
      payload: max,
    })
    if (!min && !max) {
      dispatch({
        type: CLEAR_PRICE,
      })
    } else {
      dispatch({
        type: SET_PRICE,
        payload: [min, max],
      })
    }
  }
}

//return updated filters for a product
function setSearchRadios(product, defaultFilters) {
  //check the product's category and include needed radio filters
  if (product.category === 'electric-guitars') {
    // check to see if radio filters already inserted
    if (
      defaultFilters.map((filter) => filter.filterName).indexOf('coilSplit') ===
      -1
    ) {
      defaultFilters.push({ filterName: 'coilSplit', values: [true] })
      defaultFilters.push({ filterName: 'coilTap', values: [true] })
    }
  }

  if (product.category === 'acoustic-guitars') {
    if (
      defaultFilters
        .map((filter) => filter.filterName)
        .indexOf('electronics') === -1
    ) {
      defaultFilters.push({ filterName: 'electronics', values: [true] })
    }
  }

  if (
    product.category === 'electric-guitars' ||
    product.category === 'acoustic-guitars'
  ) {
    if (
      defaultFilters
        .map((filter) => filter.filterName)
        .indexOf('leftHanded') === -1
    ) {
      defaultFilters.push({ filterName: 'leftHanded', values: [true] })
    }

    if (
      defaultFilters.map((filter) => filter.filterName).indexOf('pickguard') ===
      -1
    ) {
      defaultFilters.push({ filterName: 'pickguard', values: [true] })
    }
  }

  if (
    product.category === 'acoustic-amps' ||
    product.category === 'electric-amps'
  ) {
    if (
      defaultFilters.map((filter) => filter.filterName).indexOf('reverb') === -1
    ) {
      defaultFilters.push({ filterName: 'reverb', values: [true] })
      defaultFilters.push({ filterName: 'fxLoop', values: [true] })
    }
  }
  return defaultFilters
}

function setBrowseRadios(tableName, defaultFilters) {
  //manually set radio filters depending on tablename
  if (tableName === 'electric-guitars') {
    defaultFilters.push({ filterName: 'coilSplit', values: [true] })
    defaultFilters.push({ filterName: 'coilTap', values: [true] })
    defaultFilters.push({ filterName: 'leftHanded', values: [true] })
    defaultFilters.push({ filterName: 'pickguard', values: [true] })
  }
  if (tableName === 'acoustic-guitars') {
    defaultFilters.push({ filterName: 'pickguard', values: [true] })
    defaultFilters.push({ filterName: 'electronics', values: [true] })
    defaultFilters.push({ filterName: 'leftHanded', values: [true] })
  }
  if (tableName === 'electric-amps' || tableName === 'acoustic-amps') {
    defaultFilters.push({ filterName: 'reverb', values: [true] })
    defaultFilters.push({ filterName: 'fxLoop', values: [true] })
  }
  return defaultFilters
}
