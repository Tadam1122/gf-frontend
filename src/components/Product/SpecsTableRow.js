import { TableRow, TableCell } from '@material-ui/core'
import { formatFilter } from '../../utilities/stringUtils'

function SpecsTableRow({ filterName, product }) {
  return (
    <TableRow>
      <TableCell>{formatFilter(filterName)}</TableCell>
      {typeof product[filterName] === 'boolean' ? (
        <TableCell>{product[filterName] === true ? 'Yes' : 'No'}</TableCell>
      ) : (
        <TableCell>{product[filterName]}</TableCell>
      )}
    </TableRow>
  )
}

export default SpecsTableRow
