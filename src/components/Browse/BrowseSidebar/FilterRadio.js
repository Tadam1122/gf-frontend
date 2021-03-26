import { useState, useEffect } from 'react'
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
import { capitalize } from '../../../utilities/stringUtils'

const useStyles = makeStyles((theme) => ({
  font: {
    fontSize: '.75em',
  },
}))

function FilterRadio({ value, activeRadio, filterName, handleRadioSelect }) {
  const classes = useStyles()
  const [radioVal, setRadioVal] = useState('')

  //deselect radio values removed from active radio
  useEffect(() => {
    function updateRadio() {
      const found = activeRadio.filter(
        (radio) =>
          capitalize(radio.name.replace(/([A-Z])/g, ' $1')) === filterName
      )
      if (found.length === 0) {
        setRadioVal('')
      }
    }
    updateRadio()
  }, [activeRadio, filterName])

  function handleClick(eventVal) {
    if (eventVal === radioVal) {
      setRadioVal('')
    } else {
      setRadioVal(eventVal)
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
                      handleClick(event.target.value)
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
                      handleClick(event.target.value)
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
