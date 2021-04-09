import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { makeStyles, fade } from '@material-ui/core/styles'
import {
  InputBase,
  Toolbar,
  AppBar,
  Typography,
  IconButton,
  Drawer,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import MenuLink from '../MenuLink'
import NavDrawer from './NavDrawer'
import { capitalize } from '../../../utilities/stringUtils'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    color: '#3F98D8',
  },
  toolbar: {
    background: 'black',
  },
  link: {
    marginRight: theme.spacing(1),
    fontWeight: 'bold',
  },
  padding: {
    flexGrow: 1,
    alignContent: 'right',
  },
}))

//TODO: implement side menu if time allows for mobile navbar
function NavbarMobile({
  modalOpen,
  handleClose,
  handleOpen,
  handleSearchChange,
}) {
  const classes = useStyles()

  const user = useSelector((state) => state.userRed.user)

  const [drawerOpen, setDrawerOpen] = useState(false)

  function handleDrawerOpen() {
    setDrawerOpen(true)
  }

  function handleDrawerClose() {
    setDrawerOpen(false)
  }

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar className={classes.toolbar}>
          <IconButton
            aria-label='navDrawer'
            color='inherit'
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>

          <MenuLink
            name={
              <span>
                Guitar<span className={classes.title}>Finder</span>
              </span>
            }
            address='/'
            title={true}
          />
          <div className={classes.padding}></div>
          {user && (
            <MenuLink
              name={capitalize(user.username)}
              address='/profile'
              title={true}
            />
          )}
        </Toolbar>
      </AppBar>
      <NavDrawer
        drawerOpen={drawerOpen}
        handleDrawerClose={handleDrawerClose}
        modalOpen={modalOpen}
        handleClose={handleClose}
        handleOpen={handleOpen}
        handleSearchChange={handleSearchChange}
      />
    </div>
  )
}

export default NavbarMobile
