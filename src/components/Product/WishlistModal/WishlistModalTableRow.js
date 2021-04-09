import { TableRow, TableCell, Button } from '@material-ui/core'

function WishlistModalTableRow({ wishlist, handleAddProduct }) {
  return (
    <TableRow hover tabIndex={-1}>
      <TableCell align='left'>{wishlist.name}</TableCell>
      <TableCell align='left'>{wishlist.totalPrice}</TableCell>
      <TableCell align='right'>
        <Button
          variant='outlined'
          color='primary'
          disableElevation
          onClick={(_) => {
            handleAddProduct(wishlist)
          }}
        >
          Add to Wishlist
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default WishlistModalTableRow
