import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  TextField,
  Typography,
  Button,
  Container,
  Grid,
  Grow,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Errors from './Errors'
import { loginUser } from '../../actions/userActions'
import { clearError } from '../../actions/errorActions'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '1rem',
    background: '#fff',
    borderRadius: '15px',
    marginTop: '35%',
  },
  textfield: {
    margin: 8,
    width: '95%',
  },
}))

function Login() {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  //textfield state vars
  const [username, changeUsername] = useState(' ')
  const [password, changePassword] = useState(' ')

  //error values for textfields
  const usernameError = username.length > 0 ? false : true
  const passwordError = password.length > 0 ? false : true

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  function handleUsernameChange(event) {
    changeUsername(event.target.value)
  }

  function handlePasswordChange(event) {
    changePassword(event.target.value)
  }

  return (
    <Container maxWidth='sm'>
      <Grow in={true}>
        <Grid
          container
          direction='column'
          justify='center'
          align='center'
          spacing={3}
          className={classes.root}
        >
          <Grid item>
            <Typography variant='h3'>Login</Typography>
          </Grid>
          <Errors />
          <Grid item>
            <TextField
              id='username'
              label='Username'
              fullWidth
              className={classes.textfield}
              onChange={handleUsernameChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id='password'
              label='Password'
              type='password'
              className={classes.textfield}
              onChange={handlePasswordChange}
              fullWidth
            />
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              color='primary'
              size='large'
              disableElevation
              fullWidth
              disabled={usernameError || passwordError}
              // eslint-disable-next-line
              onClick={() =>
                dispatch(
                  loginUser({ username: username, password: password }, history)
                )
              }
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Grow>
    </Container>
  )
}

export default Login
