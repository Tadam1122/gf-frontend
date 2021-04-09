import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Modal,
  Fade,
  Backdrop,
  Container,
  TextField,
  Typography,
  Toolbar,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  Button,
  IconButton,
  Grow,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ClearIcon from '@material-ui/icons/Clear'
import WishlistTableHead from '../../Profile/WishlistTable/WishlistTableHead'
import WishlistModalTableRow from './WishlistModalTableRow'
import { sortWishlistData } from '../../../utilities/sortWishlistData'
import { getHeaderCells } from '../../../utilities/headerCells'
import { updateUser } from '../../../actions/userActions'

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    flexGrow: 1,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: '10%',
    left: '10%',
    overflow: 'scroll',
  },
  textfield: {
    width: '7rem',
  },
  exitBtn: {
    marginLeft: '95%',
  },
}))

function WishlistsModal({ modalOpen, handleClose, handleAddProduct }) {
  const classes = useStyles()

  const user = useSelector((state) => state.userRed.user)
  const dispatch = useDispatch()

  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')
  const [createWishlist, setCreateWishlist] = useState(false)
  const [newWishlistName, setNewWishlistName] = useState('')
  const [headerCells, setHeaderCells] = useState([])
  const [duplicateFound, setDuplicateFound] = useState(false)

  // get new header cells for different categories
  useEffect(() => {
    const newHeaderCells = getHeaderCells()
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

  function handleNewNameChange(e) {
    setNewWishlistName(e.target.value)
    const found = user.wishlists.filter(
      (wishlist) => wishlist.name === e.target.value
    )
    if (found.length > 0) {
      setDuplicateFound(true)
    } else {
      setDuplicateFound(false)
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
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby='add-wishlist'
      aria-describedby='add product to a wishlist'
      className={classes.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 400 }}
    >
      <Fade in={modalOpen}>
        <div className={classes.container}>
          <Grow in={true}>
            <Container justify='center'>
              <IconButton
                color='primary'
                aria-label='exit'
                className={classes.exitBtn}
                onClick={handleClose}
              >
                <ClearIcon fontSize='large' />
              </IconButton>
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
                    {user &&
                      sortWishlistData(
                        user.wishlists,
                        order,
                        orderBy
                      ).map((wishlist) => (
                        <WishlistModalTableRow
                          wishlist={wishlist}
                          handleAddProduct={handleAddProduct}
                          key={wishlist.name}
                        />
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
                            disableElevation
                            disabled={duplicateFound}
                          >
                            Create Wishlist
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
          </Grow>
        </div>
      </Fade>
    </Modal>
  )
}

export default WishlistsModal
