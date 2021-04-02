import { TableHead, TableCell, TableRow } from '@material-ui/core'
import { getHeaderCells } from './productHeaderCells'

function PriceTableHead() {
  const headerCells = getHeaderCells()

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
