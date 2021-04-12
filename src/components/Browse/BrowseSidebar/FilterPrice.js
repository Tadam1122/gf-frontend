import { useState, useEffect } from 'react'
import {
  Typography,
  TextField,
  TableRow,
  TableCell,
  Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'

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
  const activePrice = useSelector((state) => state.filtersRed.activePrice)
  const [minText, setMinText] = useState('')
  const [maxText, setMaxText] = useState('')

  //deselect price values removed from active price
  useEffect(() => {
    function updatePrice() {
      if (activePrice.length < 1) {
        setMinText('')
        setMaxText('')
      }
    }
    updatePrice()
  }, [activePrice])

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
            value={values[0] || minText}
            size='small'
            onChange={handleMinChange}
          />
        </TableCell>
        <TableCell className={classes.textCell}>
          <TextField
            label={<Typography className={classes.font}>Max</Typography>}
            value={values[1] || maxText}
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
            disableElevation
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
