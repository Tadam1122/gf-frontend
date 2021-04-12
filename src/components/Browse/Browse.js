import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../../actions/productActions'
import { useLocation } from 'react-router-dom'
import { Grid, Grow } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ProductTable from './BrowseTable/ProductTable'
import Sidebar from './BrowseSidebar/Sidebar'
import {
  capitalize,
  lowercase,
  formatFilters,
} from '../../utilities/stringUtils'
import { getLowestNumber } from '../../utilities/priceUtils'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '97%',
    margin: 'auto',
    marginTop: '.5rem',
    flexGrow: 1,
  },
}))

function Browse() {
  const classes = useStyles()
  const location = useLocation()

  const products = useSelector((state) => state.productsRed.products)
  const dispatch = useDispatch()

  //table name and categories
  const tableName = location.pathname.split('/')[2]
  const category = `${capitalize(tableName.split('-')[0])} ${capitalize(
    tableName.split('-')[1]
  )}`

  //product state
  const [filterProducts, setFilterProducts] = useState([])

  //sorting and rows per page state
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)

  //filter value state
  const [activeFilters, setCheckActive] = useState([])
  const [activeRadio, setRadioActive] = useState([])
  const [activePrice, setPriceActive] = useState([])

  // price filters
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  //product filters
  const [filters, setFilters] = useState([])

  //fetch new products when table name changes
  useEffect(() => {
    function getProducts() {
      dispatch(fetchProducts(tableName))
    }
    getProducts()
  }, [tableName, dispatch])

  //create initial filter objects
  useEffect(() => {
    function getFilters(products) {
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
      setFilters(defaultFilters)
    }
    getFilters(products)
  }, [products, tableName])

  //update products with filters
  useEffect(() => {
    function filterProducts() {
      //update filter values
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

      setFilterProducts(filtered)
      setPage(0)
    }
    filterProducts()
  }, [activeFilters, activeRadio, products, minPrice, maxPrice])

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  function handleChangePage(_, newPage) {
    setPage(newPage)
  }

  //update values of checkbox filter selections
  function handleActiveChecked(value, filterName) {
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
      setCheckActive(updatedFilters)
    }
    //filterName not found, add it and its value
    else {
      let updatedFilters = [...activeFilters]
      updatedFilters.push({ name: filterName, values: [value] })
      setCheckActive(updatedFilters)
    }
  }

  //update values of radio filter selections
  function handleRadioSelect(value, filterName) {
    //normalize filtername
    filterName = lowercase(filterName.replace(/ /g, ''))

    let found = activeRadio.find((item) => item.name === filterName)

    if (found) {
      let updatedRadio = activeRadio.filter((item) => item.name !== filterName)
      //remove filter object from state
      if (found.value === value) {
        setRadioActive(updatedRadio)
      }
      //new value found for filter object, update it
      else {
        found.value = value
        updatedRadio.push(found)
        setRadioActive(updatedRadio)
      }
    }
    //filter object not found, add it
    else {
      setRadioActive([...activeRadio, { name: filterName, value: value }])
    }
  }

  function handlePriceChange(min, max) {
    if (max >= min || !max || !min) {
      setMinPrice(min)
      setMaxPrice(max)
      if (!min && !max) {
        setPriceActive([])
      } else {
        setPriceActive([min, max])
      }
    }
  }

  function handleClearPrice() {
    setMinPrice('')
    setMaxPrice('')
    setPriceActive([])
  }

  return (
    <Grid
      container
      direction='row'
      justify='center'
      alignItems='stretch'
      spacing={1}
      className={classes.root}
    >
      <Grow in={true}>
        <Grid item xs={12} sm={5} md={3} lg={2} xl={2}>
          <Sidebar
            filters={filters}
            activeFilters={activeFilters}
            activeRadio={activeRadio}
            activePrice={activePrice}
            handleActiveChecked={handleActiveChecked}
            handleRadioSelect={handleRadioSelect}
            handlePriceChange={handlePriceChange}
            rowsPerPage={rowsPerPage}
          />
        </Grid>
      </Grow>
      <Grow
        in={true}
        style={{ transformOrigin: '0 0 0' }}
        {...{ timeout: 1000 }}
      >
        <Grid item xs={12} sm={7} md={9} lg={10} xl={10}>
          <ProductTable
            products={
              products.length > 0
                ? filterProducts.length > 0 ||
                  activeFilters.length > 0 ||
                  activeRadio.length > 0
                  ? filterProducts
                  : products
                : []
            }
            category={category}
            rowsPerPage={rowsPerPage}
            page={page}
            activeFilters={activeFilters}
            activeRadio={activeRadio}
            activePrice={activePrice}
            handleActiveChecked={handleActiveChecked}
            handleRadioSelect={handleRadioSelect}
            handleClearPrice={handleClearPrice}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={handleChangePage}
          />
        </Grid>
      </Grow>
    </Grid>
  )
}

export default Browse
