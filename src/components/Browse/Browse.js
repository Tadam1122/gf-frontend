import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Grid, Typography, Container, Grow } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { capitalize } from '../../utilities/stringUtils'
import ProductTable from './BrowseTable/ProductTable'
import Filters from './BrowseFilter/Filters'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '95%',
    margin: 'auto',
  },
  container: {
    marginTop: '.5rem',
  },
  subText: {
    fontWeight: 'lighter',
    color: '#979797',
  },
  image: {
    display: 'block',
    height: '100%',
    width: '100%',
  },
  table: {
    minWidth: 650,
  },
}))

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

//TODO: style filters
// TODO: load filter attributes dynamically
// TODO: add filter functionality
function Browse() {
  const [products, setProducts] = useState([])
  const [filterProducts, setFilterProducts] = useState([])
  const classes = useStyles()
  const location = useLocation()
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

  function handleFilterProducts(newProducts) {
    setFilterProducts(newProducts)
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        spacing={1}
        className={classes.container}
      >
        <Grid item sm={2} md={2} lg={2} xl={2}>
          <Filters
            products={products}
            handleFilterProducts={handleFilterProducts}
          />
        </Grid>
        <Grid item sm={10} md={10} lg={10} xl={10}>
          <ProductTable
            products={filterProducts.length > 0 ? filterProducts : products}
            category={category}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default Browse
