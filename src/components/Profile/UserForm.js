import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Typography, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Errors from '../Auth/Errors'
import { updateUser } from '../../actions/userActions'

const useStyles = makeStyles((theme) => ({
  textfield: {
    margin: 8,
    width: '95%',
  },
  title: {
    fontWeight: '370',
  },
  form: {
    background: '#fff',
    padding: '1rem',
    paddingBottom: '1.5rem',
    borderRadius: '15px',
  },
  button: {
    marginTop: '3rem',
  },
}))
function UserForm() {
  const classes = useStyles()
  const user = useSelector((state) => state.userRed.user)
  const dispatch = useDispatch()

  //textfield state variables
  const [username, changeUsername] = useState('')
  const [email, changeEmail] = useState('')
  const [password, changePassword] = useState('')
  const [repeatPassword, changeRepeatPassword] = useState('')

  const emailReg = /^\S+@\S+[.]\S+[^@.,!@#$%^&*()_+<>/?|]$/ //basic regex for email syntax

  //textField errors
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
    <form className={classes.form}>
      <Typography variant='h2' className={classes.title}>
        {user.username}
      </Typography>
      <Errors />
      <TextField
        id='username'
        label='Change Username'
        type='username'
        className={classes.textfield}
        onChange={handleUsernameChange}
        fullWidth
      />
      <TextField
        id='email'
        label='Change Email Address'
        type='email'
        className={classes.textfield}
        onChange={handleEmailChange}
        fullWidth
      />
      <TextField
        id='password'
        label='Change Password'
        type='password'
        className={classes.textfield}
        onChange={handlePasswordChange}
        fullWidth
      />
      <TextField
        id='retypePassword'
        label='Retype Password'
        type='password'
        className={classes.textfield}
        error={repeatPasswordError}
        onChange={handleRepeatPasswordChange}
        fullWidth
      />
      <Button
        variant='contained'
        color='primary'
        size='large'
        disableElevation
        fullWidth
        className={classes.button}
        disabled={repeatPasswordError || emailError}
        onClick={(_) =>
          dispatch(updateUser(user.wishlists, username, password, email))
        }
      >
        Submit Changes
      </Button>
    </form>
  )
}

export default UserForm
