import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { fetchProducts, filterProducts } from '../../actions/productActions'
import {
  getFilters,
  setActiveChecked,
  setActiveRadio,
  setPriceChange,
} from '../../actions/filterActions'
import {
  CLEAR_PRICE,
  SET_MAX,
  SET_MIN,
  CLEAR_FILTERS,
} from '../../actions/types'
import { Grid, Grow } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ProductTable from './BrowseTable/ProductTable'
import Sidebar from './BrowseSidebar/Sidebar'
import { capitalize } from '../../utilities/stringUtils'

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

  //product values
  const products = useSelector((state) => state.productsRed.products)
  const filteredProducts = useSelector(
    (state) => state.productsRed.filteredProducts
  )

  //filter values
  const activeFilters = useSelector((state) => state.filtersRed.activeFilters)
  const activeRadio = useSelector((state) => state.filtersRed.activeRadio)

  //price filters
  const maxPrice = useSelector((state) => state.filtersRed.maxPrice)
  const minPrice = useSelector((state) => state.filtersRed.minPrice)

  const dispatch = useDispatch()

  //table name and categories
  const tableName = location.pathname.split('/')[2]
  const category = `${capitalize(tableName.split('-')[0])} ${capitalize(
    tableName.split('-')[1]
  )}`

  //sorting and rows per page state
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)

  //fetch new products when table name changes
  useEffect(() => {
    function getProducts() {
      dispatch({ type: CLEAR_FILTERS })
      dispatch(fetchProducts(tableName))
    }
    getProducts()
  }, [tableName, dispatch])

  //create initial filter objects
  useEffect(() => {
    function updateFilters() {
      dispatch({ type: CLEAR_FILTERS })
      dispatch(getFilters(products, tableName))
    }
    updateFilters()
  }, [products, tableName, dispatch])

  //update products with filters
  useEffect(() => {
    dispatch(
      filterProducts(activeFilters, activeRadio, products, minPrice, maxPrice)
    )
    setPage(0)
  }, [activeFilters, activeRadio, products, minPrice, maxPrice, dispatch])

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  function handleChangePage(_, newPage) {
    setPage(newPage)
  }

  //update values of checkbox filter selections
  function handleActiveChecked(value, filterName) {
    dispatch(setActiveChecked(value, filterName, activeFilters))
  }

  //update values of radio filter selections
  function handleRadioSelect(value, filterName) {
    dispatch(setActiveRadio(value, filterName, activeRadio))
  }

  function handlePriceChange(min, max) {
    dispatch(setPriceChange(min, max))
  }

  function handleClearPrice() {
    dispatch({ type: CLEAR_PRICE })
    dispatch({ type: SET_MAX, payload: '' })
    dispatch({ type: SET_MIN, payload: '' })
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
                ? filteredProducts.length > 0 ||
                  activeFilters.length > 0 ||
                  activeRadio.length > 0
                  ? filteredProducts
                  : products
                : []
            }
            category={category}
            rowsPerPage={rowsPerPage}
            page={page}
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
