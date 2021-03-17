import { makeStyles } from '@material-ui/core/styles'
import { Toolbar, AppBar, MenuItem } from '@material-ui/core'
import MenuLink from './MenuLink'
import Searchbar from './Searchbar'
import BrowseModal from '../Browse/BrowseModal/BrowseModal'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
  },
}))

function NavbarDesktop({ modalOpen, handleClose, handleOpen }) {
  const classes = useStyles()
  const loggedOn = true //TODO: set this as state when authentication on frontend implemented

  return (
    <div className={classes.root}>
      <AppBar position='static' elevation={0}>
        <Toolbar className={classes.toolbar}>
          <MenuLink
            name={
              <span>
                Guitar<span style={{ color: '#3F98D8' }}>Finder</span>
              </span>
            }
            address='/'
            title={true}
          />
          <MenuLink name='Home' address='/' />
          {/* Custom menu link for browser modal */}
          <MenuItem className={classes.link} onClick={handleOpen}>
            Browse Gear
          </MenuItem>
          <BrowseModal modalOpen={modalOpen} handleClose={handleClose} />
          {/* <MenuLink name='Browse Gear' address='/browse' /> */}
          <Searchbar />
          <div className={classes.padding} />
          {!loggedOn ? (
            <>
              <MenuLink name='Login' address='/login' />
              <MenuLink name='Register' address='/register' />
            </>
          ) : (
            <>
              {/* TODO: make username dynamic */}
              <MenuLink name='Username' address='/profile' />
              <MenuLink name='Logout' address='/' />
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavbarDesktop
