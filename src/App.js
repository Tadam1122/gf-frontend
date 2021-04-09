import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import store, { persistor } from './store'
import NavbarDesktop from './components/Navbar/NavbarDesktop'
import Home from './components/Home'
import Browse from './components/Browse/Browse'
import Product from './components/Product/Product'
import Search from './components/Browse/Search'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Profile from './components/Profile/Profile'
import Wishlist from './components/Wishlist/Wishlist'
import { getUserId } from './services/authServices'
import { update } from './services/userServices'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3F98D8',
      light: '#d3dedf',
    },
    secondary: {
      main: '#DB7748',
    },
  },
  typography: {
    fontFamily: [
      'BlinkMacSystemFont',
      '-apple-system',
      '"Helvetica Neue"',
      'Roboto',
      '"Segoe UI"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  overrides: {
    MuiTableRow: {
      hover: {
        '&:hover': {
          backgroundColor: '#f9f9f9 !important',
        },
      },
    },
    MuiFormControlLabel: {
      root: {
        userSelect: 'none',
      },
    },
    MuiButtonBase: {
      root: {
        userSelect: 'none',
      },
    },
  },
})

// TODO: Turn relevant react states (user data or product data) into redux
// TODO: make navbar and other relevant components read user data from redux state
// TODO: ensure that userUpdate action works
// TODO: set up error component to use error selectors from redux, ensure parent components also read from error selector if need be
// TODO: set up success message action and reducer when updating user in profile succeeds
function App(props) {
  //state for modal
  const [modalOpen, toggleModal] = useState(false)

  const [wishlists, setWishlists] = useState([])

  //modal opened
  function handleModalOpen() {
    toggleModal(true)
  }

  //modal closed
  function handleModalClose() {
    toggleModal(false)
  }

  //search text changed
  function handleSearchChange(e, history) {
    if (e.key === 'Enter') {
      // send searchText state to search component
      history.push({
        pathname: '/search',
        state: {
          searchText: e.target.value,
        },
      })
      e.target.value = ''
    }
  }

  // handler for updating user
  async function handleWishlistUpdate(wishlists) {
    let user = {}
    user.id = getUserId()
    user.wishlists = wishlists
    const updateErr = await update(user)
    if (!updateErr) {
      setWishlists(wishlists)
    }
  }

  // TODO: this handler needs to somehow be passed to wishlist component
  async function handleDeleteWishlistItem(prodId, wishlist) {
    let updatedWishlist = wishlist.items.filter((item) => item.id !== prodId)
    let updatedWishlists = wishlists.filter(
      (wishlist) => wishlist.name !== updatedWishlist.name
    )
    handleWishlistUpdate(updatedWishlists)
  }

  // TODO: this handler needs to somehow be passed to wishlist component
  async function handleDeleteWishlist(wishlistDel) {
    let updatedWishlists = wishlists.filter(
      (wishlist) => wishlist.name !== wishlistDel.name
    )
    handleWishlistUpdate(updatedWishlists)
  }

  //TODO: this handlre needs to somehow be passed to product component
  async function handleAddItem(product, wishlistAdd) {
    let updatedWishlists = wishlists.map((wishlist) => {
      if (wishlist.name === wishlistAdd.name) {
        wishlist.items.push(product)
      }
      return wishlist
    })
    handleWishlistUpdate(updatedWishlists)
  }

  //TODO: implement mobile navbar if time permits
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            {/* <NavbarMobile /> */}
            <NavbarDesktop
              modalOpen={modalOpen}
              handleClose={handleModalClose}
              handleOpen={handleModalOpen}
              handleSearchChange={handleSearchChange}
            />
            <Switch>
              <Route
                path='/'
                exact
                render={(_) => (
                  <Home
                    modalOpen={modalOpen}
                    handleClose={handleModalClose}
                    handleOpen={handleModalOpen}
                  />
                )}
              />
              <Route path='/browse' component={Browse} />
              <Route path='/login' component={Login} />
              <Route path='/product' component={Product} />
              <Route path='/search' component={Search} />
              <Route path='/register' component={Register} />
              <Route path='/profile' component={Profile} />
              <Route path='/wishlist' component={Wishlist} />
            </Switch>
          </BrowserRouter>
        </MuiThemeProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
