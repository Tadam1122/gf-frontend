import { useState } from 'react'
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
  },
})

//TODO: check if device is certain width to load desktop nav
function App(props) {
  const [modalOpen, toggleModal] = useState(false)

  function handleOpen() {
    toggleModal(true)
  }
  function handleClose() {
    toggleModal(false)
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <NavbarDesktop
          modalOpen={modalOpen}
          handleClose={handleClose}
          handleOpen={handleOpen}
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
                handleClose={handleClose}
                handleOpen={handleOpen}
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
