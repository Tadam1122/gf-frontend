import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}))

function WishlistTableHead({ order, orderBy, headerCells, handleSort }) {
  const classes = useStyles()

  return (
    <TableHead>
      <TableRow>
        {headerCells.map((headerCell) => (
          <TableCell
            key={headerCell.id}
            align='center'
            padding={headerCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headerCell.id ? order : false}
          >
            {headerCell.id !== 'image' && (
              <TableSortLabel
                active={orderBy === headerCell.id}
                direction={orderBy === headerCell.id ? order : 'asc'}
                onClick={(_) => {
                  handleSort(headerCell.id)
                }}
              >
                {headerCell.label}
                {orderBy === headerCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
        <TableCell align='right'>
          <Button variant='contained' color='primary' disableElevation>
            Create New Wishlist
          </Button>
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

export default WishlistTableHead
