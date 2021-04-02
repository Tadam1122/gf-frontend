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
import {
  loginUser,
  registerUser,
  checkLogin,
  getUsername,
} from '../services/authServices'

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

  //error state for registration and login
  const [errors, setErrors] = useState([])

  //check local storage for login token
  useEffect(() => {
    if (checkLogin()) {
      setLogin(checkLogin())
      setUsername(getUsername())
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
  function handleSearchChange(e, history) {
    if (e.key === 'Enter') {
      // send searchText state to search component
      history.push({
        pathname: '/search',
        state: { searchText: e.target.value },
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
      history.push('/')
    }
  }

  //logout user
  function handleLogout() {
    localStorage.clear()
    setLogin(false)
    setUsername('')
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
          <Route path='/browse' component={Browse} />
          <Route
            path='/login'
            render={(_) => <Login handleLogin={handleLogin} errors={errors} />}
          />
          <Route path='/product' component={Product} />
          <Route path='/search' component={Search} />
          <Route
            path='/register'
            render={(_) => (
              <Register handleRegister={handleRegister} errors={errors} />
            )}
          />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  )
}

export default App
