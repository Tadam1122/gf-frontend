import { Link } from 'react-router-dom'
import {
  Modal,
  Fade,
  Backdrop,
  Container,
  Grid,
  Typography,
  ButtonBase,
  IconButton,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ClearIcon from '@material-ui/icons/Clear'
import acousticGuitar from './acousticGuitar.svg'
import effectPedal from './effectPedal.svg'
import electricGuitar from './electricGuitar.svg'
import acousticAmp from './acousticAmp.svg'
import electricAmp from './electricAmp.svg'

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    flexGrow: 1,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: '10%',
    left: '10%',
    overflow: 'scroll',
  },

  image: {
    width: '100%',
    height: '100%',
  },
  button: {
    width: '100%',
    padding: '.2rem',
    border: '1px solid #979797',
    borderRadius: '15px',
    display: 'block',
  },
  text: {
    marginRight: '40%',
  },
  exitBtn: {
    marginLeft: '95%',
  },
}))

function BrowseModal({ modalOpen, handleClose }) {
  const classes = useStyles()
  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby='browse-gear'
      aria-describedby='select category of gear to browse'
      className={classes.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 400 }}
    >
      <Fade in={modalOpen}>
        <div className={classes.container}>
          <Container justify='center'>
            <IconButton
              color='primary'
              aria-label='exit'
              className={classes.exitBtn}
              onClick={handleClose}
            >
              <ClearIcon fontSize='large' />
            </IconButton>
            {/* Grid container for buttones */}
            <Grid
              container
              direction='row'
              justify='center'
              align='center'
              spacing={3}
            >
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <ButtonBase
                  component={Link}
                  to='/browse/acoustic-guitars'
                  onClick={handleClose}
                  className={classes.button}
                >
                  {/* Grid for image and text in button */}
                  <Grid
                    container
                    direction='row'
                    justify='center'
                    alignItems='center'
                    spacing={1}
                  >
                    <Grid item xs={5} sm={5} md={2} lg={2} xl={2}>
                      <img
                        style={{ objectFit: 'cover' }}
                        src={acousticGuitar}
                        alt='Acoustic Guitar Design'
                        draggable={false}
                      />
                    </Grid>
                    <Grid item xs={7} sm={7} md={10} lg={10} xl={10}>
                      <Typography variant='h5' className={classes.text}>
                        Acoustic Guitars
                      </Typography>
                    </Grid>
                  </Grid>
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <ButtonBase
                  className={classes.button}
                  component={Link}
                  to='/browse/electric-guitars'
                  onClick={handleClose}
                >
                  {/* Grid for image and text in button */}
                  <Grid
                    container
                    direction='row'
                    justify='center'
                    alignItems='center'
                    spacing={1}
                  >
                    <Grid item xs={5} sm={5} md={2} lg={2} xl={2}>
                      <img
                        style={{ objectFit: 'cover' }}
                        src={electricGuitar}
                        alt='Electric Guitar Design'
                        draggable={false}
                      />
                    </Grid>
                    <Grid item xs={7} sm={7} md={10} lg={10} xl={10}>
                      <Typography variant='h5' className={classes.text}>
                        Electric Guitars
                      </Typography>
                    </Grid>
                  </Grid>
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <ButtonBase
                  className={classes.button}
                  component={Link}
                  to='/browse/acoustic-amps'
                  onClick={handleClose}
                >
                  {/* Grid for image and text in button */}
                  <Grid
                    container
                    direction='row'
                    justify='center'
                    alignItems='center'
                    spacing={1}
                  >
                    <Grid item xs={5} sm={5} md={2} lg={2} xl={2}>
                      <img
                        style={{ objectFit: 'cover' }}
                        src={acousticAmp}
                        alt='Acoustic Amp Design'
                        draggable={false}
                      />
                    </Grid>
                    <Grid item xs={7} sm={7} md={10} lg={10} xl={10}>
                      <Typography variant='h5' className={classes.text}>
                        Acoustic Amps
                      </Typography>
                    </Grid>
                  </Grid>
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <ButtonBase
                  className={classes.button}
                  component={Link}
                  to='/browse/electric-amps'
                  onClick={handleClose}
                >
                  {/* Grid for image and text in button */}
                  <Grid
                    container
                    direction='row'
                    justify='center'
                    alignItems='center'
                    spacing={1}
                  >
                    <Grid item xs={5} sm={5} md={2} lg={2} xl={2}>
                      <img
                        style={{ objectFit: 'cover' }}
                        src={electricAmp}
                        alt='Electric Amp Design'
                        draggable={false}
                      />
                    </Grid>
                    <Grid item xs={7} sm={7} md={10} lg={10} xl={10}>
                      <Typography variant='h5' className={classes.text}>
                        Electric Amps
                      </Typography>
                    </Grid>
                  </Grid>
                </ButtonBase>
              </Grid>
            </Grid>
            <Grid
              container
              direction='row'
              justify='center'
              align='center'
              spacing={1}
              classs={classes.breakpoint}
            >
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={6}
                style={{ marginTop: '1rem' }}
              >
                <ButtonBase
                  className={classes.button}
                  component={Link}
                  to='/browse/effect-pedals'
                  onClick={handleClose}
                >
                  {/* Grid for image and text in button */}
                  <Grid
                    container
                    direction='row'
                    justify='center'
                    alignItems='center'
                    spacing={1}
                  >
                    <Grid item xs={5} sm={5} md={2} lg={2} xl={2}>
                      <img
                        style={{ objectFit: 'cover' }}
                        src={effectPedal}
                        alt='Effect Pedal Design'
                        draggable={false}
                      />
                    </Grid>
                    <Grid item xs={7} sm={7} md={10} lg={10} xl={10}>
                      <Typography variant='h5' className={classes.text}>
                        Effect Pedals
                      </Typography>
                    </Grid>
                  </Grid>
                </ButtonBase>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Fade>
    </Modal>
  )
}

export default BrowseModal
