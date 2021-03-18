import { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import { capitalize } from '../../../utilities/stringUtils'
import Filter from './Filter'

//TODO: create filter component
function Filters({ products, handleFilterProducts }) {
  const [filters, setFilters] = useState([])
  const [activeFilters, setActiveFilters] = useState([])

  useEffect(() => {
    function getFilters(products) {
      let newFilters = []
      let capReg = /([A-Z])/g
      for (let product of products) {
        //get attributes to filter from
        for (let attribute in product) {
          if (
            attribute !== '_id' &&
            attribute !== 'prices' &&
            attribute !== 'image' &&
            attribute !== 'model'
          ) {
            let filterIndex = newFilters.findIndex(
              (item) => item.filterName === attribute
            )
            //create new filter from attribute name
            if (!newFilters.some((item) => item.filterName === attribute)) {
              let filter = {}
              filter.filterName = attribute
              filter.values = [product[attribute]]
              newFilters.push(filter)
            }

            //add new product value in filter
            else if (
              !newFilters[filterIndex].values.some(
                (item) => item === product[attribute]
              )
            ) {
              newFilters[filterIndex].values.push(product[attribute])
            }
          }
        }
      }
      newFilters.map(
        (item) =>
          (item.filterName = capitalize(item.filterName.replace(capReg, ' $1')))
      )
      console.log(newFilters)

      setFilters(newFilters)
    }
    getFilters(products)
  }, [products])

  return (
    <Grid container direction='column' align='center' justify='flex-start'>
      {filters.map((filter) => (
        <Filter filter={filter} key={filter.filterName} />
      ))}
    </Grid>
  )
}

export default Filters
