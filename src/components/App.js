import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import NavbarDesktop from './Navbar/NavbarDesktop'
import Home from './Home'
import Browse from './Browse/Browse'
import Product from './Product/Product'
import Search from './Browse/Search'
import Login from './Auth/Login'
import Register from './Auth/Register'
import Profile from './Profile/Profile'
import Wishlist from './Wishlist/Wishlist'
import {
  loginUser,
  registerUser,
  checkLogin,
  getUsername,
  logout,
  getUserWishlists,
  getUserId,
} from '../services/authServices'
import { updateUser } from '../services/userServices'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3F98D8',
      light: '#d3dedf',
    },
  },
  typography: {
    fontFamily: 'roboto, sans-serif',
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

function App(props) {
  //state for modal
  const [modalOpen, toggleModal] = useState(false)

  //login state
  const [isLoggedIn, setLogin] = useState(false)
  // eslint-disable-next-line
  const [username, setUsername] = useState('')
  const [wishlists, setWishlists] = useState([])

  //error state for registration and login
  const [errors, setErrors] = useState([])
  const [successMessage, setSuccessMessage] = useState('')

  //check local storage for login token
  useEffect(() => {
    if (checkLogin()) {
      setLogin(checkLogin())
      setUsername(getUsername())
      setWishlists(getUserWishlists())
    }
  }, [])

  //modal opened
  function handleModalOpen() {
    toggleModal(true)
  }

  //modal closed
  function handleModalClose() {
    toggleModal(false)
  }

  //search text changed
  function handleSearchChange(e, history, username, wishlists) {
    if (e.key === 'Enter') {
      // send searchText state to search component
      history.push({
        pathname: '/search',
        state: {
          searchText: e.target.value,
          username: username,
          wishlists: wishlists,
        },
      })
      e.target.value = ''
    }
  }

  //login user
  async function handleLogin(username, password, history) {
    setErrors([])
    const user = { username: username, password: password }
    const login = await loginUser(user)
    //check for error message
    if (login) {
      let newErrors = []
      for (let error of login.data.message.split('/')) {
        if (error.length > 1) newErrors.push({ message: `${error}` })
      }
      setErrors(newErrors)
    } else {
      setLogin(true)
      setUsername(username)
      setWishlists(getUserWishlists())
      history.push('/')
    }
  }

  //logout user
  function handleLogout() {
    logout()
    setLogin(false)
    setUsername('')
    setWishlists([])
  }

  //register user
  async function handleRegister(username, password, email, history) {
    setErrors([])
    const user = { username: username, password: password, email: email }

    const register = await registerUser(user)
    if (register.status < 200 || register.status > 300) {
      let newErrors = []
      for (let error of register.data.message.split('/')) {
        if (error.length > 1) newErrors.push({ message: `${error}` })
      }

      setErrors(newErrors)
    } else {
      await handleLogin(username, password, history)
    }
  }

  // handler for updating user
  async function handleUserUpdate(usernameText, password, email, wishlists) {
    setErrors([])
    setSuccessMessage('')
    let user = {}
    user.id = getUserId()
    user.wishlists = wishlists
    if (usernameText !== '') {
      user.username = usernameText
    }
    if (password !== '') {
      user.password = password
    }
    if (email !== '') {
      user.email = email
    }
    const update = await updateUser(user)
    if (update) {
      let newErrors = []
      for (let error of update.data.message.split('/')) {
        if (error.length > 1) newErrors.push({ message: `${error}` })
      }
      setErrors(newErrors)
    } else {
      if (usernameText !== '') {
        setUsername(usernameText)
      }
      setWishlists(wishlists)
      setSuccessMessage('Successfully updated account.')
    }
  }

  // handler for updating user
  async function handleWishlistUpdate(wishlists) {
    setErrors([])
    setSuccessMessage('')
    let user = {}
    user.id = getUserId()
    user.wishlists = wishlists
    const update = await updateUser(user)
    if (!update) {
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
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        {/* <NavbarMobile /> */}
        <NavbarDesktop
          modalOpen={modalOpen}
          handleClose={handleModalClose}
          handleOpen={handleModalOpen}
          handleSearchChange={handleSearchChange}
          isLoggedIn={isLoggedIn}
          username={username}
          wishlists={wishlists}
          handleLogout={handleLogout}
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
          <Route
            path='/browse'
            render={(_) => <Browse username={username} wishlists={wishlists} />}
          />
          <Route
            path='/login'
            render={(_) => (
              <Login
                handleLogin={handleLogin}
                errors={errors}
                setErrors={setErrors}
              />
            )}
          />
          <Route path='/product' component={Product} />
          <Route path='/search' component={Search} />
          <Route
            path='/register'
            render={(_) => (
              <Register
                handleRegister={handleRegister}
                errors={errors}
                setErrors={setErrors}
              />
            )}
          />
          <Route
            path='/profile'
            render={(_) => (
              <Profile
                isLoggedIn={isLoggedIn}
                username={username}
                wishlists={wishlists}
                errors={errors}
                successMessage={successMessage}
                handleUserUpdate={handleUserUpdate}
                setErrors={setErrors}
                setSuccessMessage={setSuccessMessage}
              />
            )}
          />
          <Route path='/wishlist' component={Wishlist} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  )
}

export default App
