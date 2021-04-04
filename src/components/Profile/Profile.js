import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Container, Grow, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import UserForm from './UserForm'
import WishlistTable from './WishlistTable'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '90%',
    paddingTop: '2rem',
  },
  success: {
    color: '#1c793e',
    textAlign: 'center',
    marginTop: '1rem',
  },
}))

function Profile({
  isLoggedIn,
  username,
  wishlists,
  errors,
  successMessage,
  setErrors,
  handleUserUpdate,
  setSuccessMessage,
}) {
  const classes = useStyles()
  const history = useHistory()

  useEffect(() => {
    if (!isLoggedIn) {
      history.push('/')
    }
  }, [isLoggedIn, history])

  useEffect(() => {
    setErrors([])
    setSuccessMessage('')
  }, [setErrors, setSuccessMessage])

  // TODO: create component viewing individual items for a single wishlist, user can delete the whole wishlist or items in wishlist from page
  // TODO: wishlist rows will also need to get items from db since only id is being stored in wishlists, unless I choose to store the whole product
  return (
    <Container className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {successMessage ? (
            <Typography variant='subtitle2' className={classes.success}>
              {successMessage}
            </Typography>
          ) : (
            <Typography className={classes.success}> </Typography>
          )}
        </Grid>
        <Grow in={true}>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
            <UserForm
              username={username}
              wishlists={wishlists}
              handleUserUpdate={handleUserUpdate}
              errors={errors}
            />
          </Grid>
        </Grow>
        <Grow
          in={true}
          style={{ transformOrigin: '0 0 0' }}
          {...{ timeout: 1000 }}
        >
          <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
            <WishlistTable
              isLoggedIn={isLoggedIn}
              username={username}
              history={history}
              wishlists={wishlists}
              handleUserUpdate={handleUserUpdate}
            />
          </Grid>
        </Grow>
      </Grid>
    </Container>
  )
}

export default Profile
