import { useState } from 'react'
import {
  Typography,
  TableRow,
  TableCell,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  font: {
    fontSize: '.75em',
  },
}))

function FilterRadio({ value, filterName, handleRadioSelect }) {
  const classes = useStyles()
  const [radioVal, setRadioVal] = useState('')

  function handleClick(event) {
    if (event.target.value === radioVal) {
      setRadioVal('')
    } else {
      setRadioVal(event.target.value)
    }
  }

  return (
    <>
      <TableRow hover>
        <TableCell>
          <FormControl component='fieldset'>
            <RadioGroup aria-label={value} value={radioVal}>
              <FormControlLabel
                value='yes'
                control={
                  <Radio
                    color='primary'
                    onClick={(event) => {
                      handleClick(event)
                      handleRadioSelect(event.target.value, filterName)
                    }}
                  />
                }
                label={
                  <Typography className={classes.font} variant='body2'>
                    Yes
                  </Typography>
                }
              />
            </RadioGroup>
          </FormControl>
        </TableCell>
      </TableRow>
      <TableRow hover>
        <TableCell>
          <FormControl component='fieldset'>
            <RadioGroup aria-label={value} value={radioVal}>
              <FormControlLabel
                value='no'
                control={
                  <Radio
                    color='primary'
                    onClick={(event) => {
                      handleClick(event)
                      handleRadioSelect(event.target.value, filterName)
                    }}
                  />
                }
                label={
                  <Typography className={classes.font} variant='body2'>
                    No
                  </Typography>
                }
              />
            </RadioGroup>
          </FormControl>
        </TableCell>
      </TableRow>
    </>
  )
}

export default FilterRadio
