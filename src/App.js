import { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Hidden } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import store, { persistor } from './store'
import NavbarDesktop from './components/Navbar/NavbarDesktop'
import NavbarMobile from './components/Navbar/Mobile/NavbarMobile'
import Home from './components/Home'
import Browse from './components/Browse/Browse'
import Product from './components/Product/Product'
import Search from './components/Browse/Search'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Profile from './components/Profile/Profile'
import Wishlist from './components/Wishlist/Wishlist'

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

function App() {
  //state for modal
  const [modalOpen, toggleModal] = useState(false)

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

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            <Hidden mdUp>
              <NavbarMobile
                modalOpen={modalOpen}
                handleClose={handleModalClose}
                handleOpen={handleModalOpen}
                handleSearchChange={handleSearchChange}
              />
            </Hidden>
            <Hidden smDown>
              <NavbarDesktop
                modalOpen={modalOpen}
                handleClose={handleModalClose}
                handleOpen={handleModalOpen}
                handleSearchChange={handleSearchChange}
              />
            </Hidden>
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
              <Route
                render={(_) => (
                  <Home
                    modalOpen={modalOpen}
                    handleClose={handleModalClose}
                    handleOpen={handleModalOpen}
                  />
                )}
              />
            </Switch>
          </BrowserRouter>
        </MuiThemeProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
