import { useState } from 'react'
import {
  Modal,
  Fade,
  Backdrop,
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
  Grow,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ClearIcon from '@material-ui/icons/Clear'

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '50%',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: '10%',
    left: '10%',
  },
  button: {
    width: '80%',
    display: 'block',
  },
  text: {
    width: '70%',
    marginBottom: '1rem',
  },
  grid: {
    paddingTop: '2rem',
    marginBottom: '1rem',
  },
  exitBtn: {
    marginLeft: '95%',
  },
}))

// TODO: components to create, modalTableRow
function DeleteModal({
  modalOpen,
  handleClose,
  wishlist,
  handleDeleteWishlist,
}) {
  const classes = useStyles()

  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby='delete-wishlist'
      aria-describedby='delete a wishlist'
      className={classes.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 400 }}
    >
      <Fade in={modalOpen}>
        <div className={classes.container}>
          <Grow in={true}>
            <Container justify='center'>
              <IconButton
                color='primary'
                aria-label='exit'
                className={classes.exitBtn}
                onClick={handleClose}
              >
                <ClearIcon fontSize='large' />
              </IconButton>
              <Grid container justify='center' align='center'>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Typography className={classes.text} variant='h4'>
                    Are you sure you want to delete wishlist '{wishlist.name}'?
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                  className={classes.grid}
                >
                  <Button
                    className={classes.button}
                    variant='contained'
                    color='secondary'
                    size='large'
                    disableElevation
                    onClick={handleDeleteWishlist}
                  >
                    <Typography variant='h6'>Yes</Typography>
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                  className={classes.grid}
                >
                  <Button
                    className={classes.button}
                    variant='contained'
                    color='primary'
                    size='large'
                    disableElevation
                    onClick={handleClose}
                  >
                    <Typography variant='h6'>No</Typography>
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </Grow>
        </div>
      </Fade>
    </Modal>
  )
}

export default DeleteModal
