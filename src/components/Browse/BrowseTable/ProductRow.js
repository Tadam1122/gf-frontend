import { makeStyles } from '@material-ui/core/styles'
import {
  TableRow,
  TableCell,
  ButtonBase,
  Button,
  Typography,
} from '@material-ui/core'
import { getLowestPrice } from '../../../utilities/priceUtil'

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

function ProductRow({ product }) {
  const classes = useStyles()
  return (
    <TableRow tabIndex={-1} hover>
      <TableCell align='center'>
        <ButtonBase className={classes.imageContainer}>
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
      <TableCell>{product.bridgeConfig}</TableCell>
      <TableCell>{product.stringCount}</TableCell>
      <TableCell>{product.pickupConfig}</TableCell>
      <TableCell>{product.scaleLen}</TableCell>
      <TableCell>{product.neckConstruction}</TableCell>
      <TableCell>
        <Button
          variant='contained'
          color='primary'
          size='large'
          disableElevation
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
