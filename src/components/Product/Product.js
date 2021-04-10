import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, ButtonBase, Grid, Container, Grow } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PriceTable from './PriceTable/PriceTable'
import SpecsTable from './SpecsTable/SpecsTable'
import WishlistModal from './WishlistModal/WishlistModal'
import { updateUser } from '../../actions/userActions'
import { getLowestNumber, priceToNumber } from '../../utilities/priceUtils'
import Success from '../Auth/Success'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '90%',
    paddingTop: '2rem',
  },
  imageContainer: {
    width: '100%',
    background: '#fff',
    borderRadius: '15px',
    paddingBottom: '3rem',
    height: '14rem',
  },
  image: {
    width: 'auto',
    borderRadius: '15px',
  },
  button: {
    position: 'relative',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    marginTop: '2.5rem',
  },
  spec: {
    marginBottom: '2rem',
  },
}))

function Product({ location }) {
  const [modalOpen, toggleModal] = useState(false)

  const user = useSelector((state) => state.userRed.user)
  const dispatch = useDispatch()

  const product = location.state.product

  const classes = useStyles()

  //modal opened
  function handleModalOpen() {
    toggleModal(true)
  }
  //modal closed
  function handleModalClose() {
    toggleModal(false)
  }

  function handleAddProduct(wishlist) {
    wishlist.items.push({ id: product._id, tablename: product.category })
    wishlist.totalPrice = `$${
      priceToNumber(wishlist.totalPrice) + getLowestNumber(product.prices)
    }`
    let updatedWishlists = [...user.wishlists]
    updatedWishlists = updatedWishlists.filter(
      (userWish) => wishlist.name !== userWish.name
    )
    updatedWishlists.push(wishlist)
    dispatch(updateUser(updatedWishlists))
    handleModalClose()
  }

  return (
    <Container justify='center'>
      <Grid
        container
        spacing={4}
        direction='row'
        justify='center'
        className={classes.root}
      >
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Success />
        </Grid>
        <Grow in={true}>
          <Grid item xs={12} sm={12} md={5} lg={3} xl={3}>
            <ButtonBase className={classes.imageContainer} disabled>
              <img
                src={`data:image/png;base64, ${product.image}`}
                alt={`${product.brand} ${product.model}`}
                draggable={false}
                className={classes.image}
              />
            </ButtonBase>
            {user && (
              <Button
                className={classes.button}
                variant='contained'
                color='primary'
                disableElevation
                onClick={handleModalOpen}
              >
                Add to Wishlist
              </Button>
            )}
          </Grid>
        </Grow>
        <Grow
          in={true}
          style={{ transformOrigin: '0 0 0' }}
          {...{ timeout: 1000 }}
        >
          <Grid item xs={12} sm={12} md={7} lg={9} xl={9}>
            <PriceTable product={product} />
          </Grid>
        </Grow>
        <Grow
          in={true}
          style={{ transformOrigin: '0 0 0' }}
          {...{ timeout: 1500 }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            className={classes.spec}
          >
            <SpecsTable product={product} />
          </Grid>
        </Grow>
      </Grid>
      <WishlistModal
        modalOpen={modalOpen}
        handleClose={handleModalClose}
        handleAddProduct={handleAddProduct}
      />
    </Container>
  )
}

export default Product
