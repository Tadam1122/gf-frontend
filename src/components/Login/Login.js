import {
  TextField,
  Typography,
  Button,
  Container,
  Grid,
  Grow,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

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

//TODO: implement login functionalities
function Login({ handleLogin }) {
  const classes = useStyles()
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
            <Typography variant='h3'>Login</Typography>
          </Grid>
          <Grid item>
            <TextField
              id='username'
              label='Username'
              fullWidth
              className={classes.TextField}
            />
          </Grid>
          <Grid item>
            <TextField
              id='password'
              label='Password'
              type='password'
              className={classes.TextField}
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
