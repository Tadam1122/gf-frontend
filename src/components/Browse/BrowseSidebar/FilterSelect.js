import { useState, useEffect } from 'react'
import {
  Typography,
  TableCell,
  TableRow,
  Checkbox,
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

function FilterSelect({
  value,
  activeFilters,
  filterName,
  handleActiveChecked,
}) {
  const classes = useStyles()
  const [checked, setChecked] = useState(false)

  //deselect checked values removed from activeCheck
  useEffect(() => {
    function updateChecked() {
      let found = false
      for (let activeFilter of activeFilters) {
        //filtername found search for value
        if (
          capitalize(activeFilter.name.replace(/([A-Z])/g, ' $1')) ===
          filterName
        ) {
          for (let filterVal of activeFilter.values) {
            //filter value found dont update
            if (filterVal === value) {
              found = true
            }
          }
        }
      }
      if (!found) {
        setChecked(false)
      }
    }
    updateChecked()
  }, [activeFilters, filterName, value])

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
