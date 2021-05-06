import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Typography,
  Collapse,
  ListItem,
  ListItemText,
  Hidden,
  useMediaQuery,
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { ExpandLess, ExpandMore } from '@material-ui/icons/'

import FilterTable from './FilterTable'

const useStyles = makeStyles((theme) => ({
  sidebar: {
    background: 'white',
    padding: '1rem',
    overflowY: ({ scrollbar }) => scrollbar,
    height: ({ sidebarHeight }) => sidebarHeight,
  },
  title: {
    marginBottom: '.25rem',
  },
}))

function Sidebar({
  handleActiveChecked,
  handleRadioSelect,
  handlePriceChange,
  rowsPerPage,
}) {
  const theme = useTheme()
  const heightMatches = useMediaQuery(theme.breakpoints.up('sm'))
  const scrollMatches = useMediaQuery(theme.breakpoints.up('sm'))
  const [sidebarHeight, setSidebarHeight] = useState('84vh')
  const [scrollbar, setScrollbar] = useState('scroll')
  const [collapseOpen, setOpen] = useState(false)

  //dynamically set sidebar height
  const classes = useStyles({ sidebarHeight, scrollbar })
  // const classes = useStyles()

  const filters = useSelector((state) => state.filtersRed.filters)

  function handleClick() {
    setOpen(!collapseOpen)
  }

  // update sidebar height
  useEffect(() => {
    function getSidebarHeight(rowsPerPage) {
      if (heightMatches) {
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
      } else {
        setSidebarHeight('auto')
      }
    }
    function getScrollbarSettings() {
      if (scrollMatches) {
        setScrollbar('scroll')
        setOpen(true)
      } else {
        setScrollbar('auto')
      }
    }
    getSidebarHeight(rowsPerPage)
    getScrollbarSettings()
  }, [rowsPerPage, scrollMatches, heightMatches])

  return (
    <div className={classes.sidebar}>
      <Hidden smDown>
        <Typography variant='h6' className={classes.title}>
          Filters
        </Typography>
        {filters.map((prodFilter) => (
          <FilterTable
            key={prodFilter.filterName}
            prodFilter={prodFilter}
            handleActiveChecked={handleActiveChecked}
            handleRadioSelect={handleRadioSelect}
            handlePriceChange={handlePriceChange}
          />
        ))}
      </Hidden>
      <Hidden smUp>
        <ListItem button onClick={handleClick}>
          <ListItemText primary='Filters' />
          {collapseOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={collapseOpen} timeout='auto' unmountOnExit>
          {filters.map((prodFilter) => (
            <FilterTable
              key={prodFilter.filterName}
              prodFilter={prodFilter}
              handleActiveChecked={handleActiveChecked}
              handleRadioSelect={handleRadioSelect}
              handlePriceChange={handlePriceChange}
            />
          ))}
        </Collapse>
      </Hidden>
    </div>
  )
}

export default Sidebar
