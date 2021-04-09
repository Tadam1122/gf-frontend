import { Button, TableRow, TableCell } from '@material-ui/core'

function PriceTableRow({ store }) {
  return (
    <TableRow tabIndex={-1} hover key={store.website}>
      <TableCell>{store.website}</TableCell>
      <TableCell>{store.price}</TableCell>
      <TableCell>
        {Number(store.price.split('$')[1]) > 0 ? 'Yes' : 'No'}
      </TableCell>
      <TableCell>
        <Button
          variant='contained'
          color='primary'
          disableElevation
          href={store.url}
          target='_blank'
        >
          Buy Now
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default PriceTableRow
