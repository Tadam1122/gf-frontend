import { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Drawer, List, Divider, MenuItem } from '@material-ui/core'
import Searchbar from '../Searchbar'
import MenuLink from '../MenuLink'
import BrowseModal from '../../Browse/BrowseModal/BrowseModal'
import { logoutUser } from '../../../actions/userActions'
import { capitalize } from '../../../utilities/stringUtils'

const useStyles = makeStyles((theme) => ({
  fullList: {
    width: 'auto',
  },
  list: {
    background: '#f7f7f7',
    width: 250,
  },
  link: {
    marginRight: theme.spacing(1),
    fontWeight: 'bold',
  },
}))

function NavDrawer({
  drawerOpen,
  handleDrawerClose,
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
    <div>
      <Fragment key='left'>
        <Drawer anchor='left' open={drawerOpen} onClose={handleDrawerClose}>
          <List className={classes.drawer}>
            <Searchbar
              handleSearchChange={(e) => {
                e.key === 'Enter' && handleDrawerClose()
                handleSearchChange(e, history)
              }}
            />
          </List>
          <Divider />
          <List className={classes.drawer} onClick={handleDrawerClose}>
            <MenuLink name='Home' address='/' />
          </List>
          <List className={classes.drawer}>
            <MenuItem className={classes.link} onClick={handleOpen}>
              Browse Gear
            </MenuItem>
            <BrowseModal
              modalOpen={modalOpen}
              handleClose={handleClose}
              handleDrawerClose={handleDrawerClose}
            />
          </List>
          <Divider />
          <List className={classes.drawer} onClick={handleDrawerClose}>
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
          </List>
        </Drawer>
      </Fragment>
    </div>
  )
}

export default NavDrawer
