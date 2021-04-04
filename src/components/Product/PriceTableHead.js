import { TableHead, TableCell, TableRow } from '@material-ui/core'
import { getHeaderCells } from '../Browse/BrowseTable/headerCells'

function PriceTableHead() {
  const headerCells = getHeaderCells('Product')

  return (
    <TableHead>
      <TableRow>
        {headerCells.map((headerCell) => (
          <TableCell key={headerCell.id}>{headerCell.label}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default PriceTableHead
