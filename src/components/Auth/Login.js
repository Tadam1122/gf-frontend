import { useState, useEffect } from 'react'
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
  textfield: {
    margin: 8,
    width: '95%',
  },
}))

function Login({ handleLogin, errors, setErrors }) {
  const classes = useStyles()
  // eslint-disable-next-line
  const history = useHistory()
  const [username, changeUsername] = useState(' ')
  const [password, changePassword] = useState(' ')

  const usernameError = username.length > 0 ? false : true
  const passwordError = password.length > 0 ? false : true

  useEffect(() => {
    setErrors([])
  }, [setErrors])

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
          <Errors errors={errors} />
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
              onClick={() => handleLogin(username, password, history)}
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
