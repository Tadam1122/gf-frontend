import { Button, TableRow, TableCell } from '@material-ui/core'

function PriceTableRow({ store }) {
  return (
    <TableRow tabIndex={-1} hover key={store.website}>
      <TableCell>{store.website}</TableCell>
      <TableCell>{store.price}</TableCell>
      <TableCell>{store.price.inStock ? 'Yes' : 'No'}</TableCell>
      <TableCell>
        {store.price && (
          <Button
            variant='contained'
            color='primary'
            disableElevation
            href={store.url}
            target='_blank'
          >
            Buy Now
          </Button>
        )}
      </TableCell>
    </TableRow>
  )
}

export default PriceTableRow
