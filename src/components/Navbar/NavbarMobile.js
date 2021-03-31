import { Link, Route } from 'react-router-dom'
import { makeStyles, fade } from '@material-ui/core/styles'
import {
  InputBase,
  Toolbar,
  AppBar,
  Typography,
  IconButton,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    background: 'black',
  },
  title: {
    flexGrow: 1,
    fontWeight: 'bolder',
  },
  links: {
    marginRight: theme.spacing(3),
    verticalAlign: 'auto',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  padding: {
    flexGrow: 1,
  },
}))

//TODO: implement side menu if time allows for mobile navbar
function NavbarMobile() {
  const classes = useStyles()
  const loggedOn = false
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h4' className={classes.title}>
            Guitar<span style={{ color: '#3F98D8' }}>Finder</span>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavbarMobile
