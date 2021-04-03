import { TableRow, TableCell, Button } from '@material-ui/core'

function WishlistTableRow({ wishlist }) {
  return (
    <TableRow hover tabIndex={-1}>
      <TableCell align='center'>{wishlist.name}</TableCell>
      <TableCell align='center'>{wishlist.totalPrice}</TableCell>
      <TableCell align='right'>
        <Button variant='outlined' color='primary'>
          View Wishlist
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default WishlistTableRow
