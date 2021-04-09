import { useSelector } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'

function Errors() {
  const errors = useSelector((state) => state.errorsRed.errors)
  if (errors) {
    return (
      <Grid item>
        {errors.map((error) => (
          <Typography variant='body2' color='secondary' key={error.message}>
            {error.message}
          </Typography>
        ))}
      </Grid>
    )
  } else {
    return <></>
  }
}
export default Errors
