import { useSelector } from 'react-redux'
import { Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  text: {
    color: '#388e3c',
  },
}))

function Success() {
  const classes = useStyles()
  const success = useSelector((state) => state.successRed.success)
  return (
    <Grid item>
      <Typography variant='body2' className={classes.text}>
        {success}
      </Typography>
    </Grid>
  )
}

export default Success
