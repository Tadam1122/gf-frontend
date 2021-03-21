import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Home from './Home'
import Browse from './Browse/Browse'
import NavbarDesktop from './Navbar/NavbarDesktop'

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
  const [searchText, changeSearchText] = useState('')
  const [isLoggedIn, setLogin] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    token != null ? setLogin(true) : setLogin(false)
  }, [])

  function handleModalOpen() {
    toggleModal(true)
  }
  function handleModalClose() {
    toggleModal(false)
  }

  function handleSearchChange(text) {
    changeSearchText(text)
  }

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
        {/* <Home /> */}
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
        </Switch>
      </Router>
    </MuiThemeProvider>
  )
}

export default App
