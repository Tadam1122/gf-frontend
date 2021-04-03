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
  Grow,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PriceTableHead from './PriceTableHead'
import PriceTableRow from './PriceTableRow'
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

function Product({ location }) {
  const product = location.state.product
  const username = location.state.username
  const category = location.state.category

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
        </Grow>
        <Grow
          in={true}
          style={{ transformOrigin: '0 0 0' }}
          {...{ timeout: 1000 }}
        >
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
        </Grow>
        <Grow
          in={true}
          style={{ transformOrigin: '0 0 0' }}
          {...{ timeout: 1500 }}
        >
          <Grid item sm={12} sm={12} md={12} lg={12} xl={12}>
            <SpecsTable product={product} />
          </Grid>
        </Grow>
      </Grid>
    </Container>
  )
}

export default Product
