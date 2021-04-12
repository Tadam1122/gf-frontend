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

// TODO: sort filter values when loaded

export const getBrowseFilters = (products, tableName) => (dispatch) => {
  //array for filters to display on page
  let defaultFilters = []

  for (let product of products) {
    //get attributes to filter from
    //don't select any attributes with boolean values
    // TODO: boolean attributes for other product categories need to be manually added
    for (let attribute in product) {
      if (
        attribute !== '_id' &&
        attribute !== 'prices' &&
        attribute !== 'category' &&
        attribute !== 'image' &&
        attribute !== 'model' &&
        attribute !== 'inStock' &&
        attribute !== 'coilSplit' &&
        attribute !== 'coilTap' &&
        attribute !== 'pickguard' &&
        attribute !== 'electronics'
      ) {
        let filterIndex = defaultFilters.findIndex(
          (item) => item.filterName === attribute
        )
        //create new filter from attribute name
        if (!defaultFilters.some((item) => item.filterName === attribute)) {
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
  }
  // Format filters
  defaultFilters = formatFilters(defaultFilters)

  // TODO:default filters of other categories need to be manually added
  //manually set radio filters depending on tablename
  if (tableName === 'electric-guitars') {
    defaultFilters.push({ filterName: 'Coil Split', values: [true] })
    defaultFilters.push({ filterName: 'Coil Tap', values: [true] })
  }
  if (tableName === 'acoustic-guitars') {
    defaultFilters.push({ filterName: 'Pickguard', values: [true] })
    defaultFilters.push({ filterName: 'Electronics', values: [true] })
  }
  // add default radio filters
  defaultFilters.unshift({ filterName: 'Price', values: ['', ''] })
  defaultFilters.unshift({ filterName: 'In Stock', values: [true] })
  dispatch({
    type: SET_FILTERS,
    payload: defaultFilters,
  })
}

export const getSearchFilters = (products) => (dispatch) => {
  //array for filters to display on page
  let defaultFilters = []

  for (let product of products) {
    //get attributes to filter from
    //don't select any attributes with boolean values
    // TODO: boolean attributes for other product categories need to be manually added
    for (let attribute in product) {
      if (
        attribute !== '_id' &&
        attribute !== 'prices' &&
        attribute !== 'category' &&
        attribute !== 'image' &&
        attribute !== 'model' &&
        attribute !== 'inStock' &&
        attribute !== 'coilTap' &&
        attribute !== 'pickguard' &&
        attribute !== 'electronics' &&
        attribute !== 'coilSplit'
      ) {
        let filterIndex = defaultFilters.findIndex(
          (item) => item.filterName === attribute
        )
        //create new filter from attribute name
        if (!defaultFilters.some((item) => item.filterName === attribute)) {
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
      // TODO:default filters of other categories need to be manually added
      //check category of product and include set of radio values depending on category
      if (product.category === 'electric-guitars') {
        if (
          defaultFilters
            .map((filter) => filter.filterName)
            .indexOf('Coil Split') === -1
        ) {
          defaultFilters.push({ filterName: 'Coil Split', values: [true] })
          defaultFilters.push({ filterName: 'Coil Tap', values: [true] })
        }
      }
      if (product.category === 'acoustic-guitars') {
        if (
          defaultFilters
            .map((filter) => filter.filterName)
            .indexOf('Pickguard') === -1
        ) {
          defaultFilters.push({ filterName: 'Pickguard', values: [true] })
          defaultFilters.push({ filterName: 'Electronics', values: [true] })
        }
      }
    }
  }
  defaultFilters = formatFilters(defaultFilters)

  //manually set default radio filters
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
