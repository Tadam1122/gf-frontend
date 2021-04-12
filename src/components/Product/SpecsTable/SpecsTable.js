import {
  Typography,
  Toolbar,
  Table,
  TableBody,
  TableContainer,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SpecsTableRow from './SpecsTableRow'

const useStyles = makeStyles((theme) => ({
  table: {
    flexGrow: 1,
    marginTop: '.5rem',
    background: 'white',
    height: '100%',
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
}))

function SpecsTable({ product }) {
  const classes = useStyles()

  return (
    <TableContainer className={classes.table}>
      <Toolbar className={classes.toolbar}>
        <Typography variant='h4'>Specs</Typography>
      </Toolbar>
      <Table>
        <TableBody>
          {Object.keys(product)
            .sort((a, b) => (a > b ? 1 : -1))
            .map((filterName) => {
              if (
                filterName !== 'image' &&
                filterName !== '_id' &&
                filterName !== 'category' &&
                filterName !== 'prices'
              ) {
                return (
                  <SpecsTableRow
                    filterName={filterName}
                    product={product}
                    key={filterName}
                  />
                )
              }
              return null
            })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SpecsTable
