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
  },

  image: {
    width: '100%',
    height: '100%',
  },
  button: {
    width: '100%',
  },
  text: {
    marginRight: '40%',
  },
  exitBtn: {
    marginLeft: '95%',
  },
}))
//TODO: create links for browsing categories
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
            <Grid container direction='row' spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <ButtonBase className={classes.button}>
                  {/* Grid for image and text in button */}
                  <Grid
                    container
                    direction='row'
                    justify='flex-start'
                    alignItems='center'
                    spacing={1}
                  >
                    <Grid item xs={5} sm={5} md={1} lg={1} xl={1}>
                      <img
                        style={{ objectFit: 'cover' }}
                        src={acousticGuitar}
                        alt='Acoustic Guitar Design'
                      />
                    </Grid>
                    <Grid item xs={7} sm={7} md={11} lg={11} xl={11}>
                      <Typography variant='h5' className={classes.text}>
                        Acoustic Guitars
                      </Typography>
                    </Grid>
                  </Grid>
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <ButtonBase className={classes.button}>
                  {/* Grid for image and text in button */}
                  <Grid
                    container
                    direction='row'
                    justify='flex-start'
                    alignItems='center'
                    spacing={1}
                  >
                    <Grid item xs={5} sm={5} md={1} lg={1} xl={1}>
                      <img
                        style={{ objectFit: 'cover' }}
                        src={electricGuitar}
                        alt='Electric Guitar Design'
                      />
                    </Grid>
                    <Grid item xs={7} sm={7} md={11} lg={11} xl={11}>
                      <Typography variant='h5' className={classes.text}>
                        Electric Guitars
                      </Typography>
                    </Grid>
                  </Grid>
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <ButtonBase className={classes.button}>
                  {/* Grid for image and text in button */}
                  <Grid
                    container
                    direction='row'
                    justify='flex-start'
                    alignItems='center'
                    spacing={1}
                  >
                    <Grid item xs={5} sm={5} md={1} lg={1} xl={1}>
                      <img
                        style={{ objectFit: 'cover' }}
                        src={acousticAmp}
                        alt='Acoustic Amp Design'
                      />
                    </Grid>
                    <Grid item xs={7} sm={7} md={11} lg={11} xl={11}>
                      <Typography variant='h5' className={classes.text}>
                        Acoustic Amps
                      </Typography>
                    </Grid>
                  </Grid>
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <ButtonBase className={classes.button}>
                  {/* Grid for image and text in button */}
                  <Grid
                    container
                    direction='row'
                    justify='flex-start'
                    alignItems='center'
                    spacing={1}
                  >
                    <Grid item xs={5} sm={5} md={1} lg={1} xl={1}>
                      <img
                        style={{ objectFit: 'cover' }}
                        src={electricAmp}
                        alt='Electric Amp Design'
                      />
                    </Grid>
                    <Grid item xs={7} sm={7} md={11} lg={11} xl={11}>
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
              alignItems='center'
              spacing={1}
            >
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <ButtonBase className={classes.button}>
                  {/* Grid for image and text in button */}
                  <Grid
                    container
                    direction='row'
                    justify='flex-start'
                    alignItems='center'
                    spacing={1}
                  >
                    <Grid item xs={5} sm={5} md={6} lg={6} xl={6}>
                      <img
                        style={{ objectFit: 'cover' }}
                        src={effectPedal}
                        alt='Effect Pedal Design'
                      />
                    </Grid>
                    <Grid item xs={7} sm={7} md={6} lg={6} xl={6}>
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
