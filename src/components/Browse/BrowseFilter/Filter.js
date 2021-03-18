import { Typography } from '@material-ui/core'

//TODO: create selections for different filter options
function Filter({ filter }) {
  return <Typography variant='h6'>{filter.filterName}</Typography>
}

export default Filter
