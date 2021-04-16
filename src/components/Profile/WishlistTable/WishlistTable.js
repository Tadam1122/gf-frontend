import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
import { sortWishlistData } from '../../../utilities/sortWishlistData'
import { getHeaderCells } from '../../../utilities/headerCells'
import { updateUser } from '../../../actions/userActions'

const useStyles = makeStyles((theme) => ({
  textfield: {
    width: '7rem',
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

function WishlistTable({ history }) {
  const classes = useStyles()
  const user = useSelector((state) => state.userRed.user)
  const dispatch = useDispatch()

  //ui state vars
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')
  const [createWishlist, setCreateWishlist] = useState(false)
  const [newWishlistName, setNewWishlistName] = useState('')
  const [headerCells, setHeaderCells] = useState([])
  const [duplicateFound, setDuplicateFound] = useState(false)

  // get new header cells for different categories
  useEffect(() => {
    const newHeaderCells = getHeaderCells('Wishlist')
    setHeaderCells(newHeaderCells)
  }, [])

  // sort
  function handleSort(property) {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  function handleCreateClick() {
    setCreateWishlist(!createWishlist)
  }

  // check for duplicates when text changes
  function handleNewNameChange(e) {
    setNewWishlistName(e.target.value)
    const found = user.wishlists.filter(
      (wishlist) => wishlist.name === e.target.value
    )
    if (found.length) {
      setDuplicateFound(true)
    } else {
      setDuplicateFound(false)
    }
    if (!found.length && e.key === 'Enter' && e.target.value.length) {
      createNewWishlist()
    }
  }

  function createNewWishlist() {
    const newWishlist = {
      name: newWishlistName,
      totalPrice: '$0',
      items: [],
    }
    let updatedWishlists = user.wishlists
    updatedWishlists.push(newWishlist)
    dispatch(updateUser(updatedWishlists))
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
          createWishlist={createWishlist}
        />
        <TableBody>
          {user.wishlists.length > 0 &&
            sortWishlistData(user.wishlists, order, orderBy).map((wishlist) => (
              <WishlistTableRow
                wishlist={wishlist}
                history={history}
                key={wishlist.name}
              />
            ))}
          {createWishlist && (
            <TableRow hover tabIndex={-1}>
              <TableCell align='left' className={classes.textfield}>
                <TextField
                  id='newName'
                  label='New Name'
                  onKeyUp={handleNewNameChange}
                />
              </TableCell>
              <TableCell align='left'>$0</TableCell>
              <TableCell align='right'>
                <Button
                  variant='outlined'
                  color='primary'
                  onClick={createNewWishlist}
                  disabled={duplicateFound}
                  disableElevation
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
