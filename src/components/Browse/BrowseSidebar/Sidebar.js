import { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import FilterTable from './FilterTable'

const useStyles = makeStyles((theme) => ({
  sidebar: {
    background: 'white',
    padding: '1rem',
    overflowY: 'scroll',
    height: ({ sidebarHeight }) => sidebarHeight,
  },
  title: {
    marginBottom: '.25rem',
  },
}))

function Sidebar({
  filters,
  activeFilters,
  activeRadio,
  handleActiveChecked,
  handleRadioSelect,
  handlePriceChange,
  rowsPerPage,
}) {
  const [sidebarHeight, setSidebarHeight] = useState('84vh')

  //dynamically set sidebar height
  const classes = useStyles({ sidebarHeight })

  //update sidebar height
  useEffect(() => {
    function getSidebarHeight(rowsPerPage) {
      switch (rowsPerPage) {
        case 5:
          setSidebarHeight('84vh')
          break
        case 10:
          setSidebarHeight('148vh')
          break
        case 20:
          setSidebarHeight('278vh')
          break
        case 35:
          setSidebarHeight('476vh')
          break
        case 50:
          setSidebarHeight('675vh')
          break
        default:
          setSidebarHeight('84vh')
      }
    }
    getSidebarHeight(rowsPerPage)
  }, [rowsPerPage])

  return (
    <div className={classes.sidebar}>
      <Typography variant='h6' className={classes.title}>
        Filters
      </Typography>
      {filters.map((prodFilter) => (
        <FilterTable
          key={prodFilter.filterName}
          prodFilter={prodFilter}
          activeFilters={activeFilters}
          activeRadio={activeRadio}
          handleActiveChecked={handleActiveChecked}
          handleRadioSelect={handleRadioSelect}
          handlePriceChange={handlePriceChange}
        />
      ))}
    </div>
  )
}

export default Sidebar
