import { useState } from 'react'
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
import WishlistTableHead from '../Profile/WishlistTableHead'
import { sortWishlistData } from '../Profile/sortWishlistData'
import { getHeaderCells } from '../Browse/BrowseTable/headerCells'

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

  image: {
    width: '100%',
    height: '100%',
  },
  button: {
    width: '100%',
    padding: '.2rem',
    border: '1px solid #979797',
    borderRadius: '15px',
    display: 'block',
  },
  text: {
    marginRight: '40%',
  },
  exitBtn: {
    marginLeft: '95%',
  },
}))

// TODO: components to create, modalTableRow
function WishlistsModal({ modalOpen, handleClose, wishlists, product }) {
  const classes = useStyles()
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')
  const [createWishlist, setCreateWishlist] = useState(false)
  const [newWishlistName, setNewWishlistName] = useState('')
  const headerCells = getHeaderCells()

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
                  />
                  <TableBody>
                    {wishlists.length > 0 &&
                      sortWishlistData(
                        wishlists,
                        order,
                        orderBy
                      ).map((wishlist) => <WishlistModalTableRow />)}
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
            </Container>
          </Grow>
        </div>
      </Fade>
    </Modal>
  )
}

export default WishlistsModal
