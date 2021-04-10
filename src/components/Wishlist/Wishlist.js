import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Route, Redirect } from 'react-router-dom'
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
import ItemTableRow from './ItemTable/ItemTableRow'
import ItemTableHead from './ItemTable/ItemTableHead'
import BrowseModal from '../Browse/BrowseModal/BrowseModal'
import DeleteModal from './DeleteModal'
import { sortData } from '../../utilities/sortData'
import { getHeaderCells } from '../../utilities/headerCells'
import {
  fetchWishlistProducts,
  updateWishlistProducts,
} from '../../actions/wishlistActions'
import { updateUser } from '../../actions/userActions'
import { clearError } from '../../actions/errorActions'
import { clearSuccess } from '../../actions/successActions'
import { getLowestNumber } from '../../utilities/priceUtils'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '90%',
    paddingTop: '3rem',
  },
  tableContainer: {
    background: 'white',
    flexGrow: 1,
    maxHeight: '40rem',
    padding: '1rem',
    width: '94%',
    borderRadius: '15px',
    marginBottom: '2rem',
  },
  table: {
    height: '60%',
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  footer: {
    marginBottom: '1.5rem',
  },
  footerContainer: {
    width: '95%',
  },
}))

function Wishlists({ location }) {
  const classes = useStyles()

  const history = useHistory()

  const user = useSelector((state) => state.userRed.user)
  const products = useSelector((state) => state.wishlistRed.products)
  const dispatch = useDispatch()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  let wishlist = {}
  if (location.state) {
    wishlist = location.state.wishlist
  }

  // ui state variables
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')
  const [headerCells, setHeaderCells] = useState([])
  const [modalOpen, toggleModal] = useState(false)
  const [delModalOpen, toggleDelModal] = useState(false)

  useEffect(() => {
    async function getProducts() {
      if (location.state) {
        dispatch(fetchWishlistProducts(wishlist.items))
      }
    }
    getProducts()
  }, [wishlist, location, dispatch])

  // get new header cells for different categories
  useEffect(() => {
    const newHeaderCells = getHeaderCells('Products')
    setHeaderCells(newHeaderCells)
  }, [])

  useEffect(() => {
    dispatch(clearSuccess())
    dispatch(clearError())
  }, [dispatch])

  // sort
  function handleSort(property) {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  //modal opened
  function handleModalOpen() {
    toggleModal(true)
  }
  //modal closed
  function handleModalClose() {
    toggleModal(false)
  }
  //modal opened
  function handleDelModalOpen() {
    toggleDelModal(true)
  }
  //modal closed
  function handleDelModalClose() {
    toggleDelModal(false)
  }

  function handleDeleteItem(id) {
    let found = false
    // eslint-disable-next-line array-callback-return
    wishlist.items = wishlist.items.filter((product) => {
      if (product.id === id && !found) {
        found = true
      } else {
        return product
      }
    })

    //get updated wishlist price
    let updatedProducts = [...products]
    found = false
    // eslint-disable-next-line array-callback-return
    updatedProducts = updatedProducts.filter((product) => {
      if (product._id === id && !found) {
        found = true
      } else {
        return product
      }
    })

    let numberPrice = updatedProducts.map((product) =>
      getLowestNumber(product.prices)
    )
    let updatedPrice = numberPrice.reduce((a, b) => a + b, 0)
    wishlist.totalPrice = `$${updatedPrice}`

    // update wishlists for user
    let updatedWishlists = [...user.wishlists]
    updatedWishlists = updatedWishlists.filter(
      (userWish) => wishlist.name !== userWish.name
    )
    updatedWishlists.push(wishlist)

    dispatch(updateWishlistProducts(updatedProducts))
    dispatch(updateUser(updatedWishlists))
  }

  function handleDeleteWishlist() {
    // update wishlists for user
    let updatedWishlists = [...user.wishlists]
    updatedWishlists = updatedWishlists.filter(
      (userWish) => wishlist.name !== userWish.name
    )
    dispatch(updateUser(updatedWishlists))

    history.push('/profile')
  }

  return (
    <Route
      render={() =>
        user ? (
          <Container className={classes.root}>
            <Grow in={true}>
              <div>
                <TableContainer className={classes.tableContainer}>
                  <Toolbar className={classes.toolbar}>
                    <Typography component='div' variant='h3'>
                      {wishlist.name}
                    </Typography>
                  </Toolbar>
                  <Table stickyHeader>
                    <ItemTableHead
                      order={order}
                      orderBy={orderBy}
                      handleSort={handleSort}
                      headerCells={headerCells}
                      handleModalOpen={handleModalOpen}
                    />
                    <TableBody>
                      {products.length > 0 &&
                        sortData(products, order, orderBy).map((product) => (
                          <ItemTableRow
                            product={product}
                            key={`${product._id}${Math.floor(
                              Math.random() * 100
                            )}`}
                            headerCells={headerCells}
                            handleDeleteItem={handleDeleteItem}
                          />
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Grid
                  container
                  align='right'
                  direction='column'
                  className={classes.footerContainer}
                >
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
                      onClick={handleDelModalOpen}
                      disableElevation
                    >
                      Delete Wishlist
                    </Button>
                  </Grid>
                </Grid>
                <BrowseModal
                  modalOpen={modalOpen}
                  handleClose={handleModalClose}
                />
                <DeleteModal
                  modalOpen={delModalOpen}
                  handleClose={handleDelModalClose}
                  wishlist={wishlist}
                  handleDeleteWishlist={handleDeleteWishlist}
                />
              </div>
            </Grow>
          </Container>
        ) : (
          <Redirect to={{ pathname: '/' }} />
        )
      }
    />
  )
}

export default Wishlists
