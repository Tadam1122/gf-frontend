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
import { registerUser } from '../../actions/userActions'
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

// TODO: look into cognito for email verification
function Register() {
  const classes = useStyles()
  const history = useHistory()

  const dispatch = useDispatch()

  //textfield state vars
  const [username, changeUsername] = useState('')
  const [email, changeEmail] = useState('')
  const [password, changePassword] = useState('')
  const [repeatPassword, changeRepeatPassword] = useState('')

  const emailReg = /^\S+@\S+[.]\S+[^@.,!@#$%^&*()_+<>/?|]$/ //basic regex for email syntax

  //error values for textfields
  const repeatPasswordError = repeatPassword !== password
  const emailError = !emailReg.test(email) && email.length > 0

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  function handleUsernameChange(event) {
    changeUsername(event.target.value)
  }
  function handleEmailChange(event) {
    changeEmail(event.target.value)
  }

  function handlePasswordChange(event) {
    changePassword(event.target.value)
  }

  function handleRepeatPasswordChange(event) {
    changeRepeatPassword(event.target.value)
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
          <Grid>
            <Typography variant='h3'>Register</Typography>
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
              id='email'
              label='Email Address'
              type='email'
              className={classes.textfield}
              onChange={handleEmailChange}
              fullWidth
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
            <TextField
              id='retypePassword'
              label='Retype Password'
              type='password'
              className={classes.textfield}
              error={repeatPasswordError}
              helperText={repeatPasswordError && 'Passwords must match.'}
              onChange={handleRepeatPasswordChange}
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
              disabled={repeatPasswordError || emailError}
              onClick={() =>
                dispatch(
                  registerUser(
                    { username: username, password: password, email: email },
                    history
                  )
                )
              }
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </Grow>
    </Container>
  )
}

export default Register
