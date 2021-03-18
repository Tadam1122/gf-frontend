import { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import { capitalize } from '../../../utilities/stringUtils'

//TODO: create filter component
function Filters({ products, handleFilterProducts }) {
  const [filters, setFilters] = useState()

  useEffect(() => {
    function getFilters(products) {
      let keys = []
      let regex = /([A-Z])/g
      for (let product of products) {
        let temp = keys
        keys = keys.concat(
          Object.keys(product)
            .filter(
              (item) =>
                item !== '_id' &&
                item !== 'prices' &&
                item !== 'image' &&
                item !== 'model'
            )
            .map((item) => capitalize(item.replace(regex, ' $1')))
            .filter((item) => temp.indexOf(item) < 0)
        )
      }
      console.log(keys)
      setFilters(keys)
    }
    getFilters(products)
  }, [products])

  return (
    <Grid
      container
      direction='column'
      align='center'
      justify='flex-start'
    ></Grid>
  )
}

export default Filters
