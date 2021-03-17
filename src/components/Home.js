import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography, Button, Container, Box } from '@material-ui/core'
import guitarHome from '../guitarDesign.svg'
import BrowseModal from './Browse/BrowseModal/BrowseModal'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '90%',
    paddingTop: '10%',
  },

  subText: {
    fontWeight: 'lighter',
    color: '#979797',
  },
  image: {
    display: 'block',
    height: '100%',
    width: '100%',
  },
  box: {
    borderRadius: '3%',
  },
}))

function Home({ modalOpen, handleClose, handleOpen }) {
  const classes = useStyles()

  return (
    <Container justify='center'>
      <Grid container direction='row' spacing={1} className={classes.root}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Typography variant='h6' className={classes.subText}>
            Search, Compare, Own!
          </Typography>
          <Typography variant='h2'>
            Find Your Guitar Gear Quick And Easy.
          </Typography>
          <Button
            variant='contained'
            size='large'
            color='primary'
            disableElevation
            onClick={handleOpen}
          >
            Begin Browsing
          </Button>
          <BrowseModal modalOpen={modalOpen} handleClose={handleClose} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} align='center'>
          <Box boxShadow={3} className={classes.box}>
            <img
              style={{ objectFit: 'cover' }}
              src={guitarHome}
              alt='Gutiar Browser Design'
              className={classes.image}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home
