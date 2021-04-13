import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Grid, Grow } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ProductTable from './BrowseTable/ProductTable'
import Sidebar from './BrowseSidebar/Sidebar'
import { searchProducts, filterProducts } from '../../actions/productActions'
import {
  CLEAR_PRICE,
  SET_MAX,
  SET_MIN,
  CLEAR_FILTERS,
} from '../../actions/types'
import {
  getSearchFilters,
  setActiveChecked,
  setActiveRadio,
  setPriceChange,
} from '../../actions/filterActions'

import { capitalize } from '../../utilities/stringUtils'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '97%',
    margin: 'auto',
    marginTop: '.5rem',
    flexGrow: 1,
  },
}))

function Search({ location }) {
  const classes = useStyles()
  const searchText = location.state.searchText

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

  //sorting and rows per page state
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)

  //update found products
  useEffect(() => {
    async function updateFoundProducts() {
      dispatch({ type: CLEAR_FILTERS })
      dispatch(searchProducts(searchText))
    }
    updateFoundProducts()
  }, [searchText, dispatch])

  //create initial filter objects
  useEffect(() => {
    dispatch(getSearchFilters(products))
  }, [products, dispatch])

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
              filteredProducts.length > 0 ||
              activeFilters.length > 0 ||
              activeRadio.length > 0
                ? filteredProducts
                : products
            }
            category={`Search Results for '${capitalize(searchText)}'`}
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

export default Search
