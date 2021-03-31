import { useState } from 'react'
import {
  Typography,
  TextField,
  TableRow,
  TableCell,
  Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  font: {
    fontSize: '.75em',
  },
  row: {
    borderTop: '1px solid rgba(224, 224, 224, 1)',
  },
  btn: {
    maxWidth: '30px',
    maxHeight: '30px',
    minWidth: '30px',
    minHeight: '30px',
  },

  btnCell: {
    paddingLeft: '3%',
    paddingRight: '3%',
    paddingTop: '9%',
  },
  textCell: {
    paddingLeft: '3%',
    paddingRight: '3%',
  },
}))

function FilterPrice({ values, handlePriceChange }) {
  const classes = useStyles()
  const [minText, setMinText] = useState('')
  const [maxText, setMaxText] = useState('')

  function handleMaxChange(e) {
    // handle max price change
    if (!Number(e.target.value)) {
      e.target.value = e.target.value.substring(0, e.target.value.length - 1)
    }
    setMaxText(e.target.value)
  }

  function handleMinChange(e) {
    // handle min price change
    if (!Number(e.target.value)) {
      e.target.value = e.target.value.substring(0, e.target.value.length - 1)
    }
    setMinText(e.target.value)
  }

  return (
    <>
      <TableRow className={classes.row}>
        <TableCell className={classes.textCell}>
          <TextField
            label={<Typography className={classes.font}>Min</Typography>}
            defaultValue={values[0]}
            size='small'
            onChange={handleMinChange}
          />
        </TableCell>
        <TableCell className={classes.textCell}>
          <TextField
            label={<Typography className={classes.font}>Max</Typography>}
            defaultValue={values[1]}
            size='small'
            onChange={handleMaxChange}
          />
        </TableCell>
        <TableCell className={classes.btnCell}>
          <Button
            className={classes.btn}
            variant='contained'
            color='primary'
            size='small'
            onClick={(_) => handlePriceChange(minText, maxText)}
          >
            Go
          </Button>
        </TableCell>
      </TableRow>
    </>
  )
}

export default FilterPrice
