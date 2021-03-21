import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Home from './Home'
import Browse from './Browse/Browse'
import NavbarDesktop from './Navbar/NavbarDesktop'
import Login from './Login/Login'
import Register from './Register/Register'

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

//TODO: check if device is certain width to load desktop nav
function App(props) {
  //state for modal
  const [modalOpen, toggleModal] = useState(false)

  //searchbar component state
  const [searchText, changeSearchText] = useState('')

  //login state
  const [isLoggedIn, setLogin] = useState(false)

  //check local storage for login token
  useEffect(() => {
    const token = localStorage.getItem('token')
    token != null ? setLogin(true) : setLogin(false)
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
  function handleSearchChange(text) {
    changeSearchText(text)
  }

  //login user
  function handleLogin() {
    setLogin(!isLoggedIn)
  }

  //register user
  function handleRegister() {}

  //TODO: implement mobile navbar if time permits
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <NavbarDesktop
          modalOpen={modalOpen}
          handleClose={handleModalClose}
          handleOpen={handleModalOpen}
          handleSearchChange={handleSearchChange}
          isLoggedIn={isLoggedIn}
        />
        {/* <NavbarMobile /> */}
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
            render={(_) => <Login handleLogin={handleLogin} />}
          />
          <Route
            path='/register'
            render={(_) => <Register handleRegister={handleRegister} />}
          />
        </Switch>
      </Router>
    </MuiThemeProvider>
  )
}

export default App
