import { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { capitalize, lowercase } from '../../../utilities/stringUtils'
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
  products,
  rowsPerPage,
  activeFilters,
  setCheckActive,
  activeRadio,
  setRadioActive,
}) {
  const [filters, setFilters] = useState([])
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

  //create filter objects
  useEffect(() => {
    function getFilters(products) {
      //array for filters to display on page
      let defaultFilters = []
      for (let product of products) {
        //get attributes to filter from
        for (let attribute in product) {
          if (
            attribute !== '_id' &&
            attribute !== 'prices' &&
            attribute !== 'image' &&
            attribute !== 'model' &&
            attribute !== 'inStock'
          ) {
            let filterIndex = defaultFilters.findIndex(
              (item) => item.filterName === attribute
            )
            //create new filter from attribute name
            if (!defaultFilters.some((item) => item.filterName === attribute)) {
              let filter = {}
              filter.filterName = attribute
              filter.values = [product[attribute]]
              defaultFilters.push(filter)
            }

            //add new product value in filter
            else if (
              !defaultFilters[filterIndex].values.some(
                (item) => item === product[attribute]
              )
            ) {
              defaultFilters[filterIndex].values.push(product[attribute])
            }
          }
        }
      }
      defaultFilters.map(
        (item) =>
          (item.filterName = capitalize(
            item.filterName.replace(/([A-Z])/g, ' $1')
          ))
      )
      defaultFilters.unshift({ filterName: 'In Stock', values: [true] })
      setFilters(defaultFilters)
    }
    getFilters(products)
  }, [products])

  //update values of checkbox filter selections
  function handleActiveChecked(value, filterName) {
    //format filterName for activeFilters
    filterName = lowercase(filterName.replace(/ /g, ''))

    //found filter object
    let found = activeFilters.find((item) => item.name === filterName)

    if (found) {
      let index = found.values.indexOf(value)
      //value not found, add it
      if (index < 0) {
        found.values.push(value)
      }
      //remove found value
      else {
        found.values.splice(index, 1)
      }
      //update active filters
      let updatedFilters = activeFilters.filter(
        (item) => item.name !== filterName
      )
      //re-add found entry if values isn't empty after splice
      if (found.values.length > 0) {
        updatedFilters.push(found)
      }
      setCheckActive(updatedFilters)
    }
    //filterName not found, add it and its value
    else {
      let updatedFilters = [...activeFilters]
      updatedFilters.push({ name: filterName, values: [value] })
      setCheckActive(updatedFilters)
    }
  }

  //update values of radio filter selections
  function handleRadioSelect(value, filterName) {
    //normalize filtername
    filterName = lowercase(filterName.replace(/ /g, ''))

    let found = activeRadio.find((item) => item.name === filterName)

    if (found) {
      let updatedRadio = activeRadio.filter((item) => item.name !== filterName)
      //remove filter object from state
      if (found.value === value) {
        setRadioActive(updatedRadio)
      }
      //new value found for filter object, update it
      else {
        found.value = value
        updatedRadio.push(found)
        setRadioActive(updatedRadio)
      }
    }
    //filter object not found, add it
    else {
      setRadioActive([...activeRadio, { name: filterName, value: value }])
    }
  }

  return (
    <div className={classes.sidebar}>
      <Typography variant='h6' className={classes.title}>
        Filters
      </Typography>
      {filters.map((prodFilter) => (
        <FilterTable
          key={prodFilter.filterName}
          prodFilter={prodFilter}
          handleActiveChecked={handleActiveChecked}
          handleRadioSelect={handleRadioSelect}
        />
      ))}
    </div>
  )
}

export default Sidebar
