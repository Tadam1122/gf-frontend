import { useState } from 'react'
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

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '1rem',
    background: '#fff',
    borderRadius: '15px',
    marginTop: '35%',
  },
  TextField: {
    margin: 8,
    width: '95%',
  },
}))

//TODO: implement register functionalities
function Register({ handleRegister, errors }) {
  const classes = useStyles()
  const history = useHistory()
  const [username, changeUsername] = useState('')
  const [email, changeEmail] = useState('')
  const [password, changePassword] = useState('')
  const [repeatPassword, changeRepeatPassword] = useState('')

  const emailReg = /^\S+@\S+[.]\S+[^@.,!@#$%^&*()_+<>/?|]$/ //basic regex for email syntax

  const repeatPasswordError = repeatPassword !== password
  const emailError = !emailReg.test(email) && email.length > 0

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
          <Errors errors={errors} />

          <Grid item>
            <TextField
              id='username'
              label='Username'
              fullWidth
              className={classes.TextField}
              onChange={handleUsernameChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id='email'
              label='Email Address'
              type='email'
              className={classes.TextField}
              onChange={handleEmailChange}
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              id='password'
              label='Password'
              type='password'
              className={classes.TextField}
              onChange={handlePasswordChange}
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              id='retypePassword'
              label='Retype Password'
              type='password'
              className={classes.TextField}
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
              // onClick={() => handleRegister(username, password, email, history)}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Grow>
    </Container>
  )
}

export default Register
