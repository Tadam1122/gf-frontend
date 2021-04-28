import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
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
import Success from './Success'
import { resendEmail } from '../../actions/userActions'
import { clearError } from '../../actions/errorActions'
import { clearSuccess } from '../../actions/successActions'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '1rem',
    background: '#fff',
    borderRadius: '15px',
    marginTop: '15vh',
  },
  textfield: {
    margin: 8,
    width: '95%',
  },
}))

function ResendEmail() {
  const classes = useStyles()

  const dispatch = useDispatch()

  const [email, changeEmail] = useState('')
  const emailReg = /^\S+@\S+[.]\S+[^@.,!@#$%^&*()_+<>/?|]$/ //basic regex for email syntax
  const emailError = !emailReg.test(email) && email.length > 0

  function handleEmailChange(event) {
    changeEmail(event.target.value)
  }

  useEffect(() => {
    dispatch(clearError())
    dispatch(clearSuccess())
  }, [dispatch])

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
            <Typography variant='h3'>Resend Email</Typography>
          </Grid>
          <Errors />
          <Success />
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
            <Button
              variant='contained'
              color='primary'
              size='large'
              disableElevation
              fullWidth
              disabled={emailError}
              onClick={() => dispatch(resendEmail(email))}
            >
              Resend Email
            </Button>
          </Grid>
        </Grid>
      </Grow>
    </Container>
  )
}

export default ResendEmail
