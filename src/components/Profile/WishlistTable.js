import { useState } from 'react'
import {
  Typography,
  Toolbar,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  Button,
  TextField,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import WishlistTableRow from './WishlistTableRow'
import WishlistTableHead from './WishlistTableHead'
import { sortWishlistData } from './sortWishlistData'
import { getWishlistCells } from './wishlistCells'

const useStyles = makeStyles((theme) => ({
  textfield: {
    width: '50%',
  },
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

function WishlistTable({ wishlists, handleUserUpdate }) {
  const classes = useStyles()
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')
  const [createWishlist, setCreateWishlist] = useState(false)
  const [newWishlistName, setNewWishlistName] = useState('')
  const headerCells = getWishlistCells()

  // sort
  function handleSort(property) {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  function handleCreateClick() {
    setCreateWishlist(true)
  }

  function handleNewNameChange(e) {
    setNewWishlistName(e.target.value)
  }

  function createNewWishlist() {
    const newWishlist = {
      name: newWishlistName,
      totalPrice: '$0',
      items: [],
    }
    let updatedWishlists = wishlists
    updatedWishlists.push(newWishlist)
    handleUserUpdate('', '', '', updatedWishlists)
    setCreateWishlist(false)
    setNewWishlistName('')
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
          handleCreateClick={handleCreateClick}
        />
        <TableBody>
          {wishlists.length > 0 &&
            sortWishlistData(wishlists, order, orderBy).map((wishlist) => (
              <WishlistTableRow wishlist={wishlist} key={wishlist.name} />
            ))}
          {createWishlist && (
            <TableRow hover tabIndex={-1}>
              <TableCell align='left'>
                <TextField
                  id='newName'
                  label='New Name'
                  onChange={handleNewNameChange}
                  className={classes.textfield}
                />
              </TableCell>
              <TableCell align='left'>$0</TableCell>
              <TableCell align='right'>
                <Button
                  variant='outlined'
                  color='primary'
                  onClick={createNewWishlist}
                >
                  Create Wishlist
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default WishlistTable
