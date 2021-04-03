import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Button,
  Typography,
  Toolbar,
  Table,
  TableBody,
  TableContainer,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import WishlistTableRow from './WishlistTableRow'
import WishlistTableHead from './WishlistTableHead'
import { getWishlistCells } from './wishlistCells'

const useStyles = makeStyles((theme) => ({
  table: {
    background: 'white',
    flexGrow: 1,
    height: '93%',
    padding: '1rem',
    width: '94%',
    borderRadius: '15px',
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
}))

function WishlistTable({ wishlists }) {
  const classes = useStyles()
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')
  const headerCells = getWishlistCells()

  // sort
  function handleSort(property) {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  return (
    <TableContainer className={classes.table}>
      <Toolbar className={classes.toolbar}>
        <Typography component='div' variant='h3'>
          Wishlists
        </Typography>
      </Toolbar>
      <Table>
        <WishlistTableHead
          order={order}
          orderBy={orderBy}
          handleSort={handleSort}
          headerCells={headerCells}
        />
        <TableBody>
          {wishlists.length > 0 &&
            wishlists.map((wishlist) => (
              <WishlistTableRow wishlist={wishlist} key={wishlist} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default WishlistTable
