import { useState, useEffect } from 'react'
import {
  Container,
  Grow,
  Grid,
  Typography,
  TableContainer,
  Toolbar,
  Table,
  TableBody,
  Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ItemTableRow from './ItemTableRow'
import ItemTableHead from './ItemTableHead'
import { sortData } from '../Browse/BrowseTable/sortData'
import { getHeaderCells } from '../Browse/BrowseTable/headerCells'
import { getProductById } from '../../services/productServices'
import { capitalize } from '../../utilities/stringUtils'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '90%',
    paddingTop: '3rem',
  },
  table: {
    background: 'white',
    flexGrow: 1,
    height: '93%',
    padding: '1rem',
    width: '94%',
    borderRadius: '15px',
    marginBottom: '2rem',
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
}))

async function fetchProducts(products) {
  let foundProducts = []
  for (let product of products) {
    let res = await getProductById(product.category, product.id)
    let data = await res.data
    data.category = `${capitalize(product.category.split('-')[0])} ${capitalize(
      product.category.split('-')[1]
    )}`
    foundProducts.push(data)
  }
  return foundProducts
}

function Wishlists({ location }) {
  const classes = useStyles()

  const wishlist = location.state.wishlist
  const wishlists = location.state.wishlists
  const username = location.state.username

  // TODO: need to find a way to pass functions to this component

  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')
  const [headerCells, setHeaderCells] = useState([])
  const [products, setProducts] = useState([])

  // get new header cells for different categories
  useEffect(() => {
    const newHeaderCells = getHeaderCells()
    setHeaderCells(newHeaderCells)
  }, [])

  useEffect(() => {
    async function getProducts() {
      const resProducts = await fetchProducts(wishlist.items)
      setProducts(resProducts)
    }
    getProducts()
  }, [wishlist])

  // sort
  function handleSort(property) {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  function handleAddClick() {
    console.log('ouch!')
  }

  async function handleDeleteItem(prodId) {
    let filteredWishlist = wishlist.items.filter((item) => item.id !== prodId)
  }

  return (
    <Container className={classes.root}>
      <Grow in={true}>
        <TableContainer className={classes.table}>
          <Toolbar className={classes.toolbar}>
            <Typography component='div' variant='h3'>
              {wishlist.name}
            </Typography>
          </Toolbar>
          <Table>
            <ItemTableHead
              order={order}
              orderBy={orderBy}
              handleSort={handleSort}
              headerCells={headerCells}
              handleAddClick={handleAddClick}
            />
            <TableBody>
              {sortData(products, order, orderBy).map((product) => (
                <ItemTableRow
                  product={product}
                  key={product.model}
                  headerCells={headerCells}
                  wishlists={wishlists}
                  username={username}
                  handleDeleteItem={handleDeleteItem}
                />
              ))}
            </TableBody>
          </Table>
          <Grid container align='right' direction='column'>
            <Grid item>
              <Typography className={classes.footer} variant='h4'>
                {wishlist.totalPrice}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                className={classes.footer}
                variant='contained'
                color='secondary'
              >
                Delete Wishlist
              </Button>
            </Grid>
          </Grid>
        </TableContainer>
      </Grow>
    </Container>
  )
}

export default Wishlists