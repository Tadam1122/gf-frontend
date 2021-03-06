import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Toolbar, AppBar, MenuItem } from '@material-ui/core'
import MenuLink from './MenuLink'
import Searchbar from './Searchbar'
import BrowseModal from '../Browse/BrowseModal/BrowseModal'
import { logoutUser } from '../../actions/userActions'
import { capitalize } from '../../utilities/stringUtils'

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
  },
}))

function NavbarDesktop({
  modalOpen,
  handleClose,
  handleOpen,
  handleSearchChange,
}) {
  const classes = useStyles()
  const history = useHistory()

  const user = useSelector((state) => state.userRed.user)
  const dispatch = useDispatch()

  //logout user
  function handleLogout() {
    dispatch(logoutUser())
  }

  return (
    <div className={classes.root}>
      <AppBar position='static' elevation={0}>
        <Toolbar className={classes.toolbar}>
          <MenuLink
            name={
              <span>
                Guitar<span className={classes.title}>Finder</span>
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
          <Searchbar
            handleSearchChange={(e) => handleSearchChange(e, history)}
          />
          <div className={classes.padding} />
          {!user ? (
            <>
              <MenuLink name='Login' address='/login' />
              <MenuLink name='Register' address='/register' />
            </>
          ) : (
            <>
              <MenuLink name={capitalize(user.username)} address='/profile' />
              <MenuItem
                component={Link}
                to='/'
                className={classes.link}
                onClick={handleLogout}
              >
                Logout
              </MenuItem>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavbarDesktop
