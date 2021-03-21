import { useState } from 'react'
import {
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import FilterSelect from './FilterSelect'
import FilterRadio from './FilterRadio'

const useStyles = makeStyles((theme) => ({
  table: {
    background: 'white',
    overflow: 'hidden',
  },
  title: {
    fontWeight: 'bolder',
    fontSize: '.9em',
  },
  toggleMore: {
    color: '#3F98D8',
    textDecoration: 'underline',
    fontSize: '.75em',
    cursor: 'pointer',
  },
}))

function FilterTable({ prodFilter, handleActiveChecked, handleRadioSelect }) {
  const [more, toggleMore] = useState(false)
  const displayNum = 3
  const classes = useStyles()

  function handleToggleMore() {
    toggleMore(!more)
  }

  return (
    <TableContainer className={classes.table}>
      <Table size='small'>
        <TableBody>
          <TableRow>
            <TableCell component='th' scope='column'>
              <Typography variant='subtitle1' className={classes.title}>
                {prodFilter.filterName}
              </Typography>
            </TableCell>
          </TableRow>
          {prodFilter.values
            .filter((value) => typeof value === 'boolean')
            .map((value) => (
              <FilterRadio
                value={value}
                filterName={prodFilter.filterName}
                handleRadioSelect={handleRadioSelect}
                key={value}
              />
            ))}
          {more
            ? prodFilter.values
                .filter((value) => typeof value !== 'boolean')
                .map((value) => (
                  <FilterSelect
                    value={value}
                    filterName={prodFilter.filterName}
                    handleActiveChecked={handleActiveChecked}
                    key={value}
                  />
                ))
            : prodFilter.values
                .slice(0, displayNum)
                .filter((value) => typeof value !== 'boolean')
                .map((value) => (
                  <FilterSelect
                    value={value}
                    filterName={prodFilter.filterName}
                    handleActiveChecked={handleActiveChecked}
                    key={value}
                  />
                ))}

          {prodFilter.values.length > displayNum && (
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes.toggleMore}
                  onClick={handleToggleMore}
                >
                  {more ? 'show less' : 'show more'}
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default FilterTable
