import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Grid, Grow } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { capitalize } from '../../utilities/stringUtils'
import ProductTable from './BrowseTable/ProductTable'
import Sidebar from './BrowseSidebar/Sidebar'

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

// TODO: add filter functionality
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

      //filter method to filter products
      let filtered = products.filter((product) => {
        for (let filter of useCheckFilters) {
          let index = filter.values.indexOf(product[filter.name])
          if (index < 0) return false
        }
        return true
      })

      if (useRadioFilters) {
        filtered = filtered.filter((product) => {
          for (let filter of useRadioFilters) {
            if (product[filter.name] !== filter.value) return false
          }
          return true
        })
      }

      setFilterProducts(filtered)
      setPage(0)
    }
    filterProducts()
  }, [activeFilters, activeRadio, products])

  function handleFilterProducts(newProducts) {
    setFilterProducts(newProducts)
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  function handleChangePage(_, newPage) {
    setPage(newPage)
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
        <Grid item sm={2} md={2} lg={2} xl={2}>
          <Sidebar
            products={products}
            rowsPerPage={rowsPerPage}
            handleFilterProducts={handleFilterProducts}
            activeFilters={activeFilters}
            setCheckActive={setCheckActive}
            activeRadio={activeRadio}
            setRadioActive={setRadioActive}
          />
        </Grid>
      </Grow>
      <Grow
        in={true}
        style={{ transformOrigin: '0 0 0' }}
        {...{ timeout: 1000 }}
      >
        <Grid item xs={12} sm={10} md={10} lg={10} xl={10}>
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
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={handleChangePage}
          />
        </Grid>
      </Grow>
    </Grid>
  )
}

export default Browse
