import { Link } from 'react-router-dom'
import { MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  link: {
    marginRight: theme.spacing(1),
    fontWeight: 'bold',
  },
  title: {
    marginRight: theme.spacing(1),
    fontSize: '1.6em',
    fontWeight: 'bolder',
    // width: 'fit-content',
  },
}))

function MenuLink({ name, address, title }) {
  // let history = useHistory()
  const classes = useStyles()

  return (
    <MenuItem
      component={Link}
      to={address}
      className={title ? classes.title : classes.link}
    >
      {name}
    </MenuItem>
  )
}

MenuLink.defaultProps = {
  title: false,
  address: '/',
}

export default MenuLink
