import { TableRow, TableCell } from '@material-ui/core'
import { formatFilter } from '../../utilities/stringUtils'

function SpecsTableRow({ filterName, product }) {
  return (
    <TableRow>
      <TableCell>{formatFilter(filterName)}</TableCell>
      <TableCell>{product[filterName]}</TableCell>
    </TableRow>
  )
}

export default SpecsTableRow
