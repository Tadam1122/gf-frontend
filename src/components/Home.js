import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Typography,
  Button,
  Container,
  Box,
  Grow,
} from '@material-ui/core'
import guitarHome from '../guitarDesign.svg'
import BrowseModal from './Browse/BrowseModal/BrowseModal'
import { clearError } from '../actions/errorActions'
import { clearSuccess } from '../actions/successActions'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '90%',
    paddingTop: '10%',
  },
  title: {
    fontWeight: 350,
  },
  subText: {
    fontWeight: 'lighter',
    color: '#757575',
  },
  image: {
    display: 'block',
    height: '100%',
    width: '100%',
  },
  box: {
    borderRadius: '3%',
    [theme.breakpoints.down('sm')]: {
      marginTop: '1.5rem',
    },
  },
}))

function Home({ modalOpen, handleClose, handleOpen }) {
  const classes = useStyles()
  const dispatch = useDispatch()

  // clear any errors or success messages
  useEffect(() => {
    dispatch(clearSuccess())
    dispatch(clearError())
  }, [dispatch])

  return (
    <Container>
      <Grid
        container
        direction='row'
        justify='center'
        spacing={1}
        className={classes.root}
      >
        <Grow in={true}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Typography variant='h6' className={classes.subText}>
              Search, Compare, Own!
            </Typography>
            <Typography variant='h2' className={classes.title}>
              Find Your Guitar Gear Quick And Easy.
            </Typography>
            <Button
              variant='contained'
              size='large'
              color='primary'
              disableElevation
              onClick={handleOpen}
              style={{ marginTop: '2rem' }}
            >
              Begin Browsing
            </Button>
            <BrowseModal modalOpen={modalOpen} handleClose={handleClose} />
          </Grid>
        </Grow>
        <Grow
          in={true}
          style={{ transformOrigin: '0 0 0' }}
          {...{ timeout: 1000 }}
        >
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} align='center'>
            <Box boxShadow={3} className={classes.box}>
              <img
                style={{ objectFit: 'cover' }}
                src={guitarHome}
                alt='Gutiar Browser Design'
                className={classes.image}
                draggable={false}
              />
            </Box>
          </Grid>
        </Grow>
      </Grid>
    </Container>
  )
}

export default Home
