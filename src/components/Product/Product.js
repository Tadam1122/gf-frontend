import { Button, ButtonBase, Grid, Container, Grow } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PriceTable from './PriceTable'
import SpecsTable from './SpecsTable'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '90%',
    paddingTop: '10%',
  },
  imageContainer: {
    width: '100%',
    background: '#fff',
    borderRadius: '15px',
    paddingBottom: '20%',
    height: '80%',
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
  const product = location.state.product
  const username = location.state.username
  // TODO: update wishlists when user adds item to wishlist
  const wishlists = location.state.wishlists

  const classes = useStyles()

  return (
    <Container justify='center'>
      <Grid
        container
        spacing={4}
        direction='row'
        justify='center'
        className={classes.root}
      >
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
            {username && (
              <Button
                className={classes.button}
                variant='contained'
                color='primary'
                disableElevation
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
    </Container>
  )
}

export default Product
