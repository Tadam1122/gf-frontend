import { useState, useEffect } from 'react'
import {
  Container,
  Grow,
  Typography,
  TableContainer,
  Toolbar,
  Table,
  TableBody,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ItemTableRow from './ItemTableRow'
import ItemTableHead from './ItemTableHead'
import { sortData } from '../Browse/BrowseTable/sortData'
import { getHeaderCells } from '../Browse/BrowseTable/headerCells'
import { getProductById } from '../../services/productServices'
import { capitalize } from '../../utilities/stringUtils'

const useStyles = makeStyles((theme) => ({
  textfield: {
    width: '50%',
  },
  table: {
    background: 'white',
    flexGrow: 1,
    height: '93%',
    padding: '1rem',
    width: '94%',
    borderRadius: '15px',
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

  console.log(location.state)

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
    <Container>
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
        </TableContainer>
      </Grow>
    </Container>
  )
}

export default Wishlists
