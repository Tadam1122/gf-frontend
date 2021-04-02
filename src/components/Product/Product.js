import {
  Button,
  ButtonBase,
  Typography,
  Grid,
  Container,
  Toolbar,
  Table,
  TableBody,
  TableContainer,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PriceTableHead from './PriceTableHead'
import PriceTableRow from './PriceTableRow'

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
  },
  image: {
    width: 'auto',
    borderRadius: '15px',
  },
  button: {
    position: 'relative',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    marginTop: '15%',
  },
  table: {
    background: 'white',
    flexGrow: 1,
    height: '100%',
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
}))

// TODO: Style product page, attributes will need to be rendered depending on category
// TODO: render attributes similar to how you did with header cells
function Product({ location }) {
  const product = location.state.product
  const category = location.state.category
  const username = location.state.username

  const classes = useStyles()

  // TODO: specs need to be loaded dynamically for each category
  return (
    <Container justify='center'>
      <Grid
        container
        spacing={4}
        direction='row'
        justify='center'
        className={classes.root}
      >
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
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
        <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
          <TableContainer className={classes.table}>
            <Toolbar className={classes.toolbar}>
              <Typography variant='h4'>
                {product.brand} {product.model}
              </Typography>
            </Toolbar>
            <Table>
              <PriceTableHead />
              <TableBody>
                {product.prices.map((store) => {
                  return <PriceTableRow store={store} key={store.url} />
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Grid container></Grid>
    </Container>
  )
}

export default Product
