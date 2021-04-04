import { TableRow, TableCell, Button } from '@material-ui/core'

function WishlistTableRow({
  wishlist,
  history,
  isLoggedIn,
  wishlists,
  username,
}) {
  function handleWishlistView() {
    history.push({
      pathname: '/wishlist',
      state: {
        wishlist: wishlist,
        isLoggedIn: isLoggedIn,
        wishlists: wishlists,
        username: username,
      },
    })
  }
  return (
    <TableRow hover tabIndex={-1}>
      <TableCell align='left'>{wishlist.name}</TableCell>
      <TableCell align='left'>{wishlist.totalPrice}</TableCell>
      <TableCell align='right'>
        <Button variant='outlined' color='primary' onClick={handleWishlistView}>
          View Wishlist
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default WishlistTableRow
