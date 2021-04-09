import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Route, Redirect } from 'react-router-dom'
import { Grid, Container, Grow, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import UserForm from './UserForm'
import WishlistTable from './WishlistTable/WishlistTable'
import Success from '../Auth/Success'
import { clearSuccess } from '../../actions/successActions'
import { clearError } from '../../actions/errorActions'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '90%',
    paddingTop: '2rem',
  },
}))

function Profile() {
  const classes = useStyles()
  const history = useHistory()
  const user = useSelector((state) => state.userRed.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearSuccess())
    dispatch(clearError())
  }, [dispatch])

  // TODO: create component viewing individual items for a single wishlist, user can delete the whole wishlist or items in wishlist from page
  // TODO: wishlist rows will also need to get items from db since only id is being stored in wishlists, unless I choose to store the whole product
  return (
    <Route
      render={() =>
        user ? (
          <Container className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Success />
              </Grid>
              <Grow in={true}>
                <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                  <UserForm />
                </Grid>
              </Grow>
              <Grow
                in={true}
                style={{ transformOrigin: '0 0 0' }}
                {...{ timeout: 1000 }}
              >
                <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
                  <WishlistTable history={history} />
                </Grid>
              </Grow>
            </Grid>
          </Container>
        ) : (
          <Redirect to={{ pathname: '/' }} />
        )
      }
    />
  )
}

export default Profile
