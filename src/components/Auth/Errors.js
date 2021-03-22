import { Grid, Typography } from '@material-ui/core'

function Errors({ errors }) {
  if (errors.length > 0) {
    return (
      <Grid item>
        {errors.map((error) => (
          <Typography variant='body2' color='secondary' key={error.message}>
            {error.message}.
          </Typography>
        ))}
      </Grid>
    )
  } else {
    return <></>
  }
}
export default Errors
