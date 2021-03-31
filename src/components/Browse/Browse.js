import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Grid, Grow } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ProductTable from './BrowseTable/ProductTable'
import Sidebar from './BrowseSidebar/Sidebar'
import { capitalize, lowercase } from '../../utilities/stringUtils'
import { getLowestNumber, getLowestPrice } from '../../utilities/priceUtil'

async function fetchProducts(table) {
  let data = ''
  if (table === 'electric-guitars') {
    const res = await fetch('http://localhost:8000/api/electric-guitars')
    data = await res.json()
  }
  if (table === 'acoustic-guitars') {
    const res = await fetch('http://localhost:8000/api/acoustic-guitars')
    data = await res.json()
  }
  if (table === 'acoustic-amps') {
    const res = await fetch('http://localhost:8000/api/acoustic-amps')
    data = await res.json()
  }
  if (table === 'electric-amps') {
    const res = await fetch('http://localhost:8000/api/electric-amps')
    data = await res.json()
  }
  if (table === 'effect-pedals') {
    const res = await fetch('http://localhost:8000/api/effect-pedals')
    data = await res.json()
  }
  return data
}

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

  //product state
  const [products, setProducts] = useState([])
  const [filterProducts, setFilterProducts] = useState([])

  //sorting and rows per page state
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)

  //filter value state
  const [activeFilters, setCheckActive] = useState([])
  const [activeRadio, setRadioActive] = useState([])
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  //product filters
  const [filters, setFilters] = useState([])

  // price filters

  //table name and categories
  const tableName = location.pathname.split('/')[2]
  const category = `${capitalize(tableName.split('-')[0])} ${capitalize(
    tableName.split('-')[1]
  )}`

  //fetch new products when tablename changes
  useEffect(() => {
    async function getProducts() {
      const resProducts = await fetchProducts(tableName)
      setProducts(resProducts)
    }
    getProducts()
  }, [tableName])

  //create initial filter objects
  useEffect(() => {
    function getFilters(products) {
      //array for filters to display on page
      let defaultFilters = []
      for (let product of products) {
        //get attributes to filter from
        //don't select any attributes with boolean values
        for (let attribute in product) {
          if (
            attribute !== '_id' &&
            attribute !== 'prices' &&
            attribute !== 'image' &&
            attribute !== 'model' &&
            attribute !== 'inStock' &&
            attribute !== 'coilTap' &&
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
      defaultFilters.map(
        (item) =>
          (item.filterName = capitalize(
            item.filterName.replace(/([A-Z])/g, ' $1')
          ))
      )

      //manually set boolean filters depending on tablename
      if (tableName === 'electric-guitars') {
        defaultFilters.push({ filterName: 'Coil Split', values: [true] })
        defaultFilters.push({ filterName: 'Coil Tap', values: [true] })
      }
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

      // TODO: filter max and min prices

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
    let found = activeFilters.find((item) => item.name === filterName)

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
        (item) => item.name !== filterName
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
    setMinPrice(min)
    setMaxPrice(max)
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
        <Grid item sm={3} md={3} lg={2} xl={2}>
          <Sidebar
            filters={filters}
            activeFilters={activeFilters}
            activeRadio={activeRadio}
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
        <Grid item xs={12} sm={9} md={9} lg={10} xl={10}>
          <ProductTable
            products={
              filterProducts.length > 0 ||
              activeFilters.length > 0 ||
              activeRadio.length > 0
                ? filterProducts
                : products
            }
            category={category}
            rowsPerPage={rowsPerPage}
            page={page}
            activeFilters={activeFilters}
            activeRadio={activeRadio}
            handleActiveChecked={handleActiveChecked}
            handleRadioSelect={handleRadioSelect}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={handleChangePage}
          />
        </Grid>
      </Grow>
    </Grid>
  )
}

export default Browse
