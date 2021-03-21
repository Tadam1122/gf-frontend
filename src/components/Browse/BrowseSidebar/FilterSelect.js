import { useState } from 'react'
import {
  Typography,
  TableCell,
  TableRow,
  Checkbox,
  FormControl,
  FormControlLabel,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  font: {
    fontSize: '.75em',
  },
}))

function FilterSelect({ value, filterName, handleActiveChecked }) {
  const classes = useStyles()
  const [checked, setChecked] = useState(false)

  function handleCheck() {
    setChecked(!checked)
  }

  return (
    <TableRow hover>
      <TableCell>
        <FormControl component='fieldset'>
          <FormControlLabel
            value={value}
            label={
              <Typography className={classes.font} variant='body2'>
                {value}
              </Typography>
            }
            className={classes.font}
            control={
              <Checkbox
                checked={checked}
                onChange={(event) => {
                  handleCheck()
                  handleActiveChecked(event.target.value, filterName)
                }}
                color='primary'
                name={value}
              />
            }
          />
        </FormControl>
      </TableCell>
    </TableRow>
  )
}

export default FilterSelect
