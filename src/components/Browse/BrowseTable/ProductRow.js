import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  TableRow,
  TableCell,
  ButtonBase,
  Button,
  Typography,
} from '@material-ui/core'
import { getLowestPrice } from '../../../utilities/priceUtils'

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    width: '100%',
    background: '#fff',
    borderRadius: '15px',
  },
  image: {
    height: '90px',
    width: 'auto',
    borderRadius: '15px',
  },
}))

function ProductRow({ product, headerCells }) {
  const classes = useStyles()
  const history = useHistory()
  // dynamic cells for a category
  const cells = headerCells.filter(
    (cell) => cell.id !== 'image' && cell.id !== 'name' && cell.id !== 'price'
  )

  // reroute product to product page
  function handleProductClick() {
    history.push({
      pathname: '/product',
      state: {
        product: product,
      },
    })
  }
  return (
    <TableRow tabIndex={-1} hover>
      <TableCell align='center'>
        <ButtonBase
          className={classes.imageContainer}
          onClick={handleProductClick}
        >
          <img
            src={`data:image/png;base64, ${product.image}`}
            alt={`${product.brand} ${product.model}`}
            draggable={false}
            className={classes.image}
          />
        </ButtonBase>
      </TableCell>
      <TableCell component='th' scope='row'>
        {product.brand} {product.model}
      </TableCell>
      {cells.map((cell) => (
        <TableCell key={cell.id}>{product[cell.id]}</TableCell>
      ))}
      <TableCell>
        <Button
          variant='contained'
          color='primary'
          size='large'
          disableElevation
          onClick={handleProductClick}
        >
          <Typography variant='button'>
            {getLowestPrice(product.prices)}
          </Typography>
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default ProductRow
