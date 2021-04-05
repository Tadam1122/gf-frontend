import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
import { fetchWishlistProducts } from '../../actions/productActions'

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

// TODO: component needs handleDeleteWishlistItem and handleDeleteWishlist handlers
function Wishlists({ location }) {
  const classes = useStyles()

  const wishlist = location.state.wishlist
  const wishlists = location.state.wishlists
  const username = location.state.username

  const products = useSelector((state) => state.products.products)
  const dispatch = useDispatch()

  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')
  const [headerCells, setHeaderCells] = useState([])
  // const [products, setProducts] = useState([])

  // get new header cells for different categories
  useEffect(() => {
    const newHeaderCells = getHeaderCells('Products')
    setHeaderCells(newHeaderCells)
  }, [])

  useEffect(() => {
    async function getProducts() {
      dispatch(fetchWishlistProducts(wishlist.items))
    }
    getProducts()
  }, [wishlist, dispatch])

  // sort
  function handleSort(property) {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  function handleAddClick() {
    console.log('ouch!')
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
